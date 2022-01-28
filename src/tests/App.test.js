import renderWithRouter from "../services/renderWithRouter";
import { screen } from "@testing-library/react";
import App from "../App";
import userEvent from '@testing-library/user-event'

test("testa os links de navegação", () => {
  const { history } = renderWithRouter(<App />);
  const linkHome = screen.getByRole("link", { name: /home/i });
  const linkAbout = screen.getByRole("link", { name: /about/i });
  const linkFavorite = screen.getByRole("link", { name: /favorite pokémons/i });

  expect(linkHome).toBeInTheDocument();
  expect(linkAbout).toBeInTheDocument();
  expect(linkFavorite).toBeInTheDocument();

  userEvent.click(linkHome)
  expect(history.location.pathname).toBe('/')
  userEvent.click(linkAbout)
  expect(history.location.pathname).toBe('/about')
  userEvent.click(linkFavorite)
  expect(history.location.pathname).toBe('/favorites')
  history.push('/xablau')
  const NotFound = screen.getByRole('heading', {name: /Page requested not found/i})
  expect(NotFound).toBeInTheDocument()
});
