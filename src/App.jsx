import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/LoginPage'

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import UsersList from './components/UsersList'

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <LoginPage/>
      ),
    },
    {
      path: "/users",
      element: <UsersList/>,
    },
    {
      path: "/",
      element: <LoginPage/>,
    },
  ]);
  

  return (
    <>
     <RouterProvider router={router} />
    </>
  )
}

export default App
