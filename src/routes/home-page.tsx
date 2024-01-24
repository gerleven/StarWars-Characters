import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";
import { useContext, useEffect, useState } from "react";
import { Character } from "../lib/definitions.tsx";
import { fetchCharacters } from "../lib/data.tsx";
import { Card, Paper, Stack } from "@mui/material";
import ContentLoader from "react-content-loader";
import { MyContext } from "./root-page.tsx";
import { SkeletonLoader } from "../components/character-card.tsx";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [filteredCharactersList, setFilteredCharactersList] = useState<
    Character[]
  >([] as Character[]);
  const [inputSearch, setInputSearch] = useState<string>("");

  const { characters, updateCharacters, deleteCharacter }: any =
    useContext(MyContext);

  useEffect(() => {
    //Check for characters in the Local Storage
    const charactersInit: Character[] = JSON.parse(
      localStorage.getItem("characters") || "[]"
    ) as Character[];

    //In case there is no local storage, call the API.
    if (charactersInit.length == 0) {
      callApi();
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

  const callApi = () => {
    setLoading(true);
    fetchCharacters().then((characterResults) => {
      updateCharacters(characterResults);
      localStorage.setItem("characters", JSON.stringify(characterResults));
      setLoading(false);
    });
  };

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
        <SearchBar setInputSearch={setInputSearch} />
        {/* <CustomButtonPrimary onClick={turnTest}>Test</CustomButtonPrimary> */}
        {loading ? (
          <>
            <SkeletonLoader />
          </>
        ) : (
          <SearchResult
            callApi={callApi}
            loading={loading}
            inputSearch={inputSearch}
            filteredCharactersList={filteredCharactersList}
          />
        )}
      </Stack>
    </>
  );
};

export default HomePage;
