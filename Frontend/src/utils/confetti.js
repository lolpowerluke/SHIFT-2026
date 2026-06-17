import confetti from "canvas-confetti";

const SHIFT_COLORS = ["#fbf8cd", "#fba927"];

export function fireVoteConfetti() {
	const defaults = {
		colors: SHIFT_COLORS,
		disableForReducedMotion: true,
		zIndex: 5,
	};

	confetti({
		...defaults,
		particleCount: 12,
		spread: 70,
		startVelocity: 38,
		scalar: 1.1,
		origin: { x: 0.5, y: 0.65 },
	});

	const end = Date.now() + 350;
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
