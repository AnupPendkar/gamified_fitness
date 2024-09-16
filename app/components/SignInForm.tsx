import router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Authentication, { TAuthDataSchema } from '../shared/Authentication';
import Back from '../shared/Back';
import Stack from '../shared/Stack';
import { ELoginType, EAuthAction } from '../typings/common';

interface SignInFormProps {
  signInWithEmail: ({ emailAddress, password }: { emailAddress: string; password: string }) => void;
  clerkError: string;
}

const SignInForm = ({ signInWithEmail, clerkError }: SignInFormProps) => {
  const [loginType, setLoginType] = useState<ELoginType | null>();
  const stack = useRef<Stack>();

  async function handleSignIn(email: string, password: string) {}

  function onActionClk(type: EAuthAction) {
    switch (type) {
      case EAuthAction.SIGN_IN:
        stack.current?.empty();
        setLoginType(ELoginType.SIGN_IN__email_pass);
        break;

      case EAuthAction.REQUEST_OTP:
        break;
    }
  }

  function onSubmit(val: TAuthDataSchema) {
    switch (loginType) {
      case ELoginType.SIGN_IN__email_pass:
        signInWithEmail({ emailAddress: val?.email, password: val?.password });
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

export default SignInForm;
