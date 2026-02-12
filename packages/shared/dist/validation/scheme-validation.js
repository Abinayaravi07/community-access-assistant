/**
 * Scheme Validation Utilities
 * Validates government scheme data for integrity and completeness
 */
/**
 * Required fields for a valid government scheme
 */
const REQUIRED_SCHEME_FIELDS = [
    'id',
    'name',
    'description',
    'benefitType',
    'benefitCategories',
    'governmentLevel',
    'implementingAgency',
    'eligibilityCriteria',
    'benefits',
    'applicationProcess',
    'documents',
    'contactInfo',
    'source',
    'lastUpdated',
    'isActive'
];
/**
 * Validates a single eligibility criterion
 */
export function validateCriterion(criterion) {
    const errors = [];
    if (!criterion.id) {
        errors.push('Criterion must have an id');
    }
    if (!criterion.type) {
        errors.push('Criterion must have a type');
    }
    if (!criterion.field) {
        errors.push('Criterion must have a field');
    }
    if (!criterion.operator) {
        errors.push('Criterion must have an operator');
    }
    if (criterion.value === undefined || criterion.value === null) {
        errors.push('Criterion must have a value');
    }
    if (!criterion.description) {
        errors.push('Criterion must have a description');
    }
    return errors;
}
/**
 * Validates a single application step
 */
export function validateApplicationStep(step) {
    const errors = [];
    if (!step.stepNumber || step.stepNumber < 1) {
        errors.push('Application step must have a valid step number');
    }
    if (!step.title) {
        errors.push('Application step must have a title');
    }
    if (!step.description) {
        errors.push('Application step must have a description');
    }
    if (!step.estimatedTime) {
        errors.push('Application step must have estimated time');
    }
    if (step.onlineAvailable && !step.onlineUrl) {
        errors.push('Online available step should have an online URL');
    }
    return errors;
}
/**
 * Validates a required document
 */
export function validateDocument(doc) {
    const errors = [];
    if (!doc.name) {
        errors.push('Document must have a name');
    }
    if (!doc.description) {
        errors.push('Document must have a description');
    }
    return errors;
}
/**
 * Validates data source for completeness (Property 5)
 */
export function validateDataSource(source) {
    const errors = [];
    if (!source.name) {
        errors.push('Source must have a name');
    }
    if (!source.url) {
        errors.push('Source must have a URL');
    }
    if (!source.lastAccessed) {
        errors.push('Source must have last accessed date');
    }
    if (source.isOfficial === undefined) {
        errors.push('Source must indicate if it is official');
    }
    return errors;
}
/**
 * Checks if a scheme is stale based on threshold (Property 4)
 */
export function isSchemeStale(scheme, thresholdDays) {
    const now = new Date();
    const lastUpdated = new Date(scheme.lastUpdated);
    const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > thresholdDays;
}
/**
 * Gets all stale schemes from a list
 */
export function getStaleSchemes(schemes, thresholdDays) {
    return schemes.filter(scheme => isSchemeStale(scheme, thresholdDays));
}
/**
 * Validates a complete government scheme
 */
export function validateScheme(scheme) {
    const errors = [];
    const warnings = [];
    // Check required fields
    for (const field of REQUIRED_SCHEME_FIELDS) {
        if (scheme[field] === undefined || scheme[field] === null) {
            errors.push(`Missing required field: ${field}`);
        }
    }
    // Validate name
    if (scheme.name && scheme.name.length < 3) {
        errors.push('Scheme name must be at least 3 characters');
    }
    // Validate description
    if (scheme.description && scheme.description.length < 10) {
        errors.push('Scheme description must be at least 10 characters');
    }
    // Validate eligibility criteria
    if (scheme.eligibilityCriteria) {
        if (scheme.eligibilityCriteria.length === 0) {
            warnings.push('Scheme has no eligibility criteria');
        }
        scheme.eligibilityCriteria.forEach((criterion, index) => {
            const criterionErrors = validateCriterion(criterion);
            criterionErrors.forEach(err => errors.push(`Criterion ${index + 1}: ${err}`));
        });
    }
    // Validate application process
    if (scheme.applicationProcess) {
        if (scheme.applicationProcess.length === 0) {
            warnings.push('Scheme has no application steps');
        }
        scheme.applicationProcess.forEach((step, index) => {
            const stepErrors = validateApplicationStep(step);
            stepErrors.forEach(err => errors.push(`Step ${index + 1}: ${err}`));
        });
        // Check step numbers are sequential
        const stepNumbers = scheme.applicationProcess.map(s => s.stepNumber).sort((a, b) => a - b);
        for (let i = 0; i < stepNumbers.length; i++) {
            if (stepNumbers[i] !== i + 1) {
                warnings.push('Application steps should be numbered sequentially starting from 1');
                break;
            }
        }
    }
    // Validate documents
    if (scheme.documents) {
        scheme.documents.forEach((doc, index) => {
            const docErrors = validateDocument(doc);
            docErrors.forEach(err => errors.push(`Document ${index + 1}: ${err}`));
        });
    }
    // Validate source attribution (Property 5)
    if (scheme.source) {
        const sourceErrors = validateDataSource(scheme.source);
        sourceErrors.forEach(err => errors.push(`Source: ${err}`));
    }
    // Validate contact info
    if (scheme.contactInfo) {
        if (!scheme.contactInfo.department) {
            errors.push('Contact info must have a department');
        }
        if (!scheme.contactInfo.phone && !scheme.contactInfo.email && !scheme.contactInfo.websiteUrl) {
            warnings.push('Contact info should have at least one contact method');
        }
    }
    // Validate benefits
    if (scheme.benefits && scheme.benefits.length === 0) {
        warnings.push('Scheme has no benefits listed');
    }
    // Check for active scheme without open applications
    if (scheme.isActive && !scheme.isOpenForApplication) {
        warnings.push('Active scheme is not open for applications');
    }
    // Check deadline is in the future
    if (scheme.applicationDeadline) {
        const deadline = new Date(scheme.applicationDeadline);
        if (deadline < new Date()) {
            warnings.push('Application deadline has passed');
        }
    }
    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
/**
 * Validates that a scheme has complete source attribution
 */
export function hasCompleteSourceAttribution(scheme) {
    if (!scheme.source)
        return false;
    const sourceErrors = validateDataSource(scheme.source);
    return sourceErrors.length === 0;
}
//# sourceMappingURL=scheme-validation.js.map