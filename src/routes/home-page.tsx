import { Stack } from "@mui/material";
import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";
import { useEffect, useState } from "react";
import { Character } from "../lib/definitions.tsx";
import { fetchCharacters } from "../lib/data.tsx";

const HomePage = () => {
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [inputSearch, setInputSearch] = useState<string>("");

  useEffect(() => {
    const charactersInit: Character[] = JSON.parse(
      localStorage.getItem("characters") || "[]"
    ) as Character[];
    if (charactersInit.length == 0) {
      callApi();
    } else {
      setCharacters(charactersInit);
    }
  }, []);

  useEffect(() => {
    //Filter list
  }, [inputSearch]);

  const callApi =()=>{
    fetchCharacters().then((characterResults) => {
      setCharacters(characterResults);
      localStorage.setItem("characters", JSON.stringify(characterResults));
    });
  }
  
  const deleteCharacter = (character: Character) => {
    const filteredList = characters.filter((c) => c != character);
    setCharacters(filteredList);
    localStorage.setItem("characters", JSON.stringify(filteredList));
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        sx={{ flexGrow: 1 }}
      >
        <SearchBar setInputSearch={setInputSearch} />
        <SearchResult characters={characters} deleteCharacter={deleteCharacter} callApi={callApi}/>
      </Stack>
    </>
  );
};

export default HomePage;
