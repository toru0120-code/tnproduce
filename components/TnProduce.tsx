"use client";
import React, { useState, useRef, useEffect } from "react";

type LayerQ = {
  l: string;
  t: string;
  n: string;
  k: string;
  r: number;
  badge: "req" | "rec" | "opt" | "req-special";
  bn: string;
};
type Layer = {
  n: string;
  t: string;
  h: string;
  qs: LayerQ[];
};

const S = `
.t,.t *{box-sizing:border-box;margin:0;padding:0;}
.t{--g:#c850c0;--g2:#4158d0;--gd:rgba(200,80,192,0.12);--gg:rgba(200,80,192,0.06);--bg:#060610;--sf:#0c0c1e;--sf2:#10102a;--bd:#1e1e38;--tx:#f0eeff;--txm:#9896b8;--txd:#4a4870;--gr:#7ec87e;--rd:#e05555;--grad:linear-gradient(135deg,#c850c0,#4158d0);font-family:'Noto Sans JP',sans-serif;background:var(--bg);color:var(--tx);min-height:100vh;}
.t-bg{position:fixed;inset:0;pointer-events:none;z-index:0;background:radial-gradient(ellipse 80% 60% at 0% 0%,rgba(200,80,192,.08) 0%,transparent 50%),radial-gradient(ellipse 60% 40% at 100% 100%,rgba(65,88,208,.08) 0%,transparent 50%);}
.t-w{position:relative;z-index:1;max-width:720px;margin:0 auto;padding:0 18px 100px;}
.t-nav{display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-bottom:1px solid var(--bd);gap:10px;}
.t-brand{font-family:'Space Grotesk',sans-serif;font-size:15px;letter-spacing:.15em;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;font-weight:700;white-space:nowrap;}
.t-tabs{display:flex;gap:3px;flex-wrap:wrap;}
.t-tab{font-family:'Space Grotesk',sans-serif;font-size:9px;letter-spacing:.08em;text-transform:uppercase;padding:6px 12px;border-radius:20px;cursor:pointer;border:1px solid transparent;color:var(--txd);background:transparent;transition:all .2s;font-weight:500;}
.t-tab:hover{color:var(--txm);border-color:var(--bd);}
.t-tab.on{color:#fff;border-color:transparent;background:var(--grad);}
.t-hero{padding:40px 0 32px;border-bottom:1px solid var(--bd);margin-bottom:28px;}
.t-eye{font-family:'Space Grotesk',sans-serif;font-size:9px;letter-spacing:.2em;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;opacity:.9;margin-bottom:12px;font-weight:600;}
.t-h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,5vw,40px);font-weight:700;line-height:1.2;letter-spacing:-.01em;margin-bottom:10px;}
.t-h1 em{font-style:normal;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.t-sub{font-size:11px;color:var(--txd);line-height:2;letter-spacing:.06em;}
.t-s{margin-bottom:24px;}
.t-sh{display:flex;align-items:center;gap:10px;padding:13px 16px;background:var(--sf2);border:1px solid var(--bd);border-bottom:none;border-radius:12px 12px 0 0;}
.t-sn{font-family:'Space Grotesk',sans-serif;font-size:8px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.15em;opacity:1;font-weight:700;}
.t-st{font-family:'Space Grotesk',sans-serif;font-size:14px;letter-spacing:.02em;flex:1;font-weight:600;}
.t-sh2{font-size:10px;color:var(--txd);letter-spacing:.04em;text-align:right;line-height:1.6;}
.t-sb{padding:18px 16px;background:var(--sf);border:1px solid var(--bd);border-radius:0 0 12px 12px;display:flex;flex-direction:column;gap:14px;}
.t-q{display:flex;flex-direction:column;gap:5px;}
.t-ql{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--g);letter-spacing:.15em;opacity:.75;}
.t-qt{font-size:11px;color:var(--txm);line-height:1.9;letter-spacing:.05em;padding-left:10px;border-left:1px solid var(--bd);}
.t-qn{display:block;font-size:10px;color:var(--txd);margin-top:2px;font-style:italic;}
.t-qn.star{color:var(--g);opacity:.9;}
.t-div{height:1px;background:var(--bd);opacity:.5;}
textarea,input[type=text]{width:100%;background:rgba(255,255,255,.02);border:1px solid var(--bd);border-radius:2px;color:var(--tx);font-family:'Noto Sans JP',sans-serif;font-size:12px;line-height:1.9;letter-spacing:.04em;padding:10px 13px;resize:vertical;outline:none;transition:border-color .2s,background .2s;}
textarea::placeholder,input::placeholder{color:var(--txd);font-size:10px;opacity:.55;}
textarea:focus,input:focus{border-color:rgba(200,80,192,.4);background:rgba(200,80,192,.03);}
.t-core{background:var(--gd);border:1px solid rgba(200,80,192,.2);border-radius:8px;padding:12px;}
.t-core textarea{background:transparent;border:none;border-bottom:1px solid rgba(200,80,192,.25);border-radius:0;font-size:13px;font-weight:600;color:var(--g);padding:5px 0;min-height:42px;}
.t-chips{display:flex;flex-wrap:wrap;gap:6px;}
.t-chip{display:flex;align-items:center;gap:6px;padding:7px 12px;border:1px solid var(--bd);border-radius:2px;cursor:pointer;transition:all .15s;background:transparent;font-size:10px;color:var(--txd);letter-spacing:.04em;}
.t-chip.on{border-color:var(--g);background:var(--gd);color:#fff;}
.t-dot{width:5px;height:5px;border-radius:50%;border:1px solid currentColor;flex-shrink:0;}
.t-chip.on .t-dot{background:var(--g);}
.t-seg{display:flex;border:1px solid var(--bd);border-radius:8px;overflow:hidden;flex-wrap:wrap;}
.t-seg-o{flex:1;min-width:55px;text-align:center;padding:8px 5px;font-size:10px;color:var(--txd);cursor:pointer;border-right:1px solid var(--bd);transition:all .15s;background:transparent;letter-spacing:.03em;}
.t-seg-o:last-child{border-right:none;}
.t-seg-o.on{color:#fff;background:var(--grad);}
.t-genre-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:6px;}
.t-genre-btn{padding:10px 8px;border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:10px;color:var(--txd);background:transparent;transition:all .2s;text-align:center;letter-spacing:.03em;line-height:1.4;}
.t-genre-btn:hover{border-color:rgba(200,80,192,.2);color:var(--txm);}
.t-genre-btn.on{border-color:transparent;background:var(--grad);color:#fff;}
.t-genre-cat{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--g);letter-spacing:.15em;opacity:.7;text-transform:uppercase;margin-bottom:6px;margin-top:12px;font-weight:700;}
.t-genre-cat:first-child{margin-top:0;}
.t-btn{font-family:'Space Grotesk',sans-serif;font-size:10px;letter-spacing:.06em;text-transform:uppercase;padding:10px 18px;border-radius:8px;cursor:pointer;transition:all .2s;border:1px solid;font-weight:600;}
.t-btn-g{color:#fff;border-color:transparent;background:var(--grad);font-weight:600;}
.t-btn-g:hover{opacity:.88;}
.t-btn-gh{color:var(--txm);border-color:var(--bd);background:transparent;}
.t-btn-gh:hover{color:var(--txm);}
.t-btn-rd{color:var(--rd);border-color:rgba(200,126,126,.3);background:rgba(200,126,126,.08);}
.t-btn-ok{color:var(--gr);border-color:rgba(126,200,126,.3);background:rgba(126,200,126,.1);}
.t-btn:disabled{opacity:.35;cursor:not-allowed;}
.t-br{display:flex;gap:7px;flex-wrap:wrap;align-items:center;}
.t-out{background:rgba(255,255,255,.02);border:1px solid var(--bd);border-radius:2px;padding:16px;font-size:12px;color:var(--txm);line-height:2;letter-spacing:.04em;white-space:pre-wrap;overflow-y:auto;font-family:'Noto Sans JP',sans-serif;}
.t-out.lit{border-color:rgba(200,80,192,.2);color:var(--tx);}
.t-out.diag{border-color:rgba(200,80,192,.25);background:rgba(200,80,192,.04);color:var(--tx);font-size:11px;}
.t-stb{font-family:'Space Grotesk',sans-serif;font-size:9px;letter-spacing:.1em;padding:6px 10px;border-radius:2px;}
.t-stb.ok{color:var(--gr);background:rgba(126,200,126,.08);border:1px solid rgba(126,200,126,.2);}
.t-stb.err{color:var(--rd);background:rgba(200,126,126,.08);border:1px solid rgba(200,126,126,.2);}
.t-sr{display:flex;gap:7px;align-items:center;}
.t-sr input{flex:1;}
.t-info{background:var(--gg);border:1px solid rgba(200,80,192,.12);border-radius:8px;padding:12px 14px;font-size:11px;color:var(--txd);line-height:2;letter-spacing:.04em;}
.t-info strong{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.t-chat{border:1px solid var(--bd);border-radius:2px;overflow:hidden;}
.t-chat-msgs{min-height:80px;max-height:360px;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:var(--sf);}
.t-msg{display:flex;flex-direction:column;gap:3px;}
.t-msg-who{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.12em;opacity:.55;text-transform:uppercase;}
.t-msg.u .t-msg-who{color:var(--g);text-align:right;}
.t-msg.a .t-msg-who{color:var(--txd);}
.t-msg-body{font-size:12px;line-height:1.9;letter-spacing:.04em;white-space:pre-wrap;padding:10px 13px;border-radius:2px;}
.t-msg.u .t-msg-body{background:var(--gd);border:1px solid rgba(200,80,192,.13);color:var(--tx);text-align:right;}
.t-msg.a .t-msg-body{background:rgba(255,255,255,.02);border:1px solid var(--bd);color:var(--txm);}
.t-chat-in{display:flex;border-top:1px solid var(--bd);}
.t-chat-in textarea{border:none;border-radius:0;background:var(--sf2);min-height:50px;resize:none;flex:1;font-size:12px;padding:13px 15px;}
.t-chat-send{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.12em;text-transform:uppercase;background:var(--gd);border:none;border-left:1px solid var(--bd);color:var(--g);padding:0 16px;cursor:pointer;white-space:nowrap;}
.t-chat-send:disabled{opacity:.35;cursor:not-allowed;}
.t-kw-s{margin-bottom:14px;}
.t-kw-t{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.2em;color:var(--g);opacity:.55;text-transform:uppercase;margin-bottom:7px;}
.t-kw-g{display:flex;flex-wrap:wrap;gap:5px;}
.t-kw{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.07em;padding:5px 8px;border:1px solid var(--bd);border-radius:2px;cursor:pointer;color:var(--txd);background:transparent;}
.t-kw.on{border-color:transparent;color:#fff;background:var(--grad);}
.t-ci{display:flex;align-items:flex-start;gap:9px;padding:8px 0;border-bottom:1px solid var(--bd);cursor:pointer;}
.t-ci:last-child{border-bottom:none;}
.t-cb{width:13px;height:13px;border:1px solid var(--txd);border-radius:2px;flex-shrink:0;margin-top:2px;display:flex;align-items:center;justify-content:center;}
.t-ci.done .t-cb{border-color:transparent;background:var(--grad);}
.t-ct{font-size:11px;color:var(--txm);line-height:1.8;letter-spacing:.04em;}
.t-ci.done .t-ct{color:var(--txd);text-decoration:line-through;}
.t-pat{border:1px solid var(--bd);border-radius:12px;overflow:hidden;margin-bottom:9px;}
.t-pat-h{display:flex;align-items:center;gap:9px;padding:10px 14px;background:var(--sf2);border-bottom:1px solid var(--bd);}
.t-pat-n{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--g);opacity:.65;letter-spacing:.1em;}
.t-pat-t{font-size:11px;color:var(--txm);letter-spacing:.04em;}
.t-pat-b{padding:11px 14px;font-size:11px;color:var(--txd);line-height:2;letter-spacing:.04em;}
.t-pat-ex{background:rgba(200,80,192,.04);border-left:2px solid rgba(200,80,192,.25);padding:7px 10px;margin-top:7px;font-style:italic;font-size:10px;color:var(--txm);white-space:pre-wrap;}
.t-pat-ins{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--g);letter-spacing:.06em;padding:5px 12px;border:1px solid rgba(200,80,192,.2);border-radius:20px;cursor:pointer;background:transparent;margin-top:7px;display:inline-block;font-weight:600;}
.t-ins-ok{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--gr);letter-spacing:.1em;padding:5px 10px;margin-top:7px;display:inline-block;}
.t-part-item{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--bd);}
.t-part-item:last-child{border-bottom:none;}
.t-part-item.off{opacity:.4;}
.t-part-name{flex:1;font-size:11px;color:var(--txm);letter-spacing:.04em;font-family:'Space Grotesk',sans-serif;}
.t-part-toggle{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.1em;padding:4px 10px;border-radius:2px;cursor:pointer;border:1px solid;transition:all .15s;}
.t-part-toggle.on{color:#fff;border-color:transparent;background:var(--grad);}
.t-part-toggle.off{color:var(--txd);border-color:var(--bd);background:transparent;}
.t-part-arrow{font-size:12px;width:26px;height:26px;display:flex;align-items:center;justify-content:center;border:1px solid var(--bd);border-radius:2px;cursor:pointer;color:var(--txd);background:transparent;}
.t-part-arrow:disabled{opacity:.25;cursor:not-allowed;}
.t-preview{font-family:'Space Grotesk',sans-serif;font-size:9px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.06em;line-height:1.8;padding:10px 12px;background-color:var(--gd);border:1px solid rgba(200,80,192,.2);border-radius:8px;margin-bottom:12px;word-break:break-all;}
.t-sm{display:flex;border:1px solid var(--bd);border-radius:8px;overflow:hidden;margin-bottom:12px;}
.t-sm-o{flex:1;text-align:center;padding:10px 8px;font-size:11px;color:var(--txd);cursor:pointer;border-right:1px solid var(--bd);transition:all .15s;background:transparent;letter-spacing:.04em;}
.t-sm-o:last-child{border-right:none;}
.t-sm-o.on{color:#fff;background:var(--grad);}
.t-cf-note{font-size:10px;color:var(--g);padding:6px 10px;background:var(--gd);border-radius:8px;border:1px solid rgba(200,80,192,.2);margin-top:8px;font-family:'Space Grotesk',sans-serif;letter-spacing:.04em;}
.t-adv{display:flex;align-items:center;gap:8px;cursor:pointer;padding:10px 0;color:var(--txd);font-size:11px;letter-spacing:.04em;border:none;background:transparent;width:100%;}
.t-adv:hover{color:var(--txm);}
.t-adv-arr{font-family:'Space Grotesk',sans-serif;font-size:9px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-weight:700;}
.t-tip{display:flex;gap:9px;font-size:10px;color:var(--txd);line-height:1.9;letter-spacing:.04em;padding:3px 0;}
.t-tip-m{color:var(--g);font-family:'Space Grotesk',sans-serif;font-size:8px;opacity:.55;flex-shrink:0;margin-top:3px;}
.t-badge{display:inline-flex;align-items:center;font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.08em;padding:3px 8px;border-radius:20px;margin-bottom:4px;font-weight:600;}
.t-badge.req{color:#ff80b5;background:rgba(255,128,181,.1);border:1px solid rgba(255,128,181,.3);}
.t-badge.req-special{color:#e8c862;background:rgba(232,200,98,.12);border:1px solid rgba(232,200,98,.35);font-weight:700;}
.t-badge.rec{color:#9ec8a0;background:rgba(158,200,160,.1);border:1px solid rgba(158,200,160,.25);}
.t-badge.opt{color:var(--txd);background:rgba(255,255,255,.03);border:1px solid var(--bd);}
.t-badge-note{font-size:10px;color:var(--txd);line-height:1.7;letter-spacing:.04em;margin-bottom:6px;}
.t-title-opts{display:flex;flex-direction:column;gap:8px;}
.t-title-opt{padding:12px 16px;border:1px solid var(--bd);border-radius:8px;cursor:pointer;font-size:12px;color:var(--txm);line-height:1.7;letter-spacing:.04em;transition:all .2s;background:transparent;text-align:left;width:100%;}
.t-title-opt:hover{border-color:rgba(200,80,192,.25);color:var(--tx);}
.t-title-opt.sel{border-color:transparent;background:var(--grad);color:#fff;}
.t-title-label{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--g);opacity:.6;letter-spacing:.1em;margin-bottom:3px;}
.t-step-label{font-family:'Space Grotesk',sans-serif;font-size:9px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;font-weight:700;}
.t-guide-item{padding:14px 0;border-bottom:1px solid var(--bd);}
.t-guide-item:last-child{border-bottom:none;}
.t-guide-h{font-family:'Space Grotesk',sans-serif;font-size:9px;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;font-weight:700;}
.t-guide-txt{font-size:11px;color:var(--txm);line-height:2;letter-spacing:.04em;white-space:pre-wrap;}
.t-ov{position:fixed;inset:0;background:rgba(9,9,14,.93);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
.t-mo{background:var(--sf2);border:1px solid rgba(200,80,192,.2);border-radius:20px;max-width:460px;width:100%;overflow:hidden;}
.t-mo-top{padding:28px 24px 20px;border-bottom:1px solid var(--bd);}
.t-mo-br{font-family:'Space Grotesk',sans-serif;font-size:11px;letter-spacing:.2em;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;text-transform:uppercase;font-weight:700;margin-bottom:14px;}
.t-mo-t{font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;line-height:1.3;margin-bottom:8px;}
.t-mo-t em{font-style:normal;background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.t-mo-s{font-size:11px;color:var(--txd);line-height:2;}
.t-mo-b{padding:20px 24px;display:flex;flex-direction:column;gap:12px;}
.t-mo-step{display:flex;gap:12px;align-items:flex-start;}
.t-mo-n{font-family:'Space Grotesk',sans-serif;font-size:9px;color:var(--g);opacity:.65;flex-shrink:0;width:18px;}
.t-mo-tx{font-size:12px;color:var(--txm);line-height:1.9;}
.t-mo-tx a{color:var(--g);text-decoration:none;border-bottom:1px solid rgba(200,80,192,.3);}
.t-mo-tx strong{color:var(--tx);}
.t-mo-note{background:var(--gg);border:1px solid rgba(200,80,192,.15);border-radius:8px;padding:11px 13px;font-size:10px;color:var(--txd);line-height:1.9;}
.t-mo-note strong{background:var(--grad);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.t-mo-f{padding:0 24px 24px;}
.t-mix-item{padding:14px 0;border-bottom:1px solid var(--bd);}
.t-mix-item:last-child{border-bottom:none;}
.t-mix-cat{font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--g);letter-spacing:.15em;opacity:.7;text-transform:uppercase;margin-bottom:8px;margin-top:20px;font-weight:700;padding:4px 8px;background:var(--gd);border-radius:4px;display:inline-block;}
.t-mix-cat:first-child{margin-top:0;}
.t-mix-row{display:grid;grid-template-columns:1fr 1fr 1fr 1.2fr;gap:6px;font-size:10px;color:var(--txm);padding:6px 0;border-bottom:1px solid rgba(30,30,56,.5);}
.t-mix-row:last-child{border-bottom:none;}
.t-mix-head{display:grid;grid-template-columns:1fr 1fr 1fr 1.2fr;gap:6px;font-family:'Space Grotesk',sans-serif;font-size:8px;color:var(--txd);letter-spacing:.08em;padding:4px 0 8px;border-bottom:1px solid var(--bd);margin-bottom:4px;}
.t-notice{background:linear-gradient(135deg,rgba(200,80,192,.08),rgba(65,88,208,.08));border:1px solid rgba(200,80,192,.2);border-radius:12px;padding:16px 18px;margin-bottom:24px;position:relative;}
.t-notice-close{position:absolute;top:10px;right:12px;font-family:'Space Grotesk',sans-serif;font-size:9px;color:var(--txd);cursor:pointer;background:transparent;border:none;letter-spacing:.06em;}
.t-notice-close:hover{color:var(--txm);}
.t-float-btn{position:fixed;bottom:24px;right:20px;width:52px;height:52px;border-radius:50%;background:var(--grad);border:none;cursor:pointer;font-size:22px;z-index:50;box-shadow:0 4px 20px rgba(200,80,192,.4);display:flex;align-items:center;justify-content:center;transition:transform .2s;}
.t-float-btn:hover{transform:scale(1.1);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-thumb{background:var(--bd);border-radius:2px;}
`;

type Genre = {
  id: string;
  name: string;
  sunoKw: string;
  lyricStyle: string;
  checkKw: string;
  cat: string;
  ja_desc: string; // ユーザー向け説明文
};

const GENRES: Genre[] = [
  // ポップ系
  {id:"jpop",name:"J-POP",cat:"ポップ系",ja_desc:"日本の主流ポップス。キャッチーで聴きやすく、感情に直接訴えるサビが特徴。幅広い世代に届く王道スタイル。",sunoKw:"j-pop, japanese pop, catchy melody, bright emotional, mainstream pop",lyricStyle:"共感しやすい言葉・キャッチーで明快なサビ・感情に直接訴える表現",checkKw:"J-POPらしいキャッチさ・わかりやすさ・明快なサビ・共感性"},
  {id:"kpop",name:"K-POP",cat:"ポップ系",ja_desc:"韓国発のポップス。スタイリッシュなビジュアルと中毒性の高いフックが特徴。日韓英語ミックスの歌詞が多い。",sunoKw:"k-pop, korean pop, catchy hook, girl group, boy band, addictive melody",lyricStyle:"キャッチーなフック・日韓英ミックス・感情的なサビ・スタイリッシュな表現",checkKw:"K-POPらしいキャッチさ・スタイリッシュさ・フックの強さ"},
  {id:"anison",name:"アニソン",cat:"ポップ系",ja_desc:"アニメの主題歌・挿入歌スタイル。希望・勇気・仲間をテーマにしたキャッチーで覚えやすい楽曲。エネルギーとメッセージ性が強い。",sunoKw:"anime song, j-anime, energetic, emotional, orchestral pop",lyricStyle:"希望・勇気・仲間・夢などのテーマ・キャッチーで覚えやすいサビ",checkKw:"アニソンらしいエネルギー・メッセージ性・キャッチーなサビ"},
  {id:"vocaloid",name:"ボカロ",cat:"ポップ系",ja_desc:"初音ミクなどのボイスシンセサイザーを使った電子音楽。現実と非現実の境界を行く独特の世界観と中性的な感情表現が特徴。",sunoKw:"vocaloid, vocaloid style, electronic pop, synthetic vocal, digital emotion, anime influenced, japanese",lyricStyle:"電子的・デジタルな世界観・現実と非現実の境界・中性的な感情・独特の言葉遣いや造語・内省的・哲学的・高速な語彙展開",checkKw:"ボカロらしい電子的な世界観・中性的な感情表現・デジタル感・独特の語感"},
  {id:"citypop",name:"シティポップ",cat:"ポップ系",ja_desc:"1980年代の日本発・都会的でおしゃれな音楽。夜・夏・ドライブをテーマにしたノスタルジックでグルーヴィーなスタイル。",sunoKw:"city pop, japanese 80s, summer night, groovy, mellow, retro city",lyricStyle:"都会的・洗練された言葉・夜・夏・ドライブ・ノスタルジー",checkKw:"シティポップらしい都会的な語感・洗練・レトロ感"},
  {id:"neocitypop",name:"ネオシティポップ",cat:"ポップ系",ja_desc:"現代版シティポップ。R&Bやジャズの感情的な深みとポップの聴きやすさを融合した、洗練された都会サウンド。",sunoKw:"modern city pop, neo soul, jazzy, smooth, contemporary japanese pop",lyricStyle:"現代的な都会感・R&Bの感情深さとポップの聴きやすさの融合",checkKw:"ネオシティポップらしい洗練・グルーヴ・現代感"},
  {id:"showakayo",name:"昭和歌謡",cat:"ポップ系",ja_desc:"昭和時代の日本歌謡曲スタイル。情景描写と間接的な感情表現が特徴の懐かしさあふれる音楽。演歌の影響を受けたポップス。",sunoKw:"japanese city pop, showa era, enka-influenced pop, retro japanese, kayokyoku",lyricStyle:"情景描写・間接的な感情表現・昭和的な言葉遣い・余韻・懐かしさ",checkKw:"昭和歌謡らしい情景描写・余韻・昭和的な語感・懐かしさ"},
  {id:"idolpop",name:"アイドルポップ",cat:"ポップ系",ja_desc:"日本のアイドルが歌うポップス。明るく元気で夢や笑顔をテーマにしたキャッチーなサウンド。ファンへの想いを込めた歌詞が多い。",sunoKw:"idol pop, japanese idol, cute, cheerful, kawaii, bright energetic, j-pop idol",lyricStyle:"明るく元気な言葉・夢・笑顔・ファンへの想い・キャッチーで覚えやすい",checkKw:"アイドルポップらしい明るさ・かわいさ・キャッチーさ・元気"},
  // R&B・ソウル系
  {id:"rnb",name:"R&B・ネオソウル",cat:"R&B・ソウル系",ja_desc:"リズム＆ブルースとネオソウルの融合。グルーヴィーで感情的な深みのある表現が特徴。リズムに乗った言葉選びが重要。",sunoKw:"R&B, neo soul, smooth groove, soulful, rhythmic, sensual",lyricStyle:"リズムに乗る言葉選び・グルーヴ感・感情的で深みのある表現",checkKw:"R&Bらしいグルーヴ感・リズムに乗る語感・感情の深さ"},
  {id:"lofi",name:"ローファイ",cat:"R&B・ソウル系",ja_desc:"あえて音質を落としたチルアウト系音楽。内省的で日常の断片を切り取った穏やかな世界観。深夜のひとり時間に似合う。",sunoKw:"lofi hip hop, chill, nostalgic, mellow, laid back, warm vinyl",lyricStyle:"内省的・日常の断片・穏やかで温かい語感・過去への眼差し",checkKw:"ローファイらしいチル感・内省性・温かさ"},
  {id:"urbanpop",name:"アーバンポップ",cat:"R&B・ソウル系",ja_desc:"都会的でスタイリッシュな現代ポップス。R&Bの感情表現とポップの聴きやすさを融合。クールで洗練された大人の音楽。",sunoKw:"urban pop, contemporary r&b, modern pop, sleek, sophisticated, city vibes",lyricStyle:"都会的でスタイリッシュな言葉・洗練・感情とクールさの共存",checkKw:"アーバンポップらしい都会感・洗練・スタイリッシュさ"},
  {id:"gospel",name:"ゴスペル・ソウル",cat:"R&B・ソウル系",ja_desc:"魂の解放と感情の爆発を表現する音楽。力強い歌声と感謝・希望・救いのメッセージが特徴。圧倒的な感情表現ができる。",sunoKw:"gospel, soul music, powerful vocals, choir, emotional, spiritual, uplifting",lyricStyle:"魂からの叫び・解放・感謝・希望・力強く感情的な言葉",checkKw:"ゴスペルらしい力強さ・感情の解放・魂の表現"},
  // ロック系
  {id:"rock",name:"ロック",cat:"ロック系",ja_desc:"エレキギターを中心にした力強い音楽。エネルギーと疾走感・直接的で力強い言葉で感情を爆発させるスタイル。",sunoKw:"rock, electric guitar, energetic, powerful drums, intense",lyricStyle:"エネルギーと疾走感・直接的で力強い言葉・感情の爆発",checkKw:"ロックらしいエネルギー・力強さ・直接的な言葉"},
  {id:"altrock",name:"オルタナティブロック",cat:"ロック系",ja_desc:"主流から外れた実験的なロック。内省的・社会への問い・曖昧な感情をひねりのある詩的な言葉で表現する。",sunoKw:"alternative rock, indie rock, grunge influenced, distorted guitar, introspective",lyricStyle:"内省的・社会への問い・曖昧な感情・詩的でひねりのある表現",checkKw:"オルタナらしい内省性・ひねりのある語感・曖昧さ"},
  {id:"visual",name:"ヴィジュアル系",cat:"ロック系",ja_desc:"日本独自の耽美で退廃的なロック。闇と光の対比・感情の極端な表現・詩的な言葉が特徴の唯一無二の世界観。",sunoKw:"visual kei, japanese rock, dramatic, dark romantic, theatrical",lyricStyle:"耽美・退廃・詩的な言葉・闇と光の対比・感情の極端な表現",checkKw:"V系らしい耽美さ・退廃的な語感・詩的表現"},
  {id:"metal",name:"メタル・ハードロック",cat:"ロック系",ja_desc:"重いギターリフと激しいドラムが特徴の音楽。怒り・闘志・克服をテーマにした力強く激しい表現が得意。",sunoKw:"metal, hard rock, heavy guitar, aggressive, powerful, driving rhythm",lyricStyle:"力強い言葉・怒り・闘志・克服のテーマ・直接的で激しい表現",checkKw:"メタルらしい力強さ・激しさ・闘志のある言葉"},
  {id:"poppunk",name:"ポップパンク",cat:"ロック系",ja_desc:"キャッチーなメロディとパンクのエネルギーを融合。青春・反骨・エネルギッシュな言葉とサビが特徴の聴きやすいロック。",sunoKw:"pop punk, punk energy, catchy chorus, energetic, youth, rebellious",lyricStyle:"青春・反骨・エネルギッシュ・直接的で熱い言葉・キャッチーなサビ",checkKw:"ポップパンクらしいエネルギー・青春感・キャッチーさ"},
  {id:"emorock",name:"エモロック",cat:"ロック系",ja_desc:"感情をむき出しにした告白的なロック。傷・孤独・救いを求める言葉を直接的に表現する。心の痛みをそのまま音にするスタイル。",sunoKw:"emo rock, emotional rock, confessional, raw emotion, melodic punk, heartfelt",lyricStyle:"むき出しの感情・告白的・傷・孤独・救いを求める言葉・直接的な痛み",checkKw:"エモらしいむき出しの感情・告白的な表現・傷と痛みの語感"},
  {id:"indiepop",name:"インディーポップ",cat:"ロック系",ja_desc:"独立系レーベル発のおしゃれで詩的なポップス。日常・青春・ノスタルジーをこだわりのある言葉で表現するドリーミーなスタイル。",sunoKw:"indie pop, dreamy, bittersweet, jangly guitar, lo-fi warmth, indie rock",lyricStyle:"詩的でおしゃれな言葉・日常・青春・ノスタルジー・こだわり感",checkKw:"インディーポップらしいドリーミーさ・おしゃれ感・詩的表現"},
  {id:"punk",name:"パンク・メロコア",cat:"ロック系",ja_desc:"荒削りで疾走感のある反骨精神の音楽。Hi-STANDARD系のメロコアも含む。怒り・青春の焦燥感をシンプルに直接表現する。",sunoKw:"punk rock, melodic hardcore, fast tempo, raw energy, japanese punk, melodycore",lyricStyle:"疾走感・反骨・怒り・叫び・シンプルで直接的・青春の焦燥感",checkKw:"パンクらしい疾走感・荒削りなエネルギー・反骨精神・直接性"},
  // バラード・アコースティック系
  {id:"ballad",name:"バラード",cat:"バラード・アコースティック系",ja_desc:"感情をゆっくり丁寧に描写する叙情的な音楽。余韻と言葉の重みを大切にし、聴く人の心に深く刺さる表現が得意。",sunoKw:"ballad, slow emotional, piano led, heartfelt, cinematic strings",lyricStyle:"感情をゆっくり丁寧に描写・余韻を大切に・言葉の重みを優先",checkKw:"バラードらしい感情の重さ・丁寧な描写・余韻のある言葉"},
  {id:"acoustic",name:"アコースティック",cat:"バラード・アコースティック系",ja_desc:"生楽器の温かみを活かした音楽。日常の細部を素朴で誠実な言葉で表現する親密なスタイル。弾き語りの空気感が特徴。",sunoKw:"acoustic, folk, fingerpicking guitar, intimate, warm, singer-songwriter",lyricStyle:"温かく親密な語感・日常の細部・素朴で誠実な言葉",checkKw:"アコースティックらしい温かさ・素朴さ・親密感"},
  {id:"pianoballad",name:"ピアノバラード",cat:"バラード・アコースティック系",ja_desc:"ピアノを主役にした繊細で感情的な音楽。静寂・余白・涙をテーマにした美しく切ない世界観。感情の深みを引き出す。",sunoKw:"piano ballad, emotional piano, cinematic, solo piano, tender, dramatic",lyricStyle:"繊細で感情的な言葉・静寂・美しい余白・涙・切なさの奥にある温かさ",checkKw:"ピアノバラードらしい繊細さ・感情の深み・余白と余韻"},
  {id:"folkpop",name:"フォークポップ",cat:"バラード・アコースティック系",ja_desc:"フォークの詩的な作家性とポップの聴きやすさを融合。米津玄師・あいみょん的な個性的なストーリーテリングが特徴。",sunoKw:"folk pop, singer-songwriter, acoustic storytelling, poetic, indie folk, heartfelt narrative",lyricStyle:"詩的で作家性の高い言葉・個人的なストーリーテリング・比喩と情景描写・誠実で独自の視点",checkKw:"フォークポップらしい詩的な作家性・個性的なストーリーテリング・誠実な言葉"},
  {id:"jazzpop",name:"ジャズポップ",cat:"バラード・アコースティック系",ja_desc:"ジャズのエレガントさとポップの親しみやすさを融合。洗練された大人の言葉・都会的な夜の雰囲気が特徴。",sunoKw:"jazz pop, sophisticated, smooth, piano jazz, bossa influenced, elegant",lyricStyle:"洗練された大人の言葉・おしゃれ・余韻・都会的な夜",checkKw:"ジャズポップらしい洗練・大人感・おしゃれな語感"},
  {id:"bossanova",name:"ボサノバ",cat:"バラード・アコースティック系",ja_desc:"ブラジル発の穏やかでエレガントな音楽。自然・海・風・大人の余裕をテーマにした優雅なスタイル。",sunoKw:"bossa nova, brazilian, nylon guitar, gentle, sophisticated, relaxed",lyricStyle:"穏やかで優雅な語感・自然・海・風・大人の余裕",checkKw:"ボサノバらしい穏やかさ・優雅さ・自然な語感"},
  // ヒップホップ・クラブ系
  {id:"hiphop",name:"ヒップホップ",cat:"ヒップホップ・クラブ系",ja_desc:"ライムとフローが特徴のストリート音楽。韻を踏む言葉遊びとストーリーテリングで自己表現するスタイル。",sunoKw:"hip hop, rap, urban, rhythmic flow, boom bap",lyricStyle:"ライム・フロー・韻を踏む言葉遊び・ストーリーテリング",checkKw:"ヒップホップらしいライム・フロー・韻の踏み方"},
  {id:"trap",name:"トラップ",cat:"ヒップホップ・クラブ系",ja_desc:"重低音の808ベースと細かいハイハットが特徴の現代ヒップホップ。クールで攻撃的・ストリートな自己主張が強いスタイル。",sunoKw:"trap, 808 bass, hi-hat rolls, dark hip hop, aggressive, modern rap",lyricStyle:"クールで攻撃的な言葉・ストリート・自己主張・短く鋭いフレーズ",checkKw:"トラップらしいクールさ・攻撃性・ストリート感"},
  {id:"edm",name:"EDM・ダンス",cat:"ヒップホップ・クラブ系",ja_desc:"クラブやフェスで盛り上がるエレクトロニック・ダンス・ミュージック。高揚感あふれるドロップと繰り返しのフックが特徴。",sunoKw:"EDM, dance, electronic, synth, club, energetic drop, euphoric",lyricStyle:"繰り返しのフック・シンプルで踊れる言葉・高揚感",checkKw:"EDMらしい高揚感・繰り返しの強さ・シンプルなフック"},
  {id:"futurebass",name:"Future Bass",cat:"ヒップホップ・クラブ系",ja_desc:"感情的でメロディアスな現代エレクトロニック音楽。希望と切なさが共存する浮遊感と明るい余韻が特徴。",sunoKw:"future bass, melodic electronic, emotional drops, synth waves, bright euphoric",lyricStyle:"感情的で浮遊感のある言葉・希望と切なさの共存・明るい余韻",checkKw:"Future Bassらしい浮遊感・感情的な高揚・明るい切なさ"},
  {id:"clubanthemgenre",name:"クラブアンセム",cat:"ヒップホップ・クラブ系",ja_desc:"フロアを一体にする高揚感あふれる楽曲。祝祭・一体感・シンプルで力強いフックで前向きなエネルギーを表現。",sunoKw:"club anthem, party, celebratory, upbeat, crowd energy, festival",lyricStyle:"高揚・祝祭・一体感・シンプルで力強いフック・前向きなエネルギー",checkKw:"クラブアンセムらしい高揚感・一体感・シンプルな力強さ"},
  {id:"eurobeat",name:"ユーロビート",cat:"ヒップホップ・クラブ系",ja_desc:"超高速テンポのイタロディスコ系電子音楽。パラパラダンスの音楽として日本でも親しまれる。疾走感と中毒性が特徴。",sunoKw:"eurobeat, hi-nrg, fast tempo, electronic dance, italo disco, energetic, japanese eurobeat",lyricStyle:"疾走感・高揚・ドライブ・恋愛・シンプルで繰り返しの強いフレーズ",checkKw:"ユーロビートらしい疾走感・ハイテンション・繰り返しの中毒性"},
  // 和系
  {id:"enka",name:"演歌",cat:"和系",ja_desc:"日本の伝統的な歌謡音楽。望郷・別れ・愛憎・情念をこぶし回しを意識した情景描写で表現する日本固有のスタイル。",sunoKw:"enka, traditional japanese, emotional, kobushi, shamisen influenced",lyricStyle:"望郷・別れ・愛憎・情念・情景描写・こぶし回しを意識した言葉",checkKw:"演歌らしい情念・こぶし感・望郷・別れのテーマ"},
  {id:"wagaku",name:"和風・和楽器",cat:"和系",ja_desc:"三味線・琴・尺八・太鼓などの和楽器を使った日本的な音楽。侘び寂び・季節感・古語を活かした独特の世界観。",sunoKw:"japanese traditional, shamisen, koto, shakuhachi, taiko drums, wa-style, feudal japan",lyricStyle:"日本的な情景・侘び寂び・季節感・古語や和の言葉遣い",checkKw:"和風らしい情景・侘び寂び・和の語感・季節感"},
  // その他
  {id:"reggae",name:"レゲエ",cat:"その他",ja_desc:"ジャマイカ発の解放感あふれる音楽。自由・自然・愛・リラックスをテーマにしたゆったりとした温かいスタイル。",sunoKw:"reggae, jamaican, laid back groove, offbeat rhythm, roots, positive vibes",lyricStyle:"解放・自由・自然・愛・リラックス・シンプルで温かい言葉",checkKw:"レゲエらしいリラックス感・解放感・温かさ"},
  {id:"latin",name:"ラテン",cat:"その他",ja_desc:"中南米発の情熱的でリズミカルな音楽。情熱・喜び・踊り・太陽・生命力あふれる言葉が特徴の明るいスタイル。",sunoKw:"latin pop, salsa, bossa nova influenced, passionate, rhythmic, warm tropical",lyricStyle:"情熱・喜び・踊り・愛・太陽・生命力あふれる言葉",checkKw:"ラテンらしい情熱・リズム感・明るさ・生命力"},
  {id:"afrobeat",name:"アフロビート",cat:"その他",ja_desc:"西アフリカ発のグルーヴィーな音楽。土着的な温かさとリズムの躍動感が特徴。解放・喜び・コミュニティの一体感を表現。",sunoKw:"afrobeat, afropop, west african rhythm, groovy, percussive, global pop",lyricStyle:"解放・喜び・大地・リズム・コミュニティ・エネルギーあふれる表現",checkKw:"アフロビートらしいグルーヴ・土着的な温かさ・リズムの躍動感"},
  {id:"darkelectro",name:"ダークエレクトロ",cat:"その他",ja_desc:"冷たく機械的な電子音楽。絶望・支配・孤立をテーマにした無機質で詩的な暗黒の世界観。ヴィジュアル系とも相性が良い。",sunoKw:"dark electronic, industrial, cold synth, dystopian, nine inch nails style, dark ambient",lyricStyle:"冷たく機械的な言葉・絶望・支配・孤立・無機質な感情表現・詩的な暗黒",checkKw:"ダークエレクトロらしい冷たさ・機械的な無機質感・ダークな世界観"},
  {id:"custom",name:"カスタム",cat:"カスタム",ja_desc:"自由にジャンル名とキーワードを設定できます。",sunoKw:"",lyricStyle:"",checkKw:""},
];

const GENRE_CATS = ["ポップ系","R&B・ソウル系","ロック系","バラード・アコースティック系","ヒップホップ・クラブ系","和系","その他"];

// MIXパターン型定義
type MixItem = {genres: string[]; image: string};
type MixCat = {cat: string; items: MixItem[]};

const MIX_EXAMPLES: MixCat[] = [
  {cat:"🔥 人気・鉄板",items:[
    {genres:["K-POP","R&B・ネオソウル","Future Bass"],image:"洗練された現代K-POP"},
    {genres:["J-POP","エモロック","バラード"],image:"切ない青春ソング"},
    {genres:["アニソン","ロック","エモロック"],image:"熱血アニメOP"},
    {genres:["K-POP","アイドルポップ","EDM・ダンス"],image:"中毒性の高いアイドルソング"},
    {genres:["J-POP","R&B・ネオソウル","ローファイ"],image:"感情的で都会的なポップス"},
    {genres:["シティポップ","R&B・ネオソウル","ジャズポップ"],image:"夜景とドライブの世界観"},
  ]},
  {cat:"💔 エモ・切ない",items:[
    {genres:["エモロック","ピアノバラード","バラード"],image:"涙を誘う青春ソング"},
    {genres:["J-POP","ローファイ","バラード"],image:"夜更けの失恋ソング"},
    {genres:["エモロック","オルタナティブロック","バラード"],image:"内面的で切ない世界観"},
    {genres:["インディーポップ","アコースティック","ローファイ"],image:"静かな孤独感"},
    {genres:["ボカロ","エモロック","ピアノバラード"],image:"電子的で儚い感情表現"},
    {genres:["フォークポップ","ローファイ","バラード"],image:"深夜の詩的な失恋ソング"},
  ]},
  {cat:"🎸 ロック・バンド",items:[
    {genres:["ロック","オルタナティブロック","エモロック"],image:"現代ロック"},
    {genres:["ヴィジュアル系","メタル・ハードロック","バラード"],image:"激しく切ない世界観"},
    {genres:["パンク・メロコア","ポップパンク","エモロック"],image:"日本メロコア"},
    {genres:["ロック","メタル・ハードロック","バラード"],image:"壮大なロックバラード"},
    {genres:["ヴィジュアル系","エモロック","ピアノバラード"],image:"儚い現代V系"},
    {genres:["オルタナティブロック","ローファイ","バラード"],image:"退廃的な雰囲気"},
  ]},
  {cat:"🇰🇷 K-POP・アイドル",items:[
    {genres:["K-POP","ヒップホップ","トラップ"],image:"力強い韓国ラップポップ"},
    {genres:["K-POP","Future Bass","EDM・ダンス"],image:"未来的K-POPサウンド"},
    {genres:["アイドルポップ","K-POP","ユーロビート"],image:"懐かしさのある現代アイドル"},
    {genres:["K-POP","R&B・ネオソウル","ローファイ"],image:"感情的なK-POPバラード"},
    {genres:["アイドルポップ","J-POP","EDM・ダンス"],image:"キラキラJ-POPアイドル"},
  ]},
  {cat:"🌙 シティポップ・夜",items:[
    {genres:["ネオシティポップ","R&B・ネオソウル","ローファイ"],image:"深夜の都会"},
    {genres:["シティポップ","ジャズポップ","ボサノバ"],image:"昭和モダン・洗練系"},
    {genres:["ネオシティポップ","Future Bass","R&B・ネオソウル"],image:"未来的シティポップ"},
    {genres:["シティポップ","アーバンポップ","R&B・ネオソウル"],image:"大人の夜景ソング"},
    {genres:["ネオシティポップ","ヒップホップ","ローファイ"],image:"現代的で都会的なサウンド"},
  ]},
  {cat:"☀️ 夏・爽やか",items:[
    {genres:["レゲエ","アコースティック","J-POP"],image:"夏フェス系"},
    {genres:["ラテン","EDM・ダンス","アイドルポップ"],image:"キラキラサマーポップ"},
    {genres:["シティポップ","ボサノバ","アコースティック"],image:"海辺のサマーソング"},
    {genres:["Future Bass","EDM・ダンス","アイドルポップ"],image:"爽快なサマーアンセム"},
    {genres:["レゲエ","R&B・ネオソウル","シティポップ"],image:"大人の夏"},
    {genres:["ラテン","アフロビート","EDM・ダンス"],image:"フェス向けワールドサウンド"},
  ]},
  {cat:"🌑 ダーク・病み",items:[
    {genres:["ヴィジュアル系","トラップ","EDM・ダンス"],image:"ダークモダンサウンド"},
    {genres:["オルタナティブロック","トラップ","ローファイ"],image:"病み系サウンド"},
    {genres:["ヒップホップ","トラップ","メタル・ハードロック"],image:"攻撃的なミクスチャー"},
    {genres:["R&B・ネオソウル","トラップ","ローファイ"],image:"深夜の孤独感"},
    {genres:["ボカロ","ダークエレクトロ","トラップ"],image:"電子的な絶望感"},
    {genres:["メタル・ハードロック","EDM・ダンス","トラップ"],image:"重厚で近未来的"},
  ]},
  {cat:"🎵 バラード・アコースティック",items:[
    {genres:["フォークポップ","アコースティック","バラード"],image:"詩的な弾き語りバラード"},
    {genres:["フォークポップ","インディーポップ","ローファイ"],image:"個性的な作家性ポップ"},
    {genres:["フォークポップ","ピアノバラード","R&B・ネオソウル"],image:"感情的なストーリーソング"},
    {genres:["ピアノバラード","R&B・ネオソウル","バラード"],image:"感情を重視したラブソング"},
    {genres:["バラード","アコースティック","ローファイ"],image:"静かな弾き語り"},
    {genres:["ジャズポップ","ボサノバ","アコースティック"],image:"大人のアコースティックジャズ"},
  ]},
  {cat:"🎶 ヒップホップ・クラブ",items:[
    {genres:["ヒップホップ","R&B・ネオソウル","トラップ"],image:"現代ラップ"},
    {genres:["ヒップホップ","ローファイ","ジャズポップ"],image:"チルヒップホップ"},
    {genres:["ヒップホップ","ゴスペル・ソウル","R&B・ネオソウル"],image:"大人のグルーヴ"},
    {genres:["ヒップホップ","Future Bass","EDM・ダンス"],image:"フェス向けサウンド"},
    {genres:["ユーロビート","EDM・ダンス","アイドルポップ"],image:"ノリノリパーティーソング"},
    {genres:["クラブアンセム","Future Bass","K-POP"],image:"フロアを沸かせるアンセム"},
  ]},
  {cat:"🎋 和風・和系",items:[
    {genres:["和風・和楽器","Future Bass","EDM・ダンス"],image:"和風Future Bass"},
    {genres:["和風・和楽器","ロック","メタル・ハードロック"],image:"和風ラウドロック"},
    {genres:["和風・和楽器","ヒップホップ","トラップ"],image:"和ラップ"},
    {genres:["和風・和楽器","シティポップ","R&B・ネオソウル"],image:"和モダンポップ"},
    {genres:["演歌","ピアノバラード","R&B・ネオソウル"],image:"現代演歌バラード"},
    {genres:["和風・和楽器","ボサノバ","アコースティック"],image:"和とボサノバの融合"},
  ]},
  {cat:"📻 懐かしさ・レトロ",items:[
    {genres:["昭和歌謡","R&B・ネオソウル","EDM・ダンス"],image:"レトロポップ"},
    {genres:["昭和歌謡","シティポップ","ジャズポップ"],image:"現代歌謡"},
    {genres:["昭和歌謡","アイドルポップ","ユーロビート"],image:"昭和×現代アイドル"},
    {genres:["昭和歌謡","ピアノバラード","バラード"],image:"王道歌謡バラード"},
    {genres:["昭和歌謡","ローファイ","アコースティック"],image:"ノスタルジックサウンド"},
    {genres:["ボカロ","昭和歌謡","シティポップ"],image:"懐かしさのある電子ポップ"},
  ]},
];

const MUSIC_AI_OPTS = ["Suno","Udio","その他"];
const CHORUS_REPEAT_OPTS = ["全て同じ","同じ・大サビ変","少し変化・大サビ全換","全て異なる"];
const STYLE_LIMIT_OPTS = [200, 300, 500, 700, 1000];
const TABS:{id:string;label:string}[]=[{id:"create",label:"CREATE"},{id:"generate",label:"GENERATE"},{id:"keywords",label:"KEYWORDS"},{id:"revise",label:"REVISE"},{id:"mix",label:"MIX"},{id:"guide",label:"GUIDE"}];
const ENDINGS=["後悔","祈り","解放","曖昧","前向き","感謝","怒り","余韻"];
const ENDING_DESC:{[key:string]:string}={
  "後悔":"あのとき違う選択をすればよかった…という余韻で終わる曲になります。",
  "祈り":"相手の幸せや未来を静かに願って終わる曲になります。",
  "解放":"苦しみや未練から抜け出し、前に進む決意で終わる曲になります。",
  "曖昧":"答えを出さず、ただ余韻だけを残して終わる曲になります。",
  "前向き":"乗り越えて新しい一歩を踏み出す希望で終わる曲になります。",
  "感謝":"出会えてよかった、という温かい気持ちで終わる曲になります。",
  "怒り":"悔しさや怒りをぶつけたまま終わる曲になります。",
  "余韻":"言葉を最小限にして、聴く人の想像に委ねて終わる曲になります。",
};
const VOCAL_GENDER_OPTS=["男性","女性"];
const VOCAL_TEXTURE_OPTS=["やわらかい","力強い","セクシー","透き通った","ダーク","中性的"];
const VOCAL_RANGE_OPTS=["高め","中間","低め"];
const VOCAL_ORIGIN_OPTS=["日本人系","海外系","どちらでもいい"];
const LANG_RATIO_OPTS=["日本語のみ","10%英語","20%英語","30%英語","50%英語","全英詞","AIにおまかせ"];
const CHORD_OPTS=["明るく切ない","おしゃれ・都会的","浮遊感・ドリーミー","切なく暗い","エモ・激情","ノスタルジック"];
const BPM_OPTS=["ゆったり 60〜72","落ち着いた 73〜84","ミドル 85〜95","少し軽快 96〜108","軽快 109〜120","アップテンポ 121〜"];
const AGE_OPTS=["10代","20代","30代","40代","50代","60代〜"];
const TARGET_GENDER_OPTS=["男性向け","女性向け","男女問わず"];
const METAPHOR_OPTS=["直接的に表現","少し匂わせる","本人だけわかる","完全に隠す（比喩のみ）"];
const DUAL_OPTS=["OFF（通常）","ON（一般向けと本人向けの二重構造）"];
const VOCAL_TEXTURE_KW=["soft warm vocal","powerful passionate vocal","sultry seductive vocal","clear crystalline vocal","dark brooding vocal","androgynous neutral vocal"];
const VOCAL_RANGE_KW=["high register upper range","mid range vocal","low register deep vocal"];
const VOCAL_ORIGIN_KW:(string|null)[]=["japanese vocal style j-pop vocal","native english vocalist western vocal style",null];
const LANG_RATIO_KW=["japanese lyrics only","mostly japanese with occasional english phrases","japanese lyrics 20 percent english","japanese and english mixed 30 percent english","equal japanese and english","full english lyrics","english and japanese mixed lyrics"];
const CHORD_KW=["I-V-vi-IV bright bittersweet","ii-V-I jazz sophisticated urban","floating dreamy suspended harmony","minor key melancholic dark","emotional powerful chord resolution","retro nostalgic 80s 90s progression"];
const BPM_KW=["slow ballad 60-72 BPM","mellow 73-84 BPM","mid-tempo 85-95 BPM","upbeat 96-108 BPM","energetic 109-120 BPM","uptempo 121 BPM and above"];

type Part = {
  id: string;
  name: string;
  tag: string;
  enabled: boolean;
};

const DEFAULT_PARTS:Part[]=[
  {id:"intro",name:"Intro Chorus（イントロサビ）",tag:"[Intro Chorus]",enabled:false},
  {id:"v1",name:"Verse 1（Aメロ）",tag:"[Verse 1]",enabled:true},
  {id:"pre1",name:"Pre-Chorus 1（Bメロ）",tag:"[Pre-Chorus]",enabled:true},
  {id:"ch1",name:"Chorus 1（サビ）",tag:"[Chorus]",enabled:true},
  {id:"v2",name:"Verse 2（Aメロ2）",tag:"[Verse 2]",enabled:true},
  {id:"pre2",name:"Pre-Chorus 2（Bメロ2）",tag:"[Pre-Chorus]",enabled:true},
  {id:"ch2",name:"Chorus 2（サビ2）",tag:"[Chorus]",enabled:true},
  {id:"bridge",name:"Bridge（Cメロ）",tag:"[Bridge]",enabled:true},
  {id:"last",name:"Last Chorus（大サビ）",tag:"[Last Chorus]",enabled:true},
  {id:"outro",name:"Outro（アウトロ）",tag:"[Outro]",enabled:true},
];

const SOLO_TYPE_OPTS=["ギター","ピアノ","サックス","バイオリン","シンセ","和楽器"];
const SOLO_TYPE_KW=["guitar solo","piano solo","saxophone solo","violin solo","synth solo","traditional japanese instrument solo"];
const SOLO_POS_OPTS=["Bridge前","大サビ前"];

const EXTRA_KW:{[cat:string]:{en:string;ja:string}[]}={
  "EMOTION":[
    {en:"melancholic",ja:"哀愁・物悲しい"},{en:"bittersweet",ja:"切ない幸福感"},{en:"emotionally raw",ja:"感情むき出し"},{en:"quiet regret",ja:"静かな後悔"},
    {en:"slow burn intensity",ja:"じわじわ高まる感情"},{en:"simmering emotion",ja:"くすぶる感情"},{en:"passionate restraint",ja:"抑えた情熱"},{en:"delicate",ja:"繊細・壊れそう"},
    {en:"tender",ja:"やさしい・いたわり"},{en:"emotionally vulnerable",ja:"感情的に傷つきやすい"},
  ],
  "INSTRUMENT":[
    {en:"Rhodes piano",ja:"ローズピアノ"},{en:"mellow electric guitar",ja:"メロウなエレキギター"},{en:"upright bass",ja:"ウッドベース"},{en:"slap bass",ja:"スラップベース"},
    {en:"finger picked guitar",ja:"指弾きギター"},{en:"brushed snare",ja:"ブラシスネア"},{en:"swing hi-hat",ja:"スウィングハイハット"},{en:"punchy drums",ja:"パンチのあるドラム"},
    {en:"muted trumpet",ja:"ミュートトランペット"},{en:"soft saxophone",ja:"柔らかいサックス"},{en:"lush synth pads",ja:"豊かなシンセパッド"},{en:"lo-fi texture",ja:"ローファイな質感"},
  ],
  "ATMOSPHERE":[
    {en:"late night drive",ja:"深夜のドライブ"},{en:"neon reflections",ja:"ネオンの反射"},{en:"summer night highway",ja:"夏の夜の幹線道路"},{en:"winter night",ja:"冬の夜"},
    {en:"phone screen glow",ja:"スマホ画面の光"},{en:"late night apartment",ja:"深夜のアパート"},{en:"cabaret night",ja:"キャバレーの夜"},{en:"still water atmosphere",ja:"静水のような静けさ"},{en:"quiet night",ja:"静かな夜"},
  ],
};

const REVISE_PATTERNS=[
  {num:"01",title:"言葉をそのまま差し替える",desc:"気になる言葉を引用して↓で新しい言葉を提案するだけ。",ex:"「素直に過ぎていった」\n↓\n「忙しく過ぎていった」",qi:"〇〇\n↓\n△△"},
  {num:"02",title:"方向性だけ伝えて候補を出してもらう",desc:"どう変えたいか方向性だけ伝えれば複数の候補が返ってくる。",ex:"「この表現はストレートすぎるから比喩を使って」",qi:"この表現はストレートすぎるから比喩を使って"},
  {num:"03",title:"感覚的な言葉で伝える",desc:"「変」「ダサい」「多すぎ」など感覚的な言葉だけでOK。",ex:"「詰め込みすぎ」「ダサい気がする」",qi:"全体的に詰め込みすぎ。削ってほしい"},
  {num:"04",title:"自分で新しい表現を提案する",desc:"思いついた表現を提案するだけ。音数も確認してくれる。",ex:"「この表現に変えられる？音数も確認して」",qi:"この表現に変えられる？音数も確認して"},
  {num:"05",title:"整合性の修正を依頼する",desc:"気になる点を指摘するだけで全体を見直してくれる。",ex:"「1番と2番のサビが被らないようにして」",qi:"1番と2番のサビが被らないようにして"},
  {num:"06",title:"追加情報を与えて修正させる",desc:"後から補足するだけでいい。",ex:"「この解釈が違う。実はこういう意味」",qi:"この解釈が違う。実はこういう意味"},
  {num:"07",title:"最終チェックを依頼する",desc:"完成したと思っても必ず依頼する。",ex:"「これ以上にないか最終チェックして\nジャンルらしさ・テーマ一致・整合性を確認して」",qi:"これ以上にないか最終チェックして。ジャンルらしさ・テーマ一致・整合性を確認して"},
];

async function callAI(system:string,messages:{role:string;content:string}[],onChunk:(r:string)=>void,maxTokens?:number){
  const res=await fetch("/api/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({system,messages,maxTokens:maxTokens||1500})});
  if(!res.ok){const b=await res.json().catch(function(){return{error:"エラーが発生しました"};});throw new Error(b.error||"エラーが発生しました");}
  if(res.body&&typeof res.body.getReader==="function"){
    const reader=res.body.getReader();const dec=new TextDecoder();let buf="";let full="";
    try{
      while(true){const r=await reader.read();if(r.done)break;buf+=dec.decode(r.value,{stream:true});const lines=buf.split("\n");buf=lines.pop()??"";
        for(let i=0;i<lines.length;i++){if(!lines[i].startsWith("data:"))continue;const d=lines[i].slice(5).trim();if(d==="[DONE]")return full;
          try{const j=JSON.parse(d);const text=j.delta?.text??j.choices?.[0]?.delta?.content??j.content??"";if(text){full+=text;onChunk(full);}}catch(e){}}}
      return full;
    }catch(e:unknown){if(full.length>0)return full;throw e;}
  }
  return "";
}

// 歌詞編集チャット メッセージ型
type ChatMsg={
  role:string;
  content:string;
  applied?:boolean;       // 反映済みか（assistantのみ）
  lyricSnapshot?:string;  // 反映時点の元歌詞（戻し先）
  hasLyric?:boolean;      // 修正済み歌詞全文マーカーを含むか
};

function extractLyrics(t:string):string{const i=t.indexOf("[");return i>0?t.slice(i):t;}
function extractHira(t:string):string{const i=t.indexOf("[");if(i<0)return t;const s=t.indexOf("---");return s>0?t.slice(i,s).trim():t.slice(i);}
function parseTitles(text:string):{label:string;value:string}[]{
  const lines=text.split("\n").map(function(l){return l.trim();}).filter(function(l){return l.length>0;});
  const results:{label:string;value:string}[]=[];const labels=["日本語","英語","日英ミックス"];
  for(let i=0;i<lines.length;i++){const c=lines[i].replace(/^[①②③123]\.*\s*/,"").replace(/^(日本語|英語|日英ミックス)[タイトル：\s]*/,"").trim();if(c.length>0&&results.length<3)results.push({label:labels[results.length]||"候補"+(results.length+1),value:c});}
  return results;
}

export default function App(){
  const[tab,setTab]=useState("create");
  const[welcome,setWelcome]=useState(true);
  const[guideNotice,setGuideNotice]=useState(true);
  const initF={q01:"",q02:"",q03:"",q04:"",q05:"",q06:"",q07:"",q08:"",q09:"",q10:"",q11:"",q12:"",endingDetail:""};
  const[F,setF]=useState(initF);
  const[endings,setEndings]=useState<string[]>([]);
  const[genreMode,setGenreMode]=useState("auto");
  const[selectedGenres,setSelectedGenres]=useState<string[]>([]);
  const[customGenreName,setCustomGenreName]=useState("");
  const[customGenreKw,setCustomGenreKw]=useState("");
  const[customGenreStyle,setCustomGenreStyle]=useState("");
  const[vocalGender,setVocalGender]=useState(0);
  const[langRatio,setLangRatio]=useState(6);
  const[showAdv,setShowAdv]=useState(false);
  const[vocalTexture,setVocalTexture]=useState<number|null>(null);
  const[vocalRange,setVocalRange]=useState<number|null>(null);
  const[vocalOrigin,setVocalOrigin]=useState<number|null>(null);
  const[chordProg,setChordProg]=useState<number|null>(null);
  const[bpm,setBpm]=useState<number|null>(null);
  const[targetAges,setTargetAges]=useState<number[]>([]);
  const[targetGender,setTargetGender]=useState<number|null>(null);
  const[metaphor,setMetaphor]=useState<number|null>(null);
  const[dual,setDual]=useState(0);
  const[soloEnabled,setSoloEnabled]=useState(false);   // ソロON/OFF
  const[soloPosition,setSoloPosition]=useState<number|null>(null); // null:未選択（AI判断）0:Bridge前 1:大サビ前
  const[soloType,setSoloType]=useState<number[]>([]);   // ソロ楽器種類
  const[chorusRepeat,setChorusRepeat]=useState<number|null>(null); // null:未選択（AI判断）1:全て同じ 2:Chorus同じ・Last変える 3:Chorus変化・Last全書換 4:全て異なる
  const[structMode,setStructMode]=useState("basic");
  const[parts,setParts]=useState<Part[]>(DEFAULT_PARTS.map(function(p){return Object.assign({},p) as Part;}));
  const[pkey,setPkey]=useState("");
  const[pst,setPst]=useState("");
  const[selKw,setSelKw]=useState<string[]>([]);
  const[extraKw,setExtraKw]=useState("");
  const[confirmed,setConfirmed]=useState("");
  const[lyric,setLyric]=useState("");
  const[hira,setHira]=useState("");
  const[titleParsed,setTitleParsed]=useState<{label:string;value:string}[]>([]);
  const[selectedTitle,setSelectedTitle]=useState("");
  const[titleMode,setTitleMode]=useState("generated");
  const[customTitle,setCustomTitle]=useState("");
  const[promptOut,setPromptOut]=useState("");
  const[worldCard,setWorldCard]=useState("");
  const[loading,setLoading]=useState("");
  const[lyricHistory,setLyricHistory]=useState<{role:string;content:string}[]>([]);
  const[lyricDiagnosis,setLyricDiagnosis]=useState("");
  const[promptDiag,setPromptDiag]=useState("");
  const[copyOk,setCopyOk]=useState("");
  const[insertOk,setInsertOk]=useState<string|null>(null);
  const[lastValidPrompt,setLastValidPrompt]=useState("");
  const[themeGatePassed,setThemeGatePassed]=useState(false);
  const[keywordsChanged,setKeywordsChanged]=useState(false);
  const[fromKeywords,setFromKeywords]=useState(false);
  const[chatEditInput,setChatEditInput]=useState("");
  const[chatEditDisplay,setChatEditDisplay]=useState<ChatMsg[]>([]);
  const[lyricChanged,setLyricChanged]=useState(false);
  const[originalLyric,setOriginalLyric]=useState("");   // オールリセット戻し先
  const[ownLyricChanged,setOwnLyricChanged]=useState(false); // 既存歌詞変更警告
  const[selectedPromptFixes,setSelectedPromptFixes]=useState<string[]>([]);
  const[quickFixMessage,setQuickFixMessage]=useState("");    // QuickFix専用メッセージ
  const[keywordsMessage,setKeywordsMessage]=useState("");    // キーワード専用メッセージ
  const[promptBeforeAdjust,setPromptBeforeAdjust]=useState(""); // 初期生成プロンプト（戻し先）
  const[ownLyric,setOwnLyric]=useState("");
  const[missingModal,setMissingModal]=useState<{items:string[];onProceed:()=>void}|null>(null);
  const[shortQ01Modal,setShortQ01Modal]=useState<{onProceed:()=>void}|null>(null);
  const[lyricDiagCount,setLyricDiagCount]=useState(0);
  const[promptDiagCount,setPromptDiagCount]=useState(0);
  const[confirmedLocked,setConfirmedLocked]=useState(false);
  const[titleLocked,setTitleLocked]=useState(false);
  const[lyricLocked,setLyricLocked]=useState(false);
  const[promptLocked,setPromptLocked]=useState(false);
  const[worldLocked,setWorldLocked]=useState(false);
  const[confirmRevise,setConfirmRevise]=useState("");
  const[worldRevise,setWorldRevise]=useState("");
  const[musicAI,setMusicAI]=useState("suno");
  const[styleLimit,setStyleLimit]=useState(300);
  // AIサポートチャット
  const[supportChatInput,setSupportChatInput]=useState("");
  const[supportChatDisplay,setSupportChatDisplay]=useState<{role:string;content:string}[]>([]);

  function closeGuideNotice(){setGuideNotice(false);}

  // タブ切替時にバナー再表示 + スクロールトップ
  useEffect(function(){
    window.scrollTo({top:0,behavior:"smooth"});
    setGuideNotice(true);
  },[tab]);
  const lyricEditRef=useRef<HTMLDivElement|null>(null);
  const chatMsgsRef=useRef<HTMLDivElement|null>(null);

  function getGenreObjs():Genre[]{
    return selectedGenres.map(function(id){return GENRES.find(function(x){return x.id===id;});}).filter((g):g is Genre=>g!==undefined);
  }
  function getGenreName(){
    if(genreMode==="auto")return "AIにおまかせ（素材から判断）";
    if(genreMode==="custom")return customGenreName||"カスタム";
    const objs=getGenreObjs();
    if(objs.length===0)return "AIにおまかせ";
    if(objs.length===1)return objs[0].name;
    return objs[0].name+"（主）×"+objs.slice(1).map(function(g){return g.name;}).join("×")+"（従）";
  }
  function getGenreLyricStyle(){
    if(genreMode==="auto")return "素材の感情と内容から最適なスタイルを判断する";
    if(genreMode==="custom")return customGenreStyle||"指定されたカスタムジャンルのスタイル";
    const objs=getGenreObjs();
    if(objs.length===0)return "素材から最適なスタイルを判断する";
    if(objs.length===1)return objs[0].lyricStyle;
    return "【主】"+objs[0].name+"："+objs[0].lyricStyle+" を中心にする。【従】"+objs.slice(1).map(function(g){return g.name+"："+g.lyricStyle;}).join(" / ")+" を風味として加える。";
  }
  function getGenreCheckKw(){
    if(genreMode==="auto")return "素材に合った自然なジャンルらしさ";
    if(genreMode==="custom")return customGenreName||"カスタムジャンル";
    const objs=getGenreObjs();
    if(objs.length===0)return "自然なジャンルらしさ";
    return objs.map(function(g,i){return (i===0?"主:":"従:")+g.name+"("+g.checkKw+")";}).join(" / ");
  }
  function getGenrePromptKw(){
    if(genreMode==="auto")return "";
    if(genreMode==="custom")return customGenreKw;
    const objs=getGenreObjs();
    if(objs.length===0)return "";
    return objs.map(function(g){return g.sunoKw as string;}).filter(Boolean).join(", ");
  }
  function getGenre(){return {name:getGenreName(),promptKw:getGenrePromptKw(),lyricStyle:getGenreLyricStyle(),checkKw:getGenreCheckKw()};}

  function toggleGenre(id:string){
    setSelectedGenres(function(prev){
      if(prev.includes(id))return prev.filter(function(x){return x!==id;});
      if(prev.length>=3)return prev;
      return prev.concat([id]);
    });
  }
  function moveGenre(idx:number,dir:number){
    setSelectedGenres(function(prev){
      const next=prev.slice();const t=idx+dir;
      if(t<0||t>=next.length)return prev;
      const tmp=next[idx];next[idx]=next[t];next[t]=tmp;return next;
    });
  }
  function getEnabledParts(){
    if(structMode==="basic")return["[Verse 1]","[Pre-Chorus]","[Chorus]","[Verse 2]","[Pre-Chorus]","[Chorus]","[Bridge]","[Last Chorus]","[Outro]"];
    return parts.filter(function(p){return p.enabled;}).map(function(p){return p.tag;});
  }
  function getFirstTag(){const ep=getEnabledParts();return ep.length>0?ep[0]:"[Verse 1]";}
  function isChorusFirst():boolean{if(structMode==="basic")return false;const f=parts.find(function(p){return p.enabled;});return !!(f&&f.id==="intro");}
  function getLangInstr(){
    if(langRatio===0)return"全て日本語で書く（英語なし）";
    if(langRatio===5)return"全て英語で書く（全英詞）";
    if(langRatio===6)return"ジャンルに合わせて日本語と英語を自然に混ぜる";
    return LANG_RATIO_OPTS[langRatio]+"の割合で英語を混ぜる";
  }
  function sf(k:string){
    return function(e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>){
      const v=e.target.value;
      // Q01はconfirmedLocked時にreadonly（変更不可）
      if(k==="q01"&&confirmedLocked)return;
      setF(function(p){return Object.assign({},p,{[k]:v});});
      if(k==="q01")setThemeGatePassed(false);
    };
  }  function togE(v:string){setEndings(function(p){return p.includes(v)?[]:([v]);});}
  function togAge(i:number){setTargetAges(function(p){return p.includes(i)?p.filter(function(x){return x!==i;}):p.concat([i]);});}
  function togKw(k:string){setSelKw(function(p){return p.includes(k)?p.filter(function(x){return x!==k;}):p.concat([k]);});setKeywordsChanged(true);}
  function nullTog(val:number|null,setter:(v:number|null)=>void):(i:number|null)=>void{return function(i:number|null){if(i===null){setter(null);}else{setter(val===i?null:i);}};}
  function togglePart(id:string){setParts(function(p){return p.map(function(x){return x.id===id?Object.assign({},x,{enabled:!x.enabled}):x;});});}
  function movePart(idx:number,dir:number){setParts(function(prev){const next=prev.slice();const t=idx+dir;if(t<0||t>=next.length)return prev;const tmp=next[idx];next[idx]=next[t];next[t]=tmp;return next;});}

  async function doCopy(text:string,key:string){
    if(!text)return;
    try{await navigator.clipboard.writeText(text);setCopyOk(key);setTimeout(function(){setCopyOk("");},2500);return;}catch(e:unknown){void e;}
    const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.focus();ta.select();
    try{document.execCommand("copy");setCopyOk(key);setTimeout(function(){setCopyOk("");},2500);}catch(e:unknown){void e;}document.body.removeChild(ta);
  }
  function copyLabel(key:string,def:string){return copyOk===key?"✓ COPIED":def;}

  function resetCreate(){
    if(!window.confirm("入力内容を全てリセットします。よろしいですか？"))return;
    setF(initF);setEndings([]);setGenreMode("auto");setSelectedGenres([]);setCustomGenreName("");setCustomGenreKw("");setCustomGenreStyle("");
    setVocalGender(0);setLangRatio(6);setShowAdv(false);setVocalTexture(null);setVocalRange(null);setVocalOrigin(null);
    setChordProg(null);setBpm(null);setTargetAges([]);setTargetGender(null);setMetaphor(null);setDual(0);
    setSoloEnabled(false);setSoloPosition(null);setSoloType([]);setChorusRepeat(null);
    setStructMode("basic");setParts(DEFAULT_PARTS.map(function(p){return Object.assign({},p) as Part;}));
    setConfirmedLocked(false);setTitleLocked(false);setLyricLocked(false);setPromptLocked(false);setWorldLocked(false);
    setOwnLyric("");setOriginalLyric("");setOwnLyricChanged(false);
    setLastValidPrompt("");setThemeGatePassed(false);setKeywordsChanged(false);setFromKeywords(false);
    setChatEditInput("");setChatEditDisplay([]);setLyricChanged(false);
    setLyricDiagCount(0);setPromptDiagCount(0);
    setMusicAI("suno");setStyleLimit(300);
    setConfirmed("");setLyric("");setHira("");
    setTitleParsed([]);setSelectedTitle("");setCustomTitle("");setTitleMode("generated");
    setPromptOut("");setWorldCard("");setLyricHistory([]);
    setLyricDiagnosis("");setPromptDiag("");
    resetPromptAdjustmentState();
  }

  function canGenerate(){return F.q01.trim().length>0||ownLyric.trim().length>0;}
  function canPromptGenerate(){return getActiveLyric().trim().length>0;}
  function getActiveLyric(){return lyric.trim()||ownLyric.trim();}
  function getMissingRequired(){
    const missing=[];
    if(!F.q12.trim())missing.push("Q12（この曲の核心・一文）");
    if(endings.length===0)missing.push("ENDING（終わり方）");
    return missing;
  }

  function buildMaterial(){
    const qs=[["この曲を一言で言うと",F.q01],["登場人物と関係性",F.q02],["出来事の流れ",F.q03],["一番鮮明な場面",F.q04],["届いた言葉・メッセージ",F.q05],["2人だけが知ってるもの",F.q06],["言えなかった言葉",F.q07],["表向きの感情",F.q08],["本当の感情",F.q09],["今も続く感情",F.q10],["相手への気持ち",F.q11],["この曲の核心",F.q12]];
    let t="";for(let i=0;i<qs.length;i++){if(qs[i][1].trim())t+="【"+qs[i][0]+"】\n"+qs[i][1].trim()+"\n\n";}
    if(endings.length>0)t+="【終わり方】"+endings.join("・")+"\n";if(F.endingDetail.trim())t+=F.endingDetail.trim()+"\n";return t;
  }

  function buildSettings(){
    const g=getGenre();const ep=getEnabledParts();
    const structStr=structMode==="basic"?"基本構成："+ep.join(" → "):"カスタム構成："+ep.join(" → ");
    let s="ジャンル："+g.name+"\n"+structStr+"\nボーカル："+VOCAL_GENDER_OPTS[vocalGender]+"\n言語："+getLangInstr()+"\n";
    if(vocalTexture!==null)s+="声の雰囲気："+VOCAL_TEXTURE_OPTS[vocalTexture]+"\n";
    if(vocalRange!==null)s+="声域："+VOCAL_RANGE_OPTS[vocalRange]+"\n";
    if(vocalOrigin!==null)s+="ボーカリスト系統："+VOCAL_ORIGIN_OPTS[vocalOrigin]+"\n";
    if(chordProg!==null)s+="コード進行："+CHORD_OPTS[chordProg]+"\n";
    if(bpm!==null)s+="BPM："+BPM_OPTS[bpm]+"\n";
    if(targetAges.length>0)s+="ターゲット年齢："+targetAges.map(function(i){return AGE_OPTS[i];}).join("・")+"\n";
    if(targetGender!==null)s+="ターゲット性別："+TARGET_GENDER_OPTS[targetGender]+"\n";
    if(metaphor!==null)s+="比喩レベル："+METAPHOR_OPTS[metaphor as number]+"\n";
    if(dual>0)s+="二重構造：ON\n";
    if(chorusRepeat!==null){
      const ep2=getEnabledParts();
      const cCount=ep2.filter(function(t){return t==="[Chorus]";}).length;
      const hasLast=ep2.includes("[Last Chorus]");
      if(cCount>=2&&hasLast)s+="コーラスの繰り返し："+CHORUS_REPEAT_OPTS[(chorusRepeat as number)]+"\n";
    }
    if(soloEnabled){
      const posLabels=["Bridge前","大サビ前"];
      s+="インストゥルメンタルソロ：ON（挿入位置："+(soloPosition!==null?posLabels[soloPosition as number]:"AIにおまかせ")+"）\n";
      if(soloType.length>0)s+="ソロ楽器："+soloType.map(function(i){return SOLO_TYPE_OPTS[i];}).join("・")+"\n";
    }
    return s;
  }

  function buildPromptKw(){
    const g=getGenre();const kws=[];
    if(g.promptKw)kws.push(g.promptKw);
    kws.push(vocalGender===0?"male vocalist":"female vocalist");
    if(vocalTexture!==null)kws.push(VOCAL_TEXTURE_KW[vocalTexture]);
    if(vocalRange!==null)kws.push(VOCAL_RANGE_KW[vocalRange]);
    if(vocalOrigin!==null&&VOCAL_ORIGIN_KW[vocalOrigin])kws.push(VOCAL_ORIGIN_KW[vocalOrigin] as string);
    if(langRatio!==null&&langRatio!==6)kws.push(LANG_RATIO_KW[langRatio]);
    if(chordProg!==null)kws.push(CHORD_KW[chordProg]);
    if(bpm!==null)kws.push(BPM_KW[bpm]);
    if(isChorusFirst())kws.push("chorus first");
    if(soloEnabled){
      const typeKws=soloType.length>0?soloType.map(function(i){return SOLO_TYPE_KW[i];}).join(", "):"instrumental solo break";
      kws.push(typeKws);
    }
    if(selKw.length>0)kws.push(selKw.join(", "));
    if(extraKw.trim())kws.push(extraKw.trim());
    return kws.join(", ");
  }

  function buildLyricSys(){
    const ep=getEnabledParts();const firstTag=ep.length>0?ep[0]:"[Verse 1]";
    const mInstr=metaphor===null?"ジャンルに合わせてAIが最適な比喩を判断する":"比喩は1つの軸に絞る（"+METAPHOR_OPTS[metaphor as number]+"）";
    let genreInstr="";
    if(genreMode==="auto"){
      genreInstr="ジャンル：AIにおまかせ（素材の感情と内容から最適なジャンルを判断して作る）\n歌詞スタイル：素材に最も合うスタイルを選ぶ";
    }else{
      genreInstr="ジャンル："+getGenreName()+"\n歌詞スタイル："+getGenreLyricStyle();
      if(genreMode==="select"&&getGenreObjs().length>1)genreInstr+="\n複数ジャンルは主を中心に従を風味として自然に融合させる";
    }
    const q12line=F.q12.trim()?"・「"+F.q12.trim()+"」を必ずサビ（Chorus）の中心フレーズとして反映する":"";
    const q04line=F.q04.trim()?"・「"+F.q04.trim()+"」の場面を具体的なシーンや情景として歌詞に使う":"";
    const soloInstr=soloEnabled?(()=>{
      const posLabels=["[Bridge]の直前","[Last Chorus]の直前"];
      const typeLabel=soloType.length>0?soloType.map(function(i){return SOLO_TYPE_OPTS[i];}).join("・")+"ソロ":"インストゥルメンタルソロ";
      return "\n・"+typeLabel+"のタグを"+(soloPosition!==null?posLabels[soloPosition as number]:"最も効果的な位置（AIが判断）")+"に挿入する（例：[Guitar Solo]、[Instrumental]など）";
    })():"";
    const chorusInstr=(()=>{
      const ep2=getEnabledParts();
      const cCount=ep2.filter(function(t){return t==="[Chorus]";}).length;
      const hasLast=ep2.includes("[Last Chorus]");
      if(cCount<2||!hasLast||chorusRepeat===null)return "";
      const map=["・[Chorus]は全て同じ歌詞にする。[Last Chorus]も同じ歌詞にする","・[Chorus]は全て同じ歌詞にする。[Last Chorus]だけ全て書き換える","・[Chorus]間で歌詞を少し変化させる（核心のフレーズは維持）。[Last Chorus]は全て書き換えてクライマックスにする","・[Chorus]・[Last Chorus]を全て異なる歌詞にする"];
      return "\n"+map[chorusRepeat as number];
    })();
    return"あなたはプロの作詞家です。\n"+genreInstr+"\n\n絶対ルール：\n・指定ジャンルらしい言葉選びをする\n・説明しすぎない・余白を残す\n・感情は直接書かず情景・行動・感覚で表現する\n・"+mInstr+"\n・同じパートは行数と音数を揃える（音数はひらがなで数える）\n・伏線と回収を設計する\n・感情の流れ（始まり→変化→結末）を構成全体に反映する\n・一人称（僕・俺・わたし・あたし等）と二人称（君・あなた・お前等）は歌詞全体で統一する。最初に登場した表現を使い続け途中で変えない（素材に複数視点が明記されている場合はその限りではない）"+soloInstr+chorusInstr+"\n・以下の構成タグをこの順番で必ず使用する："+ep.join(" → ")+"\n・構成タグを追加しない・削除しない・変更しない\n・OFFのパートは絶対に出力しない\n・順番を変更しない\n・必ず"+firstTag+"から開始する\n・言語："+getLangInstr()+(q12line?"\n"+q12line:"")+(q04line?"\n"+q04line:"")+"\n・外国語（韓国語・英語など）に括弧で翻訳注釈を絶対に付けない\n・歌詞中の言語はそのまま出力する\n・前置き・説明・コメントは一切出力禁止\n・歌詞のみを出力する";
  }

  function buildChatSys(){
    const g=getGenre();const firstTag=getFirstTag();
    const ep=getEnabledParts();
    return"あなたはプロの作詞家・音楽プロデューサーです。\nジャンル："+g.name+"\nルール：ユーザーの指示に従って歌詞を修正する・修正後は必ず次の構成順で歌詞全体を出力する（"+ep.join(" → ")+"）・構成タグを追加・削除・変更しない・前置き・説明文は一切禁止・行数・音数・整合性を常に確認する・"+g.name+"らしさを維持する・外国語に括弧で翻訳注釈を付けない";
  }

  function buildDiagSys(mat:string,settings:string,confirmedForDiag?:string){
    const g=getGenre();const firstTag=getFirstTag();
    return"あなたはプロの作詞家・音楽プロデューサーとして歌詞の最終診断を行います。診断のみ行う。修正は絶対に行わない。\n\n"+(confirmedForDiag?"【確定テーマ（最優先で参照）】\n"+confirmedForDiag+"\n\n":"")+"【元の素材】\n"+mat+"\n【制作設定】\n"+settings+"\n\n審査項目：\n・行数・音数の整合性（同じパートは揃ってるか）\n・テーマ・核心との一致（素材と照合）\n・感情の流れ（始まり→変化→結末が自然か）\n・"+g.name+"らしさ（基準："+g.checkKw+"）\n・言語割合の大きなズレがないか（ただしジャンル由来の言語は例外・K-POPなら韓国語、演歌なら日本語など自然な言語使用は致命的扱いにしない）\n・構成（"+firstTag+"から始まってるか）\n\n出力形式（必ず守る）：\n\n🚨 致命的な問題（テーマ不一致・構成崩壊・ジャンルらしさの欠如など、曲として成立しない問題）:\n・〇〇（なければ「なし」と記載）\n\n⚠ 軽微な問題（表現の好み・細かいニュアンスなど任意で修正）:\n・〇〇（なければ「なし」と記載）\n\n✅ 問題なし項目:\n・〇〇\n\n致命的な問題がない場合は最後に「完成度は十分です。」と明記する。\n\n重要注意：ユーザーが意図的にジャンル・ジャンルミックス・キーワード・カスタム設定を行っている場合、それが原因の違和感は致命的ではなく「⚠ 注意（ユーザー設定による意図的な可能性があります）」として表示すること。";
  }

  function buildPromptDiagSys(settings:string){
    const g=getGenre();
    const styleLimitVal=getStyleLimit();
    const limitNote=musicAI==="suno"?`スタイルプロンプト上限：${styleLimitVal}文字`:"文字数制限：なし（Udio）";
    return"あなたは音楽生成AIプロンプトの専門エンジニアとして最終診断を行います。診断のみ行う。修正は絶対に行わない。\n\n【制作設定】\n"+settings+"\n【"+musicAI.toUpperCase()+" / "+limitNote+"】\n\n審査項目（スタイルプロンプトのキーワード品質のみを評価する。歌詞の内容・言語は評価しない）：\n・文字数は上限内か（文字数を明記）\n・ジャンル（"+g.name+"）のキーワードが適切に含まれているか\n・ボーカル設定が含まれているか\n・感情・雰囲気・楽器・空気感のバランス\n・重複・矛盾するキーワードがないか\n\n出力形式（必ず守る）：\n\n🚨 致命的な問題（文字数超過・ジャンルキーワード完全欠如・矛盾する設定・空またはプロンプトとして成立していない場合のみ）:\n・〇〇（なければ「なし」と記載）\n\n⚠ 軽微な問題（キーワードの順序・細かい調整など任意）:\n・〇〇（なければ「なし」と記載）\n\n✅ 問題なし項目:\n・〇〇\n\n致命的な問題がない場合は最後に「完成度は十分です。」と明記する。\n\n重要注意：ユーザーがQuickFix・追加キーワード・カスタムジャンル・ジャンルミックス・詳細設定を意図的に行っている場合、それが原因の違和感は致命的な問題にしない。その場合は「⚠ 注意（ユーザー設定による意図的な可能性があります）」として表示すること。";
  }

  function getStyleLimit(){
    if(musicAI==="udio")return 99999;
    return styleLimit;
  }

  function buildPromptSys(){
    const kw=getGenrePromptKw();
    const limit=getStyleLimit();
    const limitNote=musicAI==="udio"
      ?"・Udioは文字数制限なし・詳細で多層的なプロンプトが高品質な出力につながる・ジャンル・ムード・楽器・テンポを詳しく記述する"
      :`・出力は絶対に${limit}文字以内にすること・${limit}文字を超えた場合は重要度の低いキーワードを削除して必ず${limit}文字以内に収めること・最重要キーワード（ジャンル・ボーカル）を先頭に配置する`;
    let genreLine="";
    if(genreMode==="auto")genreLine="ジャンル：素材に最適なジャンルをAIが判断して選ぶ";
    else genreLine="ジャンル："+getGenreName()+(kw?"\n音楽生成AIキーワード："+kw:"");
    return"あなたは音楽生成AIプロンプトの専門家です。\n"+genreLine+"\n絶対ルール：プロンプトのみ出力（説明文禁止）・カンマ区切りの英語キーワードのみ\n"+limitNote+(kw?"\n・指定ジャンルキーワードを必ず含める":"");
  }

  function getPromptOnly(){const sep=promptOut.indexOf("---");return sep>0?promptOut.slice(0,sep).trim():promptOut;}
  function getGenreSuggestion(){const sep=promptOut.indexOf("---ジャンル提案---");return sep>0?promptOut.slice(sep):""; }

  function validateLyricStructure(text:string):boolean{
    const expected=getEnabledParts();
    const found=Array.from(text.matchAll(/^\[(.+?)\]/gm)).map(function(m){return "["+m[1]+"]";});
    if(found.length!==expected.length)return false;
    for(let i=0;i<expected.length;i++){if(found[i]!==expected[i])return false;}
    return true;
  }

  async function doConfirm(revise?:string){
    const hasOwnLyric=ownLyric.trim().length>0;
    const mat=buildMaterial();
    const isOwnLyricMode=hasOwnLyric&&!mat.trim();
    if(!F.q01.trim()&&!hasOwnLyric){alert("Q01またはSTEP1の既存の歌詞を入力してください。");return;}
    if(!isOwnLyricMode&&!mat.trim()){alert("CREATEタブで素材を入力してください");return;}
    setLoading("confirm");setConfirmed("");
    const isRevise=!!revise;
    const sys=isOwnLyricMode
      ?"あなたはプロの作詞家です。以下の歌詞を読んで、この曲のテーマを逆算して整理してください。新しい質問は追加しないでください。\n形式：\n【核心】〇〇（この歌詞が伝えようとしていること）\n【感情の流れ】始まり→変化→結末\n【確定テーマ】〇〇（2〜3行で歌詞の世界観・テーマを言語化）\n【確認】なし"
      :isRevise
        ?"あなたはプロの作詞家です。ユーザーの回答と元の素材を統合して確定テーマを作成してください。新しい質問は絶対に追加しないでください。\n形式：\n【核心】〇〇\n【感情の流れ】始まり→変化→結末\n【確定テーマ】〇〇（2〜3行で）\n【確認】なし"
        :"あなたはプロの作詞家です。素材を読んでテーマを整理し、不足があれば最大3つだけ確認質問を出してください。同じ質問を繰り返さないでください。\n形式：\n【核心】〇〇\n【感情の流れ】〇〇→〇〇→〇〇\n【確認】質問があれば最大3つ。なければ「なし」";
    const content=isOwnLyricMode
      ?"以下の歌詞を分析してテーマを逆算してください。\n\n【歌詞】\n"+ownLyric.trim()
      :revise?"以下の素材を整理してください。なお、前回の確認に対して次の修正指示があります："+revise+"\n\n"+mat
      :"以下の素材を整理してください。\n\n"+mat;
    try{
      await callAI(sys,[{role:"user",content:content}],function(r){setConfirmed(r);});
      setConfirmedLocked(true);setThemeGatePassed(true);
    }catch(e){setConfirmed("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  async function doLyric(){
    if(!canGenerate()){alert("Q01またはSTEP1の既存の歌詞を入力してください。");return;}
    if(F.q01.trim().length>0&&F.q01.trim().length<10){
      setShortQ01Modal({onProceed:function(){setShortQ01Modal(null);doLyricAfterShortCheck();}});
      return;
    }
    doLyricAfterShortCheck();
  }

  function doLyricAfterShortCheck(){
    const missing=getMissingRequired();
    if(missing.length>0){
      setMissingModal({items:missing,onProceed:function(){setMissingModal(null);doLyricCore();}});
      return;
    }
    if(lyricLocked){if(!window.confirm("歌詞を再生成すると現在の歌詞・診断履歴が全て消えます。本当に再生成しますか？"))return;}
    doLyricCore();
  }

  async function doLyricCore(){
    const mat=buildMaterial();
    setLoading("lyric");setLyric("");setLyricHistory([]);setLyricDiagnosis("");setWorldCard("");setLyricDiagCount(0);
    setChatEditInput("");setChatEditDisplay([]);setLyricChanged(false);setHira("");
    const confirmedTheme=confirmed.trim();
    const confirmedPart=confirmedTheme?"【STEP0で整理された確定テーマ（最優先で参照してください）】\n"+confirmedTheme+"\n\n":"";
    const tailPart=confirmedTheme?"\n\nSTEP0の確定テーマを歌詞の中心軸として扱ってください。入力素材と矛盾する場合は入力素材を優先してください。":"";
    const userMsg="以下の素材と設定から歌詞を作成してください。\n\n"+confirmedPart+"【入力素材】\n"+mat+"\n【制作設定】\n"+buildSettings()+tailPart;
    try{
      let result="";
      await callAI(buildLyricSys(),[{role:"user",content:userMsg}],function(r){result=r;setLyric(extractLyrics(r));},4000);
      let clean=extractLyrics(result);
      if(!validateLyricStructure(clean)){
        const repairMsg="以下の歌詞を内容を変えずに構成だけ修正してください。\n\n【必須構成】\n"+getEnabledParts().join(" → ")+"\n\n【歌詞】\n"+clean;
        let repaired="";
        await callAI(buildLyricSys(),[{role:"user",content:repairMsg}],function(r){repaired=r;setLyric(extractLyrics(r));},4000);
        if(repaired)clean=extractLyrics(repaired);
      }else{
        setLyric(clean);
      }
      setOriginalLyric(clean); // オールリセット用に初期歌詞を保存
      setLyricHistory([{role:"user",content:userMsg},{role:"assistant",content:clean}]);
      setLyricLocked(true);
    }catch(e){setLyric("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  async function doLyricDiag(){
    if(!getActiveLyric())return;setLoading("lyricDiag");setLyricDiagnosis("");
    const newCount=lyricDiagCount+1;setLyricDiagCount(newCount);
    try{await callAI(buildDiagSys(buildMaterial(),buildSettings(),confirmed.trim()||undefined),[{role:"user",content:"以下の歌詞を診断してください。\n\n"+getActiveLyric()}],function(r){setLyricDiagnosis(r);},2000);}
    catch(e){setLyricDiagnosis("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  function hasFatalIssue(text:string){
    const section=text.match(/🚨[\s\S]*?(?=⚠|✅|$)/)?.[0]??"";
    if(!section)return false;
    const lines=section.split("\n").map(function(l){return l.trim();}).filter(function(l){return l.startsWith("・");});
    if(lines.length===0)return false;
    return !lines.every(function(l){return /^・\s*(なし|無し|ありません|特になし)\s*$/.test(l);});
  }
  function hasFatalLyricIssue(){return hasFatalIssue(lyricDiagnosis);}

  async function doLyricAutoFix(){
    if(!getActiveLyric())return;setLoading("lyricFix");
    const sys=buildChatSys()+"\n致命的な問題のみを修正する。軽微な問題は修正しない。修正後は歌詞全体のみを出力する。";
    const fixMsg="以下の診断結果の「🚨 致命的な問題」のみを修正してください。\n\n【診断結果】\n"+lyricDiagnosis+"\n\n【歌詞】\n"+getActiveLyric();
    try{
      let result="";
      await callAI(sys,[{role:"user",content:fixMsg}],function(r){result=r;setLyric(extractLyrics(r));},4000);
      const clean=extractLyrics(result);
      setLyricHistory(prev=>prev.concat([{role:"user",content:fixMsg},{role:"assistant",content:clean}]));
      setLyricDiagnosis("");setHira("");
    }catch(e){setLyric("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  // ========== 歌詞編集チャット 完全再設計 ==========

  async function sendLyricEditChat(){
    if(!chatEditInput.trim()||loading)return;
    if(!getActiveLyric()){alert("先に歌詞を生成するか、既存の歌詞を入力してください");return;}
    const userMsg=chatEditInput.trim();
    setChatEditInput("");
    const withUser:ChatMsg[]=chatEditDisplay.concat([{role:"user",content:userMsg}]);
    setChatEditDisplay(withUser.concat([{role:"assistant",content:"修正中...",applied:false,hasLyric:false}]));
    setLoading("lyricEdit");
    setTimeout(function(){if(chatMsgsRef.current)chatMsgsRef.current.scrollTop=chatMsgsRef.current.scrollHeight;},80);
    const chatTheme=confirmed.trim();
    const sys=buildChatSys()+(chatTheme?"\n\n【確定テーマ（最優先）】\n"+chatTheme:"")+"\n\n必ず以下の形式で出力する:\n変更理由:\n（何をどう変えたか簡潔に）\n\n修正済み歌詞全文:\n（必ず次の構成順で全体を出力："+getEnabledParts().join(" → ")+"）";
    const msgs=[{role:"user" as const,content:"現在の歌詞:\n"+getActiveLyric()+"\n\n診断結果:\n"+lyricDiagnosis+"\n\nユーザー指示:\n"+userMsg+"\n\n指定されていない部分は変更しないでください。歌詞全体のテーマ・構成は維持してください。"}];
    try{
      let r="";
      await callAI(sys,msgs,function(res){
        r=res;
        setChatEditDisplay(withUser.concat([{role:"assistant",content:res,applied:false,hasLyric:res.includes("修正済み歌詞全文:")}]));
        if(chatMsgsRef.current)chatMsgsRef.current.scrollTop=chatMsgsRef.current.scrollHeight;
      },4000);
      setChatEditDisplay(withUser.concat([{role:"assistant",content:r,applied:false,hasLyric:r.includes("修正済み歌詞全文:")}]));
    }catch(e){
      setChatEditDisplay(withUser.concat([{role:"assistant",content:"エラー: "+(e instanceof Error?e.message:String(e)),applied:false,hasLyric:false}]));
    }
    setLoading("");
  }

  function applyLyricEditAt(idx:number){
    const msg=chatEditDisplay[idx];
    if(!msg||msg.applied)return;
    const marker="修正済み歌詞全文:";
    const markerIdx=msg.content.indexOf(marker);
    if(markerIdx<0)return;
    const newLyric=extractLyrics(msg.content.slice(markerIdx+marker.length).trim());
    if(!newLyric||newLyric.length<20)return;
    const snap=getActiveLyric();
    setChatEditDisplay(function(prev){
      return prev.map(function(m,i){return i===idx?Object.assign({},m,{applied:true,lyricSnapshot:snap}):m;});
    });
    setLyric(newLyric);
    setLyricChanged(true);
    setLyricDiagnosis("");setLyricDiagCount(0);setHira("");
  }

  function undoLyricEditAt(idx:number){
    const msg=chatEditDisplay[idx];
    if(!msg||!msg.applied||!msg.lyricSnapshot)return;
    setLyric(msg.lyricSnapshot);
    setChatEditDisplay(function(prev){
      return prev.map(function(m,i){return i===idx?Object.assign({},m,{applied:false,lyricSnapshot:""}):m;});
    });
    setLyricChanged(false);setLyricDiagnosis("");setLyricDiagCount(0);setHira("");
  }

  function resetSingleEdit(idx:number){
    const msg=chatEditDisplay[idx];
    if(!msg)return;
    if(msg.applied&&msg.lyricSnapshot){
      setLyric(msg.lyricSnapshot);
      setLyricChanged(false);setLyricDiagnosis("");setLyricDiagCount(0);setHira("");
    }
    setChatEditDisplay(function(prev){
      const toRemove=new Set<number>([idx]);
      if(idx>0&&prev[idx-1].role==="user")toRemove.add(idx-1);
      return prev.filter(function(_,i){return !toRemove.has(i);});
    });
  }

  function allResetLyricChat(){
    if(!window.confirm("チャット履歴を全て消去し、最初に生成した歌詞の状態に戻します。よろしいですか？"))return;
    setChatEditInput("");setChatEditDisplay([]);
    if(originalLyric.trim()){
      setLyric(originalLyric);
      setHira("");setLyricDiagnosis("");setLyricDiagCount(0);setLyricChanged(false);
    }
  }

  function handleLyricEditKey(e:React.KeyboardEvent<HTMLTextAreaElement>){
    if(e.key==="Enter"&&e.shiftKey){e.preventDefault();sendLyricEditChat();}
  }

  async function doTitle(){
    if(!getActiveLyric()){alert("先に歌詞を生成するか、既存の歌詞を入力してください");return;}
    setLoading("title");setTitleParsed([]);setSelectedTitle("");setTitleMode("generated");
    const sys="あなたはプロの作詞家です。歌詞のタイトル候補を3つ出してください。\n1. 日本語タイトル\n2. 英語タイトル\n3. 日英ミックスタイトル（例：夜の蝶 / A Love Story）\nそれぞれ1行ずつ、番号付きで出力してください。タイトルの値のみで説明不要。\n再生成の場合は前回と全く異なる新しい候補を出してください。";
    try{let r="";await callAI(sys,[{role:"user",content:"以下の歌詞のタイトル候補を出してください。\n\n"+getActiveLyric()}],function(res){r=res;});setTitleParsed(parseTitles(r));setTitleLocked(true);}
    catch(e){setTitleParsed([{label:"エラー",value:e instanceof Error?e.message:String(e)}]);}
    setLoading("");
  }

  function resetOwnLyric(){
    setOwnLyric("");setLyric("");setHira("");setOriginalLyric("");setOwnLyricChanged(false);
    setLyricDiagnosis("");setLyricDiagCount(0);
    setChatEditInput("");setChatEditDisplay([]);
    setLyricChanged(false);
    setLyricLocked(false);setTitleLocked(false);setTitleParsed([]);setSelectedTitle("");
  }

  function resetPromptAdjustmentState(){
    setSelectedPromptFixes([]);setSelKw([]);setExtraKw("");
    setKeywordsChanged(false);setFromKeywords(false);
    setQuickFixMessage("");setKeywordsMessage("");setPromptBeforeAdjust("");
  }

  function undoPromptAdjustment(section:"quickfix"|"keywords"){
    if(!promptBeforeAdjust.trim()){alert("戻せるプロンプトがありません。");return;}
    setPromptOut(promptBeforeAdjust);setLastValidPrompt(promptBeforeAdjust);
    setPromptBeforeAdjust("");
    if(section==="quickfix")setQuickFixMessage("↩ 初期プロンプトに戻しました。");
    else setKeywordsMessage("↩ 初期プロンプトに戻しました。");
  }

  function togglePromptFix(fix:string){
    setSelectedPromptFixes(function(prev){
      return prev.includes(fix)?prev.filter(function(x){return x!==fix;}):prev.concat([fix]);
    });
    setQuickFixMessage("");
  }

  async function applyPromptAdjustments(section:"quickfix"|"keywords"){
    const currentPrompt=getPromptOnly();
    if(!currentPrompt||currentPrompt.startsWith("エラー")){alert("先にプロンプトを生成してください。");return;}
    const fixText=section==="quickfix"&&selectedPromptFixes.length>0?"【QuickFix指示】\n"+selectedPromptFixes.join("\n"):"";
    const kwText=section==="keywords"&&(selKw.length>0||extraKw.trim())?"【追加キーワード】\n"+(selKw.concat(extraKw.trim()?[extraKw.trim()]:[]).join(", ")):"";
    if(!fixText&&!kwText){alert("反映する項目を選択してください。");return;}
    // 初回のみpromptBeforeAdjustに保存（上書きしない）
    if(!promptBeforeAdjust.trim())setPromptBeforeAdjust(promptOut);
    setLoading("promptFix");
    if(section==="quickfix")setQuickFixMessage("");
    else setKeywordsMessage("");
    const sys=buildPromptSys()+"\n既存プロンプトをベースに指定された内容を自然に反映してください。出力はプロンプトのみ。説明文禁止。重複は整理し矛盾は統合してください。";
    const userMsg="以下のプロンプトを調整してください。\n\n【現在のプロンプト】\n"+currentPrompt+"\n\n"+fixText+"\n\n"+kwText;
    try{
      let result="";
      await callAI(sys,[{role:"user",content:userMsg}],function(r){result=r;setPromptOut(r);},1200);
      if(result){
        // 強制トリミング（文字数超過を防ぐ）
        const limit=getStyleLimit();
        if(limit<99999){
          const sep=result.indexOf("---");
          const promptPart=sep>0?result.slice(0,sep).trim():result;
          const rest=sep>0?result.slice(sep):"";
          if(promptPart.length>limit){
            const pts=promptPart.split(",").map(function(p){return p.trim();}).filter(Boolean);
            const priorityKws=["vocalist","bpm","ballad","pop","rock","rnb","jazz","electronic","hip hop","acoustic","male","female","japanese","english","k-pop","visual kei","anime","enka"];
            const important=pts.filter(function(p){return priorityKws.some(function(kw){return p.toLowerCase().includes(kw);});});
            const others=pts.filter(function(p){return !priorityKws.some(function(kw){return p.toLowerCase().includes(kw);});});
            const ordered=important.concat(others);
            let trimmed="";
            for(let i=0;i<ordered.length;i++){const c=trimmed?trimmed+", "+ordered[i]:ordered[i];if(c.length<=limit)trimmed=c;else break;}
            result=trimmed+(rest?" "+rest:"");
            setPromptOut(result);
          }
        }
        setLastValidPrompt(result);setPromptLocked(true);
        setKeywordsChanged(false);setFromKeywords(false);
        if(section==="quickfix"){setSelectedPromptFixes([]);setQuickFixMessage("✅ プロンプトに反映されました。");}
        else{setKeywordsMessage("✅ プロンプトに反映されました。");}
      }
    }catch(e){
      setPromptOut(promptBeforeAdjust||promptOut);
      alert("プロンプトの反映に失敗しました。");
    }
    setLoading("");
  }

  async function doHira(){
    if(!getActiveLyric()){alert("先に歌詞を生成するか、既存の歌詞を入力してください");return;}
    setLoading("hira");setHira("");
    const sys="あなたは音楽生成AI用の歌詞整形専門家です。以下の歌詞を音楽生成AIで歌わせやすい形に整えてください。\n\n【ルール】\n・日本語はひらがなへ変換（意味のまとまりごとに全角スペースで区切る）\n・自然な息継ぎ位置で改行を入れる\n・英語はそのまま残す\n・[Verse 1]等の構成タグはそのまま保持\n・意味・音数を変えない\n・説明文は禁止\n・変換後の歌詞のみを出力";
    try{await callAI(sys,[{role:"user",content:getActiveLyric()}],function(r){setHira(r);},2000);}catch(e){setHira("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  async function doPrompt(){
    if(!canPromptGenerate()){alert("先に歌詞を生成するか、STEP1の既存の歌詞欄に歌詞を入力してください。");return;}
    doPromptCore();
  }

  async function doPromptCore(){
    if(promptLocked){if(!window.confirm("プロンプトを再生成すると現在のプロンプト・診断履歴が全て消えます。本当に再生成しますか？"))return;}
    resetPromptAdjustmentState();
    setLoading("prompt");setPromptOut("");setPromptDiag("");setPromptDiagCount(0);
    const g=getGenre();const kws=buildPromptKw();
    const lyricForPrompt=getActiveLyric();
    const userMsg="以下の情報から"+g.name+"の最高の音楽生成AIプロンプトを英語で生成してください。\n\n【素材の要約】\n"+buildMaterial()+(lyricForPrompt?"【歌詞】\n"+lyricForPrompt+"\n":"")+"【制作設定】\n"+buildSettings()+"\n【使用するキーワード（必ず含める）】\n"+kws+"\n\nまた、この素材に合う他のジャンルも2〜3個提案があれば、プロンプトの後に「---ジャンル提案---」として1行ずつ記載してください。";
    let result="";
    try{
      await callAI(buildPromptSys(),[{role:"user",content:userMsg}],function(r){
        const limit=getStyleLimit();
        if(limit<99999){
          const sep=r.indexOf("---");
          const promptPart=sep>0?r.slice(0,sep).trim():r;
          const rest=sep>0?r.slice(sep):"";
          if(promptPart.length>limit){
            const pts=promptPart.split(",").map(function(p){return p.trim();}).filter(Boolean);
            const priorityKws=["vocalist","bpm","ballad","pop","rock","rnb","jazz","electronic","hip hop","acoustic","male","female","japanese","english","k-pop","visual kei","anime","enka"];
            const important=pts.filter(function(p){return priorityKws.some(function(kw){return p.toLowerCase().includes(kw);});});
            const others=pts.filter(function(p){return !priorityKws.some(function(kw){return p.toLowerCase().includes(kw);});});
            const ordered=important.concat(others);
            let trimmed="";
            for(let i=0;i<ordered.length;i++){
              const candidate=trimmed?trimmed+", "+ordered[i]:ordered[i];
              if(candidate.length<=limit)trimmed=candidate;
              else break;
            }
            setPromptOut(trimmed+(rest?" "+rest:""));
          }else{setPromptOut(r);}
        }else{setPromptOut(r);}
        result=r;
      });
      if(result)setLastValidPrompt(result);
      setPromptLocked(true);setKeywordsChanged(false);
    }catch(e){setPromptOut("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  async function doPromptDiag(){
    const prompt=getPromptOnly();if(!prompt||prompt.startsWith("エラー")){alert("先にプロンプトを生成してください");return;}
    setLoading("promptDiag");setPromptDiag("");
    const newCount=promptDiagCount+1;setPromptDiagCount(newCount);
    try{await callAI(buildPromptDiagSys(buildSettings()),[{role:"user",content:prompt}],function(r){setPromptDiag(r);},1500);}
    catch(e){setPromptDiag("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  function hasFatalPromptIssue(){return hasFatalIssue(promptDiag);}

  async function doPromptFix(instruction:string){
    const prompt=getPromptOnly()||lastValidPrompt;if(!prompt)return;
    const prevPrompt=promptOut;
    setLoading("promptFix");
    const sys=buildPromptSys()+"\n修正後はプロンプトのみを出力する。説明禁止。";
    try{
      let result="";
      await callAI(sys,[{role:"user",content:"以下の音楽生成AIプロンプトを修正してください.\n\n"+prompt+"\n\n指示："+instruction}],function(r){result=r;setPromptOut(r);});
      if(result)setLastValidPrompt(result);
    }catch(e){setPromptOut(prevPrompt);setLastValidPrompt(prevPrompt);}
    setLoading("");
  }

  async function doWorldCard(revise?:string){
    const mat=buildMaterial();
    if(!getActiveLyric()){alert("先に歌詞を生成するか、既存の歌詞を入力してください");return;}
    if(worldLocked&&!revise){if(!window.confirm("世界観カードを再生成します。続けますか？"))return;}
    setLoading("world");setWorldCard("");
    const titleLine=(titleMode==="custom"?customTitle:selectedTitle)||"（未設定）";
    const genreInfo=getGenreName();
    const sys="あなたはプロのアートディレクター兼作詞家です。曲の世界観を、画像・映像制作にそのまま使える形で言語化します。\n出力形式（この形式のみ・前置きや説明は禁止）：\n\nタイトル：（曲のタイトル）\n\nジャンル：\n（設定されているジャンルを記載）\n\nテーマ：\n（曲の核心を2行以内で）\n\n感情・雰囲気：\n（・区切りで5個程度）\n\n色調イメージ：\n（・区切りで具体的な色や光の情景を5個程度）\n\nシーンイメージ：\n（・区切りで映像に使える場面を5個程度）\n\nキーワード（英語）：\n（画像・映像生成にそのまま使える英語キーワードをカンマ区切りで10〜15個）";
    const reviseNote=revise?"\n\n【修正指示】\n"+revise:"";
    const confirmedThemeForWorld=confirmed.trim();
    const matForWorld=mat.trim();
    const isWorldOwnLyricMode=!matForWorld&&ownLyric.trim().length>0;
    const userMsg=(isWorldOwnLyricMode
      ?"以下の確定テーマと歌詞・設定から曲の世界観カードを作成してください。\n\n【タイトル】\n"+titleLine+"\n\n【ジャンル】\n"+genreInfo+(confirmedThemeForWorld?"\n\n【確定テーマ（最優先で参照）】\n"+confirmedThemeForWorld:"")+"\n\n【制作設定】\n"+buildSettings()+"\n【歌詞】\n"+getActiveLyric()
      :"以下の素材・歌詞・設定から曲の世界観カードを作成してください。\n\n【タイトル】\n"+titleLine+"\n\n【ジャンル】\n"+genreInfo+(confirmedThemeForWorld?"\n\n【確定テーマ（最優先で参照）】\n"+confirmedThemeForWorld:"")+"\n\n【素材】\n"+matForWorld+"\n【制作設定】\n"+buildSettings()+"\n【歌詞】\n"+getActiveLyric()
    )+reviseNote;
    try{await callAI(sys,[{role:"user",content:userMsg}],function(r){setWorldCard(r);},2000);setWorldLocked(true);}catch(e){setWorldCard("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }

  // AIサポートチャット
  async function sendSupportChat(){
    if(!supportChatInput.trim()||loading)return;
    const userMsg=supportChatInput.trim();setSupportChatInput("");
    const nd=supportChatDisplay.concat([{role:"user",content:userMsg}]);
    setSupportChatDisplay(nd.concat([{role:"assistant",content:"回答中..."}]));
    setLoading("supportChat");
    const sys=`あなたはMY LYRICの専門サポートAIです。MY LYRICのタブ構成と機能を正確に把握した上で回答してください。

【MY LYRICのタブ構成】
・CREATEタブ：素材入力（Q01〜Q12・ENDING）とSETTINGS（ジャンル・ボーカル・言語・コーラスの繰り返し・詳細設定）を行う場所。ここで全ての入力をする。
・GENERATEタブ：STEP0〜7を順番に実行する場所。テーマ確認・歌詞生成・診断・タイトル・ひらがな整形・プロンプト生成・世界観カードを全てここで行う。
・KEYWORDSタブ：プロンプトのQuickFix調整と追加キーワードの設定。GENERATEタブでプロンプト生成後に使う。
・REVISEタブ：歌詞修正の伝え方の例を見る場所。実際の修正はGENERATEタブのSTEP2の歌詞編集AIチャットで行う。
・MIXタブ：ジャンルミックスの組み合わせ例（64パターン・11カテゴリ）を確認する場所。世界観・気分別に分類されている。
・GUIDEタブ：このAIサポートチャットと使い方ガイドがある場所。

【重要】
・ジャンル選択はCREATEタブのSETTINGSで行う。GENERATEタブではない。
・Q01〜Q12の入力はCREATEタブで行う。GENERATEタブではない。
・歌詞生成・プロンプト生成はGENERATEタブで行う。
・歌詞の修正・編集はGENERATEタブのSTEP2の歌詞編集AIチャットで行う。

以下のことのみ対応してください。
・MY LYRICの使い方・操作方法の案内
・ジャンル選択・ミックスの相談
・歌詞制作のアドバイス
・Q01〜Q12の入力サポート
・プロンプト改善の相談
・ミックスジャンルの組み合わせ提案

以下には対応しません。
・MY LYRIC以外の話題
・歌詞の丸投げ生成（GENERATEタブのSTEP1で生成するよう案内する）
・個人的な悩み相談

対応外の質問には「MY LYRICに関するご質問にお答えしています。歌詞の生成はGENERATEタブのSTEP1から行えます。」と答えてください。
回答は簡潔で親切に。日本語で回答する。絵文字は控えめに。`;
    // 会話履歴を最大5往復（10メッセージ）保持して渡す
    const historyMsgs = supportChatDisplay
      .filter(function(m){return m.content!=="回答中...";})
      .slice(-10)
      .map(function(m){return {role:m.role as "user"|"assistant",content:m.content};});
    const msgs=[...historyMsgs,{role:"user" as const,content:userMsg}];
    try{
      let r="";
      await callAI(sys,msgs,function(res){r=res;setSupportChatDisplay(nd.concat([{role:"assistant",content:res}]));},1500);
      setSupportChatDisplay(nd.concat([{role:"assistant",content:r}]));
    }catch(e){setSupportChatDisplay(nd.concat([{role:"assistant",content:"エラーが発生しました。もう一度お試しください。"}]));}
    setLoading("");
  }

  function handleSupportChatKey(e:React.KeyboardEvent<HTMLTextAreaElement>){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendSupportChat();}}

  function saveProject(){
    if(!pkey.trim()){setPst("err:プロジェクト名を入力してください");return;}
    const data=JSON.stringify({F,endings,genreMode,selectedGenres,customGenreName,customGenreKw,customGenreStyle,vocalGender,langRatio,vocalTexture,vocalRange,vocalOrigin,chordProg,bpm,targetAges,targetGender,metaphor,dual,chorusRepeat,structMode,parts,selKw,extraKw,ownLyric});
    try{localStorage.setItem("mylyric:"+pkey.trim(),data);setPst("ok:「"+pkey.trim()+"」を保存しました");}
    catch(e){setPst("err:保存に失敗しました");}
  }

  function loadProject(){
    if(!pkey.trim()){setPst("err:プロジェクト名を入力してください");return;}
    try{
      const raw=localStorage.getItem("mylyric:"+pkey.trim());
      if(!raw){setPst("err:プロジェクトが見つかりません");return;}
      const d=JSON.parse(raw) as Partial<{F:typeof initF;endings:string[];genreMode:string;selectedGenres:string[];customGenreName:string;customGenreKw:string;customGenreStyle:string;vocalGender:number;langRatio:number;vocalTexture:number|null;vocalRange:number|null;vocalOrigin:number|null;chordProg:number|null;bpm:number|null;targetAges:number[];targetGender:number|null;metaphor:number|null;dual:number;structMode:string;parts:Part[];selKw:string[];extraKw:string;ownLyric:string;}>;
      if(d.F)setF(d.F);if(d.endings)setEndings(d.endings);if(d.genreMode)setGenreMode(d.genreMode);if(d.selectedGenres)setSelectedGenres(d.selectedGenres);
      if(d.ownLyric!==undefined)setOwnLyric(d.ownLyric);
      if(d.customGenreName)setCustomGenreName(d.customGenreName);if(d.customGenreKw)setCustomGenreKw(d.customGenreKw);if(d.customGenreStyle)setCustomGenreStyle(d.customGenreStyle);
      if(d.vocalGender!==undefined)setVocalGender(d.vocalGender);if(d.langRatio!==undefined)setLangRatio(d.langRatio);
      if(d.vocalTexture!==undefined)setVocalTexture(d.vocalTexture);if(d.vocalRange!==undefined)setVocalRange(d.vocalRange);
      if(d.vocalOrigin!==undefined)setVocalOrigin(d.vocalOrigin);if(d.chordProg!==undefined)setChordProg(d.chordProg);
      if(d.bpm!==undefined)setBpm(d.bpm);if(d.targetAges)setTargetAges(d.targetAges);
      if(d.targetGender!==undefined)setTargetGender(d.targetGender);if(d.metaphor!==undefined)setMetaphor(d.metaphor);
      if(d.dual!==undefined)setDual(d.dual);if((d as any).chorusRepeat!==undefined)setChorusRepeat((d as any).chorusRepeat);if(d.structMode)setStructMode(d.structMode);
      if(d.parts)setParts(d.parts);if(d.selKw)setSelKw(d.selKw);if(d.extraKw)setExtraKw(d.extraKw);
      setPst("ok:「"+pkey.trim()+"」を読み込みました");
    }catch(e){setPst("err:読み込みに失敗しました");}
  }

  const psClass=pst.startsWith("ok:")?"ok":"err";

  function Seg(props:{opts:string[];val:number;onChange:(i:number)=>void}){
    return(<div className="t-seg">{props.opts.map(function(o,i){return <div key={i} className={"t-seg-o"+(props.val===i?" on":"")} onClick={function(){props.onChange(i);}}>{o}</div>;})}</div>);
  }
  function NullSeg(props:{opts:string[];val:number|null;onChange:(i:number|null)=>void}){
    return(<div className="t-seg">{props.opts.map(function(o,i){return <div key={i} className={"t-seg-o"+(props.val===i?" on":"")} onClick={function(){props.onChange(props.val===i?null:i);}}>{o}</div>;})}</div>);
  }
  function Badge(props:{type:"req"|"rec"|"opt"|"req-special"}){
    const map:{[k:string]:string}={"req-special":"🔑 必須",req:"必須",rec:"★ 推奨",opt:"任意"};
    return <span className={"t-badge "+props.type}>{map[props.type]}</span>;
  }

  const LAYERS:Layer[]=[
    {n:"LAYER 01",t:"事実を出す",h:"何があったか",qs:[
      {l:"Q01",t:"この曲にしたい出来事を、一言で言うと？",n:"例：ずっと好きだった人に、結局気持ちを伝えられなかった話",k:"q01",r:2,badge:"req-special",bn:"テーマの軸。なければ歌詞の方向が定まらない。"},
      {l:"Q02",t:"登場人物は誰？自分との関係性は？",n:"例：幼なじみ、ずっと片思いしていた同級生",k:"q02",r:3,badge:"rec",bn:"関係性が明確だと感情の対比が生まれ、歌詞の深みが増す。"},
      {l:"Q03",t:"何があったか、時系列で箇条書きにすると？",n:"順番通りじゃなくてもいい",k:"q03",r:6,badge:"rec",bn:"ストーリーの骨格。Aメロ（Verse 1・2）の流れに直接反映される。"},
    ]},
    {n:"LAYER 02",t:"場面の細部を出す",h:"具体的エピソード",qs:[
      {l:"Q04",t:"一番鮮明に覚えてる場面は？",n:"例：テーブルに置いてあった「食べてね」のメモ",k:"q04",r:3,badge:"rec",bn:"具体的な場面が歌詞のリアリティを大きく上げる。"},
      {l:"Q05",t:"そのとき届いた言葉・メッセージ・手紙は？",n:"例：「今から帰るね」というLINE",k:"q05",r:3,badge:"opt",bn:"あれば歌詞に直接使える素材になる。"},
      {l:"Q06",t:"2人だけが知ってる習慣・場所・もの・言葉は？",n:"例：パジャマ姿で甘えてくる / 夏の夜にバイクで走った",k:"q06",r:3,badge:"rec",bn:"他人には書けない細部がここから生まれる。歌詞の解像度を決める。"},
      {l:"Q07",t:"「あのとき言えなかった」言葉はある？",n:"",k:"q07",r:2,badge:"opt",bn:"あればCメロ（Bridge）やアウトロ（Outro）の核心になる。"},
    ]},
    {n:"LAYER 03",t:"感情を出す",h:"矛盾してていい",qs:[
      {l:"Q08",t:"表向きに感じてたことは？",n:"例：当たり前になってた / 逃げたかった",k:"q08",r:2,badge:"rec",bn:"感情の表層。Aメロ（Verse 1〜2）の入口になる。"},
      {l:"Q09",t:"本当は何を感じてた？",n:"例：怖かっただけ / 甘えてたのは自分の方だった",k:"q09",r:3,badge:"rec",bn:"本音の感情がサビ（Chorus）とCメロ（Bridge）の核心になる。矛盾してて正解。"},
      {l:"Q10",t:"今でも続いてる感情は？",n:"後悔・未練・感謝・怒り・安堵…",k:"q10",r:2,badge:"opt",bn:"アウトロ（Outro）の余韻に使える。"},
      {l:"Q11",t:"相手への気持ちを正直に一言で言うと？",n:"うまい言葉じゃなくていい",k:"q11",r:2,badge:"opt",bn:"あれば大サビ（Last Chorus）の締めに反映できる。"},
    ]},
  ];

  return (
    <div>
      <style>{S}</style>
      <div className="t">
        <div className="t-bg"></div>
        <div className="t-w">

          {shortQ01Modal&&(
            <div className="t-ov">
              <div className="t-mo">
                <div className="t-mo-top">
                  <div className="t-mo-br">MY LYRIC</div>
                  <div className="t-mo-t">入力内容が<em>短すぎます</em></div>
                  <div className="t-mo-s">Q01は10文字以上入力することをおすすめします。<br/>テーマだけでなく「どう感じたか」も一緒に入力すると歌詞の精度が大きく上がります。</div>
                </div>
                <div className="t-mo-b">
                  <div className="t-mo-step">
                    <div className="t-mo-n" style={{color:"var(--g)"}}>例</div>
                    <div className="t-mo-tx">「ずっと好きだった人に振られて悔しい」<br/>「仲良かった友達と離れてしまって寂しい」</div>
                  </div>
                </div>
                <div className="t-mo-f" style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                  <button className="t-btn t-btn-g" style={{width:"100%",padding:"13px"}} onClick={function(){setShortQ01Modal(null);setTab("create");}}>もう少し入力する</button>
                  <button className="t-btn t-btn-gh" style={{width:"100%",padding:"13px"}} onClick={shortQ01Modal.onProceed}>このまま生成する</button>
                </div>
              </div>
            </div>
          )}

          {missingModal&&(
            <div className="t-ov">
              <div className="t-mo">
                <div className="t-mo-top">
                  <div className="t-mo-br">MY LYRIC</div>
                  <div className="t-mo-t">⚠ 未入力の<em>必須項目</em>があります</div>
                  <div className="t-mo-s">入力することで歌詞の品質が大きく上がります。</div>
                </div>
                <div className="t-mo-b">
                  {missingModal.items.map(function(item,i){return(
                    <div key={i} className="t-mo-step">
                      <div className="t-mo-n" style={{color:"var(--rd)"}}>!</div>
                      <div className="t-mo-tx">{item}</div>
                    </div>
                  );})}
                </div>
                <div className="t-mo-f" style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                  <button className="t-btn t-btn-g" style={{width:"100%",padding:"13px"}} onClick={function(){setMissingModal(null);setTab("create");}}>CREATEに戻って入力する</button>
                  <button className="t-btn t-btn-gh" style={{width:"100%",padding:"13px"}} onClick={missingModal.onProceed}>このまま生成する</button>
                </div>
              </div>
            </div>
          )}

          {welcome&&(
            <div className="t-ov"><div className="t-mo">
              <div className="t-mo-top">
                <div className="t-mo-br">MY LYRIC</div>
                <div className="t-mo-t">あなたの人生が、<br/><em>歌になる。</em></div>
                <div className="t-mo-s" style={{fontSize:"13px",marginTop:"8px"}}>思い出や気持ちを、あなただけの歌にしよう。<br/><span style={{fontSize:"11px",opacity:.7}}>作詞経験ゼロでも大丈夫。</span></div>
              </div>
              <div className="t-mo-b">
                <div className="t-mo-step">
                  <div className="t-mo-n" style={{background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:"700",fontFamily:"'Space Grotesk',sans-serif"}}>01</div>
                  <div className="t-mo-tx"><strong>気持ちを入力する</strong><br/><span style={{fontSize:"10px",color:"var(--txd)"}}>質問に答えるだけで、あなたの想いを整理。</span></div>
                </div>
                <div className="t-mo-step">
                  <div className="t-mo-n" style={{background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:"700",fontFamily:"'Space Grotesk',sans-serif"}}>02</div>
                  <div className="t-mo-tx"><strong>歌詞とタイトルを生成する</strong><br/><span style={{fontSize:"10px",color:"var(--txd)"}}>あなたのストーリーを歌詞とタイトルに。</span></div>
                </div>
                <div className="t-mo-step">
                  <div className="t-mo-n" style={{background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:"700",fontFamily:"'Space Grotesk',sans-serif"}}>03</div>
                  <div className="t-mo-tx"><strong>曲づくりをサポート</strong><br/><span style={{fontSize:"10px",color:"var(--txd)"}}>音楽生成AI用のプロンプトまで自動で作成。</span></div>
                </div>
                <div className="t-mo-note" style={{borderRadius:"12px"}}><strong>恋愛・失恋・家族・夢・記念日</strong>など<br/>どんな想いも、あなただけの歌に。</div>
              </div>
              <div className="t-mo-f"><button className="t-btn t-btn-g" style={{width:"100%",padding:"14px",fontSize:"13px",borderRadius:"12px"}} onClick={function(){setWelcome(false);}}>はじめる →</button></div>
            </div></div>
          )}

          <nav className="t-nav">
            <div className="t-brand">MY LYRIC</div>
            <div className="t-tabs">{TABS.map(function(t){return <button key={t.id} className={"t-tab"+(tab===t.id?" on":"")} onClick={function(){setTab(t.id);}}>{t.label}</button>;})}</div>
          </nav>

          {/* ===== CREATE ===== */}
          {tab==="create"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Song Creation — MY LYRIC</div><h1 className="t-h1">感情を<em>曲に</em>する<br/>テンプレート</h1><p className="t-sub">素材を入力して設定を選ぶ。GENERATEタブで歌詞・プロンプトを生成。</p></div>

              {/* ガイド案内 */}
              {guideNotice&&(
                <div className="t-notice">
                  <button className="t-notice-close" onClick={closeGuideNotice}>閉じる ×</button>
                  <div style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"9px",background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".15em",fontWeight:"700",marginBottom:"8px"}}>MY LYRIC サポート</div>
                  <div style={{fontSize:"11px",color:"var(--txm)",lineHeight:"1.9",marginBottom:"12px"}}>
                    使い方はGUIDEで確認できます。制作中の疑問はAIサポートチャットに質問できます。
                  </div>
                  <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                    <button className="t-btn t-btn-g" style={{fontSize:"10px",padding:"8px 14px"}} onClick={function(){setTab("guide");setTimeout(function(){window.scrollTo({top:0,behavior:"smooth"});},50);}}>GUIDEを見る →</button>
                    <button className="t-btn t-btn-gh" style={{fontSize:"10px",padding:"8px 14px"}} onClick={function(){setTab("guide");setTimeout(function(){const el=document.getElementById("support-chat-section");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});},100);}}>AIサポートチャット →</button>
                  </div>
                </div>
              )}

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">PROJECT</span><span className="t-st">保存・共有</span></div>
                <div className="t-sb">
                  <div className="t-info"><strong>プロジェクト名</strong>を決めてSAVEするとこの端末のブラウザ内に保存される。</div>
                  <div className="t-sr"><input type="text" placeholder="プロジェクト名（例：夜の蝶）" value={pkey} onChange={function(e){setPkey(e.target.value);}}/><button className="t-btn t-btn-g" onClick={saveProject}>SAVE</button><button className="t-btn t-btn-gh" onClick={loadProject}>LOAD</button></div>
                  {pst.replace(/^(ok:|err:)/,"")&&<div className={"t-stb "+psClass}>{pst.replace(/^(ok:|err:)/,"")}</div>}
                </div>
              </div>

              <div className="t-s">
                <div className="t-sb" style={{background:"var(--gd)",border:"1px solid rgba(200,80,192,.15)",borderRadius:"12px",padding:"14px 16px"}}>
                  <div style={{fontSize:"12px",fontWeight:"600",color:"var(--tx)",marginBottom:"6px"}}>💡 入力について</div>
                  <div style={{fontSize:"11px",color:"var(--txm)",lineHeight:"1.9",letterSpacing:".04em"}}>
                    <strong>Q01は特別必須</strong>です。<strong>Q12・ENDINGも必須項目</strong>です。<br/>
                    <span style={{fontSize:"10px",color:"var(--txd)",display:"block",marginTop:"6px",lineHeight:"1.8"}}>
                      ① <strong style={{color:"var(--tx)"}}>Q01</strong>（特別必須）→ テーマの軸<br/>
                      ② <strong style={{color:"var(--tx)"}}>Q12・ENDING</strong>（必須）→ 核心と着地点<br/>
                      ③ <strong style={{color:"var(--tx)"}}>推奨項目（★）</strong> → Q02・Q04・Q06・Q08・Q09<br/>
                      ④ 任意項目 → Q03・Q05・Q07・Q10・Q11
                    </span>
                  </div>
                </div>
              </div>

              {LAYERS.map(function(sec){return (
                <div className="t-s" key={sec.n}>
                  <div className="t-sh"><span className="t-sn">{sec.n}</span><span className="t-st">{sec.t}</span><span className="t-sh2">{sec.h}</span></div>
                  <div className="t-sb">{sec.qs.map(function(q,i){
                    const isQ01=q.k==="q01";
                    const q01Locked=isQ01&&confirmedLocked;
                    return (
                    <div key={q.k}>{i>0&&<div className="t-div"></div>}
                      <div className="t-q">
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">{q.l}</div><Badge type={q.badge as "req"|"rec"|"opt"|"req-special"}/></div>
                        {q01Locked&&(
                          <div className="t-info" style={{marginBottom:"6px",borderColor:"rgba(200,80,192,.3)",fontSize:"10px"}}>
                            🔒 テーマ確認済みのためQ01は編集できません。変更する場合はCREATEタブ右下のRESETボタンで全てリセットしてください。
                          </div>
                        )}
                        <div className="t-badge-note">{q.bn}</div>
                        <div className="t-qt">{q.t}{q.n&&<span className={"t-qn"+(q.badge==="req"?" star":"")}>{q.n}</span>}</div>
                        <textarea rows={q.r} placeholder="ここに書く" value={(F as Record<string,string>)[q.k]} onChange={sf(q.k)} readOnly={q01Locked} style={q01Locked?{opacity:.6,cursor:"not-allowed",background:"rgba(0,0,0,.1)"}:{}}/>
                      </div>
                    </div>
                    );
                  })}</div>
                </div>
              );})}

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">LAYER 04</span><span className="t-st">核心を絞る</span><span className="t-sh2">一文で</span></div>
                <div className="t-sb"><div className="t-q">
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">Q12</div><Badge type="req"/></div>
                  <div className="t-badge-note">歌詞全体の軸。これがブレると歌詞がブレる。最後に書いてもいい。</div>
                  <div className="t-qt">この曲で一番言いたいことを、一文で言うと？<span className="t-qn star">例：手放したのは僕の方なのに / 甘えてたのは僕の方だった</span></div>
                  <div className="t-core"><textarea rows={2} placeholder="一文で書く" value={F.q12} onChange={sf("q12")}/></div>
                </div></div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">ENDING</span><span className="t-st">曲をどう終わらせたいか</span></div>
                <div className="t-sb">
                  <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}><Badge type="req"/></div>
                  <div className="t-badge-note">曲の着地点を1つ選んでください。これが歌詞全体の方向性を決めます。</div>
                  <div className="t-chips">{ENDINGS.map(function(e){return <div key={e} className={"t-chip"+(endings.includes(e)?" on":"")} onClick={function(){togE(e);}}><div className="t-dot"></div>{e}</div>;})}</div>
                  {endings.length>0&&(
                    <div style={{display:"flex",flexDirection:"column",gap:"6px",marginTop:"4px"}}>
                      {endings.map(function(e){return(
                        <div key={e} style={{fontSize:"11px",color:"var(--txm)",padding:"8px 12px",background:"var(--gd)",borderRadius:"8px",border:"1px solid rgba(200,80,192,.15)",lineHeight:"1.7"}}>
                          <span style={{background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",fontWeight:"700",marginRight:"6px"}}>{e}</span>
                          {ENDING_DESC[e]}
                        </div>
                      );})}
                    </div>
                  )}
                  <textarea rows={2} placeholder={"もう少し詳しく（任意）\n例：追ってくる彼女を振り切った感じで終わりたい"} value={F.endingDetail} onChange={sf("endingDetail")}/>
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">SETTINGS</span><span className="t-st">制作設定</span><span className="t-sh2">全て歌詞・プロンプトに反映</span></div>
                <div className="t-sb">
                  <div className="t-q">
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ジャンル</div><Badge type="opt"/></div>
                    <div className="t-badge-note">わからなければ「AIにおまかせ」でOK。複数選ぶと主従で掛け合わせる。ジャンルミックスの参考は<button className="t-pat-ins" style={{display:"inline",padding:"2px 8px",fontSize:"9px"}} onClick={function(){setTab("mix");}}>MIXタブへ →</button></div>
                    <div className="t-sm">
                      <div className={"t-sm-o"+(genreMode==="auto"?" on":"")} onClick={function(){setGenreMode("auto");}}>AIにおまかせ</div>
                      <div className={"t-sm-o"+(genreMode==="select"?" on":"")} onClick={function(){setGenreMode("select");}}>選んで決める</div>
                      <div className={"t-sm-o"+(genreMode==="custom"?" on":"")} onClick={function(){setGenreMode("custom");}}>カスタム入力</div>
                    </div>
                    {genreMode==="auto"&&(
                      <div className="t-info">素材の感情と内容から、AIが最適なジャンルを判断して歌詞・プロンプトを生成する。</div>
                    )}
                    {genreMode==="select"&&(
                      <div>
                        {selectedGenres.length>0&&(
                          <div style={{marginBottom:"10px"}}>
                            <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>選択中（上が主・下が従・↑↓で入れ替え）</div>
                            {selectedGenres.map(function(id,i){
                              const g=GENRES.find(function(x){return x.id===id;}) as Genre|undefined;
                              return (
                                <div key={id}>
                                  <div className="t-part-item">
                                    <span className="t-part-name">{i===0?"★主 ":"　従 "}{g?g.name:id}</span>
                                    <button className="t-part-arrow" onClick={function(){moveGenre(i,-1);}} disabled={i===0}>↑</button>
                                    <button className="t-part-arrow" onClick={function(){moveGenre(i,1);}} disabled={i===selectedGenres.length-1}>↓</button>
                                    <button className="t-part-toggle off" onClick={function(){toggleGenre(id);}}>外す</button>
                                  </div>
                                  {g&&g.ja_desc&&(
                                    <div style={{fontSize:"10px",color:"var(--txm)",padding:"6px 12px 8px",background:"var(--gd)",borderRadius:"0 0 8px 8px",border:"1px solid rgba(200,80,192,.12)",borderTop:"none",lineHeight:"1.7",marginBottom:"4px"}}>
                                      {g.ja_desc}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>ジャンルを選ぶ（最大3つ・選んだ順に主従が決まる）</div>
                        {GENRE_CATS.filter(function(c){return c!=="カスタム";}).map(function(cat){
                          const catGenres=GENRES.filter(function(g){return g.cat===cat;});
                          return (
                            <div key={cat}>
                              <div className="t-genre-cat">{cat}</div>
                              <div className="t-genre-grid">
                                {catGenres.map(function(g){
                                  return <button key={g.id} className={"t-genre-btn"+(selectedGenres.includes(g.id)?" on":"")} onClick={function(){toggleGenre(g.id);}}>{g.name}</button>;
                                })}
                              </div>
                            </div>
                          );
                        })}
                        {selectedGenres.length>=3&&<div style={{fontSize:"10px",color:"var(--g)",marginTop:"6px",fontFamily:"'Space Grotesk',sans-serif"}}>最大3つまで選択できます</div>}
                      </div>
                    )}
                    {genreMode==="custom"&&(
                      <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                        <input type="text" placeholder="ジャンル名（例：シューゲイザー）" value={customGenreName} onChange={function(e){setCustomGenreName(e.target.value);}}/>
                        <input type="text" placeholder="音楽生成AIキーワード（英語・カンマ区切り）" value={customGenreKw} onChange={function(e){setCustomGenreKw(e.target.value);}}/>
                        <input type="text" placeholder="歌詞スタイルの特徴（例：ノイジーで内省的な歌詞）" value={customGenreStyle} onChange={function(e){setCustomGenreStyle(e.target.value);}}/>
                      </div>
                    )}
                  </div>
                  <div className="t-div"></div>
                  <div className="t-q">
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ボーカル性別</div><Badge type="req"/></div>
                    <div className="t-badge-note">音楽生成AIプロンプトの根幹。必ず選ぶ。</div>
                    <Seg opts={VOCAL_GENDER_OPTS} val={vocalGender} onChange={function(i:number){setVocalGender(i);}}/>
                  </div>
                  <div className="t-div"></div>
                  <div className="t-q">
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">言語の割合</div><Badge type="rec"/></div>
                    <div className="t-badge-note">歌詞と音楽生成AIプロンプト両方に反映される。</div>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:"9px",color:"var(--txd)",marginBottom:"4px"}}><span>日本語</span><span>英語</span></div>
                    <Seg opts={LANG_RATIO_OPTS} val={langRatio} onChange={function(i:number){setLangRatio(i);}}/>
                  </div>
                  <div className="t-div"></div>
                  <div className="t-q">
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">コーラスの繰り返し</div><Badge type="opt"/></div>
                    <div className="t-badge-note">コーラス（サビ）が複数ある場合に歌詞の変化をコントロールできます。</div>
                    {(()=>{
                      const ep2=getEnabledParts();
                      const cCount=ep2.filter(function(t){return t==="[Chorus]";}).length;
                      const hasLast=ep2.includes("[Last Chorus]");
                      const fullOpts=cCount>=2&&hasLast;
                      const opts=fullOpts?CHORUS_REPEAT_OPTS:CHORUS_REPEAT_OPTS.slice(0,1);
                      return(
                        <div>
                          <div className="t-seg" style={{flexWrap:"wrap",gap:"4px"}}>
                            {opts.map(function(opt,i){
                              return <div key={i} style={{fontSize:"10px",padding:"7px 10px"}} className={"t-seg-o"+(chorusRepeat===i?" on":"")} onClick={function(){setChorusRepeat(chorusRepeat===i?null:i);}}>{opt}</div>;
                            })}
                          </div>
                          <div style={{fontSize:"10px",color:"var(--txd)",marginTop:"6px"}}>
                            {fullOpts?"未選択の場合はAIが素材に合わせて判断します。":"※ Chorus×2以上とLast Chorusが両方ONの場合に全4択が表示されます。"}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  <div className="t-div"></div>
                  <button className="t-adv" onClick={function(){setShowAdv(!showAdv);}}>
                    <span className="t-adv-arr">{showAdv?"▲":"▼"}</span>
                    <span>{showAdv?"詳細設定を閉じる":"詳細設定を開く（任意・こだわりたい人向け）"}</span>
                  </button>
                  {showAdv&&(
                    <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                      <div className="t-info" style={{fontSize:"10px",marginBottom:"0"}}>未選択の項目はAIが素材・ジャンル・感情に合わせて自動で判断します。こだわりたい部分だけ選択してください。</div>
                      <div className="t-q">
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">構成</div><Badge type="opt"/></div>
                        <div className="t-badge-note">基本構成はそのまま進む。カスタムでパートのON/OFFと順番を自由に変更できる。</div>
                        <div className="t-sm"><div className={"t-sm-o"+(structMode==="basic"?" on":"")} onClick={function(){setStructMode("basic");}}>基本構成（推奨）</div><div className={"t-sm-o"+(structMode==="custom"?" on":"")} onClick={function(){setStructMode("custom");}}>カスタム</div></div>
                        {structMode==="custom"&&(
                          <div>
                            <div className="t-preview">{parts.filter(function(p){return p.enabled;}).map(function(p){return p.tag;}).join(" → ")||"（パートをONにしてください）"}</div>
                            {parts.map(function(part,i){return (
                              <div key={part.id} className={"t-part-item"+(part.enabled?"":" off")}>
                                <span className="t-part-name">{part.name}</span>
                                <button className={"t-part-toggle "+(part.enabled?"on":"off")} onClick={function(){togglePart(part.id);}}>{part.enabled?"ON":"OFF"}</button>
                                <button className="t-part-arrow" onClick={function(){movePart(i,-1);}} disabled={i===0}>↑</button>
                                <button className="t-part-arrow" onClick={function(){movePart(i,1);}} disabled={i===parts.length-1}>↓</button>
                              </div>
                            );})}
                            {isChorusFirst()&&<div className="t-cf-note">✦ Intro ChorusがONで先頭 → プロンプトに「chorus first」を自動追加</div>}
                          </div>
                        )}
                      </div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">声の雰囲気</div><Badge type="opt"/></div><div className="t-badge-note">タップで選択・もう一度タップで解除。</div><NullSeg opts={VOCAL_TEXTURE_OPTS} val={vocalTexture} onChange={nullTog(vocalTexture,setVocalTexture)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">声域</div><Badge type="opt"/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:"9px",color:"var(--txd)",marginBottom:"4px"}}><span>低め</span><span>高め</span></div><NullSeg opts={VOCAL_RANGE_OPTS} val={vocalRange} onChange={nullTog(vocalRange,setVocalRange)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ボーカリスト系統</div><Badge type="opt"/></div><div className="t-badge-note">全英詞の場合は「海外系」を選ぶと自然になりやすい。</div><NullSeg opts={VOCAL_ORIGIN_OPTS} val={vocalOrigin} onChange={nullTog(vocalOrigin,setVocalOrigin)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">コード進行</div><Badge type="opt"/></div><NullSeg opts={CHORD_OPTS} val={chordProg} onChange={nullTog(chordProg,setChordProg)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">BPM・テンポ</div><Badge type="opt"/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:"9px",color:"var(--txd)",marginBottom:"4px"}}><span>遅め</span><span>速め</span></div><NullSeg opts={BPM_OPTS} val={bpm} onChange={nullTog(bpm,setBpm)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ターゲット年齢層</div><Badge type="opt"/></div><div className="t-chips">{AGE_OPTS.map(function(a,i){return <div key={i} className={"t-chip"+(targetAges.includes(i)?" on":"")} onClick={function(){togAge(i);}}><div className="t-dot"></div>{a}</div>;})}</div></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ターゲット性別</div><Badge type="opt"/></div><NullSeg opts={TARGET_GENDER_OPTS} val={targetGender} onChange={nullTog(targetGender,setTargetGender)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q">
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">インストゥルメンタルソロ</div><Badge type="opt"/></div>
                        <div className="t-badge-note">ギターソロ・ピアノソロなどの楽器ソロパートを歌詞構成とプロンプトに追加する。</div>
                        <div className="t-seg" style={{marginBottom:"8px"}}>
                          <div className={"t-seg-o"+(!soloEnabled?" on":"")} onClick={function(){setSoloEnabled(false);}}>OFF</div>
                          <div className={"t-seg-o"+(soloEnabled?" on":"")} onClick={function(){setSoloEnabled(true);}}>ON</div>
                        </div>
                        {soloEnabled&&(
                          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
                            <div>
                              <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>挿入位置（未選択の場合はAIが判断）</div>
                              <div className="t-seg">
                                {SOLO_POS_OPTS.map(function(opt,i){return(
                                  <div key={i} className={"t-seg-o"+(soloPosition===i?" on":"")} onClick={function(){setSoloPosition(soloPosition===i?null:i);}}>{opt}</div>
                                );})}
                              </div>
                            </div>
                            <div>
                              <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>楽器の種類（任意・複数選択可）</div>
                              <div className="t-chips">
                                {SOLO_TYPE_OPTS.map(function(opt,i){return(
                                  <div key={i} className={"t-chip"+(soloType.includes(i)?" on":"")} onClick={function(){setSoloType(function(prev){return prev.includes(i)?prev.filter(function(x){return x!==i;}):prev.concat([i]);});}}>
                                    <div className="t-dot"></div>{opt}
                                  </div>
                                );})}
                              </div>
                              <div style={{fontSize:"10px",color:"var(--txd)",marginTop:"6px"}}>未選択の場合はジャンルに合わせてAIが最適なソロを判断します。</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">比喩・匂わせのレベル</div><Badge type="opt"/></div><div style={{display:"flex",justifyContent:"space-between",fontSize:"9px",color:"var(--txd)",marginBottom:"4px"}}><span>直接</span><span>比喩</span></div><NullSeg opts={METAPHOR_OPTS} val={metaphor} onChange={nullTog(metaphor,setMetaphor)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">二重構造</div><Badge type="opt"/></div><div className="t-badge-note">特定の相手に届けたい場合にON。一般リスナーには別の意味に聴こえる歌詞を設計する。</div><Seg opts={DUAL_OPTS} val={dual} onChange={function(i:number){setDual(i);}}/></div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{display:"flex",gap:"8px"}}>
                <button className="t-btn t-btn-g" style={{flex:1,padding:"12px"}} onClick={function(){setTab("generate");}}>→ GENERATEへ進む</button>
                <button className="t-btn t-btn-rd" onClick={resetCreate}>RESET</button>
              </div>
            </div>
          )}

          {/* ===== GENERATE ===== */}
          {tab==="generate"&&(
            <div>
              <div className="t-hero"><div className="t-eye">AI Generation — MY LYRIC</div><h1 className="t-h1">生成から完成まで<br/><em>アプリ内で完結</em></h1><p className="t-sub">STEP 0〜7をすべてこのタブで行う。外に出る必要なし。</p></div>

              {/* STEP 0 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 0</span><span className="t-st">テーマをAIと確認する</span><span className="t-sh2">任意・精度向上</span></div>
                <div className="t-sb">
                  {ownLyric.trim()?(
                    <div className="t-info">既存の歌詞からテーマを逆算して分析します。確定テーマが歌詞診断・編集チャット・世界観カードに反映されます。</div>
                  ):(
                    <div className="t-info">AIが素材を整理して「核心」と「感情の流れ」を確認してくれます。実行すると歌詞の精度が向上します（任意）。ズレがあれば修正指示を入力して再確認できます。</div>
                  )}
                  {!canGenerate()&&<div style={{fontSize:"11px",color:"var(--rd)",padding:"8px 12px",background:"rgba(224,85,85,0.08)",borderRadius:"8px",border:"1px solid rgba(224,85,85,0.2)"}}>Q01を入力するか、STEP1の既存の歌詞欄に歌詞を入力してください。</div>}
                  {!confirmedLocked?(
                    <button className="t-btn t-btn-g" onClick={function(){doConfirm();}} disabled={!!loading||!canGenerate()}>{loading==="confirm"?"確認中...":ownLyric.trim()?"歌詞からテーマを分析する":"テーマを確認する"}</button>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
                      <div className="t-info" style={{fontSize:"10px"}}>✅ 確認済み。ズレがある場合は修正指示を入力して再確認してください。</div>
                      <textarea rows={2} placeholder="修正指示（例：主人公は女性です。相手は幼なじみです。）" value={confirmRevise} onChange={function(e){setConfirmRevise(e.target.value);}}/>
                      <button className="t-btn t-btn-g" onClick={function(){doConfirm(confirmRevise);setConfirmRevise("");}} disabled={!!loading}>{loading==="confirm"?"確認中...":"修正して再確認する"}</button>
                    </div>
                  )}
                  {(confirmed||loading==="confirm")&&<div className={"t-out"+(confirmed?" lit":"")} style={{minHeight:"60px"}}>{confirmed||"確認中..."}</div>}
                </div>
              </div>

              {/* STEP 1 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 1</span><span className="t-st">歌詞を生成する</span><span className="t-sh2">全設定が反映される</span></div>
                <div className="t-sb">
                  <div className="t-info">CREATEで入力した素材・設定が全て自動反映されます。既存の歌詞がある場合は下の欄に貼り付けてください。</div>
                  {!canGenerate()&&<div style={{fontSize:"11px",color:"var(--rd)",padding:"8px 12px",background:"rgba(224,85,85,0.08)",borderRadius:"8px",border:"1px solid rgba(224,85,85,0.2)",marginBottom:"8px"}}>Q01を入力するか、下の既存の歌詞欄に歌詞を入力してください。</div>}
                  <div style={{marginBottom:"12px",padding:"14px 16px",background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:"12px"}}>
                    <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>既存の歌詞を使う（任意）</div>
                    <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"8px"}}>自分で書いた歌詞がある場合はここに入力。Q01が空でも使用可能。STEP2以降が使えます。</div>
                    {/* ①②統合バナー：生成歌詞と既存歌詞が両方ある場合 */}
                    {ownLyric.trim()&&lyric.trim()&&(
                      <div className="t-info" style={{marginBottom:"8px",borderColor:"rgba(200,80,192,.3)",fontSize:"10px"}}>
                        ⚠ <strong>生成済み歌詞が優先されています。</strong>この欄は現在使用されていません。<br/>
                        既存歌詞ルートでAI修正を行った場合、最新の歌詞はSTEP1の生成歌詞エリアに反映されています。この欄は修正前の元歌詞です。<br/>
                        既存歌詞を使う場合は上の生成済み歌詞エリアをリセットしてください。
                      </div>
                    )}
                    <textarea rows={5} placeholder={"[Verse 1]\nここに歌詞を貼り付け..."} value={ownLyric} onChange={function(e){
                      const newVal=e.target.value;
                      if(originalLyric.trim()&&newVal!==ownLyric)setOwnLyricChanged(true);
                      if(!originalLyric.trim()&&newVal.trim())setOriginalLyric(newVal.trim());
                      setOwnLyric(newVal);setHira("");
                    }} style={{marginBottom:"4px"}}/>
                    {ownLyricChanged&&(
                      <div className="t-info" style={{marginBottom:"6px",borderColor:"rgba(200,80,192,.3)",fontSize:"10px"}}>
                        ⚠ 既存の歌詞を変更しました。テーマ・診断などの生成内容とズレる可能性があります。生成し直すことを推奨します。
                      </div>
                    )}
                    {ownLyric.trim()&&(
                      <div style={{display:"flex",alignItems:"center",gap:"8px",marginTop:"4px"}}>
                        <div style={{fontSize:"10px",color:lyric.trim()?"var(--txd)":"var(--gr)",flex:1}}>
                          {lyric.trim()?"📌 元歌詞（参照用）":"✅ 既存の歌詞が入力されています。STEP2以降が使えます。"}
                        </div>
                        <button className="t-btn t-btn-rd" style={{fontSize:"9px",padding:"5px 10px"}} onClick={resetOwnLyric}>歌詞データを全消去</button>
                      </div>
                    )}
                  </div>
                  <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
                    <button className="t-btn t-btn-g" style={{flex:1}} onClick={doLyric} disabled={!!loading||!canGenerate()||ownLyric.trim().length>0}>{loading==="lyric"?"生成中...":ownLyric.trim()?"既存歌詞使用中":lyricLocked?"再生成する（履歴消去）":"GENERATE LYRIC"}</button>
                  </div>
                  {(lyric||loading==="lyric")&&(
                    <div>
                      <textarea readOnly value={lyric||(loading==="lyric"?"生成中...":"")} style={{minHeight:"280px",maxHeight:"400px",background:"rgba(200,80,192,0.04)",borderColor:"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",marginBottom:"8px"}}/>
                      {getActiveLyric()&&<button className={"t-btn "+(copyOk==="lyric"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(getActiveLyric(),"lyric");}}>{copyLabel("lyric","通常の歌詞をコピーする（漢字あり）")}</button>}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 2 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 2</span><span className="t-st">歌詞の最終チェック・編集</span><span className="t-sh2">診断 {lyricDiagCount}/2回目{lyricDiagCount>0?" 完了":""}</span></div>
                <div className="t-sb">
                  {!getActiveLyric()?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成するか、既存の歌詞を入力すると使えます。</div>
                  ):(
                    <div>
                      {lyricChanged&&<div className="t-info" style={{marginBottom:"8px",borderColor:"rgba(200,80,192,.3)"}}>⚠ 歌詞が変更されました。必要に応じて再度「歌詞最終チェック」を実行してください。</div>}
                      <div className="t-info" style={{marginBottom:"10px"}}>
                        <strong>🚨 致命的な問題</strong>：タグ崩壊・構成崩壊・文字化けなど → AIが自動修正（任意）<br/>
                        <strong>⚠ 改善推奨</strong>：表現・ジャンルらしさなど → 下の歌詞編集チャットで調整<br/>
                        診断は最大2回まで。
                      </div>
                      {lyricDiagCount<2&&(
                        <button className="t-btn t-btn-g" onClick={doLyricDiag} disabled={!!loading} style={{width:"100%",padding:"12px",marginBottom:"10px"}}>
                          {loading==="lyricDiag"?"診断中...":`歌詞最終チェック（${lyricDiagCount+1}/2回目）`}
                        </button>
                      )}
                      {lyricDiagCount>=2&&!lyricDiagnosis&&(
                        <div className="t-info" style={{marginBottom:"10px"}}>診断2回完了。下の歌詞編集チャットで調整できます。</div>
                      )}
                      {lyricDiagnosis&&(
                        <div>
                          <div className="t-out diag" style={{maxHeight:"300px",marginBottom:"10px"}}>{lyricDiagnosis}</div>
                          {hasFatalLyricIssue()?(
                            <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"8px"}}>
                              <div style={{fontSize:"11px",color:"var(--txd)"}}>AI自動修正（任意）または下の歌詞編集チャットで自分で修正することもできます。</div>
                              <button className="t-btn t-btn-g" style={{width:"100%",padding:"11px"}} onClick={doLyricAutoFix} disabled={!!loading}>{loading==="lyricFix"?"修正中...":"AIが自動修正する（致命的問題のみ）"}</button>
                            </div>
                          ):(
                            <div>
                              <div className="t-info" style={{marginBottom:"8px",borderColor:"rgba(126,200,126,.2)"}}>✅ 致命的な問題はありません。完成度は十分です。</div>
                            </div>
                          )}
                          {lyricDiagCount>=2&&hasFatalLyricIssue()&&(
                            <div className="t-info" style={{marginTop:"8px",marginBottom:"8px"}}>診断2回完了。下の歌詞編集チャットで調整してください。</div>
                          )}
                        </div>
                      )}
                      <div className="t-div" style={{margin:"16px 0"}}></div>
                      <div ref={lyricEditRef} style={{fontFamily:"'Space Grotesk',sans-serif",fontSize:"9px",background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".1em",textTransform:"uppercase",marginBottom:"8px",fontWeight:700}}>歌詞編集AIチャット</div>
                      <div className="t-info" style={{marginBottom:"10px",fontSize:"10px"}}>
                        SENDで送信するとAIが変更理由と修正済み歌詞全文を返します。各返答の「歌詞へ反映する」で歌詞に適用、「変更前に戻す」で1つ前に戻す、「この編集をリセット」でその返答を削除できます。「オールリセット」で最初の歌詞に戻します。
                      </div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"10px"}}>
                        {[
                          {label:"感情を強くする",text:"感情表現を強くしてください。"},
                          {label:"感情を弱くする",text:"感情表現を弱くしてください。"},
                          {label:"比喩を増やす",text:"比喩表現を増やしてください。"},
                          {label:"比喩を減らす",text:"比喩表現を減らしてください。"},
                          {label:"音数を整える",text:"各パートの音数を揃えてください。"},
                          {label:"韻を増やす",text:"韻を増やしてください。"},
                          {label:"サビを強くする",text:"サビをより印象的に強くしてください。"},
                          {label:"説明を減らす",text:"説明的な表現を減らしてください。"},
                          {label:"ジャンルらしさを強くする",text:"現在設定されているジャンルらしさを強めてください。"},
                          {label:"全体を見直す",text:"歌詞全体を見直して整合性を確認してください。"},
                        ].map(function(btn,bi){return(
                          <button key={bi} className="t-btn t-btn-gh" style={{fontSize:"10px",padding:"6px 10px"}} onClick={function(){setChatEditInput(function(prev){return prev?prev+"\n"+btn.text:btn.text;});}}>{btn.label}</button>
                        );})}
                      </div>
                      <div style={{display:"flex",gap:"6px",marginBottom:"8px",flexWrap:"wrap"}}>
                        <button className="t-btn t-btn-rd" style={{fontSize:"9px",padding:"6px 12px"}} onClick={allResetLyricChat} disabled={chatEditDisplay.length===0&&!originalLyric.trim()}>オールリセット</button>
                      </div>
                      <div className="t-chat">
                        <div className="t-chat-msgs" ref={chatMsgsRef}>
                          {chatEditDisplay.length===0&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>上のクイック修正ボタンまたは直接入力して送信してください。</div>}
                          {chatEditDisplay.map(function(m,mi){return(
                            <div key={mi} className={"t-msg "+(m.role==="user"?"u":"a")}>
                              <div className="t-msg-who">{m.role==="user"?"YOU":"MY LYRIC AI"}</div>
                              <div className="t-msg-body">{m.content}</div>
                              {m.role==="assistant"&&m.hasLyric&&(
                                <div style={{display:"flex",gap:"6px",marginTop:"8px",flexWrap:"wrap"}}>
                                  {!m.applied?(
                                    <button className="t-btn t-btn-g" style={{padding:"8px 14px",fontSize:"10px"}} onClick={function(){applyLyricEditAt(mi);}}>歌詞へ反映する</button>
                                  ):(
                                    <span style={{fontSize:"10px",color:"var(--gr)",padding:"8px 14px",background:"rgba(126,200,126,.08)",border:"1px solid rgba(126,200,126,.2)",borderRadius:"8px"}}>✅ 反映済み</span>
                                  )}
                                  {m.applied&&(
                                    <button className="t-btn t-btn-gh" style={{padding:"8px 14px",fontSize:"10px"}} onClick={function(){undoLyricEditAt(mi);}}>変更前に戻す</button>
                                  )}
                                  <button className="t-btn t-btn-rd" style={{padding:"8px 14px",fontSize:"10px"}} onClick={function(){resetSingleEdit(mi);}}>この編集をリセット</button>
                                </div>
                              )}
                            </div>
                          );})}
                        </div>
                        <div className="t-chat-in">
                          <textarea rows={2} placeholder="修正指示を入力（Shift+Enterで送信・Enterで改行）" value={chatEditInput} onChange={function(e){setChatEditInput(e.target.value);}} onKeyDown={handleLyricEditKey}/>
                          <button className="t-chat-send" onClick={sendLyricEditChat} disabled={loading==="lyricEdit"||!chatEditInput.trim()}>SEND</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 3 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 3</span><span className="t-st">タイトルを決める</span><span className="t-sh2">選択・再生成・自作</span></div>
                <div className="t-sb">
                  <div className="t-info" style={{fontSize:"10px"}}>日本語・英語・日英ミックスの3候補を自動生成します。</div>
                  {!getActiveLyric()?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成するか、既存の歌詞を入力するとタイトル生成が使えます。</div>
                  ):(
                    <div>
                      <div className="t-br" style={{marginBottom:"12px"}}>
                        <button className="t-btn t-btn-g" onClick={doTitle} disabled={!!loading}>{loading==="title"?"生成中...":titleLocked?"再生成する":"GENERATE TITLE"}</button>
                      </div>
                      {titleMode==="generated"&&titleParsed.length>0&&(
                        <div>
                          <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"8px",letterSpacing:".05em"}}>タイトルを選んでコピーする</div>
                          <div className="t-title-opts">{titleParsed.map(function(item,i){return <button key={i} className={"t-title-opt"+(selectedTitle===item.value?" sel":"")} onClick={function(){setSelectedTitle(item.value);setTitleMode("generated");}}><div className="t-title-label">{item.label}</div>{item.value}</button>;})}</div>
                        </div>
                      )}
                      {loading==="title"&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>生成中...</div>}
                      <div style={{marginTop:"10px"}}>
                        <button className="t-btn t-btn-gh" onClick={function(){setTitleMode(titleMode==="custom"?"generated":"custom");setSelectedTitle("");}} style={{width:"100%",marginBottom:"8px"}}>{titleMode==="custom"?"← 生成された候補に戻る":"自分でタイトルを作成する →"}</button>
                        {titleMode==="custom"&&<input type="text" placeholder="タイトルを入力してください" value={customTitle} onChange={function(e){setCustomTitle(e.target.value);setSelectedTitle(e.target.value);}}/>}
                      </div>
                      {(selectedTitle||customTitle)&&<button className={"t-btn "+(copyOk==="title"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px",marginTop:"8px"}} onClick={function(){doCopy(titleMode==="custom"?customTitle:selectedTitle,"title");}}>{copyLabel("title","選択したタイトルをコピーする")}</button>}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 4 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 4</span><span className="t-st">AI用ひらがな整形</span><span className="t-sh2">読み間違い防止</span></div>
                <div className="t-sb">
                  {!getActiveLyric()?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成するか、既存の歌詞を入力するとAI用ひらがな整形が使えます。</div>
                  ):(
                    <div>
                      {lyricChanged&&!hira&&(
                        <div className="t-info" style={{marginBottom:"8px",borderColor:"rgba(200,80,192,.3)"}}>⚠ 歌詞が変更されました。再整形してください。</div>
                      )}
                      <div className="t-info" style={{marginBottom:"8px"}}>日本語をひらがな化し、意味のまとまりごとに全角スペースを入れて息継ぎ・リズムが分かる形に整形します。SunoやUdioでの読み間違いを防ぎます。</div>
                      <button className="t-btn t-btn-g" onClick={doHira} disabled={!!loading} style={{marginBottom:"8px"}}>{loading==="hira"?"整形中...":hira?"再整形する":"AI用ひらがな整形"}</button>
                      {hira&&(
                        <div>
                          <textarea readOnly value={extractHira(hira)} style={{minHeight:"200px",maxHeight:"280px",background:"rgba(200,80,192,0.04)",borderColor:"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",marginBottom:"8px"}}/>
                          <button className={"t-btn "+(copyOk==="hira"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(extractHira(hira),"hira");}}>{copyLabel("hira","AI用ひらがなをコピーする")}</button>
                        </div>
                      )}
                      {loading==="hira"&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>整形中...</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 5 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 5</span><span className="t-st">音楽生成AIプロンプトを生成する</span><span className="t-sh2">{musicAI==="udio"?"文字数制限なし":styleLimit+"文字上限"}</span></div>
                <div className="t-sb">
                  <div className="t-info">設定したジャンル・ボーカル・言語・全設定が自動反映される。</div>
                  <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"4px"}}>
                    <div>
                      <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"4px",letterSpacing:".05em"}}>使用する音楽生成AI</div>
                      <div className="t-seg">
                        {MUSIC_AI_OPTS.map(function(ai,i){const val=["suno","udio","other"][i];return <div key={i} className={"t-seg-o"+(musicAI===val?" on":"")} onClick={function(){setMusicAI(val);}}>{ai}</div>;})}
                      </div>
                    </div>
                    {musicAI!=="udio"&&(
                      <div>
                        <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"4px",letterSpacing:".05em"}}>スタイルプロンプトの文字数上限</div>
                        <div className="t-seg">
                          {STYLE_LIMIT_OPTS.map(function(n){return <div key={n} className={"t-seg-o"+(styleLimit===n?" on":"")} onClick={function(){setStyleLimit(n);}}>{n}字</div>;})}
                        </div>
                        <div style={{fontSize:"10px",color:"var(--txd)",marginTop:"4px"}}>
                          Suno無料：200〜300文字推奨　Suno有料（v5）：最大1,000文字　Udio：制限なし
                        </div>
                      </div>
                    )}
                    {musicAI==="udio"&&(
                      <div className="t-info" style={{fontSize:"10px"}}>Udioは文字数制限なし。詳細で多層的なプロンプトが高品質な出力につながります。</div>
                    )}
                  </div>
                  {!canPromptGenerate()&&<div style={{fontSize:"11px",color:"var(--txd)",padding:"8px 12px",background:"var(--gg)",borderRadius:"8px",border:"1px solid rgba(200,80,192,.12)",marginBottom:"8px"}}>STEP1で歌詞を生成するか、既存の歌詞を入力するとプロンプト生成が使えます。</div>}
                  <div className="t-br" style={{marginBottom:"8px"}}>
                    <button className="t-btn t-btn-g" onClick={doPrompt} disabled={!!loading||!canPromptGenerate()}>{loading==="prompt"?"生成中...":promptLocked?"再生成する（履歴消去）":"GENERATE PROMPT"}</button>
                    {promptOut&&!promptOut.startsWith("エラー")&&(
                      <span style={{fontSize:"10px",fontFamily:"'Space Grotesk',sans-serif",color:getPromptOnly().length>getStyleLimit()?"var(--rd)":"var(--gr)"}}>
                        {getPromptOnly().length}/{getStyleLimit()}文字
                      </span>
                    )}
                  </div>
                  {(promptOut||loading==="prompt")&&(
                    <div>
                      <textarea readOnly value={getPromptOnly()||(loading==="prompt"?"生成中...":"")} style={{minHeight:"140px",maxHeight:"220px",background:"rgba(200,80,192,0.04)",borderColor:getPromptOnly().length>getStyleLimit()?"rgba(224,85,85,0.4)":"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",fontFamily:"'Space Grotesk',sans-serif",fontSize:"11px",marginBottom:"8px"}}/>
                      {promptOut&&!promptOut.startsWith("エラー")&&<button className={"t-btn "+(copyOk==="prompt"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(getPromptOnly(),"prompt");}}>{copyLabel("prompt","音楽生成AIプロンプトをコピーする")}</button>}
                      {getGenreSuggestion()&&<div className="t-out" style={{marginTop:"8px",fontSize:"11px",borderColor:"rgba(200,80,192,.15)"}}>{getGenreSuggestion()}</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 6 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 6</span><span className="t-st">プロンプト最終チェック</span><span className="t-sh2">任意</span></div>
                <div className="t-sb">
                  {!promptOut||promptOut.startsWith("エラー")?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 5でプロンプトを生成すると使えます。</div>
                  ):(
                    <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                      <div className="t-step-label">PROMPT FINAL CHECK</div>
                      <div className="t-info"><strong>STAGE 1</strong>：診断ボタンを押すと問題点のみをリストアップする（修正しない）<br/><strong>STAGE 2</strong>：診断結果を見てボタンで修正を指示する</div>
                      <div className="t-info" style={{marginBottom:"8px"}}>
                        <strong>🚨 致命的な問題</strong>：文字数超過・キーワード欠如など → AIが自動修正<br/>
                        <strong>⚠ 軽微な問題</strong>：キーワード順序など → KEYWORDSタブで調整<br/>
                        診断は最大2回まで。
                      </div>
                      {promptDiagCount<2&&(
                        <button className="t-btn t-btn-g" onClick={doPromptDiag} disabled={!!loading||!promptOut||promptOut.startsWith("エラー")} style={{width:"100%",padding:"12px"}}>
                          {loading==="promptDiag"?"診断中...":`診断する（${promptDiagCount+1}/2回目）`}
                        </button>
                      )}
                      {promptDiagCount>=2&&!promptDiag&&(
                        <div className="t-info">診断2回完了。細かい調整はKEYWORDSタブへ。</div>
                      )}
                      {promptDiag&&(
                        <div>
                          <div className="t-out diag" style={{maxHeight:"240px",marginBottom:"8px"}}>{promptDiag}</div>
                          {hasFatalPromptIssue()?(
                            <div style={{display:"flex",gap:"8px",marginBottom:"8px"}}>
                              <button className="t-btn t-btn-g" style={{flex:1,padding:"11px"}} onClick={function(){doPromptFix("以下の診断結果の致命的な問題のみを修正してください。ユーザーが選択したジャンル・キーワード・設定は変更しないでください。\n\n【診断結果】\n"+promptDiag);}} disabled={!!loading}>{loading==="promptFix"?"修正中...":"AIが自動修正する（致命的問題のみ）"}</button>
                            </div>
                          ):(
                            <div>
                              <div className="t-info" style={{marginBottom:"8px",borderColor:"rgba(126,200,126,.2)"}}>✅ 致命的な問題はありません。</div>
                              <button className="t-btn t-btn-gh" style={{width:"100%",marginBottom:"8px"}} onClick={function(){setTab("keywords");setFromKeywords(true);}}>KEYWORDSで調整する</button>
                            </div>
                          )}
                          {promptDiagCount>=2&&hasFatalPromptIssue()&&(
                            <div>
                              <div className="t-info" style={{marginTop:"8px",marginBottom:"8px"}}>診断2回完了。自動修正後はKEYWORDSタブで調整してください。</div>
                              <button className="t-btn t-btn-gh" style={{width:"100%"}} onClick={function(){setTab("keywords");}}>KEYWORDSタブへ</button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 7 */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 7</span><span className="t-st">曲の世界観カード</span><span className="t-sh2">画像・映像制作用</span></div>
                <div className="t-sb">
                  <div className="t-info">
                    <strong>このカードの使い方</strong><br/>
                    コピーしてChatGPT・Claude・Geminiに貼り付けるだけで、以下の用途に使える。<br/><br/>
                    ・<strong>ジャケット画像</strong> →「Midjourney用のプロンプトを作って」<br/>
                    ・<strong>MV・映像</strong> →「Gemini Veo用の映像プロンプトをシーン別に作って」<br/>
                    ・<strong>SNS投稿画像</strong> →「Canva用のデザイン指示を作って」
                  </div>
                  {!getActiveLyric()?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成するか、既存の歌詞を入力すると世界観カードが作れます。</div>
                  ):(
                    <div>
                      {!worldLocked?(
                        <button className="t-btn t-btn-g" onClick={function(){doWorldCard();}} disabled={!!loading} style={{marginBottom:"8px"}}>{loading==="world"?"生成中...":"世界観カードを生成する"}</button>
                      ):(
                        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"8px"}}>
                          <div className="t-info" style={{fontSize:"10px"}}>✅ 生成済み。修正指示を入力して再生成できます。</div>
                          <textarea rows={2} placeholder="修正指示（例：もっと夜のイメージで。色調は青系で。）" value={worldRevise} onChange={function(e){setWorldRevise(e.target.value);}}/>
                          <button className="t-btn t-btn-g" onClick={function(){doWorldCard(worldRevise);setWorldRevise("");}} disabled={!!loading}>{loading==="world"?"生成中...":"修正して再生成する"}</button>
                        </div>
                      )}
                      {worldCard&&(
                        <div>
                          <textarea readOnly value={worldCard} style={{minHeight:"260px",maxHeight:"380px",background:"rgba(200,80,192,0.04)",borderColor:"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",marginBottom:"8px"}}/>
                          <button className={"t-btn "+(copyOk==="world"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(worldCard,"world");}}>{copyLabel("world","世界観カードをコピーする")}</button>
                        </div>
                      )}
                      {loading==="world"&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>生成中...</div>}
                    </div>
                  )}
                </div>
              </div>

              {["STEP 0でテーマ確認→STEP 1で歌詞生成→STEP 2で歌詞チェック・編集→STEP 3タイトル→STEP 4 AI用ひらがな整形→STEP 5プロンプト生成→STEP 6プロンプト最終チェック→STEP 7世界観カード。","歌詞とプロンプトのチェックは独立。互いに影響しない。","世界観カードはChatGPT・Claude・Geminiに貼り付けて画像・映像プロンプトの作成に使える。"].map(function(t,i){
                return <div key={i} className="t-tip"><span className="t-tip-m">—</span><span>{t}</span></div>;
              })}
            </div>
          )}

          {/* ===== KEYWORDS ===== */}
          {tab==="keywords"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Prompt Studio — MY LYRIC</div><h1 className="t-h1">プロンプトを<em>細かく調整する</em></h1><p className="t-sub">QuickFixとキーワードは独立して動作します。「初期プロンプトに戻す」でGENERATE PROMPT直後の状態にいつでも戻せます。</p></div>
              {!promptOut||promptOut.startsWith("エラー")?(
                <div className="t-info">先にGENERATEタブでプロンプトを生成してください。</div>
              ):(
                <div>
                  <div className="t-s">
                    <div className="t-sh"><span className="t-sn">QUICK FIX</span><span className="t-st">よくある修正をワンタップで選択</span></div>
                    <div className="t-sb">
                      <div className="t-info" style={{fontSize:"10px",marginBottom:"8px"}}>ボタンを選択して「プロンプトに反映させる」を押すとAIがプロンプトを修正します。文字数は自動で上限内に収めます。「初期プロンプトに戻す」でGENERATE PROMPT直後の状態に戻ります。</div>
                      <div className="t-chips">
                        {[
                          {label:"重複キーワードを削除",fix:"重複・矛盾するキーワードを削除してください"},
                          {label:"ジャンルらしさを強化",fix:"ジャンルらしさをより強調するキーワードに調整してください"},
                          {label:"ボーカル設定を明確に",fix:"ボーカルの設定をより明確なキーワードで表現してください"},
                          {label:"感情・雰囲気を強化",fix:"感情と雰囲気のキーワードを強化してください"},
                          {label:"楽器キーワードを追加",fix:"楽器のキーワードを適切に追加してください"},
                          {label:"テンポ・BPMを明確に",fix:"テンポとBPMをより明確なキーワードで表現してください"},
                          {label:"シンプルに整理",fix:"キーワードを厳選してシンプルで効果的なプロンプトに整理してください"},
                        ].map(function(item,i){return(
                          <button key={i} className={"t-btn "+(selectedPromptFixes.includes(item.fix)?"t-btn-g":"t-btn-gh")} style={{fontSize:"10px",padding:"8px 12px"}} onClick={function(){togglePromptFix(item.fix);}} disabled={!!loading}>{item.label}</button>
                        );})}
                      </div>
                      <div style={{display:"flex",gap:"8px",alignItems:"center",marginTop:"8px",flexWrap:"wrap"}}>
                        <button className="t-btn t-btn-g" onClick={function(){applyPromptAdjustments("quickfix");}} disabled={!!loading||selectedPromptFixes.length===0}>プロンプトに反映させる</button>
                        <button className="t-btn t-btn-gh" onClick={function(){undoPromptAdjustment("quickfix");}} disabled={!promptBeforeAdjust.trim()}>初期プロンプトに戻す</button>
                        <button className="t-btn t-btn-gh" onClick={function(){setTab("generate");}}>GENERATEへ戻る</button>
                      </div>
                      {quickFixMessage&&<div className="t-info" style={{marginTop:"6px",fontSize:"10px",borderColor:quickFixMessage.includes("⚠")?"rgba(200,80,192,.3)":"rgba(126,200,126,.2)",color:quickFixMessage.includes("⚠")?"var(--g)":"var(--gr)"}}>{quickFixMessage}</div>}
                    </div>
                  </div>

                  <div className="t-s">
                    <div className="t-sh"><span className="t-sn">EXTRA KEYWORDS</span><span className="t-st">キーワードを追加する</span><span className="t-sh2">{selKw.length}語選択中</span></div>
                    <div className="t-sb">
                      {Object.entries(EXTRA_KW).map(function(entry){
                        const catDesc:{[k:string]:string}={"EMOTION":"感情や心情を強化します","INSTRUMENT":"使用する楽器の雰囲気を強化します","ATMOSPHERE":"情景や世界観を強化します"};
                        return (
                          <div className="t-kw-s" key={entry[0]}>
                            <div className="t-kw-t">{entry[0]}</div>
                            {catDesc[entry[0]]&&<div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px"}}>{catDesc[entry[0]]}</div>}
                            <div className="t-kw-g">{entry[1].map(function(item){const k=item.en;return <div key={k} className={"t-kw"+(selKw.includes(k)?" on":"")} onClick={function(){togKw(k);}} style={{display:"flex",flexDirection:"column",gap:"1px",padding:"6px 8px"}}><span>{k}</span><span style={{fontSize:"8px",opacity:.65}}>{item.ja}</span></div>;})}</div>
                          </div>
                        );
                      })}
                      <div className="t-div"></div>
                      <div className="t-q"><div className="t-ql">自由入力</div><textarea rows={2} placeholder="追加したいキーワードを英語で入力（カンマ区切り）" value={extraKw} onChange={function(e){setExtraKw(e.target.value);setKeywordsChanged(true);}}/></div>
                      <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
                        <button className="t-btn t-btn-g" onClick={function(){applyPromptAdjustments("keywords");}} disabled={!!loading||(selKw.length===0&&!extraKw.trim())}>プロンプトに反映させる</button>
                        <button className="t-btn t-btn-gh" onClick={function(){undoPromptAdjustment("keywords");}} disabled={!promptBeforeAdjust.trim()}>初期プロンプトに戻す</button>
                        <button className="t-btn t-btn-gh" onClick={function(){setTab("generate");setFromKeywords(true);}}>GENERATEへ戻る</button>
                      </div>
                      {keywordsMessage&&<div className="t-info" style={{marginTop:"6px",fontSize:"10px",borderColor:keywordsMessage.includes("⚠")?"rgba(200,80,192,.3)":"rgba(126,200,126,.2)",color:keywordsMessage.includes("⚠")?"var(--g)":"var(--gr)"}}>{keywordsMessage}</div>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ===== REVISE ===== */}
          {tab==="revise"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Revision Guide — MY LYRIC</div><h1 className="t-h1">修正の<em>伝え方</em></h1><p className="t-sub">修正依頼の「伝え方の例」を見る場所です。実際の修正はGENERATEタブの歌詞編集AIチャットで行います。</p></div>
              {!getActiveLyric()?(
                <div className="t-info">先にGENERATEタブで歌詞を生成するか、既存の歌詞を入力してください。</div>
              ):(
                <div>
                  {REVISE_PATTERNS.map(function(p){return (
                    <div className="t-pat" key={p.num}>
                      <div className="t-pat-h"><span className="t-pat-n">PATTERN {p.num}</span><span className="t-pat-t">{p.title}</span></div>
                      <div className="t-pat-b">{p.desc}<div className="t-pat-ex">{p.ex}</div>
                        <button className="t-pat-ins" onClick={function(){setInsertOk(p.num);setTimeout(function(){setTab("generate");setInsertOk(null);},800);}}>→ GENERATEチャットへ</button>
                        {insertOk===p.num&&<span className="t-ins-ok">✓ GENERATEタブへ移動します...</span>}
                      </div>
                    </div>
                  );})}
                </div>
              )}
            </div>
          )}

          {/* ===== MIX ===== */}
          {tab==="mix"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Genre Mix — MY LYRIC</div><h1 className="t-h1">ジャンルミックス<em>一覧</em></h1><p className="t-sub">CREATEのSETTINGSでジャンルを最大3つ選ぶと主従で掛け合わせることができます。以下は参考の組み合わせ例です。</p></div>
              <div className="t-info" style={{marginBottom:"20px"}}>ジャンルはCREATEのSETTINGSで選択できます。最大3つまで選べます。<button className="t-pat-ins" style={{display:"inline",marginLeft:"8px",fontSize:"9px",padding:"3px 10px"}} onClick={function(){setTab("create");}}>CREATEへ →</button></div>
              {MIX_EXAMPLES.map(function(cat){return(
                <div className="t-s" key={cat.cat}>
                  <div className="t-sh"><span className="t-sn">MIX</span><span className="t-st">{cat.cat}</span></div>
                  <div className="t-sb" style={{padding:"12px 16px"}}>
                    <div className="t-mix-head">
                      <span>主ジャンル</span><span>従ジャンル①</span><span>従ジャンル②</span><span>イメージ</span>
                    </div>
                    {cat.items.map(function(item,i){return(
                      <div key={i} className="t-mix-row">
                        <span style={{color:"var(--g)",fontFamily:"'Space Grotesk',sans-serif",fontSize:"10px"}}>{item.genres[0]}</span>
                        <span>{item.genres[1]||"—"}</span>
                        <span style={{color:"var(--txd)"}}>{item.genres[2]||"—"}</span>
                        <span style={{color:"var(--txd)",fontSize:"10px"}}>{item.image}</span>
                      </div>
                    );})}
                  </div>
                </div>
              );})}
            </div>
          )}

          {/* ===== GUIDE ===== */}
          {tab==="guide"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Guide — MY LYRIC</div><h1 className="t-h1">使い方<em>ガイド</em></h1><p className="t-sub">MY LYRICの使い方と制作フローを確認できます。AIサポートチャットで質問もできます。</p></div>

              {/* AIサポートチャット（先頭） */}
              <div className="t-s" id="support-chat-section">
                <div className="t-sh"><span className="t-sn">AI SUPPORT</span><span className="t-st">AIサポートチャット</span><span className="t-sh2">MY LYRIC専用</span></div>
                <div className="t-sb">
                  <div className="t-info" style={{fontSize:"10px"}}>MY LYRICの使い方・ジャンル選択・歌詞制作のアドバイス・プロンプト相談などに対応しています。MY LYRIC以外の質問・歌詞の丸投げ生成には対応していません。</div>
                  <div className="t-chat">
                    <div className="t-chat-msgs">
                      {supportChatDisplay.length===0&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>MY LYRICについて何でも質問してください。<br/>例：「Q01に何を書けばいいですか？」「K-POPとJ-POPのミックスはどうやるの？」</div>}
                      {supportChatDisplay.map(function(m,mi){return(
                        <div key={mi} className={"t-msg "+(m.role==="user"?"u":"a")}>
                          <div className="t-msg-who">{m.role==="user"?"YOU":"MY LYRIC SUPPORT"}</div>
                          <div className="t-msg-body">{m.content}</div>
                        </div>
                      );})}
                    </div>
                    <div className="t-chat-in">
                      <textarea rows={2} placeholder="質問を入力（Enterで送信）" value={supportChatInput} onChange={function(e){setSupportChatInput(e.target.value);}} onKeyDown={handleSupportChatKey}/>
                      <button className="t-chat-send" onClick={sendSupportChat} disabled={loading==="supportChat"||!supportChatInput.trim()}>SEND</button>
                    </div>
                  </div>
                  {supportChatDisplay.length>0&&(
                    <button className="t-btn t-btn-rd" style={{fontSize:"9px",padding:"6px 12px",marginTop:"8px"}} onClick={function(){setSupportChatDisplay([]);setSupportChatInput("");}}>チャットをリセット</button>
                  )}
                  <div style={{display:"flex",gap:"8px",marginTop:"14px",flexWrap:"wrap"}}>
                    <button className="t-btn t-btn-gh" style={{fontSize:"10px",padding:"8px 14px"}} onClick={function(){setTab("create");}}>← CREATEへ</button>
                    <button className="t-btn t-btn-gh" style={{fontSize:"10px",padding:"8px 14px"}} onClick={function(){setTab("generate");}}>GENERATEへ →</button>
                  </div>
                </div>
              </div>

              {/* 使い方ガイド */}
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">GUIDE</span><span className="t-st">使い方ガイド</span></div>
                <div className="t-sb" style={{gap:"0",padding:"8px 16px"}}>
                  {[
                    {h:"💡 歌詞の精度について",t:"MY LYRICはQ01のみでも歌詞を生成できます。\n\nQ02〜Q12の内容が増えるほど歌詞の個性や説得力は向上します。\n\n入力の優先度：\n① Q01（特別必須）→ テーマの軸\n② Q12・ENDING（必須）→ 核心と着地点\n③ 推奨項目（★） → Q02・Q04・Q06・Q08・Q09\n④ 任意項目 → Q03・Q05・Q07・Q10・Q11"},
                    {h:"🔑 Q01（特別必須）について",t:"Q01が空欄の場合はGENERATEが動きません。10文字未満の場合は警告が表示されます。\n例：「好きだった人に振られて悔しい」\n\nテーマ確認（STEP0）を実行した後はQ01がロックされます（編集不可）。\n変更したい場合はCREATEタブ右下のRESETボタンで全てリセットしてください。"},
                    {h:"既存の歌詞を使う場合",t:"STEP1の既存の歌詞欄に歌詞を入力すると、Q01が空でもSTEP2〜7が全て使えます。\n・歌詞診断・タイトル生成・AI用ひらがな整形・プロンプト生成・世界観カード\n\nSTEP0の「歌詞からテーマを分析する」を実行すると歌詞からテーマを逆算して確定テーマを生成します。\n\n既存の歌詞を変更した場合は⚠ 警告バナーが表示されます。その場合はSTEP0やSTEP2などを生成し直すことを推奨します。\n既存の歌詞の「リセット」ボタンを押すと歌詞・診断・チャット履歴が全てクリアされます。"},
                    {h:"STEP0について",t:"Q01または既存歌詞があればSTEP0のテーマ確認が使えます。\nテーマ確認は任意ですが、実行すると歌詞生成・診断・編集チャットの精度が向上します。\n\nAIが質問を返した場合、回答は任意です。「修正して再確認する」で更新できます。\n\nSTEP0を実行しなくてもQ01があれば直接GENERATE LYRICが使えます。"},
                    {h:"STEP1（歌詞生成）について",t:"Q01が入力されていればGENERATE LYRICが押せます。\nSTEP0のテーマ確認は精度を上げるための任意ステップです。\n\n既存の歌詞欄に歌詞が入力されている場合はGENERATE LYRICは使用できません（既存歌詞を使用中）。"},
                    {h:"一人称・二人称の統一について",t:"歌詞生成時、一人称（僕・俺・わたし等）と二人称（君・あなた等）は歌詞全体で統一されます。最初に登場した表現で最後まで統一します。\n\nただしQ01〜Q12の素材に複数の視点や一人称が明記されている場合は、その内容を優先します。"},
                    {h:"STEP2（歌詞チェック・編集）について",t:"歌詞チェックは最大2回まで実行できます。\n\n🚨 致命的な問題（構成崩壊・テーマ不一致など）→「AIが自動修正する」で修正\n⚠ 軽微な問題（表現・ジャンルらしさなど）→ 歌詞編集AIチャットで調整\n\n歌詞が変更された場合はSTEP2の再チェックが可能です。"},
                    {h:"歌詞編集AIチャットについて",t:"STEP2にある歌詞のブラッシュアップ専用チャットです。\n\nクイック修正ボタンで入力を補助（自動送信しない）。\nEnterキーで改行、Shift+Enterで送信（またはSENDボタン）。\n送信するとAIが変更理由と修正済み歌詞全文を返します。\n各返答の「歌詞へ反映する」で歌詞データに適用（✅反映済みに変わる）。\n「変更前に戻す」でその返答の反映を取り消せる（反映済みの場合のみ表示）。\n「この編集をリセット」でその返答とユーザーの指示を削除（反映済みなら歌詞も戻す）。\n「オールリセット」でチャット全消去＋最初に生成した歌詞の状態に戻す。"},
                    {h:"AIサポートチャットについて",t:"GUIDEタブの先頭にあるMY LYRIC専用のサポートチャットです。画面右下の💬ボタンからいつでもアクセスできます。\n\n対応内容：\n・MY LYRICの使い方・操作方法\n・ジャンル選択・ミックスの相談\n・歌詞制作のアドバイス\n・Q01〜Q12の入力サポート\n・プロンプト改善の相談\n\n会話は連続した文脈を保持します（最大5往復）。「チャットをリセット」で会話履歴を消去できます。\nMY LYRIC以外の話題・歌詞の丸投げ生成には対応していません。"},
                    {h:"STEP4（AI用ひらがな整形）について",t:"日本語をひらがな化し、意味のまとまりごとに全角スペースを入れて息継ぎ・リズムが分かる形に整形します。SunoやUdioでの読み間違いを防ぎます。\n\n歌詞が変更された場合は⚠ 警告が表示されます。その場合は再整形してください。"},
                    {h:"音楽生成AIとプロンプト文字数",t:"STEP5で使用する音楽生成AIと文字数上限を選択できます。\nSuno無料：200〜300文字推奨\nSuno有料（v5）：最大1,000文字\nUdio：文字数制限なし（詳細ほど高品質）"},
                    {h:"プロンプト生成の条件",t:"プロンプト生成は歌詞がある場合のみ使用できます。\n・STEP1で歌詞を生成した場合\n・STEP1の既存の歌詞欄に歌詞を入力した場合\n\nSTEP5のGENERATE PROMPTはSTEP1の歌詞生成とは独立しています。"},
                    {h:"STEP6（プロンプト最終チェック）について",t:"プロンプトの診断は最大2回まで実行できます。\n\n🚨 致命的な問題（文字数超過・キーワード欠如など）→「AIが自動修正する」で修正\n⚠ 軽微な問題（キーワード順序など）→ KEYWORDSタブで調整\n\nKEYWORDS（QUICK FIX・追加キーワード）による調整後はSTEP6の再診断をおすすめします。"},
                    {h:"KEYWORDSタブのQUICK FIXについて",t:"QUICK FIXとEXTRA KEYWORDSは完全独立しています。\n\nQUICK FIX：ボタンを選択して「プロンプトに反映させる」を押すと反映。文字数は自動で上限内に収めます。\nEXTRA KEYWORDS：キーワードを選択または入力して「プロンプトに反映させる」を押すと反映。\n\n「初期プロンプトに戻す」でGENERATE PROMPT直後の状態に戻せます（何度反映しても初期状態に一発で戻ります）。"},
                    {h:"REVISEタブについて",t:"REVISEは歌詞修正の「伝え方の例」を見る場所です。実際の修正はGENERATEタブのSTEP2にある歌詞編集AIチャットで行います。"},
                    {h:"MIXタブについて",t:"MIXタブではジャンルミックスの組み合わせ例（64パターン）を確認できます。\nCREATEのSETTINGSでジャンルを最大3つ選ぶと主従で掛け合わせて生成されます。\n\n選んだ順番が主従に影響します（1つ目が主・2つ目以降が従）。\n\nMIXタブは「人気・鉄板」「エモ・切ない」「ロック・バンド」「K-POP・アイドル」「シティポップ・夜」「夏・爽やか」「ダーク・病み」「バラード・アコースティック」「ヒップホップ・クラブ」「和風・和系」「懐かしさ・レトロ」の11カテゴリに分類されています。"},
                    {h:"ジャンルの決め方",t:"3つのモードがあります。\n①AIにおまかせ：素材から最適なジャンルをAIが判断\n②選んで決める：最大3つ選択可。選んだ順に主従が決まり掛け合わせて生成。系統別に38ジャンルから選択。選択するとそのジャンルの説明が表示されます\n③カスタム入力：ジャンル名とキーワードを自由に指定"},
                    {h:"インストゥルメンタルソロ設定について",t:"CREATEタブの詳細設定（「詳細設定を開く」）に追加されています。\n\nONにすると歌詞構成にソロパートタグ（例：[Guitar Solo]）が自動挿入され、プロンプトにも対応するキーワードが追加されます。\n\n設定項目：\n・ON/OFF切り替え\n・挿入位置：Bridge前 / 大サビ前 / AIにおまかせ\n・楽器の種類：ギター・ピアノ・サックス・バイオリン・シンセ・和楽器・AIにおまかせ（複数選択可）\n\n楽器を選択しない場合はジャンルに合わせてAIが最適なソロを判断します。"},
                    {h:"サビの繰り返し設定について",t:"CREATEタブのSETTINGSに追加されています（言語設定の下・詳細設定の上）。\n\nコーラスが複数ある場合にサビの歌詞変化をコントロールできます。\n\n選択肢：\n①コーラス全て同じ：中毒性・統一感を重視\n②コーラス同じ・大サビ変える：ラストのみクライマックスに\n③コーラス少し変化・大サビ全書換：徐々に変化してラストで昇華\n④全て異なる：各サビで異なる表現\n\n未選択の場合はAIが素材に合わせて自動で判断します。\n※ Chorus×2以上とLast Chorusが両方ONの構成のときのみ全4択表示。それ以外は非表示。"},
                    {h:"詳細設定について",t:"CREATEタブのSETTINGS内「詳細設定を開く」から設定できます。\n\n全て任意です。未選択の項目はAIが素材・ジャンル・感情に合わせて自動で判断します。こだわりたい部分だけ選択すれば十分です。\n\n設定項目：\n・構成（基本/カスタム）\n・声の雰囲気\n・声域（低め←→高め）\n・ボーカリスト系統\n・コード進行\n・BPM・テンポ（遅め←→速め）\n・ターゲット年齢・性別\n・比喩・匂わせのレベル（直接←→比喩）\n・二重構造\n・インストゥルメンタルソロ"},
                    {h:"制作フロー",t:"【通常ルート】\nSTEP 0: テーマ確認（任意・精度向上）\nSTEP 1: 歌詞を生成（Q01があればすぐ押せる）\nSTEP 2: 歌詞チェック＋歌詞編集AIチャット\nSTEP 3〜7: タイトル・AI用ひらがな整形・プロンプト・プロンプトチェック・世界観カード\n\n【既存歌詞ルート】\nSTEP 1: 既存の歌詞を入力\nSTEP 0: テーマ逆算（任意・精度向上）\nSTEP 2〜7: そのまま利用可能\n\n制作前の確認：\n・テーマの核心を一言で言えるか\n・登場人物の関係性は明確か\n・感情の流れに起承転結があるか\n・終わり方は決まってるか\n・ターゲットリスナーは誰か\n\n制作後の確認：\n・同じパートの行数は揃ってるか\n・ひらがなの音数は揃ってるか\n・伏線と回収は成立してるか\n・比喩が多すぎないか\n・選択したジャンルらしいか\n・プロンプトが文字数上限以内に収まってるか"},
                    {h:"プロジェクトの保存について",t:"プロジェクト名を決めてSAVEするとこの端末のブラウザ内に保存される。別端末との共有には対応していません。\n\n保存対象：Q01〜Q12・ENDING・ジャンル設定・ボーカル設定・言語設定・構成・その他全設定・既存の歌詞"},
                  ].map(function(item,i){return (
                    <div key={i} className="t-guide-item"><div className="t-guide-h">{item.h}</div><div className="t-guide-txt">{item.t}</div></div>
                  );})}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
      {/* フローティングAIサポートチャットボタン */}
      <button
        onClick={function(){setTab("guide");setTimeout(function(){const el=document.getElementById("support-chat-section");if(el)el.scrollIntoView({behavior:"smooth",block:"start"});},100);}}
        style={{position:"fixed",bottom:"24px",right:"20px",width:"52px",height:"52px",borderRadius:"50%",background:"var(--grad)",border:"none",cursor:"pointer",fontSize:"22px",zIndex:50,boxShadow:"0 4px 20px rgba(200,80,192,.4)",display:"flex",alignItems:"center",justifyContent:"center"}}
        title="AIサポートチャット"
      >💬</button>
    </div>
  );
}
