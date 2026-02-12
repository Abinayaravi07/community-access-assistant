/**
 * Property-Based Tests for Profile Validation
 * Property 1: Profile Validation Completeness
 * Property 16: Family Profile Completeness
 * 
 * Feature: community-access-assistant
 */

import * as fc from 'fast-check';
import {
  validateProfile,
  isFamilyProfileComplete,
  getAgeGroup
} from '../validation/profile-validation';
import {
  arbUserProfile,
  arbPartialUserProfile,
  arbFamilyMember
} from '../testing/generators';
import {
  AgeRange,
  Gender,
  OccupationType,
  IncomeLevel,
  EducationLevel,
  CasteCategory,
  MaritalStatus,
  ResidenceType,
  SupportedLanguage,
  RelationshipType
} from '../types/enums';
import { UserProfile, FamilyMember } from '../types/user-profile';

describe('Feature: community-access-assistant', () => {
  describe('Property 1: Profile Validation Completeness', () => {
    /**
     * For any user profile input, the validation system should correctly 
     * identify all missing required fields and accept only profiles with 
     * all required fields present.
     */
    
    it('should identify all missing required fields in partial profiles', () => {
      fc.assert(
        fc.property(arbPartialUserProfile, (partialProfile) => {
          const result = validateProfile(partialProfile);
          
          // If validation fails, there should be missing fields or errors
          if (!result.isValid) {
            return result.missingFields.length > 0 || result.errors.length > 0;
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });

    it('should accept complete profiles with all required fields', () => {
      fc.assert(
        fc.property(arbUserProfile, (profile) => {
          const result = validateProfile(profile);
          
          // A complete profile should have no missing fields
          // It may still have validation errors (like age mismatch)
          return result.missingFields.length === 0;
        }),
        { numRuns: 100 }
      );
    });

    it('should validate age is within reasonable bounds', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: -100, max: 200 }),
          (age) => {
            const profile: Partial<UserProfile> = { age };
            const result = validateProfile(profile);
            
            if (age < 0 || age > 120) {
              // Should have an age-related error
              return result.errors.some(e => e.field === 'age');
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should detect age group mismatch', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 0, max: 100 }),
          fc.constantFrom(...Object.values(AgeRange)),
          (age, ageGroup) => {
            const expectedAgeGroup = getAgeGroup(age);
            const profile: Partial<UserProfile> = { age, ageGroup };
            const result = validateProfile(profile);
            
            if (ageGroup !== expectedAgeGroup) {
              // Should detect the mismatch
              return result.errors.some(e => e.field === 'ageGroup');
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 16: Family Profile Completeness', () => {
    /**
     * For any family profile collection, all household members should have 
     * complete information including age, education status, and special 
     * circumstances captured.
     */

    it('should require basic info for all family members', () => {
      fc.assert(
        fc.property(
          fc.array(arbFamilyMember, { minLength: 1, maxLength: 5 }),
          (familyMembers) => {
            const profile: Partial<UserProfile> = { familyMembers };
            const isComplete = isFamilyProfileComplete(profile);
            
            // Check if all members have required basic info
            const allHaveBasicInfo = familyMembers.every(m => 
              m.age !== undefined && 
              m.gender !== undefined && 
              m.relationship !== undefined
            );
            
            // If any member lacks basic info, should not be complete
            if (!allHaveBasicInfo) {
              return !isComplete;
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should require education level for school-age members', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 6, max: 25 }), // School age and above
          fc.constantFrom(...Object.values(Gender)),
          fc.constantFrom(...Object.values(RelationshipType)),
          (age, gender, relationship) => {
            const member: FamilyMember = {
              id: 'test-member',
              age,
              gender,
              relationship,
              // Deliberately missing educationLevel
            };
            
            const profile: Partial<UserProfile> = { familyMembers: [member] };
            const isComplete = isFamilyProfileComplete(profile);
            
            // School-age members need education level
            return !isComplete;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should accept complete family profiles', () => {
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.uuid(),
              age: fc.integer({ min: 0, max: 100 }),
              gender: fc.constantFrom(...Object.values(Gender)),
              relationship: fc.constantFrom(...Object.values(RelationshipType)),
              educationLevel: fc.constantFrom(...Object.values(EducationLevel))
            }),
            { minLength: 0, maxLength: 5 }
          ),
          (familyMembers) => {
            const profile: Partial<UserProfile> = { 
              familyMembers: familyMembers as FamilyMember[] 
            };
            const isComplete = isFamilyProfileComplete(profile);
            
            // With all fields present, should be complete
            return isComplete;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle empty family gracefully', () => {
      const emptyFamilyProfile: Partial<UserProfile> = { familyMembers: [] };
      expect(isFamilyProfileComplete(emptyFamilyProfile)).toBe(true);
      
      const noFamilyProfile: Partial<UserProfile> = {};
      expect(isFamilyProfileComplete(noFamilyProfile)).toBe(true);
    });
  });
});
