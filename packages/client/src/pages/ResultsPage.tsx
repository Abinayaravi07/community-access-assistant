import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { SchemeCard } from '../components/SchemeCard';
import { useTranslation } from '../hooks/useTranslation';
import { 
  CoreMatchingEngine, 
  BenefitType,
  type CategorizedMatchResults,
  type MatchResult
} from '@community-access/shared';

const CATEGORY_ICONS: Record<string, string> = {
  [BenefitType.SCHOLARSHIP]: '📚',
  [BenefitType.HEALTHCARE]: '🏥',
  [BenefitType.FINANCIAL_AID]: '💰',
  [BenefitType.EDUCATION]: '🎓',
  [BenefitType.EMPLOYMENT]: '💼',
  [BenefitType.HOUSING]: '🏠',
  [BenefitType.AGRICULTURE]: '🌾',
  [BenefitType.SOCIAL_SECURITY]: '🛡️',
  [BenefitType.DISABILITY]: '♿',
  [BenefitType.WOMEN_WELFARE]: '👩',
  [BenefitType.CHILD_WELFARE]: '👶',
  [BenefitType.SENIOR_CITIZEN]: '👴'
};

export function ResultsPage() {
  const navigate = useNavigate();
  const { matchResults, profile, hasConsented } = useSession();
  const { t } = useTranslation();

  // Redirect if no data
  React.useEffect(() => {
    if (!hasConsented || !profile) {
      navigate('/');
    }
  }, [hasConsented, profile, navigate]);

  // Categorize results
  const categorizedResults = useMemo(() => {
    const engine = new CoreMatchingEngine();
    return engine.categorizeMatches(matchResults);
  }, [matchResults]);

  // Summary stats
  const stats = useMemo(() => {
    const fullyEligible = matchResults.filter(m => m.isFullyEligible).length;
    const partial = matchResults.filter(m => !m.isFullyEligible && m.eligibilityScore > 50).length;
    return { total: matchResults.length, fullyEligible, partial };
  }, [matchResults]);

  if (!profile || matchResults.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
        <h1 style={{ marginBottom: '1rem' }}>{t('noResultsTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          {t('noResultsDescription')}
        </p>
        <Link to="/profile" className="btn btn-primary">
          {t('completeProfile')} →
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Summary Header */}
      <div className="card" style={{ 
        marginBottom: '2rem', 
        background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
        color: 'white'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>
              🎉 {t('foundSchemes', { count: stats.total })}
            </h1>
            <p style={{ opacity: 0.9, marginBottom: 0 }}>
              {stats.fullyEligible} {t('fullyEligible')}, {stats.partial} {t('partialEligible')}
            </p>
          </div>
          <Link to="/profile" className="btn" style={{ 
            backgroundColor: 'rgba(255,255,255,0.2)', 
            color: 'white',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            {t('updateProfile')}
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
            {stats.fullyEligible}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {t('fullyEligibleLabel')}
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning-color)' }}>
            {stats.partial}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {t('partialMatch')}
          </div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
            {categorizedResults.length}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            {t('categories')}
          </div>
        </div>
      </div>

      {/* Results by Category */}
      {categorizedResults.map((category: CategorizedMatchResults) => (
        <div key={category.category} className="category-section">
          <div className="category-header">
            <div 
              className="category-icon" 
              style={{ backgroundColor: 'var(--primary-light)' }}
            >
              {CATEGORY_ICONS[category.category] || '📋'}
            </div>
            <h2 className="category-title">{category.categoryName}</h2>
            <span className="category-count">{category.totalCount}</span>
          </div>

          {category.results.map((result: MatchResult) => (
            <SchemeCard key={result.scheme.id} result={result} profile={profile} />
          ))}
        </div>
      ))}

      {/* Help Section */}
      <div className="card" style={{ 
        marginTop: '2rem', 
        backgroundColor: 'var(--background-secondary)',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{t('needHelp')}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {t('helpDescription')}
        </p>
      </div>
    </div>
  );
}
