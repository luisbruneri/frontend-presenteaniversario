import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

ReactDOM.render(
    <BrowserRouter>
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Lista de Presentes
                </Typography>
            </Toolbar>
        </AppBar>
        <Switch>
            <Route path="/" exact >
                <App />
            </Route>
            <Route path="/add"  >
                <h1>Criar</h1>
            </Route>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));