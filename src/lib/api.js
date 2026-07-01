export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Thin wrapper around fetch that always sends cookies, JSON-encodes plain
 * object bodies (leaves FormData alone so the browser sets the multipart
 * boundary itself), and throws an Error with the server's message on
 * non-2xx responses so callers can just try/catch.
 */
export async function apiFetch(path, { method = 'GET', body, headers = {}, ...rest } = {}) {
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: 'include',
    headers: isFormData ? headers : { 'Content-Type': 'application/json', ...headers },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    ...rest,
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // No JSON body (e.g. 204) — that's fine.
  }

  if (!res.ok) {
    const error = new Error((data && data.message) || `Request failed with status ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
