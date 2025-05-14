// src/components/IcebreakerForm.tsx
import React, { useState } from 'react'
import Spinner from './Spinner'
import IcebreakerResults from './IceBreakerResults'
import { generateIcebreakers } from '../api/generateIceBreakers'

interface FormValues {
  senderProfile: string
  recipientProfile: string
  language: string
  problem: string
  solution: string
}

const IcebreakerForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    senderProfile: '',
    recipientProfile: '',
    language: '',
    problem: '',
    solution: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<string[]>([])
  const [error, setError] = useState<string>('')

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessages([])

    const { senderProfile, recipientProfile, language, problem, solution } =
      values

    if (
      !senderProfile ||
      !recipientProfile ||
      !language ||
      !problem ||
      !solution
    ) {
      setError('Por favor completa todos los campos.')
      return
    }
    if (
      !senderProfile.includes('linkedin.com') ||
      !recipientProfile.includes('linkedin.com')
    ) {
      setError('Asegúrate de que las URLs sean de LinkedIn.')
      return
    }

    setIsLoading(true)
    try {
      const msgs = await generateIcebreakers(values)
      setMessages(msgs)
    } catch (err: any) {
      setError(err.message || 'Error al generar mensajes.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Columna IZQUIERDA: Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block mb-1 font-medium">Tu perfil LinkedIn</label>
          <input
            type="url"
            name="senderProfile"
            value={values.senderProfile}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/tu-perfil"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Perfil LinkedIn destinatario
          </label>
          <input
            type="url"
            name="recipientProfile"
            value={values.recipientProfile}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/destinatario"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Idioma</label>
          <select
            name="language"
            value={values.language}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light transition"
          >
            <option value="">Seleccione un idioma...</option>
            <option>Español (ARG)</option>
            <option>Inglés</option>
            <option>Portugués</option>
            <option>Francés</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Problema que resolvés</label>
          <textarea
            name="problem"
            value={values.problem}
            onChange={handleChange}
            placeholder="Describe el problema que ayudas a resolver"
            required
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Solución que ofrecés</label>
          <textarea
            name="solution"
            value={values.solution}
            onChange={handleChange}
            placeholder="Describe la solución que ofreces"
            required
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light transition"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-light transition disabled:opacity-50"
        >
          {isLoading ? <Spinner /> : 'Generar mensajes'}
        </button>
      </form>

      {/* Columna DERECHA: Placeholder / Carga / Resultados */}
      <div className="min-h-[300px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg p-4">
        {isLoading ? (
          <div className="text-center">
            <Spinner />
            <p className="mt-2 text-gray-500">Generando mensajes...</p>
          </div>
        ) : messages.length > 0 ? (
          <IcebreakerResults messages={messages} />
        ) : (
          <p className="text-gray-400">Aquí aparecerán tus mensajes</p>
        )}
      </div>
    </div>
  )
}

export default IcebreakerForm