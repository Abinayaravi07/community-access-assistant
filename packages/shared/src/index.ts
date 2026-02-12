/**
 * Shared Types Package - Main Export
 * Exports all types and interfaces for the Community Access Assistant
 */

// Enums
export {
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
} from './types/enums';

// User Profile Types
export type {
  FamilyMember,
  LocationInfo,
  PartialUserProfile,
  ProfileCollector,
  UserProfile,
  ValidationError,
  ValidationResult
} from './types/user-profile';

// Government Scheme Types
export type {
  ApplicationStep,
  BenefitDetails,
  ContactInformation,
  DataSource,
  EligibilityCriterion,
  GovernmentScheme,
  LocalizedSchemeContent,
  RequiredDocument,
  SchemesDatabase,
  SchemeValidationResult
} from './types/government-scheme';

// Matching Types
export type {
  CategorizedMatchResults,
  CriterionMatchExplanation,
  FamilyMemberMatchSummary,
  MatchExplanation,
  MatchingEngine,
  MatchingSummary,
  MatchResult
} from './types/matching';

// Language Simplifier Types
export type {
  CriterionExplanation,
  DocumentExplanation,
  EligibilityExplanation,
  LanguageSimplifier,
  SimplifiedApplicationStep,
  SimplifiedScheme,
  TermDefinition
} from './types/language-simplifier';

// Session Types
export type {
  PrivacyConsent,
  SessionData,
  SessionManager
} from './types/session';

// Validation
export {
  validateScheme,
  validateProfile,
  validateFamilyMember,
  validateLocation,
  getAgeGroup,
  isSchemeStale,
  getStaleSchemes,
  hasCompleteSourceAttribution,
  isFamilyProfileComplete
} from './validation';

// Database
export { InMemorySchemesDatabase } from './database';
export type { SchemesDatabaseConfig } from './database';

// Engine
export { CoreMatchingEngine, matchingEngine } from './engine';

// Sample Data
export { sampleSchemes } from './data';
