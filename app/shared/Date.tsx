'use client';

const Date = () => {
  const date = [
    {
      date: 15,
      day: 'Mon',
    },
    {
      date: 16,
      day: 'Tue',
    },
    {
      date: 17,
      day: 'Wed',
    },
    {
      date: 18,
      day: 'Thu',
    },
    {
      date: 19,
      day: 'Fri',
    },
    {
      date: 20,
      day: 'Sat',
    },
    {
      date: 21,
      day: 'Sun',
    },
  ];
  return (
    <div className="flex overflow-auto mb-5 gap-x-7">
      {date?.map((itm) => (
        <div className="flex flex-col items-center justify-center rounded-lg px-3 py-2 w-[55px]" style={{ background: 'var(--color-secondary)' }}>
          <p>{itm?.date}</p>
          <p>{itm?.day}</p>
        </div>
      ))}
    </div>
  );
};

export default Date;
