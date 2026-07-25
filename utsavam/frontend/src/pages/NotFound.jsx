import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl mb-4 text-[var(--gold)]" style={{ fontFamily: 'var(--font-display)' }}>
        404
      </h1>
      <p className="text-[var(--ivory-dim)] mb-8">This invitation never made it to the guest list.</p>
      <Link
        to="/"
        className="inline-block bg-[var(--marigold)] hover:bg-[var(--gold-bright)] text-[var(--maroon)] px-6 py-3 rounded-full font-bold transition-colors active-pop"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
