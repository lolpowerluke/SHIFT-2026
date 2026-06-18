import s from "./news.module.css"
import NewsExcerpt from "../../components/newsExcerpt/NewsExcerpt.jsx";
import Fotogallery from "../../components/fotoGallery/FotoGallery"

const articles = [
    {
        articleLink: "lol",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, cumque cupiditate debitis deleniti dolor, doloremque doloribus et excepturi harum impedit inventore laboriosam minima modi nihil odit quibusdam rerum totam ut. Asperiores atque nostrum perferendis porro vero. Accusamus, ad assumenda ducimus eaque eligendi est nostrum numquam optio. Adipisci, aliquid architecto aut, beatae commodi consequuntur deleniti dicta dolore doloribus ducimus ea enim eum expedita facilis hic labore laborum magnam maiores minima minus nemo nihil nobis nulla placeat quam quas quos sed soluta temporibus ut vitae voluptatem voluptatibus voluptatum. A at consequatur cumque fuga nisi nulla obcaecati temporibus! Aut excepturi mollitia natus sequi.",
        img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.-Ho2iOlOCWajrep95f39nwHaHE%3Fpid%3DApi&f=1&ipt=7fbc3a71fb216042c796b3b9d0da62164b5cf552068a21e8618c134e54c9cf1b&ipo=images",
        imgTitle: "lolz",
        title: "fu"
    },    {
        articleLink: "lol",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, cumque cupiditate debitis deleniti dolor, doloremque doloribus et excepturi harum impedit inventore laboriosam minima modi nihil odit quibusdam rerum totam ut. Asperiores atque nostrum perferendis porro vero. Accusamus, ad assumenda ducimus eaque eligendi est nostrum numquam optio. Adipisci, aliquid architecto aut, beatae commodi consequuntur deleniti dicta dolore doloribus ducimus ea enim eum expedita facilis hic labore laborum magnam maiores minima minus nemo nihil nobis nulla placeat quam quas quos sed soluta temporibus ut vitae voluptatem voluptatibus voluptatum. A at consequatur cumque fuga nisi nulla obcaecati temporibus! Aut excepturi mollitia natus sequi.",
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
                    <p><b>Download alle beelden van SHIFT FESTIVAL 2026.</b></p>
                    <button style={{display: "flex", flexDirection: "row"}}>Download <img
                        src="/assets/download_icon.svg" style={{height: "2rem", margin: "0 5px 0 1rem"}}/></button>
                </div>
            </div>

            <div className={`ctx ${s.voorproefje}`}>
                {/*    TODO: add video team's vid     */}
            </div>
        </>
    )
}