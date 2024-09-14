import { Box, Pagination, Paper, Stack, Typography } from '@mui/material';
import { Character } from '../lib/definitions.tsx';
import CharacterCard, { SkeletonLoader } from './character-card';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import theme from '../theme/custom-theme.tsx';
import { IMyContext, useMyContext } from '../context/context.tsx';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SearchResult() {
  const {
    charactersSearchResult,
    clearSearchCharactersList,
    loading,
    totalRows,
    inputSearch,
    currentPage,
    showTable,
    handleShowTable,
    handleChangeCurrentPage,
    fetchCharacters
  }: IMyContext = useMyContext();

  const handleClearSearhResult = () => {
    clearSearchCharactersList();
    handleShowTable(true);
    fetchCharacters();
  };
  const handleChangePagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    handleChangeCurrentPage(value);
    fetchCharacters(inputSearch, value);
  };

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'end'}>
        <Typography>
          {showTable
            ? `Star Wars characters List (${charactersSearchResult.length} of ${totalRows}):`
            : `Search Results: (${charactersSearchResult.length} of ${totalRows}):`}
        </Typography>
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
      <Stack direction={'column'} display={'flex'} justifyContent={'space-between'} alignContent={'center'} alignItems={'center'}>
        {charactersSearchResult.length > 0 && (
          <Pagination
            count={Math.ceil(totalRows / 10)}
            color="primary"
            variant="outlined"
            siblingCount={1}
            boundaryCount={0}
            showFirstButton
            showLastButton
            page={currentPage}
            onChange={handleChangePagination}
          />
        )}
        {showTable == false && (
          <CustomButtonPrimary
            onClick={handleClearSearhResult}
            disabled={charactersSearchResult.length == 0}
            sx={{ marginTop: '15px !important' }}
            fullWidth
          >
            <ArrowBackIcon
              sx={{
                color: theme.palette.common.white,
                mr: 1
              }}
            />
            Back to full List
          </CustomButtonPrimary>
        )}
      </Stack>
    </>
  );
}

const NoItemsToShow = () => {
  const { fetchCharacters }: IMyContext = useMyContext();
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
