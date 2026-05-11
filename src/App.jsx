import React, { useState, useEffect, useMemo } from "react";

// ===== GLOSSARY (Chapter 10 terms) =====
const GLOSSARY = [
  { term: "Product", def: "Anything received in an exchange — including tangible AND intangible benefits." },
  { term: "Tangible benefits", def: "Physical attributes: packaging, style, color, size, features." },
  { term: "Intangible benefits", def: "Service, retailer image, manufacturer reputation, social status, emotional meaning." },
  { term: "Convenience product", def: "Inexpensive, low-effort, easy purchase. Bought routinely." },
  { term: "Shopping product", def: "Consumers compare options before buying." },
  { term: "Homogeneous shopping product", def: "Similar products compared mainly by price/features." },
  { term: "Heterogeneous shopping product", def: "Different products compared by style, quality, distinct characteristics." },
  { term: "Specialty product", def: "Unique, desirable, high loyalty. Customers make special effort to buy." },
  { term: "Unsought product", def: "New, ignored, or avoided. Requires aggressive selling or education." },
  { term: "Product item", def: "A specific version of a product (e.g., Mood Water: Lavender Anxiety Edition)." },
  { term: "Product line", def: "A group of closely related products." },
  { term: "Product mix", def: "All products a company sells." },
  { term: "Product mix width", def: "Number of product LINES the company offers." },
  { term: "Product line depth", def: "Number of ITEMS within one product line." },
  { term: "Product modification", def: "Changing quality, function, or style of an existing product." },
  { term: "Quality modification", def: "Improving (or reducing) the material/performance of a product." },
  { term: "Functional modification", def: "Changing what the product DOES (e.g., adding an AI sensor)." },
  { term: "Style modification", def: "Changing the aesthetic — packaging, color, form." },
  { term: "Planned obsolescence", def: "Designing a product to wear out or become outdated so customers replace it." },
  { term: "Product line extension", def: "Adding new items to an existing product line." },
  { term: "Brand", def: "Name, term, symbol, or design that identifies and differentiates the product." },
  { term: "Brand name", def: "The pronounceable part of a brand." },
  { term: "Brand mark", def: "Symbol or visual design representing the brand." },
  { term: "Brand equity", def: "The value created by strong recognition and customer loyalty." },
  { term: "Global brand", def: "Same brand sold across multiple Earth markets." },
  { term: "Brand loyalty", def: "Humans repeatedly buy the brand even when cheaper alternatives exist." },
  { term: "Manufacturer's brand", def: "Brand owned by the producer." },
  { term: "Private brand", def: "Brand owned by the retailer." },
  { term: "Captive brand", def: "Brand sold only at one retailer with no obvious retailer connection." },
  { term: "Individual branding", def: "Each product gets its own brand name." },
  { term: "Family branding", def: "Multiple products share one brand name." },
  { term: "Co-branding", def: "Two brands combine on one product." },
  { term: "Trademark", def: "Legal protection for brand names/symbols." },
  { term: "Service mark", def: "Legal protection for services." },
  { term: "Generic product name", def: "When a brand name becomes the common term for the entire category (e.g., kleenex)." },
  { term: "Packaging functions", def: "Contain/protect, promote, aid storage & use, and reduce environmental damage." },
  { term: "Persuasive labeling", def: "Labeling designed to influence purchase via emotion, lifestyle, claims." },
  { term: "Informational labeling", def: "Facts, instructions, ingredients, warnings — supports informed choice." },
  { term: "UPC", def: "Universal Product Code — the scannable barcode used for inventory/checkout." },
  { term: "Global packaging", def: "Adapting labeling, aesthetics, climate-readiness, and sizes for different markets." },
  { term: "Warranty", def: "Confirms quality/performance and protects the buyer." },
  { term: "Express warranty", def: "WRITTEN guarantee about the product." },
  { term: "Implied warranty", def: "UNWRITTEN guarantee that the product is fit for its intended use." },
];

// ===== HUMAN SEGMENTS =====
const SEGMENTS = {
  convenience: { name: "Convenience Humans", icon: "◐", color: "#9be7c4", desc: "Want cheap, easy, low-effort. Hate complexity." },
  comparison: { name: "Comparison Humans", icon: "◑", color: "#a8c5ff", desc: "Compare price, quality, features. Read reviews." },
  status: { name: "Status Humans", icon: "✦", color: "#ffb3d9", desc: "Want rare, exclusive, premium. Pay for meaning." },
  avoidant: { name: "Avoidant Humans", icon: "◌", color: "#ffd6a5", desc: "Avoid awkward or scary purchases. Need persuasion." },
  wellness: { name: "Wellness Humans", icon: "❀", color: "#caffbf", desc: "Crave clean labels, vague benefits, natural vibes." },
  tech: { name: "Tech Humans", icon: "⌬", color: "#bdb2ff", desc: "Love AI, subscriptions, futuristic aesthetics." },
  parent: { name: "Parent Humans", icon: "♡", color: "#fdffb6", desc: "Want safety, warranties, value, trusted family brands." },
};

// ===== PRODUCTS =====
const ALIEN_PRODUCTS = [
  { name: "Mood Bread", emoji: "🍞", desc: "Loaf claims to align emotional frequency." },
  { name: "Luxury Air Cube", emoji: "⬜", desc: "A small cube of mountaintop air." },
  { name: "AI Emotional Support Spoon", emoji: "🥄", desc: "Spoon that hums when you eat." },
  { name: "Self-Expiring Socks", emoji: "🧦", desc: "Loses softness after 30 days." },
  { name: "Memory Water", emoji: "💧", desc: "Water that 'remembers' its source." },
  { name: "Anti-Sadness Rock", emoji: "🪨", desc: "Pocket-sized mood stone." },
  { name: "Premium Sleep Sand", emoji: "⏳", desc: "Crushed quartz for under your pillow." },
  { name: "Subscription Toothbrush", emoji: "🪥", desc: "Auto-replaces monthly. AI-tracked." },
  { name: "Floating Lunch Orb", emoji: "🔮", desc: "Hovers at table height. Holds soup." },
  { name: "Social Status Napkin", emoji: "▢", desc: "Embossed. Doubles as a brag." },
  { name: "Glow Milk", emoji: "🥛", desc: "Faintly luminous beverage." },
  { name: "Silent Alarm Clock", emoji: "⏰", desc: "Wakes you via shame, not noise." },
];

// ===== STYLES =====
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poiret+One&family=Orbitron:wght@500;700;900&family=Major+Mono+Display&family=Fraunces:ital,wght@0,400;0,500;0,700;1,400&family=JetBrains+Mono:wght@400;600;700&display=swap');

  .alien-root {
    --bg: #08050f;
    --bg2: #0f0a1a;
    --panel: rgba(12, 8, 22, 0.94);
    --panel-solid: rgba(8, 5, 16, 0.97);
    --panel-edge: rgba(255, 200, 240, 0.25);
    --ink: #ffffff;
    --ink-bright: #ffffff;
    --ink-dim: #e0d4f0;
    --ink-faint: #a89cc0;
    --pink: #ff8fd0;
    --mint: #8efad0;
    --lav: #d4b5ff;
    --peach: #ffc09a;
    --yellow: #ffe680;
    --danger: #ff7a96;
    --grid: rgba(200, 166, 255, 0.04);
    color: var(--ink);
    font-family: 'Fraunces', serif;
    min-height: 100vh;
    background:
      radial-gradient(circle at 20% 10%, rgba(255, 126, 200, 0.13), transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(126, 240, 196, 0.10), transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(200, 166, 255, 0.07), transparent 60%),
      linear-gradient(180deg, var(--bg) 0%, var(--bg2) 100%);
    background-attachment: fixed;
    position: relative;
    overflow-x: hidden;
  }
  .alien-root::before {
    content: "";
    position: fixed; inset: 0;
    background-image:
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
  }
  .alien-root::after {
    content: "";
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' /></filter><rect width='200' height='200' filter='url(%23n)' opacity='0.5'/></svg>");
    opacity: 0.03; pointer-events: none; z-index: 1; mix-blend-mode: overlay;
  }
  .alien-content { position: relative; z-index: 2; }

  body, p, span, div, button, h1, h2, h3, h4 {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  .mono { font-family: 'JetBrains Mono', monospace; font-weight: 500; }
  .alien-font { font-family: 'Orbitron', sans-serif; letter-spacing: 0.08em; font-weight: 700; }
  .alien-font-decorative { font-family: 'Major Mono Display', monospace; letter-spacing: 0.05em; }
  .title-font {
    font-family: 'Poiret One', 'Orbitron', sans-serif;
    font-weight: 400;
    letter-spacing: 0.04em;
  }
  .serif { font-family: 'Fraunces', serif; }

  .panel {
    background: var(--panel);
    border: 1px solid var(--panel-edge);
    border-radius: 6px;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.04),
      0 30px 60px -20px rgba(0,0,0,0.7),
      inset 0 1px 0 rgba(255,255,255,0.03);
    position: relative;
  }
  .panel::before {
    content: "";
    position: absolute; inset: 0;
    border-radius: 6px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255, 126, 200, 0.4), transparent 40%, transparent 60%, rgba(126, 240, 196, 0.3));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude;
    pointer-events: none;
  }
  .panel-solid {
    background: var(--panel-solid);
  }

  .corner-tag {
    position: absolute; top: 12px; right: 14px;
    font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 600;
    color: var(--ink-dim); letter-spacing: 0.15em; text-transform: uppercase;
  }

  .btn {
    background: rgba(20, 14, 32, 0.7);
    border: 1px solid var(--panel-edge);
    color: var(--ink);
    padding: 12px 22px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 3px;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
    line-height: 1.4;
  }
  .btn:hover {
    border-color: var(--pink);
    color: var(--pink);
    box-shadow: 0 0 24px rgba(255, 126, 200, 0.35), inset 0 0 24px rgba(255, 126, 200, 0.05);
    transform: translateY(-1px);
  }
  .btn-primary {
    background: linear-gradient(135deg, var(--pink), var(--lav));
    color: #0a0712;
    border-color: transparent;
    font-weight: 800;
  }
  .btn-primary:hover {
    color: #0a0712;
    box-shadow: 0 0 32px rgba(255, 126, 200, 0.6);
    filter: brightness(1.1);
  }
  .btn-mint:hover { border-color: var(--mint); color: var(--mint); box-shadow: 0 0 24px rgba(126, 240, 196, 0.35); }
  .btn-back {
    background: rgba(20, 14, 32, 0.85);
    border-color: var(--ink-faint);
  }
  .btn-back:hover {
    border-color: var(--lav);
    color: var(--lav);
  }
  .btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }

  .blink { animation: blink 1.4s steps(2) infinite; }
  @keyframes blink { 50% { opacity: 0.3; } }

  .float-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.18;
    pointer-events: none;
    z-index: 0;
  }

  .meter {
    height: 8px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  }
  .meter-fill {
    height: 100%;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(90deg, var(--c1, var(--mint)), var(--c2, var(--pink)));
    box-shadow: 0 0 12px var(--c1, var(--mint));
  }

  .pulse-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--mint);
    box-shadow: 0 0 12px var(--mint);
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.4); opacity: 0.5; } }

  .product-card {
    transition: all 0.3s ease;
    cursor: pointer;
  }
  .product-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 32px rgba(200, 166, 255, 0.2);
  }
  .product-card.selected {
    border-color: var(--pink) !important;
    box-shadow: 0 0 24px rgba(255, 126, 200, 0.4);
  }

  .scanline {
    position: absolute; inset: 0;
    background: linear-gradient(transparent 50%, rgba(255,255,255,0.02) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    border-radius: 6px;
  }

  .glow-text {
    text-shadow:
      0 0 1px rgba(0,0,0,0.8),
      0 2px 8px rgba(0,0,0,0.7),
      0 0 24px currentColor;
  }
  .glow-text-soft {
    text-shadow:
      0 1px 2px rgba(0,0,0,0.9),
      0 0 12px rgba(0,0,0,0.7);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.6s ease-out backwards; }

  .seg-card {
    transition: all 0.25s ease;
    cursor: pointer;
  }
  .seg-card:hover { transform: scale(1.02); }
  .seg-card.picked { box-shadow: 0 0 24px var(--c, var(--pink)); border-color: var(--c, var(--pink)) !important; }

  .tag {
    display: inline-block;
    padding: 3px 10px;
    border: 1px solid var(--panel-edge);
    border-radius: 999px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 2px;
  }

  /* readability helpers */
  .body-text {
    color: var(--ink-dim);
    line-height: 1.75;
    font-size: 15px;
  }
  .body-text strong { color: var(--ink-bright); font-weight: 600; }

  /* back button bar */
  .back-bar {
    max-width: 960px;
    margin: 0 auto;
    padding: 18px 24px 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* briefing layout - clean spacing for level intro screens */
  .briefing-wrap {
    max-width: 720px;
    margin: 0 auto;
    padding: 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 22px;
  }
  .briefing-wrap p {
    font-size: 16px;
    line-height: 1.75;
    color: var(--ink-dim);
    margin: 0;
    text-align: left;
    max-width: 600px;
  }
  .briefing-wrap p strong { color: var(--ink-bright); font-weight: 600; }
  .briefing-wrap > div {
    width: 100%;
  }
  .briefing-wrap .btn {
    margin-top: 8px;
  }

  /* level shell - any primary button that's a direct child gets nice top spacing */
  .level-shell > .btn-primary,
  .level-shell > button.btn-primary {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
  }
  /* center primary advance buttons that follow grids/panels */
  .level-shell > .btn-primary {
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  @media (max-width: 600px) {
    .briefing-wrap {
      padding: 8px 0;
      gap: 18px;
    }
    .briefing-wrap p {
      font-size: 15px;
    }
    .briefing-wrap .btn {
      width: 100%;
      text-align: center;
    }
    .level-shell > .btn-primary {
      width: 100%;
      margin-top: 20px;
    }
    /* prevent giant numbers from overflowing on small screens */
    .alien-font {
      word-break: break-word;
      overflow-wrap: break-word;
    }
    /* extra breathing room around results panels on phones */
    .level-shell .panel {
      margin-bottom: 14px;
    }
    /* hide corner tags on mobile - they overlap with content */
    .hide-on-mobile {
      display: none !important;
    }
    /* tighter intro/ending padding on mobile */
    .ending-panel {
      padding: 36px 22px !important;
    }
  }

  /* ===== RESPONSIVE: layout helpers ===== */
  .lab-grid {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 24px;
  }
  .sidebar-sticky {
    position: sticky;
    top: 80px;
    height: fit-content;
  }
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .three-col {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  /* ===== MOBILE / TABLET BREAKPOINTS ===== */
  @media (max-width: 820px) {
    .lab-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .sidebar-sticky {
      position: static;
      top: auto;
    }
    .two-col {
      grid-template-columns: 1fr;
    }
    .three-col {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .alien-root::before { background-size: 32px 32px; }
    .top-bar {
      padding: 10px 12px !important;
      flex-wrap: wrap;
      gap: 8px;
    }
    .top-bar .top-bar-left {
      flex: 1 1 100%;
      justify-content: space-between;
    }
    .top-bar .top-bar-right {
      flex: 1 1 100%;
      justify-content: flex-end;
    }
    .btn {
      padding: 11px 16px;
      font-size: 12px;
      letter-spacing: 0.06em;
      min-height: 44px;
    }
    .panel {
      padding: 18px !important;
    }
    .level-shell {
      padding: 16px 14px 90px !important;
    }
    .intro-panel {
      padding: 36px 22px !important;
    }
    .hub-grid {
      grid-template-columns: 1fr !important;
    }
    .alien-font-h1 {
      font-size: 38px !important;
      letter-spacing: 0.04em !important;
    }
    .alien-font-h2 {
      font-size: 20px !important;
    }
    .serif-h3 {
      font-size: 18px !important;
    }
    .body-text { font-size: 14px; }
    .reaction-grid {
      grid-template-columns: 1fr !important;
    }
    .seg-grid {
      grid-template-columns: repeat(2, 1fr) !important;
    }
    .ext-grid {
      grid-template-columns: 1fr !important;
    }
    .stage-grid {
      grid-template-columns: repeat(3, 1fr) !important;
      font-size: 9px !important;
    }
    .ending-stats {
      grid-template-columns: 1fr !important;
    }
    .glossary-modal {
      padding: 22px 18px !important;
    }
    .back-bar {
      padding: 12px 14px 0 !important;
    }
  }

  @media (max-width: 400px) {
    .seg-grid {
      grid-template-columns: 1fr !important;
    }
    .alien-font-h1 {
      font-size: 30px !important;
    }
  }
`;

// ===== ALIEN NARRATION HELPER =====
const Alien = ({ children, accent = "var(--mint)" }) => (
  <div style={{
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13.5,
    fontWeight: 500,
    lineHeight: 1.75,
    padding: "18px 20px",
    borderLeft: `3px solid ${accent}`,
    background: "rgba(0, 0, 0, 0.65)",
    color: "var(--ink-bright)",
    margin: "16px 0",
    borderRadius: "0 6px 6px 0",
    boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
  }}>
    <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: "0.2em", marginBottom: 8, textTransform: "uppercase" }}>
      ▸ ALIEN OBSERVATION LOG
    </div>
    <div style={{ color: "var(--ink-bright)" }}>{children}</div>
  </div>
);

const Meter = ({ label, value, c1, c2, max = 100 }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, marginBottom: 4, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-dim)" }}>
      <span>{label}</span>
      <span style={{ color: c1 }}>{Math.round(value)}</span>
    </div>
    <div className="meter">
      <div className="meter-fill" style={{ width: `${Math.max(0, Math.min(100, (value/max)*100))}%`, "--c1": c1, "--c2": c2 || c1 }} />
    </div>
  </div>
);

// ===== MAIN APP =====
export default function App() {
  // History stack: each entry is { screen, levelStep? }
  const [history, setHistory] = useState([{ screen: "intro" }]);
  const current = history[history.length - 1];
  const screen = current.screen;

  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [masteredTerms, setMasteredTerms] = useState(new Set());

  // Level-internal back handler. Each level registers this when it has internal steps.
  const [levelBack, setLevelBack] = useState(null);

  // Inject viewport meta tag so mobile renders at proper width
  useEffect(() => {
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'viewport';
      document.head.appendChild(meta);
    }
    meta.content = 'width=device-width, initial-scale=1, viewport-fit=cover';
  }, []);

  // Scroll to top whenever screen changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use instant scroll - smooth fights with React renders and can fail
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [screen]);

  // Clear levelBack when on a non-level screen (so stale handlers don't linger)
  useEffect(() => {
    const isLevelScreen = screen.startsWith("level") || screen === "boss";
    if (!isLevelScreen) {
      setLevelBack(null);
    }
  }, [screen]);

  const goTo = (s) => setHistory((h) => [...h, { screen: s }]);
  const goBack = () => {
    // If the current level/boss has its own internal back, use that first
    if (levelBack) {
      levelBack();
      return;
    }
    setHistory((h) => h.length > 1 ? h.slice(0, -1) : h);
  };
  const goHome = () => {
    setLevelBack(null);
    setHistory([{ screen: "intro" }, { screen: "hub" }]);
  };
  const canGoBack = (history.length > 1 && screen !== "intro") || !!levelBack;

  const completeLevel = (id, score, terms) => {
    setCompletedLevels((p) => [...new Set([...p, id])]);
    setTotalScore((p) => p + score);
    setMasteredTerms((p) => {
      const n = new Set(p);
      terms.forEach((t) => n.add(t));
      return n;
    });
  };

  return (
    <div className="alien-root">
      <style>{styles}</style>
      <div className="float-orb" style={{ width: 400, height: 400, background: "var(--pink)", top: "10%", left: "-100px" }} />
      <div className="float-orb" style={{ width: 500, height: 500, background: "var(--lav)", bottom: "10%", right: "-150px" }} />
      <div className="float-orb" style={{ width: 300, height: 300, background: "var(--mint)", top: "50%", left: "55%" }} />

      <div className="alien-content">
        <TopBar
          onGlossary={() => setGlossaryOpen(true)}
          onHome={goHome}
          screen={screen}
          score={totalScore}
        />

        {canGoBack && (
          <div className="back-bar">
            <button className="btn btn-back" onClick={goBack} aria-label="Back to previous screen">
              ← Back
            </button>
          </div>
        )}

        {screen === "intro" && <Intro onStart={() => goTo("hub")} />}
        {screen === "hub" && <Hub completed={completedLevels} onPick={goTo} totalScore={totalScore} masteredCount={masteredTerms.size} />}
        {screen === "level1" && <Level1 onDone={(s, t) => { completeLevel(1, s, t); goHome(); }} setLevelBack={setLevelBack} />}
        {screen === "level2" && <Level2 onDone={(s, t) => { completeLevel(2, s, t); goHome(); }} setLevelBack={setLevelBack} />}
        {screen === "level3" && <Level3 onDone={(s, t) => { completeLevel(3, s, t); goHome(); }} setLevelBack={setLevelBack} />}
        {screen === "level4" && <Level4 onDone={(s, t) => { completeLevel(4, s, t); goHome(); }} setLevelBack={setLevelBack} />}
        {screen === "level5" && <Level5 onDone={(s, t) => { completeLevel(5, s, t); goHome(); }} setLevelBack={setLevelBack} />}
        {screen === "boss" && <Boss onDone={(s, t) => { completeLevel(6, s, t); goTo("ending"); }} setLevelBack={setLevelBack} />}
        {screen === "ending" && <Ending score={totalScore} mastered={masteredTerms.size} onRestart={() => setHistory([{ screen: "intro" }])} />}

        {glossaryOpen && <Glossary onClose={() => setGlossaryOpen(false)} mastered={masteredTerms} />}
      </div>
    </div>
  );
}

// ===== TOP BAR =====
function TopBar({ onGlossary, onHome, screen, score }) {
  return (
    <div className="top-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid var(--panel-edge)", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 }}>
      <div className="top-bar-left" style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div className="pulse-dot" />
        <span className="alien-font" style={{ fontSize: 12, letterSpacing: "0.3em" }}>NODE-7B / EARTH-OBS</span>
      </div>
      <div className="top-bar-right" style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <span className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>SALES: <span style={{ color: "var(--mint)" }}>{score}</span></span>
        {screen !== "intro" && <button className="btn" onClick={onHome}>Hub</button>}
        <button className="btn btn-mint" onClick={onGlossary}>Glossary</button>
      </div>
    </div>
  );
}

// ===== INTRO =====
function Intro({ onStart }) {
  return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div className="panel fade-up intro-panel" style={{ maxWidth: 760, padding: "60px 50px", textAlign: "center", position: "relative" }}>
        <div className="corner-tag hide-on-mobile">FILE: HUMAN_BEHAVIOR.OBS</div>
        <div className="scanline" />
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.4em", color: "var(--mint)", marginBottom: 24 }} className="mono">
          ▸ TRANSMISSION INCOMING
        </div>
        <h1 className="title-font glow-text alien-font-h1" style={{ fontSize: "clamp(38px, 8vw, 68px)", color: "var(--pink)", margin: 0, lineHeight: 1.1, letterSpacing: "0.04em" }}>
          Did An Alien<br/>Come Up With That?
        </h1>
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--panel-edge), transparent)", margin: "32px auto 28px", maxWidth: 300 }} />

        <p className="body-text" style={{ margin: "0 auto 18px", maxWidth: 560, fontSize: 16 }}>
          You are an <strong style={{ color: "var(--mint)" }}>alien researcher</strong> studying the strangest behavior in the galaxy: <strong style={{ color: "var(--ink-bright)" }}>why earthlings buy what they buy.</strong>
        </p>

        <p className="body-text" style={{ margin: "0 auto 28px", maxWidth: 560 }}>
          Your mission: change how products are <strong style={{ color: "var(--lav)" }}>classified, branded, packaged, labeled, and warranted</strong> — then launch them at human shoppers. Watch what they buy.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 32, flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={onStart}>BEGIN OBSERVATION ▸</button>
        </div>

        <div className="stage-grid" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8, fontSize: 10, color: "var(--ink-dim)" }}>
          {["LEVEL 1", "LEVEL 2", "LEVEL 3", "LEVEL 4", "LEVEL 5", "BOSS"].map((l) => (
            <div key={l} className="mono" style={{ padding: "8px 10px", border: "1px solid var(--panel-edge)", fontWeight: 700, background: "rgba(0,0,0,0.3)" }}>{l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===== HUB =====
function Hub({ completed, onPick, totalScore, masteredCount }) {
  const levels = [
    { id: "level1", n: "01", t: "What Is This Object?", d: "Tangible & intangible benefits. Discover that a 'product' is more than its physical form.", terms: 3 },
    { id: "level2", n: "02", t: "Classify the Human Desire", d: "Convenience · Shopping · Specialty · Unsought. Match products to purchase behavior.", terms: 5 },
    { id: "level3", n: "03", t: "The Branding Chamber", d: "Brand equity, loyalty, manufacturer/private/captive, family/individual/co-branding.", terms: 12 },
    { id: "level4", n: "04", t: "The Packaging Dream Mall", d: "Packaging functions, persuasive vs informational labeling, UPC, perceived value.", terms: 5 },
    { id: "level5", n: "05", t: "Earth Expansion Trial", d: "Global branding, regional packaging adaptation, express & implied warranties.", terms: 5 },
    { id: "boss", n: "✦", t: "Final: Can Humans Be Made To Want Anything?", d: "You receive a plain rock. Apply everything. Make it irresistible.", terms: 0, boss: true },
  ];

  const allDone = [1,2,3,4,5].every((i) => completed.includes(i));

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em" }}>▸ MISSION HUB / NODE-7B</div>
          <h2 className="title-font glow-text-soft" style={{ fontSize: "clamp(32px, 5vw, 46px)", margin: "8px 0 0", color: "var(--pink)", letterSpacing: "0.04em" }}>Earth Observation Deck</h2>
          <p className="serif" style={{ fontStyle: "italic", color: "var(--ink-dim)", margin: "6px 0 0", fontSize: 15 }}>
            Select a research module. Each completion unlocks deeper consumer mysteries.
          </p>
        </div>
        <div className="panel mono" style={{ padding: "12px 20px", fontSize: 11 }}>
          <div>STAGES_DONE: <span style={{ color: "var(--mint)" }}>{completed.filter(c => c <= 5).length}/5</span></div>
          <div>TERMS_LEARNED: <span style={{ color: "var(--lav)" }}>{masteredCount}/{GLOSSARY.length}</span></div>
          <div>SALES_RECORD: <span style={{ color: "var(--pink)" }}>{totalScore}</span></div>
        </div>
      </div>

      <div className="hub-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {levels.map((lv, i) => {
          const idx = lv.boss ? 6 : i + 1;
          const isDone = completed.includes(idx);
          const locked = lv.boss && !allDone;
          return (
            <div
              key={lv.id}
              className="panel product-card fade-up"
              style={{
                padding: "24px 22px",
                opacity: locked ? 0.4 : 1,
                cursor: locked ? "not-allowed" : "pointer",
                animationDelay: `${i * 0.06}s`,
                borderColor: lv.boss ? "var(--pink)" : "var(--panel-edge)",
              }}
              onClick={() => !locked && onPick(lv.id)}
            >
              <div className="corner-tag">{isDone ? "▣ DONE" : locked ? "✕ LOCKED" : "◯ READY"}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8 }}>
                <span className="alien-font glow-text-soft" style={{ fontSize: 28, color: lv.boss ? "var(--pink)" : "var(--mint)", letterSpacing: "0.05em" }}>{lv.n}</span>
                <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-dim)", letterSpacing: "0.15em" }}>
                  {lv.boss ? "FINAL EXPERIMENT" : `STAGE ${idx}`}
                </span>
              </div>
              <h3 className="serif" style={{ fontSize: 20, margin: "0 0 10px", color: "var(--ink-bright)", fontWeight: 700 }}>{lv.t}</h3>
              <p style={{ fontSize: 14, color: "var(--ink-dim)", lineHeight: 1.65, margin: 0 }}>{lv.d}</p>
              {locked && <p className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--peach)", marginTop: 12, letterSpacing: "0.15em" }}>▸ COMPLETE STAGES 1–5 TO UNLOCK</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===== GLOSSARY =====
function Glossary({ onClose, mastered }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", padding: "20px 14px", overflowY: "auto", backdropFilter: "blur(8px)" }} onClick={onClose}>
      <div className="panel glossary-modal" style={{ margin: "auto", maxWidth: 800, padding: "32px 36px", maxHeight: "90vh", overflowY: "auto", width: "100%" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, position: "sticky", top: 0, background: "var(--panel)", paddingBottom: 12, borderBottom: "1px solid var(--panel-edge)", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: "var(--mint)", letterSpacing: "0.3em" }}>▸ DATABASE/CH10</div>
            <h2 className="alien-font alien-font-h2" style={{ fontSize: 28, margin: "6px 0 0", color: "var(--pink)" }}>Glossary</h2>
            <p className="mono" style={{ fontSize: 11, color: "var(--ink-dim)", margin: "4px 0 0" }}>{mastered.size}/{GLOSSARY.length} terms encountered</p>
          </div>
          <button className="btn" onClick={onClose}>✕ Close</button>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {GLOSSARY.map((g) => {
            const seen = mastered.has(g.term);
            return (
              <div key={g.term} style={{ padding: "12px 16px", borderLeft: `2px solid ${seen ? "var(--mint)" : "var(--panel-edge)"}`, background: "rgba(255,255,255,0.02)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <span className="serif" style={{ fontWeight: 700, fontSize: 16, color: seen ? "var(--mint)" : "var(--ink)" }}>{g.term}</span>
                  {seen && <span className="mono" style={{ fontSize: 9, color: "var(--mint)", letterSpacing: "0.15em" }}>▣ ENCOUNTERED</span>}
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-dim)", marginTop: 4, lineHeight: 1.6 }}>{g.def}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===== LEVEL 1: WHAT IS THIS OBJECT? =====
function Level1({ onDone, setLevelBack }) {
  const [step, setStep] = useState(0); // 0 brief, 1 build, 2 launch, 3 concept, 4 quiz
  const [chosen, setChosen] = useState([]); // attribute keys
  const [quizAns, setQuizAns] = useState(null);

  const product = ALIEN_PRODUCTS[5]; // Anti-Sadness Rock

  const ATTRIBUTES = [
    { key: "size", label: "Pocket-Size Form", type: "tangible", boost: { hype: 5, val: 4 } },
    { key: "color", label: "Iridescent Coloring", type: "tangible", boost: { hype: 8, val: 6 } },
    { key: "package", label: "Velvet Box Packaging", type: "tangible", boost: { val: 18, status: 12 } },
    { key: "feature", label: "Engraved Sigil Feature", type: "tangible", boost: { val: 10, hype: 8 } },
    { key: "service", label: "Curated Cleansing Service", type: "intangible", boost: { val: 14, trust: 8 } },
    { key: "image", label: "Sold Only at Boutique Retailer", type: "intangible", boost: { status: 18, val: 10 } },
    { key: "rep", label: "Famed Manufacturer Reputation", type: "intangible", boost: { trust: 16, val: 12 } },
    { key: "status", label: "Celebrity Endorsement (Status)", type: "intangible", boost: { status: 22, hype: 14 } },
    { key: "emotion", label: "Emotional Meaning Storyline", type: "intangible", boost: { val: 20, hype: 12 } },
  ];

  const toggle = (k) => {
    setChosen((p) => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);
  };

  const meters = useMemo(() => {
    const m = { hype: 8, val: 5, trust: 5, status: 0 };
    chosen.forEach((k) => {
      const a = ATTRIBUTES.find((x) => x.key === k);
      if (!a) return;
      Object.entries(a.boost).forEach(([key, v]) => { m[key] = (m[key] || 0) + v; });
    });
    return m;
  }, [chosen]);

  const tangibleCount = chosen.filter((k) => ATTRIBUTES.find((a) => a.key === k)?.type === "tangible").length;
  const intangibleCount = chosen.filter((k) => ATTRIBUTES.find((a) => a.key === k)?.type === "intangible").length;

  if (step === 0) return (
    <LevelShell title="01 / What Is This Object?" tag="STAGE 01" stepKey={step}>
      <div className="briefing-wrap">
      <Alien accent="var(--pink)">
        Subject material: <em>{product.name}</em>. A rock. We sent rocks before. Humans ignored them. Hypothesis: humans purchase <em>tangible</em> AND <em>intangible</em> benefits. Assemble both. Observe.
      </Alien>
      <p>
        A <strong style={{ color: "var(--mint)" }}>product</strong> is anything received in an exchange — including the physical object AND the meaning, service, status, and reputation around it. Layer attributes onto this rock and launch.
      </p>
      <button className="btn btn-primary" onClick={() => setStep(1)}>ENTER PRODUCT LAB ▸</button>
      </div>
    </LevelShell>
  );

  if (step === 1) return (
    <LevelShell title="01 / Product Design Lab" tag="LAB-A" stepKey={step}>
      <div className="lab-grid" style={{ marginTop: 16 }}>
        <div>
          <div className="panel" style={{ padding: 22, marginBottom: 18, textAlign: "center" }}>
            <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 16 }}>{product.emoji}</div>
            <h3 className="serif" style={{ margin: "0 0 6px", fontSize: 20, color: "var(--ink-bright)" }}>{product.name}</h3>
            <p className="mono" style={{ fontSize: 12, color: "var(--ink-dim)", margin: 0 }}>{product.desc}</p>
          </div>

          <div style={{ marginBottom: 8 }} className="mono"><span style={{ color: "var(--mint)" }}>◆ TANGIBLE BENEFITS</span> <span style={{ fontSize: 10, color: "var(--ink-dim)" }}>(physical attributes)</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8, marginBottom: 16 }}>
            {ATTRIBUTES.filter(a => a.type === "tangible").map((a) => (
              <Toggle key={a.key} active={chosen.includes(a.key)} onClick={() => toggle(a.key)} label={a.label} />
            ))}
          </div>

          <div style={{ marginBottom: 8 }} className="mono"><span style={{ color: "var(--lav)" }}>◆ INTANGIBLE BENEFITS</span> <span style={{ fontSize: 10, color: "var(--ink-dim)" }}>(meaning, status, reputation, service)</span></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 8 }}>
            {ATTRIBUTES.filter(a => a.type === "intangible").map((a) => (
              <Toggle key={a.key} active={chosen.includes(a.key)} onClick={() => toggle(a.key)} label={a.label} accent="var(--lav)" />
            ))}
          </div>
        </div>

        <div className="panel sidebar-sticky" style={{ padding: 18 }}>
          <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.2em", marginBottom: 12 }}>▸ LIVE METERS</div>
          <Meter label="Hype" value={meters.hype} c1="var(--pink)" />
          <Meter label="Perceived Value" value={meters.val} c1="var(--mint)" />
          <Meter label="Trust" value={meters.trust} c1="var(--peach)" />
          <Meter label="Status Pull" value={meters.status} c1="var(--lav)" />
          <div style={{ fontSize: 11, color: "var(--ink-dim)", marginTop: 16, lineHeight: 1.6 }} className="mono">
            TANGIBLE_LAYERS: <span style={{ color: "var(--mint)" }}>{tangibleCount}</span><br/>
            INTANGIBLE_LAYERS: <span style={{ color: "var(--lav)" }}>{intangibleCount}</span>
          </div>
          <button
            className="btn btn-primary"
            disabled={chosen.length < 3}
            style={{ width: "100%", marginTop: 16 }}
            onClick={() => setStep(2)}
          >
            LAUNCH TO EARTH ▸
          </button>
          {chosen.length < 3 && <p className="mono" style={{ fontSize: 10, color: "var(--peach)", marginTop: 8, textAlign: "center" }}>Add at least 3 attributes</p>}
        </div>
      </div>
    </LevelShell>
  );

  if (step === 2) {
    const score = meters.val + meters.hype + meters.status + meters.trust;
    const sales = Math.round(score * 7);
    return (
      <LevelShell title="01 / Earth Launch Results" tag="OBSERVATION" stepKey={step}>
        <div className="panel" style={{ padding: 30, textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em" }}>▸ DATA RETURN</div>
          <div className="alien-font" style={{ fontSize: 56, lineHeight: 1.2, color: "var(--pink)", margin: "16px 0 4px", textShadow: "0 0 32px var(--pink)" }}>{sales}</div>
          <div className="mono" style={{ color: "var(--ink-dim)", letterSpacing: "0.2em", fontSize: 12, fontWeight: 700 }}>UNITS PURCHASED BY HUMAN SUBJECTS</div>
        </div>
        <Alien>
          Humans handled the bare rock. Reaction: <em>"It's a rock."</em> After applying {chosen.length} layers — packaging, story, reputation, status — humans declared it: <em>"essential."</em> Tangible benefits ({tangibleCount}) attracted attention. Intangible benefits ({intangibleCount}) created demand.
        </Alien>
        <button className="btn btn-primary" onClick={() => setStep(3)}>VIEW CONCEPT ▸</button>
      </LevelShell>
    );
  }

  if (step === 3) return (
    <LevelShell title="01 / Concept" tag="CHAPTER 10 INSIGHT" stepKey={step}>
      <div className="panel" style={{ padding: 30 }}>
        <h3 className="serif" style={{ fontSize: 26, color: "var(--mint)", margin: 0 }}>A product is more than the object.</h3>
        <p style={{ color: "var(--ink-dim)", lineHeight: 1.8, marginTop: 14 }}>
          A <strong style={{ color: "var(--ink)" }}>product</strong> is anything received in an exchange. It includes:
        </p>
        <div className="two-col" style={{ marginTop: 12 }}>
          <div style={{ padding: 16, borderLeft: "2px solid var(--mint)" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--mint)", letterSpacing: "0.2em" }}>TANGIBLE</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "6px 0 0" }}>Packaging · Style · Color · Size · Features</p>
          </div>
          <div style={{ padding: 16, borderLeft: "2px solid var(--lav)" }}>
            <div className="mono" style={{ fontSize: 11, color: "var(--lav)", letterSpacing: "0.2em" }}>INTANGIBLE</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "6px 0 0" }}>Service · Retailer image · Manufacturer reputation · Social status · Emotional meaning</p>
          </div>
        </div>
        <p className="serif" style={{ fontStyle: "italic", color: "var(--pink)", marginTop: 18, fontSize: 18 }}>
          "The rock is just a rock until meaning arrives."
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => setStep(4)}>QUIZ CHECKPOINT ▸</button>
    </LevelShell>
  );

  // Quiz
  if (step === 4) {
    const Q = {
      q: "A glowing alien water sells better when boutique-only with a celebrity story attached. The boutique placement and celebrity story are examples of:",
      opts: [
        { t: "Tangible benefits", correct: false, why: "Tangible = physical attributes (size, color, packaging). Story and retailer are not physical." },
        { t: "Intangible benefits", correct: true, why: "Correct. Retailer image and emotional/social meaning are intangible benefits that still drive purchase." },
        { t: "Manufacturing modifications", correct: false, why: "Modifications change the product itself, not the surrounding meaning." },
        { t: "Warranty terms", correct: false, why: "Warranties cover performance/quality guarantees, not status or retailer image." },
      ],
    };
    const ans = quizAns;
    return (
      <LevelShell title="01 / Checkpoint" tag="QUIZ" stepKey={step}>
        <div className="panel" style={{ padding: 24 }}>
          <p className="serif" style={{ fontSize: 18, lineHeight: 1.6, margin: 0 }}>{Q.q}</p>
          <div style={{ display: "grid", gap: 8, marginTop: 18 }}>
            {Q.opts.map((o, i) => (
              <button
                key={i}
                className="btn"
                style={{ textAlign: "left", justifyContent: "flex-start",
                  borderColor: ans !== null ? (o.correct ? "var(--mint)" : (i === ans ? "var(--danger)" : "var(--panel-edge)")) : "var(--panel-edge)",
                  color: ans !== null && o.correct ? "var(--mint)" : "var(--ink)",
                }}
                disabled={ans !== null && Q.opts[ans].correct}
                onClick={() => setQuizAns(i)}
              >
                {String.fromCharCode(65 + i)}. {o.t}
              </button>
            ))}
          </div>
          {ans !== null && (
            <div style={{ marginTop: 16, padding: 14, borderLeft: `2px solid ${Q.opts[ans].correct ? "var(--mint)" : "var(--peach)"}`, background: "rgba(0,0,0,0.4)" }}>
              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: Q.opts[ans].correct ? "var(--mint)" : "var(--peach)", letterSpacing: "0.2em", marginBottom: 6 }}>
                {Q.opts[ans].correct ? "▣ CORRECT" : "◌ NOT QUITE — TRY ANOTHER"}
              </div>
              <p style={{ fontSize: 13, color: "var(--ink-bright)", margin: 0, lineHeight: 1.6 }}>{Q.opts[ans].why}</p>
            </div>
          )}
        </div>
        {ans !== null && Q.opts[ans].correct && (
          <button className="btn btn-primary" onClick={() => onDone(Math.round((meters.val + meters.hype + meters.status) * 7) + (Q.opts[ans].correct ? 50 : 0), ["Product", "Tangible benefits", "Intangible benefits"])}>
            COMPLETE STAGE ▸
          </button>
        )}
      </LevelShell>
    );
  }
}

// ===== LEVEL 2: CLASSIFICATION =====
function Level2({ onDone, setLevelBack }) {
  const [step, setStep] = useState(0);

  // Register back handler with App so global Back works inside this level
  useEffect(() => {
    if (step > 0) {
      setLevelBack(() => () => setStep(step - 1));
    } else {
      setLevelBack(null);
    }
  }, [step]);


  // Register back handler with App so global Back works inside this level
  useEffect(() => {
    if (step > 0) {
      setLevelBack(() => () => setStep(step - 1));
    } else {
      setLevelBack(null);
    }
  }, [step]);

  const [matches, setMatches] = useState({});
  const [shown, setShown] = useState(false);
  const [quizAns, setQuizAns] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const baseProducts = [
    {
      id: "pebble",
      name: "Mood Pebble",
      emoji: "🪨",
      correct: "convenience",
      desc: "Tiny rock in a $1.99 plastic pouch. Sold at every checkout counter across Earth.",
      explain: "Cheap, low effort, impulse buy at checkout = convenience product. Humans grab it without thinking.",
    },
    {
      id: "wellness",
      name: "Wellness Rock Set",
      emoji: "🪨",
      correct: "homog",
      desc: "Mid-priced rock kits. Buyers compare 3-4 brands on price-per-gram and crystal count before choosing.",
      explain: "Mid-priced, similar competing options, compared on price and specs = homogeneous shopping product.",
    },
    {
      id: "designer",
      name: "Designer Mood Stone",
      emoji: "🪨",
      correct: "heter",
      desc: "Hand-carved rocks in 12 colors and 8 shapes. Each one feels different. Buyers visit multiple stores to find the right vibe.",
      explain: "Distinct styles, quality variations, compared by aesthetic feel = heterogeneous shopping product.",
    },
    {
      id: "aether",
      name: "Aether Stone (Limited Edition)",
      emoji: "🪨",
      correct: "specialty",
      desc: "Only 100 made per year. Sold at one boutique. Buyers travel across continents and refuse substitutes.",
      explain: "Rare, high loyalty, no acceptable substitutes, buyers exert special effort = specialty product.",
    },
    {
      id: "crisis",
      name: "Crisis Anti-Despair Rock",
      emoji: "🪨",
      correct: "unsought",
      desc: "Marketed via emergency hotlines. Humans avoid thinking about it. Heavy persuasion required to sell.",
      explain: "New/avoided/sold via aggressive emotional appeals = unsought product.",
    },
  ];

  const baseCategories = [
    { id: "convenience", label: "Convenience", desc: "inexpensive, low effort", c: "var(--mint)" },
    { id: "homog", label: "Homogeneous Shopping", desc: "compare price/features", c: "var(--peach)" },
    { id: "heter", label: "Heterogeneous Shopping", desc: "compare style/quality", c: "var(--yellow)" },
    { id: "specialty", label: "Specialty", desc: "unique, high loyalty", c: "var(--pink)" },
    { id: "unsought", label: "Unsought", desc: "avoided, aggressive selling", c: "var(--lav)" },
  ];

  // Shuffle once per level mount — stable across re-renders
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const products = useMemo(() => shuffle(baseProducts), []);
  const categories = useMemo(() => shuffle(baseCategories), []);

  // Auto-select first product (in shuffled order) when entering matching step
  useEffect(() => {
    if (step === 1 && !selectedProduct && products.length) {
      setSelectedProduct(products[0].id);
    }
  }, [step, products, selectedProduct]);

  if (step === 0) return (
    <LevelShell title="02 / Classify the Human Desire" tag="STAGE 02" stepKey={step}>
      <div className="briefing-wrap">
      <Alien accent="var(--peach)">
        We took the same Anti-Sadness Rock and gave it to five different teams. Each repackaged, repriced, and resold it as a <em>different kind of product</em>. Humans reacted in five different ways.
      </Alien>
      <p className="serif">
        The same rock can be a cheap convenience item, a comparison-shopped wellness kit, a designer luxury, an ultra-rare collectible, or an avoided emergency purchase. <strong style={{ color: "var(--ink)" }}>Classification isn't about the object — it's about how it's positioned.</strong>
      </p>
      <p className="serif">
        Note that <strong style={{ color: "var(--ink)" }}>shopping products</strong> split into two: homogeneous (compared on price/features) and heterogeneous (compared on style/quality).
      </p>
      <button className="btn btn-primary" onClick={() => setStep(1)}>BEGIN CLASSIFICATION ▸</button>
      </div>
    </LevelShell>
  );

  if (step === 1) {
    const allMatched = products.every((p) => matches[p.id]);
    return (
      <LevelShell title="02 / Classification Console" tag="LAB-B" stepKey={step}>
        <p className="mono" style={{ fontSize: 13, color: "var(--ink-bright)", marginBottom: 16, fontWeight: 600 }}>
          ▸ Five rock variants. Same object, different positioning. Tap the category that matches how humans buy each one.
        </p>

        {/* Reference card showing categories at the top - so player remembers what they mean */}
        <div className="panel" style={{ padding: 16, marginBottom: 18, background: "rgba(0,0,0,0.5)" }}>
          <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--lav)", letterSpacing: "0.2em", marginBottom: 10 }}>▸ CATEGORY REFERENCE</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
            {categories.map((c) => (
              <div key={c.id} style={{ padding: "8px 10px", borderLeft: `3px solid ${c.c}`, background: "rgba(255,255,255,0.02)" }}>
                <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: c.c }}>{c.label}</div>
                <div style={{ fontSize: 11, color: "var(--ink-dim)", marginTop: 2 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product cards with inline category pickers */}
        <div style={{ display: "grid", gap: 12 }}>
          {products.map((p, idx) => {
            const m = matches[p.id];
            const cat = categories.find((c) => c.id === m);
            const correct = shown ? m === p.correct : null;
            return (
              <div
                key={p.id}
                className="panel"
                style={{
                  padding: 16,
                  borderColor: shown
                    ? (correct ? "var(--mint)" : "var(--danger)")
                    : (m ? cat?.c : "var(--panel-edge)"),
                  borderWidth: m && !shown ? 2 : 1,
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  <span style={{ fontSize: 32, lineHeight: 1 }}>{p.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-faint)", letterSpacing: "0.15em" }}>#{idx + 1}</span>
                      <span className="serif" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink-bright)" }}>{p.name}</span>
                    </div>
                    <div style={{ fontSize: 13, color: "var(--ink-dim)", lineHeight: 1.55, marginTop: 4 }}>{p.desc}</div>
                  </div>
                </div>

                {/* Category buttons row - the player taps one here */}
                {!shown && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 6, marginTop: 14 }}>
                    {categories.map((c) => {
                      const picked = m === c.id;
                      return (
                        <button
                          key={c.id}
                          className="btn"
                          onClick={() => setMatches((x) => ({ ...x, [p.id]: c.id }))}
                          style={{
                            padding: "10px 10px",
                            fontSize: 11,
                            letterSpacing: "0.04em",
                            textAlign: "center",
                            borderColor: picked ? c.c : "var(--panel-edge)",
                            color: picked ? c.c : "var(--ink-dim)",
                            background: picked ? `${c.c}15` : "rgba(20, 14, 32, 0.7)",
                            fontWeight: picked ? 700 : 500,
                          }}
                        >
                          {c.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Selected-state confirmation chip */}
                {m && !shown && (
                  <div className="mono" style={{ fontSize: 11, fontWeight: 700, marginTop: 10, color: cat?.c, letterSpacing: "0.1em" }}>
                    ▸ CLASSIFIED AS {cat?.label.toUpperCase()}
                  </div>
                )}

                {/* Feedback after evaluation */}
                {shown && (
                  <div style={{ marginTop: 12, padding: 12, borderLeft: `3px solid ${correct ? "var(--mint)" : "var(--peach)"}`, background: "rgba(0,0,0,0.4)" }}>
                    <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: correct ? "var(--mint)" : "var(--peach)", letterSpacing: "0.2em", marginBottom: 4 }}>
                      {correct ? "▣ CORRECT" : `◌ ANSWER: ${categories.find(c => c.id === p.correct)?.label.toUpperCase()}`}
                    </div>
                    <p style={{ fontSize: 12, margin: 0, color: "var(--ink-bright)", lineHeight: 1.55 }}>{p.explain}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {!shown && <button className="btn btn-primary" disabled={!allMatched} onClick={() => setShown(true)}>EVALUATE MATCHES ▸</button>}
          {shown && <button className="btn btn-primary" onClick={() => setStep(2)}>VIEW CONCEPT ▸</button>}
          {!shown && Object.keys(matches).length > 0 && <button className="btn" onClick={() => { setMatches({}); setSelectedProduct(null); }}>↺ Reset</button>}
        </div>
      </LevelShell>
    );
  }

  if (step === 2) return (
    <LevelShell title="02 / Concept" tag="CHAPTER 10 INSIGHT" stepKey={step}>
      <div className="panel" style={{ padding: 30 }}>
        <h3 className="serif" style={{ fontSize: 24, color: "var(--mint)", margin: 0 }}>Four ways humans buy.</h3>
        <p style={{ color: "var(--ink-dim)", lineHeight: 1.7, marginTop: 12, fontSize: 14 }}>
          The rock was always the same rock. But by changing <strong style={{ color: "var(--ink-bright)" }}>price, distribution, scarcity, and emotional framing</strong>, it became four entirely different kinds of product to humans.
        </p>
        <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
          {[
            { t: "Convenience product", c: "var(--mint)", d: "Inexpensive, low effort, easy purchase. Bought routinely with little thought." },
            { t: "Shopping product", c: "var(--peach)", d: "Consumers compare options. Homogeneous: similar items on price/features. Heterogeneous: distinct items on style/quality." },
            { t: "Specialty product", c: "var(--pink)", d: "Unique, desirable, high loyalty. Customers go out of their way to buy." },
            { t: "Unsought product", c: "var(--lav)", d: "New, ignored, or avoided. Requires aggressive selling, education, or emotion." },
          ].map((x) => (
            <div key={x.t} style={{ padding: 14, borderLeft: `2px solid ${x.c}` }}>
              <div className="serif" style={{ fontWeight: 700, color: x.c }}>{x.t}</div>
              <div style={{ fontSize: 13, color: "var(--ink-dim)", marginTop: 4 }}>{x.d}</div>
            </div>
          ))}
        </div>
        <p className="serif" style={{ fontStyle: "italic", color: "var(--pink)", marginTop: 20, fontSize: 16, lineHeight: 1.5 }}>
          Classification follows positioning. The marketer chooses the category.
        </p>
      </div>
      <button className="btn btn-primary" onClick={() => setStep(3)}>QUIZ CHECKPOINT ▸</button>
    </LevelShell>
  );

  if (step === 3) {
    const Q = {
      q: "A human travels three planets just to buy ONE specific glowing watch. Refuses substitutes. This is a:",
      opts: [
        { t: "Convenience product", correct: false, why: "Convenience = low effort. Three planets is high effort." },
        { t: "Homogeneous shopping product", correct: false, why: "Homogeneous shopping involves comparison. This human won't even consider alternatives." },
        { t: "Specialty product", correct: true, why: "Correct. Special effort + brand loyalty + no acceptable substitutes = specialty product." },
        { t: "Unsought product", correct: false, why: "Unsought = avoided. The human is actively seeking it." },
      ],
    };
    const score = products.filter((p) => matches[p.id] === p.correct).length;
    return (
      <LevelShell title="02 / Checkpoint" tag="QUIZ" stepKey={step}>
        <div className="panel" style={{ padding: 24 }}>
          <p className="serif" style={{ fontSize: 18 }}>{Q.q}</p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {Q.opts.map((o, i) => (
              <button key={i} className="btn" disabled={quizAns !== null && Q.opts[quizAns].correct} onClick={() => setQuizAns(i)}
                style={{ textAlign: "left",
                  borderColor: quizAns !== null ? (o.correct ? "var(--mint)" : (i === quizAns ? "var(--danger)" : "var(--panel-edge)")) : "var(--panel-edge)",
                }}>
                {String.fromCharCode(65 + i)}. {o.t}
              </button>
            ))}
          </div>
          {quizAns !== null && (
            <div style={{ marginTop: 16, padding: 14, borderLeft: `2px solid ${Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)"}`, background: "rgba(0,0,0,0.4)" }}>
              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)", letterSpacing: "0.2em", marginBottom: 6 }}>
                {Q.opts[quizAns].correct ? "▣ CORRECT" : "◌ NOT QUITE — TRY ANOTHER"}
              </div>
              <p style={{ fontSize: 13, margin: 0, color: "var(--ink-bright)", lineHeight: 1.6 }}>{Q.opts[quizAns].why}</p>
            </div>
          )}
        </div>
        {quizAns !== null && Q.opts[quizAns].correct && (
          <button className="btn btn-primary" onClick={() => onDone(score * 80 + (Q.opts[quizAns].correct ? 60 : 0), ["Convenience product", "Shopping product", "Homogeneous shopping product", "Heterogeneous shopping product", "Specialty product", "Unsought product"])}>
            COMPLETE STAGE ▸
          </button>
        )}
      </LevelShell>
    );
  }
}

// ===== LEVEL 3: BRANDING =====
function Level3({ onDone, setLevelBack }) {
  const [step, setStep] = useState(0);

  // Register back handler with App so global Back works inside this level
  useEffect(() => {
    if (step > 0) {
      setLevelBack(() => () => setStep(step - 1));
    } else {
      setLevelBack(null);
    }
  }, [step]);

  const [choices, setChoices] = useState({});
  const [quizAns, setQuizAns] = useState(null);

  const decisions = [
    {
      id: "scope",
      q: "How will the Anti-Sadness Rock relate to your other products (Anti-Anxiety Rock, Anti-Boredom Rock)?",
      opts: [
        { t: "Each rock gets its OWN unique brand name", v: "individual", explain: "INDIVIDUAL BRANDING — separate names protect each line if one fails." },
        { t: "All rocks share one family name (e.g., 'Aether Stones')", v: "family", explain: "FAMILY BRANDING — shared equity, faster trust transfer between products." },
        { t: "Combine with Galactic Crystals Co. on the label", v: "co", explain: "CO-BRANDING — two brands signal combined credibility/audience." },
      ],
    },
    {
      id: "owner",
      q: "Who owns the brand on the shelf?",
      opts: [
        { t: "Your alien factory makes & brands it (Moonlit Co.)", v: "manuf", explain: "MANUFACTURER'S BRAND — owned by the producer." },
        { t: "Galactic Mart slaps their store name on it", v: "private", explain: "PRIVATE BRAND — owned by the retailer." },
        { t: "Hidden brand only at one store, no obvious link", v: "captive", explain: "CAPTIVE BRAND — sold only at one retailer with no obvious retailer connection." },
      ],
    },
    {
      id: "legal",
      q: "Legal protection for the brand?",
      opts: [
        { t: "Trademark the name & symbol", v: "tm", explain: "TRADEMARK — legal protection for brand names/symbols." },
        { t: "Service mark (since you also offer cleansing service)", v: "sm", explain: "SERVICE MARK — legal protection for SERVICES, not goods." },
        { t: "Skip protection — let the name go generic", v: "gen", explain: "GENERIC PRODUCT NAME risk — when a brand becomes the everyday term for the category, you lose exclusive rights." },
      ],
    },
  ];

  const meters = useMemo(() => {
    let equity = 20, loyalty = 15, clarity = 60;
    if (choices.scope === "family") { equity += 30; loyalty += 25; }
    if (choices.scope === "individual") { equity += 10; clarity += 15; }
    if (choices.scope === "co") { equity += 25; clarity -= 10; }
    if (choices.owner === "manuf") { equity += 20; loyalty += 15; }
    if (choices.owner === "private") { equity += 10; }
    if (choices.owner === "captive") { equity += 15; loyalty += 5; }
    if (choices.legal === "tm" || choices.legal === "sm") { clarity += 25; equity += 10; }
    if (choices.legal === "gen") { clarity -= 25; equity -= 15; }
    return { equity, loyalty, clarity };
  }, [choices]);

  if (step === 0) return (
    <LevelShell title="03 / The Branding Chamber" tag="STAGE 03" stepKey={step}>
      <div className="briefing-wrap">
      <Alien accent="var(--lav)">
        Subject confirms: humans assign more value to objects with <em>names</em>. The rock now has tangible AND intangible benefits. It still has no name. Construct identity. Words and symbols increase brand equity. Brand equity increases purchases.
      </Alien>
      <p className="serif">
        A <strong style={{ color: "var(--mint)" }}>brand</strong> is a name, term, symbol, or design that identifies and differentiates the product. The pronounceable part is the <strong style={{ color: "var(--ink)" }}>brand name</strong>; the visual is the <strong style={{ color: "var(--ink)" }}>brand mark</strong>. Strong brands accumulate <strong style={{ color: "var(--ink)" }}>brand equity</strong> — value created by recognition and loyalty.
      </p>
      <p className="serif">
        Build a brand around the Anti-Sadness Rock you've been studying.
      </p>
      <button className="btn btn-primary" onClick={() => setStep(1)}>ENTER BRANDING LAB ▸</button>
      </div>
    </LevelShell>
  );

  if (step === 1) {
    const allDone = decisions.every((d) => choices[d.id]);
    return (
      <LevelShell title="03 / Branding Lab" tag="LAB-C" stepKey={step}>
        <div className="lab-grid">
          <div>
            {decisions.map((d, i) => (
              <div key={d.id} className="panel fade-up" style={{ padding: 20, marginBottom: 14, animationDelay: `${i*0.1}s` }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.2em", marginBottom: 6 }}>DECISION {i+1}</div>
                <p className="serif" style={{ fontSize: 16, margin: "0 0 12px" }}>{d.q}</p>
                <div style={{ display: "grid", gap: 8 }}>
                  {d.opts.map((o) => {
                    const picked = choices[d.id] === o.v;
                    return (
                      <button key={o.v} className="btn"
                        style={{ textAlign: "left", borderColor: picked ? "var(--pink)" : "var(--panel-edge)", color: picked ? "var(--pink)" : "var(--ink)" }}
                        onClick={() => setChoices((x) => ({ ...x, [d.id]: o.v }))}>
                        {o.t}
                      </button>
                    );
                  })}
                </div>
                {choices[d.id] && (
                  <div className="mono" style={{ marginTop: 10, fontSize: 11, color: "var(--mint)", letterSpacing: "0.1em" }}>
                    ▸ {d.opts.find((o) => o.v === choices[d.id]).explain}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="panel sidebar-sticky" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.2em", marginBottom: 12 }}>▸ BRAND DIAGNOSTICS</div>
            <Meter label="Brand Equity" value={meters.equity} c1="var(--pink)" />
            <Meter label="Brand Loyalty" value={meters.loyalty} c1="var(--mint)" />
            <Meter label="Brand Clarity" value={meters.clarity} c1="var(--lav)" />
            <button className="btn btn-primary" disabled={!allDone} style={{ width: "100%", marginTop: 16 }} onClick={() => setStep(2)}>
              VIEW REACTIONS ▸
            </button>
          </div>
        </div>
      </LevelShell>
    );
  }

  if (step === 2) {
    // Build rich, contextual reactions for each segment based on player's choices
    const buildReactions = () => {
      const reactions = [];

      // STATUS HUMANS - care about exclusivity and prestige
      let statusReaction = "";
      if (choices.scope === "co") {
        statusReaction = "Bought in waves. A co-branded collab signals cultural relevance and 'limited drop' energy — exactly what status buyers crave for social signaling.";
      } else if (choices.owner === "captive") {
        statusReaction = "Intrigued. A hidden brand at one exclusive retailer feels insider — like a secret only certain shoppers know about. Perceived exclusivity raises desire.";
      } else if (choices.scope === "individual") {
        statusReaction = "Moderate interest. A unique standalone brand can feel premium, but without a clear status signal (collab, exclusivity, scarcity), they hesitate.";
      } else {
        statusReaction = "Lukewarm. Family branding and broad availability feel too 'everyone has it' for status buyers. They want rarity.";
      }
      reactions.push({ seg: "status", reaction: statusReaction });

      // PARENT HUMANS - care about trust, safety, and proven quality
      let parentReaction = "";
      if (choices.legal === "tm") {
        parentReaction = "High trust. The trademark proves the brand is legitimate and accountable — exactly what parents look for when buying anything for their family.";
      } else if (choices.legal === "sm") {
        parentReaction = "Trusting, especially the service guarantee. Parents read fine print and reward brands that stand behind what they sell.";
      } else {
        parentReaction = "Suspicious. Without legal protection, parents worry about quality, recalls, and accountability. They'd rather pay more for a brand they can hold responsible.";
      }
      reactions.push({ seg: "parent", reaction: parentReaction });

      // CONVENIENCE HUMANS - want fast, familiar, low-effort decisions
      let convenienceReaction = "";
      if (choices.scope === "family") {
        convenienceReaction = "Easy yes. They already trust the Aether Stones family name from a previous purchase. No research needed — they recognize the umbrella brand and grab it.";
      } else if (choices.scope === "individual") {
        convenienceReaction = "Hesitant. A brand new individual brand name means starting trust from zero. Convenience shoppers don't have time to vet unknown names.";
      } else {
        convenienceReaction = "Neutral. Co-branding adds complexity. Convenience buyers want simple, familiar, fast — anything that requires interpretation slows them down.";
      }
      reactions.push({ seg: "convenience", reaction: convenienceReaction });

      // TECH HUMANS - care about transparency, source, and provenance
      let techReaction = "";
      if (choices.owner === "manuf") {
        techReaction = "Endorsed. A clear manufacturer brand means traceable supply chain and direct accountability. Tech buyers love knowing exactly who made what.";
      } else if (choices.owner === "private") {
        techReaction = "Skeptical. Store brands hide the actual manufacturer. Tech buyers want to know the source and won't trust an opaque retailer-only label.";
      } else {
        techReaction = "Mixed. Captive brands feel mysterious — interesting to some, but tech buyers prefer transparent supply chains over secret manufacturer arrangements.";
      }
      reactions.push({ seg: "tech", reaction: techReaction });

      // WELLNESS HUMANS - bonus segment based on co-branding
      let wellnessReaction = "";
      if (choices.scope === "family" && choices.owner === "manuf") {
        wellnessReaction = "Strong adoption. A trusted producer with a cohesive family line feels intentional and curated — the wellness aesthetic.";
      } else if (choices.scope === "co") {
        wellnessReaction = "Cautious. Co-branding can feel commercial. Wellness humans prefer brands that feel pure, mission-driven, and singular.";
      } else {
        wellnessReaction = "Moderate. They like the calming brand promise but want more signals of authenticity (origin story, ingredient transparency, certifications).";
      }
      reactions.push({ seg: "wellness", reaction: wellnessReaction });

      return reactions;
    };

    const reactions = buildReactions();

    return (
      <LevelShell title="03 / Human Reaction Screen" tag="OBSERVATION" stepKey={step}>
        <p className="mono" style={{ fontSize: 13, color: "var(--ink-bright)", marginBottom: 16, fontWeight: 600 }}>
          ▸ Five human segments responded to your branding choices. Different priorities, different reactions.
        </p>
        <div style={{ display: "grid", gap: 12 }}>
          {reactions.map((r) => {
            const s = SEGMENTS[r.seg];
            return (
              <div key={r.seg} className="panel" style={{ padding: 18, borderLeft: `3px solid ${s.color}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
                  <div>
                    <div className="serif" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink-bright)" }}>{s.name}</div>
                    <div className="mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-faint)", letterSpacing: "0.1em", marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-dim)", margin: 0, lineHeight: 1.65 }}>{r.reaction}</p>
              </div>
            );
          })}
        </div>
        <button className="btn btn-primary" onClick={() => setStep(3)}>VIEW CONCEPT ▸</button>
      </LevelShell>
    );
  }

  if (step === 3) return (
    <LevelShell title="03 / Concept" tag="CHAPTER 10 INSIGHT" stepKey={step}>
      <div className="panel" style={{ padding: 28 }}>
        <h3 className="serif" style={{ color: "var(--mint)", margin: 0, fontSize: 24 }}>Branding architecture, decoded.</h3>
        <div className="two-col" style={{ gap: 14, marginTop: 14 }}>
          {[
            ["Brand", "Name + symbol + design that differentiates."],
            ["Brand name", "The pronounceable part."],
            ["Brand mark", "The visual symbol."],
            ["Brand equity", "Value from recognition + loyalty."],
            ["Brand loyalty", "Repeat buying, even when alternatives are cheaper."],
            ["Global brand", "Same brand across many markets."],
            ["Manufacturer's brand", "Owned by producer."],
            ["Private brand", "Owned by retailer."],
            ["Captive brand", "Retailer-exclusive but doesn't look like it."],
            ["Individual branding", "Each product, its own name."],
            ["Family branding", "Shared name across products."],
            ["Co-branding", "Two brands, one product."],
            ["Trademark", "Legal protection for names/symbols."],
            ["Service mark", "Legal protection for services."],
            ["Generic product name", "Brand → category word (loses exclusivity)."],
          ].map(([t, d]) => (
            <div key={t} style={{ padding: 12, borderLeft: "2px solid var(--lav)" }}>
              <div className="serif" style={{ fontWeight: 700, color: "var(--lav)", fontSize: 14 }}>{t}</div>
              <div style={{ fontSize: 12, color: "var(--ink-dim)", marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => setStep(4)}>QUIZ CHECKPOINT ▸</button>
    </LevelShell>
  );

  if (step === 4) {
    const Q = {
      q: "Galactic Mart sells 'Stellar Sips' bottled water. Stellar Sips is only sold at Galactic Mart, but the label says nothing about the store. Stellar Sips is a:",
      opts: [
        { t: "Manufacturer's brand", correct: false, why: "Manufacturer's brand is owned by the producer and obvious." },
        { t: "Private brand", correct: false, why: "Private brand carries the retailer's name openly (e.g., Kirkland)." },
        { t: "Captive brand", correct: true, why: "Correct. Captive brand = retailer-exclusive but no obvious retailer connection." },
        { t: "Co-branded product", correct: false, why: "Co-branding requires two visible brands." },
      ],
    };
    return (
      <LevelShell title="03 / Checkpoint" tag="QUIZ" stepKey={step}>
        <div className="panel" style={{ padding: 24 }}>
          <p className="serif" style={{ fontSize: 18 }}>{Q.q}</p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {Q.opts.map((o, i) => (
              <button key={i} className="btn" disabled={quizAns !== null && Q.opts[quizAns].correct} onClick={() => setQuizAns(i)}
                style={{ textAlign: "left",
                  borderColor: quizAns !== null ? (o.correct ? "var(--mint)" : (i === quizAns ? "var(--danger)" : "var(--panel-edge)")) : "var(--panel-edge)",
                }}>
                {String.fromCharCode(65+i)}. {o.t}
              </button>
            ))}
          </div>
          {quizAns !== null && <div style={{ padding: 14, marginTop: 14, borderLeft: `2px solid ${Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)"}`, background: "rgba(0,0,0,0.4)" }}>
            <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)", letterSpacing: "0.2em", marginBottom: 6 }}>
              {Q.opts[quizAns].correct ? "▣ CORRECT" : "◌ NOT QUITE — TRY ANOTHER"}
            </div>
            <p style={{ fontSize: 13, margin: 0, color: "var(--ink-bright)", lineHeight: 1.6 }}>{Q.opts[quizAns].why}</p>
          </div>}
        </div>
        {quizAns !== null && Q.opts[quizAns].correct && <button className="btn btn-primary" onClick={() => onDone(meters.equity * 4 + meters.loyalty * 3 + (Q.opts[quizAns].correct ? 60 : 0), ["Brand", "Brand name", "Brand mark", "Brand equity", "Brand loyalty", "Manufacturer's brand", "Private brand", "Captive brand", "Individual branding", "Family branding", "Co-branding", "Trademark", "Service mark", "Generic product name", "Global brand"])}>
          COMPLETE STAGE ▸
        </button>}
      </LevelShell>
    );
  }
}

// ===== LEVEL 4: PACKAGING =====
function Level4({ onDone, setLevelBack }) {
  const [step, setStep] = useState(0);

  // Register back handler with App so global Back works inside this level
  useEffect(() => {
    if (step > 0) {
      setLevelBack(() => () => setStep(step - 1));
    } else {
      setLevelBack(null);
    }
  }, [step]);

  const [pkg, setPkg] = useState({ aesthetic: null, label: null, eco: null, upc: null });
  const [quizAns, setQuizAns] = useState(null);

  const aestheticOpts = [
    { v: "matte", t: "Matte minimal box", desc: "+perceived value, +status humans" },
    { v: "neon", t: "Neon plastic clamshell", desc: "+convenience humans, -status" },
    { v: "natural", t: "Linen-wrapped natural look", desc: "+wellness humans, +trust" },
  ];
  const labelOpts = [
    { v: "persuasive", t: "Persuasive labeling", desc: "'Aligned with your emotional frequency.'", explain: "PERSUASIVE LABELING — designed to influence purchase via emotion/lifestyle." },
    { v: "informational", t: "Informational labeling", desc: "Ingredients, instructions, warnings.", explain: "INFORMATIONAL LABELING — facts to support informed choice." },
    { v: "both", t: "Mix of both", desc: "Hero claim + factual back panel.", explain: "Many real packages combine both — emotional front, informational back." },
  ];
  const ecoOpts = [
    { v: "yes", t: "Recyclable & compostable", desc: "+wellness, +parent humans" },
    { v: "no", t: "Single-use plastic", desc: "+cheap to produce, -trust" },
  ];
  const upcOpts = [
    { v: "yes", t: "Include UPC barcode", desc: "Scannable. Inventory-ready." },
    { v: "no", t: "No UPC", desc: "Looks 'artisan' but retailers refuse stock." },
  ];

  const meters = useMemo(() => {
    let val = 20, trust = 30, hype = 20;
    if (pkg.aesthetic === "matte") { val += 35; }
    if (pkg.aesthetic === "natural") { trust += 25; val += 15; }
    if (pkg.aesthetic === "neon") { hype += 20; val -= 10; }
    if (pkg.label === "persuasive") { hype += 30; trust -= 5; }
    if (pkg.label === "informational") { trust += 30; }
    if (pkg.label === "both") { hype += 20; trust += 20; }
    if (pkg.eco === "yes") { trust += 15; val += 10; }
    if (pkg.upc === "yes") { trust += 10; val += 10; }
    if (pkg.upc === "no") { trust -= 15; }
    return { val, trust, hype };
  }, [pkg]);

  if (step === 0) return (
    <LevelShell title="04 / The Packaging Dream Mall" tag="STAGE 04" stepKey={step}>
      <div className="briefing-wrap">
      <Alien accent="var(--peach)">
        Hypothesis confirmed in 412 trials: <em>identical contents</em> in different packaging produce different human responses. Packaging contains, protects, promotes, aids storage, and reduces waste. It also <em>signals meaning</em>.
      </Alien>
      <p className="serif">
        The Anti-Sadness Rock now has a brand. Time to design its packaging. Choose aesthetic, labeling style, eco-impact, and whether to add a <strong style={{ color: "var(--ink)" }}>UPC</strong> (Universal Product Code) for retail scanning.
      </p>
      <button className="btn btn-primary" onClick={() => setStep(1)}>ENTER PACKAGING LAB ▸</button>
      </div>
    </LevelShell>
  );

  if (step === 1) {
    const allDone = pkg.aesthetic && pkg.label && pkg.eco && pkg.upc;
    return (
      <LevelShell title="04 / Packaging Lab" tag="LAB-D" stepKey={step}>
        <div className="lab-grid">
          <div>
            {[
              { key: "aesthetic", title: "1. Aesthetic / Style", opts: aestheticOpts },
              { key: "label", title: "2. Labeling Approach", opts: labelOpts },
              { key: "eco", title: "3. Environmental Impact", opts: ecoOpts },
              { key: "upc", title: "4. Universal Product Code (UPC)", opts: upcOpts },
            ].map((sec) => (
              <div key={sec.key} className="panel" style={{ padding: 18, marginBottom: 12 }}>
                <div className="mono" style={{ fontSize: 11, color: "var(--peach)", letterSpacing: "0.2em", marginBottom: 8 }}>{sec.title}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
                  {sec.opts.map((o) => {
                    const picked = pkg[sec.key] === o.v;
                    return (
                      <button key={o.v} className="btn"
                        style={{ textAlign: "left", borderColor: picked ? "var(--peach)" : "var(--panel-edge)", color: picked ? "var(--peach)" : "var(--ink)" }}
                        onClick={() => setPkg((p) => ({ ...p, [sec.key]: o.v }))}>
                        <div style={{ fontSize: 12 }}>{o.t}</div>
                        <div style={{ fontSize: 10, color: "var(--ink-dim)", textTransform: "none", letterSpacing: 0, marginTop: 4, fontFamily: "'Fraunces', serif" }}>{o.desc}</div>
                      </button>
                    );
                  })}
                </div>
                {sec.key === "label" && pkg.label && (
                  <div className="mono" style={{ fontSize: 10, color: "var(--mint)", marginTop: 10, letterSpacing: "0.1em" }}>
                    ▸ {labelOpts.find((o) => o.v === pkg.label).explain}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="panel sidebar-sticky" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.2em", marginBottom: 12 }}>▸ PACKAGING METERS</div>
            <Meter label="Perceived Value" value={meters.val} c1="var(--mint)" />
            <Meter label="Trust" value={meters.trust} c1="var(--peach)" />
            <Meter label="Hype" value={meters.hype} c1="var(--pink)" />
            <button className="btn btn-primary" disabled={!allDone} style={{ width: "100%", marginTop: 16 }} onClick={() => setStep(2)}>LAUNCH PACKAGED ROCK ▸</button>
          </div>
        </div>
      </LevelShell>
    );
  }

  if (step === 2) {
    // Calculate per-segment sales based on packaging choices
    const segmentResults = [
      {
        seg: "status",
        score: (pkg.aesthetic === "matte" ? 60 : pkg.aesthetic === "natural" ? 20 : 5) + (pkg.label === "persuasive" ? 20 : pkg.label === "both" ? 15 : 5),
      },
      {
        seg: "wellness",
        score: (pkg.aesthetic === "natural" ? 60 : pkg.aesthetic === "matte" ? 20 : 5) + (pkg.eco === "yes" ? 25 : 0) + (pkg.label === "persuasive" ? 15 : pkg.label === "both" ? 20 : 10),
      },
      {
        seg: "parent",
        score: (pkg.label === "informational" ? 40 : pkg.label === "both" ? 30 : 5) + (pkg.eco === "yes" ? 20 : 0) + (pkg.upc === "yes" ? 15 : 0),
      },
      {
        seg: "convenience",
        score: (pkg.aesthetic === "neon" ? 40 : 20) + (pkg.upc === "yes" ? 30 : -10) + (pkg.label === "informational" ? 5 : 15),
      },
      {
        seg: "tech",
        score: (pkg.label === "informational" ? 35 : pkg.label === "both" ? 25 : 10) + (pkg.upc === "yes" ? 25 : -5) + (pkg.aesthetic === "matte" ? 15 : 5),
      },
    ];
    const totalSales = segmentResults.reduce((sum, r) => sum + Math.max(0, r.score) * 6, 0);

    const reactionFor = (seg, score) => {
      const reactions = {
        status: {
          high: `Status humans bought immediately. The ${pkg.aesthetic === "matte" ? "matte minimal" : pkg.aesthetic === "natural" ? "natural linen" : "neon clamshell"} aesthetic reads as ${pkg.aesthetic === "matte" ? "premium and curated" : pkg.aesthetic === "natural" ? "intentional and editorial" : "unfortunately mass-market"}. ${pkg.label === "persuasive" ? "Persuasive lifestyle copy made it Instagrammable." : ""}`,
          mid: `Lukewarm. The packaging doesn't say 'I'm exclusive' loudly enough. Status buyers want visual signals of rarity and prestige.`,
          low: `Ignored. The ${pkg.aesthetic === "neon" ? "neon clamshell" : "current aesthetic"} signals cheap or commodity — anti-status. Status humans walked past it.`,
        },
        wellness: {
          high: `Strong adoption. The ${pkg.aesthetic === "natural" ? "linen-wrapped natural look" : "aesthetic"}${pkg.eco === "yes" ? " plus recyclable packaging" : ""} aligns with wellness values: calm, intentional, earth-friendly. ${pkg.label !== "informational" ? "Persuasive copy reinforced emotional benefits." : ""}`,
          mid: `Curious. ${pkg.eco === "yes" ? "The eco packaging helps, but" : "Without eco-credentials,"} wellness buyers want more cues of authenticity and clean design.`,
          low: `Rejected. ${pkg.eco === "no" ? "Single-use plastic kills credibility." : "The aesthetic feels too corporate."} Wellness humans avoid brands that don't match their identity.`,
        },
        parent: {
          high: `High trust. ${pkg.label === "informational" || pkg.label === "both" ? "Clear factual labeling" : "Detailed information"} reassures parents about safety and quality. ${pkg.eco === "yes" ? "Eco-friendly packaging adds bonus trust points." : ""}${pkg.upc === "yes" ? " Scannable UPC means it's verified-retail." : ""}`,
          mid: `Hesitant. Parents want more reassurance — clearer ingredient lists, warnings, and proof of legitimate retail distribution.`,
          low: `Skeptical. ${pkg.label === "persuasive" ? "Pure marketing copy with no facts feels like a scam." : ""}${pkg.upc === "no" ? " No UPC suggests it's not properly registered." : ""} Parents stay away.`,
        },
        convenience: {
          high: `Quick grab. ${pkg.aesthetic === "neon" ? "Bright neon packaging catches the eye on a crowded shelf." : "The packaging stands out."} ${pkg.upc === "yes" ? "Scannable UPC means it's sold at the kind of stores convenience buyers actually shop at." : ""}`,
          mid: `Maybe. Convenience humans want it to be obvious, accessible, and on every shelf. The current setup gets some of the way there.`,
          low: `Skipped. ${pkg.upc === "no" ? "No UPC means it's not stocked at mass retailers — convenience buyers never see it." : "The aesthetic is too subtle to catch attention in a hurry."}`,
        },
        tech: {
          high: `Endorsed. ${pkg.label === "informational" || pkg.label === "both" ? "Detailed specs and ingredient transparency" : "The product transparency"} appeals to tech buyers who want to know exactly what they're getting. ${pkg.upc === "yes" ? "UPC enables tracking and supply-chain visibility." : ""}`,
          mid: `Interested but cautious. Tech buyers want more data — origin, materials, certifications, scannable codes for digital lookup.`,
          low: `Pass. ${pkg.label === "persuasive" ? "Vague lifestyle claims with no specifications feel like marketing hype." : "Without informational labeling, tech buyers can't verify the product."}`,
        },
      };
      const level = score >= 60 ? "high" : score >= 30 ? "mid" : "low";
      return reactions[seg][level];
    };

    return (
      <LevelShell title="04 / Earth Launch Results" tag="OBSERVATION" stepKey={step}>
        <div className="panel" style={{ padding: 30, textAlign: "center", marginBottom: 16 }}>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em" }}>▸ DATA RETURN</div>
          <div className="alien-font" style={{ fontSize: "clamp(42px, 10vw, 56px)", lineHeight: 1.2, color: "var(--pink)", margin: "16px 0 4px", textShadow: "0 0 32px var(--pink)" }}>{Math.round(totalSales)}</div>
          <div className="mono" style={{ color: "var(--ink-dim)", letterSpacing: "0.2em", fontSize: 12, fontWeight: 700 }}>UNITS PURCHASED ACROSS HUMAN SEGMENTS</div>
        </div>

        <p className="mono" style={{ fontSize: 13, color: "var(--ink-bright)", marginBottom: 12, fontWeight: 600 }}>
          ▸ How each human segment reacted to your packaging:
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          {segmentResults.map((r) => {
            const s = SEGMENTS[r.seg];
            const sales = Math.max(0, r.score) * 6;
            return (
              <div key={r.seg} className="panel" style={{ padding: 18, borderLeft: `3px solid ${s.color}` }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 22, color: s.color }}>{s.icon}</span>
                    <div>
                      <div className="serif" style={{ fontWeight: 700, fontSize: 16, color: "var(--ink-bright)" }}>{s.name}</div>
                      <div className="mono" style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-faint)", letterSpacing: "0.1em", marginTop: 2 }}>{s.desc}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div className="alien-font" style={{ fontSize: 22, lineHeight: 1.2, color: s.color }}>{sales}</div>
                    <div className="mono" style={{ fontSize: 9, fontWeight: 700, color: "var(--ink-faint)", letterSpacing: "0.15em" }}>UNITS</div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-dim)", margin: 0, lineHeight: 1.65 }}>{reactionFor(r.seg, r.score)}</p>
              </div>
            );
          })}
        </div>

        <button className="btn btn-primary" onClick={() => setStep(3)}>VIEW CONCEPT ▸</button>
      </LevelShell>
    );
  }

  if (step === 3) return (
    <LevelShell title="04 / Concept" tag="CHAPTER 10 INSIGHT" stepKey={step}>
      <div className="panel" style={{ padding: 28 }}>
        <h3 className="serif" style={{ color: "var(--mint)", margin: 0, fontSize: 24 }}>Packaging is not the wrapper. It IS the message.</h3>
        <div style={{ marginTop: 16 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--peach)", letterSpacing: "0.2em", marginBottom: 8 }}>FOUR PACKAGING FUNCTIONS</div>
          <ol style={{ color: "var(--ink-dim)", lineHeight: 1.8, paddingLeft: 18 }}>
            <li>Contain & protect the product</li>
            <li>Promote the product</li>
            <li>Aid storage, use, and convenience</li>
            <li>Support recycling / reduce environmental damage</li>
          </ol>
        </div>
        <div className="two-col" style={{ gap: 14, marginTop: 16 }}>
          <div style={{ padding: 14, borderLeft: "2px solid var(--pink)" }}>
            <div className="serif" style={{ fontWeight: 700, color: "var(--pink)" }}>Persuasive labeling</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "4px 0 0" }}>Designed to <em>influence</em> purchase. Lifestyle imagery, claims, emotion.</p>
          </div>
          <div style={{ padding: 14, borderLeft: "2px solid var(--mint)" }}>
            <div className="serif" style={{ fontWeight: 700, color: "var(--mint)" }}>Informational labeling</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "4px 0 0" }}>Provides <em>facts</em>: ingredients, instructions, warnings, use info.</p>
          </div>
          <div style={{ padding: 14, borderLeft: "2px solid var(--lav)", gridColumn: "span 2" }}>
            <div className="serif" style={{ fontWeight: 700, color: "var(--lav)" }}>UPC (Universal Product Code)</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "4px 0 0" }}>The scannable barcode used for inventory and checkout. Without it, retailers can't stock the product.</p>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => setStep(4)}>QUIZ CHECKPOINT ▸</button>
    </LevelShell>
  );

  if (step === 4) {
    const Q = {
      q: "A label reads: 'Scientifically aligned with your emotional frequency.' This is an example of:",
      opts: [
        { t: "Informational labeling", correct: false, why: "Informational provides facts/instructions, not emotional claims." },
        { t: "Persuasive labeling", correct: true, why: "Correct. Persuasive labeling uses emotion and lifestyle claims to influence purchase." },
        { t: "UPC labeling", correct: false, why: "UPC is the scannable barcode for inventory." },
        { t: "Express warranty", correct: false, why: "An express warranty is a written guarantee about quality/performance." },
      ],
    };
    return (
      <LevelShell title="04 / Checkpoint" tag="QUIZ" stepKey={step}>
        <div className="panel" style={{ padding: 24 }}>
          <p className="serif" style={{ fontSize: 18 }}>{Q.q}</p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {Q.opts.map((o, i) => (
              <button key={i} className="btn" disabled={quizAns !== null && Q.opts[quizAns].correct} onClick={() => setQuizAns(i)}
                style={{ textAlign: "left", borderColor: quizAns !== null ? (o.correct ? "var(--mint)" : (i === quizAns ? "var(--danger)" : "var(--panel-edge)")) : "var(--panel-edge)" }}>
                {String.fromCharCode(65+i)}. {o.t}
              </button>
            ))}
          </div>
          {quizAns !== null && <div style={{ padding: 14, marginTop: 14, borderLeft: `2px solid ${Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)"}`, background: "rgba(0,0,0,0.4)" }}>
            <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)", letterSpacing: "0.2em", marginBottom: 6 }}>
              {Q.opts[quizAns].correct ? "▣ CORRECT" : "◌ NOT QUITE — TRY ANOTHER"}
            </div>
            <p style={{ fontSize: 13, margin: 0, color: "var(--ink-bright)", lineHeight: 1.6 }}>{Q.opts[quizAns].why}</p>
          </div>}
        </div>
        {quizAns !== null && Q.opts[quizAns].correct && <button className="btn btn-primary" onClick={() => onDone(meters.val * 3 + meters.trust * 2 + (Q.opts[quizAns].correct ? 60 : 0), ["Packaging functions", "Persuasive labeling", "Informational labeling", "UPC", "Tangible benefits"])}>
          COMPLETE STAGE ▸
        </button>}
      </LevelShell>
    );
  }
}

// ===== LEVEL 5: GLOBAL + WARRANTY =====
function Level5({ onDone, setLevelBack }) {
  const [step, setStep] = useState(0);

  // Register back handler with App so global Back works inside this level
  useEffect(() => {
    if (step > 0) {
      setLevelBack(() => () => setStep(step - 1));
    } else {
      setLevelBack(null);
    }
  }, [step]);

  const [region, setRegion] = useState({});
  const [warranty, setWarranty] = useState(null);
  const [quizAns, setQuizAns] = useState(null);

  const regions = [
    { id: "north", name: "Northern Frosthold", climate: "Below freezing", needs: { name: "translated", pkg: "thermal", size: "bulk" } },
    { id: "tropical", name: "Tropical Equator-9", climate: "Humid, sun-bleached labels", needs: { name: "kept", pkg: "uv-resistant", size: "single" } },
    { id: "metropolis", name: "Neo-Metropolis", climate: "Premium, English-fluent", needs: { name: "kept", pkg: "luxury", size: "single" } },
  ];

  const meters = useMemo(() => {
    let global = 20, fit = 30;
    Object.entries(region).forEach(([rid, choice]) => {
      const r = regions.find((x) => x.id === rid);
      if (!r) return;
      if (choice.name === r.needs.name) global += 12;
      if (choice.pkg === r.needs.pkg) fit += 15;
      if (choice.size === r.needs.size) fit += 12;
    });
    if (warranty === "express") global += 20;
    if (warranty === "implied") global += 8;
    return { global, fit };
  }, [region, warranty]);

  if (step === 0) return (
    <LevelShell title="05 / Earth Expansion Trial" tag="STAGE 05" stepKey={step}>
      <div className="briefing-wrap">
      <Alien accent="var(--mint)">
        Earth has many sub-territories. Different climates. Different languages. Different package sizes preferred. Adapt or fail. Also: humans demand <em>guarantees</em> — written or unwritten.
      </Alien>
      <p className="serif">
        Launch the Anti-Sadness Rock in three Earth regions. Decide whether to keep one global brand name or adapt it. Adjust packaging for climate. Choose preferred sizes. Then add a warranty.
      </p>
      <button className="btn btn-primary" onClick={() => setStep(1)}>BEGIN GLOBAL ROLLOUT ▸</button>
      </div>
    </LevelShell>
  );

  if (step === 1) {
    const allRegions = regions.every((r) => region[r.id]?.name && region[r.id]?.pkg && region[r.id]?.size);
    return (
      <LevelShell title="05 / Regional Adaptation" tag="LAB-E" stepKey={step}>
        <p className="mono" style={{ fontSize: 12, color: "var(--ink-dim)", marginBottom: 12 }}>▸ For each region: adapt brand name, packaging, and size.</p>
        <div style={{ display: "grid", gap: 14 }}>
          {regions.map((r) => (
            <div key={r.id} className="panel" style={{ padding: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h4 className="serif" style={{ margin: 0, fontSize: 18 }}>{r.name}</h4>
                <span className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.15em" }}>CLIMATE: {r.climate.toUpperCase()}</span>
              </div>
              <div className="three-col" style={{ marginTop: 12 }}>
                <SmallPick title="Brand Name" opts={[
                  { v: "kept", t: "Keep global name" },
                  { v: "translated", t: "Translate locally" },
                ]} value={region[r.id]?.name} onPick={(v) => setRegion((x) => ({ ...x, [r.id]: { ...(x[r.id] || {}), name: v } }))} />
                <SmallPick title="Packaging" opts={[
                  { v: "thermal", t: "Insulated" },
                  { v: "uv-resistant", t: "UV-shielded" },
                  { v: "luxury", t: "Embossed luxury" },
                ]} value={region[r.id]?.pkg} onPick={(v) => setRegion((x) => ({ ...x, [r.id]: { ...(x[r.id] || {}), pkg: v } }))} />
                <SmallPick title="Size Preferred" opts={[
                  { v: "bulk", t: "Bulk pack" },
                  { v: "single", t: "Single-serve" },
                ]} value={region[r.id]?.size} onPick={(v) => setRegion((x) => ({ ...x, [r.id]: { ...(x[r.id] || {}), size: v } }))} />
              </div>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: 18, marginTop: 14 }}>
          <div className="mono" style={{ fontSize: 11, color: "var(--mint)", letterSpacing: "0.2em", marginBottom: 8 }}>WARRANTY DECISION</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 8 }}>
            {[
              { v: "express", t: "Express Warranty", d: "Written guarantee: 'Glows for 30 days or replaced.'" },
              { v: "implied", t: "Implied Warranty", d: "Unwritten — product fit for its sold purpose." },
              { v: "none", t: "No warranty", d: "Risky for parent/avoidant humans." },
            ].map((o) => (
              <button key={o.v} className="btn" onClick={() => setWarranty(o.v)}
                style={{ textAlign: "left", borderColor: warranty === o.v ? "var(--mint)" : "var(--panel-edge)", color: warranty === o.v ? "var(--mint)" : "var(--ink)" }}>
                <div style={{ fontSize: 13 }}>{o.t}</div>
                <div style={{ fontSize: 11, color: "var(--ink-dim)", textTransform: "none", letterSpacing: 0, marginTop: 4, fontFamily: "'Fraunces', serif" }}>{o.d}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <Meter label="Global Adaptation" value={meters.global} c1="var(--mint)" />
          <Meter label="Regional Fit" value={meters.fit} c1="var(--lav)" />
        </div>

        <button className="btn btn-primary" disabled={!allRegions || !warranty} style={{ marginTop: 14 }} onClick={() => setStep(2)}>LAUNCH GLOBALLY ▸</button>
      </LevelShell>
    );
  }

  if (step === 2) {
    // Calculate per-region performance based on choices vs needs
    const regionResults = regions.map((r) => {
      const choice = region[r.id] || {};
      let score = 30;
      if (choice.name === r.needs.name) score += 25;
      if (choice.pkg === r.needs.pkg) score += 30;
      if (choice.size === r.needs.size) score += 20;
      const sales = Math.round(score * 4 + Math.random() * 20);
      const reaction = score >= 80 ? "STRONG ADOPTION"
        : score >= 60 ? "MODERATE INTEREST"
        : score >= 40 ? "MIXED RESULTS"
        : "POOR FIT";
      return { ...r, score, sales, reaction };
    });
    const totalSales = regionResults.reduce((sum, r) => sum + r.sales, 0);
    const warrantyBoost = warranty === "express" ? 80 : warranty === "implied" ? 30 : 0;
    const finalSales = totalSales + warrantyBoost;

    return (
      <LevelShell title="05 / Earth Launch Results" tag="OBSERVATION" stepKey={step}>
        <div className="panel" style={{ padding: 30, textAlign: "center", marginBottom: 16 }}>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em" }}>▸ DATA RETURN</div>
          <div className="alien-font" style={{ fontSize: 56, lineHeight: 1.2, color: "var(--pink)", margin: "16px 0 4px", textShadow: "0 0 32px var(--pink)" }}>{finalSales}</div>
          <div className="mono" style={{ color: "var(--ink-dim)", letterSpacing: "0.2em", fontSize: 12, fontWeight: 700 }}>UNITS PURCHASED ACROSS ALL REGIONS</div>
        </div>

        <div className="three-col" style={{ marginTop: 12 }}>
          {regionResults.map((r) => (
            <div key={r.id} className="panel" style={{ padding: 16 }}>
              <div className="serif" style={{ fontWeight: 700, fontSize: 15, color: "var(--ink-bright)" }}>{r.name}</div>
              <div className="mono" style={{ fontSize: 9, fontWeight: 700, color: "var(--ink-dim)", letterSpacing: "0.15em", marginTop: 2 }}>{r.climate.toUpperCase()}</div>
              <div className="alien-font" style={{ fontSize: 28, lineHeight: 1.2, color: r.score >= 60 ? "var(--mint)" : "var(--peach)", marginTop: 10 }}>{r.sales}</div>
              <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-dim)", letterSpacing: "0.15em" }}>UNITS SOLD</div>
              <div className="mono" style={{ fontSize: 10, fontWeight: 700, marginTop: 8, color: r.score >= 60 ? "var(--mint)" : "var(--peach)", letterSpacing: "0.1em" }}>▸ {r.reaction}</div>
            </div>
          ))}
        </div>

        <Alien>
          {warranty === "express" && <span>The express warranty added <em>significant</em> trust across all markets — written guarantees translate well. </span>}
          {warranty === "implied" && <span>Implied warranty alone offered minor trust. Some buyers wanted explicit protection. </span>}
          {warranty === "none" && <span>No warranty. Parent and avoidant humans avoided the product entirely. </span>}
          Regions with adapted packaging and sizing outperformed unadapted ones. Conclusion: <em>one global product, many local interpretations</em>.
        </Alien>

        <button className="btn btn-primary" onClick={() => setStep(3)}>VIEW CONCEPT ▸</button>
      </LevelShell>
    );
  }

  if (step === 3) return (
    <LevelShell title="05 / Concept" tag="CHAPTER 10 INSIGHT" stepKey={step}>
      <div className="panel" style={{ padding: 28 }}>
        <h3 className="serif" style={{ color: "var(--mint)", margin: 0, fontSize: 24 }}>Same world, different shelves.</h3>
        <div style={{ marginTop: 14 }}>
          <p style={{ color: "var(--ink-dim)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--ink)" }}>Global branding</strong> options: one brand name everywhere · modified/adapted name · entirely different names per market.
          </p>
          <p style={{ color: "var(--ink-dim)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--ink)" }}>Global packaging</strong> considerations: labeling requirements, aesthetics, climate readiness, preferred package sizes.
          </p>
        </div>
        <div className="two-col" style={{ gap: 14, marginTop: 16 }}>
          <div style={{ padding: 14, borderLeft: "2px solid var(--mint)" }}>
            <div className="serif" style={{ fontWeight: 700, color: "var(--mint)" }}>Express warranty</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "4px 0 0" }}>WRITTEN guarantee. e.g., "Guaranteed to glow for 30 days."</p>
          </div>
          <div style={{ padding: 14, borderLeft: "2px solid var(--lav)" }}>
            <div className="serif" style={{ fontWeight: 700, color: "var(--lav)" }}>Implied warranty</div>
            <p style={{ fontSize: 13, color: "var(--ink-dim)", margin: "4px 0 0" }}>UNWRITTEN. The product is fit for its intended purpose, even if nothing is stated.</p>
          </div>
        </div>
      </div>
      <button className="btn btn-primary" onClick={() => setStep(4)}>QUIZ CHECKPOINT ▸</button>
    </LevelShell>
  );

  if (step === 4) {
    const Q = {
      q: "A buyer purchases an alien spoon. Nothing is written about it functioning as a spoon. The seller is still legally bound to deliver something that works as a spoon. This is:",
      opts: [
        { t: "Express warranty", correct: false, why: "Express warranties are WRITTEN. This is unwritten." },
        { t: "Implied warranty", correct: true, why: "Correct. Implied warranty = unwritten guarantee that product fits its intended purpose." },
        { t: "Service mark", correct: false, why: "Service marks protect service identifiers, not product fitness." },
        { t: "Persuasive labeling", correct: false, why: "Labeling is messaging on the package, not a guarantee." },
      ],
    };
    return (
      <LevelShell title="05 / Checkpoint" tag="QUIZ" stepKey={step}>
        <div className="panel" style={{ padding: 24 }}>
          <p className="serif" style={{ fontSize: 18 }}>{Q.q}</p>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {Q.opts.map((o, i) => (
              <button key={i} className="btn" disabled={quizAns !== null && Q.opts[quizAns].correct} onClick={() => setQuizAns(i)}
                style={{ textAlign: "left", borderColor: quizAns !== null ? (o.correct ? "var(--mint)" : (i === quizAns ? "var(--danger)" : "var(--panel-edge)")) : "var(--panel-edge)" }}>
                {String.fromCharCode(65+i)}. {o.t}
              </button>
            ))}
          </div>
          {quizAns !== null && <div style={{ padding: 14, marginTop: 14, borderLeft: `2px solid ${Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)"}`, background: "rgba(0,0,0,0.4)" }}>
            <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: Q.opts[quizAns].correct ? "var(--mint)" : "var(--peach)", letterSpacing: "0.2em", marginBottom: 6 }}>
              {Q.opts[quizAns].correct ? "▣ CORRECT" : "◌ NOT QUITE — TRY ANOTHER"}
            </div>
            <p style={{ fontSize: 13, margin: 0, color: "var(--ink-bright)", lineHeight: 1.6 }}>{Q.opts[quizAns].why}</p>
          </div>}
        </div>
        {quizAns !== null && Q.opts[quizAns].correct && <button className="btn btn-primary" onClick={() => onDone(meters.global * 4 + meters.fit * 3 + (Q.opts[quizAns].correct ? 60 : 0), ["Global brand", "Global packaging", "Warranty", "Express warranty", "Implied warranty"])}>
          COMPLETE STAGE ▸
        </button>}
      </LevelShell>
    );
  }
}

// ===== BOSS =====
function Boss({ onDone, setLevelBack }) {
  const [step, setStep] = useState(0);

  // Register back handler with App so global Back works inside this level
  useEffect(() => {
    if (step > 0) {
      setLevelBack(() => () => setStep(step - 1));
    } else {
      setLevelBack(null);
    }
  }, [step]);

  const [classify, setClassify] = useState(null);
  const [brand, setBrand] = useState(null);
  const [pkg, setPkg] = useState(null);
  const [label, setLabel] = useState(null);
  const [warranty, setWarranty] = useState(null);
  const [extension, setExtension] = useState([]);
  const [seg, setSeg] = useState(null);

  const meters = useMemo(() => {
    let hype = 10, val = 10, trust = 10, equity = 10, sales = 0;
    if (classify === "specialty") { hype += 25; val += 30; }
    if (classify === "convenience") { sales += 10; val -= 10; }
    if (classify === "shopping") { val += 10; }
    if (classify === "unsought") { hype += 5; }
    if (brand === "luxe") { equity += 30; val += 20; }
    if (brand === "co") { equity += 25; hype += 20; }
    if (brand === "private") { equity += 5; }
    if (pkg === "velvet") { val += 30; hype += 15; }
    if (pkg === "minimal") { val += 20; }
    if (pkg === "plastic") { val -= 10; }
    if (label === "persuasive") { hype += 25; }
    if (label === "informational") { trust += 25; }
    if (label === "both") { trust += 15; hype += 15; }
    if (warranty === "express") { trust += 25; }
    if (warranty === "implied") { trust += 8; }
    extension.forEach(() => { equity += 8; sales += 5; });
    if (extension.length > 4) { trust -= 10; equity -= 5; }
    if (seg === "status" && classify === "specialty" && pkg === "velvet") { sales += 80; }
    if (seg === "wellness" && label === "persuasive") sales += 40;
    if (seg === "convenience" && classify !== "convenience") sales -= 20;
    sales += hype + val + trust + equity;
    return { hype, val, trust, equity, sales };
  }, [classify, brand, pkg, label, warranty, extension, seg]);

  if (step === 0) return (
    <LevelShell title="✦ Final Experiment" tag="BOSS LEVEL" stepKey={step}>
      <div className="briefing-wrap">
      <Alien accent="var(--pink)">
        We send a final object: <em>a plain rock</em>. No glow. No story. No function. Apply <em>everything</em> Chapter 10 has taught. Make it irresistible.
      </Alien>
      <div className="panel" style={{ padding: 30, textAlign: "center", marginTop: 14 }}>
        <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 12 }}>🪨</div>
        <h3 className="serif" style={{ margin: "8px 0 4px" }}>Standard-Issue Rock</h3>
        <p className="mono" style={{ fontSize: 11, color: "var(--ink-dim)" }}>Mass: 0.4kg · Function: none</p>
      </div>
      <button className="btn btn-primary" onClick={() => setStep(1)}>BEGIN FINAL EXPERIMENT ▸</button>
      </div>
    </LevelShell>
  );

  if (step === 1) {
    const ready = classify && brand && pkg && label && warranty && seg && extension.length >= 1;
    return (
      <LevelShell title="✦ Apply Chapter 10" tag="BOSS LAB" stepKey={step}>
        <div className="lab-grid">
          <div>
            <BossSection title="1. Product Classification" opts={[
              { v: "convenience", t: "Convenience product (cheap, easy)" },
              { v: "shopping", t: "Shopping product (compared)" },
              { v: "specialty", t: "Specialty product (rare, loyal buyers)" },
              { v: "unsought", t: "Unsought product (avoided, hard sell)" },
            ]} value={classify} onPick={setClassify} />

            <BossSection title="2. Branding Strategy" opts={[
              { v: "luxe", t: "Luxury individual brand: 'Aether Stone'" },
              { v: "co", t: "Co-brand with Galactic Donuts" },
              { v: "private", t: "Private brand for Galactic Mart" },
              { v: "family", t: "Family branding under 'Mood' line" },
            ]} value={brand} onPick={setBrand} />

            <BossSection title="3. Packaging" opts={[
              { v: "velvet", t: "Velvet-lined display box" },
              { v: "minimal", t: "Minimalist matte sleeve" },
              { v: "plastic", t: "Cheap shrink-wrap" },
            ]} value={pkg} onPick={setPkg} />

            <BossSection title="4. Labeling" opts={[
              { v: "persuasive", t: "Persuasive: 'Holds your unspoken intentions.'" },
              { v: "informational", t: "Informational: weight, origin, storage" },
              { v: "both", t: "Persuasive front + informational back" },
            ]} value={label} onPick={setLabel} />

            <BossSection title="5. Warranty" opts={[
              { v: "express", t: "Express: 'Will hold meaning for 1 year.'" },
              { v: "implied", t: "Implied warranty only" },
              { v: "none", t: "No warranty" },
            ]} value={warranty} onPick={setWarranty} />

            <div className="panel" style={{ padding: 18, marginBottom: 12 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--peach)", letterSpacing: "0.2em", marginBottom: 8 }}>6. PRODUCT LINE EXTENSION (pick 1-4)</div>
              <p style={{ fontSize: 12, color: "var(--ink-dim)", margin: "0 0 10px" }}>Adding new items to the same product line builds equity (but too many causes brand fatigue).</p>
              <div className="ext-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 8 }}>
                {["Aether Stone Sleep", "Aether Stone Focus", "Aether Stone Glow", "Aether Stone Travel", "Aether Stone Mini", "Aether Stone Premium"].map((x) => {
                  const picked = extension.includes(x);
                  return (
                    <button key={x} className="btn"
                      style={{ borderColor: picked ? "var(--peach)" : "var(--panel-edge)", color: picked ? "var(--peach)" : "var(--ink)" }}
                      onClick={() => setExtension((p) => picked ? p.filter((y) => y !== x) : [...p, x])}>
                      {x}
                    </button>
                  );
                })}
              </div>
              {extension.length > 4 && <div className="mono" style={{ fontSize: 10, color: "var(--peach)", marginTop: 8 }}>▸ TOO MANY: brand clarity declining</div>}
            </div>

            <div className="panel" style={{ padding: 18 }}>
              <div className="mono" style={{ fontSize: 11, color: "var(--lav)", letterSpacing: "0.2em", marginBottom: 8 }}>7. TARGET SEGMENT</div>
              <div className="seg-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 8 }}>
                {Object.entries(SEGMENTS).map(([k, s]) => (
                  <button key={k} className="seg-card btn"
                    style={{ "--c": s.color, borderColor: seg === k ? s.color : "var(--panel-edge)", color: seg === k ? s.color : "var(--ink)", padding: "12px" }}
                    onClick={() => setSeg(k)}>
                    <div style={{ fontSize: 18 }}>{s.icon}</div>
                    <div style={{ fontSize: 11, marginTop: 4 }}>{s.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="panel sidebar-sticky" style={{ padding: 18 }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.2em", marginBottom: 12 }}>▸ ROCK DIAGNOSTICS</div>
            <Meter label="Hype" value={meters.hype} c1="var(--pink)" />
            <Meter label="Perceived Value" value={meters.val} c1="var(--mint)" />
            <Meter label="Trust" value={meters.trust} c1="var(--peach)" />
            <Meter label="Brand Equity" value={meters.equity} c1="var(--lav)" />
            <div style={{ marginTop: 14, padding: 12, border: "1px dashed var(--panel-edge)", textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 9, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>PROJECTED SALES</div>
              <div className="alien-font" style={{ fontSize: 28, lineHeight: 1.2, color: "var(--mint)", textShadow: "0 0 16px var(--mint)" }}>{Math.round(meters.sales)}</div>
            </div>
            <button className="btn btn-primary" disabled={!ready} style={{ width: "100%", marginTop: 14 }} onClick={() => setStep(2)}>LAUNCH ROCK ▸</button>
          </div>
        </div>
      </LevelShell>
    );
  }

  if (step === 2) {
    const success = meters.sales > 250;
    return (
      <LevelShell title="✦ Final Result" tag="EXPERIMENT COMPLETE" stepKey={step}>
        <div className="panel" style={{ padding: "32px 20px", textAlign: "center" }}>
          <div style={{ fontSize: 72, lineHeight: 1, marginBottom: 24 }}>🪨</div>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em" }}>▸ FINAL DATA</div>
          <div className="alien-font" style={{ fontSize: "clamp(40px, 12vw, 64px)", lineHeight: 1.2, color: "var(--pink)", textShadow: "0 0 32px var(--pink)", margin: "16px 0 4px", wordBreak: "break-all" }}>{Math.round(meters.sales)}</div>
          <div className="mono" style={{ color: "var(--ink-dim)", letterSpacing: "0.2em", fontSize: 12, fontWeight: 700 }}>UNITS PURCHASED</div>
          <div className="serif" style={{ fontStyle: "italic", fontSize: "clamp(16px, 4vw, 22px)", color: success ? "var(--mint)" : "var(--peach)", marginTop: 28, lineHeight: 1.5, padding: "0 8px" }}>
            {success ? "The rock has become a specialty product." : "The rock has been moderately accepted."}
          </div>
        </div>
        <Alien accent="var(--pink)">
          Conclusion: Functionality is optional. <em>Meaning is marketable.</em>
        </Alien>
        <button className="btn btn-primary" onClick={() => onDone(Math.round(meters.sales) + 200, ["Product modification", "Planned obsolescence", "Product line extension", "Product item", "Product line", "Product mix", "Product mix width", "Product line depth", "Quality modification", "Functional modification", "Style modification"])}>
          VIEW FINAL REPORT ▸
        </button>
      </LevelShell>
    );
  }
}

// ===== ENDING =====
function Ending({ score, mastered, onRestart }) {
  return (
    <div style={{ minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
      <div className="panel fade-up ending-panel" style={{ maxWidth: 720, padding: "50px 40px", textAlign: "center", position: "relative" }}>
        <div className="scanline" />
        <div className="corner-tag hide-on-mobile">FINAL_REPORT.OBS</div>
        <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em", lineHeight: 1.5 }}>▸ TRANSMISSION COMPLETE</div>
        <h2 className="title-font glow-text" style={{ fontSize: "clamp(30px, 7vw, 56px)", color: "var(--pink)", margin: "20px 0", letterSpacing: "0.05em", lineHeight: 1.2 }}>Experiment Concluded</h2>
        <Alien accent="var(--pink)">
          Final hypothesis confirmed. Earth species do not buy products. They buy <em>meaning, identity, status, trust, and packaging</em>. The function is incidental. The story is the product.
        </Alien>
        <div className="two-col ending-stats" style={{ gap: 14, marginTop: 22 }}>
          <div className="panel" style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>TOTAL SALES</div>
            <div className="alien-font glow-text-soft" style={{ fontSize: 36, lineHeight: 1.2, color: "var(--mint)", letterSpacing: "0.04em" }}>{score}</div>
          </div>
          <div className="panel" style={{ padding: 20 }}>
            <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "var(--ink-dim)", letterSpacing: "0.2em" }}>TERMS MASTERED</div>
            <div className="alien-font glow-text-soft" style={{ fontSize: 36, lineHeight: 1.2, color: "var(--lav)", letterSpacing: "0.04em" }}>{mastered}/{GLOSSARY.length}</div>
          </div>
        </div>
        <p className="serif glow-text-soft" style={{ fontStyle: "italic", color: "var(--peach)", marginTop: 24, fontSize: 18, fontWeight: 500 }}>
          "Functionality is optional. Meaning is marketable."
        </p>
        <button className="btn btn-primary" onClick={onRestart} style={{ marginTop: 24 }}>↺ NEW MISSION</button>
      </div>
    </div>
  );
}

// ===== HELPERS =====
function LevelShell({ title, tag, children, stepKey, onStepBack }) {
  // scroll to top whenever step changes within a level
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [stepKey]);

  return (
    <div className="level-shell" style={{ maxWidth: 960, margin: "0 auto", padding: "20px 24px 80px" }}>
      <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: "var(--mint)", letterSpacing: "0.3em", marginBottom: 8 }}>▸ {tag}</div>
      <h2 className="alien-font alien-font-h2 glow-text-soft" style={{ fontSize: 28, color: "var(--pink)", margin: "8px 0 22px" }}>{title}</h2>
      {children}
    </div>
  );
}

function Toggle({ active, onClick, label, accent = "var(--mint)" }) {
  return (
    <button
      className="btn"
      onClick={onClick}
      style={{
        padding: "12px 14px",
        fontSize: 12,
        textAlign: "left",
        borderColor: active ? accent : "var(--panel-edge)",
        color: active ? accent : "var(--ink-dim)",
        background: active ? `${accent}15` : "transparent",
      }}
    >
      <span style={{ marginRight: 8 }}>{active ? "▣" : "◯"}</span>{label}
    </button>
  );
}

function SmallPick({ title, opts, value, onPick }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, color: "var(--ink-dim)", letterSpacing: "0.15em", marginBottom: 6 }}>{title}</div>
      <div style={{ display: "grid", gap: 6 }}>
        {opts.map((o) => (
          <button key={o.v} className="btn"
            style={{ padding: "8px 10px", fontSize: 11, textAlign: "left", borderColor: value === o.v ? "var(--mint)" : "var(--panel-edge)", color: value === o.v ? "var(--mint)" : "var(--ink)" }}
            onClick={() => onPick(o.v)}>
            {o.t}
          </button>
        ))}
      </div>
    </div>
  );
}

function BossSection({ title, opts, value, onPick }) {
  return (
    <div className="panel" style={{ padding: 16, marginBottom: 12 }}>
      <div className="mono" style={{ fontSize: 11, color: "var(--peach)", letterSpacing: "0.2em", marginBottom: 8 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 8 }}>
        {opts.map((o) => (
          <button key={o.v} className="btn"
            style={{ textAlign: "left", borderColor: value === o.v ? "var(--peach)" : "var(--panel-edge)", color: value === o.v ? "var(--peach)" : "var(--ink)" }}
            onClick={() => onPick(o.v)}>
            {o.t}
          </button>
        ))}
      </div>
    </div>
  );
}