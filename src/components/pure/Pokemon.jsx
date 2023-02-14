import React, { useCallback, useEffect } from "react";
import Say from "react-say";

export const Pokemon = ({ pokemon, isSpeaking, setIsSpeaking }) => {
  const selector = useCallback(
    (voices) => [...voices].find((v) => v.lang === "es-ES"),
    []
  ); // en-US

  let timeID;

  const narration = (
    <Say
      text={`${pokemon.name}.  \nAltura: ${
        (pokemon.height * 0.1).toFixed(2)
      } metros. \nPeso: ${
        (pokemon.weight * 0.1).toFixed(2)
      } kilogramos. \nHabilidades. ${pokemon.abilities.map((ability, index) => {
        return `\n${index + 1}) ${ability.ability.name}\n.`;
      })}. \nMovimientos principales. ${pokemon.moves.map((move, index) => {
        //console.log(index);
        if (index < 3) {
          return `\n${index + 1}) ${move.move.name}\n.`;
        }
      })}`}
      rate={1.2} // velocidad
      pitch={0.8} // tono
      voice={selector}
      volume={0.9}
    />
  );

  useEffect(() => {
    setIsSpeaking(false);
  }, []);

  return (
    pokemon && (
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
        {
          (timeID =
            setTimeout(() => {
              setIsSpeaking(true);
            }, 2000) && clearTimeout(timeID))
        }
        {isSpeaking && narration}
      </div>
    )
  );
};
