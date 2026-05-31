#!/usr/bin/env node
/*
 * The AI School — unified static site builder.
 *
 * Produces one professional online-school site that merges two programs:
 *   1. Practical AI  — long-form chapters rendered from
 *      docs/AI_LEARNING_SYSTEM/*.md (prompting, tools, workflows, cheat sheets).
 *   2. AI Engineering — the interactive 7-part / 70-chapter course app
 *      (ai-engineering.html), re-skinned to the school's design system.
 *
 * The output is fully static (GitHub Pages friendly). All internal links
 * are prefixed with BASE_PATH so the same build works at a domain root
 * (BASE_PATH="") or under a project sub-path (BASE_PATH="/sixteen").
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const SRC = join(REPO_ROOT, "docs", "AI_LEARNING_SYSTEM");
const DIST = join(__dirname, "dist");
const ASSETS_SRC = join(SRC, "assets");

// Base path for all internal links. "" => served at domain root.
const BASE = (process.env.BASE_PATH || "").replace(/\/+$/, "");
const u = (p) => `${BASE}${p.startsWith("/") ? "" : "/"}${p}`;

const ENG_CHAPTERS = 70; // AI Engineering course chapter count (7 parts x 10)

if (existsSync(DIST)) rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
mkdirSync(join(DIST, "chapters"), { recursive: true });
mkdirSync(join(DIST, "assets"), { recursive: true });
mkdirSync(join(DIST, "ai-engineering"), { recursive: true });

marked.setOptions({ gfm: true, breaks: false });

/* ----------------------------- data pipeline ----------------------------- */

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugFromFile = (name) => basename(name, ".md").toLowerCase().replace(/_/g, "-");

function readTitle(path) {
  const m = readFileSync(path, "utf8").match(/^#\s+(.+?)\s*$/m);
  return m ? m[1].trim() : null;
}
const stripChapterNumber = (t) => t.replace(/^\d{1,2}[._-]?\s*/, "").trim();
function chapterNumber(file) {
  const m = file.match(/^(\d+)/);
  return m ? m[1] : "";
}

function chapterGroup(file) {
  if (file === "00_START_HERE.md") return "Start";
  const n = parseInt(file.split("_")[0], 10);
  if (n >= 1 && n <= 2) return "Foundations";
  if (n >= 3 && n <= 6) return "Prompting";
  if (n >= 7 && n <= 11) return "Workflows";
  if (n >= 12 && n <= 13) return "Creative & Data";
  if (n >= 14 && n <= 21) return "Cheat Sheets";
  if (n >= 22 && n <= 24) return "Operator";
  return "Reference";
}
const GROUP_ORDER = [
  "Start", "Foundations", "Prompting", "Workflows",
  "Creative & Data", "Cheat Sheets", "Operator", "Reference",
];
const GROUP_BLURB = {
  Start: "Orientation — how to use this program.",
  Foundations: "What AI is and how it actually thinks.",
  Prompting: "The craft of getting great output, reliably.",
  Workflows: "Research, coding, agents, automation, business.",
  "Creative & Data": "Images, video, audio, and data analysis.",
  "Cheat Sheets": "Per-platform command references, verification-tagged.",
  Operator: "Playbooks, curricula and templates for daily work.",
  Reference: "Glossary, failures & fixes, the one-page recap.",
};

function chapterListItems() {
  const files = readdirSync(SRC).filter((f) => f.endsWith(".md") && f !== "README.md").sort();
  return files.map((f, idx) => {
    const fullTitle = readTitle(join(SRC, f)) || f.replace(/\.md$/, "");
    return { file: f, slug: slugFromFile(f), title: stripChapterNumber(fullTitle), fullTitle, idx };
  });
}
const chapters = chapterListItems();

function chapterBlurb(chapter) {
  const lines = readFileSync(join(SRC, chapter.file), "utf8").split("\n");
  let foundH1 = false;
  for (const line of lines) {
    if (!foundH1) {
      if (/^#\s+/.test(line)) foundH1 = true;
      continue;
    }
    const t = line.trim();
    if (!t || /^#{1,6}\s/.test(t) || /^[-*+]\s/.test(t) || /^>/.test(t) || /^!\[/.test(t) || /^\|/.test(t)) continue;
    return t.replace(/[`*_]/g, "").slice(0, 150) + (t.length > 150 ? "…" : "");
  }
  return "Open chapter.";
}

function groupedChapters() {
  const map = new Map(GROUP_ORDER.map((g) => [g, []]));
  for (const c of chapters) map.get(chapterGroup(c.file)).push(c);
  return GROUP_ORDER.map((g) => [g, map.get(g)]).filter(([, items]) => items.length);
}

/* ------------------------------ design system ---------------------------- */

const STYLES = `
:root{
  --bg:#f5f7fc; --bg2:#eef2fa; --panel:#ffffff; --panel2:#f4f7fe; --line:#e3e9f4;
  --ink:#0f172a; --mut:#4a5878; --dim:#8a96b4;
  --acc:#4f46e5; --acc2:#0ea5e9; --gold:#d4922a; --good:#16a34a;
  --shadow:0 18px 50px -28px rgba(31,41,99,.45);
  --radius:18px; --maxw:1140px;
  --serif:"Playfair Display",Georgia,serif;
  --sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,system-ui,sans-serif;
}
:root[data-theme="dark"]{
  --bg:#0b1020; --bg2:#0e152b; --panel:#141b33; --panel2:#1a2240; --line:#27314f;
  --ink:#eef2ff; --mut:#a8b4d4; --dim:#697699;
  --acc:#7c83ff; --acc2:#38bdf8; --gold:#eab35a; --good:#34d399;
  --shadow:0 24px 60px -30px rgba(0,0,0,.7);
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--sans);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
a{color:var(--acc);text-decoration:none}
a:hover{text-decoration:underline}
img{max-width:100%}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 22px}
.serif{font-family:var(--serif)}
::selection{background:color-mix(in srgb,var(--acc) 28%,transparent)}

/* nav */
.nav{position:sticky;top:0;z-index:50;backdrop-filter:blur(14px);background:color-mix(in srgb,var(--bg) 82%,transparent);border-bottom:1px solid var(--line)}
.nav .wrap{display:flex;align-items:center;gap:18px;height:64px}
.brand{display:flex;align-items:center;gap:11px;font-weight:800;letter-spacing:-.3px;color:var(--ink)}
.brand:hover{text-decoration:none}
.mark{width:38px;height:38px;border-radius:11px;display:grid;place-items:center;color:#fff;font-weight:900;background:linear-gradient(135deg,var(--acc),var(--acc2));box-shadow:0 8px 20px -8px var(--acc)}
.brand small{display:block;font-weight:500;font-size:11px;color:var(--mut);letter-spacing:.2px;margin-top:-2px}
.navlinks{margin-left:auto;display:flex;align-items:center;gap:6px}
.navlinks a{color:var(--mut);font-weight:600;font-size:14.5px;padding:8px 12px;border-radius:9px}
.navlinks a:hover{color:var(--ink);background:var(--panel2);text-decoration:none}
.navlinks a.cta{color:#fff;background:linear-gradient(135deg,var(--acc),var(--acc2));box-shadow:0 10px 24px -12px var(--acc)}
.navlinks a.cta:hover{filter:brightness(1.06)}
.tbtn{width:38px;height:38px;border-radius:10px;border:1px solid var(--line);background:var(--panel);color:var(--mut);cursor:pointer;display:grid;place-items:center;font-size:16px}
.tbtn:hover{color:var(--ink);border-color:var(--acc)}
.navtoggle{display:none}

/* hero */
.hero{position:relative;overflow:hidden;border-bottom:1px solid var(--line);
  background:radial-gradient(1100px 540px at 84% -10%,color-mix(in srgb,var(--acc) 16%,transparent),transparent 60%),radial-gradient(900px 520px at 0% 110%,color-mix(in srgb,var(--acc2) 14%,transparent),transparent 58%)}
.hero .wrap{padding:74px 22px 64px}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--acc);background:color-mix(in srgb,var(--acc) 12%,transparent);border:1px solid color-mix(in srgb,var(--acc) 26%,transparent);padding:6px 13px;border-radius:999px}
.hero h1{font-family:var(--serif);font-weight:700;font-size:clamp(34px,6vw,60px);line-height:1.04;letter-spacing:-1.4px;margin:20px 0 14px;max-width:16ch}
.hero h1 .hl{background:linear-gradient(120deg,var(--acc),var(--acc2));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p.lede{font-size:clamp(16px,2.2vw,19px);color:var(--mut);max-width:62ch;margin:0 0 28px}
.cta-row{display:flex;flex-wrap:wrap;gap:12px}
.btn{display:inline-flex;align-items:center;gap:9px;font-weight:700;font-size:15px;padding:13px 22px;border-radius:12px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer;transition:.18s}
.btn:hover{text-decoration:none;transform:translateY(-1px);box-shadow:var(--shadow)}
.btn.primary{background:linear-gradient(135deg,var(--acc),var(--acc2));color:#fff;border:0;box-shadow:0 16px 34px -14px var(--acc)}
.btn.ghost:hover{border-color:var(--acc)}
.hstats{display:flex;flex-wrap:wrap;gap:30px;margin-top:46px;padding-top:26px;border-top:1px solid var(--line)}
.hstats .s b{font-family:var(--serif);font-size:30px;letter-spacing:-1px;display:block;line-height:1}
.hstats .s span{font-size:13px;color:var(--mut)}

/* sections */
section.band{padding:64px 0}
.band-head{max-width:60ch;margin-bottom:34px}
.band-head .eyebrow{font-size:11.5px}
.band-head h2{font-family:var(--serif);font-size:clamp(26px,4vw,38px);letter-spacing:-.8px;line-height:1.1;margin:16px 0 10px}
.band-head p{color:var(--mut);margin:0;font-size:16px}

/* program cards */
.programs{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
.program{position:relative;display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:30px;overflow:hidden;transition:.2s}
.program:hover{transform:translateY(-3px);box-shadow:var(--shadow);border-color:color-mix(in srgb,var(--pc) 50%,var(--line))}
.program:before{content:"";position:absolute;inset:0 0 auto 0;height:4px;background:linear-gradient(90deg,var(--pc),var(--pc2))}
.program .pico{width:52px;height:52px;border-radius:14px;display:grid;place-items:center;color:#fff;font-size:24px;background:linear-gradient(135deg,var(--pc),var(--pc2));box-shadow:0 12px 26px -12px var(--pc)}
.program .ptag{font-size:11.5px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--pc);margin:18px 0 0}
.program h3{font-family:var(--serif);font-size:24px;letter-spacing:-.4px;margin:6px 0 8px}
.program p{color:var(--mut);margin:0 0 16px;font-size:15px;flex:1}
.program ul{list-style:none;margin:0 0 22px;padding:0;display:grid;gap:8px}
.program ul li{display:flex;gap:9px;align-items:flex-start;font-size:14px;color:var(--ink)}
.program ul li i{color:var(--good);flex-shrink:0;margin-top:3px}
.program .pmeta{display:flex;gap:16px;margin:0 0 18px;font-size:12.5px;color:var(--mut)}
.program .pmeta b{color:var(--ink)}

/* features */
.features{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.feature{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:24px}
.feature .fi{width:44px;height:44px;border-radius:12px;display:grid;place-items:center;font-size:20px;color:var(--acc);background:color-mix(in srgb,var(--acc) 12%,transparent);margin-bottom:14px}
.feature h4{margin:0 0 6px;font-size:17px;letter-spacing:-.2px}
.feature p{margin:0;color:var(--mut);font-size:14px}

/* curriculum */
.curric{display:grid;gap:14px}
.cgroup{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden}
.cgroup>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:14px;padding:18px 22px}
.cgroup>summary::-webkit-details-marker{display:none}
.cgroup>summary:hover{background:var(--panel2)}
.cgroup .gno{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:14px;color:#fff;background:linear-gradient(135deg,var(--acc),var(--acc2));flex-shrink:0}
.cgroup .gh b{font-size:16px;letter-spacing:-.2px}
.cgroup .gh span{display:block;font-size:13px;color:var(--mut)}
.cgroup .gcount{margin-left:auto;font-size:12px;color:var(--mut);background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:4px 11px}
.cgroup .chev{margin-left:8px;color:var(--dim);transition:.2s}
.cgroup[open] .chev{transform:rotate(90deg)}
.clist{padding:4px 14px 16px;display:grid;gap:2px}
.crow{display:flex;align-items:center;gap:14px;padding:11px 12px;border-radius:11px;color:var(--ink)}
.crow:hover{background:var(--panel2);text-decoration:none}
.crow .cnum{font-size:12px;color:var(--dim);width:30px;flex-shrink:0;font-variant-numeric:tabular-nums}
.crow .cbody b{font-weight:600;font-size:15px;display:block}
.crow .cbody span{font-size:13px;color:var(--mut);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:62ch}
.crow .cgo{margin-left:auto;color:var(--dim);flex-shrink:0}

/* footer */
.foot{border-top:1px solid var(--line);background:var(--bg2);padding:46px 0 60px;margin-top:30px}
.foot .cols{display:flex;flex-wrap:wrap;gap:40px;justify-content:space-between}
.foot h5{font-size:13px;text-transform:uppercase;letter-spacing:.6px;color:var(--mut);margin:0 0 12px}
.foot a{display:block;color:var(--ink);font-size:14px;padding:4px 0}
.foot .tag{max-width:34ch;color:var(--mut);font-size:14px}
.foot .legal{margin-top:34px;padding-top:20px;border-top:1px solid var(--line);color:var(--dim);font-size:12.5px;display:flex;flex-wrap:wrap;gap:8px;justify-content:space-between}

/* reader / chapter */
.reader{display:grid;grid-template-columns:266px minmax(0,1fr);gap:40px;align-items:start;padding:34px 0 20px}
.sidebar{position:sticky;top:84px;max-height:calc(100vh - 100px);overflow:auto;padding-right:6px}
.sidebar .sgroup{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--dim);margin:18px 0 6px}
.sidebar a{display:block;color:var(--mut);font-size:13.5px;padding:6px 11px;border-radius:8px;line-height:1.35}
.sidebar a:hover{color:var(--ink);background:var(--panel2);text-decoration:none}
.sidebar a.active{color:var(--acc);background:color-mix(in srgb,var(--acc) 12%,transparent);font-weight:600}
.article{min-width:0}
.kicker{font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--acc)}
.article h1{font-family:var(--serif);font-size:clamp(28px,4.6vw,42px);letter-spacing:-.9px;line-height:1.08;margin:10px 0 24px}
.prose{font-size:16.5px;line-height:1.75}
.prose h2{font-family:var(--serif);font-size:27px;letter-spacing:-.4px;margin:38px 0 12px;padding-bottom:8px;border-bottom:1px solid var(--line)}
.prose h3{font-size:20px;margin:28px 0 10px;letter-spacing:-.2px}
.prose h4{font-size:16px;margin:22px 0 8px;text-transform:uppercase;letter-spacing:.5px;color:var(--mut)}
.prose p{margin:0 0 16px}
.prose ul,.prose ol{margin:0 0 18px;padding-left:24px}
.prose li{margin:6px 0}
.prose a{font-weight:600;text-decoration:underline;text-underline-offset:2px}
.prose blockquote{margin:20px 0;padding:14px 20px;border-left:3px solid var(--acc);background:var(--panel);border-radius:0 12px 12px 0;color:var(--mut)}
.prose code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.88em;background:var(--panel2);border:1px solid var(--line);border-radius:6px;padding:.12em .4em}
.prose pre{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px 18px;overflow:auto;margin:0 0 18px}
.prose pre code{background:none;border:0;padding:0;font-size:13.5px;line-height:1.6}
.prose table{width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14px;display:block;overflow:auto}
.prose th,.prose td{border:1px solid var(--line);padding:9px 12px;text-align:left;vertical-align:top}
.prose th{background:var(--panel2);font-weight:700}
.prose tr:nth-child(even) td{background:color-mix(in srgb,var(--panel2) 55%,transparent)}
.prose hr{border:0;border-top:1px solid var(--line);margin:30px 0}
.prose img{border-radius:12px;border:1px solid var(--line)}
.crumb{font-size:13px;color:var(--mut);margin:0 0 4px}
.crumb a{color:var(--mut)}
.banner{display:flex;gap:11px;align-items:flex-start;background:color-mix(in srgb,var(--gold) 12%,transparent);border:1px solid color-mix(in srgb,var(--gold) 36%,transparent);border-radius:12px;padding:13px 16px;margin:0 0 22px;font-size:14px;color:var(--ink)}
.banner i{color:var(--gold);flex-shrink:0;margin-top:2px}
.pager{display:flex;gap:14px;margin:40px 0 8px}
.pager a{flex:1;border:1px solid var(--line);border-radius:14px;padding:15px 18px;background:var(--panel);color:var(--ink)}
.pager a:hover{border-color:var(--acc);text-decoration:none;box-shadow:var(--shadow)}
.pager a.next{text-align:right}
.pager .lab{font-size:12px;color:var(--mut)}
.pager .ttl{font-weight:700;letter-spacing:-.2px;margin-top:2px}
.article .endnote{margin:26px 0 0;font-size:13px;color:var(--dim)}
.article .endnote code{font-family:ui-monospace,monospace}

i[data-lucide]{width:1.05em;height:1.05em;vertical-align:-.16em;stroke-width:2.2}

@media(max-width:860px){
  .programs,.features{grid-template-columns:1fr}
  .reader{grid-template-columns:1fr;gap:18px}
  .sidebar{position:static;max-height:none;border:1px solid var(--line);border-radius:14px;padding:12px;background:var(--panel)}
  .navlinks a:not(.cta):not(.icononly){display:none}
}
@media(max-width:560px){
  .nav .wrap{gap:10px}
  .hstats{gap:20px}
}
`;

/* -------------------------------- shells --------------------------------- */

const ICON = (n) => `<i data-lucide="${n}"></i>`;

function navBar(active = "") {
  const link = (href, label, cls = "") =>
    `<a href="${href}"${cls ? ` class="${cls}"` : ""}>${label}</a>`;
  return `<header class="nav"><div class="wrap">
    <a class="brand" href="${u("/")}">
      <span class="mark">AI</span>
      <span>The AI School<small>Learn it. Build it.</small></span>
    </a>
    <nav class="navlinks">
      ${link(u("/#programs"), "Programs")}
      ${link(u("/#practical"), "Practical AI")}
      ${link(u("/ai-engineering/"), "AI Engineering")}
      ${link(u("/#about"), "About")}
      ${link(u("/ai-engineering/"), "Enter a course →", "cta")}
      <button class="tbtn icononly" id="themeBtn" title="Toggle theme" aria-label="Toggle light/dark">${ICON("moon")}</button>
    </nav>
  </div></header>`;
}

function footer() {
  return `<footer class="foot"><div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="${u("/")}"><span class="mark">AI</span><span>The AI School</span></a>
        <p class="tag" style="margin-top:14px">An open, self-paced school for modern AI — from using it fluently to building production systems. Free, offline-friendly, progress saved on your device.</p>
      </div>
      <div>
        <h5>Programs</h5>
        <a href="${u("/#practical")}">Practical AI</a>
        <a href="${u("/ai-engineering/")}">AI Engineering</a>
        <a href="${u("/chapters/" + chapters[0].slug + ".html")}">Start here</a>
      </div>
      <div>
        <h5>Resources</h5>
        <a href="${u("/ai-engineering/")}#arena">The Arena (live sources)</a>
        <a href="https://github.com/paisabrazilfl-cpu/SIXTEEN/tree/main/docs/AI_LEARNING_SYSTEM" target="_blank" rel="noopener">Source on GitHub</a>
      </div>
    </div>
    <div class="legal">
      <span>© ${new Date().getFullYear()} The AI School · Educational synthesis — verify fast-moving specifics against primary sources.</span>
      <span>Built as a static site · works offline.</span>
    </div>
  </div></footer>`;
}

const THEME_SCRIPT = `<script>
(function(){
  var K="school_theme";
  function get(){try{return localStorage.getItem(K)}catch(e){return null}}
  function set(v){try{localStorage.setItem(K,v)}catch(e){}}
  function apply(t){document.documentElement.setAttribute("data-theme",t);
    var b=document.getElementById("themeBtn");
    if(b&&window.lucide){b.innerHTML='<i data-lucide="'+(t==="dark"?"sun":"moon")+'"></i>';lucide.createIcons();}}
  var saved=get()|| (window.matchMedia&&matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");
  apply(saved);
  window.addEventListener("DOMContentLoaded",function(){
    if(window.lucide)lucide.createIcons();
    apply(document.documentElement.getAttribute("data-theme"));
    var b=document.getElementById("themeBtn");
    if(b)b.addEventListener("click",function(){
      var t=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";set(t);apply(t);});
  });
})();
</script>`;

function page({ title, desc, body, themeInit = "light" }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="${themeInit}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap">
<link rel="stylesheet" href="${u("/styles.css")}">
<script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
${body}
${THEME_SCRIPT}
</body>
</html>`;
}

/* --------------------------------- home ---------------------------------- */

function renderHome() {
  const practicalCount = chapters.length;
  const total = practicalCount + ENG_CHAPTERS;

  const programs = `<section class="band" id="programs"><div class="wrap">
    <div class="band-head">
      <span class="eyebrow">Two programs, one school</span>
      <h2>Choose your track</h2>
      <p>Whether you want to <em>use</em> AI like a pro or <em>understand and build</em> it end-to-end, start where you are. Both are free and self-paced.</p>
    </div>
    <div class="programs">
      <article class="program" style="--pc:#4f46e5;--pc2:#0ea5e9">
        <div class="pico">${ICON("compass")}</div>
        <div class="ptag">Track 01 · Beginner → Operator</div>
        <h3>Practical AI</h3>
        <p>Use today's AI tools fluently. Prompting that works, output you can trust, and platform cheat-sheets for ChatGPT, Claude, Gemini and more.</p>
        <ul>
          <li>${ICON("check")} Prompt engineering & vocabulary that transfers everywhere</li>
          <li>${ICON("check")} Research, coding, agent & automation workflows</li>
          <li>${ICON("check")} Verification-tagged cheat sheets for every major platform</li>
        </ul>
        <div class="pmeta"><span><b>${practicalCount}</b> chapters</span><span><b>Reference</b> + workflows</span><span><b>Free</b></span></div>
        <a class="btn primary" href="${u("/chapters/" + chapters[0].slug + ".html")}">Start Practical AI ${ICON("arrow-right")}</a>
      </article>
      <article class="program" style="--pc:#7c3aed;--pc2:#ec4899">
        <div class="pico">${ICON("cpu")}</div>
        <div class="ptag">Track 02 · Foundations → Frontier</div>
        <h3>AI Engineering</h3>
        <p>The whole stack, the honest way: the math substrate, how models work, the application layer, agent harnesses, modalities, MLOps and the research edge.</p>
        <ul>
          <li>${ICON("check")} 7 parts · ${ENG_CHAPTERS} chapters with expandable lessons</li>
          <li>${ICON("check")} Flashcards, shuffled quizzes & a progress dashboard</li>
          <li>${ICON("check")} The Arena — a curated, live list of tier-1 AI sources</li>
        </ul>
        <div class="pmeta"><span><b>${ENG_CHAPTERS}</b> chapters</span><span><b>Interactive</b> course app</span><span><b>Free</b></span></div>
        <a class="btn primary" href="${u("/ai-engineering/")}">Enter AI Engineering ${ICON("arrow-right")}</a>
      </article>
    </div>
  </div></section>`;

  const curric = groupedChapters().map(([group, items], gi) => {
    const rows = items.map((c) => `<a class="crow" href="${u("/chapters/" + c.slug + ".html")}">
        <span class="cnum">${chapterNumber(c.file) || "·"}</span>
        <span class="cbody"><b>${escapeHtml(c.title)}</b><span>${escapeHtml(chapterBlurb(c))}</span></span>
        <span class="cgo">${ICON("chevron-right")}</span>
      </a>`).join("");
    return `<details class="cgroup"${gi === 0 ? " open" : ""}>
      <summary>
        <span class="gno">${gi + 1}</span>
        <span class="gh"><b>${escapeHtml(group)}</b><span>${escapeHtml(GROUP_BLURB[group] || "")}</span></span>
        <span class="gcount">${items.length} ${items.length === 1 ? "chapter" : "chapters"}</span>
        <span class="chev">${ICON("chevron-right")}</span>
      </summary>
      <div class="clist">${rows}</div>
    </details>`;
  }).join("");

  const practical = `<section class="band" id="practical" style="background:var(--bg2);border-top:1px solid var(--line);border-bottom:1px solid var(--line)"><div class="wrap">
    <div class="band-head">
      <span class="eyebrow">Practical AI · Curriculum</span>
      <h2>${practicalCount} chapters, browse the whole map</h2>
      <p>Grouped from orientation to operator playbooks. Open any chapter — every platform claim is verification-tagged.</p>
    </div>
    <div class="curric">${curric}</div>
  </div></section>`;

  const features = `<section class="band" id="about"><div class="wrap">
    <div class="band-head">
      <span class="eyebrow">Why learn here</span>
      <h2>Built like a course, not a blog</h2>
      <p>Where most material is weakest — and where the leverage is — is the engineering around models: evaluation, context, and safety. This school is built around that thesis.</p>
    </div>
    <div class="features">
      <div class="feature"><div class="fi">${ICON("route")}</div><h4>An honest sequence</h4><p>Transformers → prompting → RAG → tools → harness → evals → safety → MLOps. A path, not a buffet.</p></div>
      <div class="feature"><div class="fi">${ICON("layers")}</div><h4>Active recall built in</h4><p>Expandable lessons, flashcards and shuffled assessments — so it sticks, not just scrolls past.</p></div>
      <div class="feature"><div class="fi">${ICON("shield-check")}</div><h4>Verification-first</h4><p>Cheat-sheets tag every unverified platform claim, and a live source list keeps you close to primary material.</p></div>
      <div class="feature"><div class="fi">${ICON("gauge")}</div><h4>Progress that's yours</h4><p>Marks, notes and scores save locally on your device. No account, no tracking, works offline.</p></div>
      <div class="feature"><div class="fi">${ICON("smartphone")}</div><h4>Reads anywhere</h4><p>Designed for phone, tablet and desktop, with a light and dark theme.</p></div>
      <div class="feature"><div class="fi">${ICON("git-branch")}</div><h4>Open & static</h4><p>Generated from plain Markdown and a single-file app. Inspect it, fork it, host it yourself.</p></div>
    </div>
  </div></section>`;

  const hero = `<section class="hero"><div class="wrap">
    <span class="eyebrow">${ICON("graduation-cap")} The AI School</span>
    <h1>Master AI — from everyday use to <span class="hl">building production systems</span>.</h1>
    <p class="lede">One school, two programs. Learn to wield today's AI tools with confidence, then go under the hood to understand and engineer the systems behind them — ${total} chapters of structured, self-paced learning.</p>
    <div class="cta-row">
      <a class="btn primary" href="#programs">Explore programs ${ICON("arrow-right")}</a>
      <a class="btn ghost" href="${u("/chapters/" + chapters[0].slug + ".html")}">${ICON("play")} Start with the basics</a>
    </div>
    <div class="hstats">
      <div class="s"><b>2</b><span>structured programs</span></div>
      <div class="s"><b>${total}</b><span>chapters in total</span></div>
      <div class="s"><b>7</b><span>parts in AI Engineering</span></div>
      <div class="s"><b>$0</b><span>free & self-paced</span></div>
    </div>
  </div></section>`;

  return page({
    title: "The AI School — Learn AI, from everyday use to production",
    desc: "A free, self-paced online school for modern AI. Two programs: Practical AI (use it fluently) and AI Engineering (understand and build it), spanning " + total + " chapters.",
    body: navBar("home") + hero + programs + practical + features + footer(),
    themeInit: "light",
  });
}

/* ------------------------------- chapters -------------------------------- */

function sidebar(activeSlug) {
  let html = `<aside class="sidebar">`;
  for (const [group, items] of groupedChapters()) {
    html += `<div class="sgroup">${escapeHtml(group)}</div>`;
    for (const c of items) {
      html += `<a class="${c.slug === activeSlug ? "active" : ""}" href="${u("/chapters/" + c.slug + ".html")}">${escapeHtml(c.title)}</a>`;
    }
  }
  html += `</aside>`;
  return html;
}

function renderChapter(chapter, idx) {
  const md = readFileSync(join(SRC, chapter.file), "utf8");
  const html = marked.parse(md.replace(/^#\s+.*$/m, "").trim());

  const banner = md.includes("WEB VERIFICATION NOT AVAILABLE IN THIS RUN")
    ? `<div class="banner">${ICON("shield-alert")}<span><b>Web verification was not available in this run.</b> Status tags below flag every unverified platform claim — treat them as pointers to check, not gospel.</span></div>`
    : "";

  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;
  const group = chapterGroup(chapter.file);

  const body = `${navBar("practical")}
  <div class="wrap"><div class="reader">
    ${sidebar(chapter.slug)}
    <article class="article">
      <div class="crumb"><a href="${u("/")}">The AI School</a> · <a href="${u("/#practical")}">Practical AI</a> · ${escapeHtml(group)}</div>
      <div class="kicker">${escapeHtml(group).toUpperCase()}${chapterNumber(chapter.file) ? " · CHAPTER " + chapterNumber(chapter.file) : ""}</div>
      <h1>${escapeHtml(chapter.title)}</h1>
      ${banner}
      <div class="prose">${html}</div>
      <div class="pager">
        ${prev ? `<a href="${u("/chapters/" + prev.slug + ".html")}"><div class="lab">← Previous</div><div class="ttl">${escapeHtml(prev.title)}</div></a>` : `<span style="flex:1"></span>`}
        ${next ? `<a class="next" href="${u("/chapters/" + next.slug + ".html")}"><div class="lab">Next →</div><div class="ttl">${escapeHtml(next.title)}</div></a>` : `<span style="flex:1"></span>`}
      </div>
      <p class="endnote">Generated from <code>docs/AI_LEARNING_SYSTEM/${chapter.file}</code>. <a href="${u("/")}">Back to school</a> · <a href="${u("/ai-engineering/")}">Try AI Engineering</a>.</p>
    </article>
  </div></div>
  ${footer()}`;

  return page({
    title: `${chapter.title} — The AI School`,
    desc: chapterBlurb(chapter),
    body,
    themeInit: "light",
  });
}

function render404() {
  const body = `${navBar("")}
  <section class="hero"><div class="wrap" style="text-align:center;padding:90px 22px">
    <span class="eyebrow">${ICON("compass")} 404</span>
    <h1 style="margin-inline:auto">This page wandered off.</h1>
    <p class="lede" style="margin-inline:auto">The chapter you're after doesn't exist here. Head back to the school and pick a program.</p>
    <div class="cta-row" style="justify-content:center">
      <a class="btn primary" href="${u("/")}">${ICON("home")} Back to school</a>
      <a class="btn ghost" href="${u("/ai-engineering/")}">AI Engineering</a>
    </div>
  </div></section>
  ${footer()}`;
  return page({ title: "Not found — The AI School", desc: "Page not found.", body });
}

/* --------------------------- AI Engineering app -------------------------- */

function buildEngineering() {
  let app = readFileSync(join(__dirname, "ai-engineering.html"), "utf8");

  const skin = `<style id="school-skin">
:root{
  --bg:#0b1020;--bg2:#0f152b;--card:#141b34;--card2:#1b2444;--line:#28324f;
  --ink:#eef2ff;--mut:#a4b1d0;--dim:#6b7799;
  --acc:#7c83ff;--acc2:#38bdf8;--acc3:#a78bfa;--good:#34d399;--warn:#fbbf24;--bad:#f87171;
  --glow:0 0 10px;
}
:root[data-theme="light"]{
  --bg:#f5f7fc;--bg2:#eef2fa;--card:#ffffff;--card2:#f3f6fd;--line:#e3e9f4;
  --ink:#0f172a;--mut:#4a5878;--dim:#8a96b4;
  --acc:#4f46e5;--acc2:#0ea5e9;--acc3:#7c3aed;--good:#16a34a;--warn:#d97706;--bad:#dc2626;--glow:0 0 8px;
}
.school-back{width:36px;height:36px;border-radius:10px;border:1px solid var(--line);display:grid;place-items:center;color:var(--mut);flex-shrink:0;margin-right:4px;transition:.18s}
.school-back:hover{color:var(--ink);border-color:var(--acc);text-decoration:none}
</style>`;

  app = app
    .replace("<title>AI Engineering — Neon Edition</title>", "<title>AI Engineering — The AI School</title>")
    .replace(
      '<div class="hbrand" id="hbrand"><div class="logo sm">AI</div><b>AI Engineering<span> · Neon</span></b></div>',
      '<a class="school-back" href="__BASE__/" title="Back to The AI School"><i data-lucide="arrow-left"></i></a><div class="hbrand" id="hbrand"><div class="logo sm">AI</div><b>AI Engineering<span> · AI School</span></b></div>'
    )
    .replace(
      '<button class="themepill" id="gtheme"><i data-lucide="moon"></i><span>theme</span></button>',
      '<button class="themepill" id="gtheme"><i data-lucide="moon"></i><span>theme</span></button>\n    <a class="themepill" href="__BASE__/" style="text-decoration:none;margin-left:8px"><i data-lucide="graduation-cap"></i><span>AI School</span></a>'
    )
    .replace("</body>", `${skin}\n</body>`)
    .replaceAll("__BASE__", BASE);

  // Ensure lucide is available (the app references it but never loaded it).
  app = app.replace("</head>", `<script src="https://unpkg.com/lucide@latest"></script>\n</head>`);

  writeFileSync(join(DIST, "ai-engineering", "index.html"), app);
}

/* -------------------------------- emit ----------------------------------- */

writeFileSync(join(DIST, "styles.css"), STYLES);
writeFileSync(join(DIST, "index.html"), renderHome());
chapters.forEach((c, i) => writeFileSync(join(DIST, "chapters", `${c.slug}.html`), renderChapter(c, i)));
writeFileSync(join(DIST, "404.html"), render404());
buildEngineering();
writeFileSync(join(DIST, ".nojekyll"), "");

if (existsSync(ASSETS_SRC)) {
  for (const f of readdirSync(ASSETS_SRC)) cpSync(join(ASSETS_SRC, f), join(DIST, "assets", f));
}

console.log(`The AI School: built home + ${chapters.length} Practical AI chapters + AI Engineering app (BASE="${BASE || "/"}") -> ${DIST}`);
