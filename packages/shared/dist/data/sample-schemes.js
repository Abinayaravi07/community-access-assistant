/**
 * Sample Government Schemes Data
 * This provides realistic sample data for testing and development
 */
import { BenefitType, ComparisonOperator, CriterionType, GovernmentLevel } from '../types/enums';
/**
 * PM Kisan Samman Nidhi Yojana
 */
export const pmKisanScheme = {
    id: 'pm-kisan-001',
    name: 'PM Kisan Samman Nidhi Yojana',
    shortName: 'PM-KISAN',
    description: 'Pradhan Mantri Kisan Samman Nidhi is a Central Sector scheme with 100% funding from Government of India. Under the scheme, income support of Rs.6000/- per year is provided to all farmer families across the country in three equal installments of Rs.2000/- each every four months.',
    simplifiedDescription: 'Get ₹6,000 per year directly in your bank account if you are a farmer. The money comes in 3 installments of ₹2,000 each.',
    benefitType: BenefitType.AGRICULTURE,
    benefitCategories: [BenefitType.AGRICULTURE, BenefitType.FINANCIAL_AID],
    governmentLevel: GovernmentLevel.CENTRAL,
    implementingAgency: 'Ministry of Agriculture and Farmers Welfare',
    eligibilityCriteria: [
        {
            id: 'crit-001',
            type: CriterionType.OCCUPATION,
            field: 'occupation',
            operator: ComparisonOperator.EQUALS,
            value: 'farmer',
            description: 'Must be a farmer',
            isMandatory: true
        },
        {
            id: 'crit-002',
            type: CriterionType.INCOME_LIMIT,
            field: 'annualIncome',
            operator: ComparisonOperator.LESS_THAN,
            value: 1000000,
            description: 'Annual income should be less than ₹10 lakhs',
            isMandatory: false
        }
    ],
    targetDemographics: ['farmers', 'rural', 'agricultural workers'],
    benefits: [
        {
            type: 'monetary',
            description: 'Direct income support of ₹6,000 per year',
            amount: 6000,
            amountType: 'yearly',
            currency: 'INR'
        }
    ],
    applicationProcess: [
        {
            stepNumber: 1,
            title: 'Visit CSC or Online Portal',
            description: 'Visit your nearest Common Service Centre (CSC) or go to the PM-KISAN portal online',
            requiredDocuments: ['Aadhaar Card'],
            estimatedTime: '30 minutes',
            onlineAvailable: true,
            onlineUrl: 'https://pmkisan.gov.in/',
            helplineNumber: '155261',
            tips: ['Keep your Aadhaar number ready', 'Ensure your bank account is linked to Aadhaar']
        },
        {
            stepNumber: 2,
            title: 'Fill Application Form',
            description: 'Fill in your personal details, land details, and bank account information',
            requiredDocuments: ['Land Records', 'Bank Passbook', 'Aadhaar Card'],
            estimatedTime: '15 minutes',
            onlineAvailable: true,
            tips: ['Double-check your bank account number']
        },
        {
            stepNumber: 3,
            title: 'Submit and Track',
            description: 'Submit the application and note down the reference number for tracking',
            requiredDocuments: [],
            estimatedTime: '5 minutes',
            onlineAvailable: true,
            tips: ['Save the reference number safely']
        }
    ],
    documents: [
        {
            name: 'Aadhaar Card',
            description: 'Valid Aadhaar card of the farmer',
            isMandatory: true
        },
        {
            name: 'Land Records',
            description: 'Documents proving land ownership (Khata/Khatauni)',
            isMandatory: true,
            alternativeDocuments: ['Land Lease Agreement']
        },
        {
            name: 'Bank Passbook',
            description: 'Bank passbook or cancelled cheque showing account details',
            isMandatory: true
        }
    ],
    isOpenForApplication: true,
    contactInfo: {
        department: 'Ministry of Agriculture and Farmers Welfare',
        phone: '+91-11-23381092',
        email: 'pmkisan-ict@gov.in',
        helplineNumber: '155261',
        websiteUrl: 'https://pmkisan.gov.in/'
    },
    source: {
        name: 'PM-KISAN Official Portal',
        url: 'https://pmkisan.gov.in/',
        lastAccessed: new Date(),
        isOfficial: true
    },
    lastUpdated: new Date(),
    lastVerified: new Date(),
    isActive: true,
    availableLanguages: ['en', 'hi']
};
/**
 * National Scholarship Portal Schemes
 */
export const nationalScholarshipScheme = {
    id: 'nsp-001',
    name: 'Post Matric Scholarship for SC Students',
    shortName: 'Post Matric SC',
    description: 'The objective of the scheme is to provide financial assistance to the Scheduled Caste students studying at post matriculation or post-secondary stage to enable them to complete their education.',
    simplifiedDescription: 'If you belong to SC category and are studying after 10th class, you can get scholarship money to help with your education expenses.',
    benefitType: BenefitType.SCHOLARSHIP,
    benefitCategories: [BenefitType.SCHOLARSHIP, BenefitType.EDUCATION],
    governmentLevel: GovernmentLevel.CENTRAL,
    implementingAgency: 'Ministry of Social Justice and Empowerment',
    eligibilityCriteria: [
        {
            id: 'crit-nsp-001',
            type: CriterionType.EDUCATION_LEVEL,
            field: 'educationLevel',
            operator: ComparisonOperator.IN,
            value: ['higher_secondary', 'graduate', 'post_graduate', 'diploma'],
            description: 'Must be studying in Class 11 or above',
            isMandatory: true
        },
        {
            id: 'crit-nsp-002',
            type: CriterionType.CASTE_CATEGORY,
            field: 'casteCategory',
            operator: ComparisonOperator.EQUALS,
            value: 'sc',
            description: 'Must belong to Scheduled Caste category',
            isMandatory: true
        },
        {
            id: 'crit-nsp-003',
            type: CriterionType.INCOME_LIMIT,
            field: 'annualIncome',
            operator: ComparisonOperator.LESS_THAN_OR_EQUALS,
            value: 250000,
            description: 'Family annual income should not exceed ₹2.5 lakhs',
            isMandatory: true
        }
    ],
    targetDemographics: ['SC students', 'students', 'youth'],
    benefits: [
        {
            type: 'monetary',
            description: 'Maintenance allowance and tuition fee reimbursement',
            amount: 12000,
            amountType: 'yearly',
            currency: 'INR'
        }
    ],
    applicationProcess: [
        {
            stepNumber: 1,
            title: 'Register on NSP Portal',
            description: 'Create an account on the National Scholarship Portal using your mobile number and email',
            requiredDocuments: ['Mobile Number', 'Email ID'],
            estimatedTime: '10 minutes',
            onlineAvailable: true,
            onlineUrl: 'https://scholarships.gov.in/'
        },
        {
            stepNumber: 2,
            title: 'Fill Application Form',
            description: 'Complete the scholarship application form with personal, academic, and bank details',
            requiredDocuments: ['Aadhaar Card', 'Caste Certificate', 'Income Certificate', 'Previous Year Marksheet'],
            estimatedTime: '30 minutes',
            onlineAvailable: true
        },
        {
            stepNumber: 3,
            title: 'Upload Documents',
            description: 'Scan and upload all required documents',
            requiredDocuments: ['All certificates in PDF format'],
            estimatedTime: '20 minutes',
            onlineAvailable: true,
            tips: ['Keep file size under 200KB', 'Use PDF format for documents']
        },
        {
            stepNumber: 4,
            title: 'Institute Verification',
            description: 'Your educational institution will verify your application',
            requiredDocuments: [],
            estimatedTime: '1-2 weeks',
            onlineAvailable: true
        }
    ],
    documents: [
        {
            name: 'Caste Certificate',
            description: 'Valid SC caste certificate issued by competent authority',
            isMandatory: true
        },
        {
            name: 'Income Certificate',
            description: 'Income certificate showing family annual income',
            isMandatory: true
        },
        {
            name: 'Previous Year Marksheet',
            description: 'Marksheet of last qualifying examination',
            isMandatory: true
        },
        {
            name: 'Bank Account Details',
            description: 'Bank passbook or cancelled cheque (account must be in student name)',
            isMandatory: true
        },
        {
            name: 'Aadhaar Card',
            description: 'Valid Aadhaar card of the student',
            isMandatory: true
        }
    ],
    applicationDeadline: new Date(new Date().getFullYear(), 11, 31), // End of current year
    isOpenForApplication: true,
    contactInfo: {
        department: 'Ministry of Social Justice and Empowerment',
        helplineNumber: '0120-6619540',
        email: 'helpdesk@nsp.gov.in',
        websiteUrl: 'https://scholarships.gov.in/'
    },
    source: {
        name: 'National Scholarship Portal',
        url: 'https://scholarships.gov.in/',
        lastAccessed: new Date(),
        isOfficial: true
    },
    lastUpdated: new Date(),
    lastVerified: new Date(),
    isActive: true,
    availableLanguages: ['en', 'hi']
};
/**
 * Ayushman Bharat Healthcare Scheme
 */
export const ayushmanBharatScheme = {
    id: 'ab-pmjay-001',
    name: 'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana',
    shortName: 'AB-PMJAY',
    description: 'Ayushman Bharat PM-JAY is the largest health assurance scheme in the world which aims at providing a health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization to over 12 crore poor and vulnerable families.',
    simplifiedDescription: 'Get free treatment up to ₹5 lakhs per year at any government or listed private hospital. The scheme covers most diseases and surgeries.',
    benefitType: BenefitType.HEALTHCARE,
    benefitCategories: [BenefitType.HEALTHCARE],
    governmentLevel: GovernmentLevel.CENTRAL,
    implementingAgency: 'National Health Authority',
    eligibilityCriteria: [
        {
            id: 'crit-ab-001',
            type: CriterionType.INCOME_LIMIT,
            field: 'incomeRange',
            operator: ComparisonOperator.IN,
            value: ['bpl', 'low'],
            description: 'Must be from economically weaker section (based on SECC database)',
            isMandatory: true
        }
    ],
    targetDemographics: ['BPL families', 'poor', 'vulnerable families'],
    benefits: [
        {
            type: 'service',
            description: 'Health insurance cover of ₹5 lakhs per family per year',
            amount: 500000,
            amountType: 'yearly',
            currency: 'INR'
        }
    ],
    applicationProcess: [
        {
            stepNumber: 1,
            title: 'Check Eligibility',
            description: 'Visit the Ayushman Bharat website or use the mobile app to check if your family is eligible',
            requiredDocuments: ['Ration Card Number or Aadhaar Number'],
            estimatedTime: '5 minutes',
            onlineAvailable: true,
            onlineUrl: 'https://mera.pmjay.gov.in/search/login',
            helplineNumber: '14555'
        },
        {
            stepNumber: 2,
            title: 'Visit Empaneled Hospital or CSC',
            description: 'If eligible, visit any empaneled hospital or Common Service Centre with your Aadhaar card',
            requiredDocuments: ['Aadhaar Card', 'Ration Card'],
            estimatedTime: '30 minutes',
            onlineAvailable: false,
            offlineLocation: 'Any empaneled hospital or CSC'
        },
        {
            stepNumber: 3,
            title: 'Get Ayushman Card',
            description: 'After verification, you will receive your Ayushman card for free',
            requiredDocuments: [],
            estimatedTime: '15 minutes',
            onlineAvailable: false
        }
    ],
    documents: [
        {
            name: 'Aadhaar Card',
            description: 'Aadhaar card of any family member',
            isMandatory: true
        },
        {
            name: 'Ration Card',
            description: 'Family ration card',
            isMandatory: false,
            alternativeDocuments: ['SECC Database Entry']
        }
    ],
    isOpenForApplication: true,
    contactInfo: {
        department: 'National Health Authority',
        helplineNumber: '14555',
        websiteUrl: 'https://pmjay.gov.in/'
    },
    source: {
        name: 'Ayushman Bharat Official Portal',
        url: 'https://pmjay.gov.in/',
        lastAccessed: new Date(),
        isOfficial: true
    },
    lastUpdated: new Date(),
    lastVerified: new Date(),
    isActive: true,
    availableLanguages: ['en', 'hi']
};
/**
 * Senior Citizen Pension Scheme
 */
export const seniorCitizenPensionScheme = {
    id: 'ignoaps-001',
    name: 'Indira Gandhi National Old Age Pension Scheme',
    shortName: 'IGNOAPS',
    description: 'Under this scheme, BPL persons aged 60 years or above are entitled to a monthly pension. The central contribution is Rs. 200 per month per beneficiary for persons between 60-79 years and Rs. 500 per month for persons 80 years and above.',
    simplifiedDescription: 'If you are 60 years or older and from a BPL family, you can get monthly pension of ₹200-500 directly in your bank account.',
    benefitType: BenefitType.SENIOR_CITIZEN,
    benefitCategories: [BenefitType.SENIOR_CITIZEN, BenefitType.FINANCIAL_AID, BenefitType.SOCIAL_SECURITY],
    governmentLevel: GovernmentLevel.CENTRAL,
    implementingAgency: 'Ministry of Rural Development',
    eligibilityCriteria: [
        {
            id: 'crit-ign-001',
            type: CriterionType.AGE_RANGE,
            field: 'age',
            operator: ComparisonOperator.GREATER_THAN_OR_EQUALS,
            value: 60,
            description: 'Must be 60 years or older',
            isMandatory: true
        },
        {
            id: 'crit-ign-002',
            type: CriterionType.INCOME_LIMIT,
            field: 'incomeRange',
            operator: ComparisonOperator.EQUALS,
            value: 'bpl',
            description: 'Must be from Below Poverty Line (BPL) family',
            isMandatory: true
        }
    ],
    targetDemographics: ['senior citizens', 'elderly', 'BPL'],
    benefits: [
        {
            type: 'monetary',
            description: 'Monthly pension of ₹200 (60-79 years) or ₹500 (80+ years)',
            amount: 200,
            amountType: 'monthly',
            currency: 'INR'
        }
    ],
    applicationProcess: [
        {
            stepNumber: 1,
            title: 'Collect Application Form',
            description: 'Get the application form from Gram Panchayat office (rural) or Urban Local Body (urban)',
            requiredDocuments: [],
            estimatedTime: '15 minutes',
            onlineAvailable: false,
            offlineLocation: 'Gram Panchayat / Municipal Office'
        },
        {
            stepNumber: 2,
            title: 'Fill and Submit Form',
            description: 'Fill the form with all details and submit with required documents',
            requiredDocuments: ['Age Proof', 'BPL Certificate', 'Bank Account Details', 'Aadhaar Card'],
            estimatedTime: '30 minutes',
            onlineAvailable: false
        },
        {
            stepNumber: 3,
            title: 'Verification',
            description: 'Officials will verify your documents and eligibility',
            requiredDocuments: [],
            estimatedTime: '2-4 weeks',
            onlineAvailable: false
        }
    ],
    documents: [
        {
            name: 'Age Proof',
            description: 'Birth certificate, school certificate, or Aadhaar card showing age',
            isMandatory: true,
            alternativeDocuments: ['Voter ID', 'Aadhaar Card']
        },
        {
            name: 'BPL Certificate',
            description: 'Below Poverty Line certificate or ration card',
            isMandatory: true
        },
        {
            name: 'Bank Account Details',
            description: 'Bank passbook showing account number and IFSC code',
            isMandatory: true
        }
    ],
    isOpenForApplication: true,
    contactInfo: {
        department: 'Ministry of Rural Development',
        websiteUrl: 'https://nsap.nic.in/',
        helplineNumber: '1800-111-555'
    },
    source: {
        name: 'National Social Assistance Programme',
        url: 'https://nsap.nic.in/',
        lastAccessed: new Date(),
        isOfficial: true
    },
    lastUpdated: new Date(),
    lastVerified: new Date(),
    isActive: true,
    availableLanguages: ['en', 'hi']
};
/**
 * Women Welfare Scheme
 */
export const ujjwalaScheme = {
    id: 'pmuy-001',
    name: 'Pradhan Mantri Ujjwala Yojana',
    shortName: 'PMUY',
    description: 'Pradhan Mantri Ujjwala Yojana aims to safeguard the health of women & children by providing them with clean cooking fuel - LPG, so that they don\'t have to compromise their health in smoky kitchens.',
    simplifiedDescription: 'Get a free LPG gas connection with your first cylinder. This scheme is for women from BPL families to provide clean cooking fuel.',
    benefitType: BenefitType.WOMEN_WELFARE,
    benefitCategories: [BenefitType.WOMEN_WELFARE, BenefitType.FINANCIAL_AID],
    governmentLevel: GovernmentLevel.CENTRAL,
    implementingAgency: 'Ministry of Petroleum and Natural Gas',
    eligibilityCriteria: [
        {
            id: 'crit-pmuy-001',
            type: CriterionType.GENDER,
            field: 'gender',
            operator: ComparisonOperator.EQUALS,
            value: 'female',
            description: 'Applicant must be a woman',
            isMandatory: true
        },
        {
            id: 'crit-pmuy-002',
            type: CriterionType.AGE_RANGE,
            field: 'age',
            operator: ComparisonOperator.GREATER_THAN_OR_EQUALS,
            value: 18,
            description: 'Must be 18 years or older',
            isMandatory: true
        },
        {
            id: 'crit-pmuy-003',
            type: CriterionType.INCOME_LIMIT,
            field: 'incomeRange',
            operator: ComparisonOperator.IN,
            value: ['bpl', 'low'],
            description: 'Must be from BPL family or priority household',
            isMandatory: true
        }
    ],
    targetDemographics: ['women', 'BPL families', 'rural women'],
    benefits: [
        {
            type: 'service',
            description: 'Free LPG connection with first refill and stove',
            amount: 1600,
            amountType: 'one_time',
            currency: 'INR'
        }
    ],
    applicationProcess: [
        {
            stepNumber: 1,
            title: 'Visit LPG Distributor',
            description: 'Visit your nearest LPG distributor (HP, Bharat Gas, or Indane)',
            requiredDocuments: ['Aadhaar Card'],
            estimatedTime: '30 minutes',
            onlineAvailable: false,
            offlineLocation: 'Nearest LPG Distributor',
            helplineNumber: '1800-233-3555'
        },
        {
            stepNumber: 2,
            title: 'Fill KYC Form',
            description: 'Complete the KYC form and submit with required documents',
            requiredDocuments: ['BPL Card or Priority Card', 'Aadhaar Card', 'Bank Account Details'],
            estimatedTime: '20 minutes',
            onlineAvailable: false
        },
        {
            stepNumber: 3,
            title: 'Receive Connection',
            description: 'After verification, you will receive the LPG connection at your home',
            requiredDocuments: [],
            estimatedTime: '1-2 weeks',
            onlineAvailable: false
        }
    ],
    documents: [
        {
            name: 'BPL/Priority Card',
            description: 'BPL ration card or priority household card',
            isMandatory: true
        },
        {
            name: 'Aadhaar Card',
            description: 'Aadhaar card of the woman applicant',
            isMandatory: true
        },
        {
            name: 'Bank Account',
            description: 'Active bank account in applicant\'s name',
            isMandatory: true
        }
    ],
    isOpenForApplication: true,
    contactInfo: {
        department: 'Ministry of Petroleum and Natural Gas',
        helplineNumber: '1800-233-3555',
        websiteUrl: 'https://pmuy.gov.in/'
    },
    source: {
        name: 'PMUY Official Portal',
        url: 'https://pmuy.gov.in/',
        lastAccessed: new Date(),
        isOfficial: true
    },
    lastUpdated: new Date(),
    lastVerified: new Date(),
    isActive: true,
    availableLanguages: ['en', 'hi']
};
/**
 * All sample schemes
 */
export const sampleSchemes = [
    pmKisanScheme,
    nationalScholarshipScheme,
    ayushmanBharatScheme,
    seniorCitizenPensionScheme,
    ujjwalaScheme
];
export default sampleSchemes;
//# sourceMappingURL=sample-schemes.js.map