const panel = '#10231a';
const text = '#f3f4ed';
const muted = '#8fa596';
const lime = '#c8f169';
const slots = [{ time: '18:00', x: 280 }, { time: '19:30', x: 324, selected: true }, { time: '21:00', x: 368 }];

export default function TopClubsArt() {
  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#426a4430">
        <ellipse cx="330" cy="208" rx="270" ry="150" />
        <ellipse cx="330" cy="208" rx="215" ry="182" transform="rotate(-24 330 208)" />
      </g>

      <g className="art-lift">
        <rect x="270" y="56" width="170" height="330" rx="30" fill="#6a935733" />
        <rect x="258" y="42" width="170" height="330" rx="30" fill={panel} />
        <rect x="266" y="50" width="154" height="314" rx="23" fill="#05100a" />
        <rect x="323" y="57" width="40" height="11" rx="5.5" fill="#000" />
        <text x="280" y="96" fontSize="14" fontWeight="600" fill={text}>Reservar</text>
        <text className="art-text" x="280" y="111" fontSize="8" fill={muted}>Sevilla · Fútbol 7</text>
        <rect x="280" y="122" width="126" height="80" rx="6" fill="#0f2e1c" stroke="#2f7a4b" />
        <g fill="none" stroke="#2f7a4b">
          <path d="M343 122v80M280 146h16v32h-16M406 146h-16v32h16" />
          <circle cx="343" cy="162" r="13" />
        </g>
        <circle cx="312" cy="150" r="2.6" fill={lime} />
        <circle cx="322" cy="181" r="2.6" fill={lime} />
        <circle cx="366" cy="142" r="2.6" fill={text} />
        <circle cx="374" cy="182" r="2.6" fill={text} />
        <text className="art-text" x="280" y="222" fontSize="8" fill={muted}>Hoy</text>
        {slots.map(slot => (
          <g key={slot.time}>
            <rect x={slot.x} y="230" width="38" height="22" rx="11" fill={slot.selected ? lime : '#13291d'} />
            <text className="art-text" x={slot.x + 19} y="244" fontSize="8" fontWeight={slot.selected ? 700 : 500} textAnchor="middle" fill={slot.selected ? '#0b1a12' : '#cfe0d3'}>{slot.time}</text>
          </g>
        ))}
        <text className="art-text" x="280" y="275" fontSize="8" fill="#cfe0d3">Fútbol 7 · 60 min</text>
        <text x="406" y="276" fontSize="12" fontWeight="600" textAnchor="end" fill={text}>42 €</text>
        <rect x="280" y="290" width="126" height="30" rx="15" fill={lime} />
        <text className="art-text" x="343" y="309" fontSize="9.5" fontWeight="700" textAnchor="middle" fill="#0b1a12">Reservar campo</text>
        <path d="M280 334h126" stroke="#ffffff12" />
        {[296, 327, 358, 389].map((cx, index) => <circle key={cx} cx={cx} cy="349" r="3.2" fill={index ? '#3b5245' : lime} />)}
      </g>

      <g className="art-float">
        <rect x="74" y="124" width="206" height="90" rx="14" fill="#6a935733" />
        <rect x="64" y="112" width="206" height="90" rx="14" fill={panel} stroke="#ffffff12" />
        <text className="art-text" x="82" y="138" fontSize="7.5" fontWeight="700" letterSpacing="1.4" fill="#9fe870">PARTIDO ABIERTO</text>
        <text x="82" y="163" fontSize="17" fontWeight="600" fill={text}>3 plazas libres</text>
        <text className="art-text" x="82" y="184" fontSize="8.5" fill={muted}>Hoy · 20:00 · Campo Norte</text>
        {['#cfe8b4', '#8fbf7a', '#4d7d5a'].map((color, index) => <circle key={color} cx={226 + index * 14} cy="136" r="9" fill={color} stroke={panel} strokeWidth="2" />)}
      </g>

      <g className="art-float art-float-late">
        <rect x="424" y="258" width="186" height="76" rx="14" fill="#6a935733" />
        <rect x="414" y="246" width="186" height="76" rx="14" fill={panel} stroke="#ffffff12" />
        <circle cx="440" cy="284" r="12" fill={lime} />
        <path d="M434.5 284.5l3.8 3.8 7.2-7.6" fill="none" stroke="#0b1a12" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <text className="art-text" x="462" y="272" fontSize="7.5" fontWeight="700" letterSpacing="1.4" fill="#9fe870">RESERVA</text>
        <text x="462" y="292" fontSize="15" fontWeight="600" fill={text}>Confirmada</text>
        <text className="art-text" x="462" y="309" fontSize="8" fill={muted}>Pago dividido entre 14</text>
      </g>
    </svg>
  );
}
