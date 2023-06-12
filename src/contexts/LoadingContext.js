import React, { createContext, useReducer } from "react";

export const LoadingContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT_LOADING":
      return state + 1;
    case "DECREMENT_LOADING":
      return Math.max(0, state - 1);
    default:
      throw new Error();
  }
};

export const LoadingProvider = ({ children }) => {
  const [loading, dispatch] = useReducer(reducer, 0);

  return (
    <LoadingContext.Provider value={{ loading, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};
