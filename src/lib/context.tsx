import { useState } from 'react';
import { Character } from './definitions';
import { starwarsService } from '../api/starwars-service';

const useMyContext = (): IMyContext => {
  const [charactersSearchResult, setCharactersSearchResult] = useState<Character[]>([] as Character[]);
  const [charactersPaginated, setCharactersPaginated] = useState<Character[]>([] as Character[]);

  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>(
    JSON.parse(localStorage.getItem('favoriteCharacters') || '[]') as Character[]
  );
  const [favoriteCharactersDeleted, setFavoriteCharactersDeleted] = useState<Character[]>([] as Character[]);

  const [loading, setLoading] = useState<boolean>(false);

  //FUNCTIONS
  //Search functions
  const searchCharacter = (q: string = "") => {
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

  const getCharactersPaginated = (pageNumber: number = 1) => {
    setLoading(true);
    starwarsService
      .getCharactersPaginated(pageNumber)
      .then((characters) => {
        setCharactersPaginated(characters);
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

  const getRandomFavoriteList = () => {
    setLoading(true);
    const randomPage = Math.floor(Math.random() * 8) + 1;
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
    charactersPaginated,
    charactersSearchResult,
    favoriteCharacters,
    favoriteCharactersDeleted,
    getCharactersPaginated,
    searchCharacter,
    clearSearchCharactersList,
    updateFavoriteCharacters,
    getRandomFavoriteList,
    addNewFavoriteCharacter,
    deleteFavoriteCharacter,
    deleteAllFavorites,
    undoDeleteFavorite,
    sortFavoriteCharacters
  };

  return contextDefaultValue;
};

export default useMyContext;

export interface IMyContext {
  loading: boolean;
  charactersPaginated: Character[];
  charactersSearchResult: Character[];
  favoriteCharacters: Character[];
  favoriteCharactersDeleted: Character[];
  getCharactersPaginated: () => void;
  searchCharacter: (q: string) => void;
  clearSearchCharactersList: () => void;
  updateFavoriteCharacters: (characters: Character[]) => void;
  getRandomFavoriteList: () => void;
  addNewFavoriteCharacter: (characters: Character) => void;
  deleteFavoriteCharacter: (characters: Character) => void;
  deleteAllFavorites: () => void;
  undoDeleteFavorite: () => void;
  sortFavoriteCharacters: () => void;
}
