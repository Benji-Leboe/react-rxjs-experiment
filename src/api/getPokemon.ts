import { Pokemon } from "../store/observables";
import { BehaviorSubject, EMPTY, from, map, merge, mergeMap, Observable, Observer, range, scan, skip, zipWith } from "rxjs";


function fetch$<T>(input: RequestInfo, init: RequestInit = {}):Observable<T>{
  return new Observable<T>((observer:Observer<T>) => {
    const controller = new AbortController();
    fetch(input, {...init, signal: controller.signal}).then(res => res.json() as Promise<T>).then(
      (val) => {
        observer.next(val);
        observer.complete();
      },
      (err) => {
        observer.error(err);
      }
    );
    return () => { controller.abort(); };
  })
}
export const singlePokemon$ = (url:string):Observable<Pokemon> => {
  return fetch$<Pokemon>(url);
}
export const gottaCatchEmAll$ = (url:string):Observable<Pokemon[]> => {
  const recurse$ = (url:string, offset:number = 0):Observable<[number, Pokemon]> => {
    return fetch$<{results:{url:string}[], next?:string}>(url).pipe(
      mergeMap((data) => {
        const pokemonFromResult$ = from(data.results).pipe(
          zipWith(range(offset)),
          mergeMap(([result, index]) => fetch$<Pokemon>(result.url).pipe(map(pokemon => [index, pokemon] as [number, Pokemon])))
        );
        const pokemonFromNextOrMaybeNot$ = data.next ? recurse$(data.next, offset + data.results.length) : EMPTY;
        return merge(
          pokemonFromResult$,
          pokemonFromNextOrMaybeNot$
        )
      })
    )
  }
  return recurse$(url).pipe(
    scan((acc:[number, Pokemon][], item:[number, Pokemon]) => {
      const [index] = item;
      const insertIndex = acc.findIndex(([i]) => i > index);
      return [...acc.slice(0, insertIndex), item, ...acc.slice(insertIndex)];
    }, [] as [number, Pokemon][]),
    map((items) => items.map(([,pokemon]) => pokemon))
  )
}

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