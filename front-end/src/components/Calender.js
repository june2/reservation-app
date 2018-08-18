import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar'
import Modal from 'react-modal';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Popup from 'react-popup';
import Moment from 'moment';
import DateUtil from '../utils/dates';
import * as RoomApi from '../services/room';

const formats = {
  timeGutterFormat: 'HH:mm',
  eventTimeRangeFormat: ({
    start,
    end
  }, culture, local) =>
    local.format(start, 'HH:mm', culture) + '-' +
    local.format(end, 'HH:mm', culture),
  // dayFormat: 'MM-DD' + ' ' + '星期' + 'dd',
  agendaTimeRangeFormat: ({
    start,
    end
  }, culture, local) =>
    local.format(start, 'HH:mm', culture) + '-' +
    local.format(end, 'HH:mm', culture),
  // agendaDateFormat: 'MM-DD' + ' ' + '星期' + 'dd',
};
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Calendar extends Component {
  constructor(props, context) {
    super(props, context);
    this.setDefault(); // set min/max time configration   
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      events: [],
      roomId: null,
      roomName: null,
      startAt: null,
      endAt: null,
      count: 1,
      modalIsOpen: false
    };
  }
  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  openModal(start, end) {
    this.setState({ startAt: Moment(start).format('YYYY-MM-DD HH:mm'), endAt: Moment(end).format('YYYY-MM-DD HH:mm'), modalIsOpen: true });
  }
  afterOpenModal() {
  }
  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  setDefault() {
    BigCalendar.momentLocalizer(Moment); // or globalizeLocalizer
    this.minTime = new Date();
    this.minTime.setHours(8, 0, 0);
    this.maxTime = new Date();
    this.maxTime.setHours(19, 30, 0);
  }
  setEvents(roomId, roomName, date) {
    if (!date) {
      date = Moment().format('YYYY-MM-DD')
    }
    // 날짜 조회 범위 계산 (주단위)
    let today = Moment(date).day();
    let begin = Moment(date).subtract(today, 'days').format('YYYY-MM-DD');
    let last = Moment(begin).add(7, 'days').format('YYYY-MM-DD');
    let params = { begin: begin, last: last };
    RoomApi.findReservations(roomId, params)
      .then(res => {
        // calender event data format으로 변경
        let events = res.data.data.map((o) => {
          return { id: o.id, start: DateUtil.localdateTime(o.start), end: DateUtil.localdateTime(o.end), title: o.title };
        });
        this.setState({ roomId: roomId, roomName: roomName, events: events });
      })
      .catch(err => {
        console.log(err);
      });
  }
  creatReservation(roomId, startAt, endAt, count) {
    let data = {
      startAt: startAt,
      endAt: endAt,
      count: count
    };
    RoomApi.createReservations(roomId, data)
      .then(res => {
        this.setEvents(this.state.roomId, this.state.roomName);
        NotificationManager.info(`${startAt} ~ ${endAt} 예약 되었습니다.`);
        this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        <NotificationContainer />
        <BigCalendar
          selectable
          views={['week', 'day']}
          events={this.state.events}
          step={30}
          timeslots={1}
          min={this.minTime}
          max={this.maxTime}
          formats={formats}
          defaultView={BigCalendar.Views.WEEK}
          defaultDate={new Date()}
          onSelectEvent={event =>
            Popup.alert(`${event.start.toLocaleString('ko-KR')} ~ ${event.end.toLocaleString('ko-KR')}, ${event.title || ''}`)
          }
          onSelectSlot={slotInfo =>
            this.openModal(slotInfo.start, slotInfo.end)
          }
          onNavigate={date =>
            this.setEvents(this.state.roomId, this.state.roomName, date)
          }
        />
        <Modal
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>room : {this.state.roomName}</div>
          <div>start : {this.state.startAt}</div>
          <div>end : {this.state.endAt}</div>
          <div>count : {this.state.count}</div>
          <div>
            <button onClick={this.closeModal}>close</button>
            <button onClick={(e) => this.creatReservation(this.state.roomId, this.state.startAt, this.state.endAt, this.state.count, e)}>ok</button>
          </div>
        </Modal>
        <Popup />
      </div>
    );
  }
}

export default Calendar;