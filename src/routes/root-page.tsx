import { Outlet } from "react-router-dom";
import "../App.css";
import { Stack } from "@mui/material";
import Banner from "../components/banner";

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
        >
          <Banner />
          <Outlet />
        </Stack>
      </Stack>
    </>
  );
};

export default RootPage;
