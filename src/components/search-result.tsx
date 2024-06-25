import { Box, Pagination, Paper, Stack, Typography } from '@mui/material';
import { Character } from '../lib/definitions.tsx';
import CharacterCard, { SkeletonLoader } from './character-card';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import theme from '../theme/custom-theme.tsx';
import { useContext } from 'react';
import { MyContext } from '../routes/root-page.tsx';
import { IMyContext } from '../lib/context.tsx';

export default function SearchResult() {
  const { charactersSearchResult, clearSearchCharactersList, loading, totalRows, currentPage, handleChangeCurrentPage}: IMyContext = useContext(MyContext);

  const handleClearSearhResult = () => {
    clearSearchCharactersList();
  };
  const handleChangePagination =  (event: React.ChangeEvent<unknown>, value: number) => {
    handleChangeCurrentPage(value);
  };
  

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Box>{charactersSearchResult && <Typography>{`Star Wars characters List (${charactersSearchResult.length} of ${totalRows}):`}</Typography>}</Box>
      </Stack>
      <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={1} className={'overFlowYScroll shadowBox'} margin={-3}>
        {loading ? (
          <SkeletonLoader amount={5} />
        ) : (
          <>
            {charactersSearchResult.length == 0 ? (
              <NoItemsToShow />
            ) : (
              <>
                {charactersSearchResult.map((character: Character, index: number) => (
                  <CharacterCard key={index} character={character} isFavorite={false} />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
      <Stack direction={"column"} display={"flex"} justifyContent={"space-between"} alignContent={"center"} alignItems={"center"}>
        {charactersSearchResult.length>0 && <Pagination count={Math.ceil(charactersSearchResult.length/10)+9}  color="primary" variant="outlined" siblingCount={1} boundaryCount={0} showFirstButton showLastButton  page={currentPage} onChange={handleChangePagination}/>}
        <CustomButtonPrimary onClick={handleClearSearhResult} disabled={charactersSearchResult.length == 0} sx={{marginTop: "15px !important"}} fullWidth>
          Clear
        </CustomButtonPrimary>
      </Stack>
    </>
  );
}

const NoItemsToShow = () => {
  const { fetchCharacters }: IMyContext = useContext(MyContext);
  const handleShowAllCharacters = () => {
    fetchCharacters();
  };

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
