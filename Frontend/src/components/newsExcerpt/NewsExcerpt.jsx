import s from './NewsExcerpt.module.css';

export default function NewsExcerpt({img, imgTitle, title, excerpt, articleLink}) {
    return (
        <div className={s.wrapper}>
            <img src={img} alt={imgTitle}/>
            <div>
                <h3>{title}</h3>
                <p>{excerpt}</p>
                <a href={articleLink} className="linkBtn" target="_blank" rel="noopener noreferrer">Meer info <img src="/assets/arrow_back.svg" alt={"To the article"} /></a>
            </div>
        </div>
)
}