import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const HAVE_LENGTH_FOUR = 4;
const HAVE_LENGTH_THREE = 3;
const PUSH_PIKACHU_DETAIL = '/pokemons/25';

describe('testa a pagina de detalhes dos pokemons', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH_PIKACHU_DETAIL);
    const title = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(title).toBeInTheDocument();
    const allLinks = screen.getAllByRole('link');
    expect(allLinks).toHaveLength(HAVE_LENGTH_THREE);
    const titleSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const parag = titleSummary.parentNode.childNodes;
    expect(parag[1].textContent)
      .toContain('This intelligent Pokémon roasts hard berries');
  });

  it('Testa as localizações e suas imagens', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH_PIKACHU_DETAIL);
    const titleLocations = screen
      .getByRole('heading', { name: 'Game Locations of Pikachu' });
    expect(titleLocations).toBeInTheDocument();
    const locationImage = screen.getAllByAltText('Pikachu location');
    const location = locationImage[0].parentNode;
    expect(location.childNodes).toHaveLength(2);
    expect(locationImage[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Testa o botao de favoritos', () => {
    const { history } = renderWithRouter(<App />);
    history.push(PUSH_PIKACHU_DETAIL);
    const labelCheck = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheck.type).toBe('checkbox');
    userEvent.click(labelCheck);
    let pokemonFav = screen.getAllByRole('img');
    expect(pokemonFav).toHaveLength(HAVE_LENGTH_FOUR);
    userEvent.click(labelCheck);
    pokemonFav = screen.getAllByRole('img');
    expect(pokemonFav).toHaveLength(HAVE_LENGTH_THREE);
  });
});
