import { Box, Paper, Stack, Typography } from '@mui/material';
import { Character } from '../lib/definitions.tsx';
import CharacterCard, { SkeletonLoader } from './character-card';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import theme from '../theme/custom-theme.tsx';
import { useContext } from 'react';
import { MyContext } from '../routes/root-page.tsx';
import { IMyContext } from '../lib/context.tsx';

export default function SearchResult() {
  const { charactersSearchResult, clearSearchCharactersList, loading }: IMyContext = useContext(MyContext);

  const handleClearSearhResult = () => {
    clearSearchCharactersList();
  };

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Box>
          {charactersSearchResult && <Typography>{`Search results (${charactersSearchResult.length}):`}</Typography>}
        </Box>
      </Stack>
      {loading ? (
        <SkeletonLoader amount={5} />
      ) : (
        <>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={1}
            className={'overFlowYScroll'}
            sx={{ height: '80vh' }}
            margin={-3}
          >
            {charactersSearchResult.length == 0 ? (
              <NoItemsToShow />
            ) : (
              <>
                {charactersSearchResult.map((character: Character, index: number) => (
                  <CharacterCard key={index} character={character} isFavorite={false} />
                ))}
              </>
            )}
          </Stack>
        </>
      )}
      <CustomButtonPrimary onClick={handleClearSearhResult} disabled={charactersSearchResult.length == 0}>
        Clear
      </CustomButtonPrimary>
    </>
  );
}

const NoItemsToShow = () => {
  const { searchCharacter }: IMyContext = useContext(MyContext);
  const handleShowAllCharacters=()=>{
    searchCharacter();
  }

  return (
    <Box>
      <Paper elevation={2} sx={{ margin: '3px' }}>
        <Stack padding={2} spacing={1}>
          <Typography fontSize={20} fontWeight={500}>
            No Items to show
          </Typography>
          <Typography fontWeight={300} color={theme.palette.grey[600]}>
            Try to enter another input.
          </Typography>
          <CustomButtonPrimary onClick={handleShowAllCharacters}>Show all characters</CustomButtonPrimary>
        </Stack>
      </Paper>
    </Box>
  );
};

