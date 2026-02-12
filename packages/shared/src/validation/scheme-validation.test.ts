/**
 * Property-Based Tests for Scheme Validation
 * Property 4: Data Freshness Detection
 * Property 5: Source Attribution Completeness
 * 
 * Feature: community-access-assistant
 */

import * as fc from 'fast-check';
import {
  validateScheme,
  isSchemeStale,
  getStaleSchemes,
  hasCompleteSourceAttribution,
  validateDataSource
} from '../validation/scheme-validation';
import { arbGovernmentScheme, arbDataSource } from '../testing/generators';
import { GovernmentScheme, DataSource } from '../types/government-scheme';

describe('Feature: community-access-assistant', () => {
  describe('Property 4: Data Freshness Detection', () => {
    /**
     * For any government scheme in the database, schemes older than the 
     * configured staleness threshold should be automatically flagged for review.
     */

    it('should correctly identify stale schemes based on threshold', () => {
      fc.assert(
        fc.property(
          fc.integer({ min: 1, max: 365 }), // threshold days
          fc.integer({ min: 0, max: 500 }), // days since update
          (thresholdDays, daysSinceUpdate) => {
            const lastUpdated = new Date();
            lastUpdated.setDate(lastUpdated.getDate() - daysSinceUpdate);
            
            const scheme = {
              lastUpdated
            } as GovernmentScheme;
            
            const isStale = isSchemeStale(scheme, thresholdDays);
            
            // Scheme should be stale if days since update > threshold
            return isStale === (daysSinceUpdate > thresholdDays);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return all stale schemes from a collection', () => {
      fc.assert(
        fc.property(
          fc.array(arbGovernmentScheme, { minLength: 0, maxLength: 20 }),
          fc.integer({ min: 1, max: 90 }),
          (schemes, thresholdDays) => {
            const staleSchemes = getStaleSchemes(schemes, thresholdDays);
            
            // All returned schemes should be stale
            const allAreStale = staleSchemes.every(s => isSchemeStale(s, thresholdDays));
            
            // All stale schemes should be in the result
            const allStaleIncluded = schemes
              .filter(s => isSchemeStale(s, thresholdDays))
              .every(s => staleSchemes.some(stale => stale.id === s.id));
            
            return allAreStale && allStaleIncluded;
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should not flag recently updated schemes as stale', () => {
      const recentScheme = {
        lastUpdated: new Date() // Today
      } as GovernmentScheme;
      
      expect(isSchemeStale(recentScheme, 30)).toBe(false);
      expect(isSchemeStale(recentScheme, 1)).toBe(false);
    });

    it('should flag old schemes as stale', () => {
      const oldDate = new Date();
      oldDate.setDate(oldDate.getDate() - 100);
      
      const oldScheme = {
        lastUpdated: oldDate
      } as GovernmentScheme;
      
      expect(isSchemeStale(oldScheme, 30)).toBe(true);
      expect(isSchemeStale(oldScheme, 90)).toBe(true);
    });
  });

  describe('Property 5: Source Attribution Completeness', () => {
    /**
     * For any displayed government scheme, the rendered output should 
     * include complete source attribution information.
     */

    it('should validate complete source attribution', () => {
      fc.assert(
        fc.property(arbDataSource, (source) => {
          const errors = validateDataSource(source);
          
          // If all required fields are present, should have no errors
          const hasAllFields = 
            source.name && 
            source.url && 
            source.lastAccessed && 
            source.isOfficial !== undefined;
          
          if (hasAllFields) {
            return errors.length === 0;
          }
          return errors.length > 0;
        }),
        { numRuns: 100 }
      );
    });

    it('should detect missing source name', () => {
      const source: Partial<DataSource> = {
        url: 'https://example.gov.in',
        lastAccessed: new Date(),
        isOfficial: true
      };
      
      const errors = validateDataSource(source as DataSource);
      expect(errors).toContain('Source must have a name');
    });

    it('should detect missing source URL', () => {
      const source: Partial<DataSource> = {
        name: 'Government Portal',
        lastAccessed: new Date(),
        isOfficial: true
      };
      
      const errors = validateDataSource(source as DataSource);
      expect(errors).toContain('Source must have a URL');
    });

    it('should detect missing last accessed date', () => {
      const source: Partial<DataSource> = {
        name: 'Government Portal',
        url: 'https://example.gov.in',
        isOfficial: true
      };
      
      const errors = validateDataSource(source as DataSource);
      expect(errors).toContain('Source must have last accessed date');
    });

    it('should verify scheme has complete source attribution', () => {
      fc.assert(
        fc.property(arbGovernmentScheme, (scheme) => {
          const hasComplete = hasCompleteSourceAttribution(scheme);
          const sourceErrors = validateDataSource(scheme.source);
          
          // hasCompleteSourceAttribution should match validation result
          return hasComplete === (sourceErrors.length === 0);
        }),
        { numRuns: 100 }
      );
    });

    it('should include source validation in scheme validation', () => {
      fc.assert(
        fc.property(arbGovernmentScheme, (scheme) => {
          const result = validateScheme(scheme);
          
          // If source is invalid, scheme validation should fail or have errors
          const sourceErrors = validateDataSource(scheme.source);
          if (sourceErrors.length > 0) {
            return !result.isValid || result.errors.some(e => e.includes('Source:'));
          }
          return true;
        }),
        { numRuns: 100 }
      );
    });
  });
});
