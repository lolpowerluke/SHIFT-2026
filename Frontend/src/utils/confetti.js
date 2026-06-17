import confetti from "canvas-confetti";

const SHIFT_COLORS = ["#fba927", "#fbf8cd"];

export function fireVoteConfetti() {
	const defaults = {
		colors: SHIFT_COLORS,
		disableForReducedMotion: true,
		zIndex: 9,
	};

	confetti({
		...defaults,
		particleCount: 25,
		spread: 75,
		startVelocity: 40,
		scalar: 1.1,
		origin: { x: 0.5, y: 0.65 },
	});

	const end = Date.now() + 500;
	(function frame() {
		confetti({
			...defaults,
			particleCount: 2,
			angle: 60,
			spread: 55,
			startVelocity: 55,
			origin: { x: 0, y: 0.7 },
		});
		confetti({
			...defaults,
			particleCount: 2,
			angle: 120,
			spread: 55,
			startVelocity: 55,
			origin: { x: 1, y: 0.7 },
		});

		if (Date.now() < end) {
			requestAnimationFrame(frame);
		}
	})();
}
