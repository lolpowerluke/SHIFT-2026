const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Authenticated fetch wrapper. Reads JWT from localStorage.
 *
 * @param {string} path  Path relative to VITE_API_URL (e.g. "/project/")
 * @param {RequestInit} opts
 * @returns {Promise<any>} Parsed JSON response
 */
export async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("token");
  const isFormData = opts.body instanceof FormData;
  const res = await fetch(`${BASE_URL}${path}`, {
    ...opts,
    headers: {
      ...(!isFormData ? { "Content-Type": "application/json" } : {}),
      Authorization: `Bearer ${token}`,
      ...(opts.headers ?? {}),
    },
  });
  return res.json();
}

/**
 * Decode the JWT payload from localStorage.
 * Returns null if missing or malformed.
 *
 * @returns {{ id: string, role: string } | null}
 */
export function getTokenPayload() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}
