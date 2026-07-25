import { Flower2 } from 'lucide-react';

function Loader({ label = 'Loading celebrations…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-[var(--ivory-dim)] gap-3">
      <Flower2 size={28} className="text-[var(--gold)] diya" />
      <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>
        {label}
      </span>
    </div>
  );
}

export default Loader;
