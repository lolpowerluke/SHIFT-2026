export const icsContent = `
	BEGIN:VCALENDAR
	VERSION:2.0
	PRODID:-//Shift//EN
	BEGIN:VEVENT
	UID:${Date.now()}@ehb.be
	DTSTAMP:${new Date().toISOString().replace(/[-:.]/g, "").slice(0, 15)}Z
	DTSTART:20260619T170000+0200
	DTEND:20260619T210000+0200
	SUMMARY:SHIFT - Save the Date
	DESCRIPTION:Our third year students are showing off their final projects! Join us to see what they are.
	LOCATION:Nijverheidskaai 170, 1070 Anderlecht
	END:VEVENT
	END:VCALENDAR`;
