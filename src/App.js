import React from 'react';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav';

import Container from '@mui/material/Container';
import Trending from './pages/Trending/Trending';
import Search from './pages/Search/Search';
import Series from './pages/Series/Series';
import Movies from './pages/Movies/Movies';
function App() {
  return (
    <Router>
    <Header />
    <div className="app">
      <Container>
       <Routes>
        <Route path='/' element={<Trending />} exact/>
        <Route path='/movies' element={<Movies />} />
        <Route path='/series' element={<Series />} />
        <Route path='/search' element={<Search />} />
       </Routes>
      </Container>
    </div>
    <SimpleBottomNavigation/>
    </Router>
  );
}

export default App;
