'use strict';

const supertest = require('supertest');
const moment = require('moment');
const app = require('../server/app');

describe('API rooms reservations', () => {
  const request = supertest(app.listen());

  describe('POST /api/rooms/{id}/reservations', () => {
    it('<201> 룸 예약', async () => {
      const res = await request
        .post('/api/rooms/1/reservations')
        .send({ startAt: '2018-08-20 10:00', endAt: '2018-08-20 10:30', memo: '에약' })
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
        .send({ startAt: '2018-08-20 10:30', endAt: '2018-08-20 11:30', count: 4, memo: '에약' })
        .expect('Content-Type', /json/)
        .expect(201);

      const { status, data } = res.body;
      const expected = ['id', 'roomId', 'startAt', 'endAt'];
      expect(status).toBe('success');
      expect(Object.keys(data[0])).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('POST /api/rooms/{id}/reservations', () => {
    it('<201> 룸 중복 예약 방지', async () => {
      const res = await request
        .post('/api/rooms/1/reservations')
        .send({ startAt: '2018-08-20 10:00', endAt: '2018-08-20 10:30', memo: '에약' })
        .expect('Content-Type', /json/)
        .expect(403);

      const { status } = res.body;      
      expect(status).toBe('fail');
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

  describe('DELETE /api/reservations', () => {
    it('<200> 예약 모두 삭제', async () => {
      const res = await request
        .delete('/api/reservations')
        .expect('Content-Type', /json/)
        .expect(200);

      const { status } = res.body;
      expect(status).toBe('success');
    });
  });

});