'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CustomThemeProvider from './theming/CustomThemeProvider';
import CronSetupClient from './cronSetup';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CronSetupClient />
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </AppRouterCacheProvider>
  );
}
