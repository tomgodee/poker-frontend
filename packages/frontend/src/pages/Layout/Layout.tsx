import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Switch, Route } from 'react-router-dom';
import {
  Divider,
} from '@material-ui/core';
import { ACCESS_TOKEN } from '../../constants/localStorage';
import ReduxPage from '../ReduxPage';
import RoomList from '../RoomList';
import { verify, selectUser } from '../../reducers/user';
import {
  HeaderAccountCircle as AccountCircle,
  Header,
  FlexContainer,
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
// import { LoginFormInputs } from './types';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) {
      history.push('/login');
    } else {
      dispatch(verify(accessToken));
    }
  }, []);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  return (
    <>
      <Header>
        <Toolbar>
          <IconButton>
            <HeaderMenuIcon />
          </IconButton>
          <HeaderTypography>
            Poke
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
              <HeaderMenuItem onClick={handleProfileMenuClose}>My profile</HeaderMenuItem>
              <HeaderMenuItem onClick={handleProfileMenuClose}>Log out</HeaderMenuItem>
            </HeaderMenu>
          </HeaderProfileContainer>
        </Toolbar>
      </Header>

      <FlexContainer>
        <SideNavContainer>
          {['Item 1', 'Item 2', 'Item 3', 'Item 4'].map((text) => (
            <SideNavItem key={text} disableRipple>
              {text}
            </SideNavItem>
          ))}
          <Divider />
        </SideNavContainer>

        <FlexContainer>
          <Switch>
            <Route path="/aaa" component={ReduxPage} />
            <Route path="/bbb" component={ReduxPage} />
            <Route path="/" component={RoomList} />
          </Switch>
        </FlexContainer>

      </FlexContainer>
    </>
  );
};

export default React.memo(Dashboard);
