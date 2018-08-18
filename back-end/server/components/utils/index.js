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
        startAt: moment(data.startAt, 'YYYY-MM-D HH:mm:ss').add(i * 7, 'days'),
        endAt: moment(data.endAt, 'YYYY-MM-D HH:mm:ss').add(i * 7, 'days'),
        memo: data.memo,
        roomId: data.roomId
      });
    }
    return arr;
  } catch (err) {
    throw err;
  }
};
