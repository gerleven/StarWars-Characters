import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { CustomButtonPrimary } from "../lib/utils.tsx";
import { Stack } from "@mui/material";
import { Form } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

export default function SearchBar({
  setInputSearch,
  inputSearch,
}: {
  setInputSearch: (value: string) => void;
  inputSearch: string;
}) {
  const updateSearchInput = (value: string): void => {
    setInputSearch(value);
  };

  const handleClearSearchInput = () => {
    setInputSearch("");
  };

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
            placeholder="Search for a Star Wars character…"
            inputProps={{ "aria-label": "search" }}
            value={inputSearch}
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
        <Form method="get" action="/new" replace>
          <CustomButtonPrimary type="submit">New</CustomButtonPrimary>
        </Form>
      </Stack>
    </Box>
  );
}


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
  width: "85%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
  },
}));