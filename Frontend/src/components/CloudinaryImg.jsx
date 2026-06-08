const DEFAULT_WIDTHS = [640, 1280, 1920];

function buildCloudinaryUrl(CLOUDINARY_CLOUD_NAME, imagePath, width) {

    // TODO: write hook to fetch from backend

    if (!CLOUDINARY_CLOUD_NAME || !imagePath) {
        return "";
    }

    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_${width}/${imagePath}`;
}

export default function CloudinaryImage({
                                            imagePath,
                                            alt = "",
                                            widths = DEFAULT_WIDTHS,
                                            sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1920px",
                                            loading = "lazy",
                                            className,
                                        }) {
    const largestWidth = widths.at(-1);
    const src = buildCloudinaryUrl(imagePath, largestWidth);
    const srcSet = widths
        .map((width) => `${buildCloudinaryUrl(imagePath, width)} ${width}w`)
        .join(", ");

    if (!imagePath) {
        return null;
    }

    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={alt}
            loading={loading}
            className={className}
        />
    );
}