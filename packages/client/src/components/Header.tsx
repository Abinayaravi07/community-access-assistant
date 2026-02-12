import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useTranslation } from '../hooks/useTranslation';

export function Header() {
  const { language, setLanguage, clearSession, profile } = useSession();
  const { t } = useTranslation();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          <span role="img" aria-label="Government">🏛️</span>
          {t('appName')}
        </Link>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {profile && (
            <Link to="/results" className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }}>
              {t('viewResults')}
            </Link>
          )}
          
          <select
            value={language}
            onChange={handleLanguageChange}
            className="form-select"
            style={{ width: 'auto', padding: '0.5rem' }}
            aria-label={t('selectLanguage')}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
          </select>

          {profile && (
            <button
              onClick={clearSession}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem' }}
              aria-label={t('clearData')}
            >
              {t('clearData')}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
