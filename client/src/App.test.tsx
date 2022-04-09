import React from 'react';
import { App } from './App';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('redirect to login', () => {
  render(<App />);

  expect(window.location.href).toBe('http://localhost/login');
});

test('login', () => {
  render(<App />);

  const inputUsername = screen.getByTestId('input-username');
  const buttonLogin = screen.getByTestId('button-login');

  userEvent.type(inputUsername, 'abcd1234');
  userEvent.click(buttonLogin);

  expect(window.location.href).toBe('http://localhost/game');
});
