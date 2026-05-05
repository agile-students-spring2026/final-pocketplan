import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import User from '../models/User.js';

const MONGO_URI = process.env.MONGODB_URI;
const skipIfNoDB = MONGO_URI ? false : true;

before(async function () {
  if (skipIfNoDB) return;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  }
});

after(async function () {
  if (skipIfNoDB) return;
  await User.deleteMany({ email: /@example\.com$/ });
  await mongoose.disconnect();
});

describe('Auth routes (/api/auth)', () => {

  describe('POST /api/auth/signup', () => {
    before(async function () {
      if (skipIfNoDB) return;
      await User.deleteMany({ email: /@example\.com$/ });
    });

    it('returns 201 with user data on valid input', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'New User', email: 'new@example.com', password: 'secret123' });
      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.user).to.include.keys('id', 'name', 'email');
    });

    it('does not expose password in response', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Safe User', email: 'safe@example.com', password: 'secret123' });
      expect(res.body.user).to.not.have.property('password');
    });

    it('returns 400 when name is missing', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ email: 'missing@example.com', password: 'secret123' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when email is missing', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'No Email', password: 'secret123' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when password is missing', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'No Pass', email: 'nopass@example.com' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 409 when email is already registered', async function () {
      if (skipIfNoDB) return this.skip();
      await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Dup User', email: 'dup@example.com', password: 'secret123' });
      const res = await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Dup User 2', email: 'dup@example.com', password: 'secret123' });
      expect(res.status).to.equal(409);
      expect(res.body.success).to.equal(false);
    });
  });

  describe('POST /api/auth/login', () => {
    before(async function () {
      if (skipIfNoDB) return;
      await request(app)
        .post('/api/auth/signup')
        .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    });

    it('returns 200 with a token on valid credentials', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body).to.have.property('token');
    });

    it('returns user info (without password) on successful login', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });
      expect(res.body.user).to.include.keys('id', 'name', 'email');
      expect(res.body.user).to.not.have.property('password');
    });

    it('returns 401 on wrong password', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'wrongpassword' });
      expect(res.status).to.equal(401);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when email is missing', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/auth/login')
        .send({ password: 'password123' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });

    it('returns 400 when password is missing', async function () {
      if (skipIfNoDB) return this.skip();
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
  it('POST /signup matches POST /api/auth/signup behavior', async function () {
    if (skipIfNoDB) return this.skip();
    const res = await request(app)
      .post('/signup')
      .send({ name: 'Root User', email: 'root@example.com', password: 'secret123' });
    expect(res.status).to.equal(201);
    expect(res.body.success).to.equal(true);
    expect(res.body.user.email).to.equal('root@example.com');
  });

  it('POST /login succeeds after POST /signup', async function () {
    if (skipIfNoDB) return this.skip();
    await request(app)
      .post('/signup')
      .send({ name: 'L', email: 'loginroot@example.com', password: 'pw123456' });
    const res = await request(app)
      .post('/login')
      .send({ email: 'loginroot@example.com', password: 'pw123456' });
    expect(res.status).to.equal(200);
    expect(res.body.success).to.equal(true);
    expect(res.body).to.have.property('token');
  });
});
