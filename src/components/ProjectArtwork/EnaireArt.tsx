const blue = '#7ebbd4';
const light = '#d4e2e8';
const lime = '#c7f485';
const divider = '#1e4257';

const aircraft = [
  { callsign: 'IBE3150', level: '350 ↑ 370', x: 206, y: 236, ux: 0.862, uy: -0.506, labelX: 160, labelY: 262, leader: 'M202 240l-10 12', color: lime, selected: true },
  { callsign: 'VLG22KX', level: '310 ↓ 280', x: 306, y: 180, ux: -0.862, uy: 0.506, labelX: 250, labelY: 156, leader: 'M302 176l-10-10', color: light },
  { callsign: 'AEA1042', level: '240', x: 284, y: 274, ux: 0.658, uy: 0.754, labelX: 300, labelY: 300, leader: 'M288 278l10 12', color: light },
];
const waypoints = [
  { x: 120, y: 286, name: 'LEZL', labelX: 104, labelY: 302 },
  { x: 352, y: 150, name: 'LEMD', labelX: 358, labelY: 146 },
  { x: 160, y: 128 },
  { x: 318, y: 312 },
];
const sectors = [{ name: 'SEV-N', load: 72 }, { name: 'SEV-S', load: 48 }, { name: 'MAD-O', load: 60 }, { name: 'CNR-E', load: 30 }];

export default function EnaireArt() {
  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <g className="art-lift">
        <rect x="68" y="64" width="528" height="300" rx="12" fill="#0a1a2466" />
        <rect x="56" y="50" width="528" height="300" rx="12" fill="#0d2130" stroke="#2a5268" />
        {[74, 85, 96].map(cx => <circle key={cx} cx={cx} cy="68" r="3" fill="#2f5a72" />)}
        <text x="110" y="72" fontSize="10" fontWeight="600" fill={light}>Espacio aéreo · Sectores</text>
        <text className="art-mono" x="394" y="72" fontSize="8" textAnchor="end" fill={blue}>UTC 14:32</text>
        <path d="M56 86h528M410 86v264" stroke={divider} />

        <g fill="none" stroke="#7ebbd41c">
          {[42, 84, 118].map(r => <circle key={r} cx="236" cy="218" r={r} />)}
          <path d="M116 218h240M236 100v236" />
        </g>
        <path d="M96 150L214 106L364 134L388 250L300 326L128 306Z" fill="#7ebbd40a" stroke="#7ebbd466" strokeDasharray="5 4" />
        <path d="M214 106L236 218L388 250M236 218L128 306" fill="none" stroke="#7ebbd433" strokeDasharray="5 4" />
        <path d="M120 286L236 218L352 150M160 128L236 218L318 312" fill="none" stroke="#7ebbd42e" />
        {waypoints.map(point => (
          <g key={`${point.x}-${point.y}`}>
            <path d={`M${point.x} ${point.y - 4}l3.5 6.5h-7z`} fill="none" stroke="#7ebbd4aa" />
            {point.name && <text className="art-mono" x={point.labelX} y={point.labelY} fontSize="7" fill="#7ebbd499">{point.name}</text>}
          </g>
        ))}
        {aircraft.map(plane => (
          <g key={plane.callsign} fill={plane.color} stroke={plane.color}>
            {[1, 2, 3].map(step => <circle key={step} cx={plane.x - plane.ux * 11 * step} cy={plane.y - plane.uy * 11 * step} r="1.6" stroke="none" opacity={1 - step * 0.25} />)}
            {plane.selected && <circle className="art-pulse" cx={plane.x} cy={plane.y} r="12" fill="none" strokeOpacity="0.45" />}
            <rect x={plane.x - 4} y={plane.y - 4} width="8" height="8" fill="none" strokeWidth="1.6" transform={`rotate(45 ${plane.x} ${plane.y})`} />
            <path d={`M${plane.x} ${plane.y}l${plane.ux * 18} ${plane.uy * 18}`} />
            <path d={plane.leader} strokeOpacity="0.5" />
            <text className="art-mono" x={plane.labelX} y={plane.labelY} fontSize="8" stroke="none">{plane.callsign}</text>
            <text className="art-mono" x={plane.labelX} y={plane.labelY + 11} fontSize="7" stroke="none" opacity="0.7">{plane.level}</text>
          </g>
        ))}

        <text className="art-text" x="426" y="112" fontSize="7" fontWeight="700" letterSpacing="1.3" fill={blue}>SECTORES</text>
        {sectors.map((sector, index) => (
          <g key={sector.name}>
            <text className="art-mono" x="426" y={134 + index * 24} fontSize="8" fill={light}>{sector.name}</text>
            <rect x="476" y={128 + index * 24} width="90" height="5" rx="2.5" fill="#ffffff12" />
            <rect x="476" y={128 + index * 24} width={sector.load} height="5" rx="2.5" fill={index ? blue : lime} />
          </g>
        ))}
        <path d="M426 226h140" stroke={divider} />
        <text className="art-text" x="426" y="250" fontSize="7" fontWeight="700" letterSpacing="1.3" fill={blue}>RENDIMIENTO</text>
        <text className="art-text" x="426" y="272" fontSize="8" fill="#d4e2e8aa">Antes</text>
        <text className="art-mono" x="566" y="272" fontSize="8" textAnchor="end" fill="#d4e2e8aa">30 min</text>
        <rect x="426" y="279" width="140" height="5" rx="2.5" fill="#ffffff26" />
        <text className="art-text" x="426" y="306" fontSize="8" fill={light}>Ahora</text>
        <text className="art-mono" x="566" y="306" fontSize="8" textAnchor="end" fill={lime}>pocos min</text>
        <rect x="426" y="313" width="22" height="5" rx="2.5" fill={lime} />
      </g>
    </svg>
  );
}
