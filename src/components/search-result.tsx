import { Stack } from "@mui/material";
import { Character } from "../lib/definitions.tsx";
import CharacterCard from "./character-card";

export default function SearchResult({ characters }: any) {
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
        {characters.map((character: Character, index: number) => {
          return <CharacterCard key={index} character={character} />;
        })}
      </Stack>
    </>
  );
}
