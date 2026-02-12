import React from 'react';
import type { UserProfile, PartialUserProfile } from '@community-access/shared';
import {
  Gender,
  OccupationType,
  IncomeLevel,
  EducationLevel,
  CasteCategory,
  MaritalStatus,
  ResidenceType
} from '@community-access/shared';

interface ProfileFormProps {
  profile: Partial<UserProfile>;
  onUpdate: (updates: Partial<UserProfile>) => void;
  errors: Record<string, string>;
  section: 'personal' | 'location';
}

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
];

export function ProfileForm({ profile, onUpdate, errors, section }: ProfileFormProps) {
  if (section === 'personal') {
    return (
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Tell Us About Yourself</h2>
        
        <div className="form-group">
          <label className="form-label" htmlFor="age">
            Age <span style={{ color: 'var(--error-color)' }}>*</span>
          </label>
          <input
            type="number"
            id="age"
            className="form-input"
            value={profile.age || ''}
            onChange={(e) => onUpdate({ age: parseInt(e.target.value) || undefined })}
            min="0"
            max="120"
            placeholder="Enter your age"
          />
          {errors.age && <span className="form-error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="gender">
            Gender <span style={{ color: 'var(--error-color)' }}>*</span>
          </label>
          <select
            id="gender"
            className="form-select"
            value={profile.gender || ''}
            onChange={(e) => onUpdate({ gender: e.target.value as Gender })}
          >
            <option value="">Select gender</option>
            <option value={Gender.MALE}>Male</option>
            <option value={Gender.FEMALE}>Female</option>
            <option value={Gender.OTHER}>Other</option>
            <option value={Gender.PREFER_NOT_TO_SAY}>Prefer not to say</option>
          </select>
          {errors.gender && <span className="form-error">{errors.gender}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="occupation">
            Occupation <span style={{ color: 'var(--error-color)' }}>*</span>
          </label>
          <select
            id="occupation"
            className="form-select"
            value={profile.occupation || ''}
            onChange={(e) => onUpdate({ occupation: e.target.value as OccupationType })}
          >
            <option value="">Select occupation</option>
            <option value={OccupationType.FARMER}>Farmer</option>
            <option value={OccupationType.STUDENT}>Student</option>
            <option value={OccupationType.DAILY_WAGE_WORKER}>Daily Wage Worker</option>
            <option value={OccupationType.GOVERNMENT_EMPLOYEE}>Government Employee</option>
            <option value={OccupationType.PRIVATE_EMPLOYEE}>Private Employee</option>
            <option value={OccupationType.TEACHER}>Teacher</option>
            <option value={OccupationType.SELF_EMPLOYED}>Self Employed</option>
            <option value={OccupationType.HOMEMAKER}>Homemaker</option>
            <option value={OccupationType.RETIRED}>Retired</option>
            <option value={OccupationType.UNEMPLOYED}>Unemployed</option>
            <option value={OccupationType.OTHER}>Other</option>
          </select>
          {errors.occupation && <span className="form-error">{errors.occupation}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="educationLevel">
            Education Level
          </label>
          <select
            id="educationLevel"
            className="form-select"
            value={profile.educationLevel || ''}
            onChange={(e) => onUpdate({ educationLevel: e.target.value as EducationLevel })}
          >
            <option value="">Select education level</option>
            <option value={EducationLevel.NO_FORMAL_EDUCATION}>No Formal Education</option>
            <option value={EducationLevel.PRIMARY}>Primary (Class 1-5)</option>
            <option value={EducationLevel.SECONDARY}>Secondary (Class 6-10)</option>
            <option value={EducationLevel.HIGHER_SECONDARY}>Higher Secondary (Class 11-12)</option>
            <option value={EducationLevel.DIPLOMA}>Diploma</option>
            <option value={EducationLevel.GRADUATE}>Graduate</option>
            <option value={EducationLevel.POST_GRADUATE}>Post Graduate</option>
            <option value={EducationLevel.DOCTORATE}>Doctorate</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="incomeRange">
            Annual Family Income
          </label>
          <select
            id="incomeRange"
            className="form-select"
            value={profile.incomeRange || ''}
            onChange={(e) => onUpdate({ incomeRange: e.target.value as IncomeLevel })}
          >
            <option value="">Select income range</option>
            <option value={IncomeLevel.BPL}>Below Poverty Line (BPL)</option>
            <option value={IncomeLevel.LOW}>Low (Up to ₹2.5 Lakhs)</option>
            <option value={IncomeLevel.LOWER_MIDDLE}>Lower Middle (₹2.5 - 5 Lakhs)</option>
            <option value={IncomeLevel.MIDDLE}>Middle (₹5 - 10 Lakhs)</option>
            <option value={IncomeLevel.UPPER_MIDDLE}>Upper Middle (₹10 - 25 Lakhs)</option>
            <option value={IncomeLevel.HIGH}>High (Above ₹25 Lakhs)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="casteCategory">
            Category
          </label>
          <select
            id="casteCategory"
            className="form-select"
            value={profile.casteCategory || ''}
            onChange={(e) => onUpdate({ casteCategory: e.target.value as CasteCategory })}
          >
            <option value="">Select category</option>
            <option value={CasteCategory.GENERAL}>General</option>
            <option value={CasteCategory.OBC}>OBC</option>
            <option value={CasteCategory.SC}>SC</option>
            <option value={CasteCategory.ST}>ST</option>
            <option value={CasteCategory.EWS}>EWS</option>
            <option value={CasteCategory.MINORITY}>Minority</option>
          </select>
          <span className="form-hint">This helps find category-specific schemes</span>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="maritalStatus">
            Marital Status
          </label>
          <select
            id="maritalStatus"
            className="form-select"
            value={profile.maritalStatus || ''}
            onChange={(e) => onUpdate({ maritalStatus: e.target.value as MaritalStatus })}
          >
            <option value="">Select marital status</option>
            <option value={MaritalStatus.SINGLE}>Single</option>
            <option value={MaritalStatus.MARRIED}>Married</option>
            <option value={MaritalStatus.DIVORCED}>Divorced</option>
            <option value={MaritalStatus.WIDOWED}>Widowed</option>
            <option value={MaritalStatus.SEPARATED}>Separated</option>
          </select>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={profile.isDisabled || false}
              onChange={(e) => onUpdate({ isDisabled: e.target.checked })}
              style={{ width: '1.25rem', height: '1.25rem' }}
            />
            <span>Person with Disability</span>
          </label>
        </div>

        {profile.isDisabled && (
          <div className="form-group">
            <label className="form-label" htmlFor="disabilityPercentage">
              Disability Percentage
            </label>
            <input
              type="number"
              id="disabilityPercentage"
              className="form-input"
              value={profile.disabilityPercentage || ''}
              onChange={(e) => onUpdate({ disabilityPercentage: parseInt(e.target.value) || undefined })}
              min="0"
              max="100"
              placeholder="Enter disability percentage"
            />
          </div>
        )}
      </div>
    );
  }

  // Location section
  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Where Do You Live?</h2>
      
      <div className="form-group">
        <label className="form-label" htmlFor="state">
          State <span style={{ color: 'var(--error-color)' }}>*</span>
        </label>
        <select
          id="state"
          className="form-select"
          value={profile.location?.state || ''}
          onChange={(e) => onUpdate({ 
            location: { 
              ...profile.location, 
              state: e.target.value,
              district: profile.location?.district || '',
              residenceType: profile.location?.residenceType || ResidenceType.URBAN
            } 
          })}
        >
          <option value="">Select state</option>
          {STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <span className="form-error">{errors.state}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="district">
          District <span style={{ color: 'var(--error-color)' }}>*</span>
        </label>
        <input
          type="text"
          id="district"
          className="form-input"
          value={profile.location?.district || ''}
          onChange={(e) => onUpdate({ 
            location: { 
              ...profile.location,
              state: profile.location?.state || '',
              district: e.target.value,
              residenceType: profile.location?.residenceType || ResidenceType.URBAN
            } 
          })}
          placeholder="Enter your district"
        />
        {errors.district && <span className="form-error">{errors.district}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="pincode">
          Pincode
        </label>
        <input
          type="text"
          id="pincode"
          className="form-input"
          value={profile.location?.pincode || ''}
          onChange={(e) => onUpdate({ 
            location: { 
              ...profile.location,
              state: profile.location?.state || '',
              district: profile.location?.district || '',
              residenceType: profile.location?.residenceType || ResidenceType.URBAN,
              pincode: e.target.value
            } 
          })}
          placeholder="Enter pincode"
          maxLength={6}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="residenceType">
          Area Type
        </label>
        <select
          id="residenceType"
          className="form-select"
          value={profile.location?.residenceType || ''}
          onChange={(e) => onUpdate({ 
            location: { 
              ...profile.location,
              state: profile.location?.state || '',
              district: profile.location?.district || '',
              residenceType: e.target.value as ResidenceType
            } 
          })}
        >
          <option value="">Select area type</option>
          <option value={ResidenceType.RURAL}>Rural</option>
          <option value={ResidenceType.SEMI_URBAN}>Semi-Urban</option>
          <option value={ResidenceType.URBAN}>Urban</option>
        </select>
        <span className="form-hint">Some schemes are specific to rural or urban areas</span>
      </div>
    </div>
  );
}
