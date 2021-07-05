import styled from 'styled-components';
import {
  Button,
} from '@material-ui/core';
import { white, gray, black, mintCream, red } from '../../themes/colors';

interface PlayerCardContainerProps {
  active: boolean;
}

export const PlayerCardContainer = styled.div<PlayerCardContainerProps>`
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  display: flex;
  width: 180px;
  height: 70px;
  border: 4px solid ${gray};
  border-radius: 10px;
  background: #000000;
  background: -webkit-linear-gradient(to right,#434343,#000000);
  background: linear-gradient(to right,#434343,#000000);
  opacity: 0.8;
  z-index: 1;
`;

export const PlayerAvatar = styled.div`
  width: 41.66%;
  border: 4px solid ${gray};
  border-left: none;
  border-top: none;
  border-bottom: none;
  color: ${white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PlayerInfo = styled.div`
  flex: 1 0 58.33%;
  color: ${mintCream};
  display: flex;
  flex-direction: column;
  justify-content: center;
  .money {
    color: springgreen;
  }
`;

export const SplitLine = styled.hr`
  background: #283048;
  background: -webkit-linear-gradient(to right, #859398, #283048);
  background: linear-gradient(to right, #859398, #283048);
  width: 70%;
  margin: 3px auto;
`;
