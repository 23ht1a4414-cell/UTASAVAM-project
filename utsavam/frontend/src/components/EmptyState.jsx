import { Flower2 } from 'lucide-react';
import { Link } from 'react-router-dom';

function EmptyState({ title = 'No events yet', subtitle = 'Be the first to send out the invitations.', showCta = true }) {
  return (
    <div className="text-center py-20 border border-dashed border-[var(--line)] rounded-2xl bg-[var(--maroon-soft)]/50">
      <Flower2 size={36} className="mx-auto mb-4 text-[var(--ivory-dim)]" />
      <p className="text-base font-semibold text-[var(--ivory)]">{title}</p>
      <p className="text-sm text-[var(--ivory-dim)] mt-1">{subtitle}</p>
      {showCta && (
        <Link
          to="/create"
          className="inline-block mt-5 text-sm font-bold uppercase tracking-wide text-[var(--marigold)] hover:text-[var(--gold-bright)] transition-colors"
        >
          Host an event →
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
