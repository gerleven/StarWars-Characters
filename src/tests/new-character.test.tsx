import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import NewCharacterForm from '../components/new-character-form';
import { MemoryRouter } from 'react-router-dom';

describe('New character Form', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NewCharacterForm />
      </MemoryRouter>
    );
  });

  it('Name input', () => {
    const nameInput = screen.getByLabelText(/Name/i);
    expect(nameInput).toBeInTheDocument();
  });

  it('Submit button', () => {
    const button = screen.queryByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
    expect(button).toHaveTextContent(/add to favorites/i);
  });
});
