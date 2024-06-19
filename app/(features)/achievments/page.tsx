import Image from 'next/image';

const Achievments = () => {
  return (
    <div>
      <div className="current-tag flex flex-col items-center">
        <Image src="images/badge_rookie.svg" width={100} height={100} alt="Rookie" />
        <p style={{ color: 'var(--color-text-secondary)' }}>
          <span className="font-ib">500xp</span> more to win the achievement <span className="font-ib">Warrior</span>
        </p>
      </div>
      <div className="tags mt-10">
        <div className="tag flex flex-wrap justify-center items-center gap-x-9 gap-y-5">
          <div className="flex flex-col items-center justify-center">
            <Image className="" src="images/badge_rookie.svg" width={90} height={90} alt="rookie" />
            <p className="font-isb">Rookie</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_warrior.svg" width={90} height={90} alt="warrior" />
            <p className="font-isb">Warrior</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_gladiator.svg" width={90} height={90} alt="gladiator" />
            <p className="font-isb">Gladiator</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_titan.svg" width={90} height={90} alt="titan" />
            <p className="font-isb">Titan</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_champion.svg" width={90} height={90} alt="champion" />
            <p className="font-isb">Champion</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_legend.svg" width={90} height={90} alt="legend" />
            <p className="font-isb">Legend</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_conqueror.svg" width={90} height={90} alt="conqueror" />
            <p className="font-isb">Conqueror</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_master.svg" width={90} height={90} alt="master" />
            <p className="font-isb">Master</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image className="opacity-50" src="images/badge_supreme.svg" width={90} height={90} alt="supreme" />
            <p className="font-isb">Supreme</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievments;
