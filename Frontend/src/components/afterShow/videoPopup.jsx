import { } from "react";

function IframePopup({ src, title, onClose }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 }}>
      <div style={{ background: "#27becc", borderRadius:8, width:"80%", maxWidth:600, overflow:"hidden" }}>
          <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 14px", borderBottom:"1px solid #eee" }}>
          <span>{title}</span>
          <button onClick={onClose}>&times;</button>
        </div>
        <iframe src={"https://www.youtube.com/embed/suQst6cwW4A?si=NWIGszS2Pp3b0Jpb"} title={"Aftermovie"} style={{ width:"100%", aspectRatio: 16/9, border:"none", display:"block" }} />
      </div>
    </div>
  );
}

export default IframePopup;