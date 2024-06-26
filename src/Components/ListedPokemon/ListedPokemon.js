import "./ListedPokemon.css";

import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

const ListedPokemon = ({ pokemonName }) => {
  const [listedPokemon, setListedPokemon] = useState();

  const getPokemon = useCallback(async () => {
    let general = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .catch((error) => {
        console.error(error);
      });
    let specie = await axios.get(general.data.species.url).catch((error) => {
      console.error(error);
    });
    general.data.color = specie.data.color;
    setListedPokemon(general.data);
  }, [pokemonName]);

  useEffect(() => {
    getPokemon();
  }, [getPokemon]);

  if (!listedPokemon) {
    return <Loading />;
  }

  return (
    <div
      className="pokemonContainer"
      style={{
        backgroundColor: `${listedPokemon.color.name}`,
      }}
    >
      <div
        className="pokemonContainer"
        style={{
          backdropFilter: "hue-rotate(340deg) contrast(0.5)",
        }}
      >
        <div className="pokemonNumber">
          <h2>
            #{listedPokemon.id < 10 ? `0${listedPokemon.id}` : listedPokemon.id}
          </h2>
        </div>

        <Link to={`/pokedex/${listedPokemon.id}`}>
          <div className="pokemonImage">
            <img
              src={
                listedPokemon.sprites.other["official-artwork"].front_default
              }
              alt={listedPokemon.name}
            />
          </div>
        </Link>
        <div className="pokemonInfo">
          <h3>{listedPokemon.name.toUpperCase()}</h3>
          <p>Altura: {listedPokemon.height * 10} cm</p>
          <p>Peso: {listedPokemon.weight / 10} kg</p>
          <Link to={`/pokedex/${listedPokemon.id}`}>
            <button
              className="buttonListedPokemon"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Ver Mais
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListedPokemon;
