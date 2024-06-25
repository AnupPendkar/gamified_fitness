'use client';

import Date from '@/app/shared/Date';
import { IDate } from '@/app/typings/common';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Home = () => {
  const workoutList = [
    {
      id: 1,
      name: 'asd',
      src: 'images/badge_rookie.svg',
      sets: 3,
      time: 10,
    },
    {
      id: 2,
      name: 'rew',
      src: 'images/badge_rookie.svg',
      sets: 3,
      time: 15,
    },
    {
      id: 3,
      name: 'wer',
      src: 'images/badge_rookie.svg',
      sets: 4,
      time: 20,
    },
    {
      id: 4,
      name: 'mdf',
      src: 'images/badge_rookie.svg',
      sets: 2,
      time: 8,
    },
    {
      id: 5,
      name: 'ytr',
      src: 'images/badge_rookie.svg',
      sets: 3,
      time: 9,
    },
    {
      id: 6,
      name: 'jfer',
      src: 'images/badge_rookie.svg',
      sets: 3,
      time: 12,
    },
  ];

  const router = useRouter();

  function handleWorkoutClk(id) {
    router.push(`/home/${id}`);
  }

  function getSelectedDate(date: IDate): void {
    console.log(date);
  }

  return (
    <div className="p-global">
      <Date getSelectedDate={getSelectedDate} />

      <div className="flex flex-wrap items-center justify-between">
        {workoutList?.map((itm) => (
          <div key={itm?.id} onClick={() => handleWorkoutClk(itm?.id)} className="flex flex-col items-center justify-between px-4 w-[150px] py-2 mb-5 rounded-lg bg-secondary">
            <p className="font-isb text-[16px]">{itm?.name}</p>
            <Image src={itm?.src} width={64} height={30} alt={itm?.name} />

            <div className="flex items-center justify-center gap-x-1 text-[14px] w-full">
              <p className="text-primary_text">{itm?.sets} Sets</p>
              <p className="text-primary_text">•</p>
              <p className="text-primary_text">{itm?.sets} Min</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
