/**
 * Profile Validation Utilities
 * Validates user profile data for completeness and correctness
 */

import {
  UserProfile,
  PartialUserProfile,
  ValidationResult,
  ValidationError,
  FamilyMember
} from '../types/user-profile';
import { AgeRange, RelationshipType } from '../types/enums';

/**
 * Required fields for a complete user profile
 */
const REQUIRED_PROFILE_FIELDS: (keyof UserProfile)[] = [
  'id',
  'age',
  'gender',
  'occupation',
  'ageGroup',
  'incomeRange',
  'educationLevel',
  'casteCategory',
  'maritalStatus',
  'location',
  'familySize',
  'preferredLanguage'
];

/**
 * Required fields for a family member
 */
const REQUIRED_FAMILY_MEMBER_FIELDS: (keyof FamilyMember)[] = [
  'id',
  'relationship',
  'age',
  'gender'
];

/**
 * Maps age to age group
 */
export function getAgeGroup(age: number): AgeRange {
  if (age < 6) return AgeRange.INFANT;
  if (age < 15) return AgeRange.CHILD;
  if (age < 25) return AgeRange.YOUTH;
  if (age < 45) return AgeRange.ADULT;
  if (age < 60) return AgeRange.MIDDLE_AGED;
  return AgeRange.SENIOR;
}

/**
 * Validates age is within reasonable bounds
 */
export function validateAge(age: number): ValidationError | null {
  if (age < 0) {
    return {
      field: 'age',
      message: 'Age cannot be negative',
      code: 'INVALID_AGE_NEGATIVE'
    };
  }
  if (age > 120) {
    return {
      field: 'age',
      message: 'Age seems unrealistic. Please verify.',
      code: 'INVALID_AGE_TOO_HIGH'
    };
  }
  return null;
}

/**
 * Validates a family member
 */
export function validateFamilyMember(member: Partial<FamilyMember>): ValidationError[] {
  const errors: ValidationError[] = [];

  // Check required fields
  for (const field of REQUIRED_FAMILY_MEMBER_FIELDS) {
    if (member[field] === undefined || member[field] === null) {
      errors.push({
        field: `familyMember.${field}`,
        message: `Family member ${field} is required`,
        code: `MISSING_FAMILY_MEMBER_${field.toUpperCase()}`
      });
    }
  }

  // Validate age if present
  if (member.age !== undefined) {
    const ageError = validateAge(member.age);
    if (ageError) {
      errors.push({
        ...ageError,
        field: `familyMember.${ageError.field}`
      });
    }
  }

  // Validate disability percentage if disabled
  if (member.isDisabled && member.disabilityPercentage !== undefined) {
    if (member.disabilityPercentage < 0 || member.disabilityPercentage > 100) {
      errors.push({
        field: 'familyMember.disabilityPercentage',
        message: 'Disability percentage must be between 0 and 100',
        code: 'INVALID_DISABILITY_PERCENTAGE'
      });
    }
  }

  return errors;
}

/**
 * Validates location information
 */
export function validateLocation(location: UserProfile['location'] | undefined): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!location) {
    errors.push({
      field: 'location',
      message: 'Location is required',
      code: 'MISSING_LOCATION'
    });
    return errors;
  }

  if (!location.state) {
    errors.push({
      field: 'location.state',
      message: 'State is required',
      code: 'MISSING_STATE'
    });
  }

  if (!location.district) {
    errors.push({
      field: 'location.district',
      message: 'District is required',
      code: 'MISSING_DISTRICT'
    });
  }

  if (!location.residenceType) {
    errors.push({
      field: 'location.residenceType',
      message: 'Residence type is required',
      code: 'MISSING_RESIDENCE_TYPE'
    });
  }

  if (location.pincode && !/^[1-9][0-9]{5}$/.test(location.pincode)) {
    errors.push({
      field: 'location.pincode',
      message: 'Invalid pincode format',
      code: 'INVALID_PINCODE'
    });
  }

  return errors;
}

/**
 * Validates a complete or partial user profile
 * Property 1: Profile Validation Completeness
 */
export function validateProfile(profile: PartialUserProfile): ValidationResult {
  const errors: ValidationError[] = [];
  const missingFields: string[] = [];

  // Check required fields
  for (const field of REQUIRED_PROFILE_FIELDS) {
    const value = profile[field as keyof PartialUserProfile];
    if (value === undefined || value === null) {
      missingFields.push(field);
    }
  }

  // Validate age if present
  if (profile.age !== undefined) {
    const ageError = validateAge(profile.age);
    if (ageError) {
      errors.push(ageError);
    }
  }

  // Validate age group matches age
  if (profile.age !== undefined && profile.ageGroup !== undefined) {
    const expectedAgeGroup = getAgeGroup(profile.age);
    if (profile.ageGroup !== expectedAgeGroup) {
      errors.push({
        field: 'ageGroup',
        message: `Age group should be ${expectedAgeGroup} for age ${profile.age}`,
        code: 'AGE_GROUP_MISMATCH'
      });
    }
  }

  // Validate location
  const locationErrors = validateLocation(profile.location);
  errors.push(...locationErrors);

  // Validate family members if present
  if (profile.familyMembers) {
    // Check for self relationship
    const hasSelf = profile.familyMembers.some(m => m.relationship === RelationshipType.SELF);
    if (!hasSelf && profile.familyMembers.length > 0) {
      // This is okay - self might be tracked separately
    }

    profile.familyMembers.forEach((member, index) => {
      const memberErrors = validateFamilyMember(member);
      memberErrors.forEach(err => {
        errors.push({
          ...err,
          field: `familyMembers[${index}].${err.field.replace('familyMember.', '')}`
        });
      });
    });
  }

  // Validate family size matches family members count
  if (profile.familySize !== undefined && profile.familyMembers !== undefined) {
    if (profile.familySize < profile.familyMembers.length) {
      errors.push({
        field: 'familySize',
        message: 'Family size cannot be less than number of family members',
        code: 'FAMILY_SIZE_MISMATCH'
      });
    }
  }

  // Validate disability percentage if disabled
  if (profile.isDisabled && profile.disabilityPercentage !== undefined) {
    if (profile.disabilityPercentage < 0 || profile.disabilityPercentage > 100) {
      errors.push({
        field: 'disabilityPercentage',
        message: 'Disability percentage must be between 0 and 100',
        code: 'INVALID_DISABILITY_PERCENTAGE'
      });
    }
  }

  return {
    isValid: missingFields.length === 0 && errors.length === 0,
    missingFields,
    errors
  };
}

/**
 * Checks if a family profile is complete (Property 16)
 */
export function isFamilyProfileComplete(profile: PartialUserProfile): boolean {
  if (!profile.familyMembers || profile.familyMembers.length === 0) {
    return true; // No family members is valid
  }

  return profile.familyMembers.every(member => {
    // Each member must have age, education status (for applicable ages), and special circumstances captured
    const hasBasicInfo = member.age !== undefined && 
                         member.gender !== undefined && 
                         member.relationship !== undefined;
    
    // Education level required for school-age and above
    const needsEducation = member.age !== undefined && member.age >= 6;
    const hasEducation = !needsEducation || member.educationLevel !== undefined;
    
    return hasBasicInfo && hasEducation;
  });
}
