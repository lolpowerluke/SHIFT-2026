import FilePill from "../filePill/FilePill.jsx";
import s from "./ImagePreviewField.module.css";

/**
 * File input that shows a preview (or existing picture) once a file is chosen.
 *
 * @param {{
 *   id: string,
 *   label: string,
 *   hint?: string,
 *   accept?: string,
 *   file: File | null,
 *   existingPicture: { url: string, name: string } | null,
 *   onFileChange: (file: File | null) => void,
 *   onClearFile: () => void,
 *   onClearExisting: () => void,
 * }} props
 */
export default function ImagePreviewField({
  id,
  label,
  hint,
  accept = "image/*",
  file,
  existingPicture,
  onFileChange,
  onClearFile,
  onClearExisting,
}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      {hint && <small>{hint}</small>}

      {file ? (
        <>
          <FilePill name={file.name} onClear={onClearFile} />
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className={s.previewImg}
          />
        </>
      ) : existingPicture ? (
        <>
          <FilePill name={existingPicture.name} onClear={onClearExisting} />
          <img
            src={existingPicture.url}
            alt={existingPicture.name}
            className={s.previewImg}
          />
        </>
      ) : (
        <input
          type="file"
          accept={accept}
          id={id}
          name={id}
          onChange={(e) => onFileChange(e.target.files[0] ?? null)}
        />
      )}
    </div>
  );
}
