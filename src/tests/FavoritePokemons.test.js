import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('testa se os pokemons favoritos estão aparecendo corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/favorites');
  const noFavorites = screen.getByText(/No favorite pokemon found/i);
  expect(noFavorites).toBeInTheDocument();
  history.push('/pokemons/25');
  const inputFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
  userEvent.click(inputFavorite);
  history.push('/pokemons/4');
  userEvent.click(inputFavorite);
  history.push('/favorites');
  const pokemonName = screen.getAllByTestId('pokemon-name');
  const pokemonType = screen.getAllByTestId('pokemon-type');
  expect(pokemonName[0].innerHTML).toBe('Pikachu');
  expect(pokemonType[0].innerHTML).toBe('Electric');
  expect(pokemonName[1].innerHTML).toBe('Charmander');
  expect(pokemonType[1].innerHTML).toBe('Fire');
});
