import { Chip, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react'
  const darkTheme=createTheme({
  palette:{
      mode:"dark",
  },
});
const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
      };
      const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((g) => g.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
      };
    const fetchGenres= async()=>{
        const { data }= await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
            );
        setGenres(data.genres);
    };
    console.log(genres);
    useEffect(()=>{
        fetchGenres();
        // return (()=>{
        //     setGenres({});
        // })
    },[]);
  return (
    
    <div style={{ padding: "6px 0" }}>
      <ThemeProvider theme={darkTheme}>
          { selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          color="primary"
          size="small"
          clickable
          onDelete={() => handleRemove(genre)}
        />
      ))}
         { genres.map((genre) => (
        <Chip
          style={{ margin: 2 }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={()=> handleAdd(genre)}
        />
      ))}
      </ThemeProvider>
    </div>
  )
}

export default Genres
