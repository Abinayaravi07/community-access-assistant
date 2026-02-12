/**
 * AI Matching Engine
 * Core algorithm for matching user profiles against government scheme eligibility criteria
 */
import { BenefitType, ComparisonOperator, CriterionType, RelationshipType } from '../types/enums';
import { getAgeGroup } from '../validation/profile-validation';
/**
 * Maps BenefitType to human-readable names
 */
const BENEFIT_TYPE_NAMES = {
    [BenefitType.SCHOLARSHIP]: 'Scholarships',
    [BenefitType.HEALTHCARE]: 'Healthcare',
    [BenefitType.FINANCIAL_AID]: 'Financial Aid',
    [BenefitType.EDUCATION]: 'Education',
    [BenefitType.EMPLOYMENT]: 'Employment',
    [BenefitType.HOUSING]: 'Housing',
    [BenefitType.AGRICULTURE]: 'Agriculture',
    [BenefitType.SOCIAL_SECURITY]: 'Social Security',
    [BenefitType.DISABILITY]: 'Disability Support',
    [BenefitType.WOMEN_WELFARE]: 'Women Welfare',
    [BenefitType.CHILD_WELFARE]: 'Child Welfare',
    [BenefitType.SENIOR_CITIZEN]: 'Senior Citizen'
};
/**
 * Get profile value for a given field
 */
function getProfileValue(profile, field, member) {
    const source = member || profile;
    switch (field) {
        case 'age':
            return source.age;
        case 'ageGroup':
            return member ? getAgeGroup(member.age) : profile.ageGroup;
        case 'gender':
            return source.gender;
        case 'occupation':
            return source.occupation ?? profile.occupation;
        case 'educationLevel':
            return source.educationLevel ?? profile.educationLevel;
        case 'incomeRange':
            return profile.incomeRange;
        case 'annualIncome':
            return member?.annualIncome ?? profile.annualIncome;
        case 'casteCategory':
            return profile.casteCategory;
        case 'maritalStatus':
            return profile.maritalStatus;
        case 'location':
            return profile.location;
        case 'state':
            return profile.location?.state;
        case 'residenceType':
            return profile.location?.residenceType;
        case 'familySize':
            return profile.familySize;
        case 'isDisabled':
            return source.isDisabled;
        case 'disabilityPercentage':
            return source.disabilityPercentage;
        default:
            return undefined;
    }
}
/**
 * Evaluate a single criterion against a value
 */
function evaluateCriterion(criterion, value) {
    const criterionValue = criterion.value;
    if (value === undefined || value === null) {
        return !criterion.isMandatory;
    }
    switch (criterion.operator) {
        case ComparisonOperator.EQUALS:
            return value === criterionValue;
        case ComparisonOperator.NOT_EQUALS:
            return value !== criterionValue;
        case ComparisonOperator.GREATER_THAN:
            return typeof value === 'number' && typeof criterionValue === 'number'
                && value > criterionValue;
        case ComparisonOperator.LESS_THAN:
            return typeof value === 'number' && typeof criterionValue === 'number'
                && value < criterionValue;
        case ComparisonOperator.GREATER_THAN_OR_EQUALS:
            return typeof value === 'number' && typeof criterionValue === 'number'
                && value >= criterionValue;
        case ComparisonOperator.LESS_THAN_OR_EQUALS:
            return typeof value === 'number' && typeof criterionValue === 'number'
                && value <= criterionValue;
        case ComparisonOperator.IN:
            if (Array.isArray(criterionValue)) {
                return criterionValue.includes(value);
            }
            return false;
        case ComparisonOperator.NOT_IN:
            if (Array.isArray(criterionValue)) {
                return !criterionValue.includes(value);
            }
            return true;
        case ComparisonOperator.BETWEEN:
            if (Array.isArray(criterionValue) && criterionValue.length === 2 && typeof value === 'number') {
                const [min, max] = criterionValue;
                return value >= min && value <= max;
            }
            return false;
        case ComparisonOperator.CONTAINS:
            if (typeof value === 'string' && typeof criterionValue === 'string') {
                return value.toLowerCase().includes(criterionValue.toLowerCase());
            }
            if (Array.isArray(value) && typeof criterionValue === 'string') {
                return value.some(v => typeof v === 'string' && v.toLowerCase().includes(criterionValue.toLowerCase()));
            }
            return false;
        default:
            return false;
    }
}
/**
 * Core matching engine implementation
 */
export class CoreMatchingEngine {
    /**
     * Find all matching schemes for a user profile
     * Property 3: Comprehensive Scheme Matching
     * Property 17: Family-Aware Benefit Matching
     */
    findMatches(profile, schemes) {
        const results = [];
        for (const scheme of schemes) {
            if (!scheme.isActive || !scheme.isOpenForApplication) {
                continue;
            }
            // Check for primary profile match
            const primaryResult = this.evaluateSchemeForProfile(scheme, profile);
            if (primaryResult.eligibilityScore > 0) {
                results.push(primaryResult);
            }
            // Check for family member matches (Property 17)
            for (const member of profile.familyMembers) {
                if (member.relationship === RelationshipType.SELF)
                    continue;
                const memberResult = this.evaluateSchemeForMember(scheme, profile, member);
                if (memberResult.eligibilityScore > 0) {
                    // Check if we already have this scheme for this member
                    const existingIndex = results.findIndex(r => r.scheme.id === scheme.id && r.specificMemberId === member.id);
                    if (existingIndex === -1) {
                        results.push(memberResult);
                    }
                }
            }
        }
        return this.rankMatches(results);
    }
    /**
     * Evaluate a scheme for the primary profile
     */
    evaluateSchemeForProfile(scheme, profile) {
        const matchedCriteria = [];
        const missingCriteria = [];
        const partialMatchCriteria = [];
        for (const criterion of scheme.eligibilityCriteria) {
            const value = getProfileValue(profile, criterion.field);
            const isMatched = evaluateCriterion(criterion, value);
            if (isMatched) {
                matchedCriteria.push(criterion);
            }
            else if (criterion.isMandatory) {
                missingCriteria.push(criterion);
            }
            else {
                partialMatchCriteria.push(criterion);
            }
        }
        const totalCriteria = scheme.eligibilityCriteria.length;
        const mandatoryCriteria = scheme.eligibilityCriteria.filter(c => c.isMandatory).length;
        const matchedMandatory = matchedCriteria.filter(c => c.isMandatory).length;
        // Calculate eligibility score
        let eligibilityScore = 0;
        if (mandatoryCriteria === 0 || matchedMandatory === mandatoryCriteria) {
            const mandatoryScore = mandatoryCriteria > 0 ? (matchedMandatory / mandatoryCriteria) * 70 : 70;
            const optionalScore = totalCriteria > mandatoryCriteria
                ? ((matchedCriteria.length - matchedMandatory) / (totalCriteria - mandatoryCriteria)) * 30
                : 30;
            eligibilityScore = mandatoryScore + optionalScore;
        }
        const isFullyEligible = missingCriteria.length === 0;
        // Determine priority based on scheme type and match quality
        let priority = 'medium';
        if (isFullyEligible && eligibilityScore >= 80) {
            priority = 'high';
        }
        else if (eligibilityScore < 50) {
            priority = 'low';
        }
        return {
            scheme,
            eligibilityScore,
            isFullyEligible,
            applicableMembers: [],
            applicableTo: 'individual',
            matchedCriteria,
            missingCriteria,
            partialMatchCriteria,
            priority
        };
    }
    /**
     * Evaluate a scheme for a specific family member
     * Property 12: Demographic-Aware Matching
     */
    evaluateSchemeForMember(scheme, profile, member) {
        const matchedCriteria = [];
        const missingCriteria = [];
        const partialMatchCriteria = [];
        for (const criterion of scheme.eligibilityCriteria) {
            const value = getProfileValue(profile, criterion.field, member);
            const isMatched = evaluateCriterion(criterion, value);
            if (isMatched) {
                matchedCriteria.push(criterion);
            }
            else if (criterion.isMandatory) {
                missingCriteria.push(criterion);
            }
            else {
                partialMatchCriteria.push(criterion);
            }
        }
        const totalCriteria = scheme.eligibilityCriteria.length;
        const mandatoryCriteria = scheme.eligibilityCriteria.filter(c => c.isMandatory).length;
        const matchedMandatory = matchedCriteria.filter(c => c.isMandatory).length;
        let eligibilityScore = 0;
        if (mandatoryCriteria === 0 || matchedMandatory === mandatoryCriteria) {
            const mandatoryScore = mandatoryCriteria > 0 ? (matchedMandatory / mandatoryCriteria) * 70 : 70;
            const optionalScore = totalCriteria > mandatoryCriteria
                ? ((matchedCriteria.length - matchedMandatory) / (totalCriteria - mandatoryCriteria)) * 30
                : 30;
            eligibilityScore = mandatoryScore + optionalScore;
        }
        const isFullyEligible = missingCriteria.length === 0;
        let priority = 'medium';
        if (isFullyEligible && eligibilityScore >= 80) {
            priority = 'high';
        }
        else if (eligibilityScore < 50) {
            priority = 'low';
        }
        return {
            scheme,
            eligibilityScore,
            isFullyEligible,
            applicableMembers: [member],
            applicableTo: 'specific_member',
            specificMemberId: member.id,
            matchedCriteria,
            missingCriteria,
            partialMatchCriteria,
            priority
        };
    }
    /**
     * Rank matches by priority and eligibility score
     */
    rankMatches(matches) {
        return [...matches].sort((a, b) => {
            // First, sort by priority
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
            if (priorityDiff !== 0)
                return priorityDiff;
            // Then by eligibility score
            return b.eligibilityScore - a.eligibilityScore;
        });
    }
    /**
     * Generate detailed explanation for a match
     * Property 7: Personalized Explanation Generation
     */
    explainMatch(match, profile) {
        const matchedExplanations = [];
        const unmatchedExplanations = [];
        // Explain matched criteria
        for (const criterion of match.matchedCriteria) {
            const member = match.specificMemberId
                ? profile.familyMembers.find(m => m.id === match.specificMemberId)
                : undefined;
            const userValue = getProfileValue(profile, criterion.field, member);
            matchedExplanations.push({
                criterion,
                isMatched: true,
                userValue,
                explanation: this.generateCriterionExplanation(criterion, userValue, true, profile)
            });
        }
        // Explain missing criteria
        for (const criterion of match.missingCriteria) {
            const member = match.specificMemberId
                ? profile.familyMembers.find(m => m.id === match.specificMemberId)
                : undefined;
            const userValue = getProfileValue(profile, criterion.field, member);
            unmatchedExplanations.push({
                criterion,
                isMatched: false,
                userValue,
                explanation: this.generateCriterionExplanation(criterion, userValue, false, profile)
            });
        }
        const summary = match.isFullyEligible
            ? `You meet all requirements for ${match.scheme.name}!`
            : `You meet ${match.matchedCriteria.length} of ${match.matchedCriteria.length + match.missingCriteria.length} requirements.`;
        const personalizedExplanation = this.generatePersonalizedExplanation(match, profile);
        return {
            overallScore: match.eligibilityScore,
            matchedCriteria: matchedExplanations,
            unmatchedCriteria: unmatchedExplanations,
            summary,
            personalizedExplanation
        };
    }
    /**
     * Generate explanation for a single criterion
     */
    generateCriterionExplanation(criterion, userValue, isMatched, profile) {
        if (isMatched) {
            switch (criterion.type) {
                case CriterionType.AGE_RANGE:
                    return `Your age (${userValue}) meets the requirement.`;
                case CriterionType.INCOME_LIMIT:
                    return `Your income level qualifies for this scheme.`;
                case CriterionType.OCCUPATION:
                    return `Your occupation as ${userValue} qualifies you.`;
                case CriterionType.EDUCATION_LEVEL:
                    return `Your education level meets the requirement.`;
                case CriterionType.CASTE_CATEGORY:
                    return `You belong to an eligible category.`;
                default:
                    return `Requirement met: ${criterion.description}`;
            }
        }
        else {
            switch (criterion.type) {
                case CriterionType.AGE_RANGE:
                    return `Age requirement not met. Required: ${criterion.description}, Your age: ${userValue}.`;
                case CriterionType.INCOME_LIMIT:
                    return `Income requirement not met. ${criterion.description}.`;
                case CriterionType.OCCUPATION:
                    return `Occupation requirement not met. Required: ${criterion.description}.`;
                default:
                    return `Requirement not met: ${criterion.description}`;
            }
        }
    }
    /**
     * Generate personalized explanation based on profile
     */
    generatePersonalizedExplanation(match, profile) {
        const scheme = match.scheme;
        const parts = [];
        if (match.isFullyEligible) {
            parts.push(`Great news! As a ${profile.occupation} from ${profile.location.state}, you are fully eligible for ${scheme.name}.`);
        }
        else {
            parts.push(`Based on your profile, you may be eligible for ${scheme.name}.`);
        }
        // Add specific benefit information
        if (scheme.benefits.length > 0) {
            const benefit = scheme.benefits[0];
            if (benefit.amount) {
                parts.push(`This scheme provides ${benefit.description} of ₹${benefit.amount.toLocaleString()}.`);
            }
            else {
                parts.push(`This scheme provides: ${benefit.description}.`);
            }
        }
        // Add applicable member info
        if (match.applicableTo === 'specific_member' && match.applicableMembers.length > 0) {
            const member = match.applicableMembers[0];
            parts.push(`This scheme specifically applies to your family member (${member.relationship}).`);
        }
        return parts.join(' ');
    }
    /**
     * Categorize matches by benefit type
     * Property 13: Result Organization by Category
     */
    categorizeMatches(matches) {
        const categoryMap = new Map();
        for (const match of matches) {
            const category = match.scheme.benefitType;
            if (!categoryMap.has(category)) {
                categoryMap.set(category, []);
            }
            categoryMap.get(category).push(match);
        }
        const results = [];
        for (const [category, categoryMatches] of categoryMap) {
            results.push({
                category,
                categoryName: BENEFIT_TYPE_NAMES[category] || category,
                results: this.rankMatches(categoryMatches),
                totalCount: categoryMatches.length
            });
        }
        // Sort categories by number of matches
        return results.sort((a, b) => b.totalCount - a.totalCount);
    }
    /**
     * Generate summary of all matches
     */
    getSummary(matches, profile) {
        const fullyEligible = matches.filter(m => m.isFullyEligible);
        const partiallyEligible = matches.filter(m => !m.isFullyEligible && m.eligibilityScore > 50);
        // Group by family member
        const memberMatchMap = new Map();
        for (const match of matches) {
            if (match.specificMemberId) {
                if (!memberMatchMap.has(match.specificMemberId)) {
                    memberMatchMap.set(match.specificMemberId, []);
                }
                memberMatchMap.get(match.specificMemberId).push(match);
            }
        }
        const familyMemberMatches = [];
        for (const [memberId, memberMatches] of memberMatchMap) {
            const member = profile.familyMembers.find(m => m.id === memberId);
            if (member) {
                familyMemberMatches.push({
                    member,
                    matchCount: memberMatches.length,
                    topSchemes: this.rankMatches(memberMatches).slice(0, 3)
                });
            }
        }
        return {
            totalSchemesAnalyzed: matches.length,
            totalMatches: matches.length,
            fullyEligibleCount: fullyEligible.length,
            partiallyEligibleCount: partiallyEligible.length,
            categorizedResults: this.categorizeMatches(matches),
            familyMemberMatches,
            timestamp: new Date()
        };
    }
}
/**
 * Export a default instance
 */
export const matchingEngine = new CoreMatchingEngine();
//# sourceMappingURL=matching-engine.js.map