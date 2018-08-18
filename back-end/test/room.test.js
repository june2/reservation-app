'use strict';

const supertest = require('supertest');
const app = require('../server/app');

describe('Home', () => {
  const request = supertest(app.listen());

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

  describe('POST /api/rooms/{id}/reservations', () => {
    it('<201> should always return with the API room', async () => {
      const res = await request
        .post('/api/rooms/1/reservations')
        .send({ startAt: '2018-08-17 17:00:00', endAt: '2018-08-17 17:30:00' })
        .expect('Content-Type', /json/)
        .expect(201);

      const { status, data } = res.body;
      const expected = ['id', 'roomId', 'startAt', 'endAt'];
      expect(status).toBe('success');
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });
  
  describe('GET /api/rooms/{id}/reservations', () => {
    it('<200> should always return with the API room', async () => {
      const res = await request
        .get('/api/rooms/1/reservations')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status, data } = res.body;
      const expected = ['id', 'roomId', 'startAt', 'endAt'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });
});