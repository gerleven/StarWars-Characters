import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";
import { useContext, useEffect, useState } from "react";
import { Character, IMyContext } from "../lib/definitions.tsx";
import { Stack } from "@mui/material";
import { MyContext } from "./root-page.tsx";
import { SkeletonLoader } from "../components/character-card.tsx";

const HomePage = () => {
  const [filteredCharactersList, setFilteredCharactersList] = useState<
    Character[]
  >([] as Character[]);
  const [inputSearch, setInputSearch] = useState<string>("");

  const { characters, loading, updateCharacters, resetList }: IMyContext =
    useContext(MyContext);

  useEffect(() => {
    //Check for characters in the Local Storage
    const charactersInit: Character[] = JSON.parse(
      localStorage.getItem("characters") || "[]"
    ) as Character[];

    //In case there is no local storage, call the API.
    if (charactersInit.length == 0) {
      resetList();
    } else {
      updateCharacters(charactersInit);
    }
  }, []);

  //Keep the filtered list of characters in sync when searching or deleting any characters
  useEffect(() => {
    const newFilteredList = characters.filter((character: Character) =>
      character.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setFilteredCharactersList(newFilteredList);
  }, [inputSearch, characters]);

  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        className={"overFlowYScroll"}
        sx={{ height: "80vh" }}
      >
        <SearchBar inputSearch={inputSearch} setInputSearch={setInputSearch} />
        {loading ? (
          <>
            <SkeletonLoader />
          </>
        ) : (
          <SearchResult
            inputSearch={inputSearch}
            filteredCharactersList={filteredCharactersList}
          />
        )}
      </Stack>
    </>
  );
};

export default HomePage;
