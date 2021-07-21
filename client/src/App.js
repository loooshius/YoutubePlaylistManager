import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header.js';
import Landing from './components/layout/Landing.js'

const App = () => (
    <Router>
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={ Landing } />
            </Switch>
        </div>
    </Router>
)

export default App;
