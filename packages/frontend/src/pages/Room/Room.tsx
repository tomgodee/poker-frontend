import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  BuyInDialog,
  FlexContainer,
  RoomContainer,
  LoadingOverlay,
  LoadingIcon,
} from './styles';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser } from '../../reducers/user';
import { getRoom, selectRoom } from '../../reducers/room';
import { JOIN_ROOM } from '../../config/socketio';
import { LOADING } from '../../config/status';
import Chat from '../../components/Chat';
import Pokermon from '../Pokermon/Pokermon';

const Room = () => {
  const dispatch = useAppDispatch();
  const params = useParams() as any;
  const user = useAppSelector(selectUser);
  const room = useAppSelector(selectRoom);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_WS_BASE_URL!);
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
          currentMoney: user.money,
        },
        roomId: room.id,
        random_seat: room.random_seat,
        max_number_of_player: room.max_number_of_player,
      });
    }
  }, [user.name, room.id]);

  return (
    <FlexContainer>
      <LoadingOverlay open={user.status === LOADING || room.status === LOADING}>
        <LoadingIcon />
      </LoadingOverlay>
      <RoomContainer>
        <Pokermon
          socket={socket.current!}
        />
      </RoomContainer>
      <Chat
        socket={socket.current!}
      />
    </FlexContainer>
  );
};

export default React.memo(Room);
