/**
 * Matching Engine Interfaces
 * Defines the structure for scheme matching and results
 */
import { FamilyMember, UserProfile } from './user-profile';
import { EligibilityCriterion, GovernmentScheme } from './government-scheme';
import { BenefitType } from './enums';
/**
 * Explanation of why a criterion was matched or not
 */
export interface CriterionMatchExplanation {
    criterion: EligibilityCriterion;
    isMatched: boolean;
    userValue: unknown;
    explanation: string;
}
/**
 * Detailed explanation of a match
 */
export interface MatchExplanation {
    overallScore: number;
    matchedCriteria: CriterionMatchExplanation[];
    unmatchedCriteria: CriterionMatchExplanation[];
    summary: string;
    personalizedExplanation: string;
}
/**
 * Result of matching a user profile against a scheme
 */
export interface MatchResult {
    scheme: GovernmentScheme;
    eligibilityScore: number;
    isFullyEligible: boolean;
    applicableMembers: FamilyMember[];
    applicableTo: 'individual' | 'family' | 'specific_member';
    specificMemberId?: string;
    matchedCriteria: EligibilityCriterion[];
    missingCriteria: EligibilityCriterion[];
    partialMatchCriteria: EligibilityCriterion[];
    explanation?: MatchExplanation;
    priority: 'high' | 'medium' | 'low';
}
/**
 * Grouped match results by category
 */
export interface CategorizedMatchResults {
    category: BenefitType;
    categoryName: string;
    results: MatchResult[];
    totalCount: number;
}
/**
 * Summary of all matching results
 */
export interface MatchingSummary {
    totalSchemesAnalyzed: number;
    totalMatches: number;
    fullyEligibleCount: number;
    partiallyEligibleCount: number;
    categorizedResults: CategorizedMatchResults[];
    familyMemberMatches: FamilyMemberMatchSummary[];
    timestamp: Date;
}
/**
 * Match summary for a specific family member
 */
export interface FamilyMemberMatchSummary {
    member: FamilyMember;
    matchCount: number;
    topSchemes: MatchResult[];
}
/**
 * Matching engine interface
 */
export interface MatchingEngine {
    findMatches(profile: UserProfile, schemes: GovernmentScheme[]): MatchResult[];
    rankMatches(matches: MatchResult[]): MatchResult[];
    explainMatch(match: MatchResult, profile: UserProfile): MatchExplanation;
    categorizeMatches(matches: MatchResult[]): CategorizedMatchResults[];
    getSummary(matches: MatchResult[], profile: UserProfile): MatchingSummary;
}
//# sourceMappingURL=matching.d.ts.map