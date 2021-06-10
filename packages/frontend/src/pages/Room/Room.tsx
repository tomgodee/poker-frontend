import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import {
  Typography,
} from '@material-ui/core';
import { shuffle } from '../../utils/helpers';
import {
  FlexContainer,
  RoomContainer,
  ChatContainer,
  MessageContainer,
  Message,
  Username,
  ChatInput,
} from './styles';
import {
  Room as RoomInterface,
  Message as MessageInterface,
} from './types';
import { selectUser } from '../../reducers/user';
import roomService from '../../services/room';
import { MESSAGE_SENT, JOIN_ROOM } from '../../constants/socketio';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Room = () => {
  const params = useParams() as any;
  const history = useHistory();
  const [room, setRoom] = useState<RoomInterface>({} as RoomInterface);
  const [chatMessages, setChatMessages] = useState<MessageInterface[]>([]);
  const [myMessage, setMyMessage] = useState<MessageInterface>({
    id: '',
    username: '',
    content: '',
    roomId: 0,
  });
  const user = useSelector(selectUser);

  useEffect(() => {
    socket = io('http://localhost:3000');
    socket.on(MESSAGE_SENT, (message) => {
      setChatMessages((prevChatMessages) => {
        return [...prevChatMessages, message];
      });
    });
    return () => { socket.disconnect(); };
  }, []);

  useEffect(() => {
    if (user.name && room.id) {
      socket.emit(JOIN_ROOM, {
        username: user.name,
        roomId: room.id,
      });
    }
  }, [user.name, room.id]);

  useEffect(() => {
    if (params.id) {
      roomService.getOne(params.id)
        .then((res: AxiosResponse<RoomInterface>) => {
          setRoom(res.data);
        })
        .catch((err) => {
          history.push('/roomlist');
        });
    }
  }, []);

  const handleSendMessageSuccessfully = () => {
    setMyMessage({
      id: '',
      username: user.name,
      content: '',
      roomId: room.id,
    });
  };

  const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter' && myMessage.content.trim().length > 0) {
      const sentMessage = {
        ...myMessage,
        id: shuffle(`${user.name}:${moment().unix()}`),
        username: user.name,
        roomId: room.id,
      };
      socket.emit(MESSAGE_SENT, sentMessage, handleSendMessageSuccessfully);
    }
  };

  return (
    <>
      <FlexContainer>
        <RoomContainer>
          <Typography component="h6">
            This is room
            {room.id}
          </Typography>
        </RoomContainer>
        <ChatContainer>
          <MessageContainer>
            { chatMessages.map((message) => {
              return (
                <Message
                  key={message.id}
                  component="p"
                >
                  <Username>
                    {`${message.username}: `}
                  </Username>
                  <span>
                    {message.content}
                  </span>
                </Message>
              );
            })}
          </MessageContainer>
          <ChatInput
            value={myMessage.content}
            color="primary"
            multiline
            name="chat input"
            placeholder="Send a message"
            inputProps={{
              maxLength: 255,
            }}
            onChange={(event) => {
              setMyMessage({
                ...myMessage,
                content: event.target.value,
              });
            }}
            onKeyDown={(event) => sendMessage(event)}
          />
        </ChatContainer>
      </FlexContainer>
    </>
  );
};

export default React.memo(Room);
