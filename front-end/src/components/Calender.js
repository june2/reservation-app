import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BigCalendar from 'react-big-calendar'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Popup from 'react-popup';
import Moment from 'moment';
import DateUtil from '../utils/dates';
import * as RoomApi from '../services/room';

const formats = {
  timeGutterFormat: 'HH:mm',
  eventTimeRangeFormat: ({ start, end }, culture, local) =>
    local.format(start, 'HH:mm', culture) + '-' + local.format(end, 'HH:mm', culture),
  // dayFormat: 'MM-DD' + ' ' + 'dd',
};

class Calendar extends Component {
  constructor(props, context) {
    super(props, context);
    this.setDefault(); // 캘린더 component momentLocalizer 설정
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      events: [], // 달력 예약 이벤트 array      
      slot: [],
      roomId: null, // 미팅 룸 아이디
      roomName: null, // 미팅 룸 이름
      startAt: null, // 미팅 예약 시간 시작
      endAt: null, // 미팅 예약 시간 종료
      count: 1, // 미팅 예약 반복 횟수, default = 1      
      modal: false
    };
  }
  componentDidMount() {
    this.props.onRef(this);
    // 달력 예약 최소/최대 시간 설정
    this.minTime = new Date();
    this.minTime.setHours(8, 0, 0);
    this.maxTime = new Date();
    this.maxTime.setHours(19, 30, 0);
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  setDefault() {
    BigCalendar.momentLocalizer(Moment); // or globalizeLocalizer 
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
        // calender event data format으로 변경, utc => kst 변경
        let events = res.data.data.map((o) => {
          return { id: o.id, start: DateUtil.localdateTime(o.start), end: DateUtil.localdateTime(o.end), title: o.title };
        });
        this.setState({ roomId: roomId, roomName: roomName, events: events });
      })
      .catch(err => {
        Popup.alert(`${err}`);
      });
  }
  openModal(start, end) {
    // 예약 가능 시간 체크, 중복 예약 방지
    let begin = Moment(start).utc().format('YYYY-MM-DD HH:mm:ss');
    let last = Moment(Moment(start).format('YYYY-MM-DD 19:30:00')).utc().format('YYYY-MM-DD HH:mm:ss)');
    let params = { begin: begin, last: last };
    RoomApi.checkReservations(this.state.roomId, params)
      .then(res => {
        // 예약 가능 시간 타임슬롯 계산
        let event = res.data.data;
        let nextTime = Moment(start).format('YYYY-MM-DD 19:30:00'); // 당일 최대 예약 가능 시간
        if (event) {
          nextTime = DateUtil.localdateTime(event.start);
        }
        let min = Moment(start).valueOf();
        let max = Moment(nextTime).valueOf();
        let count = Math.round((max - min) / (3600000 / 2));
        for (let i = 1; i <= count; i++) {
          this.state.slot.push(i * 30);
        };
        this.setState({ startAt: Moment(start).format('YYYY-MM-DD HH:mm'), endAt: Moment(end).format('YYYY-MM-DD HH:mm'), modal: true });
      })
      .catch(err => {
        Popup.alert(`${err}`);
      });
  }
  closeModal() {
    this.setState({ slot: [] });
    this.setState({ modal: false });
  }
  creatReservation(roomId, startAt, endAt, count, memo) {
    let data = {
      startAt: startAt,
      endAt: endAt,
      count: count,
      memo: memo
    };
    RoomApi.createReservations(roomId, data)
      .then(res => {
        this.setEvents(this.state.roomId, this.state.roomName);
        NotificationManager.info(`${startAt} ~ ${endAt} 예약 되었습니다.`);
        this.closeModal();
      })
      .catch(err => {
        Popup.alert(`${err}`);
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
        <div>
          <Modal isOpen={this.state.modal} className='modal-dialog modal-lg'>          
            <ModalHeader>
              <div>예약 미팅룸 : {this.state.roomName}</div>
              <div>예약  시간 : {this.state.startAt} ~ {this.state.endAt}</div>
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup row>
                  <Label for="exampleEmail" sm={2}>예약 시간</Label>
                  <Col sm={10}>
                    <Input value={this.state.startAt} disabled />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>사용 시간(분)</Label>
                  <Col sm={10}>
                    <Input
                      type="select"
                      onChange={(evt) => {
                        let endAt = Moment(this.state.startAt).add(evt.target.value, 'minutes').format('YYYY-MM-DD HH:mm');
                        this.setState({ endAt: endAt })
                      }}>
                      {this.state.slot.map((val, i) => {
                        return (<option key={i}>{val}</option>);
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleSelect" sm={2}>반복 예약 수</Label>
                  <Col sm={10}>
                    <Input type="select" onChange={(evt) => this.setState({ count: evt.target.value })}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, i) => {
                        return (<option key={i}>{val}</option>);
                      })}
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="exampleText" sm={2}>메모</Label>
                  <Col sm={10}>
                    <Input type="textarea" onChange={(evt) => this.setState({ memo: evt.target.value })} />
                  </Col>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={(e) => this.creatReservation(this.state.roomId, this.state.startAt, this.state.endAt, this.state.count, this.state.memo, e)}>예약</Button>
              <Button color="secondary" onClick={this.closeModal}>취소</Button>
            </ModalFooter>
          </Modal>
        </div>
        <Popup />
      </div>
    );
  }
}

export default Calendar;