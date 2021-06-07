import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { ACCESS_TOKEN } from '../../constants/localStorage';
import { selectUser, login } from '../../reducers/user';
import {
  LoginContainer as Container,
  LoginContainerGrid as ContainerGrid,
  LoginItemGrid as ItemGrid,
  LoginButton as Button,
  LoginCard as Card,
  LoginCardMedia as CardMedia,
  LoginTextField as TextField,
  LoginForm as Form,
} from './styles';
import { logo } from '../../assets';
import { LoginFormInputs } from './types';

const BASIC_INPUT_VALIDATION = { required: true, maxLength: 255 };
const USERNAME = 'username';
const PASSWORD = 'password';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  // eslint-disable-next-line no-unused-vars
  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues: {
      username: '',
      password: '',
    },
    criteriaMode: 'all',
    shouldFocusError: true,
  });

  const submitHandler = (data: LoginFormInputs) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      // fetch user with the token
      history.push('/');
    }
    if (user.id) {
      history.push('/');
    }
  }, [user]);

  return (
    <Container>
      <ContainerGrid container>
        <ItemGrid item xs={12} md={7}>
          <Card>
            <CardMedia
              image={logo}
            />
          </Card>
        </ItemGrid>
        <ItemGrid item xs={12} md={5}>
          <Form onSubmit={handleSubmit(submitHandler)} $flex $directionColumn>
            <Controller
              rules={BASIC_INPUT_VALIDATION}
              name={USERNAME}
              control={control}
              render={({ field, fieldState }) => {
                const error = fieldState.invalid || Boolean(user.error);
                return (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value.trim())}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    error={error}
                    autoFocus
                    color="primary"
                    label="Username"
                    id={USERNAME}
                    name={USERNAME}
                    required
                    type="text"
                    variant="outlined"
                    helperText={error ? 'Incorrect input' : ''}
                  />
                );
              }}
            />
            <Controller
              rules={BASIC_INPUT_VALIDATION}
              name={PASSWORD}
              control={control}
              render={({ field, fieldState }) => {
                const error = fieldState.invalid || Boolean(user.error);
                return (
                  <TextField
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value.trim())}
                    onBlur={field.onBlur}
                    inputRef={field.ref}
                    error={error}
                    color="primary"
                    label="Password"
                    id={PASSWORD}
                    name={PASSWORD}
                    required
                    type="password"
                    variant="outlined"
                    helperText={error ? 'Incorrect input' : ''}
                  />
                );
              }}
            />
            <Button type="submit" variant="contained" color="primary">Log in</Button>
          </Form>
        </ItemGrid>
      </ContainerGrid>
    </Container>
  );
};

export default React.memo(Login);
