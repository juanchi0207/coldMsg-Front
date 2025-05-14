import React, { useState, useEffect } from 'react';
import IcebreakerForm from './components/IceBreakerForm';
import { Sun, Moon } from 'lucide-react';

// Base URL para las llamadas a la API, configurada en .env
const API_BASE = import.meta.env.VITE_API_URL;

interface Values {
  senderProfile: string;
  recipientProfile: string;
  language: string; // se mapea a "idioma"
  problem: string;
  solution: string;
}

export default function App() {
  const [values, setValues] = useState<Values>({
    senderProfile: '',
    recipientProfile: '',
    language: '',
    problem: '',
    solution: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Sincroniza clase dark en <html> y guarda en localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const payload = {
        idioma: values.language,
        senderProfile: values.senderProfile,
        recipientProfile: values.recipientProfile,
        problem: values.problem,
        solution: values.solution,
      };

      const response = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Error al generar mensajes');
      }

      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral dark:bg-gray-900 flex flex-col">
      <header className="bg-primary dark:bg-gray-800 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Cold Message Generator</h1>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition focus:outline-none"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-yellow-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-200" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <IcebreakerForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
            messages={messages}
          />
        </div>
      </main>

      <footer className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 Juan Sampieri ·{' '}
        <a href="https://github.com/juanchi0207" className="underline">
          GitHub
        </a>
      </footer>
    </div>
  );
}
