'use client';

import Back from '@/app/shared/Back';
import { EAuthAction, ELoginField, ELoginType } from '@/app/typings/common';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { isPropEmpty } from '../utils/utilfunctions';

const schema = z
  .object({
    name: z.string().min(2, 'Password too short').max(20),
    email: z.string().min(2, { message: 'Email too short' }).max(30).email({ message: 'Enter valid Email' }),
    password: z.string().min(1, { message: 'Password too short' }).max(20),

    otp: z.string().min(4).max(4),

    new_password: z.string().min(1, { message: 'Password too short' }).max(20),
    confirm_password: z.string().min(1, { message: 'Password too short' }).max(20),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'New password and confirm password must match',
    path: ['confirm_password'],
  });

export type TAuthDataSchema = z.infer<typeof schema>;

interface IAuthenticationProp {
  currType: ELoginType;
  onSubmit: (data: TAuthDataSchema) => void;
  onActionClk: (type: EAuthAction) => void;
}

const Authentication = ({ currType, onSubmit, onActionClk }: IAuthenticationProp) => {
  const [otp, setOtp] = useState<string>();
  const [heading, setHeading] = useState<string>();
  const [submitText, setSubmitText] = useState<string>();
  const [fields, setFields] = useState<ELoginField[]>([]);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const [render, setRender] = useState<number>(0);

  const {
    register,
    getValues,
    handleSubmit,
    clearErrors,
    reset,
    resetField,
    formState: { isDirty, isValid, errors },
  } = useForm<TAuthDataSchema>({
    resolver: zodResolver(schema),
  });

  function handleChange(newValue: string) {
    setOtp(newValue);
  }

  function handleLoginSteps(step: ELoginType) {
    switch (step) {
      case ELoginType.SIGN_IN__email_pass:
        setFields([ELoginField.EMAIL, ELoginField.PASSWORD]);
        setHeading('Sign In');
        setSubmitText('Continue');
        break;

      case ELoginType.SIGN_IN__otp:
        setFields([ELoginField.OTP]);
        setHeading('Enter OTP');
        setSubmitText('Submit');
        break;

      case ELoginType.SIGN_UP__name_email:
        setFields([ELoginField.NAME, ELoginField.EMAIL]);
        setHeading('Sign Up');
        setSubmitText('Continue');
        break;

      case ELoginType.SIGN_UP__pass:
        setFields([ELoginField.PASSWORD]);
        setHeading('Enter Password');
        setSubmitText('Submit');
        break;

      case ELoginType.FORGOT_PASS__email:
        setFields([ELoginField.EMAIL]);
        setHeading('Forgot Password');
        setSubmitText('Continue');
        break;

      case ELoginType.FORGOT_PASS__password:
        setFields([ELoginField.NEW_PASSWORD, ELoginField.CONFIRM_PASSWORD]);
        setHeading('Set Password');
        setSubmitText('Continue');
        break;

      case ELoginType.FORGOT_PASS__otp:
        setFields([ELoginField.OTP]);
        setHeading('Enter OTP');
        setSubmitText('Submit');
        break;
    }
  }

  function hasLoginType(type: ELoginType[]): boolean {
    return type.some((tp) => currType === tp);
  }

  async function _onSubmit(data: TAuthDataSchema) {
    console.log('dsfdfsdf', data);
  }

  function handleFormSubmit() {
    onSubmit(getValues());
  }

  function getFormValidity() {
    switch (currType) {
      case ELoginType.SIGN_IN__email_pass:
        return !isPropEmpty(getValues()?.email) && !isPropEmpty(getValues()?.password);

      case ELoginType.FORGOT_PASS__email:
        return !isPropEmpty(getValues()?.email);
    }
  }

  useEffect(() => {
    handleLoginSteps(currType);

    setTimeout(() => {
      clearErrors(['name', 'email', 'password', 'new_password', 'confirm_password']);
    }, 100);
  }, [currType]);

  return (
    <div className="p-global">
      <form onSubmit={handleSubmit(_onSubmit)}>
        <div className="flex flex-col mt-4 p-global">
          <p className="text-[24px] self-center font-ib text-primary_text mb-5">{heading}</p>

          {fields?.includes(ELoginField.OTP) && (
            <div className="field flex flex-col items-center mt-4">
              <p className="text-[14px] inter text-secondary_text">We`ve sent an OTP code to your email,</p>
              <p className="text-[14px] inter text-primary_text mb-3">User53684@gmail.com</p>
              <MuiOtpInput sx={{ maxWidth: 240 }} value={otp} onChange={handleChange} />
            </div>
          )}

          {fields?.includes(ELoginField.EMAIL) && (
            <div className="field flex flex-col mb-5">
              <p className="text-[14px] inter text-primary_text mb-2">Email Address</p>
              <TextField
                error={Boolean(errors.email)}
                {...register('email')}
                // onChange={() => {}}
                id="email"
                name="email"
                type="text"
                color="success"
                placeholder="Enter email address"
                focused
              />
              {errors && <span className="text-[12px] absolute -bottom-[18px] left-1 inter text-error_text">{errors.email?.message}</span>}
            </div>
          )}

          {fields?.includes(ELoginField.NAME) && (
            <div className="field flex flex-col mb-5">
              <p className="text-[14px] inter text-primary_text mb-2">Full Name</p>
              <TextField
                error={Boolean(errors.name)}
                {...register('name')}
                // onChange={() => {}}
                id="name"
                name="name"
                type="text"
                color="success"
                placeholder="Enter full name"
                focused
              />
              {errors && <span className="text-[12px] absolute -bottom-[18px] left-1 inter text-error_text">{errors.name?.message}</span>}
            </div>
          )}

          {fields?.includes(ELoginField.PASSWORD) && (
            <div className="field flex flex-col mb-5">
              <p className="text-[14px] inter text-primary_text mb-2">Password</p>
              <div className="relative w-full">
                <TextField
                  error={Boolean(errors.password)}
                  {...register('password')}
                  // onChange={() => {}}
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  color="success"
                  sx={{ width: '100%' }}
                  placeholder="Enter full password"
                  autoComplete="no"
                  focused
                />
                {errors && <span className="text-[12px] absolute -bottom-[18px] left-1 inter text-error_text">{errors.password?.message}</span>}

                <IconButton
                  onClick={() => setPasswordVisibility((state) => !state)}
                  className="absolute top-[50%] -translate-y-[50%] right-1"
                  sx={{ position: 'absolute', color: '#f9f9f9' }}
                >
                  {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
            </div>
          )}

          {fields?.includes(ELoginField.NEW_PASSWORD) && (
            <div className="field flex flex-col mb-5">
              <p className="text-[14px] inter text-primary_text mb-2">New Password</p>
              <div className="relative w-full">
                <TextField
                  error={Boolean(errors.new_password)}
                  {...register('new_password')}
                  // onChange={() => {}}
                  id="new_password"
                  name="new_password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  sx={{ width: '100%' }}
                  color="success"
                  placeholder="New password"
                  focused
                />
                {errors && <span className="text-[12px] absolute -bottom-[18px] left-1 inter text-error_text">{errors.new_password?.message}</span>}
                <IconButton
                  onClick={() => setPasswordVisibility((state) => !state)}
                  className="absolute top-[50%] -translate-y-[50%] right-1"
                  sx={{ position: 'absolute', color: '#f9f9f9' }}
                >
                  {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
            </div>
          )}

          {fields?.includes(ELoginField.CONFIRM_PASSWORD) && (
            <div className="field flex flex-col mb-5">
              <p className="text-[14px] inter text-primary_text mb-2">Confirm Password</p>
              <div className="relative w-full">
                <TextField
                  error={Boolean(errors.confirm_password)}
                  {...register('confirm_password')}
                  // onChange={() => {}}
                  id="confirm_password"
                  name="confirm_password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  sx={{ width: '100%' }}
                  color="success"
                  placeholder="Confirm password"
                  focused
                />
                {errors && <span className="text-[12px] absolute -bottom-[18px] left-1 inter text-error_text">{errors.confirm_password?.message}</span>}

                <IconButton
                  onClick={() => setPasswordVisibility((state) => !state)}
                  className="absolute top-[50%] -translate-y-[50%] right-1"
                  sx={{ position: 'absolute', color: '#f9f9f9' }}
                >
                  {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </div>
            </div>
          )}

          <div className="mt-5 px-10 w-full">
            {render >= 0 && (
              <Button onClick={handleFormSubmit} type="submit" fullWidth color="success" variant="contained">
                {submitText}
              </Button>
            )}
          </div>

          {hasLoginType([ELoginType.SIGN_IN__email_pass]) && (
            <div onClick={() => onActionClk(EAuthAction.SIGN_UP)} className="flex flex-col items-center mt-5">
              <p className="text-[14px] inter text-secondary_text">
                Dont have account? <span className="text-[12px] text-primary_text font-isb ml-1">Create Account</span>
              </p>
            </div>
          )}

          {hasLoginType([ELoginType.SIGN_UP__name_email, ELoginType.SIGN_UP__pass]) && (
            <div onClick={() => onActionClk(EAuthAction.SIGN_IN)} className="flex flex-col items-center mt-5">
              <p className="text-[14px] inter text-secondary_text">
                Already have account? <span className="text-[12px] text-primary_text font-isb ml-1">Sign In</span>
              </p>
            </div>
          )}

          {!hasLoginType([ELoginType.SIGN_IN__otp, ELoginType.FORGOT_PASS__otp]) && (
            <div className="flex relative flex-col items-center mt-7">
              <div className="w-full h-[1px] bg-secondary_text"></div>

              <div className="absolute top-0 -translate-y-[50%] translate-x-[50%] px-2 right-[50%] bg-primary">
                <p className="text-[14px] inter text-secondary_text">Or</p>
              </div>

              <div className="flex items-center justify-center gap-x-4 mt-8">
                <div onClick={() => onActionClk(EAuthAction.GOOGLE)} className="flex items-center justify-center rounded-[50%] bg-secondary p-3">
                  <Image src={'images/google_icon.svg'} width={20} height={20} alt="Google Icon" />
                </div>

                <div onClick={() => onActionClk(EAuthAction.APPLE)} className="flex items-center justify-center rounded-[50%] bg-secondary p-3">
                  <Image src={'images/apple_icon.svg'} width={20} height={20} alt="Apple Icon" />
                </div>

                <div onClick={() => onActionClk(EAuthAction.META)} className="flex items-center justify-center rounded-[50%] bg-secondary p-3">
                  <Image src={'images/meta_icon.svg'} width={20} height={20} alt="Meta Icon" />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Authentication;
