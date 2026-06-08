export function getCloudinaryUrl(asset) {
	if (!asset) return null;
	if (typeof asset === "string") return asset;
	if (asset.url) return asset.url;
	if (asset.path && asset.cloud_name)
		return `https://res.cloudinary.com/${asset.cloud_name}/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1920/${asset.path}`;
	return null;
}

export function getYoutubeEmbedUrl(url) {
	if (!url) return null;
	const shortMatch = url.match(/youtu\.be\/([^?]+)/);
	if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
	const longMatch = url.match(/[?&]v=([^&]+)/);
	if (longMatch) return `https://www.youtube.com/embed/${longMatch[1]}`;
	return null;
}
