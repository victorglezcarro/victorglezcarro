const ink = '#372e23';
const muted = '#8a7a66';
const forest = '#3a492c';
const paper = '#f7f0e4';

const glyphs = {
  lamp: 'M-5 6h9M-1 6l2-6-3-4M-2-4l6-2 2 5z',
  fridge: 'M-4-7h8v14h-8zM-4-1h8M2-5v2M2 1v2',
  chair: 'M-3-7v8h8M-3 1v6M5 1v6M-3-2h6',
  books: 'M-6 6v-10h3v10M-2 6v-12h3v12M2.5 6l2.4-11 3 .7-2.4 11z',
};
const menu = ['Resumen', 'Anuncios', 'Alquileres', 'Usuarios', 'Reportes'];
const statusColors: Record<string, [background: string, color: string]> = {
  Publicado: [forest, paper],
  Alquilado: ['#ca7b5533', '#8c4a2b'],
  Revisión: ['#efe4d0', '#6b5c48'],
};
const listings = [
  { name: 'Lámpara de escritorio', detail: 'Venta · 15 $', glyph: glyphs.lamp, tile: '#ecd3b5', status: 'Publicado' },
  { name: 'Mini nevera', detail: 'Alquiler · 8 $/semana', glyph: glyphs.fridge, tile: '#d5dcc3', status: 'Alquilado' },
  { name: 'Silla de estudio', detail: 'Venta · 25 $', glyph: glyphs.chair, tile: '#e6dccb', status: 'Revisión' },
  { name: 'Libros de cálculo', detail: 'Alquiler · 5 $/semana', glyph: glyphs.books, tile: '#ecd3b5', status: 'Publicado' },
];

export default function SharingArt() {
  return (
    <svg viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <g className="art-lift">
        <rect x="60" y="80" width="392" height="272" rx="12" fill="#7a3f1f40" />
        <rect x="48" y="66" width="392" height="272" rx="12" fill={paper} />
        <path d="M48 102h96v236H60a12 12 0 0 1-12-12z" fill="#efe6d6" />
        {[66, 77, 88].map(cx => <circle key={cx} cx={cx} cy="84" r="3" fill="#d8c8ad" />)}
        <text x="102" y="88" fontSize="10" fontWeight="600" fill={ink}>Sharing · Admin</text>
        <rect x="362" y="76" width="64" height="17" rx="8.5" fill="#efe4d0" />
        <text className="art-text" x="394" y="87.5" fontSize="7" textAnchor="middle" fill="#6b5c48">Campus .edu</text>
        <path d="M48 102h392" stroke="#eadfcb" />
        {menu.map((label, index) => (
          <g key={label}>
            {index === 1 && <rect x="56" y="140" width="80" height="18" rx="5" fill={forest} />}
            <text className="art-text" x="64" y={128 + index * 24} fontSize="8" fontWeight={index === 1 ? 700 : 500} fill={index === 1 ? paper : '#6b5c48'}>{label}</text>
          </g>
        ))}

        <text x="160" y="128" fontSize="12" fontWeight="600" fill={ink}>Anuncios</text>
        <text className="art-text" x="160" y="142" fontSize="7.5" fill={muted}>Venta y alquiler entre estudiantes</text>
        {listings.map((item, index) => {
          const y = 156 + index * 40;
          const [pill, pillText] = statusColors[item.status];
          return (
            <g key={item.name}>
              <rect x="160" y={y} width="264" height="32" rx="7" fill="#fffaf2" stroke="#ece0cc" />
              <rect x="166" y={y + 5} width="22" height="22" rx="5" fill={item.tile} />
              <path d={item.glyph} transform={`translate(177 ${y + 16})`} fill="none" stroke={ink} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <text className="art-text" x="196" y={y + 14} fontSize="8.5" fontWeight="600" fill={ink}>{item.name}</text>
              <text className="art-text" x="196" y={y + 25} fontSize="7" fill={muted}>{item.detail}</text>
              <rect x="364" y={y + 9} width="52" height="14" rx="7" fill={pill} />
              <text className="art-text" x="390" y={y + 19} fontSize="6.5" fontWeight="700" textAnchor="middle" fill={pillText}>{item.status}</text>
            </g>
          );
        })}
      </g>

      <g className="art-float">
        <rect x="430" y="52" width="160" height="316" rx="26" fill="#7a3f1f40" />
        <rect x="420" y="40" width="160" height="316" rx="26" fill="#2f3a25" />
        <rect x="428" y="48" width="144" height="300" rx="19" fill={paper} />
        <rect x="480" y="54" width="40" height="10" rx="5" fill="#2f3a25" />
        <text x="440" y="88" fontSize="11" fontWeight="600" fill={ink}>Cerca de ti</text>
        <text className="art-text" x="440" y="101" fontSize="7.5" fill={muted}>En tu campus</text>
        <rect x="440" y="110" width="120" height="84" rx="10" fill="#d5dcc3" />
        <path d={glyphs.fridge} transform="translate(500 158) scale(2.8)" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        <rect x="446" y="116" width="62" height="15" rx="7.5" fill={paper} />
        <text className="art-text" x="477" y="126.5" fontSize="6.5" fontWeight="700" textAnchor="middle" fill={forest}>Segunda vida</text>
        <text x="440" y="212" fontSize="11" fontWeight="600" fill={ink}>Mini nevera</text>
        <text className="art-text" x="440" y="226" fontSize="8" fill={muted}>8 $ / semana</text>
        <rect x="440" y="238" width="120" height="24" rx="12" fill="#efe4d0" />
        <rect x="500" y="240" width="58" height="20" rx="10" fill={forest} />
        <text className="art-text" x="470" y="253" fontSize="7.5" textAnchor="middle" fill="#6b5c48">Comprar</text>
        <text className="art-text" x="529" y="253" fontSize="7.5" fontWeight="700" textAnchor="middle" fill={paper}>Alquilar</text>
        <rect x="440" y="272" width="120" height="28" rx="14" fill="#ca7b55" />
        <text className="art-text" x="500" y="290" fontSize="9" fontWeight="700" textAnchor="middle" fill="#fffaf2">Contactar</text>
        <path d="M440 316h120" stroke="#e5d8c2" />
        {[460, 487, 514, 541].map((cx, index) => <circle key={cx} cx={cx} cy="332" r="3" fill={index ? '#d8c8ad' : forest} />)}
      </g>
    </svg>
  );
}
