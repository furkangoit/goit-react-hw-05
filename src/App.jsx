import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { DataProvider } from './DataContext'
import HomePage from './pages/HomePage'
import MoviesPage from './pages/MoviesPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import MovieCast from './components/MovieCast'
import MovieReviews from './components/Movie.Reviews'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <DataProvider>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies" style={{ marginLeft: '20px' }}>Movies</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movieList/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </DataProvider>
  )
}

export default App