import React, { useContext } from 'react';
import { RootContext } from '../Context';

const Name = () => {
  const { dispatch, state } = useContext(RootContext);
  // console.log('name', state);

  return (
    <div>
      <input 
        value={state.name}
        onChange={(event) => dispatch({ type: 'Change', payload: { name: event.target.value }})}
      ></input>
    </div>
  )
};

export default Name;
