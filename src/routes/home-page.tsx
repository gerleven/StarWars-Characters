import SearchBar from '../components/search-bar';
import SearchResult from '../components/search-result';
import { useContext, useEffect } from 'react';
import { Character, IMyContext } from '../lib/definitions.tsx';
import { Stack, Typography } from '@mui/material';
import { MyContext } from './root-page.tsx';

const HomePage = () => {
  const { updateCharacters, resetList }: IMyContext = useContext(MyContext);

  useEffect(() => {
    //Check for characters in the Local Storage
    const charactersInit: Character[] = JSON.parse(localStorage.getItem('characters') || '[]') as Character[];

    //In case there is no local storage, call the API.
    if (charactersInit.length == 0) {
      resetList();
    } else {
      updateCharacters(charactersInit);
    }
  }, []);

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
