import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/localStorage';
import { verify, selectUser } from '../../reducers/user';
// import authenticationService from '../../services/authentication';
// import { logo } from '../../assets';
// import { LoginFormInputs } from './types';

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
    <div>
      aaa
    </div>
  );
};

export default React.memo(Dashboard);
