import { useContext, useEffect, useState } from 'react';
import { Character, IMyContext } from '../lib/definitions.tsx';
import { Stack, Typography } from '@mui/material';
import { MyContext } from './root-page.tsx';
import { SkeletonLoader } from '../components/character-card.tsx';
import FilterBar from '../components/filter-bar.tsx';
import FavoriteList from '../components/favorite-list.tsx';

const FavoritePage = () => {
  const [filteredCharactersList, setFilteredCharactersList] = useState<Character[]>([] as Character[]);
  const [inputFilter, setInputFilter] = useState<string>('');

  const { characters, loading, updateCharacters, resetList }: IMyContext = useContext(MyContext);

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

  //Keep the filtered list of characters in sync when searching or deleting any characters
  useEffect(() => {
    const newFilteredList = characters.filter((character: Character) =>
      character.name.toLowerCase().includes(inputFilter.toLowerCase())
    );
    setFilteredCharactersList(newFilteredList);
  }, [inputFilter, characters]);

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
          Your Favorite List:
        </Typography>
        <FilterBar inputFilter={inputFilter} setInputFilter={setInputFilter} />
        {loading ? (
          <SkeletonLoader />
        ) : (
          <FavoriteList inputFilter={inputFilter} filteredCharactersList={filteredCharactersList} />
        )}
      </Stack>
    </>
  );
};

export default FavoritePage;
