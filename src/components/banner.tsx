import '../App.css';
import logo from '../assets/r2d2.png';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ButtonBase, Grid, Tooltip, useTheme } from '@mui/material';

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
        alignContent={'center'}
        justifyContent={'space-between'}
        sx={{ backgroundColor: theme.palette.primary.main }}
      >
        <Grid item xs={3} height={'100%'}>
          {location.pathname != '/' && (
            <Form
              method="get"
              action={location.pathname == '/new' ? '/favorites' : '/'}
              replace
              style={{ height: '100%' }}
            >
              <IconButton
                sx={{ height: '100%' }}
                size="large"
                type="submit" // <-- here i'm using React Router Data API to navigate instead of using a traditional handle with a navigate("/list")
              >
                <ArrowBackIcon
                  sx={{
                    maxHeight: '100%',
                    color: theme.palette.common.white
                  }}
                  fontSize="inherit"
                />
              </IconButton>
            </Form>
          )}
        </Grid>
        <Grid item xs={3} height={'100%'} direction={'column'} justifyContent={'center'} display={'flex'}>
          <ButtonBase className="banner-logo" onClick={handleClickLogo} disableRipple>
            <img src={logo} alt="Star Wars-Logo" style={{ height: '100%' }} />
          </ButtonBase>
        </Grid>
        <Grid container item xs={3} direction="row" alignContent={"center"} alignItems={"center"} justifyContent={'end'} sx={{ height: '100%' }}>
          <Grid item display={"flex"} justifyContent="center" sx={{ height: '100%',  }} xs={6}>
            {location.pathname != '/favorites' && (
              <Tooltip title="Go to Favorites" placement="bottom">
                <IconButton sx={{ height: '100%', p: 0 }} size="large" className="banner-logo" onClick={handleClickFavorites}>
                  <StarRoundedIcon
                    color="secondary"
                    fontSize="inherit"
                    sx={{
                      maxHeight: '100%',
                      maxWidth: "80%"
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
          <Grid item display={"flex"} justifyContent="center"  sx={{ height: '100%' }} xs={6}>
            <TopMenu />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
