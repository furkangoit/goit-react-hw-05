import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './DataContext';
import Navigation from './components/Navigation';
import './App.css';

// Lazy load all page components for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast'));
const MovieReviews = lazy(() => import('./components/Movie.Reviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Navigation />

        <Suspense fallback={<div className="loading">Loading page...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movieList/:movieId" element={<MovieDetailsPage />}>
              <Route
                path="cast"
                element={
                  <Suspense fallback={<div className="loading">Loading cast...</div>}>
                    <MovieCast />
                  </Suspense>
                }
              />
              <Route
                path="reviews"
                element={
                  <Suspense fallback={<div className="loading">Loading reviews...</div>}>
                    <MovieReviews />
                  </Suspense>
                }
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </DataProvider>
  );
}

export default App;