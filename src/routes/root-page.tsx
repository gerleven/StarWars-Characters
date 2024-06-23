import { Outlet } from 'react-router-dom';
import '../App.css';
import { Stack } from '@mui/material';
import Banner from '../components/banner';
import { createContext } from 'react';
import useMyContext, { IMyContext } from '../lib/context';

export const MyContext = createContext<IMyContext>({} as IMyContext);

const RootPage = () => {
  const contextDefaultValue = useMyContext(); // --> This Custom Hook provide the context default values object
  return (
    <>
      <MyContext.Provider value={contextDefaultValue}>
        <Stack className="fullscreen" direction={'column'} justifyContent={'start'} alignItems={'center'} alignContent={"center"}>
          <Stack className="app-wrapper" direction={'column'} justifyContent={'start'} alignItems={"center"} alignContent={"center"}>
            <Banner />
            <Outlet />
          </Stack>
        </Stack>
      </MyContext.Provider>
    </>
  );
};

export default RootPage;
