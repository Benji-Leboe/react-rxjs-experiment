import React, { useEffect } from 'react';
import { pokemonData$ } from "./store/observables";
import { useObservableState } from "observable-hooks";



function App() {
  let pokemon = useObservableState(pokemonData$, []);

  return (
    <div>
      { pokemon.map(p => (
        <div key={ p.name }>
          { p.name }
          <img alt={ p.name } src={ `${p.sprites.front_default}` } />
        </div>)) }
    </div>
  );
}

export default App;
