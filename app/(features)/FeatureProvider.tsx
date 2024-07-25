'use client';

import { useState } from 'react';
import { Context } from './context';
import { IWorkout } from '../typings/common';

const FeatureProvider = ({ children }) => {
  const [exercise, setExercise] = useState({});
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  function setExerciseFunc(exer) {
    setExercise(exer);
  }

  function setCurrSelectedDate(exer) {
    setSelectedDate(exer);
  }

  return (
    <>
      <Context.Provider value={{ workout, setWorkout, exercise, setExerciseFunc, setCurrSelectedDate, selectedDate }}>{children}</Context.Provider>
    </>
  );
};

export default FeatureProvider;
