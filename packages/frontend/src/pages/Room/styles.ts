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
  height: calc(100vh - 64px);
`;

export const RoomContainer = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 360px;
  border: 2px solid ${green};
  border-top: none;
  border-right: none;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Message = styled(Typography)`
  padding: 6px;
  text-align: left;
  word-break: break-all;
` as typeof Typography;

export const Username = styled.span`
  color: ${salmon};
`;

export const ChatInput = styled(Input)`
  width: 98%;
  align-self: center;
  margin-bottom: 24px;
  padding: 12px;
  border: 2px solid ${green};
  border-radius: 8px;
` as typeof Input;
