'use client';

import { useState } from 'react';
import { Context } from './context';

const FeatureProvider = ({ children }) => {
  const [exercise, setExercise] = useState({});
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  function setExerciseFunc(exer) {
    setExercise(exer);
  }

  function setCurrSelectedDate(exer) {
    setSelectedDate(exer);
  }

  return (
    <>
      <Context.Provider value={{ exercise, setExerciseFunc, setCurrSelectedDate, selectedDate }}>{children}</Context.Provider>
    </>
  );
};

export default FeatureProvider;
