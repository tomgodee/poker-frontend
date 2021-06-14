import styled from 'styled-components';
import {
  Button,
  Input,
  Typography,
  Avatar,
} from '@material-ui/core';
import { rose, green, mintCream } from '../../themes/colors';

interface PlayerCardContainerProps {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// TODO: Need to refactor this pile of trash
export const PlayerCardContainer = styled.div<PlayerCardContainerProps>`
  position: absolute;
  left: ${(props) => `${props.left}%`};
  right: ${(props) => `${props.right}%`};
  top: ${(props) => `${props.top}%`};
  bottom: ${(props) => `${props.bottom}%`};
  transform: ${(props) => (props.left || props.left === 0 || props.right || props.right === 0) && `translate(${-(props.left || props.right || 0)}%, ${-(props.top || props.bottom)}%)`};
  display: flex;
  width: 180px;
  height: 60px;
  border: 4px solid ${green};
  border-radius: 36px;
  background-color: ${mintCream};

`;

export const PlayerAvatar = styled.div`
  width: 41.66%;
  border: 4px solid ${green};
  border-radius: 0 36px 36px 0;
  border-left: none;
  border-top: none;
  border-bottom: none;
  color: ${rose};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayerInfo = styled.div`
  flex: 1 0 58.33%;
  color: ${rose};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SplitLine = styled.hr`
  border-color: ${green};
  width: 100%;
  margin: 3px 0;
`;
