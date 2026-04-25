const API_URL =
  (import.meta as ImportMeta & { env: Record<string, string> }).env.VITE_API_URL ??
  'http://localhost:5000/api/v1';

/**
 * Generic fetch wrapper that targets the backend API.
 * Throws an Error when the response status is not 2xx.
 */
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `API error: ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return res.json() as Promise<T>;
}
