import React, { useState } from 'react';
import './Search.css';
import { Pokemon } from './App';
import { useNavigate } from 'react-router-dom';

interface SearchProps {
  pokemonList: Pokemon[];
}

const Search: React.FC<SearchProps> = ({ pokemonList }) => {
  const [query, setQuery] = useState<string>('');
  const [sortProperty, setSortProperty] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<string>('ascending');
  const navigate = useNavigate();

  const filteredPokemonList = pokemonList
    .filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => {
      const orderMultiplier = sortOrder === 'ascending' ? 1 : -1;
      if (sortProperty === 'name') {
        return orderMultiplier * a.name.localeCompare(b.name);
      } else if (sortProperty === 'height') {
        return orderMultiplier * (a.height - b.height);
      } else if (sortProperty === 'weight') {
        return orderMultiplier * (a.weight - b.weight);
      }
      return 0;
    });

  const handleCardClick = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.name}`, { state: { pokemon, filteredList: filteredPokemonList } });
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search by name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="sort-container">
          <span className="sort-title">Sort by:</span>
          <div className="sort-options">
            <button
              className={`sort-button ${sortProperty === 'name' ? 'active' : ''}`}
              onClick={() => setSortProperty('name')}
            >
              Name
            </button>
            <button
              className={`sort-button ${sortProperty === 'height' ? 'active' : ''}`}
              onClick={() => setSortProperty('height')}
            >
              Height
            </button>
            <button
              className={`sort-button ${sortProperty === 'weight' ? 'active' : ''}`}
              onClick={() => setSortProperty('weight')}
            >
              Weight
            </button>
          </div>
          <div className="order-options">
            <label className="radio-label">
              <input
                type="radio"
                value="ascending"
                checked={sortOrder === 'ascending'}
                onChange={() => setSortOrder('ascending')}
              />
              Ascending
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="descending"
                checked={sortOrder === 'descending'}
                onChange={() => setSortOrder('descending')}
              />
              Descending
            </label>
          </div>
        </div>
      </div>
      <div className="container">
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
    </>
  );
};

export default Search;