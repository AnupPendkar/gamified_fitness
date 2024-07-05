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
