import React, { useEffect, useRef } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { useBeforeunload } from 'react-beforeunload';
import {
  FlexContainer,
  RoomContainer,
  LoadingOverlay,
  LoadingIcon,
} from './styles';
import userService from '../../services/user';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser } from '../../reducers/user';
import { getRoom, selectRoom } from '../../reducers/room';
import { JOIN_ROOM } from '../../config/socketio';
import { LOADING } from '../../config/status';
import { ROOMLIST_PATH } from '../../config/paths';
import { BuyIn as BuyInInterface } from '../../types/room';
import Chat from '../../components/Chat';
import Pokermon from '../Pokermon/Pokermon';

const Room = () => {
  const history = useHistory();
  const location = useLocation<BuyInInterface>();
  const dispatch = useAppDispatch();
  const params = useParams() as any;
  const user = useAppSelector(selectUser);
  const room = useAppSelector(selectRoom);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  const updateMoney = (id: number, money: number) => {
    userService.updateMoney(id, money);
  };

  // Stop user from reloading/ close then open the page again
  useBeforeunload(() => {
    history.replace(ROOMLIST_PATH);
  });

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
    if (!location.state?.money) history.push(ROOMLIST_PATH);
    if (user.name && room.id) {
      socket.current?.emit(JOIN_ROOM, {
        user: {
          id: user.id,
          name: user.name,
          currentMoney: Number(location.state.money),
          totalMoney: user.money - Number(location.state.money),
          // the type is number but since its a state coming through react-router its actually a string
        },
        roomId: room.id,
        random_seat: room.random_seat,
        max_number_of_player: room.max_number_of_player,
      }, () => updateMoney(user.id, user.money - Number(location.state.money)));
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
