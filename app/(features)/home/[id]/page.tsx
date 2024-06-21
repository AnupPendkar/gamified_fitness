import Back from '@/app/shared/Back';
import Image from 'next/image';
import SetTable from './SetTable';

const page = ({ params }) => {
  console.log(params);
  const titles = ['sdf', 'vdtr', 'oweur', 'voweir', 'vqweor', 'qowie', 'zperope'];

  return (
    <div style={{ display: 'grid', gridTemplate: 'max-content minmax(0, 1fr) / 1fr', height: '100%', overflow: 'hidden' }}>
      <Back title="dfdf" path="/home" />

      <div style={{ display: 'grid', gridTemplate: 'max-content max-content minmax(0, 1fr) / 1fr', overflow: 'hidden', height: '100%' }}>
        <div className="flex items-center justify-center px-4 w-full h-[150px] py-3 mb-6 rounded-lg bg-secondary">
          <Image src={'../images/badge_rookie.svg'} width={64} height={32} alt={'rookie'} />
        </div>

        <div className="leading-7 mb-3">
          <span className="text-primary_text font-isb mr-2">Title:</span>
          {titles?.map((itm, idx) => (
            <>
              <span className={`${idx === 0 && 'hidden'} text-secondary_text`}> | </span>
              <span className="text-secondary_text">{itm}</span>
            </>
          ))}
        </div>

        <div className="grid" style={{ height: '100%' }}>
          <SetTable />
        </div>
      </div>
    </div>
  );
};

export default page;
