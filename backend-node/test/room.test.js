'use strict';

const supertest = require('supertest');
const moment = require('moment');
const app = require('../server/app');

describe('API rooms', () => {
  const request = supertest(app.listen());

  describe('POST /api/rooms', () => {
    it('<201> room 정보 생성', async () => {
      const res = await request
        .post('/api/rooms')
        .send({ name: 'RYAN' })
        .expect('Content-Type', /json/)
        .expect(201);

      const { status, data } = res.body;
      const expected = ['id', 'name'];
      expect(status).toBe('success');
      expect(Object.keys(data)).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('GET /api/rooms', () => {
    it('<200> room 정보 조회', async () => {
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
  
});