import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage/ClientsListPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import PageNotFound from './pages/PageNotFound';
import TasksPage from './pages/TasksPage/TasksPage';
import Search from './components/Search/Search';
import { useAppDispatch, useAppSelector } from './hook';
import { checkAuth } from './store/authorizationSlice';
import ContactsListPage from './pages/ContactsListPage/ContactsListPage';
import { fetchAllClients } from './store/allClientsSlice';
import UsersListPage from './pages/UsersListPage/UsersListPage';
import Footer from './components/Footer/Footer';
import { API_URL } from './api/api';
import { DataUpdate } from './types/types';
import {
  fetchData,
  updateClients,
  updateContacts,
  updateProfile,
  updateUsers,
} from './store/dataSlice';

function App() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const dispatch = useAppDispatch();

  const subscribe = async () => {
    const token = localStorage.getItem('token');
    const eventSource = new EventSource(`${API_URL}/connect?id=${token}`, {
      withCredentials: true,
    });
    eventSource.onmessage = (response) => {
      const data: DataUpdate = JSON.parse(response.data);
      if (data?.profile) {
        dispatch(updateProfile(data.profile));
      }
      if (data?.clients) {
        dispatch(updateClients(data.clients));
      }
      if (data?.contacts) {
        dispatch(updateContacts(data.contacts));
      }
      if (data?.users) {
        dispatch(updateUsers(data.users));
      }
    };
    eventSource.onerror = () => {
      setTimeout(subscribe, 1000);
    };
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchData());
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      subscribe();
    }
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) dispatch(fetchAllClients());
  }, [isAuth]);
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
            <Route
              path="/calendar"
              element={isAuth ? <CalendarPage /> : <Navigate to="/" />}
            />
            <Route
              path="/clients"
              element={isAuth ? <ClientsListPage /> : <Navigate to="/" />}
            />
            <Route
              path="/contacts"
              element={isAuth ? <ContactsListPage /> : <Navigate to="/" />}
            />
            <Route
              path="/tasks"
              element={isAuth ? <TasksPage /> : <Navigate to="/" />}
            />
            <Route
              path="/users"
              element={isAuth ? <UsersListPage /> : <Navigate to="/" />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
