import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navBox}>
        <Navigation />
      </div>
      <div className={styles.contentBox}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/authorization" element={<AuthorizationPage />} />
          <Route path="/clients" element={<ClientsListPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
