import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Auth routes (/api/auth)', () => {

  describe('POST /api/auth/signup', () => {
    it('returns 201 with user data on valid input', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'New User', email: 'new@example.com', password: 'secret' });
      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.user).to.include.keys('id', 'name', 'email');
    });

    it('does not expose password in response', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Safe User', email: 'safe@example.com', password: 'secret' });
      expect(res.body.user).to.not.have.property('password');
    });

    it('returns 400 when name is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'missing@example.com', password: 'secret' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'No Email', password: 'secret' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'No Pass', email: 'nopass@example.com' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });
  });

  describe('POST /api/auth/login', () => {
    before(async () => {
      await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    });

    it('returns 200 with a token on valid credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('token');
    });

    it('returns user info (without password) on successful login', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.body.user).to.include.keys('id', 'name', 'email');
      expect(res.body.user).to.not.have.property('password');
    });

    it('returns 401 on wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });
      expect(res.status).to.equal(401);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when password is missing', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('returns 200 on successful logout', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });
  });

  describe('POST /api/auth/forgot-password', () => {
    it('returns 200 when a valid email is provided', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'test@example.com' });
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });

    it('echoes back the email in the response', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({ email: 'test@example.com' });
      expect(res.body.email).to.equal('test@example.com');
    });

    it('returns 400 when email is missing', async () => {
      const res = await request(app)
        .post('/api/auth/forgot-password')
        .send({});
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });
  });
});

describe('Top-level auth routes (POST /signup, POST /login)', () => {
  it('POST /signup matches POST /api/auth/signup behavior', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ name: 'Root User', email: 'root@example.com', password: 'secret' });
    expect(res.status).to.equal(201);
    expect(res.body.success).to.equal(true);
    expect(res.body.user.email).to.equal('root@example.com');
  });

  it('POST /login succeeds after POST /signup', async () => {
    await request(app)
      .post('/signup')
      .send({ name: 'L', email: 'loginroot@example.com', password: 'pw123' });
    const res = await request(app)
      .post('/login')
      .send({ email: 'loginroot@example.com', password: 'pw123' });
    expect(res.status).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(res.body).to.have.property('token');
  });
});
