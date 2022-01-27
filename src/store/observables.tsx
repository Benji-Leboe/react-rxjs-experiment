import { BehaviorSubject } from "rxjs";
import { fetchNextForPokemonSubject } from "../api/getPokemon";
const initUrl = 'https://pokeapi.co/api/v2/pokemon/';

export type PokemonSubject = BehaviorSubject<[any]>

const pokemonSubject$ = new BehaviorSubject<PokemonSubject[]>([]);

const initPokemonObservable = (url?: string | undefined) => {

  fetchNextForPokemonSubject(url ? url : initUrl, pokemonSubject$);

  return pokemonSubject$;
}

export const pokemonData$ = initPokemonObservable();
