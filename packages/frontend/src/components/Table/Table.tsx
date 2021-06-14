import React, { useEffect, useMemo, useState } from 'react';
import { times } from 'lodash';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  TableContainer,
  TableTitle,
} from './styles';
import PlayerCard from '../PlayerCard';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectRoom } from '../../reducers/room';
import {
  UPDATE_PLAYERS,
  UPDATE_TABLE,
} from '../../config/socketio';
import { SUITES } from '../../config/constants';
import type { Player } from '../../types/user';

interface TableProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

interface Card {
  number: number;
  suite: typeof SUITES.HEARTS | typeof SUITES.DIAMONDS | typeof SUITES.CLUBS | typeof SUITES.SPADES;
}

const Table = (props: TableProps) => {
  const [players, setPlayers] = useState<Player[]>([{
    socketId: '',
    user: {
      seat: 0,
      name: '',
      money: 0,
    },
  }]);

  const [publicCards, setPublicCards] = useState<Card[]>([]);

  useEffect(() => {
    props.socket?.on(UPDATE_TABLE, (table) => {
      console.log('table', table);
      setPublicCards(table.publicCards);
    });
  }, [props.socket]);

  useEffect(() => {
    props.socket?.on(UPDATE_PLAYERS, (updatedPlayers) => {
      setPlayers(() => updatedPlayers);
    });
  }, [props.socket, players]);

  const room = useAppSelector(selectRoom);
  const positions = useMemo(() => {
    let i = 0;
    return times(room.max_number_of_player, () => {
      i += 1;
      return i;
    });
  }, [room.max_number_of_player]);

  return (
    <TableContainer>
      <TableTitle component="p">
        Pokermon
      </TableTitle>
      { publicCards.map((card) => {
        return (
          <p key={`${card.number}${card.suite}`}>{card.number} of {card.suite}</p>
        );
      })}
      { positions.map((position) => {
        return (
          <PlayerCard
            key={position}
            position={position}
            player={players?.find((player) => player.user.seat === position)}
          />
        );
      })}
    </TableContainer>
  );
};

export default React.memo(Table);
