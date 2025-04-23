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

describe('GET /api/items', () => {
  it('should return an array of items', async () => {
    const response = await request(app).get('/api/items');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('POST /api/items', () => {
    let token = '';
  
    beforeAll(async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: `itemadmin${Date.now()}@example.com`,
          password: '123456'
        });
  
      token = res.body.token;
    });
  
    it('should create a new item when authenticated', async () => {
      const response = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Test Product',
          description: 'A test item',
          price: 99.99,
          imageurl: 'https://example.com/image.jpg',
          stock: 10,
          category: 'Testing'
        });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Test Product');
      expect(response.body).toHaveProperty('price', 99.99);
    });
  });
  