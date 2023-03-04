import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Box, Modal } from '@mui/material';
import styles from './App.module.scss';
import Navigation from './components/Navigation/Navigation';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import ClientsListPage from './pages/ClientsListPage/ClientsListPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import PageNotFound from './pages/PageNotFound';
import TasksPage from './pages/TasksPage/TasksPage';
import { useAppDispatch, useAppSelector } from './hook';
import { checkAuth } from './store/authorizationSlice';
import ContactsListPage from './pages/ContactsListPage/ContactsListPage';
import UsersListPage from './pages/UsersListPage/UsersListPage';
import Footer from './components/Footer/Footer';
import { API_URL, updateAccessToken } from './api/api';
import { fetchData, updateData } from './store/dataSlice';
import LoadingSpinner from './components/UI/Spinner/LoadingSpinner';
import EditProfileModal from './pages/ProfilePage/EditProfileModal/EditProfileModal';
import { ProfileData } from './types/types';

function App() {
  const { isAuth } = useAppSelector((state) => state.authorization);
  const { isLoading } = useAppSelector((state) => state.authorization);
  const dispatch = useAppDispatch();
  const [isAuthentificated, setIsAuthentificated] = useState(isAuth);

  const subscribe = async () => {
    try {
      const token = localStorage.getItem('token');
      const eventSource = new EventSource(`${API_URL}/connect?id=${token}`, {
        withCredentials: true,
      });

      eventSource.onmessage = (response) => {
        const data = JSON.parse(response.data);
        dispatch(updateData(data));
      };

      eventSource.onerror = async () => {
        eventSource.close();
        console.log(`isAuth: ${isAuth}`);
        console.log(`isAuthentificated: ${isAuth}`);
        if (isAuthentificated) {
          try {
            await updateAccessToken();
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
          }
          subscribe();
        }
      };
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
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
    setIsAuthentificated(isAuth);
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      subscribe();
    }
  }, [isAuth]);

  const [openProfile, setOpenProfile] = useState(false);
  const handleProfileClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setOpenProfile(true);
  };
  const handleCloseProfile = () => {
    setOpenProfile(false);
  };

  const profileData = useAppSelector((state) => state.data.profile);
  const [profile, setProfile] = useState<ProfileData>(profileData);

  useEffect(() => {
    setProfile(profileData);
  }, [profileData]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {!isAuth
        ? <AuthorizationPage />
        : (
          <div className={styles.wrapper}>
            <Modal
              open={openProfile}
              onClose={handleCloseProfile}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className={styles.modalWrapper}
            >
              <Box>
                <div>
                  <EditProfileModal
                    setOpenProfile={setOpenProfile}
                    profile={profile}
                  />
                </div>
              </Box>
            </Modal>
            <div className={styles.navBox}>
              <Navigation handleProfileClick={handleProfileClick} />
            </div>
            <div className={styles.pageWrapper}>
              <div className={styles.contentBox}>
                <Routes>
                  <Route path="/" element={<Navigate to="/calendar" />} />
                  <Route
                    path="/calendar"
                    element={<CalendarPage />}
                  />
                  <Route
                    path="/tasks"
                    element={isAuth ? <TasksPage /> : <Navigate to="/" />}
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
                    path="/users"
                    element={isAuth ? <UsersListPage /> : <Navigate to="/" />}
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        )}

    </div>
  );
}

export default App;
