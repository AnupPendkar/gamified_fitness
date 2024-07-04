'use client';

import Authentication, { TAuthDataSchema } from '@/app/shared/Authentication';
import Back from '@/app/shared/Back';
import Stack from '@/app/shared/Stack';
import { EAuthAction, ELoginType } from '@/app/typings/common';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  checkUserExists,
  getSession,
  handleAppleOAuthLogin,
  handleCrendentialLogin,
  handleMetaOAuthLogin,
  handleGoogleOAuthLogin,
  handleSignOut,
  userLogin,
  userRegister,
} from './serverFunc';

const Authenticate = () => {
  const [loginType, setLoginType] = useState<ELoginType | null>();
  const stack = useRef<Stack>();
  const router = useRouter();
  const emailRef = useRef<string>('');
  const nameRef = useRef<string>('');

  function onActionClk(type: EAuthAction) {
    switch (type) {
      case EAuthAction.SIGN_IN:
        stack.current?.empty();
        setLoginType(ELoginType.SIGN_IN__email_pass);
        break;

      case EAuthAction.SIGN_UP:
        stack.current?.empty();
        setLoginType(ELoginType.SIGN_UP__name_email);
        break;

      case EAuthAction.REQUEST_OTP:
        break;

      case EAuthAction.GOOGLE:
        handleSignOut().then(() => {
          handleGoogleOAuthLogin();
        });
        break;

      case EAuthAction.APPLE:
        handleSignOut().then(() => {
          handleAppleOAuthLogin();
        });
        break;

      case EAuthAction.META:
        handleSignOut().then(() => {
          handleMetaOAuthLogin();
        });
        break;
    }
  }

  async function handleSignIn(email: string, password: string) {
    const { status, user } = await userLogin(email, password);

    if (status === 200) {
      handleSignOut().then(() => {
        handleCrendentialLogin(email, password).then(async (res) => {
          stack.current?.push(ELoginType.SIGN_IN__email_pass);
          setLoginType(ELoginType.SIGN_IN__otp);
        });
      });
    }
  }

  async function handleEmailExists(email: string, name: string) {
    const { status, message } = await checkUserExists(email);

    if (status === 403) {
      emailRef.current = email;
      nameRef.current = name;
      stack.current?.push(ELoginType.SIGN_UP__name_email);
      setLoginType(ELoginType.SIGN_UP__pass);
    }
  }

  async function handleSignUp(password: string) {
    const { status, user } = await userRegister(emailRef.current, password, nameRef.current);

    if (status === 200) {
      handleSignOut().then(() => {
        handleCrendentialLogin(emailRef.current, password).then(async () => {
          stack.current?.empty();
          setLoginType(null);
        });
      });
    }
  }

  function onSubmit(val: TAuthDataSchema) {
    switch (loginType) {
      case ELoginType.SIGN_IN__email_pass:
        handleSignIn(val?.email, val?.password);
        break;

      case ELoginType.SIGN_IN__otp:
        router.push('/home');
        setLoginType(null);
        stack.current?.empty();
        break;

      case ELoginType.SIGN_UP__name_email:
        handleEmailExists(val?.email, val?.name);
        break;

      case ELoginType.SIGN_UP__pass:
        handleSignUp(val?.password);
        break;

      case ELoginType.FORGOT_PASS__email:
        stack.current?.push(ELoginType.FORGOT_PASS__email);
        setLoginType(ELoginType.FORGOT_PASS__otp);
        break;

      case ELoginType.FORGOT_PASS__otp:
        stack.current?.push(ELoginType.FORGOT_PASS__otp);
        setLoginType(ELoginType.FORGOT_PASS__password);
        break;

      case ELoginType.FORGOT_PASS__password:
        router.push('/home');
        setLoginType(null);
        stack.current?.empty();
        break;
    }
  }

  useEffect(() => {
    setLoginType(ELoginType.SIGN_IN__email_pass);

    stack.current = new Stack();
  }, []);

  return (
    <div className="p-global pt-4">
      <div
        onClick={() => {
          if (!stack?.current?.isEmpty()) {
            setLoginType(stack?.current?.top());
            stack?.current?.pop();
          }
        }}
      >
        <Back title="" path={stack?.current?.isEmpty() ? '/home' : ''} />
      </div>

      {loginType && <Authentication currType={loginType} onSubmit={onSubmit} onActionClk={onActionClk} />}
    </div>
  );
};

export default Authenticate;
