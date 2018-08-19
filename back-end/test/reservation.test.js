'use strict';

const supertest = require('supertest');
const moment = require('moment');
const app = require('../server/app');

describe('Home', () => {
  const request = supertest(app.listen());

  describe('POST /api/rooms/{id}/reservations', () => {
    it('<201> 룸 예약', async () => {
      const res = await request
        .post('/api/rooms/1/reservations')
        .send({ startAt: moment('2018-08-17T17:00:00').tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm:ss'), endAt: '2018-08-17 17:30:00', memo: '에약' })
        .expect('Content-Type', /json/)
        .expect(201);

      const { status, data } = res.body;
      const expected = ['id', 'roomId', 'startAt', 'endAt'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('POST /api/rooms/{id}/reservations', () => {
    it('<201> 룸 반복 예약', async () => {
      const res = await request
        .post('/api/rooms/1/reservations')
        .send({ startAt: '2018-08-17 10:00:00', endAt: '2018-08-17 10:30:00', count: 4, memo: '에약' })
        .expect('Content-Type', /json/)
        .expect(201);

      const { status, data } = res.body;
      const expected = ['id', 'roomId', 'startAt', 'endAt'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('GET /api/rooms/{id}/reservations', () => {
    it('<200> 룸 별 예약 조회', async () => {
      const res = await request
        .get('/api/rooms/1/reservations?begin=2018-08-01&end=2018-08-17')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status, data } = res.body;
      const expected = ['id', 'start', 'end', 'title'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('GET /api/rooms/{id}/reservations', () => {
    it('<200> 룸 별 예약 조회 기간 필터', async () => {
      const res = await request
        .get('/api/rooms/1/reservations?begin=4000-10-01&end=4000-12-22')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status, data } = res.body;
      expect(status).toBe('success');
      expect(data.length).toEqual(0);
    });
  });
});