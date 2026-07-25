import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, Trash2 } from 'lucide-react';
import { getEvents, deleteEvent } from '../api/events';
import { getCurrentUser } from '../api/auth';
import Loader from '../components/Loader';
import PaisleyMotif from '../components/Motifs';
import { categoryColor, formatINR } from '../constants';

function formatDate(dateStr) {
  if (!dateStr) return 'Date to be announced';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getEvents()
      .then((events) => {
        const found = events.find((e) => e._id === id);
        if (!found) setNotFound(true);
        else setEvent(found);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to remove this event?')) return;
    try {
      await deleteEvent(id);
      navigate('/events');
    } catch (err) {
      alert(err.message || 'Failed to delete the event.');
    }
  };

  if (loading) return <Loader label="Fetching the invitation…" />;

  if (notFound || !event) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          This invitation wasn't found
        </h1>
        <p className="text-[var(--ivory-dim)] mb-6">It may have been withdrawn, or never sent out.</p>
        <Link to="/events" className="text-[var(--marigold)] hover:text-[var(--gold-bright)] font-bold">
          ← Back to all events
        </Link>
      </div>
    );
  }

  const color = categoryColor(event.category);

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <Link
        to="/events"
        className="nav-link inline-flex items-center gap-2 text-sm text-[var(--ivory-dim)] hover:text-[var(--gold)] transition-colors mb-8"
      >
        <ArrowLeft size={15} /> Back to events
      </Link>

      <div className="invite-card rise-in bg-[var(--maroon-soft)] rounded-3xl overflow-hidden shadow-2xl p-8 sm:p-10 relative">
        <PaisleyMotif className="absolute top-5 left-5" size={26} />
        <PaisleyMotif className="absolute bottom-5 right-5 rotate-180" size={26} />

        <div className="flex items-center gap-3 mb-5">
          {event.category && (
            <span
              className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ color, border: `1px solid ${color}`, fontFamily: 'var(--font-mono)' }}
            >
              {event.category}
            </span>
          )}
          <span className="text-xs font-bold text-[var(--marigold)]" style={{ fontFamily: 'var(--font-mono)' }}>
            {formatINR(event.price)}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--ivory)] mb-4">{event.title}</h1>
        <p className="text-[var(--ivory-dim)] leading-relaxed mb-6">{event.description}</p>

        <div className="space-y-3 pt-5 border-t border-[var(--line)]">
          <div className="flex items-center gap-3 text-sm text-[var(--ivory)]">
            <Calendar size={16} className="text-[var(--gold)]" />
            {formatDate(event.date)}
          </div>
          <div className="flex items-center gap-3 text-sm text-[var(--ivory)]">
            <MapPin size={16} className="text-[var(--rani)]" />
            {event.location}
          </div>
        </div>

        {user?.role === 'admin' && (
          <button
            onClick={handleDelete}
            className="mt-8 flex items-center gap-2 text-sm font-bold text-[var(--rani)] hover:bg-[var(--rani)]/10 px-4 py-2 rounded-full border border-[var(--rani)]/40 transition-colors active-pop"
          >
            <Trash2 size={15} /> Remove Event
          </button>
        )}
      </div>
    </div>
  );
}

export default EventDetails;