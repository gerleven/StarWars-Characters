import { createTheme } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: { main: "#3483FA" },
    secondary: {
      main: "rgba(65, 137, 230, 0.15);",
    },
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
