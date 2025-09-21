import React from 'react'
import { BurnoutTest } from './components/BurnoutTest'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <BurnoutTest />
      </main>
      <Footer />
    </div>
  )
}

export default App
