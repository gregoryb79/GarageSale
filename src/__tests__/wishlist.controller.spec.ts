import request from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Wishlist from '../models/wishlist.model';

dotenv.config();

let token = '';
let userId = '';
let itemId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.CONNECTION_STRING!);

  // הרשמה
  const userRes = await request(app)
    .post('/api/auth/register')
    .send({
      email: `wishuser${Date.now()}@example.com`,
      password: '123456'
    });

  token = userRes.body.token;
  userId = userRes.body._id;

  // יצירת מוצר
  const itemRes = await request(app)
    .post('/api/items')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Wishlist Item',
      description: 'Test wishlist',
      price: 15,
      imageurl: 'https://example.com/wishlist.jpg',
      stock: 3,
      category: 'Test'
    });

  itemId = itemRes.body._id;

  // הוספה ל-Wishlist במסד
  await Wishlist.create({
    user: userId,
    items: [{ itemId }]
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/users/:id/wishlist', () => {
  it('should return the user\'s wishlist', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}/wishlist`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('itemId');
    expect(res.body[0]).toHaveProperty('itemName');
    expect(res.body[0]).toHaveProperty('itemPrice');
  });
});
