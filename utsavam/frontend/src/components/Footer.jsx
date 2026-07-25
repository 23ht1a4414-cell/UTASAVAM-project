import { Link } from 'react-router-dom';
import { Flower2 } from 'lucide-react';

function Footer() {
  return (
    <footer className="border-t border-[var(--line)] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-[var(--ivory-dim)]">
          <Flower2 size={16} className="text-[var(--gold)]" />
          <span style={{ fontFamily: 'var(--font-display)' }} className="tracking-wide text-[var(--ivory)]">
            Utsavam
          </span>
          <span className="text-xs">— where celebrations begin</span>
        </div>
        <nav className="flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-[var(--ivory-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
          <Link to="/events" className="hover:text-[var(--gold)] transition-colors">Events</Link>
          <Link to="/create" className="hover:text-[var(--gold)] transition-colors">Host</Link>
          <Link to="/about" className="hover:text-[var(--gold)] transition-colors">About</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
