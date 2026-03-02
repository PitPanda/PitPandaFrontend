import React from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <RecoilRoot>
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/signatures" element={<Signatures/>}/>
                <Route path="/keyinfo" element={<KeyInfo/>}/>
                <Route path="/players/:id" element={<Player/>}/>
                <Route path="/itemsearch/:query?" element={<ItemSearch/>}/>
                <Route path="/itemsearch" element={<ItemSearch/>}/>
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </BrowserRouter>
    </RecoilRoot>
);