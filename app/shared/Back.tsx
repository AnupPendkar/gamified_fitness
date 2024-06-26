'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { isPropEmpty } from '../utils/utilfunctions';

const Back = ({ title, path }: { title: string; path: string }) => {
  const router = useRouter();

  const handleNavigation = () => {
    if (!isPropEmpty(path)) {
      router.push(path);
    }
  };

  const callBack = useCallback(() => {
    handleNavigation();
  }, [handleNavigation]);

  return (
    <div onClick={callBack} className="flex gap-x-[17px] items-center mb-3">
      <Image className="cursor-pointer" src={'../../images/arrow_left.svg'} width={24} height={24} alt="Back Btn" />
      <span className="h-max w-full desktop:text-[24px] mobile:text-[16px] tablet:text-[16px] font-isb">{title}</span>
    </div>
  );
};

export default Back;
