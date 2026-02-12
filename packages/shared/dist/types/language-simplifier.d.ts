/**
 * Language Simplifier Interfaces
 * Defines the structure for language simplification and explanation generation
 */
import { UserProfile } from './user-profile';
import { ApplicationStep, EligibilityCriterion, GovernmentScheme } from './government-scheme';
/**
 * Technical term definition
 */
export interface TermDefinition {
    term: string;
    definition: string;
    example?: string;
}
/**
 * Simplified version of a government scheme
 */
export interface SimplifiedScheme {
    originalScheme: GovernmentScheme;
    simplifiedName: string;
    simplifiedDescription: string;
    keyBenefits: string[];
    whoCanApply: string[];
    howToApply: string[];
    importantDates?: string[];
    technicalTerms: TermDefinition[];
    readabilityScore: number;
}
/**
 * Eligibility explanation personalized for a user
 */
export interface EligibilityExplanation {
    summary: string;
    detailedExplanations: CriterionExplanation[];
    userRelevantExamples: string[];
    actionItems: string[];
}
/**
 * Explanation for a single criterion
 */
export interface CriterionExplanation {
    criterion: EligibilityCriterion;
    simpleExplanation: string;
    userSpecificNote: string;
    meetsRequirement: boolean;
}
/**
 * Simplified application step
 */
export interface SimplifiedApplicationStep {
    original: ApplicationStep;
    simplifiedTitle: string;
    simplifiedDescription: string;
    documentsExplained: DocumentExplanation[];
    helpfulTips: string[];
    estimatedEffort: string;
}
/**
 * Document explanation
 */
export interface DocumentExplanation {
    documentName: string;
    whatItIs: string;
    whereToGet: string;
    alternativesIfNotAvailable: string[];
}
/**
 * Language simplifier interface
 */
export interface LanguageSimplifier {
    simplifySchemeDescription(scheme: GovernmentScheme, userProfile: UserProfile): SimplifiedScheme;
    generateApplicationSteps(scheme: GovernmentScheme, userProfile: UserProfile): SimplifiedApplicationStep[];
    explainEligibility(criteria: EligibilityCriterion[], userProfile: UserProfile): EligibilityExplanation;
    defineTerms(terms: string[]): TermDefinition[];
    calculateReadabilityScore(text: string): number;
}
//# sourceMappingURL=language-simplifier.d.ts.map