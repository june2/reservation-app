import axios from 'axios';
import * as Api from './api';

export const findAll = () => {  
  axios.get(`${Api.URL}/api/reservations`)
  .then(res => {
    return [{
      id: 13,
      title: 'Multi-day Event',
      start: new Date('2018-08-16 11:00:00'),
      end: new Date('2018-08-16 13:00:00'),
    }];
  })
  .catch(err => {
    console.log(err);    
  });
}