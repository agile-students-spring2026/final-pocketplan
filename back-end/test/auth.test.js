import { expect } from 'chai';
import request from 'supertest';
import app from '../app.js';

describe('Auth routes (/api/auth)', () => {
  describe('POST /api/auth/signup', () => {
    it.skip('returns 201 with user data on valid signup');
    it.skip('returns 400 when required fields are missing');
    it.skip('returns 409 when email is already registered');
  });

  describe('POST /api/auth/login', () => {
    it.skip('returns 200 with a token on valid credentials');
    it.skip('returns 401 on invalid password');
    it.skip('returns 404 when email is not found');
  });

  describe('POST /api/auth/logout', () => {
    it.skip('returns 200 on successful logout');
  });

  describe('POST /api/auth/forgot-password', () => {
    it.skip('returns 200 when email exists');
    it.skip('returns 404 when email is not found');
  });
});
