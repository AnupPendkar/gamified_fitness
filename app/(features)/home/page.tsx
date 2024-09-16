'use client';

import Date from '@/app/shared/Date';
import { IDate, IExercise, IWorkout, UserDetailsEnum } from '@/app/typings/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getWorkout } from './serverFunc';
import { useContext } from '../context';
import useCheckSession from '@/app/hooks/useCheckSession';
import { useUser } from '@clerk/nextjs';

const Home = () => {
  const [exercises, setExercises] = useState<IExercise[]>([]);
  const { setExerciseFunc, setWorkout, workout, setCurrSelectedDate, selectedDate } = useContext();
  const dateRef = useRef<Date>();
  const router = useRouter();
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  const { handleUserSession } = useCheckSession();

  function handleWorkoutClk(itm) {
    setExerciseFunc(itm);
    setCurrSelectedDate(dateRef.current as Date);

    router.push(`/home/${itm?.id}`);
  }

  function getSelectedDate(date: IDate): void {
    if (dateRef.current?.getDate() !== date?.date) {
      fetchWorkoutList(date?.dateObj as Date);
    }

    dateRef.current = date?.dateObj;
  }

  function constructWorkout(res: IWorkout) {
    const exerList = res?.exercises?.map((exer) => ({
      src: 'images/badge_rookie.svg',
      time: 10,
      ...exer,
    }));

    setExercises(exerList);
  }

  async function fetchWorkoutList(date: Date) {
    const userId = localStorage.getItem(UserDetailsEnum.GAMIFIED_USER_ID);

    if (date && userId) {
      const workout = await getWorkout(+userId, date);
      setWorkout(workout as unknown as IWorkout);
      constructWorkout(workout as unknown as IWorkout);
    }
  }

  function getProgress(exer: IExercise): number {
    const totSets = exer?.sets?.length;
    const completedSets = exer?.sets?.reduce((prev, curr) => {
      if (curr?.completedReps >= (2 * curr?.totalReps) / 3) {
        return prev + 1;
      }
      return prev;
    }, 0);

    if (totSets < completedSets) {
      return 100;
    }

    return (completedSets * 100) / totSets;
  }

  useEffect(() => {
    (async function () {
      await handleUserSession();
    })();
  });

  return (
    <div className="p-global">
      <Date split={workout?.split} getSelectedDate={getSelectedDate} defaultDate={selectedDate} />

      <div className="flex flex-wrap items-center justify-between">
        {exercises?.map((itm) => (
          <div key={itm?.id} onClick={() => handleWorkoutClk(itm)} className="flex flex-col items-center justify-between relative px-4 w-[150px] py-2 mb-5 rounded-lg bg-secondary">
            <p className="font-isb text-[16px]">{itm?.name}</p>
            <Image src={itm?.src as string} width={64} height={30} alt="Exercise" />

            <div className="flex items-center justify-center gap-x-1 text-[14px] w-full">
              <p className="text-primary_text">{itm?.sets?.length} Sets</p>
              <p className="text-primary_text">•</p>
              <p className="text-primary_text">{itm?.sets?.length} Min</p>
            </div>

            <div className="absolute bg-success top-0 left-0 h-full rounded-lg opacity-15" style={{ width: `${getProgress(itm)}%` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
