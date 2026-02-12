/**
 * AI Matching Engine
 * Core algorithm for matching user profiles against government scheme eligibility criteria
 */
import { MatchingEngine, MatchResult, MatchExplanation, CategorizedMatchResults, MatchingSummary } from '../types/matching';
import { UserProfile } from '../types/user-profile';
import { GovernmentScheme } from '../types/government-scheme';
/**
 * Core matching engine implementation
 */
export declare class CoreMatchingEngine implements MatchingEngine {
    /**
     * Find all matching schemes for a user profile
     * Property 3: Comprehensive Scheme Matching
     * Property 17: Family-Aware Benefit Matching
     */
    findMatches(profile: UserProfile, schemes: GovernmentScheme[]): MatchResult[];
    /**
     * Evaluate a scheme for the primary profile
     */
    private evaluateSchemeForProfile;
    /**
     * Evaluate a scheme for a specific family member
     * Property 12: Demographic-Aware Matching
     */
    private evaluateSchemeForMember;
    /**
     * Rank matches by priority and eligibility score
     */
    rankMatches(matches: MatchResult[]): MatchResult[];
    /**
     * Generate detailed explanation for a match
     * Property 7: Personalized Explanation Generation
     */
    explainMatch(match: MatchResult, profile: UserProfile): MatchExplanation;
    /**
     * Generate explanation for a single criterion
     */
    private generateCriterionExplanation;
    /**
     * Generate personalized explanation based on profile
     */
    private generatePersonalizedExplanation;
    /**
     * Categorize matches by benefit type
     * Property 13: Result Organization by Category
     */
    categorizeMatches(matches: MatchResult[]): CategorizedMatchResults[];
    /**
     * Generate summary of all matches
     */
    getSummary(matches: MatchResult[], profile: UserProfile): MatchingSummary;
}
/**
 * Export a default instance
 */
export declare const matchingEngine: CoreMatchingEngine;
//# sourceMappingURL=matching-engine.d.ts.map