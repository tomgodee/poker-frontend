import styled from 'styled-components';
import {
  Button,
} from '@material-ui/core';
import { rose, green, mintCream } from '../../themes/colors';

interface PlayerCardContainerProps {
  active: boolean;
}

export const PlayerCardContainer = styled.div<PlayerCardContainerProps>`
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  display: flex;
  width: 180px;
  height: 60px;
  border: 4px solid ${green};
  border-radius: 36px;
  background-color: ${mintCream};
  z-index: 1;
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
