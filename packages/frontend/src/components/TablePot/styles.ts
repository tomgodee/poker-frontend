import styled from 'styled-components';
import {
  Typography,
} from '@material-ui/core';
import { mintCream, green } from '../../themes/colors';

export const TablePotContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: ${mintCream};
`;

export const PotAmount = styled(Typography)`
  width: 100%;
` as typeof Typography;

export const ChipStackContainer = styled.div`
  display: flex;
  align-items: flex-end;
  height: 24px;
`;

export const ChipStack = styled.div`
  position: relative;
  width: 24px;
`;

interface ChipProps {
  top: number;
}

export const Chip = styled.div<ChipProps>`
  position: absolute;
  top: ${(props) => `-${props.top * 3}px`};
  width: 22px;
  height: 22px;
  background-color: white;
  border: 2px solid ${green};
  border-radius: 50%;
`;

export const ChipInnerRing = styled.div`
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: white;
  border: 1px solid ${green};
  border-radius: 50%;
`;

export const ChipNumber = styled(Typography)`
  color: black;
  font-size: 9px;
` as typeof Typography;
