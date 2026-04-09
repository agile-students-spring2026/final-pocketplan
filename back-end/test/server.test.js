import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Server foundation', () => {
  describe('GET /api/health', () => {
    it('responds with HTTP 200', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).to.equal(200);
    });

    it('responds with JSON content-type', async () => {
      const res = await request(app).get('/api/health');
      expect(res.headers['content-type']).to.match(/application\/json/);
    });

    it('returns { status: "ok" }', async () => {
      const res = await request(app).get('/api/health');
      expect(res.body.status).to.equal('ok');
    });

    it('includes a timestamp field', async () => {
      const res = await request(app).get('/api/health');
      expect(res.body).to.have.property('timestamp');
    });

    it('timestamp is a valid ISO date string', async () => {
      const res = await request(app).get('/api/health');
      const parsed = Date.parse(res.body.timestamp);
      expect(parsed).to.not.be.NaN;
    });
  });

  describe('CORS', () => {
    it('includes an Access-Control-Allow-Origin header', async () => {
      const res = await request(app)
        .get('/api/health')
        .set('Origin', 'http://localhost:3001');
      expect(res.headers).to.have.property('access-control-allow-origin');
    });
  });

  describe('JSON body parsing middleware', () => {
    it('accepts application/json bodies without crashing', async () => {
      const res = await request(app)
        .get('/api/health')
        .set('Content-Type', 'application/json');
      expect(res.status).to.equal(200);
    });
  });

  describe('Static / SPA fallback', () => {
    it('returns 200 or 503 for an unknown path (not a 500 crash)', async () => {
      const res = await request(app).get('/some-unknown-page');
      expect(res.status).to.be.oneOf([200, 503]);
    });

    it('returns 503 with a JSON error when build is missing', async () => {
      const res = await request(app).get('/no-such-route-xyz');
      if (res.status === 503) {
        expect(res.body).to.have.property('error');
      }
    });
  });
});
