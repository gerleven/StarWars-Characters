import { Stack } from "@mui/material";
import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";
import { useEffect, useState } from "react";
import { Character } from "../lib/definitions.tsx";
import { getFakeData } from "../lib/placeholder-data.tsx";


const HomePage = () => {
  const fakeData: Character[] = getFakeData();
  const [characters, setCharacters] = useState<Character[]>(
    fakeData as Character[]
  );
  const [inputSearch, setInputSearch] = useState<string>("");

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
        {/* <p>input search: {inputSearch}</p> */}
        <SearchResult characters={characters} />
      </Stack>
    </>
  );
};

export default HomePage;
