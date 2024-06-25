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

export enum ELoginField {
  NAME = 1,
  EMAIL = 2,
  PASSWORD = 3,
  NEW_PASSWORD = 4,
  CONFIRM_PASSWORD = 5,
  OTP = 6,
}
