import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectUser, verifyToken } from '../../reducers/user';
import {
  REDUX_PAGE_PATH, ROOMLIST_PATH, ROOM_PATH,
  LOGIN_PATH, PROFILE_PATH,
} from '../../config/paths';
import { ACCESS_TOKEN } from '../../config/localStorage';
import ReduxPage from '../ReduxPage';
import RoomList from '../RoomList';
import Room from '../Room';
import Profile from '../Profile';
import {
  HeaderAccountCircle as AccountCircle,
  Header,
  FlexContainer,
  ContentContainer,
  HeaderProfileContainer,
  SideNavContainer,
  SideNavItem,
  HeaderToolbar as Toolbar,
  HeaderIconButton as IconButton,
  HeaderMenu,
  HeaderMenuItem,
  HeaderMenuIcon,
  HeaderTypography,
} from './styles';
// import authenticationService from '../../services/authentication';
// import { logo } from '../../assets';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    history.push(`${PROFILE_PATH}/${user.id}`);
  };

  const logout = () => {
    setAnchorEl(null);
    localStorage.removeItem(ACCESS_TOKEN);
    history.push(LOGIN_PATH);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      history.push(LOGIN_PATH);
    } else {
      dispatch(verifyToken(accessToken));
    }
  }, []);

  return (
    <>
      <Header>
        <Toolbar>
          <IconButton>
            <HeaderMenuIcon />
          </IconButton>
          <HeaderTypography>
            Pokermon
          </HeaderTypography>

          <HeaderProfileContainer>
            <IconButton
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
            <HeaderMenu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={isMenuOpen}
              onClose={handleProfileMenuClose}
            >
              <HeaderMenuItem onClick={goToProfile}>My profile</HeaderMenuItem>
              <HeaderMenuItem onClick={logout}>Log out</HeaderMenuItem>
            </HeaderMenu>
          </HeaderProfileContainer>
        </Toolbar>
      </Header>

      <FlexContainer>
        {/* <SideNavContainer>
          {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((text) => (
            <SideNavItem key={text} disableRipple>
              {text}
            </SideNavItem>
          ))}
          <Divider />
        </SideNavContainer> */}

        <ContentContainer>
          <Switch>
            <Route path={REDUX_PAGE_PATH} component={ReduxPage} />
            <Route path={`${ROOM_PATH}/:id`} component={Room} />
            <Route path={ROOMLIST_PATH} component={RoomList} />
            <Route path={`${PROFILE_PATH}/:id`} component={Profile} />
            <Route path="/*">
              <Redirect to={ROOMLIST_PATH} />
            </Route>
          </Switch>
        </ContentContainer>

      </FlexContainer>
    </>
  );
};

export default React.memo(Dashboard);
