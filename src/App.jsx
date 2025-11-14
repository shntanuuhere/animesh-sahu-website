import { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorBoundary from './utils/errorBoundary'
import './App.css'

// Lazy load pages for code splitting with retry logic and minimum delay
const retryImport = (importFn, retries = 3, delay = 1000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()
    const minDelay = 500 // Minimum 500ms to show loading spinner
    
    importFn()
      .then((module) => {
        const elapsed = Date.now() - startTime
        const remainingDelay = Math.max(0, minDelay - elapsed)
        
        setTimeout(() => resolve(module), remainingDelay)
      })
      .catch((error) => {
        if (retries === 0) {
          reject(error)
          return
        }
        setTimeout(() => {
          retryImport(importFn, retries - 1, delay).then(resolve, reject)
        }, delay)
      })
  })
}

const Home = lazy(() => retryImport(() => import('./pages/Home')))
const About = lazy(() => retryImport(() => import('./pages/About')))
const Contact = lazy(() => retryImport(() => import('./pages/Contact')))
const Booking = lazy(() => retryImport(() => import('./pages/Booking')))
const CheckStatus = lazy(() => retryImport(() => import('./pages/CheckStatus')))
const Privacy = lazy(() => retryImport(() => import('./pages/Privacy')))
const Terms = lazy(() => retryImport(() => import('./pages/Terms')))
const AdminLogin = lazy(() => retryImport(() => import('./pages/AdminLogin')))
const Admin = lazy(() => retryImport(() => import('./pages/Admin')))

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/check-status" element={<CheckStatus />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App
