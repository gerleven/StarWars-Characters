import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import { Stack } from "@mui/material";
import { Form } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.4),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.7),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function SearchBar({ setInputSearch }: {setInputSearch: (value: string)=>void}) {
  const updateSearchInput = (value: string): void => {
    setInputSearch(value);
  };

  const handleSearch = useDebouncedCallback(updateSearchInput, 300); //Debounced to avoid update in every stroke 

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        padding={2}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={(term) => {
              handleSearch(term.target.value);
            }}
          />
        </Search>
        <Form method="get" action="/new" replace>
          <CustomButtonPrimary type="submit">New</CustomButtonPrimary>
        </Form>
      </Stack>
    </Box>
  );
}
