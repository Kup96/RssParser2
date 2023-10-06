import React, { FunctionComponent } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';

type RootThemeProps = {
  children: any;
};

export const RootThemeProvider: FunctionComponent<RootThemeProps> = (props) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
        contrastText: 'black',
      },
      secondary: {
        main: '#FFFFFF',
        light: '#eff6fb',
        contrastText: 'white',
      },
      background: {
        default: '#040431',
      },
    },
    typography: {
      h3: {
        fontSize: '32pt',
        fontWeight: '700',
        textAlign: 'center',
        fontFamily: 'Rubik',
      },
      h4: {
        fontFamily: 'Rubik',
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            minHeight: '100%',
          },
          '#root': {
            minHeight: '100%',
            flex: 1,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: 'white',
            color: 'black',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {},
      },
      // Divider: {
      //     styleOverrides: {
      //         mt: '3';

      //     },
      // },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingLeft: '12px',
            textAlign: 'center',
            justifyContent: 'center',
            textTransform: 'none',
            fontFamily: 'Rubik',
            '&.MuiButton-textSecondary': {
              color: '#6c8066',
            },
            text: {
              fontSize: '14px',
              lineHeight: '120%',
              fontFamily: 'Rubik',
              textTransform: 'initial',
              fontWeight: 700,
              color: 'white',
            },
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
