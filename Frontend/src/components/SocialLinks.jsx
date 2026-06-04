import React from "react";

export default function SocialLinks() {
    return(
        <>
            <div className="socialLinks">
                <a href="https://www.instagram.com/multimedia.ehb/" target="_blank" rel="noopener noreferrer">
                    <img
                        src="/assets/logos/instagram_Glyph_White.svg"
                        height="35"
                        alt="Instagram Icon"
                    />
                </a>
                <a href="https://www.tiktok.com/@multimedia.ehb" target="_blank" rel="noopener noreferrer">
                    <img
                        src="/assets/logos/tiktok_icon_white.svg"
                        height="40"
                        alt="TikTok Icon"
                    />
                </a>
                <a href="https://www.erasmushogeschool.be/nl" target="_blank" rel="noopener noreferrer">
                    <img src="/assets/logos/ehb_geel.png" height="60" alt="EhB Logo" />
                </a>
                <a href="https://www.facebook.com/erasmushogeschool/?locale=nl_BE" target="_blank" rel="noopener noreferrer">
                    <img
                        src="/assets/logos/facebook_white.svg"
                        height="40"
                        alt="Facebook Icon"
                    />
                </a>
                <a href="https://be.linkedin.com/school/erasmushogeschool-brussel/?trk=nav_type_overview" target="_blank" rel="noopener noreferrer">
                    <img
                        src="/assets/logos/linkedin_white.svg"
                        height="40"
                        alt="Linkedin Icon"
                    />
                </a>
            </div>
        </>
    )
}