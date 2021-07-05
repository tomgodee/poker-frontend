import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import { times } from 'lodash';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  TableContainer,
  TableTitle,
  TablePotContainer,
  CommunityCardsContainer,
  Card,
  ActionContainer,
  TableButton,
  MoneySlider,
  MoneyInput,
  ButtonsContainer,
  SliderContainer,
  AmountContainer,
} from './styles';
import TablePot from '../TablePot';
import PlayerCard from '../PlayerCard';
import { useAppSelector } from '../../store/hooks';
import { selectRoom } from '../../reducers/room';
import {
  UPDATE_PLAYERS,
  UPDATE_TABLE,
  CHECK,
  CALL,
  BET,
  ALL_IN,
  FOLD,
} from '../../config/socketio';
import { DEFAULT_BIG_BLIND, DEFAULT_POT } from '../../config/constants';
import type { Pot, Card as CardInterface } from '../../types/table';
import type { Player } from '../../types/user';
import cardImages from '../../assets/cards';
import { getCardImageName } from '../../utils/helpers';

interface TableProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Table = (props: TableProps) => {
  const room = useAppSelector(selectRoom);
  const [players, setPlayers] = useState<Player[]>([{
    socketId: '',
    user: {
      seat: 0,
      name: '',
      currentMoney: 0,
      totalMoney: 0,
      bet: 0,
      hasActioned: false,
      actions: [],
      isActing: false,
      cards: [],
      role: '',
      status: '',
    },
  }]);

  const [communityCards, setcommunityCards] = useState<CardInterface[]>([]);
  const [roundBet, setRoundBet] = useState<number>(DEFAULT_BIG_BLIND);
  const [pots, setPots] = useState<Pot[]>([DEFAULT_POT]);
  const [betMoney, setBetMoney] = useState<number>(0);
  const [round, setRound] = useState<string>('');

  const currentPlayer = useMemo(() => players.find((player) => player.socketId === props.socket?.id), [players]);
  const positions = useMemo(() => {
    let i = 0;
    return times(room.max_number_of_player, () => {
      i += 1;
      return i;
    });
  }, [room.max_number_of_player]);

  useEffect(() => {
    props.socket?.on(UPDATE_TABLE, (data) => {
      // console.log('data', data);
      setPlayers(data.players);
      setPots(data.pots);
      setcommunityCards(data.communityCards);
      setRoundBet(data.roundBet);
      setRound(data.round);

      // TODO: The currentPlayer is recalculated in useMemo after this functions runs so its value at this point is not the latest value
      const asyncCurrentPlayer = data.players.find((player: any) => player.socketId === props.socket?.id);
      if (asyncCurrentPlayer && asyncCurrentPlayer.user.bet <= data.roundBet) {
        if (data.roundBet > asyncCurrentPlayer.user.currentMoney + asyncCurrentPlayer.user.bet) {
          setBetMoney(asyncCurrentPlayer.user.currentMoney);
        } else {
          setBetMoney(data.roundBet - asyncCurrentPlayer.user.bet);
        }
      }
    });
  }, [props.socket, currentPlayer]);

  useEffect(() => {
    props.socket?.on(UPDATE_PLAYERS, (updatedPlayers) => {
      setPlayers(() => updatedPlayers);
    });
  }, [props.socket, players]);

  const check = () => {
    props.socket.emit(CHECK, {
      roomId: room.id,
    });
  };

  const call = () => {
    props.socket.emit(CALL, {
      roomId: room.id,
      currentPlayer,
      calledMoney: roundBet > currentPlayer!.user.currentMoney + currentPlayer!.user.bet
        ? currentPlayer!.user.currentMoney
        : roundBet - currentPlayer!.user.bet,
    });
    setBetMoney(0);
  };

  const bet = () => {
    props.socket.emit(BET, {
      roomId: room.id,
      betMoney,
    });
    setBetMoney(0);
  };

  const fold = () => {
    props.socket.emit(FOLD, {
      roomId: room.id,
    });
  };

  const handleChangeBet = (_: any, value: number | number[]): void => {
    setBetMoney(value as number);
  };

  const handleChangeBetInput = (event: ChangeEvent<HTMLInputElement>): void => {
    let money = Number(event.target.value);
    if (currentPlayer?.user && money > currentPlayer.user.currentMoney) money = currentPlayer.user.currentMoney;
    if (currentPlayer && money < roundBet - currentPlayer.user.bet) money = roundBet - currentPlayer.user.bet;
    setBetMoney(money);
  };
  return (
    <>
      <TableContainer>
        <TablePotContainer>
          {pots.map((pot) => <TablePot amount={pot.amount} key={pot.id} />)}
        </TablePotContainer>
        <CommunityCardsContainer>
          {communityCards.map((card) => {
            return (
              <Card
                key={`${card.number}${card.suite}`}
                component="img"
                src={(cardImages as { [key: string]: string })[getCardImageName(card.number, card.suite)] as string}
              // TODO: Not the best practice, should find the correct way to infer type here
              // https://stackoverflow.com/questions/40358434/typescript-ts7015-element-implicitly-has-an-any-type-because-index-expression
              />
            );
          })}
        </CommunityCardsContainer>
        {positions.map((position) => {
          return (
            <PlayerCard
              key={position}
              socket={props.socket}
              position={position}
              players={players}
              currentPlayer={currentPlayer}
              round={round}
            />
          );
        })}
      </TableContainer>

      {currentPlayer?.user
        && (
          <ActionContainer>
            <ButtonsContainer>
              <TableButton
                color="primary"
                variant="contained"
                onClick={fold}
                disabled={!currentPlayer.user.actions.includes(FOLD) || !currentPlayer.user.isActing}
              >
                {FOLD}
              </TableButton>
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
                disabled={!currentPlayer.user.actions.includes(BET)
                  || !currentPlayer.user.isActing
                  || (betMoney < DEFAULT_BIG_BLIND && roundBet === 0)
                  || (betMoney < roundBet * 2 && roundBet === DEFAULT_BIG_BLIND)
                  || (betMoney < roundBet + DEFAULT_BIG_BLIND && roundBet > DEFAULT_BIG_BLIND)}
              >
                {BET}
              </TableButton>
            </ButtonsContainer>

            <SliderContainer>
              <AmountContainer>
                <TableButton
                  color="primary"
                  variant="contained"
                  onClick={() => setBetMoney(pots[0].amount! / 2)}
                  disabled={!currentPlayer.user.actions.includes(BET) || !currentPlayer.user.isActing}
                >
                  1/2 pot
                </TableButton>
                <TableButton
                  color="primary"
                  variant="contained"
                  onClick={() => setBetMoney(Math.floor(pots[0].amount! * (2 / 3)))}
                  disabled={!currentPlayer.user.actions.includes(BET) || !currentPlayer.user.isActing}
                >
                  2/3 pot
                </TableButton>
                <TableButton
                  color="primary"
                  variant="contained"
                  onClick={() => setBetMoney(pots[0].amount!)}
                  disabled={!currentPlayer.user.actions.includes(BET) || !currentPlayer.user.isActing}
                >
                  pot
                </TableButton>
                <TableButton
                  color="primary"
                  variant="contained"
                  onClick={() => setBetMoney(currentPlayer.user.currentMoney + currentPlayer.user.bet)}
                  disabled={!currentPlayer.user.actions.includes(BET) || !currentPlayer.user.isActing}
                >
                  {ALL_IN}
                </TableButton>
              </AmountContainer>

              <MoneyInput
                type="number"
                color="primary"
                value={betMoney}
                onChange={handleChangeBetInput}
              />
              <MoneySlider
                color="primary"
                min={roundBet - currentPlayer.user.bet}
                max={currentPlayer.user.currentMoney}
                value={betMoney}
                onChange={handleChangeBet}
              />
            </SliderContainer>
          </ActionContainer>
        )}
    </>
  );
};

export default React.memo(Table);
