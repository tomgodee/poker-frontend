import styled from 'styled-components';
import {
  CardMedia,
  Typography,
} from '@material-ui/core';
import { mintCream, salmon, prussianBlue, green } from '../../themes/colors';

interface PlayerContainerProps {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export const TableContainer = styled.div`
  position: relative;
  display: flex;
  width: 75%;
  height: 500px;
  border: 12px solid ${salmon};
  border-radius: 50%;
  background-color: ${prussianBlue};
`;

export const TableTitle = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-style: italic;
  font-size: 3rem;
  opacity: 0.35;
  color: ${mintCream};
` as typeof Typography;

export const PublicCardsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 385px;
`;

interface CardProps {
  width: number;
  height: number;
}

export const Card = styled(CardMedia)<CardProps>`
  width: ${(props) => `${props.width || 75}px`};
  height: ${(props) => `${props.height || 115}px`};
  margin-left: 2px;
` as typeof CardMedia;

// TODO: Need to refactor this pile of trash
export const PlayerContainer = styled.div<PlayerContainerProps>`
  position: absolute;
  left: ${(props) => `${props.left}%`};
  right: ${(props) => `${props.right}%`};
  top: ${(props) => `${props.top}%`};
  bottom: ${(props) => `${props.bottom}%`};
  transform: ${(props) => (props.left || props.left === 0 || props.right || props.right === 0) && `translate(${-(props.left || props.right || 0)}%, ${-(props.top || props.bottom)}%)`};
  display: flex;
  flex-direction: column;
`;

export const PlayerCardsContainer = styled.div`
  display: flex;
  justify-content: center;
`;
