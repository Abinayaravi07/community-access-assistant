import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { useTranslation } from '../hooks/useTranslation';

export function HomePage() {
  const { hasConsented, setHasConsented } = useSession();
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>
        {t('welcomeTitle')}
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        {t('welcomeSubtitle')}
      </p>

      <div className="card" style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>How It Works</h2>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="step-number" style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'white',
              flexShrink: 0 
            }}>1</div>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>Tell Us About Yourself</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                Answer simple questions about your occupation, age, income, and family.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="step-number" style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'white',
              flexShrink: 0 
            }}>2</div>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>We Find Matching Schemes</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                Our system checks your eligibility against hundreds of government programs.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="step-number" style={{ 
              backgroundColor: 'var(--primary-color)', 
              color: 'white',
              flexShrink: 0 
            }}>3</div>
            <div>
              <h3 style={{ marginBottom: '0.25rem' }}>Get Clear Guidance</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                See simplified explanations and step-by-step instructions to apply.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ 
        textAlign: 'left', 
        marginBottom: '2rem',
        backgroundColor: 'var(--primary-light)',
        border: '1px solid var(--primary-color)'
      }}>
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span role="img" aria-label="Privacy">🔒</span>
          {t('privacyTitle')}
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {t('privacyDescription')}
        </p>
        
        <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{t('whatWeCollect')}</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
          <li>{t('privacyItem1')}</li>
          <li>{t('privacyItem2')}</li>
          <li>{t('privacyItem3')}</li>
        </ul>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '1rem' }}>
          {t('dataUsage')}
        </p>

        <div style={{ marginTop: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span>I understand and agree to the privacy terms</span>
          </label>
        </div>
      </div>

      <Link 
        to={hasConsented ? '/profile' : '#'}
        className={`btn btn-primary ${!hasConsented ? 'disabled' : ''}`}
        style={{ 
          fontSize: '1.25rem', 
          padding: '1rem 2rem',
          pointerEvents: hasConsented ? 'auto' : 'none',
          opacity: hasConsented ? 1 : 0.5
        }}
        onClick={(e) => {
          if (!hasConsented) {
            e.preventDefault();
          }
        }}
      >
        {t('getStarted')} →
      </Link>

      {!hasConsented && (
        <p style={{ marginTop: '1rem', color: 'var(--text-light)', fontSize: '0.875rem' }}>
          Please accept the privacy terms to continue
        </p>
      )}

      <div style={{ 
        marginTop: '3rem', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        textAlign: 'center'
      }}>
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📚</div>
          <h3>Scholarships</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontSize: '0.875rem' }}>
            Education support for students
          </p>
        </div>
        
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🏥</div>
          <h3>Healthcare</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontSize: '0.875rem' }}>
            Medical insurance & support
          </p>
        </div>
        
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌾</div>
          <h3>Agriculture</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontSize: '0.875rem' }}>
            Farmer assistance programs
          </p>
        </div>
        
        <div className="card">
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
          <h3>Financial Aid</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 0, fontSize: '0.875rem' }}>
            Pensions & monetary support
          </p>
        </div>
      </div>
    </div>
  );
}
