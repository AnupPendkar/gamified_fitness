'use client';

import { useState } from 'react';
import { Context } from './context';

const FeatureProvider = ({ children }) => {
  const [exercise, setExercise] = useState({});

  function setExerciseFunc(exer) {
    setExercise(exer);
  }

  return (
    <>
      <Context.Provider value={{ exercise, setExerciseFunc }}>{children}</Context.Provider>
    </>
  );
};

export default FeatureProvider;
