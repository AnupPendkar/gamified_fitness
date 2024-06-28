'use client';

import { auth } from '@/auth';
import { useEffect } from 'react';
import { getSession } from './serverFunc';

const page = () => {
  useEffect(() => {
    getSession().then((res) => {
      console.log('<=========================>', res);
    });
  }, []);

  return (
    <div className="bg-primary flex items-center justify-center absolute h-full w-full">
      <p className="text-primary_text text-[20px] font-isb">Authenticating ...</p>
    </div>
  );
};

export default page;
