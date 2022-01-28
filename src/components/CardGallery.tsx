import React, { useContext, FC } from "react";
import { pokemonContext } from "../store/context";

export const CardGallery: FC<{}> = () => {
  const pokemon = useContext(pokemonContext);

  return (
    <div>
      {pokemon.map(p => (
        <div>
          <img src={ p.sprites.front_default } alt={ p.name }/>
          <h1>{ p.name }</h1>
        </div>
      ))}
    </div>
  )
}