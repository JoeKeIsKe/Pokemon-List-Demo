export interface Type {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
  imgUrl?: string;
}

export interface RawPokemon {
  pokemon: Pokemon;
  slot: number;
}