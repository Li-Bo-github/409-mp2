import './App.css';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Search from './Search';
import Gallery from './Gallery';
import PokemonDetails from './PokemonDetails';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export interface Pokemon {
  name: string;
  url: string;
  image: string;
  abilities: string[];
  height: number;
  weight: number;
  types: string[];
}

const App = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=200&offset=0');
        const { results } = response.data;

        const fetchDetails = async (url: string) => {
          const detailResponse = await axios.get(url);
          return {
            abilities: detailResponse.data.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
            height: detailResponse.data.height,
            weight: detailResponse.data.weight,
            types: detailResponse.data.types.map((type: { type: { name: string } }) => type.type.name),
          };
        };

        const formattedList = await Promise.all(
          results.map(async (result: { name: string; url: string }, index: number) => {
            const paddedIndex = ('00' + (index + 1)).slice(-3);
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
            const { abilities, height, weight, types } = await fetchDetails(result.url);
            return { ...result, image, abilities, height, weight, types };
          })
        );

        setPokemonList(formattedList);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>Pokemon Database</p>

          <div className="button-container">
            <Link to="/search" className="text-button">
              Search
            </Link>
            <Link to="/gallery" className="text-button">
              Gallery
            </Link>
          </div>
        </header>

        <Routes>
          <Route path="/search" element={<Search pokemonList={pokemonList} />} />
          <Route path="/gallery" element={<Gallery pokemonList={pokemonList} />} />
          <Route path="/pokemon/:name" element={<PokemonDetails pokemonList={pokemonList} />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;
