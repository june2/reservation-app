import React, { Component } from 'react';
import { Button } from 'reactstrap';
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
    console.log(id);
  }
  render() {
    return (
      <div style={{ 'padding': '20px 0px 20px 0px' }}>
        {this.state.rooms.map((room, i) => {
          return (
            <span style={{ paddingRight: '20px' }} key={i}>
              <Button color="danger" onClick={(e) => this.changeRoom(room.id, e)}>{room.name}</Button>
            </span>
          );
        })}
      </div>
    );
  }
}

export default Home;
