import { useState } from "react";
import { Character, IMyContext } from "./definitions";
import { fetchCharacters } from "./data";

const useMyContext = (): IMyContext => {
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [charactersDeleted, setCharactersDeleted] = useState<Character[]>(
    [] as Character[]
  );
  const [loading, setLoading] = useState<boolean>(false);

  const updateCharacters = (characters: Character[]) => {
    setCharacters([...characters]);
    localStorage.setItem("characters", JSON.stringify(characters));
  };

  const resetList = () => {
    setLoading(true);
    fetchCharacters().then((characterResults) => {
      updateCharacters(characterResults);
      setCharactersDeleted([] as Character[]);
      setLoading(false);
    });
  };

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
    const newCharactersToDeleteList = charactersDeleted.slice(
      0,
      charactersDeleted.length - 1
      );
      setCharactersDeleted(newCharactersToDeleteList);
    };
    const sortCharacters = () => {
      const orderedList = characters.sort((a, b) => a.name.localeCompare(b.name));
      updateCharacters(orderedList);
    };
    
    const contextDefaultValue = {
    characters,
    loading,
    charactersDeleted,
    updateCharacters,
    resetList,
    addNewCharacter,
    deleteCharacter,
    deleteAll,
    undoDeleteCharacter,
    sortCharacters,
  };
  return contextDefaultValue;
};

export default useMyContext;
