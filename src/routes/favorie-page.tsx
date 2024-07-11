import { useEffect, useState } from 'react';
import { Character } from '../lib/definitions.tsx';
import { Typography } from '@mui/material';
import FilterBar from '../components/filter-bar.tsx';
import FavoriteList from '../components/favorite-list.tsx';
import { IMyContext, useMyContext } from '../context/context.tsx';

const FavoritePage = () => {
  const [filteredCharactersList, setFilteredCharactersList] = useState<Character[]>([] as Character[]);
  const [inputFilter, setInputFilter] = useState<string>('');

  const { favoriteCharacters }: IMyContext = useMyContext();

  //Keep the filtered list of favorites in sync when searching or deleting any characters
  useEffect(() => {
    const newFilteredList = favoriteCharacters.filter((character: Character) => character.name.toLowerCase().includes(inputFilter.toLowerCase()));
    setFilteredCharactersList(newFilteredList);
  }, [inputFilter, favoriteCharacters]);

  return (
    <>
      <Typography textAlign={'left'} fontSize={24} fontWeight={'500'}>
        Your Favorite List:
      </Typography>
      <FilterBar inputFilter={inputFilter} setInputFilter={setInputFilter} />
      <FavoriteList inputFilter={inputFilter} filteredCharactersList={filteredCharactersList} />
    </>
  );
};

export default FavoritePage;
