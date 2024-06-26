'use client';

import Authentication, { TAuthDataSchema } from '@/app/shared/Authentication';
import Back from '@/app/shared/Back';
import Stack from '@/app/shared/Stack';
import { EAuthAction, ELoginType } from '@/app/typings/common';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Authenticate = () => {
  const [loginType, setLoginType] = useState<ELoginType>();
  const stack = useRef<Stack>();
  const router = useRouter();

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
        break;

      case EAuthAction.APPLE:
        break;

      case EAuthAction.META:
        break;
    }
  }

  function onSubmit(val: TAuthDataSchema) {
    console.log(val);

    switch (loginType) {
      case ELoginType.SIGN_IN__email_pass:
        stack.current.push(ELoginType.SIGN_IN__email_pass);
        setLoginType(ELoginType.SIGN_IN__otp);
        break;

      case ELoginType.SIGN_IN__otp:
        router.push('/home');
        setLoginType(null);
        stack.current.empty();
        break;

      case ELoginType.SIGN_UP__name_email:
        stack.current.push(ELoginType.SIGN_UP__name_email);
        setLoginType(ELoginType.SIGN_UP__pass);
        break;

      case ELoginType.SIGN_UP__pass:
        router.push('/home');
        setLoginType(null);
        stack.current.empty();
        break;

      case ELoginType.FORGOT_PASS__email:
        stack.current.push(ELoginType.FORGOT_PASS__email);
        setLoginType(ELoginType.FORGOT_PASS__otp);
        break;

      case ELoginType.FORGOT_PASS__otp:
        stack.current.push(ELoginType.FORGOT_PASS__otp);
        setLoginType(ELoginType.FORGOT_PASS__password);
        break;

      case ELoginType.FORGOT_PASS__password:
        router.push('/home');
        setLoginType(null);
        stack.current.empty();
        break;
    }
  }

  useEffect(() => {
    setLoginType(ELoginType.SIGN_IN__email_pass);
    // setLoginType(ELoginType.FORGOT_PASS__email);

    stack.current = new Stack();
  }, []);

  console.log(loginType);

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
