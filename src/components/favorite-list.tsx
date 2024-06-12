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
  const { characters, loading, resetList, deleteCharacter }: IMyContext = useContext(MyContext);
  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Box>
          {inputFilter && (
            <Typography>{`Filtered results (${filteredCharactersList.length} de ${characters.length}):`}</Typography>
          )}
        </Box>
        <Form method="get" action="/new" replace>
          <CustomButtonPrimary type="submit">New</CustomButtonPrimary>
        </Form>
      </Stack>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
        paddingY={1}
        className={'overFlowYScroll'}
        sx={{ height: '80vh' }}
      >
        {characters.length == 0 && !loading && <NoItemsToShow resetList={resetList} />}
        {(inputFilter.length == 0 ? characters : filteredCharactersList).map((character: Character, index: number) => {
          return <CharacterCard key={index} character={character} deleteCharacter={deleteCharacter} />;
        })}
      </Stack>
    </>
  );
}

const NoItemsToShow = ({ resetList }: { resetList: () => void }) => {
  return (
    <>
      <Paper elevation={3}>
        <Box>
          <Stack padding={2} spacing={1}>
            <Typography fontSize={20} fontWeight={500}>
              No Items to show
            </Typography>
            <Typography fontWeight={300} color={theme.palette.grey[600]}>
              Try to create a new Character or reset default list.
            </Typography>
            <CustomButtonPrimary onClick={resetList}>Reset List</CustomButtonPrimary>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};
