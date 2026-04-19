/* ================================================================
   ICT MODERN ERA v3 — script.js
   ════════════════════════════════════════════════════════════════
   ARCHITECTURE:
   ├── CONFIG        — Data layer: all content + nav defined here
   ├── Renderer      — Renders all sections from config (HTML factory)
   ├── Loader        — Boot sequence + GSAP init
   ├── CursorCtrl    — Adaptive custom cursor
   ├── ScrollCtrl    — Progress bar + section tracking
   ├── AnimCtrl      — GSAP timeline orchestration per section
   ├── NavCtrl       — Sidebar, mobile nav, dock (all rendered here)
   ├── AccordionCtrl — Smooth accordion system
   ├── TiltCtrl      — Spring-physics card tilt
   ├── MagneticCtrl  — Magnetic button pull
   ├── ParticleCtrl  — Hero particle system
   ├── CounterCtrl   — Animated number counters
   ├── GameCtrl      — Complete quiz mini-game engine
   ├── ConfettiCtrl  — Canvas confetti system
   └── Utils         — Shared helpers
   ================================================================ */

'use strict';

/* ════════════════════════════════════════════════════════════════
   UTILS
════════════════════════════════════════════════════════════════ */
const Utils = {
  $:   (sel, ctx = document) => ctx.querySelector(sel),
  $$:  (sel, ctx = document) => [...ctx.querySelectorAll(sel)],
  raf: requestAnimationFrame.bind(window),
  lerp:  (a, b, t) => a + (b - a) * t,
  clamp: (v, lo, hi) => Math.min(Math.max(v, lo), hi),
  shuffle: arr => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  isMobile: () => window.innerWidth < 1024,
  isTouch:  () => window.matchMedia('(hover: none)').matches,
  prefersRM: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  debounce: (fn, ms = 120) => {
    let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  },
  throttle: (fn, ms = 60) => {
    let last = 0; return (...a) => { const n = Date.now(); if (n - last >= ms) { last = n; fn(...a); } };
  }
};

/* ════════════════════════════════════════════════════════════════
   CONFIG — Single source of truth
   All content, nav labels, game questions defined here.
   Change this object to update the entire site.
════════════════════════════════════════════════════════════════ */
const CONFIG = {

  /* ── NAV ITEMS ───────────────────────────────────────────────── */
  nav: [
    { id: 'intro',      idx: '00', label: 'Introduction',         dock: { icon: 'info',   label: 'Intro'  } },
    { id: 'comm',       idx: '01', label: 'Communication',        dock: null },
    { id: 'networking', idx: '02', label: 'Networking',           dock: null },
    { id: 'cloud',      idx: '03', label: 'Cloud Computing',      dock: { icon: 'cloud',  label: 'Cloud'  } },
    { id: 'ai',         idx: '04', label: 'Artificial Intel.',    dock: { icon: 'star',   label: 'AI'     } },
    { id: 'iot',        idx: '05', label: 'Internet of Things',   dock: null },
    { id: 'multimedia', idx: '06', label: 'Multimedia',           dock: null },
    { id: 'cyber',      idx: '07', label: 'Cybersecurity',        dock: { icon: 'shield', label: 'Security'} },
    { id: 'bigdata',    idx: '08', label: 'Big Data',             dock: null },
    { id: 'game',       idx: '★',  label: 'ICT Challenge',        dock: { icon: 'game',   label: 'Play'   }, game: true },
  ],

  /* ── HERO STATS ─────────────────────────────────────────────── */
  heroStats: [
    { num: '175 ZB', label: 'Global datasphere by 2025 (IDC)',  tall: true, bar: '87%' },
    { num: '5.4B',   label: 'Internet users worldwide' },
    { num: '29B',    label: 'IoT devices est. 2030' },
    { num: '$4.5T',  label: 'Global ICT spending · 2024', wide: true, spark: true },
  ],

  /* ── SECTIONS ────────────────────────────────────────────────── */
  sections: [
    /* 01 · COMMUNICATION */
    {
      id: 'comm', idx: '01', alt: false,
      title: 'Communication Technologies',
      sub: 'The arteries of the digital world',
      lead: 'Modern communication technologies have transcended geographical constraints, enabling real-time exchange of voice, data, and media across planetary distances with imperceptible latency.',
      cards: [
        { glyph: '📡', title: '5G Networks', body: 'Fifth-generation cellular delivers peak speeds up to 20 Gbps with sub-1 ms latency — enabling autonomous vehicles, remote surgery, and dense IoT deployments at scale.', tag: 'Smart factory automation · BMW Leipzig' },
        { glyph: '🛰️', title: 'Satellite Internet', body: 'LEO constellations (Starlink, OneWeb) provide broadband at 20–40 ms latency, fundamentally democratizing connectivity for underserved regions and remote operations globally.', tag: 'Ukraine conflict communications · 2022–present' },
        { glyph: '💬', title: 'Unified Communications', body: 'UC platforms converge VoIP, video, IM, and file sharing into single ecosystems, compressing communication overhead for globally distributed teams.', tag: 'Microsoft Teams · Zoom · Cisco Webex' },
      ],
      accordion: { label: 'Deep Dive: Protocols Powering Modern Communication', content: '<p><strong>WebRTC</strong> enables peer-to-peer audio/video directly in browsers using SRTP encryption and ICE/STUN/TURN for NAT traversal — no plugins required.</p><p><strong>QUIC / HTTP/3</strong> replaces TCP+TLS with UDP-based transport that reduces connection establishment to a single round trip, cutting latency by up to 30%.</p><p><strong>SIP</strong> remains the backbone of VoIP, defining session initiation, maintenance, and termination across IP networks at planetary scale.</p>' },
    },

    /* 02 · NETWORKING */
    {
      id: 'networking', idx: '02', alt: true,
      title: 'Networking Technologies',
      sub: 'The infrastructure beneath everything',
      lead: 'Networking has evolved from static topologies into programmable, software-defined fabrics capable of adapting to workload demands in real time — reshaping how data moves globally.',
      extra: { type: 'stats', items: [
        { n: '400 Gbps', l: 'Backbone link speeds' },
        { n: 'SDN',      l: 'Software-Defined Networking' },
        { n: 'MPLS',     l: 'Label Switching' },
        { n: 'BGP',      l: 'Internet routing' },
      ]},
      cards: [
        { glyph: '🔀', title: 'Software-Defined Networking', body: 'SDN decouples control plane from data plane, centralizing network logic and enabling programmable dynamic configuration without touching physical hardware.', tag: 'Google B4 WAN · Meta backbone networks' },
        { glyph: '🌐', title: 'Edge Networking', body: 'Edge nodes process data at the network periphery, minimizing round-trip latency for AR/VR, autonomous systems, and real-time analytics at scale.', tag: 'AWS Outposts · Cloudflare Workers' },
        { glyph: '🔒', title: 'Zero Trust Architecture', body: 'ZTA eliminates implicit network trust — every user, device, and request is continuously verified, limiting lateral movement and reducing breach blast radius.', tag: 'Google BeyondCorp enterprise deployment' },
      ],
      accordion: { label: 'Deep Dive: IPv6 Transition & the Address Space Crisis', content: '<p>IPv4\'s 32-bit space yielded ~4.3 billion addresses — exhausted by IANA in 2011. IPv6\'s 128-bit addressing allows 3.4 × 10³⁸ unique addresses — effectively infinite.</p><p>Transition mechanisms including dual-stack, tunneling (6in4), and NAT64 enable coexistence. As of 2024, global IPv6 adoption exceeds 45%, driven by mobile operators in India, the US, and Germany.</p>' },
    },

    /* 03 · CLOUD */
    {
      id: 'cloud', idx: '03', alt: false,
      title: 'Cloud Computing',
      sub: 'Infinite scale on demand',
      lead: 'Cloud computing redefined the economics of IT infrastructure. Organizations access virtually unlimited compute, storage, and specialized services at variable cost — eliminating capital expenditure burdens entirely.',
      extra: { type: 'tiers', items: [
        { badge: 'SaaS', cls: 'tier-saas', name: 'Software as a Service', desc: 'Apps delivered over the web — Gmail, Salesforce, Figma' },
        { badge: 'PaaS', cls: 'tier-paas', name: 'Platform as a Service',  desc: 'Dev environments & runtimes — Heroku, Google App Engine' },
        { badge: 'IaaS', cls: 'tier-iaas', name: 'Infrastructure as a Service', desc: 'Raw compute/storage/network — AWS EC2, Azure VMs' },
        { badge: 'FaaS', cls: 'tier-faas', name: 'Function as a Service',  desc: 'Serverless execution — AWS Lambda, Cloudflare Workers' },
      ]},
      cards: [
        { glyph: '🏗️', title: 'Hyperscale Infrastructure', body: 'AWS, Azure, and GCP operate hyperscale data centers consuming hundreds of megawatts, hosting millions of servers with N+1 redundancy and geographic distribution.', tag: 'Netflix streams 700 TB/s via AWS' },
        { glyph: '⚡', title: 'Serverless Computing', body: 'Serverless abstracts infrastructure entirely. Billing is per-invocation, enabling extreme cost efficiency — Coca-Cola vending machines run on AWS Lambda.', tag: 'Coca-Cola · Airbnb · iRobot' },
        { glyph: '🐳', title: 'Containerization & K8s', body: 'Docker packages apps with dependencies into portable images. Kubernetes orchestrates thousands of containers with self-healing and auto-scaling across clusters.', tag: 'Spotify · Airbnb · Uber at scale' },
      ],
      accordion: { label: 'Deep Dive: Multi-Cloud Strategy & FinOps', content: '<p>Enterprise ICT increasingly favors multi-cloud to avoid provider dependency. Terraform (IaC) and Kubernetes enable workload portability across AWS, Azure, and GCP.</p><p>Hidden costs include data egress fees (up to $0.09/GB), operational complexity, and skills fragmentation. A disciplined FinOps practice — treating cloud spend as a first-class engineering concern — is now standard in mature organizations.</p>' },
    },

    /* 04 · AI */
    {
      id: 'ai', idx: '04', alt: true,
      title: 'Artificial Intelligence',
      sub: 'Machines that learn, reason, and create',
      lead: 'AI has crossed from narrow automation into general cognitive assistance. LLMs, computer vision, and reinforcement learning agents now outperform humans on a growing number of well-defined tasks — reshaping every sector they touch.',
      extra: { type: 'timeline', items: [
        { title: 'Machine Learning', body: 'Algorithms learn patterns from data without explicit rules — supervised, unsupervised, and reinforcement learning as three foundational paradigms.' },
        { title: 'Deep Learning & Neural Nets', body: 'CNNs, RNNs, and Transformers achieve state-of-the-art in vision, speech, and language through hierarchical feature extraction across billions of parameters.' },
        { title: 'Generative AI & LLMs', body: 'Transformer-based LLMs (GPT-4, Claude, Gemini) generate human-quality text, code, images, and audio via next-token prediction over trillion-parameter models.' },
        { title: 'AI Agents & Agentic Systems', body: 'Beyond single inference — agentic systems plan multi-step tasks, call external APIs, and maintain memory, enabling autonomous execution of complex workflows.' },
      ]},
      cards: [
        { glyph: '🏥', title: 'AI in Healthcare', body: 'AlphaFold predicted 200M+ protein structures. AI diagnostic tools detect diabetic retinopathy with 94% accuracy — transforming drug discovery from decades to months.', tag: 'Google Health · PathAI · Tempus' },
        { glyph: '🚗', title: 'Autonomous Systems', body: 'Self-driving vehicles combine LiDAR, camera fusion, and real-time inference — processing gigabytes of sensor data per second to navigate complex environments.', tag: 'Waymo One · Phoenix AZ commercial service' },
        { glyph: '💻', title: 'AI-Assisted Development', body: 'Code generation models suggest context-aware completions, refactors, and docs. Studies show 55% faster task completion for developers using AI pair-programming.', tag: 'GitHub Copilot · 1.3M+ enterprise users' },
      ],
      accordion: { label: 'Deep Dive: AI Ethics, Bias & Governance Frameworks', content: '<p>AI systems trained on biased data perpetuate inequities. Cases include COMPAS recidivism scoring, Amazon\'s scrapped hiring algorithm, and facial recognition failures disproportionately affecting darker skin tones.</p><p>The EU AI Act (2024) classifies AI by risk tier, mandating transparency for high-risk applications. NIST, IEEE, and Anthropic\'s Constitutional AI approach provide scaffolding for aligned systems.</p>' },
    },

    /* 05 · IoT */
    {
      id: 'iot', idx: '05', alt: false,
      title: 'Internet of Things',
      sub: 'The physical world, made addressable',
      lead: 'IoT extends internet connectivity to physical objects — from industrial sensors to consumer wearables — creating a vast, continuously updating data layer bridging digital and physical reality.',
      cards: [
        { glyph: '🏭', title: 'Industrial IoT (IIoT)', body: 'Factories deploy thousands of sensors on production lines, feeding telemetry to predictive maintenance algorithms that detect equipment anomalies before failure occurs.', tag: 'Siemens MindSphere · GE Predix' },
        { glyph: '🌆', title: 'Smart Cities', body: 'Urban IoT networks manage traffic, waste routing, air quality, and emergency dispatch using sensor networks and AI analytics at metropolitan scale.', tag: 'Singapore Smart Nation · Amsterdam Smart City' },
        { glyph: '⌚', title: 'Health Wearables', body: 'Continuous monitors track ECG, blood oxygen, glucose, and sleep architecture — feeding personalized health models that flag irregularities proactively for clinical review.', tag: 'Apple Watch AFib detection (FDA cleared)' },
      ],
      extra: { type: 'table', headers: ['Protocol','Range','Power','Best For'], rows: [
        ['Bluetooth LE', '~100m', 'Ultra-low', 'Wearables, healthcare'],
        ['Zigbee', '~100m mesh', 'Very low', 'Smart home, automation'],
        ['LoRaWAN', '~15 km', 'Extremely low', 'Agriculture, city sensors'],
        ['NB-IoT', '~10 km', 'Very low', 'Utility metering, assets'],
        ['Wi-Fi 6', '~300m', 'Medium', 'High-bandwidth IoT, cameras'],
      ]},
      accordion: { label: 'Deep Dive: IoT Security Vulnerabilities & Mitigations', content: '<p>IoT devices frequently ship with default credentials and no update mechanism — forming attack surfaces for botnets like Mirai, which launched a 1.2 Tbps DDoS attack in 2016.</p><p>Mitigations include hardware security modules (HSMs), TLS 1.3 transport encryption, certificate-based device auth, and OTA update infrastructure. NIST IR 8259 provides baseline requirements for manufacturers.</p>' },
    },

    /* 06 · MULTIMEDIA */
    {
      id: 'multimedia', idx: '06', alt: true,
      title: 'Multimedia Technologies',
      sub: 'Encoding, transmitting, experiencing media',
      lead: 'Multimedia technologies encompass codecs, streaming protocols, rendering engines, and immersive computing platforms that define how humans consume and create digital media.',
      cards: [
        { glyph: '🎬', title: 'Adaptive Bitrate Streaming', body: 'ABR protocols (HLS, DASH) dynamically adjust video quality based on bandwidth, enabling seamless 4K streaming even on variable connections without buffering.', tag: 'Netflix Adaptive Encoding · YouTube VP9' },
        { glyph: '🥽', title: 'Extended Reality (XR)', body: 'VR, AR, and MR converge under XR. Systems require 90+ fps with sub-20ms motion-to-photon latency to prevent vestibular discomfort in fully immersive environments.', tag: 'Apple Vision Pro · Meta Quest 3' },
        { glyph: '🎨', title: 'AI-Generated Media', body: 'Diffusion models and multimodal LLMs generate photorealistic images, synthetic video, voice clones, and music — raising profound questions about authenticity and provenance.', tag: 'Sora (OpenAI) · Stable Diffusion · ElevenLabs' },
      ],
      accordion: { label: 'Deep Dive: Codec Wars — AV1, H.265 & the Future', content: '<p>AV1 achieves 30–50% better compression than H.264 at equivalent quality — critical for reducing global internet bandwidth. Its royalty-free model accelerated adoption by YouTube, Netflix, and Twitch.</p><p>HEVC/H.265 offers comparable efficiency but has fragmented royalty licensing. The emerging VVC (H.266) standard promises another 50% gain for 8K content distribution.</p>' },
    },

    /* 07 · CYBERSECURITY */
    {
      id: 'cyber', idx: '07', alt: false,
      title: 'Cybersecurity',
      sub: 'Defending the digital frontier',
      lead: 'Cybersecurity has become a matter of national security, economic stability, and individual privacy. The threat landscape evolves faster than defensive postures — demanding continuous adaptation, automation, and collaboration.',
      extra: { type: 'threat', items: [
        { n: '$8T',    l: 'Global cybercrime cost · 2023' },
        { n: '277d',   l: 'Avg breach containment time (IBM)' },
        { n: '82%',    l: 'Breaches involving human element' },
      ]},
      cards: [
        { glyph: '🛡️', title: 'Threat Intelligence & SIEM', body: 'SIEM platforms aggregate logs from thousands of sources, applying ML-based correlation to identify anomalous patterns — detecting threats before they escalate into breaches.', tag: 'Splunk · Microsoft Sentinel · Elastic' },
        { glyph: '🔐', title: 'Cryptography & PKI', body: 'Modern infrastructure relies on TLS 1.3, AES-256-GCM, and RSA/ECDSA. Post-quantum cryptography (CRYSTALS-Kyber) is being standardized by NIST for the quantum era.', tag: "Let's Encrypt · 300M+ certificates issued" },
        { glyph: '🎯', title: 'Red Teams & Pen Testing', body: 'Ethical hackers simulate adversarial attacks via MITRE ATT&CK frameworks — identifying vulnerabilities before malicious actors, providing actionable remediation intelligence.', tag: 'US DoD Bug Bounty · HackerOne platform' },
      ],
      accordion: { label: 'Deep Dive: Ransomware-as-a-Service & Nation-State Actors', content: '<p>RaaS models have lowered the barrier to ransomware campaigns to near zero. LockBit and ALPHV/BlackCat operate affiliate programs splitting ransom proceeds with operators handling victim targeting.</p><p>Nation-state actors (APT28, Lazarus Group, Volt Typhoon) conduct pre-positioning operations against critical infrastructure — power grids, water systems, financial networks — as geopolitical leverage instruments.</p>' },
    },

    /* 08 · BIG DATA */
    {
      id: 'bigdata', idx: '08', alt: true,
      title: 'Big Data & Data Management',
      sub: 'Turning volume into value',
      lead: 'Big Data challenges variety, velocity, and veracity at a scale traditional systems cannot address. Modern architectures extract strategic intelligence from petabyte-scale, heterogeneous, continuously generated datasets.',
      extra: { type: 'vs5', items: [
        { letter: 'V', word: 'Volume',   desc: 'Petabytes generated continuously' },
        { letter: 'V', word: 'Velocity', desc: 'Real-time data streams' },
        { letter: 'V', word: 'Variety',  desc: 'Structured + unstructured data' },
        { letter: 'V', word: 'Veracity', desc: 'Data quality & trustworthiness' },
        { letter: 'V', word: 'Value',    desc: 'Actionable intelligence extracted' },
      ]},
      cards: [
        { glyph: '🗄️', title: 'Data Lakehouses', body: 'Lakehouses combine raw lake storage flexibility with ACID transaction guarantees — unifying batch and streaming analytics on a single, coherent platform.', tag: 'Databricks Delta Lake · Apache Iceberg' },
        { glyph: '⚙️', title: 'Stream Processing', body: 'Kafka and Flink process millions of events per second at millisecond latency — powering real-time fraud detection, recommendation engines, and operational dashboards.', tag: 'LinkedIn Kafka · 7T events/day processed' },
        { glyph: '📊', title: 'Data Governance', body: 'Governance frameworks define ownership, lineage, quality, and access controls — increasingly mandated by GDPR, CCPA, and sector-specific regulations globally.', tag: 'Collibra · Apache Atlas · Microsoft Purview' },
      ],
      accordion: { label: 'Deep Dive: The Modern Data Stack & Analytics Engineering', content: '<p>The modern data stack: Fivetran/Airbyte for ingestion, Snowflake/BigQuery/Redshift for storage and compute, dbt for transformation, and Looker/Metabase for BI visualization.</p><p>Analytics engineering applies software practices (version control, testing, documentation) to SQL pipelines. dbt has become the de facto transformation layer, enabling small teams to build production-grade analytics at scale.</p>' },
    },
  ],

  /* ── GAME QUESTIONS ──────────────────────────────────────────── */
  questions: [
    { domain: 'Networking',     q: 'Which protocol replaced TCP+TLS using UDP to reduce connection latency by up to 30%?', correct: 'QUIC / HTTP/3', opts: ['WebRTC', 'QUIC / HTTP/3', 'SIP', 'MPLS'] },
    { domain: 'Cloud',          q: 'Which service model provides raw compute, storage, and network resources managed by the user?', correct: 'IaaS', opts: ['SaaS', 'PaaS', 'IaaS', 'FaaS'] },
    { domain: 'AI',             q: "Which DeepMind system predicted 3D structures of over 200 million proteins?", correct: 'AlphaFold', opts: ['AlphaGo', 'AlphaFold', 'Gemini', 'BERT'] },
    { domain: 'IoT',            q: 'Which LPWAN protocol achieves ~15 km range with extremely low power — ideal for agriculture?', correct: 'LoRaWAN', opts: ['Zigbee', 'Bluetooth LE', 'LoRaWAN', 'NB-IoT'] },
    { domain: 'Cybersecurity',  q: 'The 2016 Mirai botnet launched a historic DDoS attack. What was its peak throughput?', correct: '1.2 Tbps', opts: ['500 Gbps', '1.2 Tbps', '10 Tbps', '200 Mbps'] },
    { domain: 'Cloud',          q: 'Which open-source tool applies software engineering practices to SQL-based data pipelines?', correct: 'dbt', opts: ['Airflow', 'dbt', 'Spark', 'Kafka'] },
    { domain: 'AI',             q: 'AI-assisted developer tools show approximately what speed improvement in task completion?', correct: '55% faster', opts: ['20% faster', '55% faster', '90% faster', '12% faster'] },
    { domain: 'Networking',     q: 'Zero Trust Architecture eliminates which foundational security assumption?', correct: 'Implicit network trust', opts: ['Encryption requirements', 'Implicit network trust', 'Firewall necessity', 'VPN usage'] },
    { domain: 'IoT',            q: 'Which consumer device received FDA clearance for atrial fibrillation detection via ECG?', correct: 'Apple Watch', opts: ['Garmin Venu', 'Apple Watch', 'Samsung Galaxy Watch', 'Fitbit Sense'] },
    { domain: 'Cybersecurity',  q: 'Post-quantum cryptography standard CRYSTALS-Kyber is being standardized by which body?', correct: 'NIST', opts: ['ISO', 'NIST', 'IEEE', 'IETF'] },
  ],
};

/* ════════════════════════════════════════════════════════════════
   RENDERER — HTML factory from CONFIG data
   Keeps index.html lean and content maintainable from one place
════════════════════════════════════════════════════════════════ */
const Renderer = {

  /* SVG icons for dock */
  icons: {
    info:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    cloud:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
    star:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    game:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4M8 10v4M15 12h2M18 12h-2"/></svg>',
    chevron:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 9l6 6 6-6"/></svg>',
  },

  /* Build sidebar nav */
  renderSidebarNav() {
    const nav = Utils.$('#sidebarNav');
    if (!nav) return;
    const ul = document.createElement('ul');
    ul.setAttribute('role', 'list');
    CONFIG.nav.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#${item.id}" class="sb-item${item.game ? ' sb-game' : ''}"
           data-section="${item.id}" data-idx="${item.idx}">
          <span class="sb-item-index">${item.idx}</span>
          <span class="sb-item-dot"></span>
          <span class="sb-item-label">${item.label}</span>
        </a>`;
      ul.appendChild(li);
    });
    nav.appendChild(ul);
  },

  /* Build mobile nav overlay */
  renderMobileNav() {
    const container = Utils.$('#navOverlayInner');
    if (!container) return;
    const ul = document.createElement('ul');
    CONFIG.nav.forEach((item, i) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#${item.id}" class="ov-item${item.game ? ' ov-game' : ''}"
           data-section="${item.id}" style="transition-delay:${i * 0.05}s">
          <span class="ov-item-idx">${item.idx}</span>
          <span>${item.label}</span>
        </a>`;
      ul.appendChild(li);
    });
    container.appendChild(ul);
  },

  /* Build bottom dock (only items with dock config) */
  renderDock() {
    const dock = Utils.$('#bottomDock');
    if (!dock) return;
    CONFIG.nav.filter(n => n.dock).forEach(item => {
      const a = document.createElement('a');
      a.href = `#${item.id}`;
      a.className = `dock-item${item.game ? ' dock-game' : ''}`;
      a.dataset.section = item.id;
      a.setAttribute('aria-label', item.dock.label);
      a.innerHTML = `${this.icons[item.dock.icon] || ''}<span>${item.dock.label}</span>`;
      dock.appendChild(a);
    });
  },

  /* Build hero section */
  renderHero() {
    const main = Utils.$('#main');
    const heroEl = document.createElement('section');
    heroEl.className = 'section hero';
    heroEl.id = 'intro';
    heroEl.dataset.sectionName = 'Introduction';
    heroEl.innerHTML = `
      <div class="hero-bg" aria-hidden="true">
        <div class="hero-grid"></div>
        <div class="hero-vignette"></div>
        <div class="hero-glow"></div>
        <div class="hero-particles" id="heroParticles"></div>
      </div>

      <div class="hero-layout hero-content">
        <div class="hero-left">
          <div class="hero-eyebrow">
            <span class="eyebrow-tick"></span>
            Educational Reference · 2025
          </div>

          <h1 class="hero-title" aria-label="Different Technologies in ICT">
            <span class="ht-line"><span class="ht-inner">Different</span></span>
            <span class="ht-line"><span class="ht-inner ht-serif">Technologies</span></span>
            <span class="ht-line"><span class="ht-inner">in ICT</span></span>
          </h1>

          <p class="hero-body">
            Information and Communication Technology has evolved into the foundational
            infrastructure of modern civilization — underpinning every domain from
            precision agriculture to quantum computing.
          </p>

          <div class="hero-actions">
            <a href="#comm" class="btn btn-primary mag-btn">
              <span>Explore Domains</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="#game" class="btn btn-outline mag-btn"><span>ICT Challenge</span></a>
          </div>

          <div class="scroll-hint" aria-hidden="true">
            <div class="sh-line"></div>
            <span>Scroll to explore</span>
          </div>
        </div>

        <div class="hero-right hero-bento">
          ${this.renderBento(CONFIG.heroStats)}
        </div>
      </div>
    `;
    main.appendChild(heroEl);
  },

  renderBento(stats) {
    const cells = stats.map(s => `
      <div class="bento-cell${s.tall ? ' bento-tall' : ''}${s.wide ? ' bento-wide' : ''}">
        <span class="bento-num${s.counter ? ' js-counter' : ''}" ${s.counter ? `data-target="${s.counter.t}" data-suffix="${s.counter.s}"` : ''}>${s.num}</span>
        <span class="bento-label">${s.label}</span>
        ${s.bar ? `<div class="bento-bar-track"><div class="bento-bar-fill" style="width:0%;transition:width 1.6s cubic-bezier(0.16,1,0.3,1) 0.8s" data-width="${s.bar}"></div></div>` : ''}
        ${s.spark ? `<div class="bento-spark"><svg viewBox="0 0 120 36" preserveAspectRatio="none"><polyline points="0,32 20,26 40,28 60,16 80,20 100,8 120,4" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/><polyline class="spark-line" points="0,32 20,26 40,28 60,16 80,20 100,8 120,4" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.5" stroke-linecap="round"/></svg></div>` : ''}
      </div>`).join('');
    return `<div class="bento" data-reveal>${cells}</div>`;
  },

  /* Build a tech section from config */
  renderSection(sec) {
    const main = Utils.$('#main');
    const el = document.createElement('section');
    el.className = `section${sec.alt ? ' section-alt' : ' section-dark'}`;
    el.id = sec.id;
    el.dataset.sectionName = sec.title;

    let extraHTML = '';
    if (sec.extra) {
      const e = sec.extra;
      if (e.type === 'stats') {
        extraHTML = `<div class="stat-row" data-reveal>
          ${e.items.map(s => `<div class="stat-cell"><span class="stat-n">${s.n}</span><span class="stat-l">${s.l}</span></div>`).join('')}
        </div>`;
      }
      if (e.type === 'tiers') {
        extraHTML = `<div class="tier-stack" data-reveal>
          ${e.items.map(t => `<div class="tier-item ${t.cls}"><span class="tier-badge">${t.badge}</span><span class="tier-name">${t.name}</span><span class="tier-desc">${t.desc}</span></div>`).join('')}
        </div>`;
      }
      if (e.type === 'timeline') {
        extraHTML = `<div class="timeline" data-reveal>
          ${e.items.map(t => `<div class="tl-item"><div class="tl-dot"></div><div class="tl-title">${t.title}</div><div class="tl-body">${t.body}</div></div>`).join('')}
        </div>`;
      }
      if (e.type === 'table') {
        extraHTML = `<div class="table-wrap" data-reveal><table class="data-table">
          <thead><tr>${e.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${e.rows.map(r => `<tr>${r.map((c,i) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>`;
      }
      if (e.type === 'threat') {
        extraHTML = `<div class="threat-row" data-reveal>
          ${e.items.map(t => `<div class="threat-cell"><span class="threat-n">${t.n}</span><span class="threat-l">${t.l}</span></div>`).join('')}
        </div>`;
      }
      if (e.type === 'vs5') {
        extraHTML = `<div class="vs-wrap" data-reveal>
          ${e.items.map(v => `<div class="vs-cell"><span class="vs-letter">${v.letter}</span><span class="vs-word">${v.word}</span><span class="vs-desc">${v.desc}</span></div>`).join('')}
        </div>`;
      }
    }

    el.innerHTML = `
      <div class="section-inner">
        <header class="sec-head" data-reveal>
          <span class="sec-index">${sec.idx}</span>
          <h2 class="sec-title">${sec.title}</h2>
          <p class="sec-sub">${sec.sub}</p>
        </header>

        <p class="sec-lead" data-reveal>${sec.lead}</p>

        ${extraHTML}

        <div class="cards" data-reveal>
          ${sec.cards.map((c, i) => `
            <article class="card" data-reveal data-delay="${i + 1}">
              <div class="card-glyph">${c.glyph}</div>
              <h3 class="card-title">${c.title}</h3>
              <p class="card-body">${c.body}</p>
              <footer class="card-tag">${c.tag}</footer>
            </article>`).join('')}
        </div>

        <div class="accordion" data-reveal>
          <button class="acc-btn" aria-expanded="false">
            <span class="acc-btn-label">${sec.accordion.label}</span>
            <span class="acc-btn-icon" aria-hidden="true">${this.icons.chevron}</span>
          </button>
          <div class="acc-panel" role="region">
            <div class="acc-body"><div class="acc-inner">${sec.accordion.content}</div></div>
          </div>
        </div>
      </div>
    `;
    main.appendChild(el);
  },

  /* Build game section */
  renderGame() {
    const main = Utils.$('#main');
    const el = document.createElement('section');
    el.className = 'section game-section';
    el.id = 'game';
    el.dataset.sectionName = 'ICT Challenge';

    el.innerHTML = `
      <div class="game-wrap">

        <!-- INTRO SCREEN -->
        <div class="game-screen" id="gIntro">
          <div class="gi-eyebrow">★ Challenge Mode</div>
          <h2 class="gi-title">ICT Tech<br><span class="gi-title-serif">Challenge</span></h2>
          <p class="gi-desc">Match each technology to its domain. 10 questions. Beat the clock. Prove your mastery.</p>
          <div class="gi-meta">
            <div class="gi-meta-item"><span class="gi-meta-num">10</span><span class="gi-meta-lbl">Questions</span></div>
            <div class="gi-meta-item"><span class="gi-meta-num">30s</span><span class="gi-meta-lbl">Per question</span></div>
            <div class="gi-meta-item"><span class="gi-meta-num">5</span><span class="gi-meta-lbl">Domains</span></div>
          </div>
          <button class="btn btn-primary mag-btn" id="gStart">
            <span>Start Challenge</span>
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
        </div>

        <!-- PLAY SCREEN -->
        <div class="game-screen hidden" id="gPlay">
          <div class="game-hud">
            <div class="hud-stat">
              <span class="hud-label">Question</span>
              <span class="hud-value" id="gHudQ">1 / 10</span>
            </div>
            <div class="timer-ring-wrap">
              <svg viewBox="0 0 56 56">
                <circle class="tr-bg" cx="28" cy="28" r="24" fill="none" stroke-width="2"/>
                <circle class="tr-fill" id="gTimerRing" cx="28" cy="28" r="24"
                  fill="none" stroke-width="2"
                  stroke-dasharray="150.8" stroke-dashoffset="0"
                  transform="rotate(-90 28 28)"/>
              </svg>
              <span class="timer-num" id="gTimerNum">30</span>
            </div>
            <div class="hud-stat">
              <span class="hud-label">Score</span>
              <span class="hud-value" id="gHudScore">0</span>
            </div>
          </div>

          <div class="game-prog-bar"><div class="game-prog-fill" id="gProgFill" style="width:0%"></div></div>

          <div class="q-wrap">
            <span class="q-domain" id="gDomain">AI</span>
            <p class="q-text" id="gText">Loading…</p>
          </div>

          <div class="q-options" id="gOptions"></div>

          <div class="q-feedback hidden" id="gFeedback">
            <span class="fb-icon" id="gFbIcon"></span>
            <span id="gFbText"></span>
          </div>
        </div>

        <!-- END SCREEN -->
        <div class="game-screen hidden" id="gEnd">
          <canvas id="confettiCanvas" aria-hidden="true"></canvas>
          <div class="end-wrap">
            <span class="end-trophy" id="gTrophy">🏆</span>
            <h2 class="end-title" id="gEndTitle">Well Done!</h2>
            <p class="end-desc" id="gEndDesc">You answered 8 / 10 correctly.</p>
            <div class="end-ring-wrap">
              <svg viewBox="0 0 130 130">
                <circle class="er-bg"   cx="65" cy="65" r="56" fill="none" stroke-width="3"/>
                <circle class="er-fill" id="gEndRing" cx="65" cy="65" r="56"
                  fill="none" stroke-width="3"
                  stroke-dasharray="351.9" stroke-dashoffset="351.9"
                  transform="rotate(-90 65 65)"/>
              </svg>
              <span class="end-pct" id="gEndPct">0%</span>
            </div>
            <div class="end-domains" id="gDomains"></div>
            <div class="end-actions">
              <button class="btn btn-primary mag-btn" id="gRestart">
                <span>Play Again</span>
              </button>
              <a href="#intro" class="btn btn-outline mag-btn"><span>Back to Top</span></a>
            </div>
          </div>
        </div>

      </div>
    `;
    main.appendChild(el);
  },

  /* Build footer */
  renderFooter() {
    const main = Utils.$('#main');
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-fl">
          <span class="footer-logo">ICT</span>
          <p class="footer-desc">An interactive educational reference on modern Information &amp; Communication Technologies. College-level · 2025.</p>
        </div>
        <div class="footer-fr footer-meta">
          <p>9 Technology Domains</p>
          <p>Designed for academic &amp; professional use.</p>
          <p>Content reflects the technology landscape as of 2025.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span class="footer-copy">© 2025 ICT Modern Era</span>
        <button class="btn btn-outline" id="bttBtn" style="padding:8px 18px;font-size:12px">↑ Back to top</button>
      </div>
    `;
    main.appendChild(footer);
  },

  /* Master render — call once to build the whole page */
  render() {
    this.renderSidebarNav();
    this.renderMobileNav();
    this.renderDock();
    this.renderHero();
    CONFIG.sections.forEach(sec => this.renderSection(sec));
    this.renderGame();
    this.renderFooter();
  }
};

/* ════════════════════════════════════════════════════════════════
   LOADER CONTROLLER
════════════════════════════════════════════════════════════════ */
const LoaderCtrl = {
  el:     null,
  fill:   null,
  status: null,
  steps:  ['Rendering', 'Animating', 'Initializing'],

  init() {
    this.el     = Utils.$('#loader');
    this.fill   = Utils.$('#loaderFill');
    this.status = Utils.$('#loaderStatus');
    this.animate();
  },

  setProgress(pct, label) {
    if (this.fill)   this.fill.style.width = pct + '%';
    if (this.status && label) this.status.textContent = label;
  },

  done() {
    setTimeout(() => {
      this.el?.classList.add('done');
      this.el?.addEventListener('transitionend', () => this.el?.remove(), { once: true });
    }, 200);
  },

  animate() {
    // Step through progress
    setTimeout(() => this.setProgress(40, 'Rendering'), 100);
    setTimeout(() => this.setProgress(75, 'Animating'), 500);
    setTimeout(() => this.setProgress(100, 'Ready'), 850);
  }
};

/* ════════════════════════════════════════════════════════════════
   CURSOR CONTROLLER (desktop, adaptive)
════════════════════════════════════════════════════════════════ */
const CursorCtrl = {
  el: null, orbit: null, label: null,
  mx: 0, my: 0,
  cx: 0, cy: 0,
  angle: 0,
  active: false,

  init() {
    if (Utils.isTouch() || Utils.isMobile()) return;
    this.el    = Utils.$('#cursor');
    this.orbit = this.el?.querySelector('.cursor-orbit');
    this.label = Utils.$('#cursorLabel');
    if (!this.el) return;

    this.el.style.display = 'block';
    this.active = true;

    document.addEventListener('mousemove', e => { this.mx = e.clientX; this.my = e.clientY; });

    this.tick();
    this.bindHovers();
  },

  tick() {
    if (!this.active) return;
    // Lerp cursor position
    this.cx = Utils.lerp(this.cx, this.mx, 0.13);
    this.cy = Utils.lerp(this.cy, this.my, 0.13);
    this.angle += 0.8;

    if (this.el) {
      this.el.style.transform = `translate(${this.cx}px, ${this.cy}px)`;
    }
    if (this.orbit) {
      this.orbit.style.transform = `translate(-50%,-50%) rotate(${this.angle}deg)`;
    }
    Utils.raf(() => this.tick());
  },

  setState(state, labelText = '') {
    if (!this.el) return;
    this.el.dataset.state = state;
    if (this.label) this.label.textContent = labelText;
  },

  bindHovers() {
    // Context-aware states
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('a, button, .card, .bento-cell');
      if (!t) { this.setState(''); return; }
      if (t.matches('.card, .bento-cell')) this.setState('hover', 'View');
      else if (t.matches('.q-opt'))         this.setState('game',  'Pick');
      else if (t.matches('button[id^="g"]')) this.setState('game', 'Play');
      else this.setState('hover', '');
    });
    document.addEventListener('mouseout', () => this.setState(''));
  }
};

/* ════════════════════════════════════════════════════════════════
   SCROLL CONTROLLER — progress + section tracking
════════════════════════════════════════════════════════════════ */
const ScrollCtrl = {
  spFill:       null,
  sbFill:       null,
  sbName:       null,
  mhSection:    null,
  sections:     [],
  observers:    [],

  init() {
    this.spFill    = Utils.$('#spFill');
    this.sbFill    = Utils.$('#sbProgressFill');
    this.sbName    = Utils.$('#sbSectionName');
    this.mhSection = Utils.$('#mhSection');
    this.sections  = Utils.$$('section[id]');

    window.addEventListener('scroll', Utils.throttle(() => this.onScroll(), 40), { passive: true });
    this.onScroll();
    this.watchSections();
  },

  onScroll() {
    const docH  = document.documentElement.scrollHeight - window.innerHeight;
    const pct   = docH > 0 ? (window.scrollY / docH) : 0;
    if (this.spFill) this.spFill.style.width = (pct * 100).toFixed(2) + '%';
    if (this.sbFill) this.sbFill.style.width = (pct * 100).toFixed(2) + '%';
  },

  watchSections() {
    const allLinks = [
      ...Utils.$$('.sb-item'),
      ...Utils.$$('.dock-item'),
      ...Utils.$$('.ov-item'),
    ];

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id   = entry.target.id;
        const name = entry.target.dataset.sectionName || id;

        allLinks.forEach(l => {
          const target = l.dataset.section || (l.getAttribute('href') || '').replace('#', '');
          l.classList.toggle('active', target === id);
        });

        if (this.sbName)    this.sbName.textContent    = name;
        if (this.mhSection) this.mhSection.textContent = name;
      });
    }, { threshold: 0.35 });

    this.sections.forEach(s => {
      io.observe(s);
      s.classList.add('in-view-tracked');
    });
  }
};

/* ════════════════════════════════════════════════════════════════
   ANIMATION CONTROLLER — GSAP + CSS fallback orchestration
   Section timelines built per section for clean choreography
════════════════════════════════════════════════════════════════ */
const AnimCtrl = {
  gsapReady: false,

  init() {
    this.gsapReady = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

    if (this.gsapReady && !Utils.prefersRM) {
      gsap.registerPlugin(ScrollTrigger);
      this.heroTimeline();
      this.sectionTimelines();
      this.bentoAnimations();
      this.parallaxBg();
    } else {
      this.cssReveal();
    }
  },

  /* ── HERO timeline ─────────────────────────────────────────── */
  heroTimeline() {
    const tl = gsap.timeline({ delay: 1.0 });

    // Eyebrow fade
    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });

    // Title lines stagger (clip-based)
    tl.to('.ht-inner', {
      y: '0%', duration: 1.0,
      stagger: 0.12,
      ease: 'power4.out',
    }, '-=0.4');

    // Body + actions
    tl.to('.hero-body',    { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5');
    tl.to('.hero-actions', { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5');

    // Bento cells cascade
    tl.from('.bento-cell', {
      opacity: 0, y: 30, scale: 0.96,
      duration: 0.65, stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.4');

    // Scroll hint
    tl.to('.scroll-hint', { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.2');

    // Animate bento bars after tiles appear
    setTimeout(() => {
      Utils.$$('.bento-bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.width || '0%';
      });
      Utils.$$('.bento-cell').forEach(c => c.classList.add('in-view'));
    }, 1800);
  },

  /* ── Section entrance timelines ────────────────────────────── */
  sectionTimelines() {
    Utils.$$('section.section:not(.hero):not(.game-section)').forEach(section => {
      // Section header
      gsap.fromTo(section.querySelector('.sec-head'), { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 80%', once: true }
      });

      // Lead
      const lead = section.querySelector('.sec-lead');
      if (lead) gsap.fromTo(lead, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1,
        scrollTrigger: { trigger: lead, start: 'top 85%', once: true }
      });

      // Extra elements
      const extras = ['.stat-row', '.tier-stack', '.timeline', '.table-wrap', '.threat-row', '.vs-wrap'];
      extras.forEach(sel => {
        const el = section.querySelector(sel);
        if (!el) return;
        gsap.fromTo(el, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        });
      });

      // Cards stagger
      const cards = Utils.$$('.card', section);
      if (cards.length) {
        gsap.fromTo(cards, { opacity: 0, y: 36, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.cards'), start: 'top 85%', once: true }
        });
      }

      // Accordion
      const acc = section.querySelector('.accordion');
      if (acc) gsap.fromTo(acc, { opacity: 0, y: 18 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: acc, start: 'top 90%', once: true }
      });
    });
  },

  /* ── Bento cell bar + sparkline ─────────────────────────────── */
  bentoAnimations() {
    Utils.$$('.bento-cell').forEach(cell => {
      ScrollTrigger.create({
        trigger: cell, start: 'top 88%', once: true,
        onEnter: () => {
          cell.classList.add('in-view');
          const bar = cell.querySelector('.bento-bar-fill');
          if (bar) {
            gsap.to(bar, { width: bar.dataset.width || '0%', duration: 1.6, ease: 'power3.out', delay: 0.5 });
          }
        }
      });
    });
  },

  /* ── Subtle parallax on section backgrounds ─────────────────── */
  parallaxBg() {
    Utils.$$('.hero-grid, .hero-glow').forEach(el => {
      gsap.to(el, {
        y: '-15%', ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    });
  },

  /* ── CSS fallback for no-GSAP environments ─────────────────── */
  cssReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    Utils.$$('[data-reveal]').forEach(el => io.observe(el));

    // Hero text auto-show
    setTimeout(() => {
      Utils.$$('.ht-inner').forEach((el, i) => {
        setTimeout(() => el.style.transform = 'translateY(0)', i * 130 + 300);
      });
      Utils.$$('.hero-eyebrow, .hero-body, .hero-actions, .scroll-hint').forEach((el, i) => {
        setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 120 + 400);
      });
    }, 800);
  }
};

/* ════════════════════════════════════════════════════════════════
   NAV CONTROLLER — sidebar, overlay, dock, smooth scroll
════════════════════════════════════════════════════════════════ */
const NavCtrl = {
  overlay:  null,
  toggle:   null,
  isOpen:   false,

  init() {
    this.overlay = Utils.$('#navOverlay');
    this.toggle  = Utils.$('#menuToggle');

    // Hamburger toggle
    this.toggle?.addEventListener('click', () => this.isOpen ? this.close() : this.open());

    // All nav links → smooth scroll + close
    Utils.$$('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const id  = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        this.close();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // Overlay backdrop close
    this.overlay?.addEventListener('click', e => {
      if (e.target === this.overlay) this.close();
    });

    // Back to top
    Utils.$('#bttBtn')?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  open() {
    this.isOpen = true;
    this.overlay?.classList.add('open');
    this.overlay?.setAttribute('aria-hidden', 'false');
    this.toggle?.setAttribute('aria-expanded', 'true');
  },

  close() {
    this.isOpen = false;
    this.overlay?.classList.remove('open');
    this.overlay?.setAttribute('aria-hidden', 'true');
    this.toggle?.setAttribute('aria-expanded', 'false');
  }
};

/* ════════════════════════════════════════════════════════════════
   ACCORDION CONTROLLER
════════════════════════════════════════════════════════════════ */
const AccordionCtrl = {
  init() {
    document.addEventListener('click', e => {
      const btn = e.target.closest('.acc-btn');
      if (!btn) return;
      const acc    = btn.closest('.accordion');
      const isOpen = acc.classList.contains('open');

      // Close all
      Utils.$$('.accordion.open').forEach(a => {
        a.classList.remove('open');
        a.querySelector('.acc-btn')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        acc.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }
};

/* ════════════════════════════════════════════════════════════════
   TILT CONTROLLER — spring physics on cards
════════════════════════════════════════════════════════════════ */
const TiltCtrl = {
  MAX:    7,
  SPRING: 0.14,
  DAMP:   0.72,

  init() {
    if (Utils.isTouch() || Utils.prefersRM) return;

    Utils.$$('.card, .bento-cell').forEach(el => {
      let ox = 0, oy = 0, vx = 0, vy = 0;
      let inside = false, raf = null;

      const spring = () => {
        if (!inside) {
          vx += (0 - ox) * this.SPRING;
          vy += (0 - oy) * this.SPRING;
        }
        vx *= this.DAMP; vy *= this.DAMP;
        ox += vx; oy += vy;

        el.style.transform = `perspective(900px) rotateX(${-oy}deg) rotateY(${ox}deg)`;
        if (Math.abs(ox) > 0.05 || Math.abs(oy) > 0.05 || inside) {
          raf = requestAnimationFrame(spring);
        } else {
          el.style.transform = '';
          raf = null;
        }
      };

      el.addEventListener('mouseenter', () => { inside = true; if (!raf) raf = requestAnimationFrame(spring); });
      el.addEventListener('mousemove', e => {
        const r  = el.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        const ny = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        vx += (nx * this.MAX - ox) * 0.28;
        vy += (ny * this.MAX - oy) * 0.28;
      });
      el.addEventListener('mouseleave', () => { inside = false; });
    });
  }
};

/* ════════════════════════════════════════════════════════════════
   MAGNETIC BUTTON CONTROLLER
════════════════════════════════════════════════════════════════ */
const MagneticCtrl = {
  STRENGTH: 0.28,
  RADIUS:   75,

  init() {
    if (Utils.isTouch() || Utils.prefersRM) return;

    // Re-query on DOM ready since buttons are rendered dynamically
    Utils.$$('.mag-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r  = btn.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < this.RADIUS) {
          const pull = (1 - d / this.RADIUS) * this.STRENGTH;
          btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
        }
      });
      const release = () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        btn.style.transform  = '';
        setTimeout(() => btn.style.transition = '', 500);
      };
      btn.addEventListener('mouseleave', release);
      btn.addEventListener('mouseenter', () => btn.style.transition = 'transform 0.08s');
    });
  }
};

/* ════════════════════════════════════════════════════════════════
   PARTICLE CONTROLLER — hero background particles
════════════════════════════════════════════════════════════════ */
const ParticleCtrl = {
  init() {
    if (Utils.prefersRM) return;
    const container = Utils.$('#heroParticles');
    if (!container) return;

    const count = Utils.isMobile() ? 10 : 25;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'ptcl';
      const size = 1 + Math.random() * 2.5;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        --d:${4 + Math.random() * 7}s;
        --delay:${Math.random() * 4}s;
      `;
      container.appendChild(p);
    }
  }
};

/* ════════════════════════════════════════════════════════════════
   COUNTER CONTROLLER — animated numbers
════════════════════════════════════════════════════════════════ */
const CounterCtrl = {
  init() {
    Utils.$$('.js-counter').forEach(el => {
      const target = parseFloat(el.dataset.target) || 0;
      const suffix = el.dataset.suffix || '';
      let done = false;

      const io = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting || done) return;
        done = true;
        const start = performance.now();
        const dur   = 1800;
        const run = now => {
          const t   = Utils.clamp((now - start) / dur, 0, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          const val  = target * ease;
          el.textContent = (val % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
          if (t < 1) Utils.raf(run);
          else el.textContent = target + suffix;
        };
        Utils.raf(run);
        io.disconnect();
      }, { threshold: 0.5 });
      io.observe(el);
    });
  }
};

/* ════════════════════════════════════════════════════════════════
   GAME CONTROLLER
   Full quiz engine with timer, scoring, speed bonus, transitions
════════════════════════════════════════════════════════════════ */
const GameCtrl = {
  /* DOM refs */
  screens: {},
  hud:     {},

  /* State */
  questions: [],
  idx:       0,
  score:     0,
  answered:  false,
  timer:     null,
  timeLeft:  30,
  domains:   {},

  /* Constants */
  MAX_TIME: 30,
  RING_C:   150.8,  /* 2 * π * 24 */
  END_RING: 351.9,  /* 2 * π * 56 */

  init() {
    this.screens = {
      intro: Utils.$('#gIntro'),
      play:  Utils.$('#gPlay'),
      end:   Utils.$('#gEnd'),
    };
    this.hud = {
      q:     Utils.$('#gHudQ'),
      score: Utils.$('#gHudScore'),
      timer: Utils.$('#gTimerNum'),
      ring:  Utils.$('#gTimerRing'),
      prog:  Utils.$('#gProgFill'),
      dom:   Utils.$('#gDomain'),
      text:  Utils.$('#gText'),
      opts:  Utils.$('#gOptions'),
      fb:    Utils.$('#gFeedback'),
      fbI:   Utils.$('#gFbIcon'),
      fbT:   Utils.$('#gFbText'),
    };

    Utils.$('#gStart')?.addEventListener('click', () => this.start());
    Utils.$('#gRestart')?.addEventListener('click', () => this.start());
  },

  show(name) {
    Object.entries(this.screens).forEach(([k, el]) => {
      if (!el) return;
      el.classList.toggle('hidden', k !== name);
    });
  },

  start() {
    this.questions = Utils.shuffle(CONFIG.questions);
    this.idx       = 0;
    this.score     = 0;
    this.domains   = {};
    this.show('play');
    this.loadQ();
  },

  loadQ() {
    this.answered = false;
    const q = this.questions[this.idx];

    this.hud.q.textContent    = `${this.idx + 1} / ${this.questions.length}`;
    this.hud.score.textContent = this.score;
    this.hud.prog.style.width  = `${(this.idx / this.questions.length) * 100}%`;
    this.hud.dom.textContent   = q.domain;
    this.hud.text.textContent  = q.q;

    // Render shuffled options
    const opts = Utils.shuffle(q.opts);
    this.hud.opts.innerHTML = opts.map(o =>
      `<button class="q-opt" data-opt="${o}">${o}</button>`
    ).join('');
    Utils.$$('.q-opt', this.hud.opts).forEach(btn =>
      btn.addEventListener('click', () => this.pick(btn, q))
    );

    // Hide feedback
    this.hud.fb.className = 'q-feedback hidden';

    // Reset timer ring
    Utils.$('.timer-ring-wrap')?.classList.remove('warn');
    this.startTimer();
  },

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft = this.MAX_TIME;
    this.setRing(this.MAX_TIME);
    this.hud.timer.textContent = this.timeLeft;

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.hud.timer.textContent = this.timeLeft;
      this.setRing(this.timeLeft);

      if (this.timeLeft <= 8) Utils.$('.timer-ring-wrap')?.classList.add('warn');
      if (this.timeLeft <= 0) { clearInterval(this.timer); this.timeOut(); }
    }, 1000);
  },

  setRing(t) {
    const offset = this.RING_C * (1 - t / this.MAX_TIME);
    if (this.hud.ring) this.hud.ring.style.strokeDashoffset = offset;
  },

  pick(btn, q) {
    if (this.answered) return;
    this.answered = true;
    clearInterval(this.timer);

    const chosen    = btn.dataset.opt;
    const isCorrect = chosen === q.correct;
    const bonus     = isCorrect ? Math.floor((this.timeLeft / this.MAX_TIME) * 5) : 0;

    if (isCorrect) this.score += 10 + bonus;

    if (!this.domains[q.domain]) this.domains[q.domain] = { h: 0, t: 0 };
    this.domains[q.domain].t++;
    if (isCorrect) this.domains[q.domain].h++;

    // Style options
    Utils.$$('.q-opt', this.hud.opts).forEach(o => {
      o.classList.add('opt-disabled');
      if (o.dataset.opt === q.correct)  o.classList.add('opt-correct');
      if (o === btn && !isCorrect)      o.classList.add('opt-wrong');
    });

    // Feedback
    const fbClass = isCorrect ? 'fb-ok' : 'fb-err';
    this.hud.fb.className = `q-feedback ${fbClass}`;
    this.hud.fbI.textContent = isCorrect ? '✓' : '✗';
    this.hud.fbT.textContent = isCorrect
      ? `+${10 + bonus} pts${bonus ? ` (speed bonus +${bonus})` : ''}`
      : `Correct: ${q.correct}`;

    this.hud.score.textContent = this.score;

    setTimeout(() => {
      this.idx++;
      if (this.idx < this.questions.length) this.loadQ();
      else this.endGame();
    }, 1700);
  },

  timeOut() {
    if (this.answered) return;
    this.answered = true;
    const q = this.questions[this.idx];

    if (!this.domains[q.domain]) this.domains[q.domain] = { h: 0, t: 0 };
    this.domains[q.domain].t++;

    Utils.$$('.q-opt', this.hud.opts).forEach(o => {
      o.classList.add('opt-disabled');
      if (o.dataset.opt === q.correct) o.classList.add('opt-correct');
    });

    this.hud.fb.className = 'q-feedback fb-err';
    this.hud.fbI.textContent = '⏱';
    this.hud.fbT.textContent = `Time's up! Correct: ${q.correct}`;

    setTimeout(() => {
      this.idx++;
      if (this.idx < this.questions.length) this.loadQ();
      else this.endGame();
    }, 1900);
  },

  endGame() {
    const total = this.questions.length;
    const pct   = Math.round(this.score / (total * 10) * 100);

    this.show('end');

    const trophy  = pct >= 90 ? '🏆' : pct >= 70 ? '🎖️' : pct >= 50 ? '📘' : '🔄';
    const title   = pct >= 90 ? 'ICT Master!' : pct >= 70 ? 'Well Done!' : pct >= 50 ? 'Good Start' : 'Keep Learning';

    Utils.$('#gTrophy').textContent   = trophy;
    Utils.$('#gEndTitle').textContent = title;
    Utils.$('#gEndDesc').textContent  = `You scored ${this.score} points across ${total} questions.`;

    // Animate ring
    const ringOffset = this.END_RING * (1 - pct / 100);
    const endRing    = Utils.$('#gEndRing');
    const endPct     = Utils.$('#gEndPct');
    setTimeout(() => {
      if (endRing) endRing.style.strokeDashoffset = ringOffset;
      let displayed = 0;
      const iv = setInterval(() => {
        displayed = Math.min(displayed + 2, pct);
        if (endPct) endPct.textContent = displayed + '%';
        if (displayed >= pct) clearInterval(iv);
      }, 18);
    }, 400);

    // Domain badges
    const badges = Object.entries(this.domains).map(([d, r]) =>
      `<span class="ed-badge ${r.h === r.t ? 'hit' : ''}">${d} ${r.h}/${r.t}</span>`
    ).join('');
    Utils.$('#gDomains').innerHTML = badges;

    // Confetti on good score
    if (pct >= 60) setTimeout(() => ConfettiCtrl.launch(), 700);
  }
};

/* ════════════════════════════════════════════════════════════════
   CONFETTI CONTROLLER — grayscale canvas burst
════════════════════════════════════════════════════════════════ */
const ConfettiCtrl = {
  COLORS: ['#ffffff','#d0d0d0','#a0a0a0','#707070','#f0f0f0','#404040'],
  COUNT:  130,

  launch() {
    const canvas = Utils.$('#confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = canvas.offsetWidth  + 160;
    canvas.height = canvas.offsetHeight + 160;

    const pieces = Array.from({ length: this.COUNT }, () => ({
      x:     canvas.width  / 2 + (Math.random() - 0.5) * canvas.width  * 0.6,
      y:     canvas.height / 2,
      vx:    (Math.random() - 0.5) * 14,
      vy:    -(Math.random() * 16 + 5),
      rot:   Math.random() * 360,
      rotV:  (Math.random() - 0.5) * 12,
      w:     5 + Math.random() * 10,
      h:     4 + Math.random() * 6,
      color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
      alpha: 1,
      g:     0.38,
      round: Math.random() > 0.6,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      pieces.forEach(p => {
        p.x   += p.vx;  p.y  += p.vy;
        p.vy  += p.g;   p.rot += p.rotV;
        p.alpha = Utils.clamp(p.alpha - 0.007, 0, 1);
        if (p.alpha <= 0) return;
        alive++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle   = p.color;
        if (p.round) {
          ctx.beginPath();
          ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx.restore();
      });
      if (alive > 0) frame = Utils.raf(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    frame = Utils.raf(draw);
    setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 5500);
  }
};

/* ════════════════════════════════════════════════════════════════
   BOOT SEQUENCE
   Renders content first, then initializes all controllers.
   Order matters: render → bind → animate → done
════════════════════════════════════════════════════════════════ */
function boot() {
  LoaderCtrl.init();

  // 1. Render all content from CONFIG
  Renderer.render();

  // 2. Bind nav + interactions (early, before animation)
  NavCtrl.init();
  AccordionCtrl.init();

  // 3. Particles + counters (DOM-dependent)
  ParticleCtrl.init();
  CounterCtrl.init();

  // 4. After GSAP loads (may be async), run animations
  function runAnim() {
    AnimCtrl.init();
    ScrollCtrl.init();
    CursorCtrl.init();
    TiltCtrl.init();
    MagneticCtrl.init();
    GameCtrl.init();
    LoaderCtrl.done();
  }

  // Wait for GSAP to be available (loaded via script tags)
  if (typeof gsap !== 'undefined') {
    runAnim();
  } else {
    // Poll until GSAP is ready (deferred script scenario)
    const poll = setInterval(() => {
      if (typeof gsap !== 'undefined') { clearInterval(poll); runAnim(); }
    }, 50);
    // Fallback: run after 2s even without GSAP
    setTimeout(() => { clearInterval(poll); runAnim(); }, 2000);
  }

  // Global resize handler (debounced)
  window.addEventListener('resize', Utils.debounce(() => {
    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  }, 300), { passive: true });
}

/* Run when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
