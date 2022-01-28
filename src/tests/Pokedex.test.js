import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const LIMIT_FOR = 9;
const LIMIT_LENGTH = 7;
const NEXT_POKEMON = 'next-pokemon';
const POKEMON_TYPE = 'pokemon-type';

describe('verifica se a pokedex funciona corretamente', () => {
  it('testa se existe o texto Encountered Pokemons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(title).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon da lista', () => {
    renderWithRouter(<App />);
    const buttonProx = screen.getByTestId(NEXT_POKEMON);
    expect(buttonProx.textContent).toBe('Próximo pokémon'); // nn mostrando o primeiro
    for (let i; i < LIMIT_FOR; i += 1) {
      userEvent.click(buttonProx);
    }
    const pokemonName = screen.getAllByTestId('pokemon-name');
    expect(pokemonName[0].textContent).toBe('Pikachu');
    expect(pokemonName).toHaveLength(1);
  });

  it('Verifica se a pokedex tem os botoes de filtro e funcionam corretamente', () => {
    renderWithRouter(<App />);
    const botoesTipo = screen.getAllByTestId('pokemon-type-button');
    expect(botoesTipo).toHaveLength(LIMIT_LENGTH);
    userEvent.click(botoesTipo[1]);
    let pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe(botoesTipo[1].textContent);
    const buttonProx = screen.getByTestId(NEXT_POKEMON);
    userEvent.click(buttonProx);
    pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe(botoesTipo[1].textContent);
    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeVisible();
  });

  it('testa o botão para resetar filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: 'All' });
    const buttonProx = screen.getByTestId(NEXT_POKEMON);
    let pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe('Electric');
    userEvent.click(buttonProx);
    pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe('Fire');
    userEvent.click(buttonProx);
    pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe('Bug');

    userEvent.click(btnAll);

    pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe('Electric');
    userEvent.click(buttonProx);
    pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe('Fire');
    userEvent.click(buttonProx);
    pokemonType = screen.getByTestId(POKEMON_TYPE);
    expect(pokemonType.textContent).toBe('Bug');
  });
});
