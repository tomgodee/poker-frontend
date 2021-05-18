import React from 'react';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from 'pages/Login';
import ReduxPage from './pages/ReduxPage';
import PrivateRoute from './components/PrivateRoute';

const theme = {};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/redux-example" component={ReduxPage} />
            <PrivateRoute path="/protected" component={ReduxPage} />
          </Switch>
          This is admin page
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
