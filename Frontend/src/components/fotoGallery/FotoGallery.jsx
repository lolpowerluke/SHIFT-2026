import s from "./FotoGallery.module.css";

export const defaultItems = [
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 1", filename: "shift-festival-1.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 2", filename: "shift-festival-2.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 3", filename: "shift-festival-3.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 4", filename: "shift-festival-4.png" },
    { src: "/assets/heroContent/infoHero.jpg", alt: "Gallery image 5", filename: "shift-festival-5.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 6", filename: "shift-festival-6.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 7", filename: "shift-festival-7.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 8", filename: "shift-festival-8.png" },
    { src: "/assets/gallery_image.jpg", alt: "Gallery image 9", filename: "shift-festival-9.png" },
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