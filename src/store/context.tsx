import React, { createContext, FC } from "react";
import { Pokemon } from "./observables";
import { pokemonData$ } from "./observables";
import { useObservableState } from "observable-hooks";

export const pokemonContext = createContext<Pokemon[]>([]);

export const PokemonCtxProvider: FC<{}> = ({ children }) => {

  let pokemon = useObservableState(pokemonData$, []);

  return (
    <pokemonContext.Provider value={ pokemon }>
      { children }
    </pokemonContext.Provider>
  )
}

