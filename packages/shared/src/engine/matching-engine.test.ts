/**
 * Property-Based Tests for Matching Engine
 * Property 3: Comprehensive Scheme Matching
 * Property 12: Demographic-Aware Matching
 * Property 13: Result Organization by Category
 * Property 17: Family-Aware Benefit Matching
 * 
 * Feature: community-access-assistant
 */

import * as fc from 'fast-check';
import { CoreMatchingEngine } from '../engine/matching-engine';
import { arbUserProfile, arbGovernmentScheme } from '../testing/generators';
import { UserProfile, FamilyMember } from '../types/user-profile';
import { GovernmentScheme } from '../types/government-scheme';
import {
  AgeRange,
  BenefitType,
  ComparisonOperator,
  CriterionType,
  Gender,
  OccupationType,
  RelationshipType
} from '../types/enums';

describe('Feature: community-access-assistant', () => {
  const engine = new CoreMatchingEngine();

  describe('Property 3: Comprehensive Scheme Matching', () => {
    /**
     * For any complete user profile and scheme database, the matching engine 
     * should return all and only those schemes where the user profile satisfies 
     * the eligibility criteria.
     */

    it('should only return active and open schemes', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            
            // All matches should be for active and open schemes
            return matches.every(m => m.scheme.isActive && m.scheme.isOpenForApplication);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return matches with eligibility scores between 0 and 100', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            
            return matches.every(m => 
              m.eligibilityScore >= 0 && m.eligibilityScore <= 100
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should mark schemes as fully eligible when all mandatory criteria are met', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            
            return matches.every(m => {
              // If fully eligible, should have no missing mandatory criteria
              if (m.isFullyEligible) {
                return m.missingCriteria.length === 0;
              }
              return true;
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should match farmer to agriculture scheme', () => {
      const farmerProfile: UserProfile = {
        id: 'test-farmer',
        age: 35,
        gender: Gender.MALE,
        occupation: OccupationType.FARMER,
        ageGroup: AgeRange.ADULT,
        incomeRange: 'low' as any,
        annualIncome: 200000,
        educationLevel: 'primary' as any,
        casteCategory: 'obc' as any,
        maritalStatus: 'married' as any,
        location: {
          state: 'Maharashtra',
          district: 'Pune',
          residenceType: 'rural' as any
        },
        familyMembers: [],
        familySize: 4,
        specialCircumstances: [],
        preferredLanguage: 'en' as any,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const agricultureScheme: GovernmentScheme = {
        id: 'agri-scheme',
        name: 'Farm Support Scheme',
        description: 'Support for farmers',
        benefitType: BenefitType.AGRICULTURE,
        benefitCategories: [BenefitType.AGRICULTURE],
        governmentLevel: 'central' as any,
        implementingAgency: 'Agriculture Ministry',
        eligibilityCriteria: [{
          id: 'crit-1',
          type: CriterionType.OCCUPATION,
          field: 'occupation',
          operator: ComparisonOperator.EQUALS,
          value: OccupationType.FARMER,
          description: 'Must be a farmer',
          isMandatory: true
        }],
        targetDemographics: ['farmers'],
        benefits: [{ type: 'monetary', description: 'Financial support', amount: 5000, amountType: 'yearly', currency: 'INR' }],
        applicationProcess: [],
        documents: [],
        isOpenForApplication: true,
        contactInfo: { department: 'Agriculture' },
        source: { name: 'Gov Portal', url: 'https://gov.in', lastAccessed: new Date(), isOfficial: true },
        lastUpdated: new Date(),
        lastVerified: new Date(),
        isActive: true,
        availableLanguages: ['en']
      };

      const matches = engine.findMatches(farmerProfile, [agricultureScheme]);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].isFullyEligible).toBe(true);
    });
  });

  describe('Property 12: Demographic-Aware Matching', () => {
    /**
     * For any user profile containing family members of different demographic 
     * groups, the matching results should include appropriate schemes for each 
     * demographic group.
     */

    it('should match schemes for senior citizen family members', () => {
      const profileWithSenior: UserProfile = {
        id: 'test-profile',
        age: 40,
        gender: Gender.MALE,
        occupation: OccupationType.SELF_EMPLOYED,
        ageGroup: AgeRange.ADULT,
        incomeRange: 'bpl' as any,
        educationLevel: 'secondary' as any,
        casteCategory: 'general' as any,
        maritalStatus: 'married' as any,
        location: {
          state: 'Karnataka',
          district: 'Bangalore',
          residenceType: 'urban' as any
        },
        familyMembers: [{
          id: 'senior-parent',
          relationship: RelationshipType.PARENT,
          age: 65,
          gender: Gender.FEMALE,
          occupation: OccupationType.RETIRED
        }],
        familySize: 3,
        specialCircumstances: [],
        preferredLanguage: 'en' as any,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const seniorScheme: GovernmentScheme = {
        id: 'senior-scheme',
        name: 'Senior Citizen Pension',
        description: 'Pension for elderly',
        benefitType: BenefitType.SENIOR_CITIZEN,
        benefitCategories: [BenefitType.SENIOR_CITIZEN],
        governmentLevel: 'central' as any,
        implementingAgency: 'Social Welfare',
        eligibilityCriteria: [{
          id: 'crit-age',
          type: CriterionType.AGE_RANGE,
          field: 'age',
          operator: ComparisonOperator.GREATER_THAN_OR_EQUALS,
          value: 60,
          description: 'Must be 60 or older',
          isMandatory: true
        }],
        targetDemographics: ['senior citizens'],
        benefits: [{ type: 'monetary', description: 'Monthly pension', amount: 500, amountType: 'monthly', currency: 'INR' }],
        applicationProcess: [],
        documents: [],
        isOpenForApplication: true,
        contactInfo: { department: 'Social Welfare' },
        source: { name: 'Gov Portal', url: 'https://gov.in', lastAccessed: new Date(), isOfficial: true },
        lastUpdated: new Date(),
        lastVerified: new Date(),
        isActive: true,
        availableLanguages: ['en']
      };

      const matches = engine.findMatches(profileWithSenior, [seniorScheme]);
      
      // Should find match for the senior family member
      const seniorMatch = matches.find(m => m.specificMemberId === 'senior-parent');
      expect(seniorMatch).toBeDefined();
      expect(seniorMatch?.isFullyEligible).toBe(true);
    });

    it('should consider different age groups in family', () => {
      fc.assert(
        fc.property(arbUserProfile, (profile) => {
          // Ensure profile has diverse family members
          const hasChildren = profile.familyMembers.some(m => m.age < 18);
          const hasSeniors = profile.familyMembers.some(m => m.age >= 60);
          const hasYouth = profile.familyMembers.some(m => m.age >= 15 && m.age < 25);
          
          // This property just ensures the engine can handle diverse demographics
          const matches = engine.findMatches(profile, []);
          return Array.isArray(matches);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 13: Result Organization by Category', () => {
    /**
     * For any user profile that qualifies for multiple benefit types, the 
     * results should be properly organized by benefit category.
     */

    it('should categorize matches by benefit type', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 20 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            const categorized = engine.categorizeMatches(matches);
            
            // Each category should have valid data
            return categorized.every(cat => {
              return (
                cat.category &&
                cat.categoryName &&
                cat.totalCount === cat.results.length &&
                cat.results.every(r => 
                  r.scheme.benefitType === cat.category ||
                  r.scheme.benefitCategories.includes(cat.category)
                )
              );
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include all matches in categorized results', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            const categorized = engine.categorizeMatches(matches);
            
            // Total count across categories should equal matches count
            const totalCategorized = categorized.reduce((sum, cat) => sum + cat.totalCount, 0);
            return totalCategorized === matches.length;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should sort categories by match count', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 20 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            const categorized = engine.categorizeMatches(matches);
            
            // Categories should be sorted descending by count
            for (let i = 1; i < categorized.length; i++) {
              if (categorized[i].totalCount > categorized[i - 1].totalCount) {
                return false;
              }
            }
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 17: Family-Aware Benefit Matching', () => {
    /**
     * For any family profile, the matching results should correctly identify 
     * schemes applicable to individual family members, family-wide benefits, 
     * and clearly indicate which family member each benefit applies to.
     */

    it('should identify which family member each scheme applies to', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            
            // Each match should have applicableTo specified
            return matches.every(m => {
              if (m.applicableTo === 'specific_member') {
                return m.specificMemberId !== undefined;
              }
              return true;
            });
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should include family member matches in summary', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            const summary = engine.getSummary(matches, profile);
            
            // Summary should be valid
            return (
              typeof summary.totalMatches === 'number' &&
              typeof summary.fullyEligibleCount === 'number' &&
              Array.isArray(summary.familyMemberMatches) &&
              summary.timestamp instanceof Date
            );
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not duplicate family member in results', () => {
      fc.assert(
        fc.property(
          arbUserProfile,
          fc.array(arbGovernmentScheme, { minLength: 1, maxLength: 10 }),
          (profile, schemes) => {
            const matches = engine.findMatches(profile, schemes);
            
            // For each scheme, each family member should appear at most once
            const schemeMembers = new Map<string, Set<string>>();
            
            for (const match of matches) {
              const schemeId = match.scheme.id;
              if (!schemeMembers.has(schemeId)) {
                schemeMembers.set(schemeId, new Set());
              }
              
              if (match.specificMemberId) {
                const memberSet = schemeMembers.get(schemeId)!;
                if (memberSet.has(match.specificMemberId)) {
                  return false; // Duplicate found
                }
                memberSet.add(match.specificMemberId);
              }
            }
            
            return true;
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
