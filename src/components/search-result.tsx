import { Character } from "../interfaces/global-interfaces";
import CharacterCard from "./character-card";

export default function SearchResult({ characters }: any) {
  return (
    <>
      {characters.map((character: Character, index: number) => {
        return <CharacterCard key={index} character={character} />;
      })}
    </>
  );
}
