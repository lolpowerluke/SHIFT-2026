export default function SocialLinks({ className = "" }) {
	return (
		<div className={`socialLinks${className ? ` ${className}` : ""}`}>
			<a
				href="https://www.facebook.com/erasmushogeschool/?locale=nl_BE"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="/assets/logos/facebook_black.svg"
					height="60"
					alt="Facebook Icon"
					loading="lazy"
				/>
			</a>
			<a
				href="https://be.linkedin.com/school/erasmushogeschool-brussel/?trk=nav_type_overview"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="/assets/logos/linkedin_black.svg"
					height="60"
					alt="Linkedin Icon"
					loading="lazy"
				/>
			</a>
			<a
				href="https://www.instagram.com/multimedia.ehb/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="/assets/logos/instagram_Glyph_Black.svg"
					height="60"
					alt="Instagram Icon"
					loading="lazy"
				/>
			</a>
			<a
				href="https://www.tiktok.com/@multimedia.ehb"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="/assets/logos/tiktok_icon_black.svg"
					height="60"
					alt="TikTok Icon"
					loading="lazy"
				/>
			</a>
			<a
				href="https://www.erasmushogeschool.be/nl"
				target="_blank"
				rel="noopener noreferrer"
			>
				<img
					src="/assets/logos/EhbLogoColor.svg"
					height="60"
					alt="EhB Logo"
					loading="lazy"
				/>
			</a>
		</div>
	);
}
