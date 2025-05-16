import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import Player from './Components/Apps/Player';
import Home from './Components/Apps/Home';
import ItemSearch from './Components/Apps/ItemSearch';
import Nav from './Components/Nav/Nav';
import Leaderboard from './Components/Apps/Leaderboard';
import Signatures from './Components/Apps/Signatures';
import KeyInfo from './Components/Apps/KeyInfo';
import axios from 'axios';
import { RecoilRoot} from 'recoil';

// allows for development locally
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

axios.interceptors.request.use(config => {
    const key = window.localStorage.getItem('apikey');
    if(key) config.headers['X-API-Key'] = key;
    return config;
});

axios.interceptors.response.use(response => {
    console.log(response.config.url, response.data);
    return response;
}, (error) => {
    const response = error.response;
    if(!response?.data?.success && response?.data?.error === 'Invalid key') {
        console.log('Invalid key. Removing from local storage!')
        window.localStorage.removeItem('apikey');
    }
    return error.response || {data:{success: false, error: error.toString()}};
});

ReactDOM.render((
    <RecoilRoot>
        <BrowserRouter>
            <Nav/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/leaderboard" component={Leaderboard}/>
                <Route exact path="/signatures" component={Signatures}/>
                <Route exact path="/keyinfo" component={KeyInfo}/>
                <Route exact path="/players/:id" component={Player}/>
                <Route exact path="/itemsearch/:query?" component={ItemSearch}/>
                <Redirect to="/"/>
            </Switch>
        </BrowserRouter>
    </RecoilRoot>
), document.getElementById('root'));