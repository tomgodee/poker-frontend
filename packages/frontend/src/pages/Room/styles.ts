import styled from 'styled-components';
import {
  Button,
  Input,
  Typography,
} from '@material-ui/core';
import { green, salmon } from '../../themes/colors';
import backGroundMain from '../../assets/Back_Ground_Main.jpg';

export const FlexContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  background-image: url(${backGroundMain});
  background-size: cover;
  background-position: center;
  position: fixed;
  width: 100%;
  height: 100%;
`;

export const RoomContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
`;
