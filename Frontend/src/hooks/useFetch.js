import { useState, useEffect } from "react";

/**
 * Generic data-fetching hook.
 *
 * @param {string|null} url  Full URL to fetch. Pass null to skip.
 * @param {RequestInit}  opts Optional fetch options.
 * @returns {{ data, loading, error }}
 *
 * Usage:
 *   const { data, loading, error } = useFetch(`${API}/project/${id}`);
 */
export function useFetch(url, opts = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!url);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url, opts)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((d) => { if (!cancelled) setData(d); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
