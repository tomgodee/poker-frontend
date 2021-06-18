import styled from 'styled-components';
import {
  Button,
  CardMedia,
  Typography,
  Slider,
  Input,
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

export const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 300px;
  padding: 12px;
  margin-top: 60px;
  border: 2px solid ${green};
`;

export const TablePot = styled(Typography)`
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  text-transform: uppercase;
  font-size: 1.5rem;
  color: ${mintCream};
` as typeof Typography;

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

export const CommunityCardsContainer = styled.div`
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
  transform: ${(props) => (props.left || props.left === 0 || props.right || props.right === 0) && `translate(${-(props.left || props.right || 0)}%, ${-(props.top || props.bottom || 0)}%)`};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 177px;
  height: 177px;
`;

export const PlayerCardsContainer = styled.div`
  display: flex;
  justify-content: center;
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

interface ButtonProps {
  left?: number;
}

export const TableButton = styled(Button)<ButtonProps>`
  width: 22%;
` as typeof Button;

export const MoneySlider = styled(Slider)`
  width: 100%;
` as typeof Slider;

export const MoneyInput = styled(Input)`
  width: 25%;
` as typeof Input;
