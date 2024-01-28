import { useState } from "react";
import { Character, IMyContext } from "./definitions";
import { fetchCharacters } from "./data";

const useMyContext = (): IMyContext => {
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [loading, setLoading] = useState<boolean>(false);

  
  const callApi = () => {
    setLoading(true);
    fetchCharacters().then((characterResults) => {
      updateCharacters(characterResults);
      setLoading(false);
    });
  };
  const deleteAll = () => {
    updateCharacters([] as Character[]);
  };
  const updateCharacters = (characters: Character[]) => {
    setCharacters(characters);
    localStorage.setItem("characters", JSON.stringify(characters));
  };
  const addNewCharacter = (character: Character) => {
    updateCharacters([character, ...characters]);
  };
  const deleteCharacter = (character: Character) => {
    const filteredList = characters.filter((c) => c != character);
    updateCharacters(filteredList);
  };

  const contextDefaultValue = {
    characters,
    loading,
    callApi,
    deleteAll,
    updateCharacters,
    addNewCharacter,
    deleteCharacter,
  };
  return contextDefaultValue;
};

export default useMyContext;
