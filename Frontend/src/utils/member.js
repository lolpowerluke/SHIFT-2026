import { getCloudinaryUrl } from "./cloudinary.js";

/**
 * Full display name for a member object.
 * Falls back to email, then "Onbekend".
 */
export function memberDisplayName(m) {
  return (
    [m.firstname, m.lastname].filter(Boolean).join(" ") ||
    m.email ||
    "Onbekend"
  );
}

/**
 * Avatar URL for a member. Falls back to /assets/user.png.
 */
export function memberAvatar(m) {
  return getCloudinaryUrl(m.picture) ?? "/assets/user.png";
}

/**
 * Map a raw API project object to the shape ProjectCard expects.
 */
export function mapProject(p) {
  return {
    id: p.id,
    title: p.name,
    category: p.course,
    image:
      getCloudinaryUrl(p.media?.[0]) ??
      getCloudinaryUrl(p.images?.[0]) ??
      "/assets/imageCard.png",
    students: (p.members ?? []).map((m) => ({
      name: memberDisplayName(m),
      avatar: memberAvatar(m),
    })),
  };
}
