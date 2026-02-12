/**
 * Scheme Validation Utilities
 * Validates government scheme data for integrity and completeness
 */
import { GovernmentScheme, SchemeValidationResult, EligibilityCriterion, ApplicationStep, RequiredDocument, DataSource } from '../types/government-scheme';
/**
 * Validates a single eligibility criterion
 */
export declare function validateCriterion(criterion: EligibilityCriterion): string[];
/**
 * Validates a single application step
 */
export declare function validateApplicationStep(step: ApplicationStep): string[];
/**
 * Validates a required document
 */
export declare function validateDocument(doc: RequiredDocument): string[];
/**
 * Validates data source for completeness (Property 5)
 */
export declare function validateDataSource(source: DataSource): string[];
/**
 * Checks if a scheme is stale based on threshold (Property 4)
 */
export declare function isSchemeStale(scheme: GovernmentScheme, thresholdDays: number): boolean;
/**
 * Gets all stale schemes from a list
 */
export declare function getStaleSchemes(schemes: GovernmentScheme[], thresholdDays: number): GovernmentScheme[];
/**
 * Validates a complete government scheme
 */
export declare function validateScheme(scheme: GovernmentScheme): SchemeValidationResult;
/**
 * Validates that a scheme has complete source attribution
 */
export declare function hasCompleteSourceAttribution(scheme: GovernmentScheme): boolean;
//# sourceMappingURL=scheme-validation.d.ts.map