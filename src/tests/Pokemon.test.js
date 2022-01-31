import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o Card dos pokemons', () => {
  it('testa se é exibido o card com as informações do pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonName.textContent).toBe('Pikachu');
    expect(pokemonType.textContent).toBe('Electric');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('testa o link para detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: 'More details' });
    expect(pokemonLink.href).toBe('http://localhost/pokemons/25');
    userEvent.click(pokemonLink);
    const title = screen.getByRole('heading', { name: /Pikachu details/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const btnFav = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(btnFav);
    history.push('/');
    const favStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(favStar.src).toBe('http://localhost/star-icon.svg');
  });
});
