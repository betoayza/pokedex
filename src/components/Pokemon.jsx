import React from "react";

export const Pokemon = ({ pokemon }) => {
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
    </div>
  );
};
