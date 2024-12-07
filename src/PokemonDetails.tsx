import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Pokemon } from './App';
import './PokemonDetails.css';

interface PokemonDetailsProps {
  pokemonList: Pokemon[];
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemonList }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  const pokemon = location.state?.pokemon;
  const filteredList: Pokemon[] = location.state?.filteredList || pokemonList;

  const pokemonFromList = pokemonList.find((p: Pokemon) => p.name === name);

  if (!pokemon && !pokemonFromList) {
    return <div className="text-center">Pokémon not found.</div>;
  }

  const currentPokemon = pokemon || pokemonFromList;
  const currentIndex = filteredList.findIndex((p: Pokemon) => p.name === currentPokemon?.name);
  const prevPokemon = currentIndex > 0 ? filteredList[currentIndex - 1] : null;
  const nextPokemon = currentIndex < filteredList.length - 1 ? filteredList[currentIndex + 1] : null;

  return (
    <div className="pokemon-details">
      <h2>{currentPokemon?.name}</h2>
      <img src={currentPokemon?.image} alt={currentPokemon?.name} className="pokemon-image" />
      <p><strong>Height:</strong> {currentPokemon?.height} decimetres</p>
      <p><strong>Weight:</strong> {currentPokemon?.weight} hectograms</p>
      <p><strong>Abilities:</strong> {currentPokemon?.abilities.join(', ')}</p>
      <p><strong>Types:</strong> {currentPokemon?.types.join(', ')}</p>
      <div className="navigation-buttons">
        {prevPokemon && (
          <button className="nav-button" onClick={() => navigate(`/pokemon/${prevPokemon.name}`, { state: { pokemon: prevPokemon, filteredList } })}>
            Previous
          </button>
        )}
        {nextPokemon && (
          <button className="nav-button" onClick={() => navigate(`/pokemon/${nextPokemon.name}`, { state: { pokemon: nextPokemon, filteredList } })}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonDetails;