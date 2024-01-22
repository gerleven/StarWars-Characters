import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: { main: "#ffa001", light: "ffc45f", dark: "#b38801" },
    secondary: { main: "#fff0c0", dark: "ffe180" },
    common: { black: "#000000);", white: "#FFFFFF" },
    grey: { 100: "#ededed", 200: "#d9d9d9", 300: "rgba(0, 0, 0, 0.55);" },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {},
    },
  },
  typography: {},
});

export default theme;
