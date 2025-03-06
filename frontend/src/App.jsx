import { useState, useEffect } from 'react';
import ProtectedRouter from './components/ProtectedRouter';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import PublicRoute from './components/PublicRoute';
import BookingPage from './components/BookingPage';
import CheckingPage from './components/CheckingPage';

function App() {


  return (
    <>
      {/* <ProtectedRouter user={user} setUser={setUser} /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRouter><Home /></ProtectedRouter>} />
          <Route path='/bookings' element={<ProtectedRouter><BookingPage /></ProtectedRouter>} />
          <Route path='/checkin/:bookingId' element={<ProtectedRouter><CheckingPage /></ProtectedRouter>} />

          <Route path='/login' element={<PublicRoute><LoginForm /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><RegisterForm /></PublicRoute>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
