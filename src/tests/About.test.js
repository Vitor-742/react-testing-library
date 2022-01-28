import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('testa o component about', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/about');
  const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(title).toBeInTheDocument();
  const paragraphs = screen.getAllByText(/Pokémons/i, { ignore: '.link' });
  expect(paragraphs).toHaveLength(2);
  const image = screen.getByRole('img');
  expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
