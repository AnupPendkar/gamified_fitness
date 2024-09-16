'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const menu = [
    {
      id: 1,
      img: 'images/achievments_icon.svg',
      alt: 'Achievments Icon',
      route: '/achievments',
    },
    {
      id: 2,
      img: 'images/xp_icon.svg',
      alt: 'XP Icon',
      route: '/rewards',
    },
    {
      id: 3,
      img: 'images/home_icon.svg',
      alt: 'Home Icon',
      route: '/home',
    },
    {
      id: 4,
      img: 'images/analytics_icon.svg',
      alt: 'Analytics Icon',
      route: '/analytics',
    },
    {
      id: 5,
      img: 'images/user_icon.svg',
      alt: 'User Icon',
      route: '/user',
    },
  ];

  function onMenuClk(route: string) {
    router.push(route);
  }

  return (
    <>
      {!['/sign-in', '/sign-up']?.includes(pathname as string) && (
        <div className="app-footer h-[55px] rounded-xl flex justify-between px-4 bg-success m-global">
          {menu.map((itm) => (
            <div key={itm?.id} onClick={() => onMenuClk(itm?.route)} className="h-full flex justify-center items-center">
              <Image width={22} height={22} src={itm?.img} alt="Menu Icon" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Footer;
