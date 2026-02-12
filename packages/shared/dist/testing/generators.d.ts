/**
 * Test Generators for Property-Based Testing
 * Uses fast-check to generate random test data for comprehensive testing
 */
import * as fc from 'fast-check';
import { AgeRange, CasteCategory, EducationLevel, Gender, IncomeLevel, MaritalStatus, OccupationType, SupportedLanguage } from '../types/enums';
import { FamilyMember, LocationInfo, UserProfile } from '../types/user-profile';
import { ApplicationStep, BenefitDetails, ContactInformation, DataSource, EligibilityCriterion, GovernmentScheme, RequiredDocument } from '../types/government-scheme';
/**
 * Generate a random UUID-like string
 */
export declare const arbId: fc.Arbitrary<string>;
/**
 * Generate a random LocationInfo
 */
export declare const arbLocationInfo: fc.Arbitrary<LocationInfo>;
/**
 * Generate a random FamilyMember
 */
export declare const arbFamilyMember: fc.Arbitrary<FamilyMember>;
/**
 * Generate a random UserProfile
 */
export declare const arbUserProfile: fc.Arbitrary<UserProfile>;
/**
 * Generate a random DataSource
 */
export declare const arbDataSource: fc.Arbitrary<DataSource>;
/**
 * Generate a random ContactInformation
 */
export declare const arbContactInfo: fc.Arbitrary<ContactInformation>;
/**
 * Generate a random RequiredDocument
 */
export declare const arbRequiredDocument: fc.Arbitrary<RequiredDocument>;
/**
 * Generate a random ApplicationStep
 */
export declare const arbApplicationStep: fc.Arbitrary<ApplicationStep>;
/**
 * Generate a random EligibilityCriterion
 */
export declare const arbEligibilityCriterion: fc.Arbitrary<EligibilityCriterion>;
/**
 * Generate a random BenefitDetails
 */
export declare const arbBenefitDetails: fc.Arbitrary<BenefitDetails>;
/**
 * Generate a random GovernmentScheme
 */
export declare const arbGovernmentScheme: fc.Arbitrary<GovernmentScheme>;
/**
 * Generate a partial user profile (for testing validation)
 */
export declare const arbPartialUserProfile: fc.Arbitrary<{
    id: string | undefined;
    age: number | undefined;
    gender: Gender | undefined;
    occupation: OccupationType | undefined;
    ageGroup: AgeRange | undefined;
    incomeRange: IncomeLevel | undefined;
    educationLevel: EducationLevel | undefined;
    casteCategory: CasteCategory | undefined;
    maritalStatus: MaritalStatus | undefined;
    location: LocationInfo | undefined;
    familyMembers: FamilyMember[] | undefined;
    familySize: number | undefined;
    preferredLanguage: SupportedLanguage | undefined;
}>;
//# sourceMappingURL=generators.d.ts.map