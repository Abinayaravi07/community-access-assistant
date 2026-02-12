/**
 * User Profile Interfaces
 * Defines the structure for user and family member data
 */
import { AgeRange, CasteCategory, EducationLevel, Gender, IncomeLevel, MaritalStatus, OccupationType, RelationshipType, ResidenceType, SupportedLanguage } from './enums';
/**
 * Location information for a user
 */
export interface LocationInfo {
    state: string;
    district: string;
    pincode?: string;
    residenceType: ResidenceType;
}
/**
 * Represents a family member in the user's household
 */
export interface FamilyMember {
    id: string;
    name?: string;
    relationship: RelationshipType;
    age: number;
    gender: Gender;
    occupation?: OccupationType;
    educationLevel?: EducationLevel;
    annualIncome?: number;
    specialNeeds?: string[];
    isDisabled?: boolean;
    disabilityPercentage?: number;
}
/**
 * Complete user profile for scheme matching
 */
export interface UserProfile {
    id: string;
    age: number;
    gender: Gender;
    occupation: OccupationType;
    ageGroup: AgeRange;
    incomeRange: IncomeLevel;
    annualIncome?: number;
    educationLevel: EducationLevel;
    casteCategory: CasteCategory;
    maritalStatus: MaritalStatus;
    location: LocationInfo;
    familyMembers: FamilyMember[];
    familySize: number;
    specialCircumstances: string[];
    isDisabled?: boolean;
    disabilityPercentage?: number;
    preferredLanguage: SupportedLanguage;
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Partial profile used during collection
 */
export type PartialUserProfile = Partial<UserProfile>;
/**
 * Validation result for profile data
 */
export interface ValidationResult {
    isValid: boolean;
    missingFields: string[];
    errors: ValidationError[];
}
/**
 * Individual validation error
 */
export interface ValidationError {
    field: string;
    message: string;
    code: string;
}
/**
 * Profile collector interface
 */
export interface ProfileCollector {
    collectProfile(): Promise<UserProfile>;
    validateProfile(profile: PartialUserProfile): ValidationResult;
    updateProfile(profile: UserProfile, updates: PartialUserProfile): UserProfile;
}
//# sourceMappingURL=user-profile.d.ts.map