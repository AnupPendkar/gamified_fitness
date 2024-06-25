'use client';

import Authentication, { TAuthDataSchema } from '@/app/shared/Authentication';
import { EAuthAction, ELoginType } from '@/app/typings/common';

const Authenticate = () => {
  function onActionClk(type: EAuthAction) {
    console.log(type);
  }

  function onSubmit(val: TAuthDataSchema) {
    console.log(val);
  }

  return (
    <div>
      <Authentication currType={ELoginType.SIGN_IN__email_pass} onSubmit={onSubmit} onActionClk={onActionClk} />
    </div>
  );
};

export default Authenticate;
