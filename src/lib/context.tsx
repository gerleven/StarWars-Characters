import { useState } from "react";
import { Character, IMyContext } from "./definitions";
import { fetchCharacters } from "./data";

const useMyContext = (): IMyContext => {
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [charactersDeleted, setCharactersDeleted] = useState<Character[]>([] as Character[]);
  const [loading, setLoading] = useState<boolean>(false);

  const resetList = () => {
    setLoading(true);
    fetchCharacters().then((characterResults) => {
      updateCharacters(characterResults);
      setCharactersDeleted([] as Character[]);
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
    setCharactersDeleted((prev)=>([...prev, character]));
    const filteredList = characters.filter((c) => c != character);
    updateCharacters(filteredList);
  };
  const undoDeleteCharacter = () => {
    console.log(charactersDeleted)
    const index = charactersDeleted.length-1;
    if (index == -1) return;
    const characterToRestore: Character = charactersDeleted[index];
    addNewCharacter(characterToRestore);
    const newCharactersToDeleteList = charactersDeleted.slice(0,charactersDeleted.length-1);
    setCharactersDeleted(newCharactersToDeleteList);
  };

  const contextDefaultValue = {
    characters,
    loading,
    charactersDeleted,
    resetList,
    deleteAll,
    updateCharacters,
    addNewCharacter,
    deleteCharacter,
    undoDeleteCharacter,
  };
  return contextDefaultValue;
};

export default useMyContext;
