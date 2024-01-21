import "../App.css";
import logo from "../assets/r2d2.png";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Stack, useTheme } from "@mui/material";

import { useLocation, Form } from "react-router-dom";

export default function Banner() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      <Stack
        className="banner"
        direction="row"
        alignItems={"center"}
        justifyContent={"start"}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        {location.pathname != "/" && (
          <Form method="get" action="/" replace>
            <IconButton
              className="noFocusBorder"
              sx={{ marginLeft: "16px" }}
              type="submit" // <-- here i'm using React Router Data API to navigate instead of using a traditional handle with a navigate("/list")
            >
              <ArrowBackIcon
                sx={{
                  height: "32px",
                  width: "32px",
                  color: theme.palette.common.white,
                }}
              />
            </IconButton>
          </Form>
        )}
        <Box className="banner-logo">
          <img
            src={logo}
            alt="Star Wars-Logo"
            style={{width: "50px"}}
          />
        </Box>
      </Stack>
    </>
  );
}
