export interface IDate {
  date: number;
  day: string;
  month: number;
  year: number;
  dateObj?: Date;
}

export enum EIntensity {
  LIGHT = 1,
  MODERATE = 2,
  INTENSE = 3,
}
