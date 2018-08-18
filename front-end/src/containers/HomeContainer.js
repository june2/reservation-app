import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Calender from './../components/Calender';
import * as RoomApi from '../services/room';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rooms: [],
      roomId: null
    };
  }
  componentDidMount() {
    RoomApi.findAll()
      .then(res => {
        this.setState({ rooms: res.data.data });
        if (this.state.rooms.length > 0) { // 미팅 룸이 null이 아닌경우 첫번쨰 룸 예약정보 랜더링
          this.changeRoom(this.state.rooms[0].id, this.state.rooms[0].name);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  changeRoom(id, name) {
    this.calender.setEvents(id, name);
  }
  render() {
    return (
      <div>
        <div style={{ 'padding': '20px 0px 20px 0px' }}>
          {this.state.rooms.map((room, i) => {
            return (
              <span style={{ paddingRight: '20px' }} key={i}>
                <Button color="danger" onClick={(e) => this.changeRoom(room.id, room.name, e)}>{room.name}</Button>
              </span>
            );
          })}
        </div>
        <Calender onRef={ref => (this.calender = ref)} />
      </div>
    );
  }
}

export default Home;
