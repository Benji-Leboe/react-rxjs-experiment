import * as React from 'react';
import { getPokemon } from "./api/getPokemon";
const initUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

function App() {
  getPokemon(initUrl);

  return (
    <div>
      eggs
    </div>
  );
}

export default App;
