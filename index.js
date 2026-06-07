// index.js
const express = require('express');
const cors = require('cors');

const app = express();

// The Reality Check: CORS (Cross-Origin Resource Sharing)
// Without this line, your browser will block the Vue app from talking to this server.
app.use(cors()); 
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Orchestrator is online' });
});

// The main processing webhook/endpoint
app.post('/api/process-batch', (req, res) => {
  const { patient_id, image_ids } = req.body;

  // 1. Validation
  if (!patient_id || !image_ids || !image_ids.length) {
    console.error('[ERROR] Invalid payload received:', req.body);
    return res.status(400).json({ error: 'Missing patient_id or image_ids' });
  }

  // 2. Logging the Request
  console.log(`\n--- NEW PROCESSING REQUEST ---`);
  console.log(`Patient ID: ${patient_id}`);
  console.log(`Images in Queue: ${image_ids.length}`);
  console.log(`Image IDs:`, image_ids);
  console.log(`------------------------------\n`);

  // 3. Phase 3 Placeholder
  // THIS is exactly where we will write the code to contact Modal (Python/GPU) next month.
  
  // 4. Return Success to Vue
  res.status(200).json({ 
    message: 'Batch successfully received by orchestrator', 
    queued_count: image_ids.length 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI Orchestrator running on port ${PORT}`);
});