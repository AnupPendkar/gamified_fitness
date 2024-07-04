import { createContext, useContext as _useContext } from 'react';

//    {
//       id: 1,
//       exerciseId: 1
//       sets : [
//         {id: 3, setNo: 3, reps: 10, completedReps: 9, exerciseId: 1},
//         {id: 2, setNo: 2, reps: 10, completedReps: 10, exerciseId: 1},
//         {id: 1, setNo: 1, reps: 12, completedReps: 12, exerciseId: 1}
//       ]
//     }

type authContextType = {
  exercise: any;
  setExerciseFunc: (erer: any) => void;
};

const authContextDefaultValues: authContextType = {
  exercise: {},
  setExerciseFunc: (erxe) => {},
};

export const Context = createContext<authContextType>(authContextDefaultValues);

export function useContext() {
  return _useContext(Context);
}
