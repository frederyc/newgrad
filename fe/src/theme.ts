import {createTheme, Theme} from "@mui/material";

export const lightTheme: Theme = createTheme({
  palette: {
    // @ts-ignore
    type: 'light',
    primary: {
      main: '#8083FF',
    },
    secondary: {
      main: '#F5F5F5',
    },
    error: {
      main: "#D32F2F"
    },
    text: {
      primary: '#170000 ',
      secondary: '#94969C',
      disabled: '#94969C'
    },
    background: {
      default: '#E3E3E3',
      paper: '#FFF',
    },
    typography: {
      button: {
        textTransform: 'none'
      },
      fontFamily: [
        '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        'sans-serif'
      ].join(','),
      code: [
        'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'
      ].join(','),
    },
    bullets: {
      primary: '#8083FF',
      secondary: '#ACB7C0'
    }
  },
});

export const darkTheme: Theme = createTheme({
  palette: {
    // @ts-ignore
    type: 'dark',
    primary: {
      main: '#8083FF',
    },
    secondary: {
      main: '#F5F5F5',
    },
    error: {
      main: "#D32F2F"
    },
    text: {
      primary: '#F0F0F0',
      secondary: '#ACB7C0',
      disabled: '#8293a0',
    },
    background: {
      default: '#13131A',
      paper: '#252530',
    },
    typography: {
      button: {
        textTransform: 'none'
      },
      fontFamily: [
        '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        'sans-serif'
      ].join(','),
      code: [
        'source-code-pro', 'Menlo', 'Monaco', 'Consolas', 'Courier New', 'monospace'
      ].join(','),
    },
    bullets: {
      primary: '#8083FF',
      secondary: '#ACB7C0'
    }
  },
});
