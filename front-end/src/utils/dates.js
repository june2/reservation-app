import global from './../config/global'
import moment from 'moment-timezone'

let dates = {
  /**   
   * @param {*} dateTime 
   * utc => local 시간으로 변경
   */
  localdateTime(dateTime) {  
    return new Date(moment.tz(new Date(dateTime), global.timezone));
  }
}

export default dates