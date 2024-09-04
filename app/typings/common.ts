export interface IDate {
  date: number;
  day: string;
  month: number;
  year: number;
  dateObj?: Date;
}

export enum ELoginType {
  SIGN_IN__email_pass = 1,
  SIGN_IN__otp = 2,

  SIGN_UP__name_email = 3,
  SIGN_UP__pass = 4,

  FORGOT_PASS__email = 5,
  FORGOT_PASS__password = 6,
  FORGOT_PASS__otp = 7,
}

export enum EAuthAction {
  SIGN_IN = 1,
  SIGN_UP = 2,
  REQUEST_OTP = 3,
  BACK = 4,
  GOOGLE = 5,
  APPLE = 6,
  META = 7,
}

export enum ELoginField {
  NAME = 1,
  EMAIL = 2,
  PASSWORD = 3,
  NEW_PASSWORD = 4,
  CONFIRM_PASSWORD = 5,
  OTP = 6,
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  xp: number;
  profileImg: string;
}
export interface IRewards {
  id: number;
  src: string;
  name: string;
  xp: number;
}

export enum ETarMuscle {
  BACK = 1,
  CHEST = 2,
  LEGS = 3,
  TRICEPS = 4,
  BICEPS = 5,
  SHOULDERS = 6,
  REST = 7,
}

export enum EAction {
  CLOSE = 1,
  SUBMIT = 2,
}

export enum EDays {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 7,
}

export enum EWorkoutStatusEnum {
  PENDING = 0,
  COMPLETED = 1,
}

export interface IWorkout {
  id: number;
  exercises: Array<IExercise>;
  createdAt: Date;
  split: Array<ETarMuscle>;
  status: EWorkoutStatusEnum;
  userId: number;
}

export interface IExercise {
  id: number;
  name?: string;
  src?: string;
  exerciseId: number;
  workoutId: number;
  sets: Array<ISet>;
  set: number;
}

export enum EIntensity {
  LIGHT = 1,
  MODERATE = 2,
  INTENSE = 3,
}
export interface ISet {
  completedReps: number;
  intensity: EIntensity;
  setNo: number;
  totalReps: number;
  weight: number;
}

export enum UserDetailsEnum {
  GAMIFIED_USER_ID = 'GAMIFIED_USER_ID',
  GAMIFIED_USER_NAME = 'GAMIFIED_USER_NAME',
}

export enum StreakEnum {
  CHECK_IN = 1,
  MISS = 2,
  DAY_OFF = 3,
}

export enum ToastColors {
  WARNING = '#FFA500', // Orange
  SUCCESS = '#4CAF50', // Green
  ERROR = '#F44336', // Red
  INFO = '#2196F3', // Blue
}

export interface ToasterProps {
  id: string;
  message: ToastMessage;
  visible: boolean;
  duration?: number;
  onHide?: () => void;
}

export type ToastMessage = {
  message: string;
  type: 'ERROR' | 'INFO' | 'WARNING' | 'SUCCESS';
};
