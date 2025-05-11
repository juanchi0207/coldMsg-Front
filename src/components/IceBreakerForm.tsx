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
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/** Perfil emisor */}
        <div>
          <label className="block mb-1 font-medium">Tu perfil</label>
          <input
            name="senderProfile" type="url" required
            value={values.senderProfile} onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-primary-light
                       transition"
          />
        </div>

        {/** Perfil destinatario */}
        <div>
          <label className="block mb-1 font-medium">Perfil destinatario</label>
          <input
            name="recipientProfile" type="url" required
            value={values.recipientProfile} onChange={handleChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-primary-light
                       transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/** Idioma */}
        <div>
          <label className="block mb-1 font-medium">Idioma</label>
          <select
            name="language" required
            value={values.language} onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-primary-light
                       transition"
          >
            <option value="">Seleccione...</option>
            <option>Español (ARG)</option>
            <option>Inglés</option>
            <option>Portugués</option>
            <option>Francés</option>
          </select>
        </div>

        {/** Generar botón */}
        <div className="flex items-end">
          <button
            type="submit" disabled={isLoading}
            className="w-full bg-primary text-white font-semibold py-2 rounded-lg
                       hover:bg-primary-light transition disabled:opacity-50"
          >
            {isLoading ? <Spinner /> : 'Generar mensajes'}
          </button>
        </div>
      </div>

      {/** Campos de texto */}
      <div className="grid gap-4">
        <div>
          <label className="block mb-1 font-medium">Problema</label>
          <textarea
            name="problem" required
            value={values.problem} onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-primary-light
                       transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Solución</label>
          <textarea
            name="solution" required
            value={values.solution} onChange={handleChange}
            rows={3}
            className="w-full border rounded-lg px-3 py-2
                       focus:outline-none focus:ring-2 focus:ring-primary-light
                       transition"
          />
        </div>
      </div>

      {messages.length > 0 && (
        <div className="mt-8">
          <IcebreakerResults messages={messages} />
        </div>
      )}
    </form>
  );
};

export default IcebreakerForm;
