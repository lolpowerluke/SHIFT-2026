// ──────────────────────────────────────────────────────────────
//  WINNAARS — vul hier na de show in wie welke prijs heeft gewonnen
// ──────────────────────────────────────────────────────────────
//
// Voor elk van de 4 prijzen: zet `projectId` op het id van het
// winnende project. Het id is het getal achteraan de project-URL,
// bv.  /project/after-dark-12  ->  projectId: 12
//
// Laat `projectId: null` staan om dat badge (nog) niet te tonen.

export const WINNERS = [
	{ prize: "PUBLIEKSPRIJS", projectId: 7 },
	{ prize: "JURYPRIJS", projectId: null },
	{ prize: "INNOVATIEPRIJS", projectId: null },
	{ prize: "IMPACTPRIJS", projectId: null },
];

// Geeft de prijsnaam terug voor een project, of null als het niet won.
export function getPrizeForProject(projectId) {
	if (projectId == null) return null;
	const match = WINNERS.find(
		(w) => w.projectId != null && String(w.projectId) === String(projectId),
	);
	return match ? match.prize : null;
}
