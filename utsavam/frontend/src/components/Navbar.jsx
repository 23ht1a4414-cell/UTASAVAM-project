import { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Flower2, PlusCircle, UserCircle2, LogOut } from 'lucide-react';
import { getCurrentUser, logout } from '../api/auth';

const links = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
];

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(getCurrentUser());

  useEffect(() => {
    const refresh = () => setUser(getCurrentUser());
    window.addEventListener('authchange', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('authchange', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--maroon)]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-9 h-9 rounded-full border border-[var(--gold)]/60 text-[var(--gold)] diya">
            <Flower2 size={18} />
          </span>
          <span
            className="text-2xl tracking-wide text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Utsavam
          </span>
          <span
            className="hidden md:inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[var(--gold)]/50 text-[var(--gold)]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Demo Data
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8 text-sm font-semibold uppercase tracking-widest text-[var(--ivory-dim)]" style={{ fontFamily: 'var(--font-mono)' }}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `nav-link transition-colors hover:text-[var(--ivory)] ${isActive ? 'is-active text-[var(--ivory)]' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[var(--ivory)]">
                <UserCircle2 size={18} className="text-[var(--gold)]" />
                {user.name}
                {user.role === 'admin' && (
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full border border-[var(--gold)]/50 text-[var(--gold)]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    Admin
                  </span>
                )}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-[var(--ivory-dim)] hover:text-[var(--ivory)] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
                title="Log out"
              >
                <LogOut size={15} /> <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold uppercase tracking-widest text-[var(--ivory-dim)] hover:text-[var(--ivory)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Log In
            </Link>
          )}
          {!user && (
            <Link
              to="/admin"
              className="hidden sm:inline text-xs font-semibold uppercase tracking-widest text-[var(--ivory-dim)] hover:text-[var(--gold)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Admin
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link
              to="/create"
              className="flex items-center gap-2 bg-[var(--marigold)] hover:bg-[var(--gold-bright)] text-[var(--maroon)] px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-[0_8px_20px_-8px_rgba(232,135,30,0.6)] active-pop"
            >
              <PlusCircle size={16} /> Host an Event
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;