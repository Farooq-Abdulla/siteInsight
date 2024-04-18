import React, { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css'
const SignUp = React.lazy(()=>import("./pages/SignUp"));
const SignIn = React.lazy(()=>import("./pages/SignIn"));
const Dashboard = React.lazy(()=>import("./pages/Dashboard"));
function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Suspense fallback={<img src={reactLogo} alt='Loading...'/>}><SignUp/></Suspense>} />
          <Route path='/signin' element={<Suspense fallback={<img src={reactLogo} alt='Loading...'/>}><SignIn/></Suspense>} />
          <Route path='/dashboard' element={<Suspense fallback={<img src={reactLogo} alt='Loading...'/>}><Dashboard/></Suspense>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
