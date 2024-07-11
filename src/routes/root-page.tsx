import { Outlet } from 'react-router-dom';
import '../App.css';
import { Stack } from '@mui/material';
import Banner from '../components/banner';
import { MyContextProvider } from '../context/context';

const RootPage = () => {
  return (
    <>
      <MyContextProvider>
        <Stack className="fullscreen" direction={'column'} justifyContent={'start'} alignItems={'center'} alignContent={'center'}>
          <Stack className="app-wrapper" direction={'column'} justifyContent={'start'} alignItems={'strech'} alignContent={'center'}>
            <Banner />
            <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1} className={'overFlowYScroll'} padding={3}>
              <Outlet />
            </Stack>
          </Stack>
        </Stack>
      </MyContextProvider>
    </>
  );
};

export default RootPage;
