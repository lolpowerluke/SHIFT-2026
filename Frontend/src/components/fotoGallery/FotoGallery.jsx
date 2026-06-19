import s from "./FotoGallery.module.css";

export const defaultItems = [
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 1", filename: "shift-festival-1.png" },
    { src: "/assets/galleryPlaceholder2.jpg", alt: "Gallery image 2", filename: "shift-festival-2.jpg" },
    { src: "/assets/galleryPlaceholder3.jpg", alt: "Gallery image 3", filename: "shift-festival-3.jpg" },
    { src: "/assets/galleryPlaceholder4.jpg", alt: "Gallery image 4", filename: "shift-festival-4.jpg" },
    { src: "/assets/galleryPlaceholder5.jpg", alt: "Gallery image 5", filename: "shift-festival-5.jpg" },
    { src: "/assets/galleryPlaceholder6.jpg", alt: "Gallery image 6", filename: "shift-festival-6.jpg" },
    { src: "/assets/galleryPlaceholder7.jpg", alt: "Gallery image 7", filename: "shift-festival-7.jpg" },
    { src: "/assets/galleryPlaceholder8.jpg", alt: "Gallery image 8", filename: "shift-festival-8.jpg" },
    { src: "/assets/galleryPlaceholder9.jpg", alt: "Gallery image 9", filename: "shift-festival-9.jpg" },
];


function handleDownload(src, filename) {
    const a = document.createElement("a");
    a.href = src;
    a.download = filename;
    a.click();
}


export default function Fotogallery({ items = defaultItems }) {

    return (
        <>
            {items.map((item, i) => (
                <div key={i} className={s.gallery}>
                    <div>
                        <img src={item.src} alt={item.alt} />
                    </div>
                    <button onClick={() => handleDownload(item.src, item.filename)}>
                        Download <img src="/assets/BlueDownloadFolderPDF.svg" alt="" />
                    </button>
                </div>
                
            ))}
        </>
    );
}