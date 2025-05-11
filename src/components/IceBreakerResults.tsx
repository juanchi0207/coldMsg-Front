import React from 'react'
import { ClipboardIcon } from '@heroicons/react/24/outline'

interface Props { messages: string[] }

const IcebreakerResults: React.FC<Props> = ({ messages }) => {
  const copy = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Resultados</h2>
      <ul className="space-y-4">
        {messages.map((msg, i) => (
          <li
            key={i}
            className="relative p-4 bg-gray-50 border border-gray-200 rounded-lg
                       hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <p className="whitespace-pre-line">{msg}</p>
            <button type='button'
              onClick={() => copy(msg)}
              className="absolute top-3 right-3 p-1 rounded-full
                         hover:bg-gray-200 transition"
              title="Copiar al portapapeles"
            >
              <ClipboardIcon className="w-5 h-5 text-gray-600" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IcebreakerResults
