import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage/ClientsListPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import PageNotFound from './pages/PageNotFound';
import TasksPage from './pages/TasksPage/TasksPage';
import Search from './components/Search/Search';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navBox}>
        <Navigation />
      </div>
      <div className={styles.pageWrapper}>
        <Search />
        <div className={styles.contentBox}>
          <Routes>
            <Route path="/" element={<AuthorizationPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/clients" element={<ClientsListPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
