const WIDTHS = [640, 1280, 1920];
const SIZES = "(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1920px";

function buildCloudinaryUrl(cloudName, imagePath, width) {

    if (!cloudName || !imagePath) {
        return "";
    }

    return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_${width}/${imagePath}`;
}

export default function CloudinaryImg({cloudName, imagePath, alt = ""}) {
    if (!cloudName || !imagePath) {
        return null;
    }

    const largestWidth = WIDTHS.at(-1);
    const src = buildCloudinaryUrl(cloudName, imagePath, largestWidth);
    console.log("src");
    const srcSet = WIDTHS
        .map((width) => `${buildCloudinaryUrl(cloudName, imagePath, width)} ${width}w`)
        .join(", ");
    return (
        <img
            src={src}
            srcSet={srcSet}
            sizes={SIZES}
            alt={alt}
            loading="lazy"
        />
    );
}