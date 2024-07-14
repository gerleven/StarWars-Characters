import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NewCharacterForm from '../components/new-character-form';
import { MemoryRouter } from 'react-router-dom';
import { Character } from '../lib/definitions';


describe('New character Form', () => {
  
  const mockFn = vi.fn();
  

  beforeEach(() => {
    render(
      <MemoryRouter>
        <NewCharacterForm mockFn={mockFn}/>
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

  it("form sent correctly", async ()=>{
    const newCharacter = {name: "German", height: "177", birth_year: "02/08/1988", gender: ""} as Character;
    const user = userEvent.setup();

    const nameInput = screen.getByLabelText(/name/i);
    const heightInput = screen.getByLabelText(/height/i);
    const ageInput = screen.getByLabelText(/birth year/i);
    
    const submitButton = screen.getByRole("button");

    await user.type(nameInput, newCharacter.name);
    await user.type(heightInput, newCharacter.height);
    await user.type(ageInput, newCharacter.birth_year);
    
    
    await user.click(submitButton);

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(newCharacter);
  });

});
