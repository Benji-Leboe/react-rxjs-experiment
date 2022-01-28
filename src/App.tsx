import * as React from 'react';
import { PokemonCtxProvider } from './store/context';



function App() {

  return (
    <PokemonCtxProvider>
      <div>
      </div>
    </PokemonCtxProvider>
  );
}

export default App;
