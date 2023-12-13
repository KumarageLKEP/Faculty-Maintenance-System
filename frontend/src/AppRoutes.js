import React from 'react';
import {Route,Routes } from 'react-router-dom'
import { Login } from './Pages/Login';
import  Register  from './Pages/Register';
import Dashboard from './Pages/Dashboard';



export default function AppRoute() {
    return ( 
    <Routes>
      <Route path ='/'element = {<Login/>}/>
      <Route path ='/register'element = {<Register/>}/>
      <Route path ='/dashboard'element = {<Dashboard/>}/>

    </Routes>

    );
  }
