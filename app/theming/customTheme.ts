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
            backgroundColor: '#ffffff',
            color: '#191919',
            caretColor: '#191919',
          },
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: '#ffffff',
          },
          '.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f1f1f1',
          },
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: 20,
          borderRadius: '6px 6px 0 0',
          fontFamily: 'Inter Regular',
          padding: '7px 24px',
          backgroundColor: '#202023',
          boxShadow: '0px 4px 16px 0px #282828',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          paddingTop: '25px !important',
          backgroundColor: '#19222c',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          gap: 10,
          padding: 0,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'inherit',
          boxShadow: 'none',
          backgroundImage: 'none',
          // filter: "drop-shadow(0px 4px 4px rgba(87, 87, 87, 0.25))",
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: '#DDDDE1',
          color: '#191919',

          '&:hover': {
            backgroundColor: '#F1f1f1 !important',
            color: '#191919',
          },
        },
      },
    },
  },
});
