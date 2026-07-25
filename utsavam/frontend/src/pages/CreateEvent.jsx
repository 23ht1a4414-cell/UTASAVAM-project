import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Flower2, ShieldAlert } from 'lucide-react';
import { createEvent } from '../api/events';
import { getCurrentUser } from '../api/auth';
import { CATEGORIES, CITIES, VENUES_BY_CITY } from '../constants';

const initialForm = { title: '', description: '', date: '', city: '', venue: '', category: CATEGORIES[0].name, price: '', capacity: '' };

const inputClass =
  'w-full bg-[var(--maroon)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ivory)] placeholder:text-[var(--ivory-dim)] focus:outline-none focus:border-[var(--gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

function CreateEvent() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  if (!user || user.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <ShieldAlert size={36} className="mx-auto mb-4 text-[var(--rani)]" />
        <h1 className="text-3xl mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Admins only
        </h1>
        <p className="text-[var(--ivory-dim)] mb-6">
          Hosting an event requires an admin account.
        </p>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 bg-[var(--marigold)] hover:bg-[var(--gold-bright)] text-[var(--maroon)] px-6 py-2.5 rounded-full font-bold transition-colors active-pop"
        >
          Go to Admin Login
        </Link>
      </div>
    );
  }

  const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value, venue: '' });
  };

  const venueOptions = formData.city ? VENUES_BY_CITY[formData.city] || [] : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const location = formData.venue ? `${formData.venue}` : formData.city;
      await createEvent({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        category: formData.category,
        location,
        price: formData.price ? Number(formData.price) : 0,
        capacity: formData.capacity ? Number(formData.capacity) : 100,
      });
      navigate('/events');
    } catch (err) {
      alert(err.message || 'Could not process event registration.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <span
        className="inline-block text-xs font-semibold tracking-[0.35em] text-[var(--rani)] mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        SEND OUT THE INVITATION
      </span>
      <h1 className="text-4xl mb-2" style={{ fontFamily: 'var(--font-display)' }}>
        Host an Event
      </h1>
      <p className="text-[var(--ivory-dim)] mb-10">Fill in the details below and it goes straight onto the guest list.</p>

      <form
        onSubmit={handleSubmit}
        className="invite-card bg-[var(--maroon-soft)] rounded-3xl p-8 space-y-6 shadow-2xl"
      >
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={handleChange('title')}
            className={inputClass}
            placeholder="e.g. Sharma-Verma Sangeet Night"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Description
          </label>
          <textarea
            required
            rows="4"
            value={formData.description}
            onChange={handleChange('description')}
            className={`${inputClass} resize-none`}
            placeholder="What should guests expect?"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
              Category
            </label>
            <select value={formData.category} onChange={handleChange('category')} className={inputClass}>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={handleChange('date')}
              className={inputClass}
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
              City
            </label>
            <select required value={formData.city} onChange={handleCityChange} className={inputClass}>
              <option value="" disabled>Select a city</option>
              {CITIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
              Venue {formData.city && <span className="normal-case font-normal text-[var(--ivory-dim)]">— nearby options in {formData.city}</span>}
            </label>
            <select
              required
              disabled={!formData.city}
              value={formData.venue}
              onChange={handleChange('venue')}
              className={inputClass}
            >
              <option value="" disabled>
                {formData.city ? 'Select a venue' : 'Select a city first'}
              </option>
              {venueOptions.map((v) => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
              Entry Price (₹)
            </label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={handleChange('price')}
              className={inputClass}
              placeholder="Leave blank if free"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
              Capacity
            </label>
            <input
              type="number"
              min="1"
              required
              value={formData.capacity}
              onChange={handleChange('capacity')}
              className={inputClass}
              placeholder="e.g. 100"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 border border-[var(--line)] rounded-full text-sm font-semibold text-[var(--ivory-dim)] hover:text-[var(--ivory)] hover:border-[var(--ivory)] transition-colors active-pop"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-6 py-2.5 bg-[var(--marigold)] hover:bg-[var(--gold-bright)] disabled:opacity-60 text-[var(--maroon)] rounded-full text-sm font-bold transition-colors shadow-[0_10px_30px_-10px_rgba(232,135,30,0.6)] active-pop"
          >
            <Flower2 size={16} /> {submitting ? 'Sending…' : 'Publish Event'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;