import s from "./WinnerCard.module.css";

/**
 * Award badge shown on a winning project, e.g. "WINNAAR PUBLIEKPRIJS".
 *
 * @param {string} prize      The prize label (e.g. "PUBLIEKPRIJS", "JURYPRIJS").
 * @param {string} className  Optional extra class, handy for positioning the
 *                            badge as an overlay on a project card.
 */
export default function WinnerCard({ prize = "PUBLIEKPRIJS", className = "" }) {
	return (
		<div
			className={`${s.badge} ${className}`}
			role="img"
			aria-label={`Winnaar ${prize}`}
		>
			<img
				src="/assets/icons/tropheeOrange.svg"
				alt=""
				aria-hidden="true"
				className={s.trophy}
			/>
			<span className={s.text}>
				<span className={s.line}>WINNAAR</span>
				<span className={s.line}>{prize}</span>
			</span>
		</div>
	);
}
