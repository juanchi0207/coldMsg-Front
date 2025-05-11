import React from 'react';

interface Props {
  messages: string[];
}

const IcebreakerResults: React.FC<Props> = ({ messages }) => (
  <div>
    <h2 className="text-xl font-semibold mb-4">Mensajes sugeridos:</h2>
    <ul className="space-y-3">
      {messages.map((msg, idx) => (
        <li
          key={idx}
          className="p-4 bg-gray-100 rounded border border-gray-200"
        >
          {msg}
        </li>
      ))}
    </ul>
  </div>
);

export default IcebreakerResults;
