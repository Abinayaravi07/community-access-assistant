import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../context/SessionContext';
import { ProfileForm } from '../components/ProfileForm';
import { FamilyMemberForm } from '../components/FamilyMemberForm';
import { useTranslation } from '../hooks/useTranslation';
import {
  OccupationType,
  Gender,
  IncomeLevel,
  EducationLevel,
  CasteCategory,
  MaritalStatus,
  ResidenceType,
  SupportedLanguage,
  AgeRange,
  CoreMatchingEngine,
  sampleSchemes,
  getAgeGroup
} from '@community-access/shared';
import type { UserProfile, FamilyMember } from '@community-access/shared';

type Step = 'personal' | 'location' | 'family' | 'review';

export function ProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile, setMatchResults, hasConsented, language } = useSession();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const STEPS: { id: Step; title: string }[] = [
    { id: 'personal', title: t('personalInfo') },
    { id: 'location', title: t('locationInfo') },
    { id: 'family', title: t('familyMembers') },
    { id: 'review', title: t('reviewSubmit') }
  ];

  // Redirect if not consented
  React.useEffect(() => {
    if (!hasConsented) {
      navigate('/');
    }
  }, [hasConsented, navigate]);

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

  const handleNext = () => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});

    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].id);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].id);
    }
  };

  const handleSubmit = () => {
    // Create complete profile
    const completeProfile: UserProfile = {
      id: crypto.randomUUID(),
      age: profile?.age || 30,
      gender: profile?.gender || Gender.MALE,
      occupation: profile?.occupation || OccupationType.OTHER,
      ageGroup: profile?.age ? getAgeGroup(profile.age) : AgeRange.ADULT,
      incomeRange: profile?.incomeRange || IncomeLevel.MIDDLE,
      annualIncome: profile?.annualIncome,
      educationLevel: profile?.educationLevel || EducationLevel.SECONDARY,
      casteCategory: profile?.casteCategory || CasteCategory.GENERAL,
      maritalStatus: profile?.maritalStatus || MaritalStatus.SINGLE,
      location: profile?.location || {
        state: '',
        district: '',
        residenceType: ResidenceType.URBAN
      },
      familyMembers: profile?.familyMembers || [],
      familySize: profile?.familySize || 1,
      specialCircumstances: profile?.specialCircumstances || [],
      isDisabled: profile?.isDisabled,
      disabilityPercentage: profile?.disabilityPercentage,
      preferredLanguage: language as SupportedLanguage || SupportedLanguage.ENGLISH,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Run matching
    const engine = new CoreMatchingEngine();
    const matches = engine.findMatches(completeProfile, sampleSchemes);
    setMatchResults(matches);
    updateProfile(completeProfile);

    // Navigate to results
    navigate('/results');
  };

  const validateCurrentStep = (): { isValid: boolean; errors: Record<string, string> } => {
    const stepErrors: Record<string, string> = {};

    switch (currentStep) {
      case 'personal':
        if (!profile?.age) stepErrors.age = 'Age is required';
        if (profile?.age && (profile.age < 0 || profile.age > 120)) {
          stepErrors.age = 'Please enter a valid age';
        }
        if (!profile?.gender) stepErrors.gender = 'Gender is required';
        if (!profile?.occupation) stepErrors.occupation = 'Occupation is required';
        break;

      case 'location':
        if (!profile?.location?.state) stepErrors.state = 'State is required';
        if (!profile?.location?.district) stepErrors.district = 'District is required';
        break;
    }

    return {
      isValid: Object.keys(stepErrors).length === 0,
      errors: stepErrors
    };
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      {/* Progress Steps */}
      <div className="progress-steps">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`progress-step ${
              index < currentStepIndex ? 'completed' : 
              index === currentStepIndex ? 'active' : ''
            }`}
          >
            <span className="step-number">
              {index < currentStepIndex ? '✓' : index + 1}
            </span>
            <span>{step.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card">
        {currentStep === 'personal' && (
          <ProfileForm
            profile={profile || {}}
            onUpdate={updateProfile}
            errors={errors}
            section="personal"
          />
        )}

        {currentStep === 'location' && (
          <ProfileForm
            profile={profile || {}}
            onUpdate={updateProfile}
            errors={errors}
            section="location"
          />
        )}

        {currentStep === 'family' && (
          <FamilyMemberForm
            familyMembers={profile?.familyMembers || []}
            onUpdate={(members) => updateProfile({ 
              familyMembers: members,
              familySize: members.length + 1 // +1 for self
            })}
          />
        )}

        {currentStep === 'review' && (
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Review Your Information</h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  Personal Information
                </h3>
                <p>
                  <strong>Age:</strong> {profile?.age} years<br />
                  <strong>Gender:</strong> {profile?.gender}<br />
                  <strong>Occupation:</strong> {profile?.occupation}<br />
                  <strong>Education:</strong> {profile?.educationLevel}<br />
                  <strong>Income Level:</strong> {profile?.incomeRange}<br />
                  <strong>Category:</strong> {profile?.casteCategory}
                </p>
              </div>

              <div>
                <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  Location
                </h3>
                <p>
                  <strong>State:</strong> {profile?.location?.state}<br />
                  <strong>District:</strong> {profile?.location?.district}<br />
                  <strong>Area Type:</strong> {profile?.location?.residenceType}
                </p>
              </div>

              {profile?.familyMembers && profile.familyMembers.length > 0 && (
                <div>
                  <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                    Family Members ({profile.familyMembers.length})
                  </h3>
                  <ul style={{ paddingLeft: '1.25rem' }}>
                    {profile.familyMembers.map((member: FamilyMember, idx: number) => (
                      <li key={idx}>
                        {member.relationship}, {member.age} years, {member.gender}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <button
            onClick={handleBack}
            className="btn btn-secondary"
            disabled={currentStepIndex === 0}
            style={{ visibility: currentStepIndex === 0 ? 'hidden' : 'visible' }}
          >
            ← {t('back')}
          </button>

          {currentStep === 'review' ? (
            <button onClick={handleSubmit} className="btn btn-success">
              {t('findSchemes')} →
            </button>
          ) : (
            <button onClick={handleNext} className="btn btn-primary">
              {t('next')} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
