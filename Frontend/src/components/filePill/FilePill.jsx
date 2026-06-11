import s from "./FilePill.module.css";

/**
 * Pill showing a filename with a clear (×) button.
 *
 * @param {{ name: string, onClear: () => void }} props
 */
export default function FilePill({ name, onClear }) {
  return (
    <span className={s.file}>
      {name}
      <button
        type="button"
        onClick={onClear}
        className={s.clear}
        aria-label="Verwijder"
      >
        ×
      </button>
    </span>
  );
}
