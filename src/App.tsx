import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage/ClientsListPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import PageNotFound from './pages/PageNotFound';
import TasksPage from './pages/TasksPage/TasksPage';
import Search from './components/Search/Search';
import { RootState } from './store/store';
import { checkAuth } from './store/authorizationSlice';
import { useAppDispatch } from './hook';

function App() {
  const { isAuth } = useSelector((state: RootState) => state.authorization);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);
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
            <Route path="/calendar" element={isAuth ? <CalendarPage /> : <Navigate to="/" />} />
            <Route path="/clients" element={isAuth ? <ClientsListPage /> : <Navigate to="/" />} />
            <Route path="/tasks" element={isAuth ? <TasksPage /> : <Navigate to="/" />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
