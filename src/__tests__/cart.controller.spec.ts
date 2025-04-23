import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let token = '';
let itemId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING!);

  // שלב 1 – יצירת משתמש
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      email: `cartuser${Date.now()}@example.com`,
      password: '123456'
    });

  token = userRes.body.token;

  // שלב 2 – יצירת מוצר להכניס לעגלה
  const itemRes = await request(app)
    .post('/api/items')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Cart Item',
      description: 'For cart testing',
      price: 10,
      imageurl: 'https://example.com/cart.jpg',
      stock: 5,
      category: 'Testing'
    });

  itemId = itemRes.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/cart', () => {
  it('should return an empty cart initially', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.items.length).toBe(0);
    expect(Array.isArray(res.body.items)).toBe(true);
  });
});

describe('POST /api/cart', () => {
  it('should add an item to the cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId: itemId,
        quantity: 2
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Cart updated');
  });
});
