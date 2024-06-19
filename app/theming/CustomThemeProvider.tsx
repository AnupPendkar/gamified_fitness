'use client';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { darkTheme } from './customTheme';

type MyThemeProviderProps = {
  children: React.ReactNode;
};

const CustomThemeProvider = (props: MyThemeProviderProps) => {
  /**
   * Maintains the global style for MUI components.
   * @returns
   */
  const GlobalStyle = () => (
    <GlobalStyles
      styles={(theme) => ({
        // Table
        '.MuiTable-root': {
          borderCollapse: 'separate !important',
          borderSpacing: '0 5px !important',
          backgroundColor: theme.palette.primary.main,
        },
        '.MuiTableHead-root': {
          transform: 'translateY(-6px)',
          position: 'sticky',
          color: '#AAAAAA !important',
          top: 6,
        },
        '.MuiTableCell-root': {
          fontSize: '15px !important',
          fontFamily: 'Inter Regular !important',
          border: 'none !important',
          color: `inherit !important`,

          '&:first-of-type': {
            borderRadius: '7px 0 0 7px',
          },
          '&:last-of-type': {
            borderRadius: '0 7px 7px 0',
          },
        },
        '.MuiDialogContentText-root': {
          color: '#ffffff !important',
        },

        // Appbar
        '.MuiAppBar-root': {
          backgroundColor: '#0F151B !important',
          color: '#ffffff',
        },

        // Menu
        '.MuiMenu-list': {
          paddingBottom: '0 !important',
          paddingTop: '0 !important',
        },
        '.MuiMenu-paper': {
          boxShadow: '0px 2px 9px -2px #282828 !important;',
        },

        // Snackbar
        '.MuiAlert-root': {
          background: '#82C41E !important',
          color: '#191919 !important',
          fontFamily: 'Inter SemiBold !important',
        },

        '.MuiAlert-icon': {
          color: '#191919 !important',
        },

        '.MuiModal-backdrop': {
          backdropFilter: 'blur(10px) !important',
          background: '#6E7174 !important',
          opacity: '0.5 !important',
        },

        '.MuiBackdrop-invisible': {
          backdropFilter: 'blur(0px) !important',
          background: 'none !important',
          opacity: '1 !important',
        },

        // Tooltip
        '.MuiTooltip-tooltip': {
          fontSize: '14px !important',
        },
      })}
    />
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <CssBaseline enableColorScheme />
      {props.children}
    </ThemeProvider>
  );
};

export default CustomThemeProvider;
