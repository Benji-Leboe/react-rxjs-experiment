import { BehaviorSubject,  map } from "rxjs";
import { fetchNextForPokemonSubject } from "../api/getPokemon";

const initUrl = 'https://pokeapi.co/api/v2/pokemon/';

interface Sprites {
  back_default: string;
  back_default_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_default_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

export interface Pokemon {
  "abilities": object[];
  "base_experience": number;
  "forms": object[];
  "game_indices": object[];
  "height": number;
  "held_items": object[];
  "id": number;
  "is_default": boolean;
  "location_area_encounters": string;
  "moves": object[];
  "name": string;
  "order": number;
  "past_types": any[];
  "species": object;
  "sprites": Sprites;
  "stats": object[];
  "types": object[];
  "weight": number;
}


const pokemonSubject$ = new BehaviorSubject<Pokemon[]>([]);

const initPokemonObservable = (url?: string | undefined) => {
  //begins recursive fetch of all pokemon data
  fetchNextForPokemonSubject(url ? url : initUrl, pokemonSubject$);

  return pokemonSubject$;
}

const rawPokemonData$ = initPokemonObservable();

export const pokemonData$ = rawPokemonData$.pipe(
  map((pokemon) => pokemon.map(p => p))
)

export const selectionSubject$ = new BehaviorSubject<string[]>([]);

//const selectedPokemon$ = pokemonData$.pipe(
//  combineLatestWith(selectionSubject$),
//  map(([pokemon, selected]) => pokemon.map(p => selected.includes(p.name)))
//)