import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  Typography,
} from '@material-ui/core';
import {
  FlexContainer,
  RoomContainer,
} from './styles';
import {
  Room as RoomInterface,
} from './types';
import { selectUser } from '../../reducers/user';
import roomService from '../../services/room';
import { JOIN_ROOM } from '../../constants/socketio';
import Chat from '../../components/Chat';

const Room = () => {
  const params = useParams() as any;
  const history = useHistory();
  const [room, setRoom] = useState<RoomInterface>({} as RoomInterface);
  const user = useSelector(selectUser);
  const [socket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(io('http://localhost:3000'));

  useEffect(() => {
    if (user.name && room.id) {
      socket.emit(JOIN_ROOM, {
        username: user.name,
        roomId: room.id,
      });
    }
  }, [user.name, room.id]);

  useEffect(() => {
    if (params.id) {
      roomService.getOne(params.id)
        .then((res: AxiosResponse<RoomInterface>) => {
          setRoom(res.data);
        })
        .catch((err) => {
          history.push('/roomlist');
        });
    }
    return () => { socket.disconnect(); };
  }, []);

  return (
    <>
      <FlexContainer>
        <RoomContainer>
          <Typography component="h6">
            This is room
            {' '}
            {room.id}
          </Typography>
        </RoomContainer>
        <Chat
          socket={socket}
          room={room}
        />
      </FlexContainer>
    </>
  );
};

export default React.memo(Room);
