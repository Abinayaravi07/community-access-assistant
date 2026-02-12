/**
 * Enumeration Types for Community Access Assistant
 * These define the categorical values used throughout the application
 */
/**
 * Types of government benefits available
 */
export var BenefitType;
(function (BenefitType) {
    BenefitType["SCHOLARSHIP"] = "scholarship";
    BenefitType["HEALTHCARE"] = "healthcare";
    BenefitType["FINANCIAL_AID"] = "financial_aid";
    BenefitType["EDUCATION"] = "education";
    BenefitType["EMPLOYMENT"] = "employment";
    BenefitType["HOUSING"] = "housing";
    BenefitType["AGRICULTURE"] = "agriculture";
    BenefitType["SOCIAL_SECURITY"] = "social_security";
    BenefitType["DISABILITY"] = "disability";
    BenefitType["WOMEN_WELFARE"] = "women_welfare";
    BenefitType["CHILD_WELFARE"] = "child_welfare";
    BenefitType["SENIOR_CITIZEN"] = "senior_citizen";
})(BenefitType || (BenefitType = {}));
/**
 * Types of occupations for user profiling
 */
export var OccupationType;
(function (OccupationType) {
    OccupationType["FARMER"] = "farmer";
    OccupationType["STUDENT"] = "student";
    OccupationType["DAILY_WAGE_WORKER"] = "daily_wage_worker";
    OccupationType["GOVERNMENT_EMPLOYEE"] = "government_employee";
    OccupationType["PRIVATE_EMPLOYEE"] = "private_employee";
    OccupationType["TEACHER"] = "teacher";
    OccupationType["UNEMPLOYED"] = "unemployed";
    OccupationType["SELF_EMPLOYED"] = "self_employed";
    OccupationType["HOMEMAKER"] = "homemaker";
    OccupationType["RETIRED"] = "retired";
    OccupationType["OTHER"] = "other";
})(OccupationType || (OccupationType = {}));
/**
 * Types of eligibility criteria for scheme matching
 */
export var CriterionType;
(function (CriterionType) {
    CriterionType["AGE_RANGE"] = "age_range";
    CriterionType["INCOME_LIMIT"] = "income_limit";
    CriterionType["OCCUPATION"] = "occupation";
    CriterionType["EDUCATION_LEVEL"] = "education_level";
    CriterionType["FAMILY_SIZE"] = "family_size";
    CriterionType["LOCATION"] = "location";
    CriterionType["GENDER"] = "gender";
    CriterionType["CASTE_CATEGORY"] = "caste_category";
    CriterionType["DISABILITY_STATUS"] = "disability_status";
    CriterionType["MARITAL_STATUS"] = "marital_status";
    CriterionType["RESIDENCE_TYPE"] = "residence_type";
})(CriterionType || (CriterionType = {}));
/**
 * Comparison operators for eligibility criteria evaluation
 */
export var ComparisonOperator;
(function (ComparisonOperator) {
    ComparisonOperator["EQUALS"] = "equals";
    ComparisonOperator["NOT_EQUALS"] = "not_equals";
    ComparisonOperator["GREATER_THAN"] = "greater_than";
    ComparisonOperator["LESS_THAN"] = "less_than";
    ComparisonOperator["GREATER_THAN_OR_EQUALS"] = "greater_than_or_equals";
    ComparisonOperator["LESS_THAN_OR_EQUALS"] = "less_than_or_equals";
    ComparisonOperator["IN"] = "in";
    ComparisonOperator["NOT_IN"] = "not_in";
    ComparisonOperator["BETWEEN"] = "between";
    ComparisonOperator["CONTAINS"] = "contains";
})(ComparisonOperator || (ComparisonOperator = {}));
/**
 * Family relationship types
 */
export var RelationshipType;
(function (RelationshipType) {
    RelationshipType["SELF"] = "self";
    RelationshipType["SPOUSE"] = "spouse";
    RelationshipType["CHILD"] = "child";
    RelationshipType["PARENT"] = "parent";
    RelationshipType["SIBLING"] = "sibling";
    RelationshipType["GRANDPARENT"] = "grandparent";
    RelationshipType["GRANDCHILD"] = "grandchild";
    RelationshipType["OTHER"] = "other";
})(RelationshipType || (RelationshipType = {}));
/**
 * Education levels
 */
export var EducationLevel;
(function (EducationLevel) {
    EducationLevel["NO_FORMAL_EDUCATION"] = "no_formal_education";
    EducationLevel["PRIMARY"] = "primary";
    EducationLevel["SECONDARY"] = "secondary";
    EducationLevel["HIGHER_SECONDARY"] = "higher_secondary";
    EducationLevel["GRADUATE"] = "graduate";
    EducationLevel["POST_GRADUATE"] = "post_graduate";
    EducationLevel["DOCTORATE"] = "doctorate";
    EducationLevel["DIPLOMA"] = "diploma";
    EducationLevel["VOCATIONAL"] = "vocational";
})(EducationLevel || (EducationLevel = {}));
/**
 * Income level categories
 */
export var IncomeLevel;
(function (IncomeLevel) {
    IncomeLevel["BPL"] = "bpl";
    IncomeLevel["LOW"] = "low";
    IncomeLevel["LOWER_MIDDLE"] = "lower_middle";
    IncomeLevel["MIDDLE"] = "middle";
    IncomeLevel["UPPER_MIDDLE"] = "upper_middle";
    IncomeLevel["HIGH"] = "high";
})(IncomeLevel || (IncomeLevel = {}));
/**
 * Age group categories
 */
export var AgeRange;
(function (AgeRange) {
    AgeRange["INFANT"] = "infant";
    AgeRange["CHILD"] = "child";
    AgeRange["YOUTH"] = "youth";
    AgeRange["ADULT"] = "adult";
    AgeRange["MIDDLE_AGED"] = "middle_aged";
    AgeRange["SENIOR"] = "senior"; // 60+
})(AgeRange || (AgeRange = {}));
/**
 * Gender categories
 */
export var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMALE"] = "female";
    Gender["OTHER"] = "other";
    Gender["PREFER_NOT_TO_SAY"] = "prefer_not_to_say";
})(Gender || (Gender = {}));
/**
 * Social category (caste) for Indian government schemes
 */
export var CasteCategory;
(function (CasteCategory) {
    CasteCategory["GENERAL"] = "general";
    CasteCategory["OBC"] = "obc";
    CasteCategory["SC"] = "sc";
    CasteCategory["ST"] = "st";
    CasteCategory["EWS"] = "ews";
    CasteCategory["MINORITY"] = "minority";
})(CasteCategory || (CasteCategory = {}));
/**
 * Marital status
 */
export var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["SINGLE"] = "single";
    MaritalStatus["MARRIED"] = "married";
    MaritalStatus["DIVORCED"] = "divorced";
    MaritalStatus["WIDOWED"] = "widowed";
    MaritalStatus["SEPARATED"] = "separated";
})(MaritalStatus || (MaritalStatus = {}));
/**
 * Type of residence
 */
export var ResidenceType;
(function (ResidenceType) {
    ResidenceType["RURAL"] = "rural";
    ResidenceType["URBAN"] = "urban";
    ResidenceType["SEMI_URBAN"] = "semi_urban";
})(ResidenceType || (ResidenceType = {}));
/**
 * Government level (central or state)
 */
export var GovernmentLevel;
(function (GovernmentLevel) {
    GovernmentLevel["CENTRAL"] = "central";
    GovernmentLevel["STATE"] = "state";
    GovernmentLevel["LOCAL"] = "local";
})(GovernmentLevel || (GovernmentLevel = {}));
/**
 * Supported languages for localization
 */
export var SupportedLanguage;
(function (SupportedLanguage) {
    SupportedLanguage["ENGLISH"] = "en";
    SupportedLanguage["HINDI"] = "hi";
    SupportedLanguage["TAMIL"] = "ta";
    SupportedLanguage["TELUGU"] = "te";
    SupportedLanguage["KANNADA"] = "kn";
    SupportedLanguage["MALAYALAM"] = "ml";
    SupportedLanguage["MARATHI"] = "mr";
    SupportedLanguage["BENGALI"] = "bn";
    SupportedLanguage["GUJARATI"] = "gu";
    SupportedLanguage["PUNJABI"] = "pa";
    SupportedLanguage["ODIA"] = "or";
})(SupportedLanguage || (SupportedLanguage = {}));
//# sourceMappingURL=enums.js.map