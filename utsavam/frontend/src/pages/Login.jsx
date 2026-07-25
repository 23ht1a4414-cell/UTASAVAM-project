import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import { login } from '../api/auth';

const inputClass =
  'w-full bg-[var(--maroon)] border border-[var(--line)] rounded-xl p-3 text-sm text-[var(--ivory)] placeholder:text-[var(--ivory-dim)] focus:outline-none focus:border-[var(--gold)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
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
        WELCOME BACK
      </span>
      <h1 className="text-4xl mb-8" style={{ fontFamily: 'var(--font-display)' }}>
        Log In
      </h1>

      <form
        onSubmit={handleSubmit}
        className="invite-card bg-[var(--maroon-soft)] rounded-3xl p-8 space-y-6 shadow-2xl"
      >
        {error && (
          <div className="text-sm text-[var(--rani)] bg-[var(--rani)]/10 border border-[var(--rani)]/40 rounded-xl p-3">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="admin@utsavam.com"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-[var(--ivory-dim)] mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--marigold)] hover:bg-[var(--gold-bright)] disabled:opacity-60 text-[var(--maroon)] rounded-full text-sm font-bold transition-colors shadow-[0_10px_30px_-10px_rgba(232,135,30,0.6)] active-pop"
        >
          <KeyRound size={16} /> {submitting ? 'Logging in…' : 'Log In'}
        </button>

        <p className="text-center text-sm text-[var(--ivory-dim)]">
          Don't have an account?{' '}
          <Link to="/register" className="text-[var(--marigold)] hover:text-[var(--gold-bright)] font-bold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
