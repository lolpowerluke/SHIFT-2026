export default function ClockIcon({s, hour, minute, size = 24}) {
    function clockHandDegrees(hours, minutes) {
        return {
            minute: minutes * 6,
            hour: (hours % 12) * 30 + minutes * 0.5,
        };
    }

    const {hour: hDeg, minute: mDeg} = clockHandDegrees(hour, minute);
    const c = 50; // centre

    return (
        <div className={s.clock}>
            <svg viewBox="-2.5 -2.5 105 105" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
                <circle cx={c} cy={c} r={48} fill="transparent" stroke="currentColor" strokeWidth={5}/>
                <line x1={c} y1={c} x2={c} y2={20}
                      stroke="darkred" strokeWidth={5} strokeLinecap="round"
                      transform={`rotate(${hDeg} ${c} ${c})`}/>
                <line x1={c} y1={c} x2={c} y2={12}
                      stroke="currentColor" strokeWidth={5} strokeLinecap="round"
                      transform={`rotate(${mDeg} ${c} ${c})`}/>
                <circle cx={c} cy={c} r={2.5} fill="currentColor"/>
            </svg>
        </div>
    );
}