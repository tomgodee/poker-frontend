import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { shuffle } from '../../utils/helpers';
import {
  ChatContainer,
  MessageContainer,
  Message,
  Username,
  ChatInput,
} from './styles';
import {
  Room as RoomInterface,
  Message as MessageInterface,
} from '../../pages/Room/types';
import { selectUser } from '../../reducers/user';
import { MESSAGE_SENT } from '../../constants/socketio';

interface ChatProps {
  room: RoomInterface;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const Chat = (props: ChatProps) => {
  const [chatMessages, setChatMessages] = useState<MessageInterface[]>([]);
  const [myMessage, setMyMessage] = useState<MessageInterface>({
    id: '',
    username: '',
    content: '',
    roomId: 0,
  });
  const user = useSelector(selectUser);

  useEffect(() => {
    props.socket.on(MESSAGE_SENT, (message: MessageInterface) => {
      setChatMessages((prevChatMessages) => {
        return [...prevChatMessages, message];
      });
    });
  }, []);

  const handleSendMessageSuccessfully = () => {
    setMyMessage({
      id: '',
      username: user.name,
      content: '',
      roomId: props.room.id,
    });
  };

  const sendMessage = (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.key === 'Enter' && myMessage.content.trim().length > 0) {
      const sentMessage = {
        ...myMessage,
        id: shuffle(`${user.name}:${moment().unix()}`),
        username: user.name,
        roomId: props.room.id,
      };
      props.socket.emit(MESSAGE_SENT, sentMessage, handleSendMessageSuccessfully);
    }
  };

  return (
    <ChatContainer>
      <MessageContainer>
        { chatMessages.map((message: any) => {
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
  );
};

export default Chat;
