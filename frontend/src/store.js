import React, { createContext, useReducer } from "react";

const initialState = { dark:false };
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'swap_color':
        const newState = { ...state, dark:!state.dark }
        if(!state.dark){
          document.body.classList.add("dark");
        }else{
          document.body.classList.remove("dark");
        }
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }