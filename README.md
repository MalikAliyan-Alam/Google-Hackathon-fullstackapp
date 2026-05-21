# PolicyAgent AI
## Autonomous Content-to-Action Agent System
### Built with Google Antigravity | Google Cloud Run | React Native | React.js

---

## Live Links
- **Web App:** https://news-policy-agent.web.app
- **Mobile APK:** https://news-policy-agent.web.app/policyagent.apk
- **Backend API:** https://policy-agent-backend-680364932386.us-central1.run.app
- **Health Check:** https://policy-agent-backend-680364932386.us-central1.run.app/health

---

## Overview
PolicyAgent AI is a 5-agent autonomous system that transforms unstructured content into actionable intelligence. The system processes news articles, policy documents, PDFs, and URLs through a sequential multi-agent pipeline orchestrated by Google Antigravity Mission Control.

---

## Architecture

User Input (Text / URL / PDF / Image)
           ↓
Google Antigravity — Mission Control (Orchestrator)
           ↓
Agent 1 → Agent 2 → Agent 3 → Agent 4 → Agent 5
           ↓
React Native Mobile App + React Web App

---

## Agent Pipeline

### Agent 1 — Ingestion Agent
- Cleans and normalizes raw input
- Strips HTML, collapses whitespace
- Chunks content into 500-word segments
- Extracts topic, date, word count

### Agent 2 — Insight Agent
- Dynamic domain detection across 14 sectors
- Extracts core insight, affected sectors, severity
- Identifies stakeholders and economic impact
- Determines urgency level (immediate/short-term/long-term)

### Agent 3 — Decision Agent
- Generates 3 domain-specific action recommendations
- Ranks by priority and feasibility
- Provides clear reasoning for top action
- Marks highest priority action for simulation

### Agent 4 — Executor Agent
- Simulates execution of top recommended action
- Shows before/after system state change
- Generates realistic execution log with timestamps
- Calculates estimated impact metrics

### Agent 5 — Risk Assessment Agent
- Calculates risk score (0-100) using weighted formula
- Identifies critical risk factors by domain
- Generates mitigation strategies with priority levels
- Provides early warning indicators for monitoring

---

## How Google Antigravity is Used
Google Antigravity is the CORE orchestrator of the entire system:
- All 5 agents are defined as Antigravity tasks inside a Mission
- Antigravity handles sequential agent execution and task routing
- Mission Control dashboard provides full visibility of agent execution
- All reasoning steps and decision flows are logged in Antigravity
- The entire system was built using Antigravity agentic coding capabilities

---

## Input Types Supported

| Type | Description |
|------|-------------|
| Text | Paste any news article, policy document, or business problem |
| URL | Fetch and analyze any web article automatically |
| PDF | Upload PDF documents for text extraction and analysis |
| Image | Upload images containing text or documents |

---

## Domain Coverage
System automatically detects and provides specialized analysis for:
1. Fuel / Energy
2. Healthcare / Medical
3. Business / Sales
4. Disaster / Emergency
5. Finance / Economy
6. Government / Policy
7. Technology / Digital
8. Education
9. Agriculture
10. Logistics / Supply Chain
11. Real Estate
12. Security / Crime
13. Career / HR
14. General (any domain)

---

## Tech Stack

### Backend
- Runtime: Node.js 20
- Framework: Express.js
- Deployment: Google Cloud Run
- File Processing: Multer, pdf-parse, Cheerio

### Mobile App
- Framework: React Native (Expo SDK 54)
- Features: Dark/Light mode, History, Export Report, Splash Screen, Animations
- Distribution: EAS Build APK

### Web App
- Framework: React.js
- Deployment: Firebase Hosting
- Features: Full pipeline visualization, CSS animations, Dark/Light mode

---

## APIs and Tools Used

| Tool/API | Purpose |
|----------|---------|
| Google Antigravity | Core agent orchestration and execution |
| Google Cloud Run | Backend deployment |
| Firebase Hosting | Web app and APK hosting |
| Multer | File upload handling |
| pdf-parse | PDF text extraction |
| Cheerio | Web scraping for URL fetch |
| EAS Build | Android APK generation |

---

## Key Features
- 5-Agent autonomous pipeline
- Multi-source input (Text, URL, PDF, Image)
- Dynamic domain detection (14 sectors)
- Live action simulation with before/after state
- Risk scoring (0-100) with mitigation strategies
- Impact analysis with ripple effect visualization
- Export report functionality
- Analysis history panel
- Dark/Light mode toggle
- Splash screen with branding
- Fully deployed on Google infrastructure

---

## Assumptions
1. Action execution is simulated — not connected to live external databases
2. Domain detection is keyword-based with 14 categories
3. Risk scoring uses weighted formula (severity + urgency + sectors + keywords)
4. PDF and image uploads limited to 10MB
5. URL fetching works on publicly accessible articles only
6. No sensitive or real personal data is used

---

## Project Structure

news-policy-agent/
├── backend/
│   ├── agents/
│   │   ├── agent0_fetcher.js    (URL fetching)
│   │   ├── agent0_parser.js     (PDF/Image parsing)
│   │   ├── agent1_ingestion.js  (Content cleaning)
│   │   ├── agent2_insight.js    (Insight extraction)
│   │   ├── agent3_decision.js   (Action recommendations)
│   │   ├── agent4_executor.js   (Action simulation)
│   │   └── agent5_risk.js       (Risk assessment)
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── mobile/
│   └── PolicyAgentApp/
│       └── App.js               (React Native app)
└── web/
    └── src/
        └── App.js               (React web app)

---

## Team
Built for Google Antigravity Hackathon
Challenge 1: Autonomous Content-to-Action Agent (Insight → Action System)
