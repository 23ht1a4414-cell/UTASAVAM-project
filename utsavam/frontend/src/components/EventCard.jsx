import { Link } from 'react-router-dom';
import { MapPin, Trash2, ArrowUpRight } from 'lucide-react';
import PaisleyMotif from './Motifs';
import { categoryColor, formatINR } from '../constants';

function formatDate(dateStr) {
  if (!dateStr) return { day: '--', month: '---' };
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return { day: '--', month: '---' };
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'short' }).toUpperCase(),
  };
}

function EventCard({ event, onDelete }) {
  const { day, month } = formatDate(event.date);
  const color = categoryColor(event.category);

  return (
    <div className="invite-card rise-in bg-[var(--maroon-soft)] rounded-2xl overflow-hidden group relative p-5 flex flex-col justify-between">
      <PaisleyMotif className="absolute top-3 left-3" size={18} />
      <PaisleyMotif className="absolute bottom-3 right-3 rotate-180" size={18} />

      {onDelete && (
        <button
          onClick={() => onDelete(event._id)}
          className="absolute top-3 right-3 p-1.5 text-[var(--ivory-dim)] hover:text-[var(--rani)] hover:bg-[var(--rani)]/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 z-10"
          title="Delete Event"
        >
          <Trash2 size={15} />
        </button>
      )}

      <div className="pl-2">
        <div className="flex items-center gap-2 mb-3">
          {event.category && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
              style={{ color, border: `1px solid ${color}`, fontFamily: 'var(--font-mono)' }}
            >
              {event.category}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--ivory-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
            {day} {month}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[var(--ivory)] mb-1 pr-6 truncate">{event.title}</h3>
        <p className="text-[var(--ivory-dim)] text-sm mb-4 line-clamp-3">{event.description}</p>
      </div>

      <div className="flex items-center justify-between gap-2 pl-2 pt-3 border-t border-[var(--line)]">
        <div className="flex items-center gap-2 text-xs text-[var(--ivory-dim)] min-w-0">
          <MapPin size={13} className="text-[var(--rani)] flex-none" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center gap-3 flex-none">
          <span className="text-xs font-bold text-[var(--gold)]" style={{ fontFamily: 'var(--font-mono)' }}>
            {formatINR(event.price)}
          </span>
          <Link
            to={`/events/${event._id}`}
            className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-[var(--marigold)] hover:text-[var(--gold-bright)] transition-colors"
          >
            Details <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
