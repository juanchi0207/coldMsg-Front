import React, { useState } from 'react';
import Spinner from './Spinner';
import IcebreakerResults from "./IceBreakerResults"
import { generateIcebreakers } from '../api/generateIceBreakers';

interface FormValues {
  senderProfile: string;
  recipientProfile: string;
  language: string;
  problem: string;
  solution: string;
}

const IcebreakerForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    senderProfile: '',
    recipientProfile: '',
    language: '',
    problem: '',
    solution: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessages([]);

    const { senderProfile, recipientProfile, language, problem, solution } = values;

    // Validaciones básicas
    if (!senderProfile || !recipientProfile || !language || !problem || !solution) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (
      !senderProfile.includes('linkedin.com') ||
      !recipientProfile.includes('linkedin.com')
    ) {
      setError('Asegúrate de que las URLs sean de LinkedIn.');
      return;
    }

    setIsLoading(true);
    try {
      const msgs = await generateIcebreakers(values);
      setMessages(msgs);
    } catch (err: any) {
      setError(err.message || 'Error al generar mensajes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <label className="block mb-2 font-medium">Perfil emisor</label>
      <input
        type="url"
        name="senderProfile"
        value={values.senderProfile}
        onChange={handleChange}
        placeholder="https://www.linkedin.com/in/tu-perfil"
        required
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />

      <label className="block mb-2 font-medium">Perfil destinatario</label>
      <input
        type="url"
        name="recipientProfile"
        value={values.recipientProfile}
        onChange={handleChange}
        placeholder="https://www.linkedin.com/in/destinatario"
        required
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />

      <label className="block mb-2 font-medium">Idioma</label>
      <select
        name="language"
        value={values.language}
        onChange={handleChange}
        required
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      >
        <option value="">Seleccione un idioma...</option>
        <option>Español (ARG)</option>
        <option>Inglés</option>
        <option>Portugués</option>
        <option>Francés</option>
      </select>

      <label className="block mb-2 font-medium">Problema que resolvés</label>
      <textarea
        name="problem"
        value={values.problem}
        onChange={handleChange}
        placeholder="Describe el problema que ayudas a resolver"
        required
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 h-24"
      />

      <label className="block mb-2 font-medium">Solución que ofrecés</label>
      <textarea
        name="solution"
        value={values.solution}
        onChange={handleChange}
        placeholder="Describe la solución que ofreces"
        required
        className="w-full mb-4 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 h-24"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? <Spinner /> : 'Generar mensajes'}
      </button>

      {messages.length > 0 && (
        <div className="mt-6">
          <IcebreakerResults messages={messages} />
        </div>
      )}
    </form>
  );
};

export default IcebreakerForm;
