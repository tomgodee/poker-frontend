import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Switch, Route, Redirect } from 'react-router-dom';
import {
  Divider,
} from '@material-ui/core';
import { ACCESS_TOKEN } from '../../config/localStorage';
import ReduxPage from '../ReduxPage';
import RoomList from '../RoomList';
import Room from '../Room';
import { verify } from '../../reducers/user';
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
  // const user = useSelector(selectUser);

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
              <HeaderMenuItem onClick={handleProfileMenuClose}>My profile</HeaderMenuItem>
              <HeaderMenuItem onClick={handleProfileMenuClose}>Log out</HeaderMenuItem>
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
            <Route path="/aaa" component={ReduxPage} />
            <Route path="/room/:id" component={Room} />
            <Route path="/roomlist" component={RoomList} />
            <Route path="/*">
              <Redirect to="roomlist" />
            </Route>
          </Switch>
        </ContentContainer>

      </FlexContainer>
    </>
  );
};

export default React.memo(Dashboard);
