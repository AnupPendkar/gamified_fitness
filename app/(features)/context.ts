import { createContext, useContext as _useContext } from 'react';
import { IWorkout } from '../typings/common';

type authContextType = {
  workout: IWorkout | null;
  setWorkout: (workout: IWorkout) => void;
  exercise: any;
  selectedDate: Date | undefined;
  setCurrSelectedDate: (date: Date) => void;
  setExerciseFunc: (erer: any) => void;
};

const authContextDefaultValues: authContextType = {
  workout: null,
  exercise: {},
  selectedDate: undefined,
  setWorkout: (workout: IWorkout) => {},
  setCurrSelectedDate: (date: Date) => {},
  setExerciseFunc: (erxe) => {},
};

export const Context = createContext<authContextType>(authContextDefaultValues);

export function useContext() {
  return _useContext(Context);
}
