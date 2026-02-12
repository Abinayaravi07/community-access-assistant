/**
 * Enumeration Types for Community Access Assistant
 * These define the categorical values used throughout the application
 */

/**
 * Types of government benefits available
 */
export enum BenefitType {
  SCHOLARSHIP = 'scholarship',
  HEALTHCARE = 'healthcare',
  FINANCIAL_AID = 'financial_aid',
  EDUCATION = 'education',
  EMPLOYMENT = 'employment',
  HOUSING = 'housing',
  AGRICULTURE = 'agriculture',
  SOCIAL_SECURITY = 'social_security',
  DISABILITY = 'disability',
  WOMEN_WELFARE = 'women_welfare',
  CHILD_WELFARE = 'child_welfare',
  SENIOR_CITIZEN = 'senior_citizen'
}

/**
 * Types of occupations for user profiling
 */
export enum OccupationType {
  FARMER = 'farmer',
  STUDENT = 'student',
  DAILY_WAGE_WORKER = 'daily_wage_worker',
  GOVERNMENT_EMPLOYEE = 'government_employee',
  PRIVATE_EMPLOYEE = 'private_employee',
  TEACHER = 'teacher',
  UNEMPLOYED = 'unemployed',
  SELF_EMPLOYED = 'self_employed',
  HOMEMAKER = 'homemaker',
  RETIRED = 'retired',
  OTHER = 'other'
}

/**
 * Types of eligibility criteria for scheme matching
 */
export enum CriterionType {
  AGE_RANGE = 'age_range',
  INCOME_LIMIT = 'income_limit',
  OCCUPATION = 'occupation',
  EDUCATION_LEVEL = 'education_level',
  FAMILY_SIZE = 'family_size',
  LOCATION = 'location',
  GENDER = 'gender',
  CASTE_CATEGORY = 'caste_category',
  DISABILITY_STATUS = 'disability_status',
  MARITAL_STATUS = 'marital_status',
  RESIDENCE_TYPE = 'residence_type'
}

/**
 * Comparison operators for eligibility criteria evaluation
 */
export enum ComparisonOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_THAN_OR_EQUALS = 'greater_than_or_equals',
  LESS_THAN_OR_EQUALS = 'less_than_or_equals',
  IN = 'in',
  NOT_IN = 'not_in',
  BETWEEN = 'between',
  CONTAINS = 'contains'
}

/**
 * Family relationship types
 */
export enum RelationshipType {
  SELF = 'self',
  SPOUSE = 'spouse',
  CHILD = 'child',
  PARENT = 'parent',
  SIBLING = 'sibling',
  GRANDPARENT = 'grandparent',
  GRANDCHILD = 'grandchild',
  OTHER = 'other'
}

/**
 * Education levels
 */
export enum EducationLevel {
  NO_FORMAL_EDUCATION = 'no_formal_education',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  HIGHER_SECONDARY = 'higher_secondary',
  GRADUATE = 'graduate',
  POST_GRADUATE = 'post_graduate',
  DOCTORATE = 'doctorate',
  DIPLOMA = 'diploma',
  VOCATIONAL = 'vocational'
}

/**
 * Income level categories
 */
export enum IncomeLevel {
  BPL = 'bpl', // Below Poverty Line
  LOW = 'low',
  LOWER_MIDDLE = 'lower_middle',
  MIDDLE = 'middle',
  UPPER_MIDDLE = 'upper_middle',
  HIGH = 'high'
}

/**
 * Age group categories
 */
export enum AgeRange {
  INFANT = 'infant', // 0-5
  CHILD = 'child', // 6-14
  YOUTH = 'youth', // 15-24
  ADULT = 'adult', // 25-44
  MIDDLE_AGED = 'middle_aged', // 45-59
  SENIOR = 'senior' // 60+
}

/**
 * Gender categories
 */
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  PREFER_NOT_TO_SAY = 'prefer_not_to_say'
}

/**
 * Social category (caste) for Indian government schemes
 */
export enum CasteCategory {
  GENERAL = 'general',
  OBC = 'obc',
  SC = 'sc',
  ST = 'st',
  EWS = 'ews',
  MINORITY = 'minority'
}

/**
 * Marital status
 */
export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
  SEPARATED = 'separated'
}

/**
 * Type of residence
 */
export enum ResidenceType {
  RURAL = 'rural',
  URBAN = 'urban',
  SEMI_URBAN = 'semi_urban'
}

/**
 * Government level (central or state)
 */
export enum GovernmentLevel {
  CENTRAL = 'central',
  STATE = 'state',
  LOCAL = 'local'
}

/**
 * Supported languages for localization
 */
export enum SupportedLanguage {
  ENGLISH = 'en',
  HINDI = 'hi',
  TAMIL = 'ta',
  TELUGU = 'te',
  KANNADA = 'kn',
  MALAYALAM = 'ml',
  MARATHI = 'mr',
  BENGALI = 'bn',
  GUJARATI = 'gu',
  PUNJABI = 'pa',
  ODIA = 'or'
}
