import { Box, Paper, Stack, Typography } from '@mui/material';
import { Character } from '../lib/definitions.tsx';
import CharacterCard from './character-card.tsx';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import theme from '../theme/custom-theme.tsx';
import { useContext } from 'react';
import { MyContext } from '../routes/root-page.tsx';
import { Form } from 'react-router-dom';
import { IMyContext } from '../lib/context.tsx';

interface ISearchResult {
  inputFilter: string;
  filteredCharactersList: Character[];
}

export default function FavoriteList({ inputFilter, filteredCharactersList }: ISearchResult) {
  const { favoriteCharacters, loading }: IMyContext = useContext(MyContext);

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Box>
          <Typography>{`Filtered results (${filteredCharactersList.length} of ${favoriteCharacters.length}):`}</Typography>
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
        {favoriteCharacters.length == 0 && !loading && <NoItemsToShow />}
        {(inputFilter.length == 0 ? favoriteCharacters : filteredCharactersList).map((character: Character, index: number) => (
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
  const { resetFavoriteList }: IMyContext = useContext(MyContext);
  return (
    <Box>
      <Paper elevation={2} sx={{ margin: '3px' }}>
        <Stack padding={2} spacing={1}>
          <Typography fontSize={20} fontWeight={500}>
            Your favorites list is still empty
          </Typography>
          <Typography fontWeight={300} color={theme.palette.grey[600]}>
            Try creating a new custom character to add or do a search.
          </Typography>
          <CustomButtonPrimary onClick={resetFavoriteList}>Load 10 random Characters</CustomButtonPrimary>
        </Stack>
      </Paper>
    </Box>
  );
};
