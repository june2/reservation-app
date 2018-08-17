import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Calender from './../components/Calender';
import * as RoomApi from '../services/room';

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      rooms: [],
    };
  }
  componentDidMount() {
    RoomApi.findAll()
      .then(res => {
        this.setState({ rooms: res.data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  changeRoom(id) {
    this.calender.setEvents(id) // do stuff    
  }
  render() {
    return (
      <div>
        <div style={{ 'padding': '20px 0px 20px 0px' }}>
          {this.state.rooms.map((room, i) => {
            return (
              <span style={{ paddingRight: '20px' }} key={i}>
                <Button color="danger" onClick={(e) => this.changeRoom(room.id, e)}>{room.name}</Button>
              </span>
            );
          })}
        </div>
        <Calender onRef={ref => (this.calender = ref)}/>
      </div>
    );
  }
}

export default Home;
