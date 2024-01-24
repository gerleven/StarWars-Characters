import { useState } from "react";
import { Character, IMyContext } from "./definitions";

const useMyContext = (): IMyContext => {
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);

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
    deleteAll,
    updateCharacters,
    addNewCharacter,
    deleteCharacter,
  };
  return contextDefaultValue;
};

export default useMyContext;
