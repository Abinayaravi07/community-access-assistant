"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const shared_1 = require("@community-access/shared");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Get all schemes
app.get('/api/schemes', (_req, res) => {
    res.json({
        schemes: shared_1.sampleSchemes,
        total: shared_1.sampleSchemes.length,
        lastUpdated: new Date().toISOString()
    });
});
// Get scheme by ID
app.get('/api/schemes/:id', (req, res) => {
    const scheme = shared_1.sampleSchemes.find((s) => s.id === req.params.id);
    if (!scheme) {
        return res.status(404).json({ error: 'Scheme not found' });
    }
    res.json(scheme);
});
// Get schemes by category
app.get('/api/schemes/category/:category', (req, res) => {
    const schemes = shared_1.sampleSchemes.filter((s) => s.benefitType === req.params.category ||
        s.benefitCategories.includes(req.params.category));
    res.json({
        schemes,
        total: schemes.length,
        category: req.params.category
    });
});
// Search schemes
app.get('/api/search', (req, res) => {
    const query = (req.query.q || '').toLowerCase();
    if (!query) {
        return res.json({ schemes: [], total: 0 });
    }
    const schemes = shared_1.sampleSchemes.filter((s) => {
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
    console.log(`📋 ${shared_1.sampleSchemes.length} schemes loaded`);
});
//# sourceMappingURL=index.js.map