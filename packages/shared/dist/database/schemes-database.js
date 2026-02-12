/**
 * Schemes Database Implementation
 * Manages government schemes data with CRUD operations
 */
import { validateScheme, isSchemeStale } from '../validation/scheme-validation';
/**
 * Default configuration
 */
const DEFAULT_CONFIG = {
    stalenessThresholdDays: 30,
    autoRefreshIntervalMs: 24 * 60 * 60 * 1000 // 24 hours
};
/**
 * In-memory implementation of the schemes database
 * Used for client-side storage and matching
 */
export class InMemorySchemesDatabase {
    schemes = new Map();
    config;
    lastRefresh = null;
    constructor(config = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }
    /**
     * Load schemes from an array
     */
    loadSchemes(schemes) {
        this.schemes.clear();
        schemes.forEach(scheme => {
            this.schemes.set(scheme.id, scheme);
        });
        this.lastRefresh = new Date();
    }
    /**
     * Add a single scheme
     */
    addScheme(scheme) {
        const validation = validateScheme(scheme);
        if (validation.isValid) {
            this.schemes.set(scheme.id, scheme);
        }
        return validation;
    }
    /**
     * Update an existing scheme
     */
    updateScheme(id, updates) {
        const existing = this.schemes.get(id);
        if (!existing)
            return null;
        const updated = {
            ...existing,
            ...updates,
            lastUpdated: new Date()
        };
        const validation = validateScheme(updated);
        if (validation.isValid) {
            this.schemes.set(id, updated);
            return updated;
        }
        return null;
    }
    /**
     * Delete a scheme
     */
    deleteScheme(id) {
        return this.schemes.delete(id);
    }
    /**
     * Get all schemes
     */
    async getAllSchemes() {
        return Array.from(this.schemes.values()).filter(s => s.isActive);
    }
    /**
     * Get a scheme by ID
     */
    async getSchemeById(id) {
        return this.schemes.get(id) || null;
    }
    /**
     * Get schemes by benefit category
     */
    async getSchemesByCategory(category) {
        return Array.from(this.schemes.values()).filter(scheme => scheme.isActive && (scheme.benefitType === category ||
            scheme.benefitCategories.includes(category)));
    }
    /**
     * Get schemes by state
     */
    async getSchemesByState(state) {
        const normalizedState = state.toLowerCase();
        return Array.from(this.schemes.values()).filter(scheme => {
            if (!scheme.isActive)
                return false;
            // Central schemes apply to all states
            if (scheme.governmentLevel === 'central')
                return true;
            // Check if scheme mentions the state
            const schemeText = `${scheme.name} ${scheme.description}`.toLowerCase();
            return schemeText.includes(normalizedState);
        });
    }
    /**
     * Search schemes by query
     */
    async searchSchemes(query) {
        const normalizedQuery = query.toLowerCase();
        const queryTerms = normalizedQuery.split(/\s+/).filter(t => t.length > 2);
        return Array.from(this.schemes.values())
            .filter(scheme => {
            if (!scheme.isActive)
                return false;
            const searchableText = [
                scheme.name,
                scheme.description,
                scheme.simplifiedDescription || '',
                scheme.implementingAgency,
                ...scheme.targetDemographics
            ].join(' ').toLowerCase();
            return queryTerms.some(term => searchableText.includes(term));
        })
            .sort((a, b) => {
            // Prioritize name matches
            const aNameMatch = a.name.toLowerCase().includes(normalizedQuery) ? 1 : 0;
            const bNameMatch = b.name.toLowerCase().includes(normalizedQuery) ? 1 : 0;
            return bNameMatch - aNameMatch;
        });
    }
    /**
     * Get stale schemes that need refreshing (Property 4)
     */
    async getStaleSchemes(thresholdDays) {
        const threshold = thresholdDays ?? this.config.stalenessThresholdDays;
        return Array.from(this.schemes.values()).filter(scheme => isSchemeStale(scheme, threshold));
    }
    /**
     * Refresh schemes from external sources
     * In a real implementation, this would fetch from government APIs
     */
    async refreshFromSources() {
        // This is a placeholder for actual data refresh logic
        // In production, this would fetch from government data sources
        this.lastRefresh = new Date();
    }
    /**
     * Get database statistics
     */
    getStats() {
        const allSchemes = Array.from(this.schemes.values());
        const activeSchemes = allSchemes.filter(s => s.isActive);
        const staleSchemes = allSchemes.filter(s => isSchemeStale(s, this.config.stalenessThresholdDays));
        const schemesByCategory = {};
        activeSchemes.forEach(scheme => {
            const category = scheme.benefitType;
            schemesByCategory[category] = (schemesByCategory[category] || 0) + 1;
        });
        return {
            totalSchemes: allSchemes.length,
            activeSchemes: activeSchemes.length,
            staleSchemes: staleSchemes.length,
            lastRefresh: this.lastRefresh,
            schemesByCategory
        };
    }
    /**
     * Clear all schemes
     */
    clear() {
        this.schemes.clear();
        this.lastRefresh = null;
    }
}
//# sourceMappingURL=schemes-database.js.map