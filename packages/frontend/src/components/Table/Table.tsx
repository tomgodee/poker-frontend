import React, { useEffect, useMemo, useState, ChangeEvent } from 'react';
import { times } from 'lodash';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  TableContainer,
  TablePot,
  TableTitle,
  CommunityCardsContainer,
  PlayerContainer,
  Card,
  PlayerCardsContainer,
  PlayerBetMoney,
  ActionContainer,
  TableButton,
  MoneySlider,
  MoneyInput,
  ButtonsContainer,
  SliderContainer,
  AmountContainer,
} from './styles';
import PlayerProfileCard from '../PlayerProfileCard';
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
import { SUITES, ROUNDS } from '../../config/constants';
import type { Player } from '../../types/user';
import cardImages from '../../assets/cards';
import { getCardImageName } from '../../utils/helpers';

const getPlayerPosition = (position: number): any => {
  switch (position) {
    case 1:
      return {
        left: 50,
        top: 115,
      };
    case 2:
      return {
        left: 8.33,
        top: 100,
      };
    case 3:
      return {
        left: -8.33,
        top: 50,
      };
    case 4:
      return {
        left: -0,
        top: -8.33,
      };
    case 5:
      return {
        left: 33.33,
        top: -41.66,
      };
    case 6:
      return {
        left: 66.66,
        top: -41.66,
      };
    case 7:
      return {
        right: 0,
        top: -8.33,
      };
    case 8:
      return {
        right: -8.33,
        top: 50,
      };
    case 9:
      return {
        right: 8.33,
        top: 100,
      };
    default:
      return {
        left: 50,
        top: 110,
      };
  }
};

const getMoneyPosition = (position: number): any => {
  switch (position) {
    case 1:
      return {
        left: 50,
        top: 0,
      };
    case 2:
      return {
        right: -16.66,
        top: 0,
      };
    case 3:
      return {
        right: -16.66,
        top: 50,
      };
    case 4:
      return {
        right: -33.33,
        top: 75,
      };
    case 5:
      return {
        left: 50,
        bottom: -16.66,
      };
    case 6:
      return {
        left: 50,
        bottom: -16.66,
      };
    case 7:
      return {
        left: -41.66,
        top: 75,
      };
    case 8:
      return {
        left: -41.66,
        top: 50,
      };
    case 9:
      return {
        left: -16.66,
        top: 0,
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

interface PotInterface {
  amount: number;
  bestHandStrength: number;
  winners: string[];
  sidePot: boolean;
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

  const [communityCards, setcommunityCards] = useState<CardInterface[]>([]);
  const [roundBet, setRoundBet] = useState<number>(200);
  const [pots, setPots] = useState<PotInterface[]>([{
    amount: 300,
    bestHandStrength: 8000,
    winners: [],
    sidePot: false,
  }]);
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
      console.log('data', data);
      setcommunityCards(data.communityCards);
      setPlayers(data.players);
      setPots(data.pots);
      setRoundBet(data.roundBet);
      setRound(data.round);

      // TODO: The currentPlayer is recalculated in useMemo after this functions runs so its value at this point is old
      const asyncCurrentPlayer = data.players.find((player: any) => player.socketId === props.socket?.id);
      if (asyncCurrentPlayer && asyncCurrentPlayer.user.bet <= data.roundBet) {
        if (data.roundBet > asyncCurrentPlayer.user.money + asyncCurrentPlayer.user.bet) {
          setBetMoney(asyncCurrentPlayer.user.money);
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
      calledMoney: roundBet > currentPlayer!.user.money + currentPlayer!.user.bet
        ? currentPlayer!.user.money
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

  const handleChangeBet = (_: any, value: number | number[]):void => {
    setBetMoney(value as number);
  };

  const handleChangeBetInput = (event: ChangeEvent<HTMLInputElement>): void => {
    let money = Number(event.target.value);
    if (currentPlayer?.user && money > currentPlayer.user.money) money = currentPlayer.user.money;
    if (currentPlayer && money < roundBet - currentPlayer.user.bet) money = roundBet - currentPlayer.user.bet;
    setBetMoney(money);
  };

  return (
    <>
      <TableContainer>
        {pots.map((pot) => {
          return (
            <TablePot key={pot.bestHandStrength}>
              {pot.amount}
            </TablePot>
          );
        })}
        <TableTitle component="p">
          Pokermon
        </TableTitle>
        <CommunityCardsContainer>
          { communityCards.map((card) => {
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
        </CommunityCardsContainer>
        { positions.map((position) => {
          const cardPosition = getPlayerPosition(position);
          const moneyPosition = getMoneyPosition(position);
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
                  <PlayerBetMoney
                    top={moneyPosition.top}
                    bottom={moneyPosition.bottom}
                    left={moneyPosition.left}
                    right={moneyPosition.right}
                  >
                    {currentPlayer.user.bet ? currentPlayer.user.bet : ''}
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
              { (otherPlayer && otherPlayer.user.cards.length > 0)
                && (
                <>
                  <PlayerBetMoney
                    top={moneyPosition.top}
                    bottom={moneyPosition.bottom}
                    left={moneyPosition.left}
                    right={moneyPosition.right}
                  >
                    {otherPlayer.user.bet ? otherPlayer.user.bet : ''}
                  </PlayerBetMoney>
                  <PlayerCardsContainer>
                    <Card
                      component="img"
                      width={60}
                      height={90}
                      src={round !== ROUNDS.SHOWDOWN
                        ? cardImages.GrayCard
                        : (cardImages as {[key: string]: string})[getCardImageName(otherPlayer.user.cards[0].number, otherPlayer.user.cards[0].suite)] as string}
                    />
                    <Card
                      component="img"
                      width={60}
                      height={90}
                      src={round !== ROUNDS.SHOWDOWN
                        ? cardImages.GrayCard
                        : (cardImages as {[key: string]: string})[getCardImageName(otherPlayer.user.cards[1].number, otherPlayer.user.cards[1].suite)] as string}
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
                || (betMoney < 200 && roundBet === 0)
                || (betMoney < roundBet * 2 && roundBet === 200)
                || (betMoney < roundBet + 200 && roundBet > 200)}
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
                onClick={() => setBetMoney(currentPlayer.user.money + currentPlayer.user.bet)}
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
              max={currentPlayer.user.money}
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
