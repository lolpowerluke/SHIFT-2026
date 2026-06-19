import s from './NewsExcerpt.module.css';

export default function NewsExcerpt({img, imgTitle, title, excerpt, articleLink}) {
    return (
        <div className={s.wrapper}>
            <img src={img} alt={imgTitle}/>
            <div className={s.txt}>
                <h3 className={s.title}>{title}</h3>
                <p className={s.excerpt}>{excerpt}</p>
                <a href={articleLink} className="linkBtn" target="_blank" rel="noopener noreferrer">Meer info <img src="/assets/arrow_back.svg" alt={"To the article"} /></a>
            </div>
        </div>
)
}