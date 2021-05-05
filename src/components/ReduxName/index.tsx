import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectName,
  change,
} from '../../reducers/reduxName';
import values from 'values';

const ReduxName = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  console.log('values', values);

  return (
    <div>
      <input
        value={name}
        onChange={(event) => dispatch(change({ name: event.target.value }))}
      >
      </input>
    </div>
  )
};

export default ReduxName;
