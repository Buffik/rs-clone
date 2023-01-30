import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <AuthorizationPage />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clients" element={<ClientsListPage />} />
      </Routes>
    </>
  );
}

export default App;
