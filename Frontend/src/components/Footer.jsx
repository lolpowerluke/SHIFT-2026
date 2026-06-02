import React from 'react';

export default function Footer()
{
    return (
        <footer>
            <hr/>
            <div className="text-info">
                <p>
                    Erasmushogeschool Brussel <br/>
                    Campus Kaai<br/>
                    Nijverheidskaai 170 <br/>
                    1070 Anderlecht
                </p>
            </div>
            <div className="socialLinks">
                <a href="https://www.instagram.com/erasmushogeschool/">
                    <img
                        src="/assets/logos/instagram_Glyph_White.svg"
                        height="35"
                        alt="Instagram Icon"
                    />
                </a>
                <a href="https://www.tiktok.com/@erasmushogeschool">
                    <img src="/tiktok_icon_white.svg" height="40" alt="TikTok Icon"/>
                </a>
                <a href="https://www.erasmushogeschool.be/nl">
                    <img src="/assets/logos/ehb_wit.png" height="60" alt="EhB Logo"/>
                </a>
                <a href="https://www.facebook.com/erasmushogeschool/?locale=nl_BE">
                    <img
                        src="/assets/logos/facebook_white.svg"
                        height="40"
                        alt="Facebook Icon"
                    />
                </a>
                <a
                    href="https://be.linkedin.com/school/erasmushogeschool-brussel/?trk=nav_type_overview"
                >
                    <img
                        src="/assets/logos/linkedin_white.svg"
                        height="40"
                        alt="Linkedin Icon"
                    />
                </a>
            </div>
            <small className="footerCopyright">
                2026 SHIFT — Erasmushogeschool Brussel. <br/>
                Alle rechten voorbehouden.
            </small>
        </footer>
    )
}