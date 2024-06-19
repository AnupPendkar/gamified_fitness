'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CustomThemeProvider from './theming/CustomThemeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <CustomThemeProvider>{children}</CustomThemeProvider>
    </AppRouterCacheProvider>
  );
}
