import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { UserProfile, MatchResult } from '@community-access/shared';

interface SessionState {
  profile: Partial<UserProfile> | null;
  matchResults: MatchResult[];
  hasConsented: boolean;
  language: string;
}

interface SessionContextType extends SessionState {
  setProfile: (profile: Partial<UserProfile> | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setMatchResults: (results: MatchResult[]) => void;
  setHasConsented: (consented: boolean) => void;
  setLanguage: (lang: string) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_KEY = 'community-access-session';

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(() => {
    // Try to restore from sessionStorage (not localStorage for privacy)
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore errors
    }
    return {
      profile: null,
      matchResults: [],
      hasConsented: false,
      language: 'en'
    };
  });

  // Save to sessionStorage on changes
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } catch {
      // Ignore errors
    }
  }, [state]);

  // Clear session on window close (privacy requirement)
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem(SESSION_KEY);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const setProfile = (profile: Partial<UserProfile> | null) => {
    setState(prev => ({ ...prev, profile }));
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: prev.profile ? { ...prev.profile, ...updates } : updates
    }));
  };

  const setMatchResults = (matchResults: MatchResult[]) => {
    setState(prev => ({ ...prev, matchResults }));
  };

  const setHasConsented = (hasConsented: boolean) => {
    setState(prev => ({ ...prev, hasConsented }));
  };

  const setLanguage = (language: string) => {
    setState(prev => ({ ...prev, language }));
  };

  const clearSession = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setState({
      profile: null,
      matchResults: [],
      hasConsented: false,
      language: 'en'
    });
  };

  return (
    <SessionContext.Provider
      value={{
        ...state,
        setProfile,
        updateProfile,
        setMatchResults,
        setHasConsented,
        setLanguage,
        clearSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
