/**
 * Community Access Assistant - Backend API Server
 * Copyright (c) 2026 Abinaya R (Abinayaravi07)
 * Licensed under MIT License
 * GitHub: https://github.com/Abinayaravi07/community-access-assistant
 */

import express from 'express';
import cors from 'cors';
import { sampleSchemes, type GovernmentScheme } from '@community-access/shared';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get all schemes
app.get('/api/schemes', (_req, res) => {
  res.json({
    schemes: sampleSchemes,
    total: sampleSchemes.length,
    lastUpdated: new Date().toISOString()
  });
});

// Get scheme by ID
app.get('/api/schemes/:id', (req, res) => {
  const scheme = sampleSchemes.find((s: GovernmentScheme) => s.id === req.params.id);
  if (!scheme) {
    return res.status(404).json({ error: 'Scheme not found' });
  }
  res.json(scheme);
});

// Get schemes by category
app.get('/api/schemes/category/:category', (req, res) => {
  const schemes = sampleSchemes.filter(
    (s: GovernmentScheme) => s.benefitType === req.params.category || 
         s.benefitCategories.includes(req.params.category as any)
  );
  res.json({
    schemes,
    total: schemes.length,
    category: req.params.category
  });
});

// Search schemes
app.get('/api/search', (req, res) => {
  const query = (req.query.q as string || '').toLowerCase();
  if (!query) {
    return res.json({ schemes: [], total: 0 });
  }

  const schemes = sampleSchemes.filter((s: GovernmentScheme) => {
    const searchText = `${s.name} ${s.description} ${s.targetDemographics.join(' ')}`.toLowerCase();
    return searchText.includes(query);
  });

  res.json({
    schemes,
    total: schemes.length,
    query
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 ${sampleSchemes.length} schemes loaded`);
});
