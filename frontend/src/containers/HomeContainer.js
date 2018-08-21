import React, { Component } from 'react';
import { Row, Col, Nav, NavItem, NavLink, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Calender from './../components/Calender';
import * as RoomApi from '../services/room';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rooms: [],
      roomId: null,
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    RoomApi.findAll()
      .then(res => {
        if(res.data.data){
          this.setState({ rooms: res.data.data });
          if (this.state.rooms.length > 0) { // 미팅 룸이 null이 아닌경우 첫번쨰 룸 예약정보 랜더링
            this.changeRoom(this.state.rooms[0].id, this.state.rooms[0].name);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  changeRoom(id, name) {
    this.calender.setEvents(id, name);
  }
  render() {
    return (
      <div style={{ 'padding': '20px 0px 20px 0px' }}>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader>미팅룸 예약 사용 설명</ModalHeader>
          <ModalBody>
            <ul>
              <li>좌측 상단에서 예약하고자하는 미팅룸을 선택하세요.</li>
              <li>예약하고자 하는 날짜와 시간 슬롯을 선택하세요.</li>
              <li>예약 팝업창이 뜨면, 예약 시간을 선택하세요.</li>
              <li>시간과 메모란을 입력 후 확인버튼을 누르면 예약이 완료됩니다.</li>
              <li>같은 시간 반복 예약을 하실 경우, 반복 예약 count를 설정하시면 됩니다.</li>
              <li className='text-danger'>모든 미팅룸은 08:00 ~ 19:30까지 사용/예약 가능합니다.</li>
              <li className='text-danger'>예약은 시간은 30분단위로 가능합니다.</li>
              <li className='text-danger'>반복 예약은 최대 10번까지 가능합니다.</li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Row>
          <Col>
            <Nav>
              {this.state.rooms.map((room, i) => {
                return (
                  <NavItem key={i}>
                    <NavLink href='#' onClick={(e) => this.changeRoom(room.id, room.name, e)} >{room.name}</NavLink>
                  </NavItem>
                );
              })}
            </Nav>
          </Col>
          <Col>
            <Nav className="float-right">
              <NavItem>
                <NavLink href='#' onClick={this.toggle} >사용법</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
        <hr />
        <Calender onRef={ref => (this.calender = ref)} />
      </div>
    );
  }
}

export default Home;
