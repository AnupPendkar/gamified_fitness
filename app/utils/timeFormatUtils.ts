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
    month: today?.getMonth() + 1,
    year: today?.getFullYear(),
    dateObj: today,
  };
}


// month index starts from 0 not 1.
function getAllDatesWithDays(year: number, month: number): IDate[] {
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let datesWithDays: IDate[] = [];

  let date = new Date(year, month - 1, 1);  // month - 1 because JavaScript months are 0-indexed

  let daysInMonth = new Date(year, month, 0).getDate(); // Correctly calculate days in month

  for (let day = 1; day <= daysInMonth; day++) {  // Loop should include the last day
    date.setDate(day);
    let dayOfWeek = daysInWeek[date.getDay()];

    datesWithDays.push({
      day: dayOfWeek,
      date: day,
      month,
      year,
      dateObj: new Date(),
    });
  }

  return datesWithDays;
}

export { getFormatedTime, getTodaysDate, getAllDatesWithDays };
