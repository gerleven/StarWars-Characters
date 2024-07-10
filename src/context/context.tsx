import { useEffect, useState } from 'react';
import { Character, CharactersApiResponse } from '../lib/definitions';
import { starwarsService } from '../api/starwars-service';

const useMyContext = (): IMyContext => {
  const [charactersSearchResult, setCharactersSearchResult] = useState<Character[]>([] as Character[]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inputSearch, setInputSearch] = useState<string>('');
  const [totalRows, setTotalRows] = useState<number>(0);
  const [nextUrl, setNextUrl] = useState<string | null>('');
  const [previousUrl, setPreviousUrl] = useState<string | null>('');
  const [showTable, setShowTable] = useState<boolean>(true);

  const [favoriteCharacters, setFavoriteCharacters] = useState<Character[]>(
    JSON.parse(localStorage.getItem('favoriteCharacters') || '[]') as Character[]
  );
  const [favoriteCharactersDeleted, setFavoriteCharactersDeleted] = useState<Character[]>([] as Character[]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchCharacters(null, undefined);
  }, []);

  //FUNCTIONS
  //Search functions
  const fetchCharacters = (q: string | null | undefined = '', pageNumber: number | undefined) => {
    setLoading(true);
    starwarsService
      .fetchCharacters(q, pageNumber)
      .then((response: CharactersApiResponse) => {
        setTotalRows(response.count);
        setNextUrl(response.next);
        setPreviousUrl(response.previous);
        setCharactersSearchResult(response.results);
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
      .fetchCharacters(null, randomPage)
      .then((response) => {
        updateFavoriteCharacters(response.results);
        setFavoriteCharactersDeleted([] as Character[]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //Others functions
  const handleChangeInputSearch = (value: string) => {
    setInputSearch(value);
  };
  const handleChangeCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleShowTable = (value: boolean) => {
    setShowTable(value);
  };

  const contextDefaultValue = {
    loading,
    charactersSearchResult,
    currentPage,
    inputSearch,
    favoriteCharacters,
    favoriteCharactersDeleted,
    totalRows,
    nextUrl,
    previousUrl,
    showTable,
    handleShowTable,
    fetchCharacters,
    handleChangeCurrentPage,
    handleChangeInputSearch,
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
  charactersSearchResult: Character[];
  inputSearch: string;
  favoriteCharacters: Character[];
  favoriteCharactersDeleted: Character[];
  totalRows: number;
  currentPage: number;
  nextUrl: string | null;
  previousUrl: string | null;
  showTable: boolean;
  handleShowTable: (value: boolean) => void;
  fetchCharacters: (q?: string | null, pageNumber?: number) => void;
  handleChangeCurrentPage: (pageNumber: number) => void;
  handleChangeInputSearch: (value: string) => void;
  clearSearchCharactersList: () => void;
  updateFavoriteCharacters: (characters: Character[]) => void;
  getRandomFavoriteList: () => void;
  addNewFavoriteCharacter: (characters: Character) => void;
  deleteFavoriteCharacter: (characters: Character) => void;
  deleteAllFavorites: () => void;
  undoDeleteFavorite: () => void;
  sortFavoriteCharacters: () => void;
}
