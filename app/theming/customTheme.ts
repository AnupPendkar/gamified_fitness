'use client';
import { createTheme } from '@mui/material/styles';

const { palette } = createTheme();
declare module '@mui/material/styles' {
  interface Palette {
    ternary?: Palette['primary'];
    cancel?: Palette['primary'];
    hover?: Palette['primary'];
    inactive?: Palette['primary'];
  }

  interface PaletteOptions {
    ternary?: PaletteOptions['primary'];
    cancel?: PaletteOptions['primary'];
    hover?: PaletteOptions['primary'];
    inactive?: PaletteOptions['primary'];
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    ternary: true;
    cancel: true;
  }
}
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    ternary: true;
  }
}

// Dark theme
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: palette.augmentColor({
      color: {
        main: '#151515',
        contrastText: '#DDDDE1',
      },
    }),
    secondary: palette.augmentColor({
      color: {
        main: '#202023',
        contrastText: '#DDDDE1',
      },
    }),
    ternary: palette.augmentColor({
      color: {
        main: '#0F151B',
        contrastText: '#ffffff',
      },
    }),

    text: {
      primary: '#DDDDE1',
      secondary: '#DDDDE1',
    },
    background: {
      default: '#151515',
      paper: '#19222c',
    },

    error: palette.augmentColor({
      color: {
        main: '#F52424',
        contrastText: '#191919',
      },
    }),
    success: palette.augmentColor({
      color: {
        main: '#BAF247',
        contrastText: '#191919',
      },
    }),
    cancel: palette.augmentColor({
      color: {
        main: '#444444',
        contrastText: '#f1f1f1',
      },
    }),
    inactive: palette.augmentColor({
      color: {
        main: '#555555',
        contrastText: '#191919',
      },
    }),
    hover: palette.augmentColor({
      color: {
        main: '#5b664f',
        contrastText: '#191919',
      },
    }),
    info: palette.augmentColor({
      color: {
        main: '#0062a2',
        contrastText: '#ffffff',
      },
    }),
    warning: palette.augmentColor({
      color: {
        main: '#F57474',
        contrastText: '#191919',
      },
    }),

    divider: '#909284',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          borderRadius: '8px',
          textTransform: 'unset',

          '&.Mui-disabled': {
            background: '#757575',
            color: '#454545',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiInputBase-root': {
            borderRadius: '10px',
            color: 'var(--color-text-primary)',
            padding: '3px 3px !important',
            marginTop: '8px !important',
            paddingTop: '10px !important',

            '& .MuiInputBase-input': {
              padding: '3px 3px !important',
              fontSize: '16px',
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          zIndex: 1,
          color: 'var(--color-text-primary) !important',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: 14,
          fontFamily: 'Inter Regular',
          padding: '10px 24px',
          backgroundColor: theme.palette.ternary?.main,
          boxShadow: '0px 4px 16px 0px #282828',
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingTop: '7px !important',
          paddingBottom: '10px !important',
          backgroundColor: theme.palette.secondary.main,
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.secondary.main,
          padding: '0px 24px',
          paddingBottom: '20px',
          borderRadius: '0 0 6px 6px',
          gap: 10,
        }),
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
          boxShadow: 'none',
          backgroundImage: 'none',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: 12,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: `${theme.palette.primary.main} !important`,
          color: `${theme.palette.text.primary} !important`,

          '&:hover': {
            backgroundColor: `${theme.palette.secondary.main} !important`,
          },
        }),
      },
    },
  },
});
