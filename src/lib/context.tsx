import { useState } from 'react';
import { Character, CharactersApiResponse } from './definitions';
import { starwarsService } from '../api/starwars-service';

const useMyContext = (): IMyContext => {
  const [charactersSearchResult, setCharactersSearchResult] = useState<Character[]>([] as Character[]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [nextUrl, setNextUrl] = useState<string | null>("");
  const [previousUrl, setPreviousUrl] = useState<string | null>("");

  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>(
    JSON.parse(localStorage.getItem('favoriteCharacters') || '[]') as Character[]
  );
  const [favoriteCharactersDeleted, setFavoriteCharactersDeleted] = useState<Character[]>([] as Character[]);

  const [loading, setLoading] = useState<boolean>(false);

  //FUNCTIONS
  //Search functions
  const fetchCharacters = (q: string | null | undefined = '', pageNumber: number | undefined) => {
    setLoading(true);
    starwarsService
      .fetchCharacters(q, pageNumber)
      .then((response: CharactersApiResponse) => {
        setTotalRows(response.count);
        setNextUrl(response.next);
        setPreviousUrl(response.previous)
        setCharactersSearchResult(response.results);
        setCurrentPage(1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const clearSearchCharactersList = () => {
    setCharactersSearchResult([] as Character[]);
  };
  
  const handleChangeCurrentPage = (value: number) => {
    setCurrentPage(value);
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
      .fetchCharacters(null, randomPage)
      .then((response) => {
        updateFavoriteCharacters(response.results);
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
    totalRows,
    currentPage,
    nextUrl,
    previousUrl,
    fetchCharacters,
    clearSearchCharactersList,
    updateFavoriteCharacters,
    getRandomFavoriteList,
    addNewFavoriteCharacter,
    deleteFavoriteCharacter,
    deleteAllFavorites,
    undoDeleteFavorite,
    sortFavoriteCharacters,
    handleChangeCurrentPage
  };

  return contextDefaultValue;
};

export default useMyContext;

export interface IMyContext {
  loading: boolean;
  charactersSearchResult: Character[];
  favoriteCharacters: Character[];
  favoriteCharactersDeleted: Character[];
  totalRows: number;
  currentPage: number;
  nextUrl: string | null;
  previousUrl: string | null;
  fetchCharacters: (q?: string | null, pageNumber?: number)=>void;
  clearSearchCharactersList: () => void;
  updateFavoriteCharacters: (characters: Character[]) => void;
  getRandomFavoriteList: () => void;
  addNewFavoriteCharacter: (characters: Character) => void;
  deleteFavoriteCharacter: (characters: Character) => void;
  deleteAllFavorites: () => void;
  undoDeleteFavorite: () => void;
  sortFavoriteCharacters: () => void;
  handleChangeCurrentPage: (value: number) => void;
}
