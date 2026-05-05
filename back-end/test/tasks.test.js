import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import app from '../app.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

const MONGO_URI = process.env.MONGODB_URI;
const skipIfNoDB = !MONGO_URI;

let authToken;
const testUserId = new mongoose.Types.ObjectId().toString();

before(async function () {
  if (skipIfNoDB) return;
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
  }
  authToken = jwt.sign(
    { id: testUserId, email: 'tasks-test@example.com' },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '1h' }
  );
});

after(async function () {
  if (skipIfNoDB) return;
  await Task.deleteMany({ user: testUserId });
});

describe('Task routes (/api/tasks)', () => {
  describe('GET /api/tasks', () => {
    it('returns 200 with an array of tasks', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .get('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.tasks).to.be.an('array');
    });

    it('returns 401 without a token', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app).get('/api/tasks');
      expect(res.status).to.equal(401);
    });
  });

  describe('POST /api/tasks', () => {
    it('returns 201 with the created task on valid input', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Task', dueDate: '2026-05-10', hours: 1, minutes: 30 });
      expect(res.status).to.equal(201);
      expect(res.body.success).to.equal(true);
      expect(res.body.task).to.include.keys('_id', 'name');
      expect(res.body.task.name).to.equal('Test Task');
    });

    it('returns 400 when required fields are missing', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ dueDate: '2026-05-10' });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
    });
  });

  describe('PUT /api/tasks/:id', () => {
    let taskId;

    before(async function () {
      if (skipIfNoDB) return;
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Update Me', dueDate: '2026-05-10' });
      taskId = res.body.task._id;
    });

    it('returns 200 with the updated task on valid input', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .put(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Updated Name' });
      expect(res.status).to.equal(200);
      expect(res.body.task.name).to.equal('Updated Name');
    });

    it('returns 404 when task id does not exist', async function () {
      if (skipIfNoDB) return this.skip();
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .put(`/api/tasks/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Ghost Task' });
      expect(res.status).to.equal(404);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    let taskId;

    before(async function () {
      if (skipIfNoDB) return;
      const res = await request(app)
        .post('/api/tasks')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Delete Me', dueDate: '2026-05-10' });
      taskId = res.body.task._id;
    });

    it('returns 200 on successful deletion', async function () {
      if (skipIfNoDB) return this.skip();
      const res = await request(app)
        .delete(`/api/tasks/${taskId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });

    it('returns 404 when task id does not exist', async function () {
      if (skipIfNoDB) return this.skip();
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .delete(`/api/tasks/${fakeId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(res.status).to.equal(404);
    });
  });
});
