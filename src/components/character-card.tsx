import { Box, Stack, Typography } from "@mui/material";
import { Character } from "../interfaces/global-interfaces";

export default function CharacterCard({ character }: { character: Character }) {
  return (
    <>
      <Box>
        <Stack>
          <Typography>Name: {character.name}</Typography>
          <Typography>Height: {character.height} cm</Typography>
        </Stack>
      </Box>
    </>
  );
}
