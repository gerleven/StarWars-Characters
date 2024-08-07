import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import InputBase from '@mui/material/InputBase';
import { Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

interface IFilterBar {
  setInputFilter: (value: string) => void;
  inputFilter: string;
}

export default function FilterBar({ setInputFilter, inputFilter }: IFilterBar) {
  const updateSearchInput = (value: string): void => {
    setInputFilter(value);
  };

  const handleClearSearchInput = () => {
    setInputFilter('');
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
        <Search>
          <SearchIconWrapper>
            <FilterAltOutlinedIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Filter your favorite list…"
            inputProps={{ 'aria-label': 'search' }}
            value={inputFilter}
            onKeyDown={(key)=>{(key.code == "Escape") && handleClearSearchInput()}}
            onChange={(term) => {
              updateSearchInput(term.target.value);
            }}
          />
          {inputFilter && (
            <IconButton onClick={handleClearSearchInput}>
              <ClearIcon />
            </IconButton>
          )}
        </Search>
      </Stack>
    </Box>
  );
}

const Search = styled('div')(({ theme }) => ({
  display: "flex",
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
  flexGrow: 1,
  color: 'inherit',
  width: '80%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width')
  }
}));
