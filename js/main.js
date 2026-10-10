/**
 * MD. AL-AMIN — AI PRODUCT MANAGER & SYSTEMS ENGINEER
 * Interactive Application Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initMobileMenu();
  initPipelineVisualizer();
  initSkillsFilter();
  initProjectsFilter();
  initProjectModals();
  initInteractiveTerminal();
  initContactActions();
  initConsultingActions();
  initStatCounters();
});

/* -------------------------------------------------------------
 * 1. Theme Toggle
 * ----------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('alamin-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('alamin-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  if (!icon) return;
  if (theme === 'light') {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>`;
  } else {
    icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>`;
  }
}

/* -------------------------------------------------------------
 * 2. Navbar Scroll & Active Anchor Spy
 * ----------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.getElementById('mainNavbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scroll spy
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 3. Mobile Navigation Drawer
 * ----------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
  });

  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  });
}

/* -------------------------------------------------------------
 * 4. Interactive Applied AI Pipeline Visualizer
 * ----------------------------------------------------------- */
const pipelineData = {
  ingest: {
    title: 'Stage 01: Multi-Modal Data Ingestion & Hygiene',
    blueprint: 'Ingesting heterogeneous enterprise knowledge: Agricultural research PDFs, crop disease image repositories, weather APIs, and ERP relational databases. Applying chunking heuristics (hierarchical semantic chunking, 512 token chunks with 10% overlap).',
    pmPerspective: 'Defining domain boundaries, metadata schemas, PII redaction rules, and data governance. Validating that training and retrieval datasets directly map to customer pain points rather than generic scrapes.',
    metrics: [
      { label: 'Data Cleaning Latency', val: '< 140ms/doc' },
      { label: 'Chunk Coherence Score', val: '94.2%' },
      { label: 'Ingestion Pipeline', val: 'Automated Airflow' },
      { label: 'Schema Enforced', val: 'JSON Schema + Pydantic' }
    ],
    tools: ['Python', 'Pandas', 'LangChain Ingestion', 'Pydantic', 'OCR Pipeline']
  },
  rag: {
    title: 'Stage 02: Hybrid Vector Retrieval & Re-ranking (RAG)',
    blueprint: 'Dual retrieval pipeline: Dense vector similarity (OpenAI text-embedding-3 / BGE-M3) combined with sparse BM25 lexical keyword matching, fused via Reciprocal Rank Fusion (RRF). Second-stage Cross-Encoder re-ranking to filter top-k chunks.',
    pmPerspective: 'Balancing token context window costs vs answer fidelity. Designing contextual metadata tags (crop cycle, geographic location, user role) so AgroGPT answers specific questions without context dilution.',
    metrics: [
      { label: 'Retrieval Recall @ 5', val: '92.8%' },
      { label: 'Vector Query p95', val: '42ms' },
      { label: 'Context Hallucination Rate', val: '< 1.4%' },
      { label: 'Token Cost Optimization', val: '-48% vs raw prompt' }
    ],
    tools: ['Qdrant / Chroma', 'BGE Re-ranker', 'BM25 Hybrid', 'LlamaIndex', 'Python']
  },
  finetune: {
    title: 'Stage 03: Domain Fine-Tuning (Unsloth & Hugging Face)',
    blueprint: 'Supervised Fine-Tuning (SFT) and Direct Preference Optimization (DPO) of open weights (Llama-3.1-8B / Mistral) using Unsloth 5x faster LoRA/QLoRA kernels. Quantized 4-bit precision to fit within efficient GPU inference budgets.',
    pmPerspective: 'Making build-vs-buy decisions: knowing when prompt engineering is sufficient versus when parameter adaptation is commercially mandatory. Slashing vendor API dependencies while maintaining domain accuracy.',
    metrics: [
      { label: 'Training Throughput', val: '5x with Unsloth' },
      { label: 'Domain Accuracy Gain', val: '+34% over base' },
      { label: 'Inference Memory Footprint', val: '5.8 GB (vLLM)' },
      { label: 'Cost Per 1k Queries', val: '$0.0008' }
    ],
    tools: ['Unsloth AI', 'Hugging Face', 'PyTorch', 'LoRA / QLoRA', 'vLLM']
  },
  guardrails: {
    title: 'Stage 04: Guardrails, Routing & Hallucination Defense',
    blueprint: 'Deterministic classification gateway: Intent routing (agricultural diagnosis vs transaction lookup vs general chit-chat). Strict output schema validation and G-Eval/Ragas automated hallucination evaluation benchmark loops.',
    pmPerspective: 'Product safety, enterprise liability reduction, and brand protection for corporate flagships like ACI PLC and Yamaha. Defining graceful degradation states when model confidence falls below threshold.',
    metrics: [
      { label: 'Guardrail Latency Overhead', val: '< 25ms' },
      { label: 'Toxicity / Jailbreak Defense', val: '99.7%' },
      { label: 'RAGAS Faithfulness Index', val: '0.94' },
      { label: 'Fallback Route Trigger', val: 'Graceful Human/FAQ' }
    ],
    tools: ['NeMo Guardrails', 'Ragas Eval', 'JSON Mode', 'Jira Risk Matrix', 'Notion Specs']
  },
  deploy: {
    title: 'Stage 05: Multi-Surface Enterprise UI & Telemetry',
    blueprint: 'Streaming Web (Next.js / React) and Mobile (Flutter) interfaces connected via high-throughput FastAPI/WebSocket microservices. Real-time telemetry monitoring token usage, sentiment, latency, and business conversions.',
    pmPerspective: 'Delivering end-user delight: sub-second time-to-first-token (TTFT), voice-prompt integration for farmers, and closed-loop feedback loops for continuous product learning.',
    metrics: [
      { label: 'Time to First Token (TTFT)', val: '380ms' },
      { label: 'User Retention (D30)', val: '64%' },
      { label: 'Deployment Uptime', val: '99.9%' },
      { label: 'Production Surfaces', val: 'Web, Flutter, ERP' }
    ],
    tools: ['Next.js', 'React', 'Flutter', 'FastAPI', 'Power BI', 'Google Cloud']
  }
};

function initPipelineVisualizer() {
  const nodes = document.querySelectorAll('.pipeline-node');
  const titleEl = document.getElementById('pipelineStageTitle');
  const blueprintEl = document.getElementById('pipelineBlueprint');
  const pmRoleEl = document.getElementById('pipelinePMRole');
  const metricsEl = document.getElementById('pipelineMetricsGrid');
  const toolsEl = document.getElementById('pipelineToolsList');

  if (!nodes.length || !titleEl) return;

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const stageKey = node.getAttribute('data-stage');
      const data = pipelineData[stageKey];
      if (!data) return;

      nodes.forEach((n) => n.classList.remove('active'));
      node.classList.add('active');

      titleEl.textContent = data.title;
      blueprintEl.textContent = data.blueprint;
      pmRoleEl.textContent = data.pmPerspective;

      // Update metrics
      if (metricsEl) {
        metricsEl.innerHTML = data.metrics
          .map(
            (m) => `
          <div class="metric-pill-box">
            <div class="metric-pill-label">${m.label}</div>
            <div class="metric-pill-val">${m.val}</div>
          </div>
        `
          )
          .join('');
      }

      // Update tools
      if (toolsEl) {
        toolsEl.innerHTML = data.tools
          .map((t) => `<span class="micro-badge">${t}</span>`)
          .join('');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 5. Skills Matrix Filtering
 * ----------------------------------------------------------- */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const cards = document.querySelectorAll('.skill-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      cards.forEach((card) => {
        const cardCats = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCats.includes(category)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 6. Projects Filtering
 * ----------------------------------------------------------- */
function initProjectsFilter() {
  const tabs = document.querySelectorAll('.project-tab-btn');
  const cards = document.querySelectorAll('.project-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach((card) => {
        const cardType = card.getAttribute('data-type') || '';
        if (filter === 'all' || cardType === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 7. Project Case Study Modal Deep Dive
 * ----------------------------------------------------------- */
const projectModalData = {
  agrogpt: {
    title: 'ACI AgroGPT: Enterprise Agricultural AI Assistant',
    badge: 'Enterprise AI | Production',
    problem: 'Millions of Bangladeshi farmers lack timely, personalized agricultural expertise regarding pest infestation, crop disease treatment, fertilizer schedules, and market pricing. Conventional call-center advice is slow, expensive, and unscalable.',
    solution: 'Designed and deployed an intelligent conversational AI assistant tailored for Bangladesh agriculture. Features hybrid RAG over proprietary agronomist literature, visual crop symptom diagnosis, localized dialect processing, and real-time weather integration.',
    myRole: 'Lead Product Manager & AI Solutions Architect. Formulated the PRD, defined the vector retrieval strategy, evaluated hallucination benchmarks, and prototyped core conversational loops with modern AI tooling before scaling across the development squad.',
    architecture: 'Multi-stage RAG with BM25 + dense vector hybrid search, domain-adapted LLM, localized weather API integrations, and low-latency voice-to-text pipeline.',
    impact: 'Accelerated idea-to-working validation by 80%. Successfully deployed for ACI PLC agricultural division, serving crop disease queries with over 94% domain accuracy.'
  },
  yamaha: {
    title: 'Yamaha (ACI Motors) Biometric Face Recognition System',
    badge: 'Computer Vision | Enterprise Deployment',
    problem: 'Manual customer verification, service records, and unauthorized entry management in motorcycle showrooms and servicing centers led to long customer wait times and fragmented CRM records.',
    solution: 'A real-time edge facial recognition intelligence system that detects, matches, and links customer profiles to CRM records the moment they step into the service center or showroom.',
    myRole: 'Product & Project Manager. Spearheaded requirement engineering, system analysis, edge hardware selection, and sprint governance. Conducted latency and accuracy trade-off analysis between local edge models and cloud processing.',
    architecture: 'RetinaFace / MTCNN facial detection + FaceNet embeddings, vector distance indexing, integrated with enterprise CRM and showroom dashboard.',
    impact: 'Cut showroom check-in latency from 3 minutes to under 2 seconds; significantly improved customer engagement data tracking across ACI Motors branches.'
  },
  diaai: {
    title: 'DiaAI: Predictive Health & Diabetic Patient Regimen',
    badge: 'Applied AI | Healthcare',
    problem: 'Diabetic patients struggle with daily meal compliance, unpredictable blood sugar spikes, and complex glycemic index calculations from diverse ethnic food items.',
    solution: 'A patient companion mobile app that computes personalized postprandial glucose impact, offers adaptive dietary suggestions, and tracks continuous health metrics.',
    myRole: 'AI Product Manager. Gathered clinical practitioner requirements, designed patient personas, architected the predictive scoring pipeline, and structured sprint backlogs.',
    architecture: 'Multi-modal image analysis for meals, machine learning glycemic regression models, conversational patient nudging agent.',
    impact: 'Delivered an interactive prototype validated with medical professionals; demonstrated an 85% predictive alignment with empirical glucose charts.'
  },
  nutrical: {
    title: 'AI Nutrical: Instant Visual Nutrition & Macro Breakdown',
    badge: 'Computer Vision + LLM',
    problem: 'Manual calorie counting apps require tedious manual ingredient search, resulting in 70% user churn within 14 days of app installation.',
    solution: 'Point-and-shoot camera app that detects dish components, estimates portion volumes, and generates comprehensive macronutrient summaries in under 3 seconds.',
    myRole: 'Technical PM & POC Creator. Built the initial end-to-end working proof of concept independently using computer vision and LLM vision endpoints to validate market feasibility before sprint allocation.',
    architecture: 'Object segmentation, food classification neural networks, prompt-engineered visual reasoning pipeline, high-speed Redis caching.',
    impact: 'Proved zero-to-POC concept in 72 hours, reducing feature risk and validating viral consumer appetite.'
  },
  weather: {
    title: 'Weather Impact on Business: 6-Month Predictive Forecast',
    badge: 'Predictive AI | Enterprise Analytics',
    problem: 'Weather anomalies, unseasonal monsoons, and droughts heavily disrupt supply chains, agricultural sales, and retail inventory forecasting with millions at stake.',
    solution: 'An enterprise predictive intelligence dashboard that correlates 6-month meteorological forecasts with historical SKU sales and supply chain logistics.',
    myRole: 'Product Manager & Data Strategist. Led requirement workshops with business heads, created prioritization matrices (PPC™), and guided the predictive ML modeling pipeline.',
    architecture: 'Time-series forecasting (Prophet / LSTM / XGBoost), meteorological satellite feeds, enterprise ERP database integration via Power BI.',
    impact: 'Enabled corporate planners to hedge inventory risks 60 days ahead of seasonal weather shocks, safeguarding margin targets.'
  },
  lenden: {
    title: 'Lenden.store: Cloud ERP & POS Platform for SMEs',
    badge: 'SaaS / ERP | B2B Product',
    problem: 'Small and medium retail businesses in emerging markets lack affordable, unified software for real-time inventory, multi-store POS, billing, and financial reporting.',
    solution: 'A multi-tenant cloud ERP system featuring instant barcode checkout, inventory reorder alerts, automated VAT invoices, and role-based access control.',
    myRole: 'Product Manager & System Analyst. Defined complete SDLC roadmap, database schemas, sprint planning in Jira, and merchant onboarding workflows.',
    architecture: 'Laravel backend, React frontend, MySQL relational cluster, RESTful APIs, high-availability caching, thermal printer hardware drivers.',
    impact: 'Shipped to production across hundreds of SME retail outlets; managed sprint delivery on time and within scope.'
  },
  v2v: {
    title: 'Hybrid Vehicle-to-Vehicle (V2V) Communication System',
    badge: 'Hardware IoT + Research + Web App',
    problem: 'High-speed highway accidents occur due to delayed brake reaction times and blind-spot obstructions where cloud-dependent cellular networks suffer from packet latency.',
    solution: 'A hybrid V2V communication protocol combining local RF/transceiver telemetry with GPS location tracking and a live web telemetry monitoring application.',
    myRole: 'Lead Author & Prototype Systems Engineer. Designed the embedded hardware circuit, wrote low-level C++ firmware, built the real-time tracking web app, and authored the academic paper.',
    architecture: 'Embedded microcontrollers (C++), RF transceivers, GPS modules, Node.js WebSocket telemetry server, and live interactive map interface.',
    impact: 'Successfully published research with a physical working hardware prototype, comprehensive telemetry dataset, and live web interface.'
  },
  ispbilling: {
    title: 'ISP Billing & Automated Bandwidth Management Platform',
    badge: 'Enterprise SaaS | Telecom & Networks',
    problem: 'Regional Internet Service Providers (ISPs) faced revenue leakage due to manual invoice tracking, delayed payment reconciliation, and lack of dynamic bandwidth throttling on overdue accounts.',
    solution: 'An end-to-end cloud billing and subscriber management platform integrating MikroTik RADIUS routers with online payment gateways, automated SMS notifications, and bandwidth provisioning.',
    myRole: 'Product & System Analyst. Engineered the billing workflow, database transaction schemas, MikroTik API integration pipelines, and merchant subscription dashboards.',
    architecture: 'Laravel PHP backend, React frontend, MySQL transaction isolation, Redis queue workers, MikroTik RouterOS API protocols.',
    impact: 'Automated 10,000+ monthly broadband subscription renewals, reducing billing reconciliation overhead by 90% and eliminating manual bandwidth disconnection delays.'
  },
  musicmind: {
    title: 'AI Music Mind: Instant Generative Audio Suite',
    badge: 'GenAI & Audio Intelligence',
    problem: 'Content creators, indie game developers, and video editors struggle with expensive royalty licensing and lack technical expertise to synthesize tailored background tracks.',
    solution: 'A generative AI audio platform producing custom, genre-blended instrumental arrangements in 3 simple clicks based on mood, tempo, and scene parameters.',
    myRole: 'Technical Product Manager & Prototyper. Designed the prompt-to-audio conditioning pipeline, created consumer UX workflows, and integrated low-latency audio generation APIs.',
    architecture: 'Next.js, Python FastAPI, MusicGen open weights, audio streaming pipeline, WebSocket generation indicators.',
    impact: 'Delivered functional zero-to-one prototype generating high-fidelity 30-second audio stems under 12 seconds.'
  }
};

function initProjectModals() {
  const modalBackdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('closeModalBtn');
  const triggerBtns = document.querySelectorAll('.btn-open-modal');

  if (!modalBackdrop) return;

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const projId = btn.getAttribute('data-project');
      const data = projectModalData[projId];
      if (!data) return;

      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalBadge').textContent = data.badge;
      document.getElementById('modalProblem').textContent = data.problem;
      document.getElementById('modalSolution').textContent = data.solution;
      document.getElementById('modalRole').textContent = data.myRole;
      document.getElementById('modalArchitecture').textContent = data.architecture;
      document.getElementById('modalImpact').textContent = data.impact;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });
}

/* -------------------------------------------------------------
 * 8. Interactive Developer Terminal / POC Simulator
 * ----------------------------------------------------------- */
function initInteractiveTerminal() {
  const inputEl = document.getElementById('terminalInput');
  const outputEl = document.getElementById('terminalOutput');
  const chipBtns = document.querySelectorAll('.terminal-chip');

  if (!inputEl || !outputEl) return;

  const runCommand = (cmd) => {
    const rawCmd = cmd.trim();
    if (!rawCmd) return;

    appendTerminalLine(`<span class="terminal-prompt-symbol">alamin@ai-pm:~$</span> ${escapeHTML(rawCmd)}`, 'cmd-line');

    const lower = rawCmd.toLowerCase();

    if (lower === 'help') {
      appendTerminalLine(`
Available Commands:
  - <span style="color:#38bdf8">poc</span> [agro|vision|dia]  : Simulate how Al-Amin creates rapid POCs
  - <span style="color:#38bdf8">rag-eval</span>               : View RAG retrieval & hallucination metrics
  - <span style="color:#38bdf8">diff</span>                   : Compare Traditional PM vs Engineering PM
  - <span style="color:#38bdf8">skills</span>                 : Print core technical & product toolchain
  - <span style="color:#38bdf8">whoami</span>                 : Executive summary of Md. Al-Amin
  - <span style="color:#38bdf8">contact</span>                : Display direct email and phone channels
  - <span style="color:#38bdf8">clear</span>                  : Clear the terminal console
      `);
    } else if (lower.startsWith('poc')) {
      appendTerminalLine(`
<span style="color:#10b981">⚡ RAPID PROTOTYPING PROTOCOL INITIATED:</span>
[1/4] Discovery: Parsing domain requirements into executable user stories...
[2/4] Tooling: Bootstrapping environment via modern AI agents (Claude Code, TRAE, Antigravity)
[3/4] Vector Store: Ingested domain knowledge into ChromaDB (BGE embeddings)
[4/4] LLM Orchestration: Connected to fine-tuned LoRA checkpoint via FastAPI
<span style="color:#c084fc">✔ WORKING POC GENERATED IN < 48 HOURS:</span> Ready for stakeholder testing!
      `);
    } else if (lower.includes('rag')) {
      appendTerminalLine(`
<span style="color:#38bdf8">=== RAG EVALUATION BENCHMARK (ACI AgroGPT Pipeline) ===</span>
- Context Precision: <span style="color:#10b981">94.8%</span>
- Context Recall: <span style="color:#10b981">92.3%</span>
- Faithfulness (Anti-Hallucination): <span style="color:#10b981">0.96 / 1.0</span>
- Reranker: Cohere / BGE-M3 cross-encoder
- Latency (p95): <span style="color:#f59e0b">280ms end-to-end</span>
- PM Insight: Hybrid search yields 28% higher farmer query accuracy over dense-only vectors.
      `);
    } else if (lower.includes('diff') || lower.includes('compare')) {
      appendTerminalLine(`
<span style="color:#f59e0b">=== THE DIFFERENCE: TRADITIONAL PM vs AL-AMIN ===</span>
• Traditional PM: Writes 30-page PRD -> Waits 3 weeks -> Discovers LLM context window limits too late.
• Md. Al-Amin: Builds working POC first -> Calculates token budgets & latency -> Sits with ML team to fine-tune model -> Ships product.
      `);
    } else if (lower.includes('skills')) {
      appendTerminalLine(`
<span style="color:#a855f7">CORE ARSENAL:</span>
- AI/ML: Python, RAG, Unsloth, Hugging Face, LLM Fine-Tuning, AI Studio, PyTorch
- Product: Jira, Scrum Master, Risk Management, PAC™, PPC™, PMP Framework, Notion
- Modern Dev: Antigravity, Claude Code, Codex, Bolt, TRAE, NotebookLM
- Engineering: Next.js, React, C++, PHP/Laravel, Flutter, MySQL, REST APIs
      `);
    } else if (lower === 'whoami') {
      appendTerminalLine(`
Md. Al-Amin — AI Project & Product Manager at ACI PLC.
CSE Graduate (Washington Accord) | Product School Certified (PAC™, PPC™)
Delivered 10+ AI, SaaS, and ERP products. Bridging high-level strategy with deep ML code.
      `);
    } else if (lower === 'contact') {
      appendTerminalLine(`
Direct Channels:
- Email: <a href="mailto:alamin01.corporate@gmail.com" style="color:#38bdf8;text-decoration:underline;">alamin01.corporate@gmail.com</a>
- Phone: +880 1888 563996
- LinkedIn: linkedin.com/in/md-al-amin-9447253a9
- GitHub: github.com/Alamin-dev01
- Location: Nikunja-2, Dhaka, Bangladesh
      `);
    } else if (lower === 'clear') {
      outputEl.innerHTML = '';
      return;
    } else {
      appendTerminalLine(`Command not recognized: "${escapeHTML(rawCmd)}". Type <span style="color:#38bdf8">help</span> to view commands.`);
    }

    outputEl.scrollTop = outputEl.scrollHeight;
  };

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value;
      inputEl.value = '';
      runCommand(val);
    }
  });

  chipBtns.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        runCommand(cmd);
      }
    });
  });

  function appendTerminalLine(content, extraClass = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${extraClass}`;
    line.innerHTML = content;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, (tag) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }
}

/* -------------------------------------------------------------
 * 9. Contact Actions & Toast Alerts
 * ----------------------------------------------------------- */
function initContactActions() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const form = document.getElementById('portfolioContactForm');
  const toast = document.getElementById('toastNotice');

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('alamin01.corporate@gmail.com').then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('alamin01.corporate@gmail.com');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('sendMessageSubmitBtn');
      const name = document.getElementById('contactName')?.value?.trim() || '';
      const email = document.getElementById('contactEmail')?.value?.trim() || '';
      const message = document.getElementById('contactMessage')?.value?.trim() || '';
      const subjectInput = document.getElementById('formSubmitSubject');
      const customSubject = subjectInput?.value || `New AI Portfolio Inquiry from ${name}`;

      if (!name || !email || !message) {
        setFormStatus('Please complete all required fields before sending.', 'error');
        showToast('Please fill out all fields.');
        return;
      }

      // UI Loading state
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.75';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="animation: spin 0.8s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"></circle>
          </svg>
          Sending to Al-Amin...
        `;
      }

      setFormStatus('Transmitting your message directly to Al-Amin...', 'info');

      try {
        const response = await fetch('https://formsubmit.co/ajax/alamin01.corporate@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: customSubject,
            _template: 'table',
            _captcha: 'false'
          })
        });

        const data = await response.json();

        if (response.ok && (data.success === 'true' || data.success === true)) {
          setFormStatus('✓ Thank you! Your message was delivered directly to alamin01.corporate@gmail.com. Al-Amin will reply to you within 24 hours.', 'success');
          showToast('Message sent successfully!');
          form.reset();
        } else if (data.message && data.message.includes('Activation')) {
          setFormStatus('✓ Message queued! An activation email was sent to alamin01.corporate@gmail.com. Please confirm the link in your inbox.', 'success');
          showToast('Inquiry queued! Check inbox to activate.');
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        console.warn('FormSubmit endpoint notice:', err);
        // Fallback: Open direct mailto client
        const mailSubject = encodeURIComponent(customSubject);
        const mailBody = encodeURIComponent(`Hi Al-Amin,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        window.location.href = `mailto:alamin01.corporate@gmail.com?subject=${mailSubject}&body=${mailBody}`;
        setFormStatus('Connecting directly to your email application to send to alamin01.corporate@gmail.com...', 'info');
        showToast('Opening email client as backup...');
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
          submitBtn.style.cursor = 'pointer';
          submitBtn.innerHTML = `
            Send Message Directly
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          `;
        }
      }
    });
  }
}

function setFormStatus(message, type) {
  const statusEl = document.getElementById('formStatusMsg');
  if (!statusEl) return;
  statusEl.className = `form-status-msg ${type}`;
  statusEl.textContent = message;
  statusEl.style.display = 'block';
}

function showToast(msg) {
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');
  if (!toast) return;

  if (toastText) toastText.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* -------------------------------------------------------------
 * 10. Animated Stat Counters
 * ----------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          animateCounter(el, target, suffix);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => observer.observe(el));
}

function animateCounter(el, target, suffix) {
  let current = 0;
  const duration = 1500;
  const stepTime = 30;
  const increment = target / (duration / stepTime);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = `${target}${suffix}`;
      clearInterval(timer);
    } else {
      el.textContent = `${Math.floor(current)}${suffix}`;
    }
  }, stepTime);
}

/* -------------------------------------------------------------
 * 11. 1-on-1 AI Consulting Session Handlers
 * ----------------------------------------------------------- */
function initConsultingActions() {
  const consultButtons = document.querySelectorAll('.consulting-btn[data-consult]');
  const messageInput = document.getElementById('contactMessage');
  const nameInput = document.getElementById('contactName');

  const sessionTemplates = {
    feasibility: "Hi Al-Amin, I'd like to book a 30-Min AI Feasibility & POC Audit session. We are exploring an applied AI product concept and want to evaluate model feasibility, unit economics, and rapid POC scope.",
    architecture: "Hi Al-Amin, I'd like to book a 60-Min 1:1 RAG & Model Architecture Teardown session. We want to deep-dive into our retrieval pipeline, latency budgeting, fine-tuning strategy, and production guardrails.",
    mentorship: "Hi Al-Amin, I'm inquiring about your Personalized AI PM Mentorship / Advisory Retainer. We would love to discuss ongoing advisory support for our product roadmap and ML sprint governance."
  };

  consultButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const type = btn.getAttribute('data-consult');
      if (messageInput && sessionTemplates[type]) {
        messageInput.value = sessionTemplates[type];
      }
      const subjectInput = document.getElementById('formSubmitSubject');
      if (subjectInput) {
        if (type === 'feasibility') subjectInput.value = "Consulting Request: 30-Min AI Feasibility Audit";
        if (type === 'architecture') subjectInput.value = "Consulting Request: 60-Min RAG & Architecture Teardown";
        if (type === 'mentorship') subjectInput.value = "Consulting Request: AI PM Mentorship / Advisory Retainer";
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  });
}

