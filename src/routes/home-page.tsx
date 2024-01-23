import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";
import { useEffect, useState } from "react";
import { Character } from "../lib/definitions.tsx";
import { fetchCharacters } from "../lib/data.tsx";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import theme from "../theme/custom-theme.tsx";

const HomePage = () => {
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
  }, [inputSearch]);

  const callApi = () => {
    fetchCharacters().then((characterResults) => {
      setCharacters(characterResults);
      localStorage.setItem("characters", JSON.stringify(characterResults));
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
        sx={{ flexGrow: 1 }}
      >
        <SearchBar setInputSearch={setInputSearch} />
        {characters.length == 0 ? (
          <NoItemsToShow callApi={callApi} />
        ) : (
            <SearchResult
              characters={inputSearch.length==0?characters:filteredCharactersList}
              deleteCharacter={deleteCharacter}
              callApi={callApi}
            />
        )}
      </Stack>
    </>
  );
};

export default HomePage;

const NoItemsToShow = ({ callApi }: any) => {
  return (
    <>
      <Paper elevation={3}>
        <Box>
          <Stack padding={2} spacing={1}>
            <Typography fontSize={20} fontWeight={500}>
              No Items to show
            </Typography>
            <Typography fontWeight={300} color={theme.palette.grey[600]}>
              Try to create a new Character or call API again
            </Typography>
            <CustomButtonPrimary onClick={callApi}>
              Call API
            </CustomButtonPrimary>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
