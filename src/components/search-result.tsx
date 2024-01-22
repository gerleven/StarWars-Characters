import { Box, Paper, Stack, Typography } from "@mui/material";
import { Character } from "../lib/definitions.tsx";
import CharacterCard from "./character-card";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import theme from "../theme/custom-theme.tsx";

export default function SearchResult({
  characters,
}: {
  characters: Character[];
}) {
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        padding={1}
        className={"overFlowYScroll"}
      >
        {characters.length == 0 && <NoItemsToShow />}
        {characters.length != 0 && <ListOfItems characters={characters} />}
      </Stack>
    </>
  );
}

const NoItemsToShow = () => {
  return (
    <>
      <Paper elevation={3}>
        <Box>
          <Stack padding={2} spacing={1}>
            <Typography fontSize={20} fontWeight={500} >No Items to show</Typography>
            <Typography fontWeight={300} color={theme.palette.grey[600]}>Try to create a new Character or call API again</Typography>
            <CustomButtonPrimary>Call API</CustomButtonPrimary>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

const ListOfItems = ({ characters }: { characters: Character[] }) => {
  return characters.map((character: Character, index: number) => {
    return <CharacterCard key={index} character={character} />;
  });
};
