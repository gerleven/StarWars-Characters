import { useState } from 'react';
import { Character } from './definitions';
import { starwarsService } from '../api/starwars-service';

const useMyContext = (): IMyContext => {
  const [charactersSearchResult, setCharactersSearchResult] = useState<Character[]>([] as Character[]);

  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>(
    JSON.parse(localStorage.getItem('favoriteCharacters') || '[]') as Character[]
  );
  const [favoriteCharactersDeleted, setFavoriteCharactersDeleted] = useState<Character[]>([] as Character[]);

  const [loading, setLoading] = useState<boolean>(false);
  
  //FUNCTIONS
  //Search functions
  const searchCharacter = (q: string) => {
    setLoading(true);
    starwarsService
      .searchCharacter(q)
      .then((characters) => {
        setCharactersSearchResult(characters);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const searchRandomCharacter = () => {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 9) + 1;
    starwarsService
      .getCharactersPaginated(randomPage)
      .then((characters) => {
        setCharactersSearchResult(characters);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const clearSearchCharactersList = () => {
    setCharactersSearchResult([] as Character[]);
  };

  //Favorites functions
  const updateFavoriteCharacters = (newFavoriteCharacters: Character[] = favoriteCharacters) => {
    setFavoriteCharacters([...newFavoriteCharacters]);
    localStorage.setItem('favoriteCharacters', JSON.stringify(newFavoriteCharacters));
  };

  const addNewFavoriteCharacter = (character: Character) => {
    updateFavoriteCharacters([character, ...favoriteCharacters]);
  };
  const deleteFavoriteCharacter = (character: Character) => {
    setFavoriteCharactersDeleted((prev) => [...prev, character]);
    const filteredList = favoriteCharacters.filter((c) => c != character);
    updateFavoriteCharacters(filteredList);
  };
  const deleteAllFavorites = () => {
    setFavoriteCharactersDeleted((prev) => [...prev, ...favoriteCharacters]);
    updateFavoriteCharacters([] as Character[]);
  };
  const undoDeleteFavorite = () => {
    const index = favoriteCharactersDeleted.length - 1;
    if (index == -1) return;
    const characterToRestore: Character = favoriteCharactersDeleted[index];
    addNewFavoriteCharacter(characterToRestore);
    const newCharactersToDeleteList = favoriteCharactersDeleted.slice(0, favoriteCharactersDeleted.length - 1);
    setFavoriteCharactersDeleted(newCharactersToDeleteList);
  };
  const sortFavoriteCharacters = () => {
    favoriteCharacters.sort((a, b) => a.name.localeCompare(b.name));
    updateFavoriteCharacters();
  };

  const resetFavoriteList = () => {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 9) + 1;
    console.log(randomPage);
    starwarsService
      .getCharactersPaginated(randomPage)
      .then((characterResults) => {
        updateFavoriteCharacters(characterResults);
        setFavoriteCharactersDeleted([] as Character[]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const contextDefaultValue = {
    loading,
    charactersSearchResult,
    favoriteCharacters,
    favoriteCharactersDeleted,
    updateFavoriteCharacters,
    resetFavoriteList,
    searchCharacter,
    addNewFavoriteCharacter,
    deleteFavoriteCharacter,
    deleteAllFavorites,
    undoDeleteFavorite,
    sortFavoriteCharacters,
    clearSearchCharactersList,
    searchRandomCharacter
  };

  return contextDefaultValue;
};

export default useMyContext;

export interface IMyContext {
  loading: boolean;
  charactersSearchResult: Character[];
  favoriteCharacters: Character[];
  favoriteCharactersDeleted: Character[];
  updateFavoriteCharacters: (characters: Character[]) => void;
  resetFavoriteList: () => void;
  searchCharacter: (q: string) => void;
  addNewFavoriteCharacter: (characters: Character) => void;
  deleteFavoriteCharacter: (characters: Character) => void;
  deleteAllFavorites: () => void;
  undoDeleteFavorite: () => void;
  sortFavoriteCharacters: () => void;
  clearSearchCharactersList: () => void;
  searchRandomCharacter: ()=> void;
}