/**
 * Test Generators for Property-Based Testing
 * Uses fast-check to generate random test data for comprehensive testing
 */

import * as fc from 'fast-check';
import {
  AgeRange,
  BenefitType,
  CasteCategory,
  ComparisonOperator,
  CriterionType,
  EducationLevel,
  Gender,
  GovernmentLevel,
  IncomeLevel,
  MaritalStatus,
  OccupationType,
  RelationshipType,
  ResidenceType,
  SupportedLanguage
} from '../types/enums';
import { FamilyMember, LocationInfo, UserProfile } from '../types/user-profile';
import {
  ApplicationStep,
  BenefitDetails,
  ContactInformation,
  DataSource,
  EligibilityCriterion,
  GovernmentScheme,
  RequiredDocument
} from '../types/government-scheme';

/**
 * Generate a random enum value
 */
function arbEnum<T extends Record<string, string>>(enumObj: T): fc.Arbitrary<T[keyof T]> {
  const values = Object.values(enumObj) as T[keyof T][];
  return fc.constantFrom(...values);
}

/**
 * Generate a random UUID-like string
 */
export const arbId = fc.uuid();

/**
 * Generate a random LocationInfo
 */
export const arbLocationInfo: fc.Arbitrary<LocationInfo> = fc.record({
  state: fc.constantFrom(
    'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan',
    'Uttar Pradesh', 'West Bengal', 'Madhya Pradesh', 'Kerala', 'Delhi'
  ),
  district: fc.string({ minLength: 3, maxLength: 20 }),
  pincode: fc.option(fc.stringMatching(/^[1-9][0-9]{5}$/), { nil: undefined }),
  residenceType: arbEnum(ResidenceType)
});

/**
 * Generate a random FamilyMember
 */
export const arbFamilyMember: fc.Arbitrary<FamilyMember> = fc.record({
  id: arbId,
  name: fc.option(fc.string({ minLength: 2, maxLength: 30 }), { nil: undefined }),
  relationship: arbEnum(RelationshipType),
  age: fc.integer({ min: 0, max: 100 }),
  gender: arbEnum(Gender),
  occupation: fc.option(arbEnum(OccupationType), { nil: undefined }),
  educationLevel: fc.option(arbEnum(EducationLevel), { nil: undefined }),
  annualIncome: fc.option(fc.integer({ min: 0, max: 10000000 }), { nil: undefined }),
  specialNeeds: fc.option(fc.array(fc.string({ minLength: 2, maxLength: 50 }), { maxLength: 5 }), { nil: undefined }),
  isDisabled: fc.option(fc.boolean(), { nil: undefined }),
  disabilityPercentage: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined })
});

/**
 * Generate a random UserProfile
 */
export const arbUserProfile: fc.Arbitrary<UserProfile> = fc.record({
  id: arbId,
  age: fc.integer({ min: 18, max: 100 }),
  gender: arbEnum(Gender),
  occupation: arbEnum(OccupationType),
  ageGroup: arbEnum(AgeRange),
  incomeRange: arbEnum(IncomeLevel),
  annualIncome: fc.option(fc.integer({ min: 0, max: 10000000 }), { nil: undefined }),
  educationLevel: arbEnum(EducationLevel),
  casteCategory: arbEnum(CasteCategory),
  maritalStatus: arbEnum(MaritalStatus),
  location: arbLocationInfo,
  familyMembers: fc.array(arbFamilyMember, { minLength: 0, maxLength: 10 }),
  familySize: fc.integer({ min: 1, max: 15 }),
  specialCircumstances: fc.array(fc.string({ minLength: 2, maxLength: 50 }), { maxLength: 5 }),
  isDisabled: fc.option(fc.boolean(), { nil: undefined }),
  disabilityPercentage: fc.option(fc.integer({ min: 0, max: 100 }), { nil: undefined }),
  preferredLanguage: arbEnum(SupportedLanguage),
  createdAt: fc.date(),
  updatedAt: fc.date()
});

/**
 * Generate a random DataSource
 */
export const arbDataSource: fc.Arbitrary<DataSource> = fc.record({
  name: fc.string({ minLength: 5, maxLength: 50 }),
  url: fc.webUrl(),
  lastAccessed: fc.date(),
  isOfficial: fc.boolean()
});

/**
 * Generate a random ContactInformation
 */
export const arbContactInfo: fc.Arbitrary<ContactInformation> = fc.record({
  department: fc.string({ minLength: 5, maxLength: 100 }),
  phone: fc.option(fc.stringMatching(/^\+91[0-9]{10}$/), { nil: undefined }),
  email: fc.option(fc.emailAddress(), { nil: undefined }),
  address: fc.option(fc.string({ minLength: 10, maxLength: 200 }), { nil: undefined }),
  helplineNumber: fc.option(fc.stringMatching(/^1[0-9]{3}$/), { nil: undefined }),
  websiteUrl: fc.option(fc.webUrl(), { nil: undefined })
});

/**
 * Generate a random RequiredDocument
 */
export const arbRequiredDocument: fc.Arbitrary<RequiredDocument> = fc.record({
  name: fc.string({ minLength: 3, maxLength: 50 }),
  description: fc.string({ minLength: 10, maxLength: 200 }),
  isMandatory: fc.boolean(),
  alternativeDocuments: fc.option(
    fc.array(fc.string({ minLength: 3, maxLength: 50 }), { maxLength: 3 }),
    { nil: undefined }
  )
});

/**
 * Generate a random ApplicationStep
 */
export const arbApplicationStep: fc.Arbitrary<ApplicationStep> = fc.record({
  stepNumber: fc.integer({ min: 1, max: 20 }),
  title: fc.string({ minLength: 5, maxLength: 50 }),
  description: fc.string({ minLength: 10, maxLength: 500 }),
  requiredDocuments: fc.array(fc.string({ minLength: 3, maxLength: 50 }), { maxLength: 5 }),
  estimatedTime: fc.constantFrom('5 minutes', '15 minutes', '30 minutes', '1 hour', '1-2 days'),
  onlineAvailable: fc.boolean(),
  onlineUrl: fc.option(fc.webUrl(), { nil: undefined }),
  offlineLocation: fc.option(fc.string({ minLength: 5, maxLength: 100 }), { nil: undefined }),
  helplineNumber: fc.option(fc.stringMatching(/^1[0-9]{3}$/), { nil: undefined }),
  tips: fc.option(fc.array(fc.string({ minLength: 5, maxLength: 100 }), { maxLength: 5 }), { nil: undefined })
});

/**
 * Generate a random EligibilityCriterion
 */
export const arbEligibilityCriterion: fc.Arbitrary<EligibilityCriterion> = fc.record({
  id: arbId,
  type: arbEnum(CriterionType),
  field: fc.constantFrom('age', 'income', 'occupation', 'education', 'gender', 'location'),
  operator: arbEnum(ComparisonOperator),
  value: fc.oneof(
    fc.integer({ min: 0, max: 100 }),
    fc.string({ minLength: 2, maxLength: 20 }),
    fc.array(fc.string({ minLength: 2, maxLength: 20 }), { maxLength: 5 })
  ),
  description: fc.string({ minLength: 10, maxLength: 200 }),
  isMandatory: fc.boolean()
});

/**
 * Generate a random BenefitDetails
 */
export const arbBenefitDetails: fc.Arbitrary<BenefitDetails> = fc.record({
  type: fc.constantFrom('monetary', 'service', 'subsidy', 'other'),
  description: fc.string({ minLength: 10, maxLength: 200 }),
  amount: fc.option(fc.integer({ min: 100, max: 1000000 }), { nil: undefined }),
  amountType: fc.option(fc.constantFrom('one_time', 'monthly', 'yearly', 'as_needed'), { nil: undefined }),
  currency: fc.option(fc.constant('INR'), { nil: undefined })
});

/**
 * Generate a random GovernmentScheme
 */
export const arbGovernmentScheme: fc.Arbitrary<GovernmentScheme> = fc.record({
  id: arbId,
  name: fc.string({ minLength: 5, maxLength: 100 }),
  shortName: fc.option(fc.string({ minLength: 2, maxLength: 20 }), { nil: undefined }),
  description: fc.string({ minLength: 50, maxLength: 1000 }),
  simplifiedDescription: fc.option(fc.string({ minLength: 30, maxLength: 500 }), { nil: undefined }),
  benefitType: arbEnum(BenefitType),
  benefitCategories: fc.array(arbEnum(BenefitType), { minLength: 1, maxLength: 3 }),
  governmentLevel: arbEnum(GovernmentLevel),
  implementingAgency: fc.string({ minLength: 5, maxLength: 100 }),
  eligibilityCriteria: fc.array(arbEligibilityCriterion, { minLength: 1, maxLength: 10 }),
  targetDemographics: fc.array(fc.string({ minLength: 3, maxLength: 30 }), { minLength: 1, maxLength: 5 }),
  benefits: fc.array(arbBenefitDetails, { minLength: 1, maxLength: 5 }),
  applicationProcess: fc.array(arbApplicationStep, { minLength: 1, maxLength: 10 }),
  documents: fc.array(arbRequiredDocument, { minLength: 1, maxLength: 10 }),
  applicationDeadline: fc.option(fc.date({ min: new Date() }), { nil: undefined }),
  isOpenForApplication: fc.boolean(),
  contactInfo: arbContactInfo,
  source: arbDataSource,
  lastUpdated: fc.date(),
  lastVerified: fc.date(),
  isActive: fc.boolean(),
  availableLanguages: fc.array(fc.constantFrom('en', 'hi', 'ta', 'te', 'kn'), { minLength: 1, maxLength: 5 }),
  localizedContent: fc.constant(undefined)
});

/**
 * Generate a partial user profile (for testing validation)
 */
export const arbPartialUserProfile = fc.record({
  id: fc.option(arbId, { nil: undefined }),
  age: fc.option(fc.integer({ min: 0, max: 120 }), { nil: undefined }),
  gender: fc.option(arbEnum(Gender), { nil: undefined }),
  occupation: fc.option(arbEnum(OccupationType), { nil: undefined }),
  ageGroup: fc.option(arbEnum(AgeRange), { nil: undefined }),
  incomeRange: fc.option(arbEnum(IncomeLevel), { nil: undefined }),
  educationLevel: fc.option(arbEnum(EducationLevel), { nil: undefined }),
  casteCategory: fc.option(arbEnum(CasteCategory), { nil: undefined }),
  maritalStatus: fc.option(arbEnum(MaritalStatus), { nil: undefined }),
  location: fc.option(arbLocationInfo, { nil: undefined }),
  familyMembers: fc.option(fc.array(arbFamilyMember, { maxLength: 5 }), { nil: undefined }),
  familySize: fc.option(fc.integer({ min: 1, max: 15 }), { nil: undefined }),
  preferredLanguage: fc.option(arbEnum(SupportedLanguage), { nil: undefined })
});
