import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { register } from '../api/auth';

const inputClass =
  'w-full bg-[var(--maroon)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ivory)] placeholder:text-[var(--ivory-dim)] focus:outline-none focus:border-[var(--gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      setSuccess(true);
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-14">
      <span
        className="inline-block text-xs font-semibold tracking-[0.35em] text-[var(--rani)] mb-3"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        JOIN THE CELEBRATION
      </span>
      <h1 className="text-4xl mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Create Account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="invite-card bg-[var(--maroon-soft)] rounded-3xl p-8 space-y-6 shadow-2xl"
      >
        {success && (
          <div className="text-sm text-[var(--emerald)] bg-[var(--emerald)]/10 border border-[var(--emerald)]/40 rounded-xl p-3">
            Account created! Redirecting…
          </div>
        )}

        {error && (
          <div className="text-sm text-[var(--rani)] bg-[var(--rani)]/10 border border-[var(--rani)]/40 rounded-xl p-3">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={handleChange('name')}
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Password
          </label>
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={handleChange('password')}
            className={inputClass}
            placeholder="At least 6 characters"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Phone <span className="normal-case font-normal text-[var(--ivory-dim)]">(optional)</span>
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={handleChange('phone')}
            className={inputClass}
            placeholder="9876543210"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--marigold)] hover:bg-[var(--gold-bright)] disabled:opacity-60 text-[var(--maroon)] rounded-full text-sm font-bold transition-colors shadow-[0_10px_30px_-10px_rgba(232,135,30,0.6)] active-pop"
        >
          <UserPlus size={16} /> {submitting ? 'Creating…' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-[var(--ivory-dim)]">
          Already have an account?{' '}
          <Link to="/login" className="text-[var(--marigold)] hover:text-[var(--gold-bright)] font-bold">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
