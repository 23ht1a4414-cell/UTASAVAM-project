import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { getEvents } from '../api/events';
import Ticker from '../components/Ticker';
import { GarlandDivider } from '../components/Motifs';
import EventCard from '../components/EventCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { formatINR } from '../constants';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  const featured = events.slice(0, 3);
  const nextUp = events[0];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--maroon-soft)] via-[var(--maroon)] to-[var(--maroon)]" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          <div className="rise-in">
            <span
              className="inline-block text-xs font-semibold tracking-[0.35em] text-[var(--rani)] mb-2"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              శుభారంభం · SHUBHARAMBHAM
            </span>
            <span
              className="block text-xs font-semibold tracking-[0.3em] text-[var(--ivory-dim)] mb-5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              TELUGU VILLAGE CELEBRATIONS
            </span>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl leading-tight text-[var(--ivory)] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Where every<br />
              celebration finds<br />
              its <span className="text-[var(--gold)]">ooru.</span>
            </h1>
            <p className="text-[var(--ivory-dim)] text-lg max-w-md mb-8">
              From temple jataras to Sankranti melas — discover what's happening near your village, or send out the invitations for your own.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/events"
                className="flex items-center gap-2 bg-[var(--marigold)] hover:bg-[var(--gold-bright)] text-[var(--maroon)] px-6 py-3 rounded-full font-bold transition-colors shadow-[0_10px_30px_-10px_rgba(232,135,30,0.6)] active-pop"
              >
                Browse Events <ArrowRight size={18} />
              </Link>
              <Link
                to="/create"
                className="flex items-center gap-2 border border-[var(--line)] hover:border-[var(--gold)] text-[var(--ivory)] px-6 py-3 rounded-full font-bold transition-colors active-pop"
              >
                Host an Event
              </Link>
            </div>
          </div>

          {/* Live invitation preview */}
          <div className="rise-in" style={{ animationDelay: '0.1s' }}>
            {nextUp ? (
              <div className="invite-card bg-[var(--maroon-soft)] rounded-2xl overflow-hidden shadow-2xl p-7 relative">
                <span
                  className="inline-block text-[10px] font-bold tracking-[0.3em] text-[var(--rani)] mb-3"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  COMING UP NEXT
                </span>
                <h3 className="text-xl font-bold text-[var(--ivory)] mb-2">{nextUp.title}</h3>
                <p className="text-sm text-[var(--ivory-dim)] mb-5 line-clamp-3">{nextUp.description}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--ivory-dim)]">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[var(--gold)]" /> {nextUp.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-[var(--rani)]" /> {nextUp.location}
                  </span>
                </div>
                <span className="absolute bottom-6 right-7 text-sm font-bold text-[var(--marigold)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {formatINR(nextUp.price)}
                </span>
              </div>
            ) : (
              !loading && (
                <div className="border border-dashed border-[var(--line)] rounded-2xl p-10 text-center text-[var(--ivory-dim)] text-sm">
                  No invitations out yet — yours could be the first.
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <GarlandDivider />
      <Ticker />

      {/* Featured events */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
            Trending Celebrations
          </h2>
          <Link
            to="/events"
            className="nav-link text-sm font-semibold uppercase tracking-widest text-[var(--ivory-dim)] hover:text-[var(--gold)] transition-colors"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <Loader />
        ) : featured.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
