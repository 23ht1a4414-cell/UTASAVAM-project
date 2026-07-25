import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { getEvents, deleteEvent } from '../api/events';
import { getCurrentUser } from '../api/auth';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { CATEGORIES } from '../constants';

function Events() {
  const user = getCurrentUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const fetchEvents = () => {
    setLoading(true);
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this event?')) return;
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (err) {
      alert(err.message || 'Failed to delete the event.');
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      const matchesQuery =
        !q ||
        e.title?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || e.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [events, query, category]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
        <div>
          <span
            className="inline-block text-xs font-semibold tracking-[0.35em] text-[var(--rani)] mb-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            THE FULL GUEST LIST
          </span>
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            All Events
          </h1>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ivory-dim)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, city, vibe…"
            className="w-full bg-[var(--maroon-soft)] border border-[var(--line)] rounded-full pl-9 pr-4 py-2.5 text-sm text-[var(--ivory)] placeholder:text-[var(--ivory-dim)] focus:outline-none focus:border-[var(--gold)] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {['All', ...CATEGORIES.map((c) => c.name)].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-colors ${
              category === cat
                ? 'bg-[var(--marigold)] border-[var(--marigold)] text-[var(--maroon)]'
                : 'border-[var(--line)] text-[var(--ivory-dim)] hover:border-[var(--gold)] hover:text-[var(--ivory)]'
            }`}
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={query || category !== 'All' ? 'No matches on the list' : 'No events yet'}
          subtitle={query || category !== 'All' ? 'Try a different search or category.' : 'Be the first to send out the invitations.'}
          showCta={!query && category === 'All'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event._id} event={event} onDelete={user?.role === 'admin' ? handleDelete : undefined} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;