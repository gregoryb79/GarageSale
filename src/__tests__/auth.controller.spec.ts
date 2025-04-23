import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING!);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/register', () => {
  it('should register a new user and return token', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: `test${Date.now()}@example.com`,
        password: '123456'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('email');
  });
});

describe('POST /api/auth/login', () => {
    const testEmail = `loginuser${Date.now()}@example.com`;
    const testPassword = '123456';
  
    beforeAll(async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          email: testEmail,
          password: testPassword
        });
    });
  
    it('should log in a user and return a token', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: testEmail,
          password: testPassword
        });
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('email', testEmail);
    });
  });
  
  describe('GET /api/auth/me', () => {
    let token = '';
    let userId = '';
  
    const testEmail = `meuser${Date.now()}@example.com`;
    const testPassword = '123456';
  
    beforeAll(async () => {
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({ email: testEmail, password: testPassword });
  
      token = registerRes.body.token;
      userId = registerRes.body._id;
    });
  
    it('should return the authenticated user\'s profile', async () => {
      const response = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('email', testEmail);
      expect(response.body).toHaveProperty('_id', userId);
    });
  });
  