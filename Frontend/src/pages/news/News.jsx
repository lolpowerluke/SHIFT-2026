import s from "./news.module.css"
import NewsExcerpt from "../../components/newsExcerpt/NewsExcerpt.jsx";
import Fotogallery from "../../components/fotoGallery/FotoGallery"

const articles = [
    {
        articleLink: "lol",
        excerpt: "lulz",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.-Ho2iOlOCWajrep95f39nwHaHE%3Fpid%3DApi&f=1&ipt=7fbc3a71fb216042c796b3b9d0da62164b5cf552068a21e8618c134e54c9cf1b&ipo=images",
        imgTitle: "lolz",
        title: "fu"
    },
]

export default function News() {
    return (
        <>
            <div className={`ctx ${s.newsSection}`}>
                <h1>Pers &<br/>media</h1>
                {articles.map((a, i) =>
                    <NewsExcerpt articleLink={a.articleLink} excerpt={a.excerpt} img={a.img} imgTitle={a.imgTitle}
                                 title={a.title}/>
                )
                }
            </div>
            <div className="altBg">
                <div className={`${s.mediaSection} ctx`}>
                    <h2>Een beeld zegt meer dan 1000 woorden</h2>
                    <p>Bekijk enkele sfeerbeelden.</p>
                    <div className={s.galleryLayout}>
                        <Fotogallery/>
                    </div>

                </div>
            </div>
        
        </>
    )
}