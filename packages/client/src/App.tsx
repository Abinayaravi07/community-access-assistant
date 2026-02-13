/**
 * Community Access Assistant
 * Copyright (c) 2026 Abinaya R (Abinayaravi07)
 * Licensed under MIT License
 * GitHub: https://github.com/Abinayaravi07/community-access-assistant
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ResultsPage } from './pages/ResultsPage';
import { SessionProvider } from './context/SessionContext';

function App() {
  return (
    <SessionProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <main className="main-content">
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/results" element={<ResultsPage />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
