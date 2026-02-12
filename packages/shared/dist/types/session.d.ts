/**
 * Privacy and Session Management Interfaces
 */
import { UserProfile } from './user-profile';
/**
 * Session data stored client-side
 */
export interface SessionData {
    sessionId: string;
    profile?: UserProfile;
    matchResults?: unknown;
    language: string;
    createdAt: Date;
    lastAccessedAt: Date;
    expiresAt: Date;
}
/**
 * Privacy consent information
 */
export interface PrivacyConsent {
    hasAcceptedPrivacyPolicy: boolean;
    hasAcceptedDataProcessing: boolean;
    consentTimestamp?: Date;
}
/**
 * Session manager interface
 */
export interface SessionManager {
    createSession(): SessionData;
    getSession(): SessionData | null;
    updateSession(data: Partial<SessionData>): void;
    clearSession(): void;
    isSessionValid(): boolean;
    getPrivacyConsent(): PrivacyConsent;
    setPrivacyConsent(consent: PrivacyConsent): void;
}
//# sourceMappingURL=session.d.ts.map