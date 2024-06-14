import '../App.css';
import logo from '../assets/r2d2.png';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, ButtonBase, Grid, Tooltip, useTheme } from '@mui/material';

import { useLocation, Form, useNavigate } from 'react-router-dom';
import TopMenu from './menu';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

export default function Banner() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClickLogo = () => {
    navigate('/', { replace: true });
  };
  const handleClickFavorites = () => {
    navigate('/favorites');
  };

  return (
    <>
      <Grid
        container
        className="banner"
        direction="row"
        alignItems={'center'}
        justifyContent={'space-between'}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Grid item xs={1}>
          {location.pathname != '/' && (
            <Form method="get" action={location.pathname == '/new' ? '/favorites' : '/'} replace>
              <IconButton
                type="submit" // <-- here i'm using React Router Data API to navigate instead of using a traditional handle with a navigate("/list")
              >
                <ArrowBackIcon
                  sx={{
                    height: '32px',
                    width: '32px',
                    color: theme.palette.common.white
                  }}
                />
              </IconButton>
            </Form>
          )}
        </Grid>
        <Grid item xs={1}>
          <ButtonBase className="banner-logo" onClick={handleClickLogo} disableRipple>
            <img src={logo} alt="Star Wars-Logo" style={{ width: '50px' }} />
          </ButtonBase>
        </Grid>
        <Grid container item xs={2} sx={{ marginRight: 1 }}>
          <Grid item alignContent={"center"}>
            <Box sx={{width: "30px"}}>
              {location.pathname != '/favorites' && (
                <Tooltip title="Go to Favorites" placement="bottom">
                <ButtonBase className="banner-logo" onClick={handleClickFavorites} disableRipple>
                  <StarRoundedIcon color='secondary'/>
                </ButtonBase>
              </Tooltip>
              )}
            </Box>
          </Grid>
          <Grid item>
            <TopMenu />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
