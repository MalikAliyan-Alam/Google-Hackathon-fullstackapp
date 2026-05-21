require('dotenv').config();
const express = require('express');
const cors = require('cors');

const agent1_ingestion = require('./agents/agent1_ingestion');
const agent2_insight = require('./agents/agent2_insight');
const agent3_decision = require('./agents/agent3_decision');
const agent4_executor = require('./agents/agent4_executor');
const agent5_risk = require('./agents/agent5_risk');
const agent0_fetcher = require('./agents/agent0_fetcher');
const agent0_parser = require('./agents/agent0_parser');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only images (JPG, PNG) and PDFs are allowed'));
    }
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'running',
    message: 'PolicyAgent AI Backend is live',
    agents: ['agent1_ingestion', 'agent2_insight', 'agent3_decision', 'agent4_executor'],
    orchestrator: 'Google Antigravity Mission Control'
  });
});

// Main pipeline endpoint
app.post('/api/analyze', async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim().length < 20) {
    return res.status(400).json({
      success: false,
      error: 'Content too short. Please provide a news article or policy document.'
    });
  }

  console.log('\n========================================');
  console.log('ANTIGRAVITY MISSION CONTROL — PIPELINE START');
  console.log('========================================');
  console.log(`Input length: ${content.length} characters`);
  console.log('----------------------------------------');

  try {
    // AGENT 1 — Ingestion
    console.log('\n[MISSION] Starting Agent 1 — Ingestion...');
    const agent1Output = agent1_ingestion(content);
    console.log('[MISSION] Agent 1 complete ✓');

    // AGENT 2 — Insight Extraction
    console.log('\n[MISSION] Starting Agent 2 — Insight Extraction...');
    const agent2Output = await agent2_insight(agent1Output);
    console.log('[MISSION] Agent 2 complete ✓');

    // AGENT 3 — Decision Making
    console.log('\n[MISSION] Starting Agent 3 — Decision Making...');
    const agent3Output = await agent3_decision(agent2Output);
    console.log('[MISSION] Agent 3 complete ✓');

    // AGENT 4 — Action Execution
    console.log('\n[MISSION] Starting Agent 4 — Action Execution...');
    const agent4Output = await agent4_executor(agent3Output);
    console.log('[MISSION] Agent 4 complete ✓');

    // AGENT 5 — Risk Assessment
    console.log('\n[MISSION] Starting Agent 5 — Risk Assessment...');
    const agent5Output = await agent5_risk(agent2Output, agent3Output, agent4Output);
    console.log('[MISSION] Agent 5 complete ✓');

    console.log('\n========================================');
    console.log('ANTIGRAVITY MISSION CONTROL — PIPELINE COMPLETE');
    console.log('========================================\n');

    // Send full pipeline result to mobile app
    res.json({
      success: true,
      pipeline: {
        agent1_ingestion: {
          source_type: agent1Output.source_type,
          topic: agent1Output.topic,
          date: agent1Output.date,
          word_count: agent1Output.word_count,
          chunk_count: agent1Output.chunk_count,
          status: 'complete'
        },
        agent2_insight: {
          core_insight: agent2Output.core_insight,
          affected_sectors: agent2Output.affected_sectors,
          severity: agent2Output.severity,
          severity_reason: agent2Output.severity_reason,
          stakeholders: agent2Output.stakeholders,
          urgency: agent2Output.urgency,
          key_facts: agent2Output.key_facts,
          economic_impact: agent2Output.economic_impact,
          status: 'complete'
        },
        agent3_decision: {
          situation_summary: agent3Output.situation_summary,
          recommended_actions: agent3Output.recommended_actions,
          top_action: agent3Output.top_action,
          reasoning: agent3Output.reasoning,
          status: 'complete'
        },
        agent4_simulation: {
          action_executed: agent4Output.action_executed,
          action_description: agent4Output.action_description,
          execution_timestamp: agent4Output.execution_timestamp,
          execution_status: agent4Output.execution_status,
          before_state: agent4Output.before_state,
          after_state: agent4Output.after_state,
          execution_log: agent4Output.execution_log,
          confirmation_message: agent4Output.confirmation_message,
          status: 'complete'
        }
        ,agent5_risk: {
          risk_score: agent5Output.risk_score,
          risk_level: agent5Output.risk_level,
          risk_color: agent5Output.risk_color,
          risk_factors: agent5Output.risk_factors,
          mitigation_strategies: agent5Output.mitigation_strategies,
          early_warning_indicators: agent5Output.early_warning_indicators,
          assessment_summary: agent5Output.assessment_summary,
          assessed_at: agent5Output.assessed_at,
          status: 'complete'
        }
      }
    });

  } catch (error) {
    console.error('\n[MISSION ERROR]', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      hint: 'Check your CLAUDE_API_KEY in .env file'
    });
  }
});

const PORT = process.env.PORT || 8080;
app.post('/api/file-analyze', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      error: 'No file uploaded. Please upload an image or PDF.'
    });
  }

  const fileType = req.file.mimetype === 'application/pdf' ? 'pdf' : 'image';

  console.log('\n========================================');
  console.log('ANTIGRAVITY MISSION CONTROL — FILE PIPELINE START');
  console.log('========================================');
  console.log(`File: ${req.file.originalname} | Type: ${fileType}`);
  console.log('----------------------------------------');

  try {
    // AGENT 0 — File Parser
    console.log('\n[MISSION] Starting Agent 0 — File Parser...');
    const agent0Output = await agent0_parser(req.file.path, fileType);
    console.log('[MISSION] Agent 0 complete ✓');

    if (!agent0Output.success) {
      return res.status(400).json({
        success: false,
        error: 'Could not parse file: ' + agent0Output.error
      });
    }

    let contentForPipeline = '';

    if (fileType === 'pdf') {
      contentForPipeline = agent0Output.extractedText;
    } else {
      // For images, use a descriptive placeholder
      // In production this would use Vision API
      contentForPipeline = `Image file analyzed: ${req.file.originalname}. Visual content detected requiring policy analysis and action recommendation based on the uploaded image document.`;
    }

    if (!contentForPipeline || contentForPipeline.length < 20) {
      return res.status(400).json({
        success: false,
        error: 'Could not extract enough content from file. Please try a different file.'
      });
    }

    // AGENT 1 — Ingestion
    console.log('\n[MISSION] Starting Agent 1 — Ingestion...');
    const agent1Output = agent1_ingestion(contentForPipeline);
    console.log('[MISSION] Agent 1 complete ✓');

    // AGENT 2 — Insight Extraction
    console.log('\n[MISSION] Starting Agent 2 — Insight Extraction...');
    const agent2Output = await agent2_insight(agent1Output);
    console.log('[MISSION] Agent 2 complete ✓');

    // AGENT 3 — Decision Making
    console.log('\n[MISSION] Starting Agent 3 — Decision Making...');
    const agent3Output = await agent3_decision(agent2Output);
    console.log('[MISSION] Agent 3 complete ✓');

    // AGENT 4 — Action Execution
    console.log('\n[MISSION] Starting Agent 4 — Action Execution...');
    const agent4Output = await agent4_executor(agent3Output);
    console.log('[MISSION] Agent 4 complete ✓');

    // AGENT 5 — Risk Assessment
    console.log('\n[MISSION] Starting Agent 5 — Risk Assessment...');
    const agent5Output = await agent5_risk(agent2Output, agent3Output, agent4Output);
    console.log('[MISSION] Agent 5 complete ✓');

    console.log('\n========================================');
    console.log('ANTIGRAVITY MISSION CONTROL — FILE PIPELINE COMPLETE');
    console.log('========================================\n');

    res.json({
      success: true,
      source: {
        filename: req.file.originalname,
        fileType: fileType,
        size: req.file.size,
        parsedAt: agent0Output.parsedAt
      },
      pipeline: {
        agent0_parse: {
          filename: req.file.originalname,
          fileType: fileType,
          status: 'complete'
        },
        agent1_ingestion: {
          source_type: agent1Output.source_type,
          topic: agent1Output.topic,
          date: agent1Output.date,
          word_count: agent1Output.word_count,
          status: 'complete'
        },
        agent2_insight: {
          core_insight: agent2Output.core_insight,
          affected_sectors: agent2Output.affected_sectors,
          severity: agent2Output.severity,
          severity_reason: agent2Output.severity_reason,
          stakeholders: agent2Output.stakeholders,
          urgency: agent2Output.urgency,
          key_facts: agent2Output.key_facts,
          economic_impact: agent2Output.economic_impact,
          status: 'complete'
        },
        agent3_decision: {
          situation_summary: agent3Output.situation_summary,
          recommended_actions: agent3Output.recommended_actions,
          top_action: agent3Output.top_action,
          reasoning: agent3Output.reasoning,
          status: 'complete'
        },
        agent4_simulation: {
          action_executed: agent4Output.action_executed,
          action_description: agent4Output.action_description,
          execution_timestamp: agent4Output.execution_timestamp,
          execution_status: agent4Output.execution_status,
          before_state: agent4Output.before_state,
          after_state: agent4Output.after_state,
          execution_log: agent4Output.execution_log,
          confirmation_message: agent4Output.confirmation_message,
          status: 'complete'
        }
        ,agent5_risk: {
          risk_score: agent5Output.risk_score,
          risk_level: agent5Output.risk_level,
          risk_color: agent5Output.risk_color,
          risk_factors: agent5Output.risk_factors,
          mitigation_strategies: agent5Output.mitigation_strategies,
          early_warning_indicators: agent5Output.early_warning_indicators,
          assessment_summary: agent5Output.assessment_summary,
          assessed_at: agent5Output.assessed_at,
          status: 'complete'
        }
      }
    });

  } catch (error) {
    console.error('\n[MISSION ERROR]', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// URL Fetch + Analyze endpoint
app.post('/api/fetch-and-analyze', async (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid URL starting with http or https'
    });
  }

  console.log('\n========================================');
  console.log('ANTIGRAVITY MISSION CONTROL — URL PIPELINE START');
  console.log('========================================');
  console.log(`URL: ${url}`);
  console.log('----------------------------------------');

  try {
    // AGENT 0 — URL Fetcher
    console.log('\n[MISSION] Starting Agent 0 — URL Fetcher...');
    const agent0Output = await agent0_fetcher(url);
    console.log('[MISSION] Agent 0 complete ✓');

    if (!agent0Output.success) {
      return res.status(400).json({
        success: false,
        error: 'Could not fetch article: ' + agent0Output.error
      });
    }

    // AGENT 1 — Ingestion
    console.log('\n[MISSION] Starting Agent 1 — Ingestion...');
    const agent1Output = agent1_ingestion(agent0Output.content);
    console.log('[MISSION] Agent 1 complete ✓');

    // AGENT 2 — Insight Extraction
    console.log('\n[MISSION] Starting Agent 2 — Insight Extraction...');
    const agent2Output = await agent2_insight(agent1Output);
    console.log('[MISSION] Agent 2 complete ✓');

    // AGENT 3 — Decision Making
    console.log('\n[MISSION] Starting Agent 3 — Decision Making...');
    const agent3Output = await agent3_decision(agent2Output);
    console.log('[MISSION] Agent 3 complete ✓');

    // AGENT 4 — Action Execution
    console.log('\n[MISSION] Starting Agent 4 — Action Execution...');
    const agent4Output = await agent4_executor(agent3Output);
    console.log('[MISSION] Agent 4 complete ✓');

    // AGENT 5 — Risk Assessment
    console.log('\n[MISSION] Starting Agent 5 — Risk Assessment...');
    const agent5Output = await agent5_risk(agent2Output, agent3Output, agent4Output);
    console.log('[MISSION] Agent 5 complete ✓');

    console.log('\n========================================');
    console.log('ANTIGRAVITY MISSION CONTROL — URL PIPELINE COMPLETE');
    console.log('========================================\n');

    res.json({
      success: true,
      source: {
        url: url,
        title: agent0Output.title,
        domain: agent0Output.source_domain,
        fetched_at: agent0Output.fetched_at
      },
      pipeline: {
        agent0_fetch: {
          title: agent0Output.title,
          domain: agent0Output.source_domain,
          content_length: agent0Output.content.length,
          status: 'complete'
        },
        agent1_ingestion: {
          source_type: agent1Output.source_type,
          topic: agent1Output.topic,
          date: agent1Output.date,
          word_count: agent1Output.word_count,
          chunk_count: agent1Output.chunk_count,
          status: 'complete'
        },
        agent2_insight: {
          core_insight: agent2Output.core_insight,
          affected_sectors: agent2Output.affected_sectors,
          severity: agent2Output.severity,
          severity_reason: agent2Output.severity_reason,
          stakeholders: agent2Output.stakeholders,
          urgency: agent2Output.urgency,
          key_facts: agent2Output.key_facts,
          economic_impact: agent2Output.economic_impact,
          status: 'complete'
        },
        agent3_decision: {
          situation_summary: agent3Output.situation_summary,
          recommended_actions: agent3Output.recommended_actions,
          top_action: agent3Output.top_action,
          reasoning: agent3Output.reasoning,
          status: 'complete'
        },
        agent4_simulation: {
          action_executed: agent4Output.action_executed,
          action_description: agent4Output.action_description,
          execution_timestamp: agent4Output.execution_timestamp,
          execution_status: agent4Output.execution_status,
          before_state: agent4Output.before_state,
          after_state: agent4Output.after_state,
          execution_log: agent4Output.execution_log,
          confirmation_message: agent4Output.confirmation_message,
          status: 'complete'
        },
        agent5_risk: {
          risk_score: agent5Output.risk_score,
          risk_level: agent5Output.risk_level,
          risk_color: agent5Output.risk_color,
          risk_factors: agent5Output.risk_factors,
          mitigation_strategies: agent5Output.mitigation_strategies,
          early_warning_indicators: agent5Output.early_warning_indicators,
          assessment_summary: agent5Output.assessment_summary,
          assessed_at: agent5Output.assessed_at,
          status: 'complete'
        }
      }
    });

  } catch (error) {
    console.error('\n[MISSION ERROR]', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`\nPolicyAgent AI Backend running on port ${PORT}`);
  console.log('Google Antigravity Mission Control — Ready');
  console.log(`Health check: http://localhost:${PORT}/health\n`);
});
