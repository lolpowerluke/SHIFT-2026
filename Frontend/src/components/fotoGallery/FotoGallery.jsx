import s from "./FotoGallery.module.css";

const defaultItems = [
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 1" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 2" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 3" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 4" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 5" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 6" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 7" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 8" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 9" },
];

export default function Fotogallery({ items = defaultItems }) {
    return (
        <>
            {items.map((item, i) => (
                <div key={i} className={s.gallery}>
                    <div>
                        <img src={item.src} alt={item.alt} />
                    </div>
                    <button>
                        Download <img src="/assets/BlueDownloadFolderPDF.svg" alt="" />
                    </button>
                </div>
            ))}
        </>
    );
}