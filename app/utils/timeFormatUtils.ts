import dayjs from 'dayjs';
import { IDate } from '../typings/common';
import { cloneDeep } from 'lodash';

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

function getAllDatesWithDays(year: number, month: number): IDate[] {
  const daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let datesWithDays: IDate[] = [];

  let date = new Date(year, month - 1, 1); // month - 1 because JavaScript months are 0-indexed

  let daysInMonth = new Date(year, month, 0).getDate(); // Correctly calculate days in month

  for (let day = 1; day <= daysInMonth; day++) {
    date.setDate(day);
    let dayOfWeek = daysInWeek[date.getDay()];

    datesWithDays.push({
      day: dayOfWeek,
      date: day,
      month,
      year,
      dateObj: new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)),
    });
  }

  return datesWithDays;
}

function getStartAndEndOfByDate(date: Date) {
  const now = new Date(date);

  const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
  const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));

  return {
    startOfDay,
    endOfDay,
  };
}

function getMonthTimestamps(date: Date): { startTimestamp: Date; endTimestamp: Date } {
  const now = new Date(date);

  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0, 0));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999));

  return { startTimestamp: start, endTimestamp: end };
}

function areTwoDatesEqual(date1: Date, date2: Date): boolean {
  if (date1?.getFullYear() !== date2?.getFullYear()) {
    return false;
  }

  if (date1?.getMonth() !== date2?.getMonth()) {
    return false;
  }

  if (date1?.getDate() !== date2?.getDate()) {
    return false;
  }

  return true;
}

export { getFormatedTime, getTodaysDate, getAllDatesWithDays, getStartAndEndOfByDate, areTwoDatesEqual, getMonthTimestamps };
