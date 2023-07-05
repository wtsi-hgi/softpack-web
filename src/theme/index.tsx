import { createTheme } from '@mui/material';

const Theme = () => {
  return createTheme({
    typography: {
      fontFamily: ['Roboto', 'Public Sans', 'sans-serif'].join(','),
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 600,
      h1: {
        fontWeight: 600,
        fontSize: '2.375rem',
        lineHeight: 1.21,
      },
      h2: {
        fontWeight: 600,
        fontSize: '1.875rem',
        lineHeight: 1.27,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.33,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      h6: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.57,
      },
    },
  });
};

export default Theme;
