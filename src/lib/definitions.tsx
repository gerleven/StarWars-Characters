export interface IError {
  statusText: string;
  message: string;
}

export interface CharactersApiResponse {
  count: number;
  next: string;
  previous: string;
  results: Character[];
}

export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IMyContext {
  characters: Character[];
  loading: boolean;
  charactersDeleted: Character[];
  updateCharacters: (characters: Character[]) => void;
  resetList: () => void;
  searchCharacter: (q: string) => void;
  charactersSearchResult: Character[];
  addNewCharacter: (characters: Character) => void;
  deleteCharacter: (characters: Character) => void;
  deleteAll: () => void;
  undoDeleteCharacter: () => void;
  sortCharacters: () => void;
  clearSearchCharactersList: () => void;
  searchRandomCharacter: ()=> void;
}
