import { Link } from 'react-router-dom';
import { Flower2, Sparkles, Users, MapPin } from 'lucide-react';

const points = [
  {
    icon: Sparkles,
    title: 'Every occasion',
    body: 'A village jatara, Sankranti fair, Sangeet, Haldi, or a housewarming pooja — if it deserves a guest list, it belongs here.',
  },
  {
    icon: Users,
    title: 'Built for hosts',
    body: 'Send out an invitation in under a minute and manage RSVPs and details from one place.',
  },
  {
    icon: MapPin,
    title: 'City by city',
    body: 'From Guntur function halls to temple grounds and village maidans — find what is happening near you, this week and this season.',
  },
];

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <span
        className="inline-block text-xs font-semibold tracking-[0.35em] text-[var(--rani)] mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        THE SHORT VERSION
      </span>
      <h1 className="text-4xl sm:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
        About Utsavam
      </h1>
      <p className="text-[var(--ivory-dim)] text-lg leading-relaxed max-w-2xl mb-14">
        Utsavam is a home for Telugu celebrations — village jataras, temple fests, Sankranti fairs,
        weddings and their many functions, and everything in between. Hosts send the invitation, guests
        find their way to it.
      </p>

      <div className="grid sm:grid-cols-3 gap-6 mb-16">
        {points.map(({ icon: Icon, title, body }) => (
          <div key={title} className="invite-card bg-[var(--maroon-soft)] rounded-2xl p-6">
            <Icon size={20} className="text-[var(--gold)] mb-4" />
            <h3 className="font-bold text-[var(--ivory)] mb-2">{title}</h3>
            <p className="text-sm text-[var(--ivory-dim)] leading-relaxed">{body}</p>
          </div>
        ))}
      </div>

      <div className="invite-card flex items-center gap-6 bg-[var(--maroon-soft)] rounded-2xl p-8">
        <Flower2 size={28} className="text-[var(--gold)] flex-none" />
        <div className="flex-1">
          <h3 className="font-bold text-[var(--ivory)] mb-1">Got something coming up?</h3>
          <p className="text-sm text-[var(--ivory-dim)]">Get it on the guest list — it takes less than a minute.</p>
        </div>
        <Link
          to="/create"
          className="flex-none bg-[var(--marigold)] hover:bg-[var(--gold-bright)] text-[var(--maroon)] px-5 py-2.5 rounded-full text-sm font-bold transition-colors active-pop"
        >
          Host an Event
        </Link>
      </div>
    </div>
  );
}

export default About;
