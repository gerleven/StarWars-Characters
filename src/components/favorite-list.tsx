import { Box, Paper, Stack, Typography } from '@mui/material';
import { Character, IMyContext } from '../lib/definitions.tsx';
import CharacterCard from './character-card.tsx';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import theme from '../theme/custom-theme.tsx';
import { useContext } from 'react';
import { MyContext } from '../routes/root-page.tsx';
import { Form } from 'react-router-dom';

interface ISearchResult {
  inputFilter: string;
  filteredCharactersList: Character[];
}

export default function FavoriteList({ inputFilter, filteredCharactersList }: ISearchResult) {
  const { characters, loading }: IMyContext = useContext(MyContext);

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Box>
          <Typography>{`Filtered results (${filteredCharactersList.length} of ${characters.length}):`}</Typography>
        </Box>
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        className={'overFlowYScroll'}
        sx={{ height: '80vh' }}
        margin={-3}
      >
        {characters.length == 0 && !loading && <NoItemsToShow />}
        {(inputFilter.length == 0 ? characters : filteredCharactersList).map((character: Character, index: number) => (
          <CharacterCard key={index} character={character} isFavorite={true} />
        ))}
      </Stack>
      <br></br>
      <Stack sx={{ pb: '15px' }}>
        <Form method="get" action="/new" replace>
          <CustomButtonPrimary type="submit" fullWidth>
            New
          </CustomButtonPrimary>
        </Form>
      </Stack>
    </>
  );
}

const NoItemsToShow = () => {
  const { resetList }: IMyContext = useContext(MyContext);
  return (
      <Paper elevation={3} sx={{ margin: '3px' }}>
      <Box>
        <Stack padding={2} spacing={1}>
          <Typography fontSize={20} fontWeight={500}>
            No Items to show
          </Typography>
          <Typography fontWeight={300} color={theme.palette.grey[600]}>
            Try to create a new Character or reset default list.
          </Typography>
          <CustomButtonPrimary onClick={resetList}>Load 10 random Characters</CustomButtonPrimary>
        </Stack>
      </Box>
    </Paper>
  );
};
