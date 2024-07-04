import { createContext, useContext as _useContext } from 'react';

type authContextType = {
  exercise: any;
  selectedDate: Date | undefined;
  setCurrSelectedDate: (date: Date) => void;
  setExerciseFunc: (erer: any) => void;
};

const authContextDefaultValues: authContextType = {
  exercise: {},
  selectedDate: undefined,
  setCurrSelectedDate: (date: Date) => {},
  setExerciseFunc: (erxe) => {},
};

export const Context = createContext<authContextType>(authContextDefaultValues);

export function useContext() {
  return _useContext(Context);
}
