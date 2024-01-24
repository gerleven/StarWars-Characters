import { useState } from "react";
import { Character, IMyContext } from "./definitions";

const useMyContext = (): IMyContext => {
  const [test, setTest] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);

  const resetCharacters = () => {
    setCharacters([] as Character[]);
  };
  const updateCharacters = (characters: Character[]) => {
    setCharacters(characters);
  };
  const addNewCharacter = (character: Character) => {
    setCharacters((prev) => ([character, ...prev]));
    localStorage.setItem("characters", JSON.stringify([character, ...characters]));
  };
  const deleteCharacter = (character: Character) => {
    const filteredList = characters.filter((c) => c != character);
    setCharacters(filteredList);
    localStorage.setItem("characters", JSON.stringify(filteredList));
  };

  const turnTest = () => {
    setTest((prev) => !prev);
  };

  const contextDefaultValue = {
    test,
    characters,
    turnTest,
    resetCharacters,
    updateCharacters,
    addNewCharacter,
    deleteCharacter,
  };
  return contextDefaultValue;
};

export default useMyContext;
