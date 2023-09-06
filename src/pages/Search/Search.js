import { WindowSharp } from '@mui/icons-material';
import { Button, createTheme, Tab, Tabs, TextField, ThemeProvider } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './Search.css'
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent/SingleContent';
const darkTheme=createTheme({
  palette:{
      mode:"dark",
  },
});
function Search() {
  const [type,setType]=useState(0);
  const [page,setPage]=useState(1);
  const [searchText,setSearchText]=useState("");
  const [content,setContent]=useState([]);
  const [numOfPages,setNumOfPages]=useState();
  const [condition,setCondition]=useState(false);
  const fetchSearch=async (e)=>{
    try{
      const {data} =await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
      setContent(data.results);
      setNumOfPages(data.total_pages);
      e.preventDefault();
        }
      catch(error){
        console.log(error);
      }
  }
  useEffect(()=>{
    window.scroll(0,0);
    fetchSearch();
  },[type,page]);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <form>
      <div className="search">
        <TextField 
        style={{flex: 1}}
        className="searchBox"
        label="Search"
        variant='filled'
        onChange={(e)=>setSearchText(e.target.value)}
        />
        <Button type="submit" onClick= {(e)=>{
           setCondition(true);
           e.preventDefault();
          fetchSearch(e);
         
        }
      }
                variant="contained"
                style={{marginLeft : 10}}
        disabled={searchText.length===0}
        >
          <SearchIcon fontSize="large"/>
        </Button>
      </div>
      </form>
      <Tabs
      value ={type}
      indicatorColor="primary"
      textColor="primary"
      onChange={(event,newValue)=>{
        setType(newValue);
        setPage(1);
      }}
      style={{paddingBottom:5}}
      aria-label="disabled tabs example"
      >
        <Tab style={{width:"50%"}} label="Search Movies "/>
        <Tab style={{width:"50%"}} label="Search TV Series "/>
        


      </Tabs>
      
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
              overview={c.overview}
            />
          ))}
        {content.length===0 &&
        condition &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </>
  )
}

export default Search
