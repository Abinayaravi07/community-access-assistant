/**
 * Shared Types Package - Main Export
 * Exports all types and interfaces for the Community Access Assistant
 */
// Enums
export { AgeRange, BenefitType, CasteCategory, ComparisonOperator, CriterionType, EducationLevel, Gender, GovernmentLevel, IncomeLevel, MaritalStatus, OccupationType, RelationshipType, ResidenceType, SupportedLanguage } from './types/enums';
// Validation
export { validateScheme, validateProfile, validateFamilyMember, validateLocation, getAgeGroup, isSchemeStale, getStaleSchemes, hasCompleteSourceAttribution, isFamilyProfileComplete } from './validation';
// Database
export { InMemorySchemesDatabase } from './database';
// Engine
export { CoreMatchingEngine, matchingEngine } from './engine';
// Sample Data
export { sampleSchemes } from './data';
//# sourceMappingURL=index.js.map