import { Character, CharactersApiResponse } from '../lib/definitions';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getCharactersPaginated = async (pageNumber: number = 1): Promise<Character[]> => {
  try {
    const response = await fetch(`${baseUrl}/people/?page=${pageNumber}`);
    const fetchedCharacters: CharactersApiResponse = await response.json();
    return fetchedCharacters.results;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};

const searchCharacter = async (q: string): Promise<Character[]> => {
  try {
    const response = await fetch(`${baseUrl}/people/?search=${q}`);
    const fetchedCharacters: CharactersApiResponse = await response.json();
    return fetchedCharacters.results;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const starwarsService = { getCharactersPaginated, searchCharacter };
