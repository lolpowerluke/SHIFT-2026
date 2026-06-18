export default function NewsExcerpt({img, imgTitle, title, excerpt, articleLink}) {
    return (
        <div>
            <img src{img} alt={imgTitle}/>
            <div>
                <h3>{title}</h3>
                <span>{excerpt}</span>
                <a href={articleLink} className="linkBtn" target="_blank" rel="noopener noreferrer">Meer info <img src="/assets/arrow_back.svg" alt={"To the article"} /></a>
            </div>
        </div>
)
}