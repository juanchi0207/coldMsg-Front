import type { IcebreakerRequest, IcebreakerResponse } from '../types/icebreaker';

const API_BASE = import.meta.env.VITE_API_URL;

export async function generateIcebreakers(
  payload: IcebreakerRequest
): Promise<string[]> {
    console.log('Payload:', payload);
    console.log('API_BASE:', API_BASE);
  const res = await fetch(`${API_BASE}/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idioma: payload.language,
      senderProfile: payload.senderProfile,
      recipientProfile: payload.recipientProfile,
      problem: payload.problem,
      solution: payload.solution,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Error al generar mensajes');
  }

  const data: IcebreakerResponse = await res.json();
  return data.messages;
}
