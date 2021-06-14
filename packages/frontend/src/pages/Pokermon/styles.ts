import styled from 'styled-components';
import {
  Button,
  Input,
  Typography,
} from '@material-ui/core';
import { green, salmon } from '../../themes/colors';

export const FlexContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 62px);
  margin-top: 100px;
`;

export const RoomContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

export const TableButton = styled(Button)`
  margin-top: 50px;
` as typeof Button;
