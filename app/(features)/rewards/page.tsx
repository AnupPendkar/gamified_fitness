'use client';

import Date from '@/app/shared/Date';
import { IDate } from '@/app/typings/common';

const Rewards = () => {
  const rewards = [
    {
      id: 1,
      name: 'sdf',
      xp: 10,
    },
    {
      id: 2,
      name: 'sdf',
      xp: 10,
    },
    {
      id: 3,
      name: 'sdf',
      xp: 10,
    },
    {
      id: 4,
      name: 'sdf',
      xp: 10,
    },
    {
      id: 5,
      name: 'sdf',
      xp: 10,
    },
  ];

  function getSelectedDate(date: IDate): void {
    console.log(date);
  }

  return (
    <div className="p-global">
      <Date getSelectedDate={getSelectedDate} />

      {rewards?.map((itm) => (
        <div key={itm?.id} className="flex items-center justify-between px-4 h-[46px] mb-4 rounded-md bg-secondary">
          <p className="font-isb">{itm?.name}</p>
          <p className="text-success">+{itm?.xp}xp</p>
        </div>
      ))}
    </div>
  );
};

export default Rewards;
