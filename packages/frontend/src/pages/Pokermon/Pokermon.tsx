import React, { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  FlexContainer,
  TableButton,
} from './styles';
import Table from '../../components/Table';
import { useAppSelector } from '../../store/hooks';
import { selectRoom } from '../../reducers/room';
import {
  GAME_START,
} from '../../config/socketio';

interface PokermonProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Pokermon = (props: PokermonProps) => {
  const room = useAppSelector(selectRoom);

  const startGame = () => {
    props.socket.emit(GAME_START, {
      roomId: room.id,
    });
  };

  return (
    <>
      <FlexContainer>
        <Table
          socket={props.socket}
        />
        <TableButton
          color="primary"
          variant="contained"
          onClick={startGame}
        >
          Start
        </TableButton>
      </FlexContainer>
    </>
  );
};

export default React.memo(Pokermon);
