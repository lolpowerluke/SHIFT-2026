import "../css/cssComponents/throbber.css"
export default function Throbber(){
    return (
        <div className="throbberWrap">
            <img className="throbber" src="/favicon/shift_icon.svg" alt="Shift Throbber"/>
            <div className="throbberShadow"></div>
        </div>
    )
}