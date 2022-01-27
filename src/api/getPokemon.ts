import { Pokemon } from "../store/observables";
import { BehaviorSubject } from "rxjs";

export const fetchNextForPokemonSubject = (url: string, observable$: BehaviorSubject<Pokemon[]> ) => {

  fetch(url)
    .then(res => res.json())
    .then(data => {
      //each segment of 20 runs fetch on individual pokemon

      for (let result of data.results) {
        fetch(result.url)
          .then(res => res.json())
          .then(pokemonData => {
            observable$.next([...observable$.value, pokemonData]);
          })
      }

      if (data.next) {
        fetchNextForPokemonSubject(data.next, observable$);
      }
    })
}