/**
 * Community Access Assistant - Footer Component
 * Copyright (c) 2026 Abinaya R
 * Licensed under MIT License
 */

import React from 'react';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © 2026 <strong>Abinaya R</strong> | Community Access Assistant
          </p>
          <p className="footer-links">
            <a 
              href="https://github.com/Abinayaravi07/community-access-assistant" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            {' | '}
            <a 
              href="https://github.com/Abinayaravi07/community-access-assistant/blob/main/LICENSE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              MIT License
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
