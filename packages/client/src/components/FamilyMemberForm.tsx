import React, { useState } from 'react';
import type { FamilyMember } from '@community-access/shared';
import {
  Gender,
  RelationshipType,
  OccupationType,
  EducationLevel
} from '@community-access/shared';

interface FamilyMemberFormProps {
  familyMembers: FamilyMember[];
  onUpdate: (members: FamilyMember[]) => void;
}

export function FamilyMemberForm({ familyMembers, onUpdate }: FamilyMemberFormProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState<Partial<FamilyMember>>({});

  const handleAddMember = () => {
    if (!newMember.age || !newMember.gender || !newMember.relationship) {
      return;
    }

    const member: FamilyMember = {
      id: crypto.randomUUID(),
      relationship: newMember.relationship,
      age: newMember.age,
      gender: newMember.gender,
      occupation: newMember.occupation,
      educationLevel: newMember.educationLevel
    };

    onUpdate([...familyMembers, member]);
    setNewMember({});
    setIsAdding(false);
  };

  const handleRemoveMember = (id: string) => {
    onUpdate(familyMembers.filter(m => m.id !== id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Family Members</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Add your family members to find benefits for everyone in your household.
        This is optional but helps discover more schemes.
      </p>

      {/* Existing family members */}
      {familyMembers.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          {familyMembers.map((member, index) => (
            <div
              key={member.id}
              className="card"
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '1rem',
                marginBottom: '0.5rem'
              }}
            >
              <div>
                <strong style={{ textTransform: 'capitalize' }}>
                  {member.relationship.replace('_', ' ')}
                </strong>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {' '}• {member.age} years • {member.gender}
                  {member.occupation && ` • ${member.occupation.replace('_', ' ')}`}
                </span>
              </div>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="btn btn-secondary"
                style={{ padding: '0.25rem 0.75rem' }}
                aria-label={`Remove ${member.relationship}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add member form */}
      {isAdding ? (
        <div className="card" style={{ backgroundColor: 'var(--primary-light)' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add Family Member</h3>

          <div className="form-group">
            <label className="form-label" htmlFor="relationship">
              Relationship <span style={{ color: 'var(--error-color)' }}>*</span>
            </label>
            <select
              id="relationship"
              className="form-select"
              value={newMember.relationship || ''}
              onChange={(e) => setNewMember({ ...newMember, relationship: e.target.value as RelationshipType })}
            >
              <option value="">Select relationship</option>
              <option value={RelationshipType.SPOUSE}>Spouse</option>
              <option value={RelationshipType.CHILD}>Child</option>
              <option value={RelationshipType.PARENT}>Parent</option>
              <option value={RelationshipType.SIBLING}>Sibling</option>
              <option value={RelationshipType.GRANDPARENT}>Grandparent</option>
              <option value={RelationshipType.GRANDCHILD}>Grandchild</option>
              <option value={RelationshipType.OTHER}>Other</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="memberAge">
                Age <span style={{ color: 'var(--error-color)' }}>*</span>
              </label>
              <input
                type="number"
                id="memberAge"
                className="form-input"
                value={newMember.age || ''}
                onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) || undefined })}
                min="0"
                max="120"
                placeholder="Age"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="memberGender">
                Gender <span style={{ color: 'var(--error-color)' }}>*</span>
              </label>
              <select
                id="memberGender"
                className="form-select"
                value={newMember.gender || ''}
                onChange={(e) => setNewMember({ ...newMember, gender: e.target.value as Gender })}
              >
                <option value="">Select</option>
                <option value={Gender.MALE}>Male</option>
                <option value={Gender.FEMALE}>Female</option>
                <option value={Gender.OTHER}>Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="memberOccupation">
              Occupation
            </label>
            <select
              id="memberOccupation"
              className="form-select"
              value={newMember.occupation || ''}
              onChange={(e) => setNewMember({ ...newMember, occupation: e.target.value as OccupationType })}
            >
              <option value="">Select occupation</option>
              <option value={OccupationType.STUDENT}>Student</option>
              <option value={OccupationType.FARMER}>Farmer</option>
              <option value={OccupationType.GOVERNMENT_EMPLOYEE}>Government Employee</option>
              <option value={OccupationType.PRIVATE_EMPLOYEE}>Private Employee</option>
              <option value={OccupationType.SELF_EMPLOYED}>Self Employed</option>
              <option value={OccupationType.HOMEMAKER}>Homemaker</option>
              <option value={OccupationType.RETIRED}>Retired</option>
              <option value={OccupationType.UNEMPLOYED}>Unemployed</option>
              <option value={OccupationType.OTHER}>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="memberEducation">
              Education Level
            </label>
            <select
              id="memberEducation"
              className="form-select"
              value={newMember.educationLevel || ''}
              onChange={(e) => setNewMember({ ...newMember, educationLevel: e.target.value as EducationLevel })}
            >
              <option value="">Select education</option>
              <option value={EducationLevel.NO_FORMAL_EDUCATION}>No Formal Education</option>
              <option value={EducationLevel.PRIMARY}>Primary</option>
              <option value={EducationLevel.SECONDARY}>Secondary</option>
              <option value={EducationLevel.HIGHER_SECONDARY}>Higher Secondary</option>
              <option value={EducationLevel.GRADUATE}>Graduate</option>
              <option value={EducationLevel.POST_GRADUATE}>Post Graduate</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={handleAddMember}
              className="btn btn-primary"
              disabled={!newMember.age || !newMember.gender || !newMember.relationship}
            >
              Add Member
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewMember({});
              }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-secondary"
          style={{ width: '100%' }}
        >
          + Add Family Member
        </button>
      )}

      {familyMembers.length === 0 && !isAdding && (
        <p style={{ 
          textAlign: 'center', 
          color: 'var(--text-light)', 
          marginTop: '1rem',
          fontSize: '0.875rem'
        }}>
          No family members added. You can skip this step if you prefer.
        </p>
      )}
    </div>
  );
}
