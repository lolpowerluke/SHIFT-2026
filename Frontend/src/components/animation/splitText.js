// Tiny dependency-free text splitter.
// Wraps every word of a TEXT-ONLY element in an inline-block <span> so the
// words can be staggered individually.
//
// If the element contains child elements (e.g. <br>, <span>, <b>), we return
// null and the caller animates the element as a whole — this avoids destroying
// markup like line breaks in the hero title.
export function splitWords(el) {
	if (!el || el.children.length > 0) return null;

	const text = el.textContent;
	if (!text || !text.trim()) return null;

	el.textContent = "";
	const frag = document.createDocumentFragment();
	const words = [];

	for (const part of text.split(/(\s+)/)) {
		if (!part) continue;

		if (!part.trim()) {
			// keep the whitespace between words
			frag.appendChild(document.createTextNode(part));
			continue;
		}

		const span = document.createElement("span");
		span.textContent = part;
		span.style.display = "inline-block";
		span.style.willChange = "transform, opacity";
		frag.appendChild(span);
		words.push(span);
	}

	el.appendChild(frag);
	return words;
}
