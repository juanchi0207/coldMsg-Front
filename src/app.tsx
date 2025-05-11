import React from 'react'
import IcebreakerForm from './components/IceBreakerForm'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-white flex flex-col">
      <header className="py-6 bg-gradient-to-r from-primary to-primary-light text-white text-center">
        <h1 className="text-3xl font-extrabold">Cold Message Generator</h1>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
          <IcebreakerForm />
        </div>
      </main>
    </div>
  )
}

export default App
