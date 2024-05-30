import { GlobalStateType } from '@/providers/mainReducer';
import { createContext, useContext, useReducer } from 'react';

// @ts-ignore
export const StateContext = createContext();

export const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: {
    (state: GlobalStateType, action: any): any;
  };
  initialState: any;
  children: any;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useStateValue must be used within a StateProvider');
  }
  return context as { state: GlobalStateType; dispatch: any };
};
