import dayjs from 'dayjs';
import { IDate } from '../typings/common';

/**
 * Utility function to format epoch time to human-readable format
 *
 * @param {number} milisecond - The epoch time in milliseconds.
 * @param {string} format - The desired format for the output date string (default is 'DD-MMM-YYYY HH:mm:ss').
 * @returns {string} - The formatted date string.
 */
function getFormatedTime(milisecond, format = 'DD-MMM-YYYY HH:mm:ss'): string {
  if (!milisecond) {
    return '';
  }

  return dayjs.unix(milisecond / 1000).format(format);
}

function getTodaysDate(): IDate {
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let today = new Date();

  let day = today.getDate();
  let dayOfWeek = daysInWeek[today.getDay()];

  return {
    day: dayOfWeek,
    date: day,
  };
}

// month index starts from 0 not 1.
function getAllDatesWithDays(year: number, month: number): IDate[] {
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let datesWithDays: IDate[] = [];

  let date = new Date(year, month - 1, 1);

  let daysInMonth = new Date(year, month, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    date.setDate(day);
    let dayOfWeek = daysInWeek[date.getDay()];

    datesWithDays.push({
      day: dayOfWeek,
      date: day,
    });
  }

  return datesWithDays;
}

export { getFormatedTime, getTodaysDate, getAllDatesWithDays };
