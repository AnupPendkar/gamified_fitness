'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getUserById } from './serverFunc';
import { IRewards, IUser, UserDetailsEnum } from '@/app/typings/common';
import useCheckSession from '@/app/hooks/useCheckSession';

const Achievements = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { handleUserSession } = useCheckSession();

  const badges: Array<IRewards> = [
    {
      id: 1,
      src: 'images/badge_rookie.svg',
      name: 'Rookie',
      xp: 1500,
    },
    {
      id: 2,
      src: 'images/badge_warrior.svg',
      name: 'Warrior',
      xp: 3200,
    },
    {
      id: 3,
      src: 'images/badge_gladiator.svg',
      name: 'Gladiator',
      xp: 7000,
    },
    {
      id: 4,
      src: 'images/badge_titan.svg',
      name: 'Titan',
      xp: 12000,
    },
    {
      id: 5,
      src: 'images/badge_champion.svg',
      name: 'Champion',
      xp: 20000,
    },
    {
      id: 6,
      src: 'images/badge_legend.svg',
      name: 'Legend',
      xp: 32000,
    },
    {
      id: 7,
      src: 'images/badge_conqueror.svg',
      name: 'Conqueror',
      xp: 50000,
    },
    {
      id: 8,
      src: 'images/badge_master.svg',
      name: 'Master',
      xp: 75000,
    },
    {
      id: 9,
      src: 'images/badge_supreme.svg',
      name: 'Supreme',
      xp: 100000,
    },
  ];

  function getCurrBadge(): IRewards | undefined {
    if (!user) {
      return undefined;
    }

    const achievedBadges = badges.filter((badge) => badge.xp <= user.xp);
    return achievedBadges[achievedBadges.length - 1];
  }

  function getUpcomingBadgeDetails(): IRewards | null {
    const currentBadge = getCurrBadge();
    if (!currentBadge) {
      return badges[0];
    }

    if (currentBadge.id < badges.length) {
      return badges[currentBadge.id];
    }

    return null;
  }

  async function getUserInfo() {
    try {
      const userId = localStorage.getItem(UserDetailsEnum.GAMIFIED_USER_ID);
      if (!userId) {
        return;
      }

      const _user = await getUserById(+userId);
      if (!_user) {
        throw new Error('User details could not be retrieved');
      }

      setUser(_user as IUser);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    (async function () {
      await handleUserSession();
      await getUserInfo();
    })();
  }, []);

  return (
    <div className="p-global">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="current-tag relative flex flex-col items-center">
          {getUpcomingBadgeDetails() && (
            <>
              <Image src={(getUpcomingBadgeDetails() as IRewards)?.src} width={100} height={100} alt={'Reward'} />
              <p className="text-secondary_text max-w-[300px]">
                {getUpcomingBadgeDetails() ? (
                  <>
                    <span className="font-ib">{(getUpcomingBadgeDetails() as IRewards)?.xp - (user!?.xp ?? 0)}xp</span> more to win the achievement <br />
                    <span className="font-ib">{(getUpcomingBadgeDetails() as IRewards)?.name}</span>
                  </>
                ) : (
                  <span className="font-ib">No more achievements</span>
                )}
              </p>
            </>
          )}

          <div className="rounded-[12px] bg-success absolute top-1 right-1 px-2 py-[1px]">
            <span className="text-[12px] text-primary_text_dark font-isb">{user?.xp ?? 0} XP</span>
          </div>
        </div>
      )}

      <div className="tags my-10">
        <div className="tag flex flex-wrap justify-center items-center gap-x-9 gap-y-5">
          {badges.map((itm) => (
            <div key={itm?.id} className="flex flex-col items-center justify-center">
              <Image className={`${user && user?.xp < itm?.xp && 'opacity-50'}`} src={itm?.src} width={80} height={80} alt="Badge" />
              <p className="font-isb">{itm?.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
