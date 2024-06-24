import { useContext, useEffect } from 'react';
import SearchBar from '../components/search-bar';
import SearchResult from '../components/search-result';
import { MyContext } from './root-page';

const HomePage = () => {
  const { searchCharacter } = useContext(MyContext);

  useEffect(()=>{
    searchCharacter("");
  },[]);
  
  return (
    <>
      <SearchBar />
      <br></br>
      <SearchResult />
    </>
  );
};

export default HomePage;
