import React from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Import from '../components/import';
import Home from '../components/home';

const AppRoutes = ()=>{

    return (
            <Routes>
                <Route path="/" exact element={<Home/>}/>
                <Route path="/import" element={<Import/>}/>
            </Routes>
    );
}

export default AppRoutes;