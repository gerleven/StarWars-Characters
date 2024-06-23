import SearchBar from '../components/search-bar';
import SearchResult from '../components/search-result';
import { Typography } from '@mui/material';

const HomePage = () => {
  return (
    <>
      <Typography textAlign={'left'} fontSize={24} fontWeight={'500'}>
        Search a Starwars character:
      </Typography>
      <SearchBar />
      <br></br>
      <SearchResult />
    </>
  );
};

export default HomePage;
