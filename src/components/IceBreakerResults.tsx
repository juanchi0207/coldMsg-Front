import React from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  messages: string[];
}

const IcebreakerResults: React.FC<Props> = ({ messages }) => {
  const cleanMessage = (text: string) => {
    if (text.startsWith('"') && text.endsWith('"')) {
      return text.slice(1, -1);
    }
    return text;
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado!');
  };

  return (
    <>
      {/* Toaster para mostrar notificaciones */}
      <Toaster position="top-right" />
      <div>
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Resultados
        </h2>
        <ul className="space-y-6">
          {messages.map((msg, i) => {
            const displayMsg = cleanMessage(msg);
            return (
              <li
                key={i}
                className="relative p-6 pr-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-colors"
              >
                <div className="prose whitespace-pre-line text-gray-900 dark:text-gray-100">
                  {displayMsg}
                </div>
                <button
                  onClick={() => copy(displayMsg)}
                  className="absolute top-4 right-4 p-2 bg-neutral dark:bg-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none"
                  aria-label="Copiar mensaje"
                >
                  <ClipboardIcon className="w-5 h-5 text-gray-500 dark:text-gray-200" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default IcebreakerResults;