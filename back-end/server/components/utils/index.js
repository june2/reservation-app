'use strict';

import moment from 'moment';

/**
 *	genrate date
 **/
exports.generateDate = (data, count) => {
  try {
    let arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        startAt: moment(data.startAt, 'YYYY-MM-DD HH:mm:ss').add(i * 7, 'days'),
        endAt: moment(data.endAt, 'YYYY-MM-DD HH:mm:ss').add(i * 7, 'days'),
        memo: data.memo,
        roomId: data.roomId
      });
    }
    return arr;
  } catch (err) {
    throw err;
  }
};

/**
 *	genrate date
 **/
exports.getDayRange = (date) => {
  try {
    let day = {
      start: moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD HH:mm:ss'),
      end: null
    };
    let now = moment(date, 'YYYY-MM-DD');    
    day.end = moment(now).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    return day;
  } catch (err) {
    throw err;
  }
};
