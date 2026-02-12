/**
 * Government Scheme Interfaces
 * Defines the structure for government schemes and eligibility criteria
 */
import { BenefitType, ComparisonOperator, CriterionType, GovernmentLevel } from './enums';
/**
 * Data source attribution for scheme information
 */
export interface DataSource {
    name: string;
    url: string;
    lastAccessed: Date;
    isOfficial: boolean;
}
/**
 * Contact information for scheme-related queries
 */
export interface ContactInformation {
    department: string;
    phone?: string;
    email?: string;
    address?: string;
    helplineNumber?: string;
    websiteUrl?: string;
}
/**
 * Document required for scheme application
 */
export interface RequiredDocument {
    name: string;
    description: string;
    isMandatory: boolean;
    alternativeDocuments?: string[];
}
/**
 * Step in the application process
 */
export interface ApplicationStep {
    stepNumber: number;
    title: string;
    description: string;
    requiredDocuments: string[];
    estimatedTime: string;
    onlineAvailable: boolean;
    onlineUrl?: string;
    offlineLocation?: string;
    helplineNumber?: string;
    tips?: string[];
}
/**
 * Single eligibility criterion for a scheme
 */
export interface EligibilityCriterion {
    id: string;
    type: CriterionType;
    field: string;
    operator: ComparisonOperator;
    value: unknown;
    description: string;
    isMandatory: boolean;
}
/**
 * Benefit details of a scheme
 */
export interface BenefitDetails {
    type: 'monetary' | 'service' | 'subsidy' | 'other';
    description: string;
    amount?: number;
    amountType?: 'one_time' | 'monthly' | 'yearly' | 'as_needed';
    currency?: string;
}
/**
 * Complete government scheme information
 */
export interface GovernmentScheme {
    id: string;
    name: string;
    shortName?: string;
    description: string;
    simplifiedDescription?: string;
    benefitType: BenefitType;
    benefitCategories: BenefitType[];
    governmentLevel: GovernmentLevel;
    implementingAgency: string;
    eligibilityCriteria: EligibilityCriterion[];
    targetDemographics: string[];
    benefits: BenefitDetails[];
    applicationProcess: ApplicationStep[];
    documents: RequiredDocument[];
    applicationDeadline?: Date;
    isOpenForApplication: boolean;
    contactInfo: ContactInformation;
    source: DataSource;
    lastUpdated: Date;
    lastVerified: Date;
    isActive: boolean;
    availableLanguages: string[];
    localizedContent?: Record<string, LocalizedSchemeContent>;
}
/**
 * Localized content for a scheme
 */
export interface LocalizedSchemeContent {
    name: string;
    description: string;
    simplifiedDescription?: string;
    applicationSteps?: ApplicationStep[];
}
/**
 * Scheme validation result
 */
export interface SchemeValidationResult {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}
/**
 * Schemes database interface
 */
export interface SchemesDatabase {
    getAllSchemes(): Promise<GovernmentScheme[]>;
    getSchemeById(id: string): Promise<GovernmentScheme | null>;
    getSchemesByCategory(category: BenefitType): Promise<GovernmentScheme[]>;
    getSchemesByState(state: string): Promise<GovernmentScheme[]>;
    searchSchemes(query: string): Promise<GovernmentScheme[]>;
    refreshFromSources(): Promise<void>;
    getStaleSchemes(thresholdDays: number): Promise<GovernmentScheme[]>;
}
//# sourceMappingURL=government-scheme.d.ts.map