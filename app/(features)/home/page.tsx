'use client';

import Date from '@/app/shared/Date';
import { IDate } from '@/app/typings/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkUserExists, getSession, getWorkout } from './serverFunc';
import { getTodaysDate } from '@/app/utils/timeFormatUtils';
import { useContext } from '../context';

const Home = () => {
  const [workout, setWorkout] = useState<any[]>([]);
  const { setExerciseFunc } = useContext();
  const router = useRouter();

  function handleWorkoutClk(itm) {
    setExerciseFunc(itm);
    router.push(`/home/${itm?.id}`);
  }

  function getSelectedDate(date: IDate): void {
    fetchWorkoutList(date?.dateObj as Date);
  }

  function constructWorkout(res) {
    const workoutObj = res?.exercises?.map((exer) => ({
      id: exer?.id,
      name: exer?.exerciseId,
      src: 'images/badge_rookie.svg',
      sets: exer?.sets,
      time: 10,
    }));

    setWorkout(workoutObj);
  }

  async function fetchWorkoutList(date: Date) {
    const session = await getSession();
    const { user } = await checkUserExists(session?.user?.email);
    const userId = user?.id;

    if (date) {
      const workout = await getWorkout(userId, date);
      constructWorkout(workout);
    }
  }

  useEffect(() => {
    fetchWorkoutList(getTodaysDate()?.dateObj as Date);
  }, []);

  return (
    <div className="p-global">
      <Date getSelectedDate={getSelectedDate} />

      <div className="flex flex-wrap items-center justify-between">
        {workout?.map((itm) => (
          <div key={itm?.id} onClick={() => handleWorkoutClk(itm)} className="flex flex-col items-center justify-between px-4 w-[150px] py-2 mb-5 rounded-lg bg-secondary">
            <p className="font-isb text-[16px]">{itm?.name}</p>
            <Image src={itm?.src} width={64} height={30} alt={itm?.name} />

            <div className="flex items-center justify-center gap-x-1 text-[14px] w-full">
              <p className="text-primary_text">{itm?.sets?.length} Sets</p>
              <p className="text-primary_text">•</p>
              <p className="text-primary_text">{itm?.sets?.length} Min</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
