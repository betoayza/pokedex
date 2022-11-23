import React, { useRef, useState } from "react";
import { Modal } from "./Modal";
import axios from "axios";
import { Pokemon } from "./Pokemon";

export const Pokedex = () => {
  const [pokemon, setPokemon] = useState("");
  const [modal, setModal] = useState(false);
  const [imageUser, setImageUser] = useState(null);
  const [found, setFound] = useState(false);
  const [form, setForm] = useState("");

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
          setFound(true);
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

  const handleClose = () => {};

  return modal ? (
    <Modal></Modal>
  ) : (
    <div className={"w-auto"} style={{ display: "grid", placeItems: "center" }}>
      <div
        className="card p-1 border border-dark border-2"
        id={"pokedex"}
        style={{ width: "auto", height: "auto" }}
      >
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
          <button
            className={"btn btn-dark"}
            onClick={() => refUserImage.current.click()}
          >
            Upload
          </button>
        </div>

        <div className="card-body">
          <h5 className="card-title">{""}</h5>
        </div>
        <div className="card-body">
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
            >
              Go!
            </button>
          </form>
          <p className="card-text">{""}</p>
          <a href="#" className="card-link">
            My Profile
          </a>
          <a href="#" className="card-link">
            Another link
          </a>
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
            <Pokemon pokemon={pokemon} />
          </div>
        )}
      </div>
    </div>
  );
};
