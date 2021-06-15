import React, { useEffect, useMemo, useState } from 'react';
import { times } from 'lodash';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  TableContainer,
  TableTitle,
  PublicCardsContainer,
  PlayerContainer,
  Card,
  PlayerCardsContainer,
  PlayerBetMoney,
  ActionContainer,
  TableButton,
  MoneySlider,
} from './styles';
import PlayerProfileCard from '../PlayerProfileCard';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectRoom } from '../../reducers/room';
import {
  UPDATE_PLAYERS,
  UPDATE_TABLE,
  CHECK,
  CALL,
  BET,
  FOLD,
} from '../../config/socketio';
import { SUITES, PLAYER_STATUS } from '../../config/constants';
import type { Player } from '../../types/user';
import cardImages from '../../assets/cards';
import { getCardImageName } from '../../utils/helpers';

const getCssPosition = (position: number): any => {
  switch (position) {
    case 1:
      return {
        left: 50,
        top: 115,
      };
    case 2:
      return {
        left: 6.125,
        top: 100,
      };
    case 3:
      return {
        left: -8.33,
        top: 58.33,
      };
    case 4:
      return {
        left: 0,
        top: 16.66,
      };
    case 5:
      return {
        left: 33.33,
        top: -8.33,
      };
    case 6:
      return {
        left: 66.66,
        top: -8.33,
      };
    case 7:
      return {
        right: 0,
        top: 16.66,
      };
    case 8:
      return {
        right: -8.33,
        top: 58.33,
      };
    case 9:
      return {
        right: 0,
        top: 100,
      };
    default:
      return {
        left: 50,
        top: 110,
      };
  }
};
interface TableProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

interface CardInterface {
  number: number;
  suite: typeof SUITES.HEARTS | typeof SUITES.DIAMONDS | typeof SUITES.CLUBS | typeof SUITES.SPADES;
}

const Table = (props: TableProps) => {
  const room = useAppSelector(selectRoom);
  const [players, setPlayers] = useState<Player[]>([{
    socketId: '',
    user: {
      seat: 0,
      name: '',
      money: 0,
      bet: 0,
      hasActioned: false,
      actions: [],
      isActing: false,
      cards: [],
      role: '',
      status: '',
    },
  }]);

  const [publicCards, setPublicCards] = useState<CardInterface[]>([]);
  const [roundBet, setRoundBet] = useState<number>();
  const [pot, setPot] = useState<number>();
  const [betMoney, setBetMoney] = useState<number>(0);

  useEffect(() => {
    props.socket?.on(UPDATE_TABLE, (data) => {
      console.log('data', data);
      setPublicCards(data.publicCards);
      setPlayers(data.players);
      setRoundBet(data.roundBet);
      setPot(data.pot);
    });
  }, [props.socket]);

  useEffect(() => {
    props.socket?.on(UPDATE_PLAYERS, (updatedPlayers) => {
      setPlayers(() => updatedPlayers);
    });
  }, [props.socket, players]);

  const currentPlayer = useMemo(() => players.find((player) => player.socketId === props.socket?.id), [players]);
  const positions = useMemo(() => {
    let i = 0;
    return times(room.max_number_of_player, () => {
      i += 1;
      return i;
    });
  }, [room.max_number_of_player]);

  const check = () => {
    props.socket.emit(CHECK, {
      roomId: room.id,
    });
    console.log('check');
  };

  const call = () => {
    props.socket.emit(CALL, {
      roomId: room.id,
      currentPlayer,
    });
  };

  const bet = () => {
    props.socket.emit(BET, {
      roomId: room.id,
      betMoney,
    });
  };

  const fold = () => {
    console.log('fold');
  };

  const handleChangeBet = (_: any, value: number | number[]) => {
    console.log('value', value);
    setBetMoney(value as number);
  };

  return (
    <>
      <TableContainer>
        <p>
          {pot}
        </p>
        <TableTitle component="p">
          Pokermon
        </TableTitle>
        <PublicCardsContainer>
          { publicCards.map((card) => {
            return (
              <Card
                key={`${card.number}${card.suite}`}
                component="img"
                src={(cardImages as {[key: string]: string})[getCardImageName(card.number, card.suite)] as string}
                // TODO: Not the best practice, should find the correct way to infer type here
                // https://stackoverflow.com/questions/40358434/typescript-ts7015-element-implicitly-has-an-any-type-because-index-expression
              />
            );
          })}
        </PublicCardsContainer>
        { positions.map((position) => {
          const cardPosition = getCssPosition(position);
          const otherPlayer = players?.find((player) => player.user.seat === position && player.socketId !== props.socket.id);
          return (
            <PlayerContainer
              key={position}
              left={cardPosition.left}
              top={cardPosition.top}
              right={cardPosition.right}
              bottom={cardPosition.bottom}
            >
              { (currentPlayer && currentPlayer.user.cards.length > 0 && currentPlayer.user.seat === position)
                && (
                <>
                  <PlayerBetMoney>
                    {currentPlayer.user.bet}
                  </PlayerBetMoney>
                  <PlayerCardsContainer>
                    <Card
                      component="img"
                      width={60}
                      height={90}
                      src={(cardImages as {[key: string]: string})[getCardImageName(currentPlayer.user.cards[0].number, currentPlayer.user.cards[0].suite)] as string}
                    />
                    <Card
                      component="img"
                      width={60}
                      height={90}
                      src={(cardImages as {[key: string]: string})[getCardImageName(currentPlayer.user.cards[1].number, currentPlayer.user.cards[1].suite)] as string}
                    />
                  </PlayerCardsContainer>
                </>
                )}
              { (otherPlayer && currentPlayer && currentPlayer.user.cards.length > 0)
                && (
                <>
                  <PlayerBetMoney>
                    {otherPlayer.user.bet}
                  </PlayerBetMoney>
                  <PlayerCardsContainer>
                    <Card
                      component="img"
                      width={60}
                      height={90}
                      src={cardImages.GrayCard}
                    />
                    <Card
                      component="img"
                      width={60}
                      height={90}
                      src={cardImages.GrayCard}
                    />
                  </PlayerCardsContainer>
                </>
                )}
              <PlayerProfileCard
                player={players?.find((player) => player.user.seat === position)}
              />
            </PlayerContainer>
          );
        })}
      </TableContainer>

      { currentPlayer?.user
        && (
        <ActionContainer>
          <TableButton
            color="primary"
            variant="contained"
            onClick={check}
            disabled={!currentPlayer.user.actions.includes(CHECK) || !currentPlayer.user.isActing}
          >
            {CHECK}
          </TableButton>
          <TableButton
            color="primary"
            variant="contained"
            onClick={call}
            disabled={!currentPlayer.user.actions.includes(CALL) || !currentPlayer.user.isActing}
          >
            {CALL}
          </TableButton>
          <TableButton
            color="primary"
            variant="contained"
            onClick={bet}
            disabled={!currentPlayer.user.actions.includes(BET) || !currentPlayer.user.isActing}
          >
            {BET}
          </TableButton>
          <TableButton
            color="primary"
            variant="contained"
            onClick={fold}
            disabled={!currentPlayer.user.actions.includes(FOLD) || !currentPlayer.user.isActing}
          >
            {FOLD}
          </TableButton>
          <MoneySlider
            color="primary"
            min={0}
            max={currentPlayer.user.money}
            value={betMoney}
            onChange={handleChangeBet}
          />
        </ActionContainer>
        )}
    </>

  );
};

export default React.memo(Table);
