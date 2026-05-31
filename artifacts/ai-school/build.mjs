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
.navlinks a.active:not(.cta){color:var(--acc);background:color-mix(in srgb,var(--acc) 10%,transparent)}
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

/* ============================================================
   AI Engineering view layer — integrated into the school
   Same design tokens (--acc, --panel, --line, fonts) as the rest
   of the site. No separate nav, no separate palette.
   ============================================================ */
.eng-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-top:30px;padding:6px;background:var(--panel);border:1px solid var(--line);border-radius:14px;width:fit-content;max-width:100%;box-shadow:var(--shadow)}
.eng-tab{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;padding:9px 15px;border-radius:9px;border:0;background:transparent;color:var(--mut);cursor:pointer;transition:.15s;font-family:var(--sans)}
.eng-tab:hover{color:var(--ink);background:var(--panel2)}
.eng-tab.on{color:#fff;background:linear-gradient(135deg,var(--acc),var(--acc2));box-shadow:0 8px 20px -10px var(--acc)}
.eng-tab .ct{background:color-mix(in srgb,var(--ink) 8%,transparent);color:var(--mut);font-size:11px;font-weight:700;padding:1px 7px;border-radius:999px;font-variant-numeric:tabular-nums}
.eng-tab.on .ct{background:rgba(255,255,255,.22);color:#fff}
.eng-view{display:none;animation:engfade .3s ease}
.eng-view.on{display:block}
@keyframes engfade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

.eng-controls{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:18px}
.eng-controls select,.eng-controls input{background:var(--panel);color:var(--ink);border:1px solid var(--line);border-radius:11px;padding:9px 12px;font:14px var(--sans)}
.eng-controls select:focus,.eng-controls input:focus{outline:none;border-color:var(--acc)}

/* library — parts as expandable cards (mirrors school .cgroup) */
.eng-part{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;margin-bottom:14px;transition:.2s}
.eng-part.open{box-shadow:var(--shadow)}
.eng-part>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:14px;padding:18px 22px}
.eng-part>summary::-webkit-details-marker{display:none}
.eng-part>summary:hover{background:var(--panel2)}
.eng-part .pno{width:36px;height:36px;border-radius:10px;display:grid;place-items:center;font-weight:800;font-size:14px;color:#fff;background:linear-gradient(135deg,var(--pa,var(--acc)),var(--pb,var(--acc2)));flex-shrink:0;box-shadow:0 6px 14px -6px color-mix(in srgb,var(--pa,var(--acc)) 60%,transparent)}
.eng-part .gh{flex:1;min-width:0}
.eng-part .gh b{font-size:16px;letter-spacing:-.2px;display:block}
.eng-part .gh span{font-size:13px;color:var(--mut);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.eng-part .gmeta{display:flex;align-items:center;gap:10px;flex-shrink:0}
.eng-part .ring{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:conic-gradient(var(--pa,var(--acc)) calc(var(--p,0)*1%),var(--line) 0)}
.eng-part .ring i{width:30px;height:30px;border-radius:50%;background:var(--panel);display:grid;place-items:center;font-size:10.5px;font-style:normal;font-weight:800;color:var(--ink);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.eng-part .chev{color:var(--dim);transition:.2s;display:grid;place-items:center}
.eng-part.open .chev{transform:rotate(90deg);color:var(--acc)}
.eng-part .chaps{padding:4px 14px 16px;display:grid;gap:2px}
.eng-chap{display:flex;align-items:center;gap:14px;padding:11px 12px;border-radius:11px;color:var(--ink);cursor:pointer}
.eng-chap:hover{background:var(--panel2);text-decoration:none}
.eng-chap .cnum{font-size:12px;color:var(--dim);width:38px;flex-shrink:0;font-variant-numeric:tabular-nums;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.eng-chap .cbody{flex:1;min-width:0}
.eng-chap .cbody b{font-weight:600;font-size:14.5px;display:block}
.eng-chap .cbody span{font-size:12.5px;color:var(--mut);display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.eng-chap .cr{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dim);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;flex-shrink:0}
.eng-chap .cr .mini{width:36px;height:5px;border-radius:3px;background:var(--line);overflow:hidden}
.eng-chap .cr .mini i{display:block;height:100%;background:linear-gradient(90deg,var(--good),var(--acc))}
.eng-chap .cgo{color:var(--dim)}

/* reader — chapter detail */
.eng-reader-top{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:6px}
.eng-reader-top .pill{background:var(--panel);border:1px solid var(--line);color:var(--mut);font-size:11.5px;font-weight:600;letter-spacing:.4px;padding:4px 10px;border-radius:999px;display:inline-flex;align-items:center;gap:5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.eng-reader h2{font-family:var(--serif);font-size:clamp(24px,4.4vw,34px);letter-spacing:-.7px;line-height:1.1;margin:8px 0 10px}
.eng-reader .blurb{color:var(--mut);font-size:16.5px;max-width:65ch;margin:0 0 18px}
.eng-lesson{background:var(--panel);border:1px solid var(--line);border-left:3px solid var(--la,var(--acc));border-radius:14px;margin-bottom:12px;overflow:hidden}
.eng-lesson.learned{border-left-color:var(--good)}
.eng-lhead{display:flex;gap:12px;align-items:center;padding:14px 18px;cursor:pointer;user-select:none}
.eng-lhead:hover{background:var(--panel2)}
.eng-ltoggle{width:24px;height:24px;border-radius:7px;border:1.5px solid var(--line);display:grid;place-items:center;flex-shrink:0;color:transparent;background:var(--panel);transition:.15s;cursor:pointer}
.eng-lesson.learned .eng-ltoggle{background:linear-gradient(135deg,var(--good),var(--acc));border-color:transparent;color:#fff}
.eng-ltitle{flex:1;font-size:15px;font-weight:600;line-height:1.4}
.eng-lchev{color:var(--dim);flex-shrink:0;display:grid;transition:.2s}
.eng-lesson.open .eng-lchev{transform:rotate(180deg);color:var(--acc)}
.eng-lbody{max-height:0;overflow:hidden;transition:max-height .3s ease}
.eng-lesson.open .eng-lbody{max-height:500px}
.eng-lbin{padding:0 18px 16px 54px;color:var(--ink);font-size:15px;line-height:1.65}
.eng-tag{display:inline-block;margin-top:10px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;color:var(--acc);background:color-mix(in srgb,var(--acc) 10%,transparent);border:1px solid color-mix(in srgb,var(--acc) 25%,transparent);border-radius:7px;padding:3px 9px}
.eng-rnav{display:flex;gap:10px;align-items:center;margin-top:22px;flex-wrap:wrap}
.eng-rnav .sp{flex:1}
.eng-notebox{background:var(--panel2);border:1px dashed var(--line);border-radius:14px;padding:14px 16px;margin:18px 0}
.eng-notebox label{font-size:12px;color:var(--mut);font-weight:600;display:flex;align-items:center;gap:7px}
.eng-notebox textarea{width:100%;margin-top:8px;background:var(--panel);border:1px solid var(--line);border-radius:10px;color:var(--ink);padding:11px;font:14px/1.55 var(--sans);resize:vertical;min-height:90px}
.eng-notebox textarea:focus{outline:none;border-color:var(--acc)}

/* flashcards */
.eng-card-wrap{perspective:1600px;max-width:580px;margin:0 auto}
.eng-flip{position:relative;width:100%;min-height:240px;transition:transform .55s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d;cursor:pointer}
.eng-flip.f{transform:rotateY(180deg)}
.eng-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:var(--radius);border:1px solid var(--line);padding:32px;display:flex;flex-direction:column;justify-content:center;background:var(--panel);box-shadow:var(--shadow)}
.eng-face.back{transform:rotateY(180deg);background:var(--panel2)}
.eng-face .lab{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--dim);margin-bottom:10px}
.eng-face .term{font-family:var(--serif);font-size:28px;font-weight:700;letter-spacing:-.4px;color:var(--ink)}
.eng-face .def{font-size:16.5px;color:var(--ink);line-height:1.55}
.eng-cardbar{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
.eng-cprog{text-align:center;color:var(--mut);font-size:12.5px;margin-top:12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}

/* quiz */
.eng-q{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:14px;box-shadow:var(--shadow)}
.eng-q .qn{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;color:var(--acc);letter-spacing:.7px;font-weight:700}
.eng-q .qt{font-size:16.5px;font-weight:600;margin:8px 0 14px;color:var(--ink)}
.eng-opt{display:block;width:100%;text-align:left;background:var(--panel2);border:1px solid var(--line);color:var(--ink);border-radius:11px;padding:12px 14px;margin-bottom:8px;font-size:14.5px;font-family:var(--sans);transition:.15s;cursor:pointer}
.eng-opt:hover{border-color:var(--acc)}
.eng-opt.sel{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 10%,transparent)}
.eng-opt.correct{border-color:var(--good);background:color-mix(in srgb,var(--good) 14%,transparent)}
.eng-opt.wrong{border-color:var(--bad);background:color-mix(in srgb,var(--bad) 12%,transparent)}
.eng-expl{font-size:13.5px;color:var(--mut);margin-top:10px;padding:10px 12px;background:var(--panel2);border-radius:9px;border-left:2px solid var(--acc2)}
.eng-score{font-family:var(--serif);font-size:64px;font-weight:700;letter-spacing:-2px;line-height:1}
.eng-bar-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--line);font-size:14px}
.eng-bar-row .bn{flex:1}
.eng-bar-row .bv{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:var(--mut);min-width:50px;text-align:right}
.eng-bar{height:7px;background:var(--line);border-radius:5px;overflow:hidden;width:130px;flex-shrink:0}
.eng-bar i{display:block;height:100%;border-radius:5px}

/* notes */
.eng-note{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 18px;margin-bottom:12px;box-shadow:var(--shadow)}
.eng-note .nh{display:flex;align-items:center;gap:10px;margin-bottom:8px;flex-wrap:wrap}
.eng-note .nh b{font-size:14.5px;color:var(--ink)}
.eng-note .nh .src{font-size:11px;color:var(--dim);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.eng-note .nb{color:var(--ink);font-size:14px;white-space:pre-wrap;line-height:1.55}

/* arena */
.eng-arena-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px}
.eng-arena-cat{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:20px;position:relative;overflow:hidden;box-shadow:var(--shadow)}
.eng-arena-cat:before{content:"";position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--ca,var(--acc)),transparent)}
.eng-arena-cat h4{margin:0 0 4px;font-size:15.5px;display:flex;align-items:center;gap:9px;color:var(--ink)}
.eng-arena-cat .cd{font-size:12.5px;color:var(--mut);margin:0 0 12px}
.eng-arena-link{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;border:1px solid transparent;margin:0 -6px;transition:.15s;color:var(--ink)}
.eng-arena-link:hover{background:var(--panel2);border-color:var(--line);text-decoration:none}
.eng-arena-link .sdot{width:8px;height:8px;border-radius:50%;background:var(--ca,var(--acc));flex-shrink:0}
.eng-arena-link .body{min-width:0;flex:1}
.eng-arena-link b{font-size:13.5px;font-weight:600;display:block}
.eng-arena-link small{font-size:11px;color:var(--dim);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.eng-arena-link .ext{margin-left:auto;color:var(--dim);flex-shrink:0}

/* progress dashboard */
.eng-dash-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
.eng-dash-card{background:var(--panel);border:1px solid var(--line);border-radius:var(--radius);padding:22px;box-shadow:var(--shadow)}
.eng-dash-card .dv{font-family:var(--serif);font-size:38px;font-weight:700;letter-spacing:-1.5px;line-height:1;color:var(--ink)}
.eng-dash-card .dl{color:var(--mut);font-size:13px;margin-top:8px}
.eng-prow{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid var(--line)}
.eng-prow .pno{width:28px;height:28px;border-radius:8px;display:grid;place-items:center;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;font-weight:800;color:#fff;flex-shrink:0;background:linear-gradient(135deg,var(--pa,var(--acc)),var(--pb,var(--acc2)))}
.eng-prow .pname{flex:1;font-size:14.5px;color:var(--ink)}
.eng-prow .pct{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;color:var(--mut);min-width:48px;text-align:right}

.eng-empty{text-align:center;color:var(--dim);padding:48px 20px;font-size:14px}
.eng-stats{display:flex;flex-wrap:wrap;gap:24px;margin:30px 0 0;padding-top:24px;border-top:1px solid var(--line)}
.eng-stats .s b{font-family:var(--serif);font-size:28px;letter-spacing:-1px;display:block;line-height:1;color:var(--ink)}
.eng-stats .s span{font-size:13px;color:var(--mut)}

@media(max-width:640px){
  .eng-tabs{width:100%;overflow-x:auto;flex-wrap:nowrap}
  .eng-tab{flex-shrink:0}
  .eng-tab .ct{display:none}
}

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
  const link = (href, label, key = "", extra = "") => {
    const cls = [extra, key && key === active ? "active" : ""].filter(Boolean).join(" ");
    return `<a href="${href}"${cls ? ` class="${cls}"` : ""}>${label}</a>`;
  };
  return `<header class="nav"><div class="wrap">
    <a class="brand" href="${u("/")}">
      <span class="mark">AI</span>
      <span>The AI School<small>Learn it. Build it.</small></span>
    </a>
    <nav class="navlinks">
      ${link(u("/#programs"), "Programs", "programs")}
      ${link(u("/#practical"), "Practical AI", "practical")}
      ${link(u("/ai-engineering/"), "AI Engineering", "engineering")}
      ${link(u("/#about"), "About", "about")}
      ${link(u("/ai-engineering/"), "Enter a course →", "", "cta")}
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
        <a href="${u("/privacy.html")}">Privacy &amp; security</a>
        <a href="https://github.com/paisabrazilfl-cpu/the-ai-school" target="_blank" rel="noopener">Source on GitHub</a>
      </div>
    </div>
    <div class="legal">
      <span>© ${new Date().getFullYear()} The AI School · Educational synthesis — verify fast-moving specifics against primary sources.</span>
      <span>Private by design · no tracking · works offline.</span>
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
  // Privacy/security hygiene applied to every page (SOC 2-aligned, not certified):
  // - tight CSP allowing only the origin + the fonts/icons CDNs we actually use
  // - strict-origin-when-cross-origin referrer (no full URLs leaking)
  // - frame-ancestors 'none' to prevent click-jacking
  // - X-Content-Type-Options nosniff
  // - no analytics, no third-party trackers, no cookies (localStorage only)
  return `<!DOCTYPE html>
<html lang="en" data-theme="${themeInit}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(desc)}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com data:; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta name="theme-color" content="#f5f7fc" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b1020" media="(prefers-color-scheme: dark)">
<meta name="robots" content="index,follow">
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
  // Strip the H1 (we render our own header) AND any "WEB VERIFICATION NOT
  // AVAILABLE…" blockquote authoring notes that were artifacts of the offline
  // drafting process — those don't belong on the public site.
  const cleaned = md
    .replace(/^#\s+.*$/m, "")
    .replace(/^>\s*WEB VERIFICATION NOT AVAILABLE[^\n]*\n?/gim, "")
    .trim();
  const html = marked.parse(cleaned);

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

function renderPrivacy() {
  const body = `${navBar("")}
  <div class="wrap"><article class="article" style="max-width:760px;margin:48px auto">
    <div class="crumb"><a href="${u("/")}">The AI School</a> · Privacy &amp; security</div>
    <div class="kicker">PRIVACY &amp; SECURITY</div>
    <h1>How we handle your data — short version</h1>
    <div class="prose">
      <p><b>The short version:</b> nothing you do here leaves your device. No account, no email, no tracking, no analytics, no cookies. Your progress and notes are stored only in your browser&apos;s local storage and stay there until you clear them.</p>

      <h2>What we collect</h2>
      <p><b>Nothing about you, personally.</b> The school runs as a static site served from GitHub Pages — there is no backend that receives form data, opinions, or behavior. Specifically:</p>
      <ul>
        <li><b>No account or sign-up.</b> The "Display name" field on AI Engineering is optional and used only to render a greeting on your own screen. It is never transmitted.</li>
        <li><b>No analytics.</b> No Google Analytics, no Plausible, no Mixpanel, no pixel, no telemetry.</li>
        <li><b>No cookies.</b> The site sets no cookies at all.</li>
        <li><b>No tracking scripts</b> and no advertising network code.</li>
      </ul>

      <h2>What we store on your device</h2>
      <p>The AI Engineering app uses <code>localStorage</code> (a browser feature) to remember which lessons you&apos;ve marked learned, your flashcard "known" set, quiz scores, your private notes, and your light/dark theme. This data is:</p>
      <ul>
        <li><b>Local to your browser</b> — it never travels over the network.</li>
        <li><b>Cleared by you</b> any time, either via your browser&apos;s site-data settings or by clicking <i>Exit</i> in the app.</li>
        <li><b>Not portable to other devices</b> — that is by design; we don&apos;t sync anything.</li>
      </ul>

      <h2>What gets loaded from third parties</h2>
      <p>To keep typography and icons sharp, the pages load a small number of static assets from public CDNs:</p>
      <ul>
        <li><a href="https://fonts.google.com/" target="_blank" rel="noopener">Google Fonts</a> — Inter and Playfair Display.</li>
        <li><a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a> — icon library, loaded from unpkg.</li>
      </ul>
      <p>These CDNs can see that your IP requested those assets, in the same way that any website embedding them can. We do not send them anything else, and a strict Content-Security-Policy on every page prevents any other origin from loading scripts, fonts, or styles.</p>

      <h2>Security hygiene we&apos;ve applied</h2>
      <ul>
        <li><b>Content-Security-Policy</b> on every page, restricting scripts/styles/fonts to the school&apos;s own origin plus the two CDNs above. <code>frame-ancestors 'none'</code> blocks click-jacking.</li>
        <li><b>Referrer-Policy</b> set to <code>strict-origin-when-cross-origin</code>, so external links don&apos;t leak the page you came from.</li>
        <li><b>X-Content-Type-Options</b> set to <code>nosniff</code>.</li>
        <li><b>HTTPS-only</b> via GitHub Pages.</li>
        <li><b>No mutable backend.</b> The site is generated from Markdown at build time and shipped as static files, so there is no server to compromise.</li>
        <li><b>Open source</b> — the build script and content live in a public repository you can audit.</li>
      </ul>

      <h2>An honest note on "SOC 2"</h2>
      <p>SOC 2 is an organizational audit framework — not something a static educational site can earn from code alone. We can&apos;t (and don&apos;t) claim a SOC 2 certification. What we <i>have</i> done is align this site with the relevant SOC 2 principles for a free, no-account learning resource: <b>data minimization</b> (we don&apos;t collect data we don&apos;t need), <b>transparency</b> (this page), <b>confidentiality</b> (local-only persistence), and <b>integrity</b> (open-source, reproducible build).</p>

      <h2>Contact</h2>
      <p>Found a privacy or security concern? Please open an issue on the <a href="https://github.com/paisabrazilfl-cpu/the-ai-school/issues" target="_blank" rel="noopener">public repository</a>.</p>
    </div>
    <p class="endnote">Last updated: ${new Date().toISOString().slice(0, 10)}. <a href="${u("/")}">Back to school</a>.</p>
  </article></div>
  ${footer()}`;
  return page({
    title: "Privacy & security — The AI School",
    desc: "How The AI School handles your data: nothing leaves your device. No account, no tracking, no cookies, no analytics. Strict CSP, HTTPS, local-only persistence.",
    body,
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
  // Pull only the DATA (PARTS, CARDS, QUIZ, ARENA) out of the canonical
  // single-file engineering app. The chrome, styling, gate, and SPA
  // are rewritten from scratch here so AI Engineering is a first-class
  // part of the school — same nav, same footer, same design tokens.
  const raw = readFileSync(join(__dirname, "ai-engineering.html"), "utf8");
  const dStart = raw.indexOf("const PARTS=[");
  const dEnd = raw.indexOf("\nlet USER=");
  if (dStart < 0 || dEnd < 0) throw new Error("could not extract data arrays from ai-engineering.html");
  const dataJs = raw.slice(dStart, dEnd);

  const tabs = [
    ["library", "Library", "layout-grid"],
    ["cards", "Flashcards", "layers"],
    ["quiz", "Quiz", "clipboard-check"],
    ["notes", "Notes", "notebook-pen"],
    ["arena", "Arena", "newspaper"],
    ["dash", "Progress", "trophy"],
  ];

  const hero = `<section class="hero"><div class="wrap">
    <span class="eyebrow">${ICON("cpu")} AI Engineering Track · 7 parts · ${ENG_CHAPTERS} chapters</span>
    <h1>AI Engineering, <span class="hl">end&#8209;to&#8209;end</span></h1>
    <p class="lede">The whole stack, the honest way: foundations → how models work → the application layer → agent harnesses → modalities → systems &amp; MLOps → the research frontier. Interactive lessons, flashcards, quizzes — everything stored locally on your device.</p>
    <div class="eng-tabs" id="eng-tabs" role="tablist">
      ${tabs.map((t, i) => `<button class="eng-tab${i === 0 ? " on" : ""}" data-tab="${t[0]}" role="tab">${ICON(t[2])} ${t[1]} <span class="ct" id="ct-${t[0]}"></span></button>`).join("")}
    </div>
  </div></section>`;

  const views = tabs.map((t) => `<section class="eng-view${t[0] === "library" ? " on" : ""}" id="v-${t[0]}"></section>`).join("\n      ");
  const main = `<main class="wrap" style="padding:34px 22px 70px">${views}</main>`;

  // SPA logic — works directly against school CSS classes.
  const spa = `<script>
${dataJs}

(function(){
  const esc=s=>String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
  function icons(){try{if(window.lucide&&lucide.createIcons)lucide.createIcons()}catch(e){}}

  // ---- state (localStorage, namespaced) ----
  const KEY="school_eng_v1";
  let STATE={learned:{},known:{},notes:{},scores:[]};
  const mem={};
  const lg=k=>{try{return localStorage.getItem(k)}catch(e){return k in mem?mem[k]:null}};
  const ls=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){mem[k]=v}};
  function load(){try{STATE=Object.assign(STATE,JSON.parse(lg(KEY)||"{}"))}catch(e){}STATE.learned=STATE.learned||{};STATE.known=STATE.known||{};STATE.notes=STATE.notes||{};STATE.scores=STATE.scores||[]}
  const save=()=>ls(KEY,JSON.stringify(STATE));
  load();

  // ---- index chapters ----
  const CH=[];
  PARTS.forEach((p,pi)=>p.ch.forEach((c,ci)=>CH.push({gid:CH.length+1,pid:p.id,part:p,pi,ci,id:p.id+":"+ci,title:c[0],blurb:c[1],ideas:c[2]})));
  const chById=id=>CH.find(c=>c.id===id);
  const partChaps=pid=>CH.filter(c=>c.pid===pid);
  const lk=(cid,i)=>cid+"#"+i;
  const chLearned=c=>c.ideas.reduce((n,_,i)=>n+(STATE.learned[lk(c.id,i)]?1:0),0);
  const chDone=c=>chLearned(c)===c.ideas.length;
  const partPct=pid=>{const cs=partChaps(pid),d=cs.filter(chDone).length;return{d,t:cs.length,p:Math.round(100*d/cs.length)}};

  // ---- tab nav (hash-routed) ----
  const tabBtns=Array.from(document.querySelectorAll("#eng-tabs .eng-tab"));
  const views={};${tabs.map((t) => `views["${t[0]}"]=document.getElementById("v-${t[0]}");`).join("")}
  function go(tab,arg){
    if(!views[tab])tab="library";
    tabBtns.forEach(b=>b.classList.toggle("on",b.dataset.tab===tab));
    Object.keys(views).forEach(k=>views[k].classList.toggle("on",k===tab));
    location.hash=arg?(tab+"/"+encodeURIComponent(arg)):tab;
    ({library:rLib,reader:()=>rRead(arg),cards:rCards,quiz:rQuiz,notes:rNotes,arena:rArena,dash:rDash}[tab]||rLib)();
    window.scrollTo({top:0,behavior:"smooth"});icons();updateCounts();
  }
  tabBtns.forEach(b=>b.addEventListener("click",()=>go(b.dataset.tab)));
  function updateCounts(){
    const done=CH.filter(chDone).length;
    const set=(id,v)=>{const el=document.getElementById("ct-"+id);if(el)el.textContent=v};
    set("library", done+"/"+CH.length);
    set("cards", Object.keys(STATE.known).filter(k=>STATE.known[k]).length+"/"+CARDS.length);
    set("notes", Object.keys(STATE.notes).filter(k=>STATE.notes[k]&&STATE.notes[k].trim&&STATE.notes[k].trim()).length);
    set("dash", Math.round(100*done/CH.length)+"%");
  }

  // ---- LIBRARY ----
  function rLib(){
    const done=CH.filter(chDone).length,lessons=CH.reduce((n,c)=>n+chLearned(c),0),total=CH.reduce((n,c)=>n+c.ideas.length,0);
    let h=\`<div class="eng-stats">
      <div class="s"><b>\${done}/\${CH.length}</b><span>chapters mastered</span></div>
      <div class="s"><b>\${lessons}/\${total}</b><span>lessons learned</span></div>
      <div class="s"><b>\${CARDS.length}</b><span>flashcards</span></div>
      <div class="s"><b>\${QUIZ.length}</b><span>quiz items</span></div>
    </div>
    <p style="color:var(--mut);font-size:14px;margin:18px 0 22px"><i data-lucide="hand-pointer"></i> Tap a part to expand it · open any chapter to read &amp; mark lessons learned.</p>\`;
    PARTS.forEach((p,pi)=>{
      const pr=partPct(p.id);
      h+=\`<details class="eng-part" id="ep-\${p.id}" style="--pa:\${p.a};--pb:\${p.b}"\${pi===0?" open":""}>
        <summary>
          <div class="pno">\${pi+1}</div>
          <div class="gh"><b>\${esc(p.t)}</b><span>\${esc(p.s)}</span></div>
          <div class="gmeta">
            <span class="pill">\${p.ch.length} ch</span>
            <div class="ring" style="--p:\${pr.p}"><i>\${pr.p}%</i></div>
            <span class="chev"><i data-lucide="chevron-right"></i></span>
          </div>
        </summary>
        <div class="chaps">\`;
      partChaps(p.id).forEach(c=>{
        const lc=chLearned(c),lt=c.ideas.length;
        h+=\`<a class="eng-chap" data-cid="\${c.id}" href="#reader/\${encodeURIComponent(c.id)}">
          <span class="cnum">CH \${c.gid}</span>
          <span class="cbody"><b>\${esc(c.title)}</b><span>\${esc(c.blurb)}</span></span>
          <span class="cr">\${chDone(c)?'<i data-lucide="check-check" style="color:var(--good)"></i>':'<div class="mini"><i style="width:'+Math.round(100*lc/lt)+'%"></i></div>'+lc+'/'+lt}</span>
          <span class="cgo"><i data-lucide="chevron-right"></i></span>
        </a>\`;
      });
      h+=\`</div></details>\`;
    });
    views.library.innerHTML=h;
    views.library.querySelectorAll(".eng-chap").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go("reader",a.dataset.cid)}));
    icons();
  }

  // ---- READER ----
  function rRead(id){
    const c=id?chById(id):CH[0];if(!c){go("library");return}
    const i=CH.indexOf(c),prev=CH[i-1],next=CH[i+1];
    let h=\`<div class="eng-reader" style="--la:\${c.part.a}">
      <div class="eng-reader-top">
        <span class="pill">\${esc(c.part.t)} · CH \${c.gid} of \${CH.length}</span>
        <span class="pill" style="border-color:\${c.part.a};color:\${c.part.a}">Part \${c.pi+1}</span>
        <span class="pill" id="cdone">\${chLearned(c)}/\${c.ideas.length} learned</span>
      </div>
      <h2>\${esc(c.title)}</h2>
      <p class="blurb">\${esc(c.blurb)}</p>\`;
    c.ideas.forEach((t,idx)=>{
      const on=!!STATE.learned[lk(c.id,idx)];
      h+=\`<div class="eng-lesson\${on?" learned":""}" id="les-\${idx}">
        <div class="eng-lhead" data-i="\${idx}">
          <button class="eng-ltoggle" data-toggle="\${idx}" aria-label="Mark learned"><i data-lucide="check"></i></button>
          <div class="eng-ltitle">\${esc(t[0])}</div>
          <span class="eng-lchev"><i data-lucide="chevron-down"></i></span>
        </div>
        <div class="eng-lbody"><div class="eng-lbin">\${esc(t[1])}\${t[2]?'<br><span class="eng-tag">'+esc(t[2])+'</span>':""}</div></div>
      </div>\`;
    });
    h+=\`<div class="eng-notebox"><label><i data-lucide="pencil"></i> Chapter notes</label>
        <textarea id="cnote" placeholder="Notes for this chapter — saved automatically.">\${esc(STATE.notes[c.id]||"")}</textarea></div>
      <div class="eng-rnav">
        <button class="btn" data-go="library"><i data-lucide="arrow-left"></i> Library</button>
        <button class="btn" data-cardpart="\${c.pid}"><i data-lucide="layers"></i> Cards for this part</button>
        <button class="btn" data-quizpart="\${c.pid}"><i data-lucide="clipboard-check"></i> Quiz this part</button>
        <div class="sp"></div>
        <button class="btn primary" data-markall="\${c.id}"><i data-lucide="check-check"></i> Mark all learned</button>
      </div>
      <div class="eng-rnav">
        \${prev?'<button class="btn" data-go-reader="'+prev.id+'"><i data-lucide="arrow-left"></i> CH '+prev.gid+'</button>':'<span></span>'}
        <div class="sp"></div>
        \${next?'<button class="btn" data-go-reader="'+next.id+'">CH '+next.gid+' <i data-lucide="arrow-right"></i></button>':''}
      </div>
    </div>\`;
    views.reader.innerHTML=h;
    const firstOpen=c.ideas.findIndex((_,idx)=>!STATE.learned[lk(c.id,idx)]);
    const openIdx=firstOpen<0?0:firstOpen;
    const fEl=document.getElementById("les-"+openIdx); if(fEl)fEl.classList.add("open");
    // wire lesson toggles
    views.reader.querySelectorAll(".eng-lhead").forEach(el=>el.addEventListener("click",e=>{
      if(e.target.closest("[data-toggle]"))return;
      const idx=+el.dataset.i;document.getElementById("les-"+idx).classList.toggle("open");icons();
    }));
    views.reader.querySelectorAll("[data-toggle]").forEach(b=>b.addEventListener("click",e=>{
      e.stopPropagation();const idx=+b.dataset.toggle;const key=lk(c.id,idx);
      if(STATE.learned[key])delete STATE.learned[key];else STATE.learned[key]=true;save();
      document.getElementById("les-"+idx).classList.toggle("learned",!!STATE.learned[key]);
      const cd=document.getElementById("cdone");if(cd)cd.textContent=chLearned(c)+"/"+c.ideas.length+" learned";
      updateCounts();icons();
    }));
    views.reader.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.go)));
    views.reader.querySelectorAll("[data-go-reader]").forEach(b=>b.addEventListener("click",()=>go("reader",b.dataset.goReader)));
    views.reader.querySelectorAll("[data-cardpart]").forEach(b=>b.addEventListener("click",()=>{go("cards");document.getElementById("cPart").value=b.dataset.cardpart;rebuildCards()}));
    views.reader.querySelectorAll("[data-quizpart]").forEach(b=>b.addEventListener("click",()=>{go("quiz");document.getElementById("qScope").value=b.dataset.quizpart;startQuiz()}));
    views.reader.querySelector("[data-markall]").addEventListener("click",()=>{
      const all=c.ideas.every((_,i)=>STATE.learned[lk(c.id,i)]);
      c.ideas.forEach((_,i)=>{const key=lk(c.id,i);if(all)delete STATE.learned[key];else STATE.learned[key]=true});
      save();rRead(c.id);updateCounts();
    });
    document.getElementById("cnote").addEventListener("input",e=>{STATE.notes[c.id]=e.target.value;save();updateCounts()});
    icons();
  }

  // ---- FLASHCARDS ----
  let CSET=[],CI=0;
  function rCards(){
    views.cards.innerHTML=\`<div class="eng-controls">
      <select id="cPart"><option value="*">All parts</option>\${PARTS.map((p,i)=>'<option value="'+p.id+'">Part '+(i+1)+' · '+esc(p.t)+'</option>').join("")}</select>
      <select id="cFilt"><option value="all">All cards</option><option value="unknown">Only unknown</option></select>
      <button class="btn" id="shufBtn"><i data-lucide="shuffle"></i> Shuffle</button>
    </div><div id="cArea"></div>\`;
    document.getElementById("cPart").addEventListener("change",rebuildCards);
    document.getElementById("cFilt").addEventListener("change",rebuildCards);
    document.getElementById("shufBtn").addEventListener("click",()=>{CSET=shuffle(CSET);CI=0;drawCard()});
    rebuildCards();icons();
  }
  function rebuildCards(){
    const p=document.getElementById("cPart").value,f=document.getElementById("cFilt").value;
    let s=CARDS.map((c,i)=>({term:c[0],def:c[1],pid:c[2],key:"c"+i})).filter(c=>p==="*"||c.pid===p);
    if(f==="unknown")s=s.filter(c=>!STATE.known[c.key]);CSET=s;CI=0;drawCard();
  }
  function drawCard(){
    const a=document.getElementById("cArea");if(!a)return;
    if(!CSET.length){a.innerHTML='<div class="eng-empty">No cards match this filter.</div>';return}
    const c=CSET[CI],k=!!STATE.known[c.key],pt=PARTS.find(p=>p.id===c.pid);
    a.innerHTML=\`<div class="eng-card-wrap"><div class="eng-flip" id="flip">
        <div class="eng-face front"><div class="lab">Term · \${esc(pt.t)}</div><div class="term">\${esc(c.term)}</div><div class="lab" style="margin-top:18px">tap to flip</div></div>
        <div class="eng-face back"><div class="lab">Definition</div><div class="def">\${esc(c.def)}</div></div>
      </div></div>
      <div class="eng-cardbar">
        <button class="btn" id="prevC"><i data-lucide="arrow-left"></i></button>
        <button class="btn \${k?"":"primary"}" id="knC">\${k?'<i data-lucide="check"></i> Known':"Mark known"}</button>
        <button class="btn" id="nextC"><i data-lucide="arrow-right"></i></button>
      </div>
      <div class="eng-cprog">\${CI+1} / \${CSET.length} · \${CSET.filter(x=>STATE.known[x.key]).length} known</div>\`;
    document.getElementById("flip").addEventListener("click",function(){this.classList.toggle("f")});
    document.getElementById("prevC").addEventListener("click",()=>{CI=(CI-1+CSET.length)%CSET.length;drawCard()});
    document.getElementById("nextC").addEventListener("click",()=>{CI=(CI+1)%CSET.length;drawCard()});
    document.getElementById("knC").addEventListener("click",()=>{if(STATE.known[c.key])delete STATE.known[c.key];else STATE.known[c.key]=true;save();setTimeout(()=>{CI=(CI+1)%CSET.length;drawCard();updateCounts()},150)});
    icons();
  }

  // ---- QUIZ ----
  let EXAM=null;
  function rQuiz(){
    if(EXAM){drawExam();return}
    const last=STATE.scores.slice(-3).reverse();
    views.quiz.innerHTML=\`<div class="eng-controls">
        <select id="qScope"><option value="*">All parts</option>\${PARTS.map((p,i)=>'<option value="'+p.id+'">Part '+(i+1)+' · '+esc(p.t)+'</option>').join("")}</select>
        <button class="btn primary" id="qStart"><i data-lucide="play"></i> Start</button>
      </div>
      <p style="color:var(--mut);font-size:14px;margin:0 0 18px">Multiple-choice, pass line 75%. Option order is shuffled each attempt.</p>
      \${last.length?'<h4 style="margin:22px 0 8px;color:var(--ink);font-size:14px">Recent</h4>'+last.map(s=>'<div class="eng-bar-row"><div class="bn">'+esc(s.label)+'</div><div class="eng-bar"><i style="width:'+s.pct+'%;background:'+(s.pct>=75?'var(--good)':'var(--warn)')+'"></i></div><div class="bv" style="color:'+(s.pct>=75?'var(--good)':'var(--warn)')+'">'+s.pct+'%</div></div>').join(""):''}\`;
    document.getElementById("qStart").addEventListener("click",startQuiz);icons();
  }
  function startQuiz(){
    const sc=document.getElementById("qScope").value;
    let pool=QUIZ.map(q=>({pid:q[0],q:q[1],opts:q[2],ans:q[3],expl:q[4]})).filter(q=>sc==="*"||q.pid===sc);
    pool=shuffle(pool).slice(0,sc==="*"?Math.min(15,pool.length):pool.length);
    pool=pool.map(it=>{const order=shuffle(it.opts.map((_,i)=>i));return Object.assign({},it,{opts:order.map(i=>it.opts[i]),ans:order.indexOf(it.ans)})});
    const label=sc==="*"?"All parts":("Part "+(PARTS.findIndex(p=>p.id===sc)+1)+" · "+PARTS.find(p=>p.id===sc).t);
    EXAM={label,items:pool,ans:Array(pool.length).fill(null),done:false};drawExam();
  }
  function drawExam(){
    if(EXAM.done){drawResults();return}
    let h="";
    EXAM.items.forEach((it,i)=>{const pt=PARTS.find(p=>p.id===it.pid);
      h+=\`<div class="eng-q"><div class="qn">Q\${i+1} · \${esc(pt.t)}</div><div class="qt">\${esc(it.q)}</div>\`;
      it.opts.forEach((o,oi)=>h+='<button class="eng-opt'+(EXAM.ans[i]===oi?' sel':'')+'" data-q="'+i+'" data-o="'+oi+'">'+esc(o)+'</button>');
      h+="</div>";
    });
    const ansd=EXAM.ans.filter(a=>a!==null).length;
    h+=\`<div class="eng-rnav"><button class="btn" id="qCancel">Cancel</button><div class="sp"></div><span class="pill">\${ansd}/\${EXAM.items.length}</span><button class="btn primary" id="qSubmit">Submit</button></div>\`;
    views.quiz.innerHTML='<h3 style="font-family:var(--serif);font-size:22px;margin:0 0 16px;color:var(--ink)">'+esc(EXAM.label)+'</h3>'+h;
    views.quiz.querySelectorAll(".eng-opt").forEach(b=>b.addEventListener("click",()=>{
      const qi=+b.dataset.q,oi=+b.dataset.o;EXAM.ans[qi]=oi;
      views.quiz.querySelectorAll('.eng-opt[data-q="'+qi+'"]').forEach((o,k)=>o.classList.toggle("sel",k===oi));
      const a=EXAM.ans.filter(x=>x!==null).length;views.quiz.querySelector(".pill").textContent=a+"/"+EXAM.items.length;
    }));
    document.getElementById("qCancel").addEventListener("click",()=>{EXAM=null;rQuiz()});
    document.getElementById("qSubmit").addEventListener("click",grade);
  }
  function grade(){
    if(EXAM.ans.includes(null)&&!confirm("Some questions are unanswered — submit anyway?"))return;
    let c=0;const byp={};
    EXAM.items.forEach((it,i)=>{const ok=EXAM.ans[i]===it.ans;if(ok)c++;const ptn=PARTS.find(p=>p.id===it.pid).t;(byp[ptn]=byp[ptn]||{c:0,t:0}).t++;if(ok)byp[ptn].c++});
    const pct=Math.round(100*c/EXAM.items.length);
    EXAM.done=true;EXAM.c=c;EXAM.pct=pct;EXAM.byp=byp;
    STATE.scores.push({label:EXAM.label,pct,at:Date.now()});save();drawResults();
  }
  function drawResults(){
    const pass=EXAM.pct>=75;
    let h='<div style="display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-bottom:22px"><div class="eng-score" style="color:'+(pass?"var(--good)":"var(--warn)")+'">'+EXAM.pct+'%</div><div><div style="font-size:18px;font-weight:800;color:'+(pass?"var(--good)":"var(--warn)")+'">'+(pass?"Passed":"Keep going")+'</div><div style="color:var(--mut);font-size:14px">'+EXAM.c+' / '+EXAM.items.length+' correct · pass 75%</div></div></div>';
    h+='<h4 style="margin:8px 0;color:var(--ink);font-size:14px">By part</h4>';
    Object.keys(EXAM.byp).forEach(k=>{const b=EXAM.byp[k],p=Math.round(100*b.c/b.t);
      h+='<div class="eng-bar-row"><div class="bn">'+esc(k)+'</div><div class="eng-bar"><i style="width:'+p+'%;background:'+(p>=75?"var(--good)":p>=50?"var(--warn)":"var(--bad)")+'"></i></div><div class="bv">'+b.c+'/'+b.t+'</div></div>'});
    h+='<h4 style="margin:24px 0 8px;color:var(--ink);font-size:14px">Review</h4>';
    EXAM.items.forEach((it,i)=>{const ua=EXAM.ans[i];
      h+='<div class="eng-q"><div class="qn">Q'+(i+1)+'</div><div class="qt">'+esc(it.q)+'</div>';
      it.opts.forEach((o,oi)=>{let cl="eng-opt";if(oi===it.ans)cl+=" correct";else if(oi===ua)cl+=" wrong";h+='<div class="'+cl+'">'+esc(o)+'</div>'});
      h+='<div class="eng-expl"><b>'+(ua===it.ans?"Correct. ":"Answer: ")+'</b>'+esc(it.expl)+'</div></div>'});
    h+='<div class="eng-rnav"><button class="btn primary" id="qDone">Done</button><button class="btn" id="qRetake">Retake</button></div>';
    views.quiz.innerHTML='<h3 style="font-family:var(--serif);font-size:22px;margin:0 0 18px;color:var(--ink)">'+esc(EXAM.label)+'</h3>'+h;
    document.getElementById("qDone").addEventListener("click",()=>{EXAM=null;rQuiz()});
    document.getElementById("qRetake").addEventListener("click",startQuiz);icons();
  }

  // ---- NOTES ----
  function rNotes(){
    const notes=CH.filter(c=>STATE.notes[c.id]&&STATE.notes[c.id].trim());
    let h=\`<div class="eng-controls">
      <input id="nsearch" placeholder="Search notes…" style="min-width:240px;flex:1">
      <button class="btn" id="nexport"><i data-lucide="download"></i> Export .md</button>
    </div>
    <div class="eng-notebox"><label><i data-lucide="sparkles"></i> Global scratchpad</label>
      <textarea id="scratch" style="min-height:120px" placeholder="Cross-cutting thoughts, questions, TODOs…">\${esc(STATE.notes._s||"")}</textarea>
    </div>
    <div id="nlist">\${notes.length?"":'<div class="eng-empty">No chapter notes yet — open any chapter and start writing.</div>'}</div>\`;
    views.notes.innerHTML=h;
    const list=document.getElementById("nlist");
    notes.forEach(c=>{const card=document.createElement("div");card.className="eng-note";card.dataset.x=(c.title+" "+STATE.notes[c.id]).toLowerCase();
      card.innerHTML='<div class="nh"><b>'+esc(c.title)+'</b><span class="src">'+esc(c.part.t)+' · CH '+c.gid+'</span><button class="btn" style="margin-left:auto" data-r="'+c.id+'">Open</button></div><div class="nb">'+esc(STATE.notes[c.id])+'</div>';
      list.appendChild(card);card.querySelector("[data-r]").addEventListener("click",()=>go("reader",c.id))});
    document.getElementById("nsearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase();list.querySelectorAll(".eng-note").forEach(n=>n.style.display=n.dataset.x.includes(q)?"":"none")});
    document.getElementById("scratch").addEventListener("input",e=>{STATE.notes._s=e.target.value;save();updateCounts()});
    document.getElementById("nexport").addEventListener("click",()=>{let md="# AI Engineering — Notes\\n\\n_"+new Date().toLocaleString()+"_\\n\\n";if(STATE.notes._s&&STATE.notes._s.trim())md+="## Scratchpad\\n\\n"+STATE.notes._s+"\\n\\n";CH.forEach(c=>{if(STATE.notes[c.id]&&STATE.notes[c.id].trim())md+="## "+c.part.t+" — CH "+c.gid+": "+c.title+"\\n\\n"+STATE.notes[c.id]+"\\n\\n"});const b=new Blob([md],{type:"text/markdown"});const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="ai-engineering-notes.md";a.click()});
    icons();
  }

  // ---- ARENA ----
  function rArena(){
    let h='<p style="color:var(--mut);font-size:14.5px;margin:0 0 22px">Curated tier-1 AI sources — labs, research, leaderboards, analysts. External links open in new tabs.</p><div class="eng-arena-grid">';
    ARENA.forEach(c=>{h+='<div class="eng-arena-cat" style="--ca:'+c.color+'"><h4><span style="width:11px;height:11px;border-radius:50%;background:'+c.color+';display:inline-block"></span>'+esc(c.cat)+'</h4><p class="cd">'+esc(c.desc)+'</p>';
      c.links.forEach(l=>h+='<a class="eng-arena-link" href="'+l[2]+'" target="_blank" rel="noopener noreferrer"><span class="sdot"></span><div class="body"><b>'+esc(l[0])+'</b><small>'+esc(l[1])+'</small></div><span class="ext"><i data-lucide="external-link"></i></span></a>');
      h+='</div>'});
    h+='</div>';
    views.arena.innerHTML=h;icons();
  }

  // ---- DASHBOARD ----
  function rDash(){
    const done=CH.filter(chDone).length,pct=Math.round(100*done/CH.length);
    const lessons=CH.reduce((n,c)=>n+chLearned(c),0),total=CH.reduce((n,c)=>n+c.ideas.length,0);
    const known=Object.keys(STATE.known).filter(k=>STATE.known[k]).length;
    const avg=STATE.scores.length?Math.round(STATE.scores.reduce((a,s)=>a+s.pct,0)/STATE.scores.length):0;
    let h=\`<div class="eng-dash-grid">
        <div class="eng-dash-card"><div class="dv">\${pct}%</div><div class="dl">Chapters mastered · \${done}/\${CH.length}</div></div>
        <div class="eng-dash-card"><div class="dv">\${lessons}/\${total}</div><div class="dl">Lessons learned</div></div>
        <div class="eng-dash-card"><div class="dv">\${known}</div><div class="dl">Flashcards known · of \${CARDS.length}</div></div>
        <div class="eng-dash-card"><div class="dv">\${avg}%</div><div class="dl">Avg quiz · \${STATE.scores.length} taken</div></div>
      </div>
      <h4 style="margin:8px 0 6px;color:var(--ink);font-size:14px">By part</h4>\`;
    PARTS.forEach((p,i)=>{const pr=partPct(p.id);
      h+='<div class="eng-prow"><div class="pno" style="--pa:'+p.a+';--pb:'+p.b+'">'+(i+1)+'</div><div class="pname">'+esc(p.t)+'</div><div class="eng-bar" style="width:170px"><i style="width:'+pr.p+'%;background:linear-gradient(90deg,'+p.a+','+p.b+')"></i></div><div class="pct">'+pr.d+'/'+pr.t+'</div></div>'});
    if(STATE.scores.length){h+='<h4 style="margin:26px 0 6px;color:var(--ink);font-size:14px">Score history</h4>';
      STATE.scores.slice().reverse().slice(0,12).forEach(s=>{h+='<div class="eng-bar-row"><div class="bn">'+esc(s.label)+' <span style="color:var(--dim);font-size:11.5px">· '+new Date(s.at).toLocaleDateString()+'</span></div><div class="eng-bar"><i style="width:'+s.pct+'%;background:'+(s.pct>=75?"var(--good)":"var(--warn)")+'"></i></div><div class="bv">'+s.pct+'%</div></div>'})}
    views.dash.innerHTML=h;icons();
  }

  // ---- bootstrap: route from hash, then go ----
  function fromHash(){const h=(location.hash||"").replace(/^#/,"");if(!h)return ["library",null];const parts=h.split("/");return [parts[0],parts[1]?decodeURIComponent(parts[1]):null]}
  const [t0,a0]=fromHash();
  window.addEventListener("hashchange",()=>{const [t,a]=fromHash();go(t,a)});
  updateCounts();go(t0,a0);
})();
</script>`;

  const body = navBar("engineering") + hero + main + footer() + spa;
  const html = page({
    title: "AI Engineering — The AI School",
    desc: "AI Engineering track at The AI School. Seven parts, 70 chapters: foundations, model internals, the application layer, agent harnesses, modalities, MLOps, and the research frontier — with flashcards, quizzes and progress tracking.",
    body,
    themeInit: "light",
  });
  writeFileSync(join(DIST, "ai-engineering", "index.html"), html);
}


/* -------------------------------- emit ----------------------------------- */

writeFileSync(join(DIST, "styles.css"), STYLES);
writeFileSync(join(DIST, "index.html"), renderHome());
writeFileSync(join(DIST, "privacy.html"), renderPrivacy());
chapters.forEach((c, i) => writeFileSync(join(DIST, "chapters", `${c.slug}.html`), renderChapter(c, i)));
writeFileSync(join(DIST, "404.html"), render404());
buildEngineering();
writeFileSync(join(DIST, ".nojekyll"), "");

if (existsSync(ASSETS_SRC)) {
  for (const f of readdirSync(ASSETS_SRC)) cpSync(join(ASSETS_SRC, f), join(DIST, "assets", f));
}

console.log(`The AI School: built home + ${chapters.length} Practical AI chapters + AI Engineering app (BASE="${BASE || "/"}") -> ${DIST}`);
