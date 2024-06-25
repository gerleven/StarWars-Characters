import { CharactersApiResponse } from '../lib/definitions';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const fetchCharacters = async (q: string | null = '', pageNumber: number | undefined): Promise<CharactersApiResponse> => {
  const params = new URLSearchParams();
  q && params.append('search', q);
  pageNumber && params.append('page', pageNumber.toString());

  const urlParams = params.toString();
  const url = `${baseUrl}/people/${urlParams != '' ? `?${urlParams}` : ''}`;
  try {
    const response = await fetch(url);
    const fetchedCharacters: CharactersApiResponse = await response.json();
    return fetchedCharacters;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};

export const starwarsService = { fetchCharacters };
