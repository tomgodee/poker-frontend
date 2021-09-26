import React from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  PlayerContainer,
  PlayerCardsContainer,
  PlayerBetMoney,
  Card,
} from './styles';
import PlayerProfileCard from '../PlayerProfileCard';
import { ROUNDS } from '../../config/constants';
import type { Player } from '../../types/user';
import cardImages from '../../assets/cards';
import { getCardImageName } from '../../utils/helpers';

const getPlayerPosition = (position: number): any => {
  switch (position) {
    case 1:
      return {
        left: 51,
        top: 107,
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
        top: -39.66,
      };
    case 6:
      return {
        left: 66.66,
        top: -39.66,
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
        left: -33,
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

interface PlayerCardProps {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  position: number;
  players: Player[];
  currentPlayer: Player | undefined;
  round: string;
}

const PlayerCard = (props: PlayerCardProps) => {
  const cardPosition = getPlayerPosition(props.position);
  const moneyPosition = getMoneyPosition(props.position);
  const otherPlayer = props.players?.find((player) => player.user.seat === props.position && player.socketId !== props.socket.id);
  return (
    <PlayerContainer
      left={cardPosition.left}
      top={cardPosition.top}
      right={cardPosition.right}
      bottom={cardPosition.bottom}
    >
      {(props.currentPlayer && props.currentPlayer.user.cards.length > 0 && props.currentPlayer.user.seat === props.position)
        && (
          <>
            <PlayerBetMoney
              top={moneyPosition.top}
              bottom={moneyPosition.bottom}
              left={moneyPosition.left}
              right={moneyPosition.right}
            >
              {props.currentPlayer.user.bet ? props.currentPlayer.user.bet : ''}
            </PlayerBetMoney>
            <PlayerCardsContainer>
              <Card
                component="img"
                width={60}
                height={90}
                src={(cardImages as { [key: string]: string })[getCardImageName(props.currentPlayer.user.cards[0].number, props.currentPlayer.user.cards[0].suite)] as string}
              />
              <Card
                component="img"
                width={60}
                height={90}
                src={(cardImages as { [key: string]: string })[getCardImageName(props.currentPlayer.user.cards[1].number, props.currentPlayer.user.cards[1].suite)] as string}
              />
            </PlayerCardsContainer>
          </>
        )}
      {(otherPlayer && otherPlayer.user.cards.length > 0)
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
                src={props.round !== ROUNDS.SHOWDOWN
                  ? cardImages.GrayCard
                  : (cardImages as { [key: string]: string })[getCardImageName(otherPlayer.user.cards[0].number, otherPlayer.user.cards[0].suite)] as string}
              />
              <Card
                component="img"
                width={60}
                height={90}
                src={props.round !== ROUNDS.SHOWDOWN
                  ? cardImages.GrayCard
                  : (cardImages as { [key: string]: string })[getCardImageName(otherPlayer.user.cards[1].number, otherPlayer.user.cards[1].suite)] as string}
              />
            </PlayerCardsContainer>
          </>
        )}
      <PlayerProfileCard
        player={props.players?.find((player) => player.user.seat === props.position)}
      />
    </PlayerContainer>
  );
};

export default PlayerCard;
