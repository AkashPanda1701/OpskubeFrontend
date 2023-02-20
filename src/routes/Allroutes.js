import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Order from '../pages/Order'
import Private from './Private'

function Allroutes() {
  return (
    <Routes>
        <Route path="/" element={
            <Home />
        } />

        <Route path="/orders" element={
        <Private>
            <Order />
        </Private>
        } />
        <Route path="/login" element={
            <Login />
        } />

        <Route path="*" element={
            <div>404</div>
        } />
      
    </Routes>
  )
}

export default Allroutes
