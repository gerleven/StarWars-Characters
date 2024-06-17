import SearchBar from '../components/search-bar';
import SearchResult from '../components/search-result';
import { Stack, Typography } from '@mui/material';

const HomePage = () => {
  
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        className={'overFlowYScroll'}
        sx={{ height: '80vh' }}
        padding={2}
      >
        <Typography textAlign={'left'} fontSize={24} fontWeight={'500'}>
          Search a Starwars character:
        </Typography>
        <SearchBar />
        <br></br>
        <SearchResult />
      </Stack>
    </>
  );
};

export default HomePage;
