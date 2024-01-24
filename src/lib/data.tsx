import { Character, CharactersApiResponse } from "./definitions";

export async function fetchCharacters(): Promise<Character[]> {
  const url = "https://swapi.dev/api/people";

  try {
    const response = await fetch(url);
    const fetchedCharacters: CharactersApiResponse = await response.json();
    return fetchedCharacters.results;
  } catch (error: any) {
      throw new Error(error);
    
  }
}
