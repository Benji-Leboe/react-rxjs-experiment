import React, { useEffect } from 'react';
import { pokemonData$ } from "./store/observables";



function App() {
  useEffect(() => {

    let subscriber = pokemonData$.subscribe();

    return () => {
      subscriber.unsubscribe();
    }

  }, [])

  return (
    <div>
      eggs
    </div>
  );
}

export default App;
