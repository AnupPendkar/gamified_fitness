'use client';

import Back from '@/app/shared/Back';
import Image from 'next/image';
import SetTable from './SetTable';
import { useRouter } from 'next/navigation';
import { useContext } from '../../context';
import { useEffect, useState } from 'react';
import { isPropEmpty } from '@/app/utils/utilfunctions';

const page = () => {
  const [target, setTarget] = useState<string[]>([]);
  const { exercise } = useContext();
  const router = useRouter();

  useEffect(() => {
    if (isPropEmpty(exercise)) {
      router.push('/home');
    }

    const titles = ['sdf', 'vdtr', 'oweur', 'voweir', 'vqweor', 'qowie', 'zperope'];

    setTarget(titles);
  }, []);

  return (
    <div className="p-global grid overflow-hidden h-full" style={{ gridTemplate: 'max-content minmax(0, 1fr) / 1fr' }}>
      <Back title="dfdf" path="/home" />

      <div className="grid overflow-hidden h-full" style={{ gridTemplate: 'max-content max-content minmax(0, 1fr) / 1fr' }}>
        <div className="flex items-center justify-center px-4 w-full h-[150px] py-3 mb-6 rounded-lg bg-secondary">
          <Image src={'../images/badge_rookie.svg'} width={64} height={32} alt={'rookie'} />
        </div>

        <div className="leading-7 mb-5">
          <span className="text-primary_text font-isb mr-2">Title:</span>
          {target?.map((itm, idx) => (
            <span key={idx}>
              <span className={`${idx === 0 && 'hidden'} text-secondary_text`}> | </span>
              <span className="text-secondary_text">{itm}</span>
            </span>
          ))}
        </div>

        <div className="grid h-full">
          <SetTable sets={exercise?.sets} />
        </div>
      </div>
    </div>
  );
};

export default page;
