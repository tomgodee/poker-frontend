import React, { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  Typography,
} from '@material-ui/core';
import {
  FlexContainer,
  RoomContainer,
} from './styles';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser } from '../../reducers/user';
import { getRoom, selectRoom } from '../../reducers/room';
import { JOIN_ROOM } from '../../config/socketio';
import Chat from '../../components/Chat';
import Pokermon from '../Pokermon/Pokermon';

const Room = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as any;
  const user = useAppSelector(selectUser);
  const room = useAppSelector(selectRoom);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    socket.current = io('http://localhost:3000');
    if (params.id) {
      dispatch(getRoom(params.id));
    }
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user.name && room.id) {
      socket.current?.emit(JOIN_ROOM, {
        user: {
          name: user.name,
          money: user.money,
        },
        roomId: room.id,
        random_seat: room.random_seat,
        max_number_of_player: room.max_number_of_player,
      });
    }
  }, [user.name, room.id]);

  return (
    <>
      <FlexContainer>
        <RoomContainer>
          <Pokermon
            socket={socket.current!}
          />
        </RoomContainer>
        <Chat
          socket={socket.current!}
        />
      </FlexContainer>
    </>
  );
};

export default React.memo(Room);
