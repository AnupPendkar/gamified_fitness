'use client';
import { StreakEnum } from '@/app/typings/common';
import { getAllDatesWithDays, getTodaysDate } from '@/app/utils/timeFormatUtils';
import { LineChart, BarChart, PieChart } from '@mui/x-charts';
import { useEffect, useState } from 'react';

interface IStreakDate {
  dateObj: Date;
  date: number;
  state: StreakEnum;
}

const Analytics = () => {
  const [streakDates, setStreakDates] = useState<IStreakDate[]>([]);

  function getDays(): IStreakDate[] {
    const { dateObj } = getTodaysDate();
    let targetDays = 100;
    if (!dateObj) {
      return [];
    }

    const days: IStreakDate[] = [];
    const today = new Date();
    const dateBeforeTarDays = new Date(today);

    dateBeforeTarDays.setDate(today.getDate() - targetDays);
    let dayBeforeTarDays = dateBeforeTarDays?.getDay();

    if (dayBeforeTarDays === 0) {
      targetDays--;
    } else {
      while (dayBeforeTarDays-- !== 1) {
        targetDays++;
      }
    }

    while (targetDays) {
      const date = new Date();
      date.setDate(today.getDate() - targetDays);

      days.push({
        dateObj: date,
        date: date?.getDate(),
        state: StreakEnum.MISS,
      });

      targetDays--;
    }

    return days;
  }

  function getStreakClass(state: StreakEnum) {
    switch (state) {
      case StreakEnum.CHECK_IN:
        return 'bg-success';

      case StreakEnum.DAY_OFF:
        return 'bg-primary';

      case StreakEnum.MISS:
        return 'bg-error';

      default:
        return '';
    }
  }

  useEffect(() => {
    const days = getDays();
    setStreakDates(days);
  }, []);

  return (
    <div className="p-global">
      <LineChart
        margin={{
          left: 30,
          right: 20,
          top: 20,
          bottom: 30,
        }}
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
            color: '#EA1FFA',
          },
        ]}
        width={371}
        className="rounded-lg bg-secondary"
        height={180}
      />

      <div className="mt-3 rounded-lg bg-secondary pl-2 p-3 w-[371px]">
        <div className="flex justify-between mb-3 px-5">
          <div className="flex flex-col items-center">
            <span className="text-[20px] text-primary_text font-isb">50</span>
            <span className="text-[16px] text-secondary_text inter">Streak</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[20px] text-primary_text font-isb">10</span>
            <span className="text-[16px] text-secondary_text inter">Miss</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[20px] text-primary_text font-isb">80</span>
            <span className="text-[16px] text-secondary_text inter">Check Ins</span>
          </div>
        </div>
        <div className="flex gap-[5px]">
          <div className="flex flex-col gap-[5px]">
            <div className="w-4 h-4 flex items-center">
              <span className="text-[10px]">M</span>
            </div>
            <div className="w-4 h-4">
              <span className="text-[12px]"></span>
            </div>
            <div className="w-4 h-4 flex items-center">
              <span className="text-[12px]">W</span>
            </div>
            <div className="w-4 h-4">
              <span className="text-[12px]"></span>
            </div>
            <div className="w-4 h-4 flex items-center">
              <span className="text-[12px]">F</span>
            </div>
            <div className="w-4 h-4">
              <span className="text-[12px]"></span>
            </div>
            <div className="w-4 h-4 flex items-center">
              <span className="text-[12px]">S</span>
            </div>
          </div>
          <div className="flex flex-wrap h-[145px] flex-col gap-[5px]">
            {streakDates?.map((itm, idx) => (
              <div key={idx} onClick={() => console.log(itm)} className={`w-4 h-4 ${getStreakClass(itm?.state)} rounded-sm`}></div>
            ))}
          </div>
        </div>

        <div className="flex mt-5">
          <div className="ml-auto flex items-center gap-2 mr-5">
            <div className="w-4 h-4 bg-success rounded-sm"></div>
            <span className="text-[12px]">Check In</span>
          </div>
          <div className="flex items-center gap-2 mr-5">
            <div className="w-4 h-4 bg-error rounded-sm"></div>
            <span className="text-[12px]">Miss</span>
          </div>
          <div className="flex items-center gap-2 mr-1">
            <div className="w-4 h-4 bg-primary rounded-sm"></div>
            <span className="text-[12px]">Day Off</span>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg bg-secondary p-3 w-[371px]">
        <div className="flex justify-between mb-3">
          <span className="text-[12px] text-primary_text inter">PR Zone</span>
          <span className="text-[12px] text-primary_text inter">Select</span>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <span className="text-[16px] text-secondary_text inter">Lift</span>
            <span className="text-[20px] text-primary_text font-isb">100</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[16px] text-secondary_text inter">Bpps</span>
            <span className="text-[20px] text-primary_text font-isb">2</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[16px] text-secondary_text inter">Date</span>
            <span className="text-[20px] text-primary_text font-isb">2 Jan 2023</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-between">
        <BarChart
          sx={{
            '.MuiBarElement-root': {
              width: '10px !important',
            },
          }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
          dataset={[
            {
              id: 0,
              day: 'M',
              value: 4,
            },
            {
              id: 1,
              day: 'Tu',
              value: 1,
            },
            {
              id: 2,
              day: 'W',
              value: 2,
            },
            {
              id: 3,
              day: 'Th',
              value: 5,
            },
            {
              id: 4,
              day: 'F',
              value: 3,
            },
            {
              id: 5,
              day: 'Sa',
              value: 8,
            },
            {
              id: 6,
              day: 'S',
              value: 10,
            },
          ]}
          tooltip={{ trigger: 'item' }}
          series={[{ dataKey: 'value', id: 'id', label: 'XP earned', color: '#EA1FFA' }]}
          xAxis={[{ scaleType: 'band', dataKey: 'day', label: 'value', tickPlacement: 'middle' }]}
          margin={{
            left: 30,
            right: 15,
            top: 30,
            bottom: 30,
          }}
          className="max-w-[180px] rounded-lg bg-secondary"
          width={180}
          height={200}
        />
        <div className="relative">
          <PieChart
            slotProps={{
              legend: {
                hidden: true,
              },
            }}
            series={[
              {
                data: [
                  { id: 0, value: 10, label: 'series A', color: '#f9f9f9' },
                  { id: 1, value: 15, label: 'series B', color: '#4318FF' },
                  { id: 2, value: 20, label: 'series C', color: '#6AD2FF' },
                ],
              },
            ]}
            margin={{
              left: 40,
              right: 40,
              top: 10,
              bottom: 60,
            }}
            className="max-w-[180px] rounded-lg bg-secondary"
            width={180}
            height={200}
          />

          <div className="absolute bottom-1 right-1 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#f9f9f9] rounded-sm"></div>
              <span className="text-[10px]">Check In</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#4318FF] rounded-sm"></div>
              <span className="text-[10px]">Miss</span>
            </div>
            <div className="flex items-center gap-2 mr-1">
              <div className="w-3 h-3 bg-[#6AD2FF] rounded-sm"></div>
              <span className="text-[10px]">Day Off</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
