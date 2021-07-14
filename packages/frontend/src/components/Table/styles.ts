import styled from 'styled-components';
import {
  Button,
  CardMedia,
  Typography,
  Slider,
  Input,
} from '@material-ui/core';
import { mintCream, gray, white, prussianBlue, black, blackPearl, charcoal, arapawa } from '../../themes/colors';
import backgroundTable from '../../assets/tomPoker.png';

export const TableContainer = styled.div`
  position: relative;
  display: flex;
  width: 75%;
  height: 550px;
  background-image: url(${backgroundTable});
  background-size: cover;
  background-position: center;
`;

export const ActionContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  width: 400px;
  padding: 12px;
  margin-top: 60px;
  background: ${black};
  background: linear-gradient(to right, ${charcoal}, ${black});
  border: 4px solid ${gray};
  opacity: 0.9;
  border-radius: 4px;
  @media (min-width: 960px) {
    flex-direction: row;
    width: 800px;
  }
`;

export const TablePotContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-around;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-30%);
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

export const CommunityCardsContainer = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -55%);
  display: flex;
`;

interface CardProps {
  width: number;
  height: number;
}

export const Card = styled(CardMedia) <CardProps>`
  width: ${(props) => `${props.width || 65}px`};
  height: ${(props) => `${props.height || 105}px`};
  margin-left: 1px;
  border: 1px solid gray;
` as typeof CardMedia;

interface ButtonProps {
  left?: number;
}

export const TableButton = styled(Button) <ButtonProps>`
  &.Mui-disabled {
    color: ${gray};
    background:  ${blackPearl};
    background: linear-gradient(to right,${arapawa}, ${prussianBlue}, ${blackPearl});
  }
  color: ${white};
  width: 22%;
` as typeof Button;

export const MoneySlider = styled(Slider)`
  width: 74%;
` as typeof Slider;

export const MoneyInput = styled(Input)`
  width: 16.66%;
  text-align: right;
  color: ${white};
  &:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${prussianBlue};
  }
  
  &.MuiInput-underline:before {
    border-bottom: 2px solid ${prussianBlue};
  }
  
  &.MuiInput-underline:after {
    border-bottom: 2px solid ${prussianBlue};
  }
` as typeof Input;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 12px;
  @media (min-width: 960px) {
    width: 50%;
    margin: 0;
    padding: 15px 0;
  }
`;

export const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (min-width: 960px) {
    width: 50%;
  }
`;

export const AmountContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 12px;
`;
