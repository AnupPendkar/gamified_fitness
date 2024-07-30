'use client';

import Date from '@/app/shared/Date';
import { ETarMuscle, IDate, IExercise } from '@/app/typings/common';
import { useEffect, useRef, useState } from 'react';
import { checkUserExists, getSession, getWorkout } from './serverFunc';
import { getTodaysDate } from '@/app/utils/timeFormatUtils';

const Rewards = () => {
  const [rewards, setRewards] = useState<any[]>([]);
  const workoutRef = useRef<ETarMuscle[]>([]);

  function getSelectedDate(date: IDate): void {
    fetchRewardsByDate(date?.dateObj as Date);
  }

  function isExerciseComplete(exer: IExercise): boolean {
    const totSets = exer?.sets?.length;
    const completedSets = exer?.sets?.reduce((prev, curr) => {
      if (curr?.completedReps >= (2 * curr?.totalReps) / 3) {
        return prev + 1;
      }
      return prev;
    }, 0);

    return completedSets === totSets;
  }

  function generateRewardsByExer(completedExer: IExercise[]) {
    const _rewards = completedExer?.map((exer, idx) => ({
      id: idx,
      task: exer?.exerciseId,
      xp: 10,
    }));

    setRewards(_rewards);
  }

  async function fetchRewardsByDate(date: Date) {
    const session = await getSession();
    const { user } = await checkUserExists(session?.user?.email);
    const userId = user?.id;

    if (date) {
      const workout = await getWorkout(userId, date);
      workoutRef.current = workout?.split as ETarMuscle[];
      const completedExer = workout?.exercises?.filter((exer) => isExerciseComplete(exer));

      if (completedExer) {
        generateRewardsByExer(completedExer);
      }
    }
  }

  useEffect(() => {
    fetchRewardsByDate(getTodaysDate()?.dateObj as Date);
  }, []);

  return (
    <div className="p-global">
      <Date split={workoutRef.current} getSelectedDate={getSelectedDate} />

      {rewards?.map((itm) => (
        <div key={itm?.id} className="flex items-center justify-between px-4 h-[46px] mb-4 rounded-md bg-secondary">
          <p className="font-isb">{itm?.task}</p>
          <p className="text-success">
            {itm?.xp > 0 && '+'}
            {itm?.xp}xp
          </p>
        </div>
      ))}

      {rewards?.length === 0 && (
        <div className="flex justify-center w-full absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
          <h1 className="font-isb text-[16px]">No Rewards to show !</h1>
        </div>
      )}
    </div>
  );
};

export default Rewards;
