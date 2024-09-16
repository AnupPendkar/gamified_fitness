import router from 'next/router';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import Authentication, { TAuthDataSchema } from '../shared/Authentication';
import Back from '../shared/Back';
import Stack from '../shared/Stack';
import { ELoginType, EAuthAction } from '../typings/common';

interface VerifyFormProps {
  handleVerify: ({ otp }: { otp: string }) => void;
}

const OTPForm = ({ handleVerify }: VerifyFormProps) => {
  function onActionClk(type: EAuthAction) {
    switch (type) {
      case EAuthAction.REQUEST_OTP:
        break;
    }
  }

  function onSubmit(val: TAuthDataSchema) {
    console.log(val);
    handleVerify({ otp: val?.otp });
  }

  return (
    <div className="p-global pt-4">
      <div>
        <Back title="" path={'/sign-in'} />
      </div>

      <Authentication currType={ELoginType.SIGN_IN__otp} onSubmit={onSubmit} onActionClk={onActionClk} />
    </div>
  );
};

export default OTPForm;
