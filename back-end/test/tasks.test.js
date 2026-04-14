import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Task routes (/api/tasks)', () => {
  describe('GET /api/tasks', () => {
    it.skip('returns 200 with an array of tasks');
    it.skip('returns an empty array when no tasks exist');
  });

  describe('POST /api/tasks', () => {
    it.skip('returns 201 with the created task on valid input');
    it.skip('returns 400 when required fields are missing');
  });

  describe('PUT /api/tasks/:id', () => {
    it.skip('returns 200 with the updated task on valid input');
    it.skip('returns 404 when task id does not exist');
    it.skip('returns 400 on invalid input');
  });

  describe('DELETE /api/tasks/:id', () => {
    it.skip('returns 200 or 204 on successful deletion');
    it.skip('returns 404 when task id does not exist');
  });
});
