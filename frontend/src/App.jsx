import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './hooks'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/Login'))
const Register = React.lazy(() => import('./views/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

export const App = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === 'checking') {
    return loading
  }

  return (
    <Router>
      <Suspense fallback={loading}>
        <Routes>
          {status === 'authenticated' ? (
            <Route path="*" name="Home" element={<DefaultLayout />} />
          ) : (
            <>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route exact path="/register" name="Register Page" element={<Register />} />
              <Route path="*" element={<Navigate replace to="/login" />} />
            </>
          )}
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          {/* <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
        </Routes>
      </Suspense>
    </Router>
  )
}
