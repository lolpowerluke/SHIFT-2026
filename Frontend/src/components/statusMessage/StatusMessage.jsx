/**
 * Renders loading / error / null guards inline.
 * Returns null when there's nothing to show (data is ready).
 *
 * @param {{ loading: boolean, error: string|null, className?: string }} props
 *
 * Usage:
 *   const guard = <StatusMessage loading={loading} error={error} />;
 *   if (guard) return guard;
 */
export default function StatusMessage({ loading, error, className = "ctx" }) {
  if (loading) return <p className={className}>Laden...</p>;
  if (error) return <p className={className}>Fout: {error}</p>;
  return null;
}
