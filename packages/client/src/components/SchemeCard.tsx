import React, { useState } from 'react';
import type { 
  MatchResult, 
  UserProfile, 
  EligibilityCriterion,
  ApplicationStep,
  RequiredDocument
} from '@community-access/shared';
import { CoreMatchingEngine } from '@community-access/shared';

type Benefit = { description: string; amount?: number };

interface SchemeCardProps {
  result: MatchResult;
  profile: Partial<UserProfile>;
}

export function SchemeCard({ result, profile }: SchemeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { scheme, eligibilityScore, isFullyEligible, applicableTo, priority } = result;

  // Generate explanation
  const engine = new CoreMatchingEngine();
  const explanation = engine.explainMatch(result, profile as UserProfile);

  return (
    <div className={`scheme-card ${priority}-priority`}>
      <div className="scheme-header">
        <div>
          <h3 className="scheme-title">{scheme.name}</h3>
          {scheme.shortName && (
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              ({scheme.shortName})
            </span>
          )}
        </div>
        <span className={`scheme-badge ${isFullyEligible ? 'badge-eligible' : 'badge-partial'}`}>
          {isFullyEligible ? '✓ Eligible' : `${Math.round(eligibilityScore)}% Match`}
        </span>
      </div>

      <p className="scheme-description">
        {scheme.simplifiedDescription || scheme.description}
      </p>

      {/* Benefits */}
      <div className="scheme-benefits">
        {scheme.benefits.slice(0, 3).map((benefit: Benefit, idx: number) => (
          <span key={idx} className="benefit-tag">
            {benefit.amount ? `₹${benefit.amount.toLocaleString()}` : ''} {benefit.description.slice(0, 30)}
            {benefit.description.length > 30 ? '...' : ''}
          </span>
        ))}
      </div>

      {/* Applicable To */}
      {applicableTo === 'specific_member' && result.applicableMembers.length > 0 && (
        <p style={{ 
          fontSize: '0.875rem', 
          color: 'var(--primary-color)',
          backgroundColor: 'var(--primary-light)',
          padding: '0.5rem',
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          👤 This scheme applies to your family member ({result.applicableMembers[0].relationship})
        </p>
      )}

      {/* Expandable Details */}
      {isExpanded && (
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          {/* Eligibility Status */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              ELIGIBILITY STATUS
            </h4>
            
            {result.matchedCriteria.length > 0 && (
              <div style={{ marginBottom: '0.5rem' }}>
                <strong style={{ color: 'var(--secondary-color)' }}>✓ You Meet:</strong>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                  {result.matchedCriteria.map((crit: EligibilityCriterion, idx: number) => (
                    <li key={idx} style={{ color: 'var(--text-secondary)' }}>
                      {crit.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.missingCriteria.length > 0 && (
              <div>
                <strong style={{ color: 'var(--error-color)' }}>✗ Missing Requirements:</strong>
                <ul style={{ paddingLeft: '1.5rem', marginTop: '0.25rem' }}>
                  {result.missingCriteria.map((crit: EligibilityCriterion, idx: number) => (
                    <li key={idx} style={{ color: 'var(--text-secondary)' }}>
                      {crit.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Application Process */}
          {scheme.applicationProcess.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                HOW TO APPLY
              </h4>
              <ol style={{ paddingLeft: '1.5rem' }}>
                {scheme.applicationProcess.map((step: ApplicationStep, idx: number) => (
                  <li key={idx} style={{ marginBottom: '0.75rem' }}>
                    <strong>{step.title}</strong>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.25rem', marginTop: '0.25rem' }}>
                      {step.description}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                      ⏱️ {step.estimatedTime}
                      {step.onlineAvailable && ' • 🌐 Available online'}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Required Documents */}
          {scheme.documents.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                DOCUMENTS REQUIRED
              </h4>
              <ul style={{ paddingLeft: '1.5rem' }}>
                {scheme.documents.map((doc: RequiredDocument, idx: number) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: doc.isMandatory ? '600' : '400' }}>
                      {doc.name}
                      {doc.isMandatory && <span style={{ color: 'var(--error-color)' }}> *</span>}
                    </span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '0.125rem' }}>
                      {doc.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Info */}
          <div style={{ 
            backgroundColor: 'var(--background-secondary)', 
            padding: '1rem', 
            borderRadius: 'var(--border-radius)'
          }}>
            <h4 style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>CONTACT INFORMATION</h4>
            <p style={{ marginBottom: '0.5rem' }}>
              <strong>Department:</strong> {scheme.contactInfo.department}
            </p>
            {scheme.contactInfo.helplineNumber && (
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Helpline:</strong>{' '}
                <a href={`tel:${scheme.contactInfo.helplineNumber}`}>
                  {scheme.contactInfo.helplineNumber}
                </a>
              </p>
            )}
            {scheme.contactInfo.websiteUrl && (
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Website:</strong>{' '}
                <a href={scheme.contactInfo.websiteUrl} target="_blank" rel="noopener noreferrer">
                  {scheme.contactInfo.websiteUrl}
                </a>
              </p>
            )}
            {scheme.contactInfo.email && (
              <p style={{ marginBottom: 0 }}>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${scheme.contactInfo.email}`}>
                  {scheme.contactInfo.email}
                </a>
              </p>
            )}
          </div>

          {/* Source */}
          <p style={{ 
            marginTop: '1rem', 
            fontSize: '0.75rem', 
            color: 'var(--text-light)' 
          }}>
            Source: {scheme.source.name} 
            {scheme.source.isOfficial && ' (Official)'} •
            Last updated: {new Date(scheme.lastUpdated).toLocaleDateString()}
          </p>
        </div>
      )}

      <div className="scheme-footer">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem' }}
        >
          {isExpanded ? '▲ Show Less' : '▼ View Details & How to Apply'}
        </button>

        {scheme.contactInfo.websiteUrl && (
          <a
            href={scheme.contactInfo.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '0.5rem 1rem' }}
          >
            Apply Now →
          </a>
        )}
      </div>
    </div>
  );
}
