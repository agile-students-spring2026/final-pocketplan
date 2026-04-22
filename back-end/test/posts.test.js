import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Posts routes (/posts and /api/posts)', () => {
  describe('GET /posts', () => {
    it('returns 200 with a posts array', async () => {
      const res = await request(app).get('/posts');
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.posts).to.be.an('array');
    });
  });

  describe('GET /api/posts', () => {
    it('returns 200 with a posts array (same router as /posts)', async () => {
      const res = await request(app).get('/api/posts');
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.posts).to.be.an('array');
    });
  });

  describe('POST /posts', () => {
    it('returns 201 with created post when title is provided', async () => {
      const res = await request(app)
        .post('/posts')
        .send({ title: 'Test Post', body: 'Hello' });
      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.post).to.include.keys('id', 'title', 'body', 'authorId', 'createdAt');
      expect(res.body.post.title).to.equal('Test Post');
    });

    it('returns 400 when title is missing', async () => {
      const res = await request(app).post('/posts').send({ body: 'no title' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });
  });

  describe('POST /api/posts', () => {
    it('creates a post visible from GET /posts', async () => {
      const create = await request(app)
        .post('/api/posts')
        .send({ title: 'API prefix post' });
      expect(create.status).to.equal(201);
      const id = create.body.post.id;

      const list = await request(app).get('/posts');
      expect(list.body.posts.some((p) => p.id === id)).to.equal(true);
    });
  });

  describe('GET /posts/:id', () => {
    it('returns 200 for an existing id', async () => {
      const created = await request(app).post('/posts').send({ title: 'By id' });
      const id = created.body.post.id;
      const res = await request(app).get(`/posts/${id}`);
      expect(res.status).to.equal(200);
      expect(res.body.post.title).to.equal('By id');
    });

    it('returns 404 for unknown id', async () => {
      const res = await request(app).get('/posts/999999');
      expect(res.status).to.equal(404);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('returns 200 and removes the post', async () => {
      const created = await request(app).post('/posts').send({ title: 'To delete' });
      const id = created.body.post.id;
      const del = await request(app).delete(`/posts/${id}`);
      expect(del.status).to.equal(200);
      const get = await request(app).get(`/posts/${id}`);
      expect(get.status).to.equal(404);
    });
  });
});
