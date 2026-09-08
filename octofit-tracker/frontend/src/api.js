const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export function recordsFrom(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { signal });
  if (!response.ok) throw new Error(`Unable to load ${endpoint} (${response.status})`);
  return recordsFrom(await response.json());
}