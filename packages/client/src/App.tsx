import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
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
        </div>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
