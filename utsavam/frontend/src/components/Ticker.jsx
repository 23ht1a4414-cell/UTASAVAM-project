const DEFAULT_ITEMS = ['JATARA', 'SANKRANTI', 'TEMPLE FESTS', 'WEDDINGS', 'SANGEET', 'HARVEST MELA', 'POOJA', 'BIRTHDAYS'];

function Ticker({ items = DEFAULT_ITEMS }) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--maroon-soft)] py-3">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-4 px-6 text-sm font-semibold tracking-[0.25em] text-[var(--gold)] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--marigold)]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ticker;
