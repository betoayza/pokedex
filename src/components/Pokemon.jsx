import React, { useCallback } from "react";
import Say from "react-say";

export const Pokemon = ({ pokemon }) => {
  const selector = useCallback(
    (voices) => [...voices].find((v) => v.lang === "en-US"),
    []
  );

  return (
    <div>
      <div
        className={"h-auto p-3 rounded"}
        style={{
          width: "100%",
          height: "auto",
          backgroundColor: "#bffef8",
          display: "grid",
          placeItems: "center",
        }}
      >
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          className="card-img-top img-fluid"
          alt=""
          style={{ maxHeight: "200px", maxWidth: "200px" }}
        />
      </div>
      <Say
        text={`${pokemon.name}.  \nHeight: ${pokemon.height}. \nWeight: ${
          pokemon.weight
        }. \nAbilities. ${pokemon.abilities.map((ability, index) => {
          return `\n${index + 1}) ${ability.ability.name}\n`;
        })}. \nMain moves. ${pokemon.moves.map((move, index) => {
          //console.log(index);
          if (index < 3) return `\n${index + 1}) ${move.move.name}\n`;
        })}`}
        rate={1}
        pitch={0.5}
        voice={selector}
        // "en-US"
      />
    </div>
  );
};
