import * as React from 'react';
import { getPokemon } from "./api/getPokemon";
import {useEffect} from "react";
const initUrl: string = 'https://pokeapi.co/api/v2/pokemon/';


function App() {
  useEffect(() => {
    const pokemonStream$ = getPokemon(initUrl);

    const pokemonSubscriber$ = pokemonStream$.subscribe(console.log);

    return () => {
      pokemonSubscriber$.unsubscribe();
    }
  }, [])

  return (
    <div>
      eggs
    </div>
  );
}

export default App;
