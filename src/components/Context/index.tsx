import React, { useReducer, createContext }  from 'react';
import Counter from '../Counter';
import Name from '../Name';

export const RootContext = createContext({} as any);

interface CounterState {
  counter: number;
}

interface NameState { 
  name: string;
}

interface CounterAction {
  type: string;
}

interface NameAction {
  type: string;
  payload: {
    name: string;
  };
}

const initialState = {
  counter: 0,
  name: 'tom',
};

const combineReducers = (...reducers: Function[]) => 
  (state: any = initialState, action: any): any => {
    for(let i=0;i<reducers.length;i++) 
      state = reducers[i](state, action)
    return state;
  }

const counterReducer = (state: CounterState, action: CounterAction): any => {
  switch (action.type) {
    case 'Add':
      return {
        ...state,
        counter: state.counter + 1,
      }
    case 'Subtract':
      return {
        ...state,
        counter: state.counter - 1,
      }
    default:
      return {
        ...state,
      }
  }
}

const nameReducer = (state: NameState, action: NameAction): any => {
  switch (action.type) {
    case 'Change':
      return {
        ...state,
        name: action.payload.name,
      }
    default:
      return {
        ...state,
      }
  }
}

const Context = () => {
  const [state, dispatch] = useReducer(combineReducers(counterReducer, nameReducer) , initialState);

  return (
    <RootContext.Provider value={{ state, dispatch }}>
      <Counter />
      <Name />
    </RootContext.Provider>
  )
};

export default Context;
