// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'EHR Orchestrator is online' });
});

// The updated clinical processing endpoint
app.post('/api/process-visit', (req, res) => {
  const { visit_id } = req.body;

  // 1. Validation
  if (!visit_id) {
    console.error('[ERROR] Invalid payload received:', req.body);
    return res.status(400).json({ error: 'Missing visit_id' });
  }

  // 2. Logging the Request
  console.log(`\n--- NEW CLINICAL AI BATCH ---`);
  console.log(`Target Visit ID: ${visit_id}`);
  console.log(`Action: Fetching pending images for this visit from Supabase...`);
  console.log(`-----------------------------\n`);

  // 3. Phase 3 Placeholder
  // Next month, we write the Python/Modal integration here.
  // The orchestrator will query Supabase for all images where visit_id matches and status = 'pending',
  // and pass their secure URLs to the bacteria segmentation models.
  
  // 4. Acknowledge Receipt
  res.status(200).json({ 
    message: 'Visit batch successfully queued for bacteria segmentation.' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 EHR Orchestrator running on port ${PORT}`);
});