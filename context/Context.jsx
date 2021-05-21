import { useReducer, createContext } from "react";
import getWindow from "./reducers/window";
import getUser from "./reducers/users";

const initialState = {
  deviceWindow: {},
  user: {},
};

const Context = createContext({});

const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++) {
      state = reducers[i](state, action);
    }
    return state;
  };

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(getWindow, getUser),
    initialState
  );
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
