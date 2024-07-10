import { Grid, Paper, Typography } from '@mui/material';
import NewCharacterForm from '../components/new-character-form';

const NewCharacterPage = () => {
  return (
    <Paper elevation={3}>
      <Grid container padding={3} gap={4} direction={'column'}>
        <Grid item>
          <Typography variant="h4">Create a new Character!</Typography>
        </Grid>
        <Grid item>
          <NewCharacterForm />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NewCharacterPage;
