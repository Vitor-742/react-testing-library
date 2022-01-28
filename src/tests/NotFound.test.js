import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('verifica se a pagina NotFound funciona corretamente', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');
  const title = screen.getByRole('heading', { level: 2 });
  expect(title).toBeInTheDocument();
  const image = screen
    .getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
