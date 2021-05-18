import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import ReduxPage from './pages/ReduxPage';

const theme = {};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        This is admid page
        <ReduxPage />
      </ThemeProvider>
    </div>
  );
}

export default App;
