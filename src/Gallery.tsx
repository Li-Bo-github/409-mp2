import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Gallery.css';
import { Pokemon } from './App';

interface GalleryProps {
  pokemonList: Pokemon[];
}

const Gallery: React.FC<GalleryProps> = ({ pokemonList }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prevTypes =>
      prevTypes.includes(type)
        ? prevTypes.filter(t => t !== type)
        : [...prevTypes, type]
    );
  };

  const handleAllTypes = () => {
    setSelectedTypes([]);
  };

  const sortedPokemonList = [...pokemonList].sort((a, b) => {
    return a.name.localeCompare(b.name)
  });

  const filteredPokemonList = sortedPokemonList.filter(pokemon =>
    selectedTypes.length === 0 || pokemon.types.some(type => selectedTypes.includes(type))
  );

  const handleCardClick = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.name}`, { state: { pokemon, filteredList: filteredPokemonList } });
  };

  return (
    <div className="container">
      <div className="filter-container">
        <button
          className={`filter-button all-types-button`}
          onClick={handleAllTypes}
        >
          All Types
        </button>
        {['grass', 'fire', 'water', 'normal', 'flying', 'bug', 'poison', 'electric', 'ground', 'fighting', 'psychic', 'rock', 'ice', 'ghost', 'dragon', 'dark', 'steel', 'fairy'].map(type => (
          <button
            key={type}
            className={`filter-button type-button ${selectedTypes.includes(type) ? 'active' : ''} ${type}`}
            onClick={() => handleTypeChange(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="pokemon-grid">
        {filteredPokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-card" onClick={() => handleCardClick(pokemon)}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
            />
            <p className="pokemon-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
