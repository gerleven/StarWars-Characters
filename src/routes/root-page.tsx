import { Outlet } from "react-router-dom";
import "../App.css";
import { Stack } from "@mui/material";

const RootPage = () => {
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
          <div>Banner!</div>
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
};

export default RootPage;
