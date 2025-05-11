import React from 'react'
import IcebreakerForm from './components/IceBreakerForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Generador de Cold Messages
        </h1>
        <IcebreakerForm />
      </div>
    </div>
  )
}

export default App
