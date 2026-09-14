const ink = '#0d3a55';
const teal = '#10879a';
const muted = '#5d7f8e';
const magenta = '#d9468f';

type Point = [hour: number, y: number];

const hourX = (hour: number) => 92 + hour * 15.5;
const forecast: Point[] = [[0, 246], [2, 262], [4, 274], [6, 266], [8, 228], [10, 204], [12, 196], [14, 206], [16, 212], [18, 204], [20, 190], [21, 187], [22, 200], [24, 232]];
const measured: Point[] = [[0, 244], [2, 264], [4, 277], [6, 263], [8, 224], [10, 200], [12, 194], [14, 208], [16, 209], [17, 205]];
const nodes = [[512, 40], [584, 72], [548, 130], [614, 160], [566, 214], [626, 240]];
const links = [[0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 4], [3, 5]];

function curve(points: Point[]) {
  return points.map(([hour, y], index) => {
    if (!index) return `M${hourX(hour)} ${y}`;
    const [previousHour, previousY] = points[index - 1];
    const middle = (hourX(previousHour) + hourX(hour)) / 2;
    return `C${middle} ${previousY} ${middle} ${y} ${hourX(hour)} ${y}`;
  }).join(' ');
}

const measuredPath = curve(measured);
const forecastPath = curve(forecast);
const now = hourX(17);

export default function RedeiaArt() {
  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <g stroke="#0d3a5526" strokeWidth="1.2">
        {links.map(([from, to]) => <line key={`${from}-${to}`} x1={nodes[from][0]} y1={nodes[from][1]} x2={nodes[to][0]} y2={nodes[to][1]} />)}
      </g>
      {nodes.map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#0d3a5540" />)}

      <g className="art-lift">
        <rect x="82" y="70" width="420" height="290" rx="12" fill="#5f9fb44d" />
        <rect x="70" y="56" width="420" height="290" rx="12" fill="#f7fbfc" />
        {[88, 99, 110].map(cx => <circle key={cx} cx={cx} cy="74" r="3" fill="#bcd3da" />)}
        <text x="124" y="78" fontSize="10" fontWeight="600" fill={ink}>Operación del sistema</text>
        <circle className="art-pulse" cx="412" cy="74.5" r="3.5" fill={magenta} />
        <text className="art-text" x="421" y="77.5" fontSize="7" fontWeight="700" letterSpacing="1.1" fill={muted}>EN DIRECTO</text>
        <path d="M70 90h420" stroke="#e1ecef" />

        <text className="art-text" x="92" y="116" fontSize="7" fontWeight="700" letterSpacing="1.3" fill={muted}>DEMANDA PENINSULAR</text>
        <text x="92" y="146" fontSize="27" fontWeight="600" fill={ink}>29.418<tspan dx="6" fontSize="10" fill={muted}>MW</tspan></text>
        <path d="M330 116h16" stroke={teal} strokeWidth="2.5" strokeLinecap="round" />
        <text className="art-text" x="351" y="119" fontSize="7.5" fill={muted}>Real</text>
        <path d="M386 116h16" stroke="#8db4c2" strokeWidth="1.5" strokeDasharray="4 3" />
        <text className="art-text" x="407" y="119" fontSize="7.5" fill={muted}>Prevista</text>

        <g stroke="#e3eef1">{[176, 216, 256, 296].map(y => <path key={y} d={`M92 ${y}H468`} />)}</g>
        {[0, 6, 12, 18, 24].map((hour, index, hours) => (
          <text key={hour} className="art-text" x={hourX(hour)} y="314" fontSize="7" textAnchor={index === 0 ? 'start' : index === hours.length - 1 ? 'end' : 'middle'} fill="#7d99a5">{String(hour).padStart(2, '0')}h</text>
        ))}
        <path d={`${measuredPath} L${now} 296 L92 296 Z`} fill="#10879a1c" />
        <path d={forecastPath} fill="none" stroke="#8db4c2" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={measuredPath} fill="none" stroke={teal} strokeWidth="2.6" strokeLinecap="round" />
        <path d={`M${now} 172V296`} stroke="#d9468f55" strokeDasharray="3 3" />
        <circle className="art-pulse" cx={now} cy="205" r="10" fill="#d9468f26" />
        <circle cx={now} cy="205" r="4.5" fill={magenta} stroke="#f7fbfc" strokeWidth="2" />
        <rect x={now - 26} y="150" width="52" height="18" rx="5" fill={ink} />
        <text className="art-text" x={now} y="162" fontSize="7.5" fontWeight="700" textAnchor="middle" fill="#f7fbfc">17:00 h</text>
      </g>

      <g className="art-float">
        <rect x="430" y="262" width="176" height="112" rx="12" fill="#5f9fb44d" />
        <rect x="420" y="250" width="176" height="112" rx="12" fill={ink} />
        <text className="art-text" x="438" y="275" fontSize="7" fontWeight="700" letterSpacing="1.3" fill="#7fd0da">ORACLE · SQL</text>
        <g className="art-mono" fontSize="8.5" fill="#e6f1f4">
          <text x="438" y="296"><tspan fill="#7fd0da">SELECT</tspan> hora, mw</text>
          <text x="438" y="310"><tspan fill="#7fd0da">FROM</tspan> demanda</text>
          <text x="438" y="324"><tspan fill="#7fd0da">WHERE</tspan> fecha = :hoy</text>
        </g>
        <path d="M438 334h140" stroke="#ffffff1f" />
        <circle cx="444" cy="348" r="6" fill="#7fd0da" />
        <path d="M441.2 348.2l2 2 3.8-4" fill="none" stroke={ink} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text className="art-text" x="456" y="351" fontSize="8" fill="#e6f1f4">Consulta optimizada</text>
      </g>
    </svg>
  );
}
