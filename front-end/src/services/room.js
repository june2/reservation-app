import axios from 'axios';
import * as Api from './api';

// export const findAll = () => {  
//   axios.get(`${Api.URL}/api/rooms`)
//   .then(res => {    
//     return res.data.data;
//   })
//   .catch(err => {
//     console.log(err);    
//   });
// }

export const findAll = () => axios.get(`${Api.URL}/api/rooms`);