import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";
import { useEffect, useState } from "react";
import { Character } from "../lib/definitions.tsx";
import { fetchCharacters } from "../lib/data.tsx";
import { Card, Paper, Stack } from "@mui/material";
import ContentLoader from "react-content-loader";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [characters, setCharacters] = useState<Character[]>([] as Character[]);
  const [filteredCharactersList, setFilteredCharactersList] = useState<
    Character[]
  >([] as Character[]);
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
    const newFilteredList = characters.filter((character) =>
      character.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
    setFilteredCharactersList(newFilteredList);
  }, [inputSearch, characters]);

  const callApi = () => {
    setLoading(true);
    fetchCharacters().then((characterResults) => {
      setCharacters(characterResults);
      localStorage.setItem("characters", JSON.stringify(characterResults));
      setLoading(false);
    });
  };

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
        className={"overFlowYScroll"}
        sx={{height: "80vh"}}
      >
        <SearchBar setInputSearch={setInputSearch} />
        {loading ? (
          <>
            <SkeletonLoader />
          </>
        ) : (
          <SearchResult
            characters={
              inputSearch.length == 0 ? characters : filteredCharactersList
            }
            deleteCharacter={deleteCharacter}
            callApi={callApi}
          />
        )}
      </Stack>
    </>
  );
};

export default HomePage;

const SkeletonLoader = () => {
  const Skeleton =()=>(<Paper elevation={3}>
    <Card>
      <ContentLoader
        speed={2}
        width={"100%"}
        height={161}
        viewBox="0 0 452 161"
        backgroundColor="#e8e8e8"
        foregroundColor="#f4f4f4"
        style={{padding: 5}}
      >
        <rect x="0" y="20" rx="9" ry="9" width="240" height="40" />
        <rect x="0" y="70" rx="5" ry="5" width="150" height="20" />
        <rect x="0" y="100" rx="5" ry="5" width="150" height="20" />
        <rect x="0" y="130" rx="5" ry="5" width="150" height="20" />
        <rect x="350" y="65" rx="9" ry="9" width="72" height="36" />
      </ContentLoader>
    </Card>
  </Paper>);

  return <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={1}
    padding={1}
    className={"overFlowYScroll"}
  >
   <Skeleton/> 
   <Skeleton/> 
   <Skeleton/> 
   <Skeleton/> 
   <Skeleton/> 
  </Stack>
};
