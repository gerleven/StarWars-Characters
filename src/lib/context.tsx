import { useState } from 'react';
import { Character, IMyContext } from './definitions';
import { starwarsService } from '../api/starwars-service';

const useMyContext = (): IMyContext => {
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [charactersSearchResult, setCharactersSearchResult] = useState<Character[]>([] as Character[]);
  const [charactersDeleted, setCharactersDeleted] = useState<Character[]>([] as Character[]);
  const [loading, setLoading] = useState<boolean>(false);

  const updateCharacters = (newCharacters: Character[] = characters) => {
    setCharacters([...newCharacters]);
    localStorage.setItem('characters', JSON.stringify(newCharacters));
  };

  const resetList = () => {
    setLoading(true);
    starwarsService.getCharactersPaginated().then((characterResults) => {
      updateCharacters(characterResults);
      setCharactersDeleted([] as Character[]);
    }).finally(()=>{setLoading(false);});
  };
  
  const searchCharacter = (q: string) => {
    setLoading(true);
    starwarsService.searchCharacter(q).then((characters) => {
      setCharactersSearchResult(characters);
    }).finally(()=>{setLoading(false);});
  };
  const clearSearchCharactersList = ()=>{
    setCharactersSearchResult([] as Character[]);
  }

  const addNewCharacter = (character: Character) => {
    updateCharacters([character, ...characters]);
  };
  const deleteCharacter = (character: Character) => {
    setCharactersDeleted((prev) => [...prev, character]);
    const filteredList = characters.filter((c) => c != character);
    updateCharacters(filteredList);
  };
  const deleteAll = () => {
    setCharactersDeleted((prev) => [...prev, ...characters]);
    updateCharacters([] as Character[]);
  };
  const undoDeleteCharacter = () => {
    const index = charactersDeleted.length - 1;
    if (index == -1) return;
    const characterToRestore: Character = charactersDeleted[index];
    addNewCharacter(characterToRestore);
    const newCharactersToDeleteList = charactersDeleted.slice(0, charactersDeleted.length - 1);
    setCharactersDeleted(newCharactersToDeleteList);
  };
  const sortCharacters = () => {
    characters.sort((a, b) => a.name.localeCompare(b.name));
    updateCharacters();
  };

  const contextDefaultValue = {
    characters,
    charactersSearchResult,
    loading,
    charactersDeleted,
    updateCharacters,
    resetList,
    searchCharacter,
    addNewCharacter,
    deleteCharacter,
    deleteAll,
    undoDeleteCharacter,
    sortCharacters,
    clearSearchCharactersList
  };
  return contextDefaultValue;
};

export default useMyContext;
