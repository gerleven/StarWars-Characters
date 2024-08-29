import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NewCharacterForm from '../components/new-character-form';
import { MemoryRouter } from 'react-router-dom';
import { Character } from '../lib/definitions';


describe('New character Form', () => {
  
  const mockFn = vi.fn();
  
  let nameInput: HTMLElement;
  let heightInput: HTMLElement;
  let ageInput: HTMLElement;
  let submitButton: HTMLElement;

  beforeEach(() => {
    render(
      <MemoryRouter>
        <NewCharacterForm mockFn={mockFn}/>
      </MemoryRouter>
    );

    nameInput = screen.getByLabelText(/name/i);
    heightInput = screen.getByLabelText(/height/i);
    ageInput = screen.getByLabelText(/birth year/i);
    submitButton = screen.getByRole("button");

  });


  it('Form rendered correctly', () => {
    expect(nameInput).toBeInTheDocument();
    expect(heightInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent(/add to favorites/i);
    expect(submitButton).toBeEnabled();
  });

  it("Form sent correctly", async ()=>{
    const newCharacter = {name: "German", height: "177", birth_year: "02/08/1988", gender: ""} as Character;
    const user = userEvent.setup();

    await user.type(nameInput, newCharacter.name);
    await user.type(heightInput, newCharacter.height);
    await user.type(ageInput, newCharacter.birth_year);

    expect(nameInput).toHaveValue(newCharacter.name);
    expect(heightInput).toHaveValue(Number(newCharacter.height));
    expect(ageInput).toHaveValue(newCharacter.birth_year);
    
    await user.click(submitButton);

    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(newCharacter);
  });

});
