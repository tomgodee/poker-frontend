import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  CardActionArea,
  CardContent,
  Typography,
  CardMedia,
  Button,
  TextField,
  Tooltip,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import {
  Container,
  BuyInModal,
  BuyInModalContent,
  BuyInModalActions,
  InputContainer,
  RoomContainer,
  RoomSkeleton,
} from './styles';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../reducers/user';
import roomService from '../../services/room';
import { ROOM_PATH } from '../../config/paths';
import { Room, BuyIn as BuyInInterface } from '../../types/room';

const BASIC_INPUT_VALIDATION = { required: true, min: 20000, max: 50000 };

const RoomList = () => {
  const history = useHistory();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [buyInModalOpen, setBuyInModalOpen] = useState<boolean>(false);
  const [roomID, setRoomID] = useState<number>(0);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    roomService.getAll().then((res: any) => {
      setRooms(res.data.rooms);
    });
  }, []);

  const { handleSubmit, control, reset } = useForm<BuyInInterface>({
    defaultValues: {
      money: 20000,
    },
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const joinRoom = (data: BuyInInterface) => {
    history.push(`${ROOM_PATH}/${roomID}`, data);
  };

  const clickRoom = (id: number) => {
    setRoomID(id);
    setBuyInModalOpen(true);
  };

  const closeBuyInModal = () => {
    reset();
    setRoomID(0);
    setBuyInModalOpen(false);
  };

  return (
    <Container>
      <BuyInModal
        open={buyInModalOpen}
      >
        <form onSubmit={handleSubmit(joinRoom)}>
          <BuyInModalContent>
            <Typography>
              Joining Room {roomID}
            </Typography>
            <Typography>
              You have: {user.money}
            </Typography>
            <InputContainer>
              <Typography>
                Buy in:
              </Typography>
              <Controller
                rules={BASIC_INPUT_VALIDATION}
                name="money"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <TextField
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      autoFocus
                      name="buyIn"
                      id="buyIn"
                      color="primary"
                      variant="outlined"
                      required
                      size="medium"
                      type="number"
                      error={fieldState.invalid}
                    />
                  );
                }}
              />
              <Tooltip title="Buy in must be between 20k - 50k" enterDelay={400} leaveDelay={200}>
                <InfoIcon />
              </Tooltip>
            </InputContainer>
          </BuyInModalContent>
          <BuyInModalActions>
            <Button type="button" variant="contained" color="primary" onClick={closeBuyInModal}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">Join room</Button>
          </BuyInModalActions>
        </form>
      </BuyInModal>
      {rooms.length
        ? (
          rooms.map((room) => {
            return (
              <RoomContainer
                key={room.id}
                onClick={() => clickRoom(room.id)}
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
  );
};

export default React.memo(RoomList);
