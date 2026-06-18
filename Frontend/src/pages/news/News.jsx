import s from "./news.module.css"
import Fotogallery from "../../components/fotoGallery/FotoGallery"

export default function News() {
    return (
        <>
        <div className={s.newsDiv}>
            <h1>Pers &<br/>media</h1>
        </div>
        <div className={s.galleryLayout}>
            <Fotogallery/>
        </div>
        </>
    )
}