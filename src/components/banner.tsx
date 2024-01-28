import "../App.css";
import logo from "../assets/r2d2.png";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid, useTheme } from "@mui/material";

import { useLocation, Form } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function Banner() {
  const theme = useTheme();
  const location = useLocation();

  return (
    <>
      <Grid
        container
        className="banner"
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ backgroundColor: theme.palette.primary.main}}
      >
        <Grid item xs={1}>
          {location.pathname != "/" && (
            <Form method="get" action="/" replace>
              <IconButton
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
        </Grid>
        <Grid item xs={1}>
          <Box className="banner-logo">
            <img src={logo} alt="Star Wars-Logo" style={{ width: "50px" }} />
          </Box>
        </Grid>
        <Grid item xs={1} sx={{marginRight: 1}}>
          <IconButton>
            <MoreVertIcon
              sx={{
                height: "32px",
                width: "32px",
                color: theme.palette.common.white,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
