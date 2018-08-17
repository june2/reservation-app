'use strict';

const supertest = require('supertest');
const app = require('../server/app');

describe('Home', () => {
  const request = supertest(app.listen());

  describe('GET /api/rooms', () => {
    it('<200> should always return with the API room', async () => {
      const res = await request
        .get('/api/rooms')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status, data } = res.body;
      const expected = ['id', 'name'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('POST /api/rooms', () => {
    it('<201> should always return with the API room', async () => {
      const res = await request
        .post('/api/rooms')
        .send({ name: 'test' })
        .expect('Content-Type', /json/)
        .expect(201);

      const { status, data } = res.body;
      const expected = ['id', 'name'];
      expect(status).toBe('success');
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });
  
});