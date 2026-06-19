import { useState } from "react";
import s from "./news.module.css"
import NewsExcerpt from "../../components/newsExcerpt/NewsExcerpt.jsx";
import Fotogallery from "../../components/fotoGallery/FotoGallery"
import { defaultItems } from "../../components/fotoGallery/FotoGallery";

const VIDEO_ID = "suQst6cwW4A";

const articles = [
    {
        articleLink: "https://www.bruzz.be/videoreeks/said-city/video-nieuwe-apps-en-vr-games-de-techstudenten-van-erasmus-stellen-hun-creaties-tentoon",
        excerpt: "Tijdens het Shift Festival tonen de derdejaars van de opleiding Multimedia en Creatieve Technologie aan de Erasmushogeschool aanstaande vrijdag hun eindwerken. Dat gaat van mobiele en webapps tot nieuwe games, VR-ervaringen en browser-extensies die willen informeren of beschermen.",
        img: "https://wmimages.bruzz.be/styles/e22cb3eafdd54a57844ed34d1de56912a49c9848/2021-04/logo_5jaarbruzz_dossier.png?style=W3sicmVzaXplIjp7ImZpdCI6Imluc2lkZSIsIndpZHRoIjoxMjAwLCJoZWlnaHQiOjYzMCwid2l0aG91dEVubGFyZ2VtZW50Ijp0cnVlfX1d&sign=86a12e64ef4a036f494606982a323054ab3e894aa65c7d78d84025b25311a54d",
        imgTitle: "Bruzz",
        title: "Nieuwe apps en VR-games: de techstudenten van Erasmus stellen hun creaties tentoon"
    }, {
        articleLink: "https://www.ringtv.be/jeugd-onderwijs/studenten-erasmushogeschool-brussel-koppelen-technologie-aan-maatschappelijke",
        excerpt: "Voor de derde keer organiseren studenten van de Erasmushogeschool Brussel het Shift-festival. De expo op Campus Kaai toont 34 innovatieve eindwerken van de laatstejaars Multimedia en Creatieve Technologie aan het grote publiek en aan potentiële werkgevers.",
        img: "/assets/ringTv_logo.png",
        imgTitle: "RingTV",
        title: "Studenten Erasmushogeschool Brussel koppelen technologie aan maatschappelijke vraagstukken op Shift-festival"
    },
]

const wordDoc = {doc: "/Persbericht SHIFT festival_180626.docx_3077.docx", filename: "Shift_Festival_persbericht.docx"}

async function handleDownloadAll(items) {
    for (const item of defaultItems) {
        const a = document.createElement("a");
        a.href = item.src;
        a.download = item.filename;
        a.click();
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

function handleDownloadWord(doc, filename) {
    const a = document.createElement("a");
    a.href = doc;
    a.download = filename;
    a.click();
}

export default function News() {
    const [playing, setPlaying] = useState(false);

    return (
        <>
            <div className={s.heroPers}>
                <img src="/assets/icons/persIconOrange.png" alt="persIcon" />
                <h1>Pers &<br/>media</h1>
            </div>
            <div className={`ctx ${s.newsSection}`}>
                {articles.map((a, i) =>
                    <NewsExcerpt articleLink={a.articleLink} excerpt={a.excerpt} img={a.img} imgTitle={a.imgTitle}
                                 title={a.title}/>
                )
                }
            </div>
            <div className="altBg">

                <div className={`${s.mediaSection} ctx`}>
                   
                    <div className={`${s.flexRow}`}>
                        {/*    TODO: add text + img    */}
                        <div className={s.mediaPart}>
                            <h2>Media</h2>
                            <h3>Download ons persbericht</h3>
                            <button onClick={() => handleDownloadWord(wordDoc.doc, wordDoc.filename)} style={{display: "flex", flexDirection: "row"}}>Download <img
                                src="/assets/BlueDownloadFolderPDF.svg"
                                style={{height: "2rem", margin: "0 5px 0 1rem"}}/></button>
                        </div>
                        <img src="/assets/persMediaImage.png" alt="SHIFT FESTIVAL 2026"/>
                    </div>
                    <h3>Een beeld zegt meer dan 1000 woorden</h3>
                    <p>Bekijk enkele sfeerbeelden.</p>
                    <div className={s.galleryLayout}>
                        <Fotogallery/>
                    </div>
                    <div className={s.downloadZip}>
                    <p><b>Download alle beelden van SHIFT FESTIVAL 2026.</b></p>
                    <button onClick={() => handleDownloadAll(defaultItems.src, defaultItems.filename)} style={{display: "flex", flexDirection: "row"}}>Download <img
                        src="/assets/download_icon.svg" style={{height: "2rem", margin: "0 5px 0 1rem"}}/></button>
                    </div>
                </div>
            </div>

            <div className={`ctx ${s.voorproefje}`}>
                <h2>EEN KLEIN VOORPROEFJE VAN SHIFT</h2>
                <div className={s.videoHolder}>
                        <div className={s.videoWrapper}>
                           <iframe src="https://ehb-my.sharepoint.com/personal/yarno_vandenplas_student_ehb_be/_layouts/15/embed.aspx?UniqueId=32110fa6-e65a-4684-aa2d-1e43f00d9a79&embed=%7B%22ust%22%3Atrue%2C%22hv%22%3A%22CopyEmbedCode%22%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create" width="853" frameborder="0" scrolling="no" allowfullscreen title="SuperCut_Done.mp4"></iframe>
                        </div>
                </div>
            </div>
        </>
    )
}