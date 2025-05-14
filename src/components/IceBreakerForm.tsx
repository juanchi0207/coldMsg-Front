import React from 'react';
import Spinner from './Spinner';
import IcebreakerResults from './IceBreakerResults';

interface IceBreakerFormProps {
  values: {
    senderProfile: string;
    recipientProfile: string;
    language: string;
    problem: string;
    solution: string;
  };
  error: string | null;
  isLoading: boolean;
  messages: string[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function IceBreakerForm({
  values,
  error,
  isLoading,
  messages,
  handleChange,
  handleSubmit,
}: IceBreakerFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition-colors"
      >
        {error && (
          <p role="alert" className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <div>
          <label
            htmlFor="senderProfile"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tu perfil LinkedIn
          </label>
          <input
            id="senderProfile"
            type="url"
            name="senderProfile"
            value={values.senderProfile}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/tu-perfil"
            required
            className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="recipientProfile"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Perfil LinkedIn destinatario
          </label>
          <input
            id="recipientProfile"
            type="url"
            name="recipientProfile"
            value={values.recipientProfile}
            onChange={handleChange}
            placeholder="https://www.linkedin.com/in/destinatario"
            required
            className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="language"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Idioma
          </label>
          <select
            id="language"
            name="language"
            value={values.language}
            onChange={handleChange}
            required
            className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
          >
            <option value="" className="text-gray-500 dark:text-gray-400">
              Seleccione un idioma...
            </option>
            <option>Español (ARG)</option>
            <option>Español (ESP)</option>
            <option>Inglés (UK)</option>
            <option>Portugués</option>
            <option>Francés</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="problem"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Problema que encontraste
          </label>
          <textarea
            id="problem"
            name="problem"
            value={values.problem}
            onChange={handleChange}
            placeholder="Describe el problema que encontraste"
            required
            rows={3}
            className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="solution"
            className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Solución que ofrecés
          </label>
          <textarea
            id="solution"
            name="solution"
            value={values.solution}
            onChange={handleChange}
            placeholder="Describe la solución que ofreces"
            required
            rows={3}
            className="w-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary-light dark:hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <Spinner /> : 'Generar mensajes'}
        </button>
      </form>

      {/* Resultados / Placeholder */}
      <div className="min-h-[300px] flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 transition-colors">
        {isLoading ? (
          <div className="text-center">
            <Spinner />
            <p className="mt-2 text-gray-500 dark:text-gray-400">Generando mensajes...</p>
          </div>
        ) : messages.length > 0 ? (
          <IcebreakerResults messages={messages} />
        ) : (
          <p className="text-gray-400 dark:text-gray-500">Aquí aparecerán tus mensajes</p>
        )}
      </div>
    </div>
  );
}
