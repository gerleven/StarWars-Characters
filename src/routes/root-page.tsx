import { Outlet } from "react-router-dom";
import "../App.css";
import { Stack, Typography, useTheme } from "@mui/material";


const RootPage = () => {
    const theme = useTheme();
  return (
    <>
      <Stack
        className="fullscreen"
        direction={"column"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <Stack
          className="app-wrapper"
          direction={"column"}
          justifyContent={"start"}
          alignItems={"strech"}
        >
          <div><Typography color={theme.palette.primary.main}>Banner!</Typography></div>
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
};

export default RootPage;
