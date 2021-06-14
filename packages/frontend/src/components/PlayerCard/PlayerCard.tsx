import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
} from '@material-ui/core';
import {
  PlayerCardContainer,
  PlayerAvatar,
  PlayerInfo,
  SplitLine,
} from './styles';
import { selectUser } from '../../reducers/user';
import type { Player } from '../../types/user';

type PlayerCardProps = {
  position: number;
  player?: Player;
}

const getCssPosition = (position: number): any => {
  switch (position) {
    case 1:
      return {
        left: 50,
        top: 110,
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

const PlayerCard = (props: PlayerCardProps) => {
  const { position, player } = props;
  const user = useSelector(selectUser);

  const cardPosition = getCssPosition(position);
  return (
    <PlayerCardContainer
      left={cardPosition.left}
      top={cardPosition.top}
      right={cardPosition.right}
      bottom={cardPosition.bottom}
    >
      <PlayerAvatar>
        <Typography
          component="p"
        >
          Pokermon
        </Typography>
      </PlayerAvatar>
      <PlayerInfo>
        <Typography
          component="p"
        >
          {player?.user.name || 'No player'}
        </Typography>
        <SplitLine />
        <Typography
          component="p"
        >
          {player?.user.money || ''}
        </Typography>
      </PlayerInfo>
    </PlayerCardContainer>
  );
};

PlayerCard.defaultProps = {
  player: {
    socketId: '',
    user: {
      seat: 0,
      name: '',
      money: 0,
    },
  },
};

export default React.memo(PlayerCard);
