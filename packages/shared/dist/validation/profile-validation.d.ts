/**
 * Profile Validation Utilities
 * Validates user profile data for completeness and correctness
 */
import { UserProfile, PartialUserProfile, ValidationResult, ValidationError, FamilyMember } from '../types/user-profile';
import { AgeRange } from '../types/enums';
/**
 * Maps age to age group
 */
export declare function getAgeGroup(age: number): AgeRange;
/**
 * Validates age is within reasonable bounds
 */
export declare function validateAge(age: number): ValidationError | null;
/**
 * Validates a family member
 */
export declare function validateFamilyMember(member: Partial<FamilyMember>): ValidationError[];
/**
 * Validates location information
 */
export declare function validateLocation(location: UserProfile['location'] | undefined): ValidationError[];
/**
 * Validates a complete or partial user profile
 * Property 1: Profile Validation Completeness
 */
export declare function validateProfile(profile: PartialUserProfile): ValidationResult;
/**
 * Checks if a family profile is complete (Property 16)
 */
export declare function isFamilyProfileComplete(profile: PartialUserProfile): boolean;
//# sourceMappingURL=profile-validation.d.ts.map