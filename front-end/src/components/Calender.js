import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import moment from 'moment'
import * as ReservationApi from '../services/reservation';

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
    BigCalendar.momentLocalizer(moment); // or globalizeLocalizer
    this.minTime = new Date();
    this.minTime.setHours(8, 0, 0);
    this.maxTime = new Date();
    this.maxTime.setHours(19, 30, 0);
  }
  setEvents(roomId) {
    ReservationApi.findAll()
      .then(res => {
        this.setState({ events: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
    // let events = [
    //   {
    //     id: 13,
    //     title: 'Multi-day Event',
    //     start: new Date('2018-08-16 11:00:00'),
    //     end: new Date('2018-08-16 13:00:00'),
    //   }
    // ];    
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