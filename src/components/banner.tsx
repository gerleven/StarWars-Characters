import "../App.css";
import logo from "../assets/r2d2.png";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ButtonBase, Grid, useTheme } from "@mui/material";

import { useLocation, Form, useNavigate } from "react-router-dom";
import TopMenu from "./menu";

export default function Banner() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate(location.pathname == "/" ? "/about" : "/");
  };

  return (
    <>
      <Grid
        container
        className="banner"
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ backgroundColor: theme.palette.primary.main }}
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
          <ButtonBase
            className="banner-logo"
            onClick={handleClickLogo}
            disableRipple
          >
            <img src={logo} alt="Star Wars-Logo" style={{ width: "50px" }} />
          </ButtonBase>
        </Grid>
        <Grid item xs={1} sx={{ marginRight: 1 }}>
          <TopMenu />
        </Grid>
      </Grid>
    </>
  );
}
