export interface IError {
  statusText: any;
  message: any;
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
  resetList: () => void;
  deleteAll: () => void;
  updateCharacters: (characters: Character[]) => void;
  addNewCharacter: (characters: Character) => void;
  deleteCharacter: (characters: Character) => void;
  undoDeleteCharacter: () => void;
  sortCharacters: ()=> void;
  
}
