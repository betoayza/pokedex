import React, { useRef, useState } from "react";
import { Modal } from "../pure/Modal";
import axios from "axios";
import { Pokemon } from "../pure/Pokemon";
import audioPressBoton from "../../audio/apretar-boton.mp3";
import audioPokemonFound from "../../audio/found-pokemon.mp3";

export const Pokedex = () => {
  const [pokemon, setPokemon] = useState("");
  const [modal, setModal] = useState(false);
  const [imageUser, setImageUser] = useState(null);
  const [found, setFound] = useState(false);
  const [form, setForm] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  let refUserImage = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFound(false);

    const options = {
      headers: {
        // "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*",
        Accept: "application/json",
      },
      timeout: 3000,
    };

    await axios
      .request(
        `https://pokeapi.co/api/v2/pokemon/${form.toLowerCase()}`,
        options
      )
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          const audioFound = new Audio(audioPokemonFound);
          setFound(true);
          audioFound.play();
          setPokemon(res.data);
        }
      })
      .catch((error) => error);
    handleClean();
  };

  const handleChange = (e) => {
    setForm(e.target.value);
  };

  const handleChangeUserImage = (e) => {
    console.log(refUserImage);

    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = (readerEvent) => {
      if (file.type.includes("image")) {
        setImageUser(readerEvent.target.result);
      }
    };
  };

  const handleClean = () => {
    setForm("");
  };

  const handleClick = () => {
    const audio = new Audio(audioPressBoton);
    audio.play();
    // audio.pause()
  };

  return modal ? (
    <Modal></Modal>
  ) : (
    <div
      className={"border"}
      style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
    >
      <div
        className="card p-1 border border-dark border-5"
        id={"pokedex"}
        style={{ width: "auto", height: "auto" }}
      >
        <div
          className={
            "h-auto p-3 border border-dark border-2 rounded text-center"
          }
          style={{
            width: "100%",
            height: "auto",
            backgroundColor: "#bffef8",
            display: "grid",
            placeItems: "center",
          }}
        >
          <img
            src={imageUser}
            className="card-img-top img-fluid border border-dark border-2 rounded"
            alt="SET YOUR PHOTO"
            style={{
              maxHeight: "200px",
              maxWidth: "200px",
              fontWeight: "bold",
            }}
          />
        </div>

        <div
          className={"mt-1"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <input
            type="file"
            ref={refUserImage}
            className={"btn btn-dark"}
            onChange={(e) => handleChangeUserImage(e)}
            hidden
          />

          <button className={"btn"}>
            <i
              className="bi-aspect-ratio-fill"
              style={{ fontSize: "20px" }}
              onClick={handleClick}
            ></i>
          </button>

          <button
            className={"btn btn-dark"}
            onClick={() => {
              refUserImage.current.click();
              handleClick();
            }}
            style={{ fontFamily: "monospace" }}
          >
            Upload
          </button>

          <button className={"btn"}>
            <i
              className="bi-aspect-ratio-fill"
              style={{ fontSize: "20px" }}
              onClick={handleClick}
            ></i>
          </button>
        </div>

        <div className="" style={{ display: "grid", placeItems: "center" }}>
          <button className={"btn"} onClick={handleClick}>
            <i className="bi-circle-fill"></i>
          </button>
          <form
            onSubmit={handleSubmit}
            style={{ display: "grid", placeItems: "center" }}
          >
            <input
              type="text"
              onChange={handleChange}
              className={"form-control border border-dark border-2"}
              placeholder={"Search..."}
              style={{
                fontFamily: "monospace",
                backgroundColor: "black",
                color: "white",
                textTransform: "uppercase",
              }}
              value={form}
              required
            />
            <button
              type="submit"
              className={"btn btn-primary mt-2 border border-dark border-2"}
              style={{ fontFamily: "monospace" }}
              onClick={handleClick}
            >
              Go!
            </button>
          </form>
          <p className="card-text">{""}</p>

          <button
            className={"btn btn-light border border-dark border-2 mb-2"}
            style={{
              fontFamily: "monospace",
              fontSize: "10px",
              fontWeight: "bold",
            }}
            onClick={handleClick}
          >
            My Profile
          </button>
        </div>

        {found && (
          <div
            className={"h-auto p-3 border border-dark border-2 rounded"}
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "#bffef8",
              display: "grid",
              placeItems: "center",
            }}
          >
            <Pokemon
              pokemon={pokemon}
              isSpeaking={isSpeaking}
              setIsSpeaking={setIsSpeaking}
            />
          </div>
        )}
      </div>
    </div>
  );
};
