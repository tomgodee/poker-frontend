import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
} from '@material-ui/core';
import {
  Container,
  RoomContainer,
  RoomSkeleton,
} from './styles';
import roomService from '../../services/room';
import { Room } from '../Room/types';

const RoomList = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    roomService.getAll().then((res: any) => {
      setRooms(res.data.rooms);
    });
  }, []);

  const joinRoom = (id: number) => {
    history.push(`/room/${id}`);
  };

  return (
    <>
      <Container>
        {rooms.length
          ? (
            rooms.map((room) => {
              return (
                <RoomContainer
                  key={room.id}
                  onClick={() => joinRoom(room.id)}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height={170}
                    />
                    <CardContent>
                      <Typography component="p">
                        Room no.
                        {room.id}
                      </Typography>
                      <Typography component="p">
                        0/
                        {room.max_number_of_player}
                        {' '}
                        players
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </RoomContainer>
              );
            })
          )
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((room: number) => {
            return (
              <RoomSkeleton
                key={room}
                variant="rect"
              />
            );
          }) }
      </Container>
    </>
  );
};

export default React.memo(RoomList);
