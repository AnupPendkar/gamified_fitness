'use client';

import { useEffect, useRef, useState } from 'react';
import { areTwoDatesEqual, getAllDatesWithDays, getTodaysDate } from '../utils/timeFormatUtils';
import Image from 'next/image';
import dayjs, { Dayjs } from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DayCalendarSkeleton, PickersDay, LocalizationProvider, PickersDayProps } from '@mui/x-date-pickers';
import Badge from '@mui/material/Badge';
import { ETarMuscle, IDate } from '../typings/common';
import { cloneDeep } from 'lodash';
import { fetchActiveDays } from './serverFunc';

const Date = ({ getSelectedDate, defaultDate, split }: { getSelectedDate: (date: IDate | any) => void; defaultDate?: Date; split?: ETarMuscle[] }) => {
  const dateContainerRef = useRef<HTMLDivElement>(null);
  const [openState, setOpenState] = useState(false);
  const [currMonthDates, setCurrMonthDates] = useState<IDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<IDate | null>(null);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([1, 2, 15]);
  const requestAbortController = useRef<AbortController | null>(null);
  const initialValue = dayjs('2022-04-17');

  function handleDateClk(itm: IDate) {
    setSelectedDate({ ...itm, dateObj: cloneDeep(itm?.dateObj) });
  }

  function handleDateChange(date: any) {
    const _date: IDate = {
      day: '',
      date: date?.$D,
      month: date?.$M,
      year: date?.$y,
      dateObj: date?.$d,
    };

    setSelectedDate(_date);
  }

  function getActiveDays(date: Dayjs, { signal }: { signal: AbortSignal }) {
    return new Promise<{ daysToHighlight: number[] }>((resolve, reject) => {
      if (!selectedDate) {
        return;
      }

      const timeout = setTimeout(async () => {
        const activeDays = await fetchActiveDays(selectedDate?.dateObj as Date);
        const daysToHighlight = activeDays?.map((days) => days?.createdAt?.getDate());

        if (daysToHighlight) {
          resolve({ daysToHighlight });
        }
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException('aborted', 'AbortError'));
      };
    });
  }

  function fetchHighlightedDays(date: Dayjs) {
    const controller = new AbortController();

    getActiveDays(date, { signal: controller.signal })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  }

  function setAllDatesWithinMonth(date: Date | undefined) {
    if (date === undefined) {
      return;
    }

    const dates = getAllDatesWithDays(date.getFullYear(), date.getMonth() + 1);
    setCurrMonthDates(dates);
  }

  function handleMonthChange(date: Dayjs) {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    if (date) {
      setAllDatesWithinMonth(date.toDate());
      setHighlightedDays([]);
      fetchHighlightedDays(date);
      setIsLoading(true);
    }
  }

  function isToday(val: IDate) {
    const today = getTodaysDate();
    return today.date === val.date && today.month === val.month && today.year === val.year;
  }

  function isSelected(val: IDate) {
    return selectedDate && val.date === selectedDate.date;
  }

  useEffect(() => {
    setAllDatesWithinMonth(getTodaysDate().dateObj);
    setSelectedDate({ ...getTodaysDate() });

    return () => requestAbortController.current?.abort();
  }, []);

  useEffect(() => {
    const timoeut = setTimeout(() => {
      let selector: any;

      const todaysDivSelector = dateContainerRef.current?.querySelector('.today');
      const selectedDivSelector = dateContainerRef.current?.querySelector('.selected_day');

      selector = selectedDivSelector ?? todaysDivSelector;

      if (selector) {
        const rect = selector?.getBoundingClientRect();
        const isInView =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);

        if (!isInView) {
          selector.scrollIntoView({ behavior: 'instant', inline: 'start', block: 'start' });
        }
      }

      fetchHighlightedDays(initialValue);
    }, 100);

    getSelectedDate(selectedDate);

    return () => clearTimeout(timoeut);
  }, [selectedDate]);

  useEffect(() => {
    if (defaultDate) {
      handleMonthChange(dayjs(defaultDate));
      handleDateChange(dayjs(defaultDate));
    }
  }, [defaultDate]);

  return (
    <div className="sticky top-[1px] bg-primary z-50">
      <div className="flex items-center justify-between pb-3">

        <div className='flex items-center'>
          {split && split?.length > 0 ? (
            split?.map((splt, idx) => (
              <div className="flex items-center">
                <p className="text-[16px] font-ib text-primary_text">{idx > 0 ? ' + ' : ''}</p>
                <p className="text-[16px] font-ib text-primary_text">{splt}</p>
              </div>
            ))
          ) : (
            <p className="text-[16px] font-ib text-primary_text">-</p>
          )}
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Image onClick={() => setOpenState(true)} src={'/images/calender.svg'} width={22} height={22} alt="Calender" />
          <MobileDatePicker
            disableFuture
            open={openState}
            sx={{ display: 'none' }}
            defaultValue={dayjs()}
            onChange={handleDateChange}
            onMonthChange={handleMonthChange}
            views={['year', 'month', 'day']}
            onOpen={() => setOpenState(true)}
            onClose={() => setOpenState(false)}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{ day: ActiveDays }}
            slotProps={{ day: { highlightedDays } as any }}
          />
        </LocalizationProvider>
      </div>

      <div ref={dateContainerRef} className="flex overflow-auto mb-4 gap-x-4 md:gap-x-7">
        {currMonthDates.map((itm, idx) => (
          <div
            onClick={() => handleDateClk(itm)}
            key={idx}
            className={`flex flex-col relative items-center justify-center rounded-lg px-3 py-2 min-w-[55px] h-[60px] ${
              isToday(itm) ? 'today bg-success text-primary_text_dark' : isSelected(itm) ? 'selected_day bg-ternary border-solid border-2 border-success' : 'bg-secondary'
            }`}
          >
            {highlightedDays?.includes(itm?.date) && !isSelected(itm) && (
              <Image className="absolute top-0 right-0" src={'/images/completed_dot.svg'} alt="Active" width={7} height={7} />
            )}
            <p className="font-isb">{itm.date}</p>
            <p>{itm.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Date;

function ActiveDays(props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected = !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge key={day.toString()} overlap="circular" badgeContent={isSelected ? <Image src={'/images/completed_dot.svg'} alt="Active" width={7} height={7} /> : ''}>
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}
