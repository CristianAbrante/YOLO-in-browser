import {createMuiTheme} from '@material-ui/core/styles/index';

const theme = createMuiTheme(
    {
      palette: {
        primary: {
          light: "#1de9b6",
          main: "#6effe8",
          dark: "#00b686",
          contrastText: "#000000",
        },
        secondary: {
          light: "#3d5afe",
          main: "#8187ff",
          dark: "#0031ca",
          contrastText: "#ffffff",
        }
      },
      typography: {
        useNextVariants: true,
      }
    }
);

export default theme;