import styled from 'styled-components';
import {
  CardMedia,
} from '@material-ui/core';
import { mintCream } from '../../themes/colors';

interface PlayerContainerProps {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// TODO: Need to refactor this pile of trash
export const PlayerContainer = styled.div<PlayerContainerProps>`
  position: absolute;
  left: ${(props) => `${props.left}%`};
  right: ${(props) => `${props.right}%`};
  top: ${(props) => `${props.top}%`};
  bottom: ${(props) => `${props.bottom}%`};
  transform: ${(props) => (props.left || props.left === 0 || props.right || props.right === 0) && `translate(${-(props.left || props.right || 0)}%, ${-(props.top || props.bottom || 0)}%)`};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 188px;
  height: 177px;
`;

export const PlayerCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 50%;
  bottom: 7%;
  transform: translate(-50%, -7%);
`;

interface PlayerBetMoneyProps {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const PlayerBetMoney = styled.div<PlayerBetMoneyProps>`
  color: ${mintCream};
  position: absolute;
  left: ${(props) => `${props.left}%`};
  right: ${(props) => `${props.right}%`};
  top: ${(props) => `${props.top}%`};
  bottom: ${(props) => `${props.bottom}%`};
  transform: ${(props) => (props.left || props.left === 0 || props.right || props.right === 0) && `translate(${-(props.left || props.right || 0)}%, ${-(props.top || props.bottom || 0)}%)`};
`;

interface CardProps {
  width: number;
  height: number;
}

export const Card = styled(CardMedia)<CardProps>`
  width: ${(props) => `${props.width || 75}px`};
  height: ${(props) => `${props.height || 115}px`};
  margin-left: 1px;
  border: 1px solid gray;
` as typeof CardMedia;
