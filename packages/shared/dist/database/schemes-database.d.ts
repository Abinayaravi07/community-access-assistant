/**
 * Schemes Database Implementation
 * Manages government schemes data with CRUD operations
 */
import { GovernmentScheme, SchemesDatabase, SchemeValidationResult } from '../types/government-scheme';
import { BenefitType } from '../types/enums';
/**
 * Configuration for the schemes database
 */
export interface SchemesDatabaseConfig {
    stalenessThresholdDays: number;
    autoRefreshIntervalMs?: number;
}
/**
 * In-memory implementation of the schemes database
 * Used for client-side storage and matching
 */
export declare class InMemorySchemesDatabase implements SchemesDatabase {
    private schemes;
    private config;
    private lastRefresh;
    constructor(config?: Partial<SchemesDatabaseConfig>);
    /**
     * Load schemes from an array
     */
    loadSchemes(schemes: GovernmentScheme[]): void;
    /**
     * Add a single scheme
     */
    addScheme(scheme: GovernmentScheme): SchemeValidationResult;
    /**
     * Update an existing scheme
     */
    updateScheme(id: string, updates: Partial<GovernmentScheme>): GovernmentScheme | null;
    /**
     * Delete a scheme
     */
    deleteScheme(id: string): boolean;
    /**
     * Get all schemes
     */
    getAllSchemes(): Promise<GovernmentScheme[]>;
    /**
     * Get a scheme by ID
     */
    getSchemeById(id: string): Promise<GovernmentScheme | null>;
    /**
     * Get schemes by benefit category
     */
    getSchemesByCategory(category: BenefitType): Promise<GovernmentScheme[]>;
    /**
     * Get schemes by state
     */
    getSchemesByState(state: string): Promise<GovernmentScheme[]>;
    /**
     * Search schemes by query
     */
    searchSchemes(query: string): Promise<GovernmentScheme[]>;
    /**
     * Get stale schemes that need refreshing (Property 4)
     */
    getStaleSchemes(thresholdDays?: number): Promise<GovernmentScheme[]>;
    /**
     * Refresh schemes from external sources
     * In a real implementation, this would fetch from government APIs
     */
    refreshFromSources(): Promise<void>;
    /**
     * Get database statistics
     */
    getStats(): {
        totalSchemes: number;
        activeSchemes: number;
        staleSchemes: number;
        lastRefresh: Date | null;
        schemesByCategory: Record<string, number>;
    };
    /**
     * Clear all schemes
     */
    clear(): void;
}
//# sourceMappingURL=schemes-database.d.ts.map