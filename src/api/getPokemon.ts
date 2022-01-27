import {BehaviorSubject, concatMap, of} from "rxjs";

const rawData$ = new BehaviorSubject<any>([]);

export const getPokemon = (url: string) => {

  const concatData$ = rawData$.pipe(
    concatMap((data) => of(data)),
  )

  fetchNextForObservable(url, rawData$);

  return concatData$;
}


const fetchNextForObservable = (url: string, observable$: typeof rawData$) => {

  fetch(url)
    .then(res => {
      return res.json();
    })
    .then(data => {
      observable$.next([...observable$.getValue(), ...data.results]);

      if (data.next) {
        fetchNextForObservable(data.next, observable$);
      }
    })
}