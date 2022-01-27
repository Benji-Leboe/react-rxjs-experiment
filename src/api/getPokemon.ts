import { PokemonSubject } from "../store/observables";
import { BehaviorSubject } from "rxjs";

export const fetchNextForPokemonSubject = (url: string, observable$: BehaviorSubject<PokemonSubject[]> ) => {

  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      observable$.next([...observable$.getValue(), ...data.results]);

      if (data.next) {
        fetchNextForPokemonSubject(data.next, observable$);
      }
    })
}