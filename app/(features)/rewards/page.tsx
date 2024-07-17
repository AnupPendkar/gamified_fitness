'use client';

import Date from '@/app/shared/Date';
import { IDate } from '@/app/typings/common';
import { useEffect, useState } from 'react';
import { checkUserExists, getRewards, getSession } from './serverFunc';
import { getTodaysDate } from '@/app/utils/timeFormatUtils';

const Rewards = () => {
  const [rewards, setRewards] = useState<any[]>([]);
  const [userId, setUserId] = useState<number>(0);

  function getSelectedDate(date: IDate): void {
    fetchRewardsByDate(date?.dateObj as Date);
  }

  async function fetchRewardsByDate(date: Date) {
    const session = await getSession();
    const { user } = await checkUserExists(session?.user?.email);
    const userId = user?.id;
    setUserId(user?.id);

    if (date) {
      const _rewards = await getRewards(userId, date);
      setRewards(_rewards);
    }
  }

  useEffect(() => {
    fetchRewardsByDate(getTodaysDate()?.dateObj as Date);
  }, []);

  return (
    <div className="p-global">
      <Date getSelectedDate={getSelectedDate} />

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
