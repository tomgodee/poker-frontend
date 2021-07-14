import styled from 'styled-components';
import {
  Backdrop,
  Dialog,
} from '@material-ui/core';
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

export const BuyInDialog = styled(Dialog)`

` as typeof Dialog;
