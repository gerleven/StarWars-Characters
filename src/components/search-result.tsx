import { Box, Paper, Stack, Typography } from "@mui/material";
import { Character } from "../lib/definitions.tsx";
import CharacterCard from "./character-card";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import theme from "../theme/custom-theme.tsx";
import { useContext } from "react";
import { MyContext } from "../routes/root-page.tsx";

export default function SearchResult({
  callApi,
  loading,
  inputSearch,
  filteredCharactersList
}: {
  callApi: any;
  loading: boolean;
  inputSearch:string;
  filteredCharactersList: Character[]
}) {
  const { updateCharacters, deleteCharacter, characters }: any = useContext(MyContext);
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        padding={1}
        className={"overFlowYScroll"}
        sx={{height: "80vh"}}
      >
        {((characters.length == 0) && (!loading))&&<NoItemsToShow callApi={callApi} />}
        {(inputSearch.length == 0 ? characters : filteredCharactersList).map((character: Character, index: number) => {
          return (
            <CharacterCard
              key={index}
              character={character}
              deleteCharacter={deleteCharacter}
            />
          );
        })}
      </Stack>
    </>
  );
}

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
              Try to create a new Character or call API again.
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
