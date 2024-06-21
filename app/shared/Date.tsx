'use client';

import { useEffect, useRef } from 'react';
import { getAllDatesWithDays, getTodaysDate } from '../utils/timeFormatUtils';

const Date = () => {
  const dateContainerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const todaysDivSelector = dateContainerRef.current?.querySelector('.today');

    if (todaysDivSelector) {
      todaysDivSelector.scrollIntoView({ behavior: 'instant', inline: 'start' });
    }
  }, []);

  return (
    <div ref={dateContainerRef} className="flex overflow-auto mb-5 gap-x-4 md:gap-x-7">
      {getAllDatesWithDays(2024, 6)?.map((itm) => (
        <div
          className={`flex flex-col items-center justify-center rounded-lg px-3 py-2 w-[55px] ${
            getTodaysDate()?.date === itm?.date ? 'today bg-success text-primary_text_dark' : 'bg-secondary'
          }`}
        >
          <p className="font-isb">{itm?.date}</p>
          <p>{itm?.day}</p>
        </div>
      ))}
    </div>
  );
};

export default Date;
