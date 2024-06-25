import Image from 'next/image';

const Achievments = () => {
  const badges = [
    {
      id: 1,
      src: 'images/badge_rookie.svg',
      name: 'Rookie',
      achieved: true,
    },
    {
      id: 2,
      src: 'images/badge_warrior.svg',
      name: 'Warrior',
      achieved: false,
    },
    {
      id: 3,
      src: 'images/badge_gladiator.svg',
      name: 'Gladiator',
      achieved: false,
    },
    {
      id: 4,
      src: 'images/badge_titan.svg',
      name: 'Titan',
      achieved: false,
    },
    {
      id: 5,
      src: 'images/badge_champion.svg',
      name: 'Champion',
      achieved: false,
    },
    {
      id: 6,
      src: 'images/badge_legend.svg',
      name: 'Legend',
      achieved: false,
    },
    {
      id: 7,
      src: 'images/badge_conqueror.svg',
      name: 'Conqueror',
      achieved: false,
    },
    {
      id: 8,
      src: 'images/badge_master.svg',
      name: 'Master',
      achieved: false,
    },
    {
      id: 8,
      src: 'images/badge_supreme.svg',
      name: 'Supreme',
      achieved: false,
    },
  ];

  function currBadge() {
    const achievedBadges = badges?.filter((badge) => !badge?.achieved);
    return achievedBadges[0];
  }

  return (
    <div className="p-global">
      <div className="current-tag flex flex-col items-center">
        <Image src={currBadge()?.src} width={100} height={100} alt={currBadge()?.name} />
        <p className="text-secondary_text max-w-[300px]">
          <span className="font-ib">500xp</span> more to win the achievement <br />
          <span className="font-ib">{currBadge()?.name}</span>
        </p>
      </div>

      <div className="tags my-10">
        <div className="tag flex flex-wrap justify-center items-center gap-x-9 gap-y-5">
          {badges?.map((itm) => (
            <div key={itm?.id} className="flex flex-col items-center justify-center">
              <Image className={`${!itm?.achieved && 'opacity-50'}`} src={itm?.src} width={80} height={80} alt={itm?.name} />
              <p className="font-isb">{itm?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievments;
