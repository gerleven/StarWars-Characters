import { AccountCircle } from '@mui/icons-material';
import { Grid, InputAdornment, MenuItem, TextField } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';
import { CustomButtonPrimary, CustomButtonSecondary } from '../lib/utils';
import HeightIcon from '@mui/icons-material/Height';
import CakeIcon from '@mui/icons-material/Cake';
import WcIcon from '@mui/icons-material/Wc';
import { useNavigate } from 'react-router-dom';
import { Character } from '../lib/definitions';
import { useMyContext } from '../context/context';

const NewCharacterForm = () => {
  const { register, handleSubmit } = useForm();

  const { addNewFavoriteCharacter } = useMyContext();

  const navigate = useNavigate();

  const onSubmit = (formData: FieldValues) => {
    const newCharacter = {
      name: formData.name,
      birth_year: formData.birth_year,
      gender: formData.gender,
      height: formData.height
    } as Character;
    addNewFavoriteCharacter(newCharacter);
    navigate('/favorites');
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'n/a', label: 'Other' }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container padding={1} gap={3} direction={'column'}>
        <Grid item>
          <TextField
            {...register('name')}
            fullWidth
            label="Name"
            id="Name-input"
            type="text"
            error={false}
            disabled={false}
            required={true}
            helperText="Enter a Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...register('height')}
            fullWidth
            label="Height"
            id="Height-input"
            type="number"
            error={false}
            disabled={false}
            required={true}
            helperText="Enter a height"
            InputProps={{
              endAdornment: <InputAdornment position="start">Cm.</InputAdornment>,
              startAdornment: (
                <InputAdornment position="start">
                  <HeightIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...register('birth_year')}
            fullWidth
            label="Birth year"
            id="Birth-input"
            type="text"
            error={false}
            disabled={false}
            required={true}
            helperText="Enter birth year"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            {...register('gender')}
            defaultValue={''}
            fullWidth
            id="Gender-input"
            select
            label="Gender"
            helperText="Select Gender"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <WcIcon />
                </InputAdornment>
              )
            }}
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item container columns={2} spacing={1} direction={'row'}>
          <Grid item xs={1} display={'none'}>
            <CustomButtonSecondary fullWidth disabled>
              Clear
            </CustomButtonSecondary>
          </Grid>
          <Grid item xs={1} display={'none'}>
            <CustomButtonSecondary fullWidth disabled>
              Load Random
            </CustomButtonSecondary>
          </Grid>

          <Grid item xs={2}>
            <CustomButtonPrimary fullWidth type="submit">
              Add to Favorites
            </CustomButtonPrimary>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewCharacterForm;
