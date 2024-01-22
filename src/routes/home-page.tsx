import { Stack } from "@mui/material";
import SearchBar from "../components/search-bar";
import SearchResult from "../components/search-result";

const HomePage = () => {
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        <SearchBar/>
        <SearchResult/>
      </Stack>
      
    </>
  );
};

export default HomePage;
