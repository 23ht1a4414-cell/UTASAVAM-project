// Small hand-built SVG motifs grounded in Indian celebration
// visual culture — a paisley (kalka) flourish for card corners,
// and a marigold-and-mango-leaf garland (toran) for section dividers.

export function PaisleyMotif({ className = '', size = 22 }) {
  return (
    <svg
      className={`motif ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C7 3 4 6.5 4 10.5c0 3 2 4.8 4.4 4.8 1.5 0 2.6-.8 2.6-2.1 0-1-.7-1.6-1.6-1.6-.6 0-1 .3-1 .9 0 .4.3.6.6.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <circle cx="8.4" cy="15.4" r="1.1" fill="currentColor" />
    </svg>
  );
}

function Marigold({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse
          key={deg}
          cx="10"
          cy="10"
          rx="3.4"
          ry="1.6"
          fill="var(--marigold)"
          transform={`rotate(${deg} 10 10) translate(4 0)`}
        />
      ))}
      <circle cx="10" cy="10" r="2.4" fill="var(--gold)" />
    </svg>
  );
}

function MangoLeaf({ size = 14 }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 14 20" fill="none">
      <path d="M7 0C7 8 12 10 7 20C7 10 2 8 7 0Z" fill="var(--emerald)" />
    </svg>
  );
}

export function GarlandDivider({ repeat = 18 }) {
  const units = Array.from({ length: repeat });
  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--maroon-soft)] py-4">
      <div className="garland-strip mx-auto justify-center flex-wrap px-4">
        {units.map((_, i) => (
          <span key={i} className="garland-sway flex flex-col items-center mx-1" style={{ animationDelay: `${(i % 5) * 0.15}s` }}>
            <Marigold />
            <MangoLeaf />
          </span>
        ))}
      </div>
    </div>
  );
}

export default PaisleyMotif;
