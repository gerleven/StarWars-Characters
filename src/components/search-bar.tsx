import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import { Stack, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { IMyContext, useMyContext } from '../context/context.tsx';

export default function SearchBar() {
  const { fetchCharacters, inputSearch, handleChangeInputSearch, handleChangeCurrentPage, handleShowTable }: IMyContext = useMyContext();

  const updateSearchInput = (value: string): void => {
    handleChangeInputSearch(value);
  };

  const handleClearSearchInput = () => {
    handleChangeInputSearch('');
  };
  const handleSearchCharacter = () => {
    if(inputSearch!=""){ 
      handleChangeCurrentPage(1);
      handleShowTable(false);
      fetchCharacters(inputSearch, 1);
    }
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for a Star Wars character…"
            inputProps={{ 'aria-label': 'search' }}
            value={inputSearch}
            onKeyDown={(key) => {
              key.code == 'Enter' && handleSearchCharacter();
              key.code == 'Escape' && handleClearSearchInput();
            }}
            onChange={(term) => {
              updateSearchInput(term.target.value);
            }}
          />
          {inputSearch && (
            <IconButton onClick={handleClearSearchInput}>
              <ClearIcon />
            </IconButton>
          )}
        </Search>
        <Tooltip title={inputSearch==""?"enter an input first":""}>
          <CustomButtonPrimary sx={{ paddingX: 2 }} onClick={handleSearchCharacter}>
            Search
          </CustomButtonPrimary>
        </Tooltip>
      </Stack>
    </Box>
  );
}

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  boxShadow: '1px 1px 2px 1px #dbdbdb',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.7)
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  flexGrow: 1,
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width')
  }
}));
