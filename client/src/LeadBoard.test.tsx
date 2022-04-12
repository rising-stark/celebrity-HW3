import { render, screen } from '@testing-library/react';
import { App } from './App';
import userEvent from '@testing-library/user-event';
import React from 'react';

test('login fail', () => {
  render(<App />);

  const inputUsername = screen.getByTestId('input-username');
  const buttonLogin = screen.getByTestId('button-login');

  userEvent.type(inputUsername, 'abcd1234');
  userEvent.click(buttonLogin);

  const linkLeadboard = screen.getByTestId('link-leadboard');
  userEvent.click(linkLeadboard);

  expect(window.location.href).toBe('http://localhost/leaderBoard');
});
