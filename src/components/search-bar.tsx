import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { CustomButtonPrimary } from '../lib/utils.tsx';
import { Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { useContext, useState } from 'react';
import { MyContext } from '../routes/root-page.tsx';

export default function SearchBar() {
  const { searchCharacter, searchRandomCharacter } = useContext(MyContext);
  const [inputSearch, setInputSearch] = useState<string>('');

  const updateSearchInput = (value: string): void => {
    setInputSearch(value);
  };

  const handleClearSearchInput = () => {
    setInputSearch('');
  };
  const handleSearchCharacter = () => {
    if (inputSearch) {
      searchCharacter(inputSearch);
    } else {
      searchRandomCharacter();
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
            onKeyDown={(key)=>{(key.code == "Enter") && handleSearchCharacter(); (key.code == "Escape") && handleClearSearchInput()}}
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
        <CustomButtonPrimary sx={{ paddingX: 2 }} onClick={handleSearchCharacter}>
          Search
        </CustomButtonPrimary>
      </Stack>
    </Box>
  );
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  boxShadow: '1px 1px 2px 1px #dbdbdb',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.7)
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '80%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width')
  }
}));
