'use client';
import { useEffect } from 'react';

const CronSetupClient = () => {
  useEffect(() => {
    fetch('/api/tasks')
      .then((data) => console.log(data))
      .catch((err) => console.error('Error setting up cron job:', err));
  }, []);

  return null;
};

export default CronSetupClient;
