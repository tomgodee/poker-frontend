import React from 'react';
import { isArray } from 'lodash';
import {
  Typography,
} from '@material-ui/core';
import {
  PlayerCardContainer,
  PlayerAvatar,
  PlayerInfo,
  SplitLine,
} from './styles';
import type { Player } from '../../types/user';

type PlayerCardProps = {
  player?: Player;
}

const PlayerProfileCard = (props: PlayerCardProps) => {
  const { player } = props;
  let role;
  if (isArray(player?.user.role)) {
    role = player?.user.role.reduce((prev: string, current: string) => `${prev} ${current}`, '');
  } else {
    role = player?.user.role;
  }

  return (
    <PlayerCardContainer>
      <PlayerAvatar>
        <Typography
          component="p"
        >
          {role || 'Pokermon'}
        </Typography>
      </PlayerAvatar>
      <PlayerInfo>
        <Typography
          component="p"
        >
          {player?.user.name || ''}
        </Typography>
        <SplitLine />
        <Typography
          component="p"
        >
          {player?.user.money}
        </Typography>
      </PlayerInfo>
    </PlayerCardContainer>
  );
};

PlayerProfileCard.defaultProps = {
  player: {
    socketId: '',
    user: {
      seat: 0,
      name: '',
      money: 0,
    },
  },
};

export default React.memo(PlayerProfileCard);
