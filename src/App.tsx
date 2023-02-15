import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage/ClientsListPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import PageNotFound from './pages/PageNotFound';
import TasksPage from './pages/TasksPage/TasksPage';
import Search from './components/Search/Search';
import DroppableArea from './components/DraggableItem/DroppableArea/DroppableArea';
import { useAppDispatch } from './hook';
import { fetchAllClients } from './store/allClientsSlice';

function App() {
  // global state -----------------------------------------
  const dispatch = useAppDispatch();
  // companies
  useEffect(() => {
    dispatch(fetchAllClients());
  }, [dispatch]);
  // --------------------------------------------------------------

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
            <Route path="/day" element={<DroppableArea />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/clients" element={<ClientsListPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
