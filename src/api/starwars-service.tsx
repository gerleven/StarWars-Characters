import { Character, CharactersApiResponse } from "../lib/definitions";

const baseUrl = "https://swapi.dev/api";

const getCharactersPaginated = async (pageNumber: number = 1): Promise<Character[]> => {
  try {
    const response = await fetch(`${baseUrl}/people/?page=${pageNumber}`);
    const fetchedCharacters: CharactersApiResponse = await response.json();
    return fetchedCharacters.results;
  } catch (error: any) {
      throw new Error(error);
  }
};

const searchCharacter = async (q: string): Promise<Character[]> => {
    try {
        const response = await fetch(`${baseUrl}/people/?search=${q}`);
        const fetchedCharacters: CharactersApiResponse = await response.json();
        return fetchedCharacters.results;
      } catch (error: any) {
          throw new Error(error);
      }
};

export const starwarsService = { getCharactersPaginated, searchCharacter };
