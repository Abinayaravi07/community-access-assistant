/**
 * Shared Types Package - Main Export
 * Exports all types and interfaces for the Community Access Assistant
 */
export { AgeRange, BenefitType, CasteCategory, ComparisonOperator, CriterionType, EducationLevel, Gender, GovernmentLevel, IncomeLevel, MaritalStatus, OccupationType, RelationshipType, ResidenceType, SupportedLanguage } from './types/enums';
export type { FamilyMember, LocationInfo, PartialUserProfile, ProfileCollector, UserProfile, ValidationError, ValidationResult } from './types/user-profile';
export type { ApplicationStep, BenefitDetails, ContactInformation, DataSource, EligibilityCriterion, GovernmentScheme, LocalizedSchemeContent, RequiredDocument, SchemesDatabase, SchemeValidationResult } from './types/government-scheme';
export type { CategorizedMatchResults, CriterionMatchExplanation, FamilyMemberMatchSummary, MatchExplanation, MatchingEngine, MatchingSummary, MatchResult } from './types/matching';
export type { CriterionExplanation, DocumentExplanation, EligibilityExplanation, LanguageSimplifier, SimplifiedApplicationStep, SimplifiedScheme, TermDefinition } from './types/language-simplifier';
export type { PrivacyConsent, SessionData, SessionManager } from './types/session';
export { validateScheme, validateProfile, validateFamilyMember, validateLocation, getAgeGroup, isSchemeStale, getStaleSchemes, hasCompleteSourceAttribution, isFamilyProfileComplete } from './validation';
export { InMemorySchemesDatabase } from './database';
export type { SchemesDatabaseConfig } from './database';
export { CoreMatchingEngine, matchingEngine } from './engine';
export { sampleSchemes } from './data';
//# sourceMappingURL=index.d.ts.map