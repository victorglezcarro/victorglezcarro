const ink = '#2b2419';
const honey = '#f2c14e';
const muted = '#8b8173';

const paragraph = [[156, 300], [168, 286], [180, 296], [192, 170]];
const highlighted = [[214, 292], [226, 236]];
const afterHighlight = [[250, 298], [262, 280], [274, 210], [298, 290], [310, 240]];
const ideas = ['Transforma la luz en energía química', 'Ocurre en los cloroplastos', 'Libera oxígeno a la atmósfera'];
const honeycomb = [[566, 306], [593.7, 306], [621.4, 306], [579.9, 330], [607.6, 330]];
const logo = [[318, 121], [326.7, 121], [322.3, 113.5]];

function hexagon(cx: number, cy: number, radius: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 3) * index - Math.PI / 6;
    return `${(cx + radius * Math.cos(angle)).toFixed(1)},${(cy + radius * Math.sin(angle)).toFixed(1)}`;
  }).join(' ');
}

export default function ElephantArt() {
  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#f2c14e33">
        {honeycomb.map(([cx, cy]) => <polygon key={`${cx}-${cy}`} points={hexagon(cx, cy, 16)} />)}
      </g>

      <g className="art-lift">
        <rect x="56" y="76" width="384" height="280" rx="12" fill="#00000066" />
        <rect x="44" y="62" width="384" height="280" rx="12" fill="#f7f3ec" />
        <path d="M44 92V74a12 12 0 0 1 12-12h360a12 12 0 0 1 12 12v18z" fill="#ebe3d5" />
        {[60, 71, 82].map(cx => <circle key={cx} cx={cx} cy="77" r="3" fill="#cdbfa8" />)}
        <rect x="98" y="69" width="260" height="16" rx="8" fill="#f7f3ec" />
        <text className="art-text" x="110" y="80" fontSize="7" fill={muted}>campus.edu/biologia/fotosintesis</text>
        <circle className="art-pulse" cx="404" cy="77" r="10.5" fill="none" stroke="#f2c14e99" />
        <polygon points={hexagon(404, 77, 6.5)} fill={honey} />
        <text className="art-serif" x="68" y="126" fontSize="17" fontWeight="600" fill={ink}>La fotosíntesis</text>
        <text className="art-text" x="68" y="142" fontSize="7.5" fill={muted}>Tema 4 · Biología</text>
        {paragraph.map(([y, width]) => <rect key={y} x="68" y={y} width={width} height="5" rx="2.5" fill="#ddd4c5" />)}
        <rect x="62" y="206" width="316" height="32" rx="5" fill="#f2c14e38" />
        {highlighted.map(([y, width]) => <rect key={y} x="68" y={y} width={width} height="5" rx="2.5" fill="#c9b98f" />)}
        {afterHighlight.map(([y, width]) => <rect key={y} x="68" y={y} width={width} height="5" rx="2.5" fill="#ddd4c5" />)}
      </g>

      <g className="art-float">
        <rect x="310" y="108" width="258" height="236" rx="14" fill="#00000066" />
        <path d="M396 97l8-8 8 8z" fill={honey} />
        <rect x="300" y="96" width="258" height="236" rx="14" fill="#fffdf8" />
        <path d="M300 136v-26a14 14 0 0 1 14-14h230a14 14 0 0 1 14 14v26z" fill={honey} />
        {logo.map(([cx, cy]) => <polygon key={`${cx}-${cy}`} points={hexagon(cx, cy, 5)} fill={ink} />)}
        <text x="342" y="120" fontSize="11" fontWeight="700" fill={ink}>Elephant Hive</text>
        <rect x="520" y="108" width="24" height="16" rx="8" fill={ink} />
        <text className="art-text" x="532" y="119" fontSize="7.5" fontWeight="700" textAnchor="middle" fill={honey}>IA</text>
        <text className="art-text" x="318" y="158" fontSize="7" fontWeight="700" letterSpacing="1.4" fill={muted}>RESUMEN EN 3 IDEAS</text>
        {ideas.map((idea, index) => (
          <g key={idea}>
            <rect x="316" y={168 + index * 36} width="226" height="30" rx="8" fill="#f6efdf" />
            <polygon points={hexagon(332, 183 + index * 36, 5)} fill={honey} />
            <text className="art-text" x="346" y={186.5 + index * 36} fontSize="8.5" fill={ink}>{idea}</text>
          </g>
        ))}
        <rect x="316" y="284" width="226" height="30" rx="15" fill={ink} />
        <text className="art-text" x="429" y="303" fontSize="9" fontWeight="600" textAnchor="middle" fill="#f6efe2">Repasar más tarde</text>
      </g>
    </svg>
  );
}
