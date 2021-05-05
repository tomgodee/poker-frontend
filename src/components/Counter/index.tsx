import React, { useContext, useEffect } from 'react';
import { RootContext } from '../Context';

const CounterResult = () => {
  const { dispatch, state } = useContext(RootContext);
  // console.log('counter', state);
  useEffect(() => {
    document.title = `${state.name}`;
  });

  return (
    <div>
      <button onClick={() => dispatch({type: 'Subtract'})}>Subtract</button>
      <p>{state.counter}</p>
      <button onClick={() => dispatch({type: 'Add'})}>Add</button>
    </div>
  )
};

export default CounterResult;
