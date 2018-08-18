import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Popup from 'react-popup';
import Moment from 'moment';
import DateUtil from '../utils/dates';
import * as RoomApi from '../services/room';

// let test = ReservationApi.findAll();

let Timeslots = ({ localizer, events, minTime, maxTime }) => (
  <BigCalendar
    selectable
    views={['week', 'day']}
    events={events}
    step={15}
    min={minTime}
    max={maxTime}
    localizer={localizer}
    defaultView={BigCalendar.Views.WEEK}
    defaultDate={new Date()}
    onSelectEvent={event => alert(event.title)}
    onSelectSlot={slotInfo =>
      // alert(
      //   `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
      //   `\nend: ${slotInfo.end.toLocaleString()}` +
      //   `\naction: ${slotInfo.action}`
      // )
      Popup.alert('I am alert, nice to meet you')
    }
    onNavigate={date =>
      NotificationManager.info(`action: ${date}`)
    }
  />
)

class Calendar extends Component {
  constructor(props, context) {
    super(props, context);
    this.setDefault();
    this.state = {
      events: [],
    };
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  // set min/max time
  setDefault() {
    BigCalendar.momentLocalizer(Moment); // or globalizeLocalizer
    this.minTime = new Date();
    this.minTime.setHours(8, 0, 0);
    this.maxTime = new Date();
    this.maxTime.setHours(19, 30, 0);
  }
  setEvents(roomId) {    
    RoomApi.findReservations(roomId)
      .then(res => {
        let events = res.data.data.map((o) => {
          return { id: o.id, start: DateUtil.localdateTime(o.start), end: DateUtil.localdateTime(o.end), title: o.title };
        });        
        this.setState({ events: events });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <Timeslots events={this.state.events} minTime={this.minTime} maxTime={this.maxTime} />
        <NotificationContainer />
        <Popup />
      </div>
    );
  }
}

export default Calendar;