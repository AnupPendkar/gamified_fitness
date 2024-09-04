'use client';

import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ToasterProps, ToastMessage, ToastColors } from '../typings/common';
import { useAppStore } from '../zustand-store';

export const ToasterScheduler: React.FC = () => {
  const [scheduler, setScheduler] = useState<Array<ToasterProps>>([]);
  const message = useAppStore((state) => state.message);

  useEffect(() => {
    const createNewToast = (message: ToastMessage) => {
      const newToast: ToasterProps = {
        id: Date.now().toString(),
        message: message,
        visible: true,
        duration: 3000,
        onHide: () => removeToast(newToast.id),
      };
      setScheduler((prevState) => [newToast, ...prevState]);
    };

    if (message) {
      createNewToast(message);
    }
  }, [message]);

  const removeToast = (id: string) => {
    setScheduler((prevState) => prevState.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {scheduler?.map((toast, index) => (
        <Toaster key={toast.id} {...toast} style={{ top: index * 70 }} />
      ))}
    </>
  );
};

const Toaster: React.FC<ToasterProps & { style?: React.CSSProperties }> = ({ message, visible, duration = 8000, onHide, style }) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        if (onHide) onHide();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  return (
    <Snackbar open={visible} autoHideDuration={duration} onClose={onHide} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} style={style}>
      <Alert variant="filled" onClose={onHide} severity={message.type.toLowerCase() as 'success' | 'info' | 'warning' | 'error'} sx={{ width: '100%' }}>
        {message?.message}
      </Alert>
    </Snackbar>
  );
};
