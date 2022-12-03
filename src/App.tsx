import React from 'react';
import './App.css';
import LoginCard from './features/login/login-card';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './common-components/header';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import UsersOverview from './features/users/components/users-overview';
import AlertToast from './common-components/alertToast';

const dark = createTheme({
  palette: {
    mode: 'dark',
  },
});


function App() {
  const isUserLoggedIn = useSelector((state: RootState) => state.login.isUserLoggedIn);

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline enableColorScheme />
      <div className="App">
      <BrowserRouter>
        <Header />
        <div className="App-header">
          <Routes>
            <Route path="login" element={<LoginCard />} />
            <Route path="/" element={<Navigate replace to={isUserLoggedIn ? "/users" : "/login" } />} />
            <Route path="/users" element={<UsersOverview />} />
          </Routes>
        </div>
        </BrowserRouter>
        <AlertToast />
      </div>
    </ThemeProvider>
  );
}

export default App;
