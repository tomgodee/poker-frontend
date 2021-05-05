import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from '../../reducers/reduxCounter';

export default function ReduxCounter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div style={{ marginTop: 100 }}>
      <div>
        <button
          style={{ marginRight: 20 }}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Substact
        </button>
        <span>{count}</span>
        <button
          style={{ marginLeft: 20 }}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Add
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
