import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Authentication, { TAuthDataSchema } from '../shared/Authentication';
import Back from '../shared/Back';
import { EAuthAction, ELoginType } from '../typings/common';
import router from 'next/router';
import Stack from '../shared/Stack';
import { handleSignOut, handleGoogleOAuthLogin, handleAppleOAuthLogin, handleMetaOAuthLogin } from '../(features)/login/serverFunc';

interface SignUpFormProps {
  signUpWithEmail: ({ emailAddress, name, password }: { emailAddress: string; name: string; password: string }) => void;
  clerkError: string;
}

const SignUpForm = ({ signUpWithEmail, clerkError }: SignUpFormProps) => {
  const [loginType, setLoginType] = useState<ELoginType | null>();
  const stack = useRef<Stack>();

  async function handleSignIn(email: string, password: string) {}

  function onActionClk(type: EAuthAction) {
    switch (type) {
      case EAuthAction.SIGN_IN:
        stack.current?.empty();
        setLoginType(ELoginType.SIGN_IN__email_pass);
        break;

      case EAuthAction.GOOGLE:
        break;

      case EAuthAction.META:
        break;

      case EAuthAction.APPLE:
        break;
    }
  }

  function onSubmit(val: TAuthDataSchema) {
    switch (loginType) {
      case ELoginType.SIGN_UP__name_email:
        signUpWithEmail({ emailAddress: val?.email, name: val?.name, password: val?.password });
        break;
    }
  }

  useEffect(() => {
    setLoginType(ELoginType.SIGN_UP__name_email);

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

export default SignUpForm;
