"use client";
import React, { useState, useRef, useEffect } from "react";

type LayerQ = {
  l: string;
  t: string;
  n: string;
  k: string;
  r: number;
  badge: "req" | "rec" | "opt";
  bn: string;
};
type Layer = {
  n: string;
  t: string;
  h: string;
  qs: LayerQ[];
};


declare global {
  interface Window {
    confirm(msg: string): boolean;
    prompt(msg: string): string|null;
  }
}

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
  .t*{box-sizing:border-box;margin:0;padding:0;}
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
  ::-webkit-scrollbar{width:3px;}
  ::-webkit-scrollbar-thumb{background:var(--bd);border-radius:2px;}
`;

type Genre = {
  id: string;
  name: string;
  sunoKw: string;
  lyricStyle: string;
  checkKw: string;
};

const GENRES: Genre[] = [
  {id:"city_pop",name:"ネオシティポップ",sunoKw:"modern city pop, japanese city pop, jazz-infused city pop, neo soul, smooth R&B",lyricStyle:"夜に聴いて心地よい空気感・説明しすぎない余白・都会的でおしゃれな比喩",checkKw:"都会的な洗練さ・余白・おしゃれな語感・夜の空気感"},
  {id:"jpop",name:"J-POP",sunoKw:"j-pop, japanese pop, catchy melody, bright emotional, mainstream pop",lyricStyle:"共感しやすい言葉・キャッチーで明快なサビ・感情に直接訴える表現",checkKw:"J-POPらしいキャッチさ・わかりやすさ・明快なサビ・共感性"},
  {id:"ballad",name:"バラード",sunoKw:"ballad, slow emotional, piano led, heartfelt, cinematic strings",lyricStyle:"感情をゆっくり丁寧に描写・余韻を大切に・言葉の重みを優先",checkKw:"バラードらしい感情の重さ・丁寧な描写・余韻のある言葉"},
  {id:"rnb",name:"R&B / ネオソウル",sunoKw:"R&B, neo soul, smooth groove, soulful, rhythmic, sensual",lyricStyle:"リズムに乗る言葉選び・グルーヴ感・感情的で深みのある表現",checkKw:"R&Bらしいグルーヴ感・リズムに乗る語感・感情の深さ"},
  {id:"rock",name:"ロック",sunoKw:"rock, electric guitar, energetic, powerful drums, intense",lyricStyle:"エネルギーと疾走感・直接的で力強い言葉・感情の爆発",checkKw:"ロックらしいエネルギー・力強さ・直接的な言葉"},
  {id:"acoustic",name:"アコースティック",sunoKw:"acoustic, folk, fingerpicking guitar, intimate, warm, singer-songwriter",lyricStyle:"温かく親密な語感・日常の細部・素朴で誠実な言葉",checkKw:"アコースティックらしい温かさ・素朴さ・親密感"},
  {id:"hiphop",name:"ヒップホップ",sunoKw:"hip hop, rap, urban, rhythmic flow, boom bap",lyricStyle:"ライム・フロー・韻を踏む言葉遊び・ストーリーテリング",checkKw:"ヒップホップらしいライム・フロー・韻の踏み方"},
  {id:"edm",name:"EDM / ダンス",sunoKw:"EDM, dance, electronic, synth, club, energetic drop, euphoric",lyricStyle:"繰り返しのフック・シンプルで踊れる言葉・高揚感",checkKw:"EDMらしい高揚感・繰り返しの強さ・シンプルなフック"},
  {id:"lofi",name:"ローファイ",sunoKw:"lofi, lo-fi hip hop, chill, mellow, nostalgic, jazzy",lyricStyle:"日常のふとした瞬間・曖昧な感情・夢と現実の境界",checkKw:"ローファイらしい曖昧さ・日常感・ノスタルジー"},
  {id:"indie",name:"インディーポップ",sunoKw:"indie pop, alternative, dreamy, jangly guitar, bittersweet",lyricStyle:"独自の世界観・少し変わった比喩・内省的な言葉",checkKw:"インディーらしい独自性・ひねりのある比喩・内省的な語感"},
  {id:"custom",name:"カスタム",sunoKw:"",lyricStyle:"",checkKw:""},
];

const TABS:{id:string;label:string}[]=[{id:"create",label:"CREATE"},{id:"generate",label:"GENERATE"},{id:"keywords",label:"KEYWORDS"},{id:"revise",label:"REVISE"},{id:"check",label:"CHECK"}];
const ENDINGS=["後悔","祈り","解放","曖昧","前向き","感謝","怒り","余韻"];
const VOCAL_GENDER_OPTS=["男性","女性"];
const VOCAL_TEXTURE_OPTS=["やわらかい","力強い","セクシー","透き通った","ダーク","中性的"];
const VOCAL_RANGE_OPTS=["高め","中間","低め"];
const VOCAL_ORIGIN_OPTS=["日本人系","海外系","どちらでもいい"];
const LANG_RATIO_OPTS=["日本語のみ","10%英語","20%英語","30%英語","50%英語","全英詞","AIにおまかせ"];
const CHORD_OPTS=["明るく切ない","おしゃれ・都会的","浮遊感・ドリーミー","切なく暗い","エモ・激情","ノスタルジック"];
const BPM_OPTS=["ゆったり 60〜72","落ち着いた 73〜84","ミドル 85〜95","少し軽快 96〜108","軽快 109〜120","アップテンポ 121〜"];
const AGE_OPTS=["10代","20代","30代","40代","50代","60代〜"];
const TARGET_GENDER_OPTS=["男性向け","女性向け","男女問わず"];
const METAPHOR_OPTS=["AIにおまかせ","完全に隠す（比喩のみ）","少し匂わせる","本人だけわかる","直接的に表現"];
const DUAL_OPTS=["OFF（通常）","ON（一般向けと本人向けの二重構造）"];
const CLIP_SECS=[15,30,60];
const VOCAL_TEXTURE_KW=["soft warm vocal","powerful passionate vocal","sultry seductive vocal","clear crystalline vocal","dark brooding vocal","androgynous neutral vocal"];
const VOCAL_RANGE_KW=["high register upper range","mid range vocal","low register deep vocal"];
const VOCAL_ORIGIN_KW: (string | null)[] =["japanese vocal style j-pop vocal","native english vocalist western vocal style",null];
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
  {id:"intro",name:"Intro Chorus",tag:"[Intro Chorus]",enabled:false},
  {id:"v1",name:"Verse 1",tag:"[Verse 1]",enabled:true},
  {id:"pre1",name:"Pre-Chorus 1",tag:"[Pre-Chorus]",enabled:true},
  {id:"ch1",name:"Chorus 1",tag:"[Chorus]",enabled:true},
  {id:"v2",name:"Verse 2",tag:"[Verse 2]",enabled:true},
  {id:"pre2",name:"Pre-Chorus 2",tag:"[Pre-Chorus]",enabled:true},
  {id:"ch2",name:"Chorus 2",tag:"[Chorus]",enabled:true},
  {id:"bridge",name:"Bridge",tag:"[Bridge]",enabled:true},
  {id:"last",name:"Last Chorus",tag:"[Last Chorus]",enabled:true},
  {id:"outro",name:"Outro",tag:"[Outro]",enabled:true},
];
const EXTRA_KW={
  "EMOTION":["melancholic","bittersweet","emotionally raw","quiet regret","slow burn intensity","simmering emotion","passionate restraint","delicate","tender","emotionally vulnerable"],
  "INSTRUMENT":["Rhodes piano","mellow electric guitar","upright bass","slap bass","finger picked guitar","brushed snare","swing hi-hat","punchy drums","muted trumpet","soft saxophone","lush synth pads","lo-fi texture"],
  "ATMOSPHERE":["late night drive","neon reflections","summer night highway","winter night","phone screen glow","late night apartment","cabaret night","still water atmosphere","quiet night"],
};
const CHECKS_BEFORE=["テーマの核心を一言で言えるか","登場人物の関係性は明確か","感情の流れに起承転結があるか","最後の終わり方は決まってるか","ターゲットリスナーは誰か","比喩の軸は何か","言語の割合は決まってるか"];
const CHECKS_AFTER=["同じパートの行数は揃ってるか","ひらがなの音数は揃ってるか","伏線と回収は成立してるか","比喩が多すぎないか","説明しすぎてないか","選択したジャンルらしいか","音楽生成AIが読み間違いしそうな漢字はないか","プロンプトが1000文字以内に収まってるか"];
type RevisePattern = {
  num: string;
  title: string;
  desc: string;
  ex: string;
  qi: string;
};

const REVISE_PATTERNS:RevisePattern[]=[
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
          try{const j=JSON.parse(d);if(j.type==="content_block_delta"&&j.delta&&j.delta.text){full+=j.delta.text;onChunk(full);}}catch(e){}}}
      return full;
    }catch(e:unknown){if(full.length>0)return full;throw e;}
  }
  return "";
}
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
  const[metaphor,setMetaphor]=useState(0);
  const[dual,setDual]=useState(0);
  const[structMode,setStructMode]=useState("basic");
  const[parts,setParts]=useState<Part[]>(DEFAULT_PARTS.map(function(p){return Object.assign({},p) as Part;}));
  const[pkey,setPkey]=useState("");
  const[pst,setPst]=useState("");
  const[selKw,setSelKw]=useState<string[]>([]);
  const[extraKw,setExtraKw]=useState("");
  const[cb,setCb]=useState<boolean[]>(Array(CHECKS_BEFORE.length).fill(false));
  const[ca,setCa]=useState<boolean[]>(Array(CHECKS_AFTER.length).fill(false));
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
  const[chatDisplay,setChatDisplay]=useState<{role:string;content:string}[]>([]);
  const[chatInput,setChatInput]=useState("");
  const[lyricDiagnosis,setLyricDiagnosis]=useState("");
  const[promptDiag,setPromptDiag]=useState("");
  const[clipSec,setClipSec]=useState<number|null>(null);
  const[clipSection,setClipSection]=useState(0);
  const[clipPrompt,setClipPrompt]=useState("");
  const[copyOk,setCopyOk]=useState("");
  const[insertOk,setInsertOk]=useState<string|null>(null);
  const chatEndRef=useRef<HTMLDivElement|null>(null);
  useEffect(function(){if(chatEndRef.current)chatEndRef.current.scrollIntoView({behavior:"smooth"});},[chatDisplay]);
  useEffect(function(){window.scrollTo({top:0,behavior:"smooth"});},[tab]);

  // ジャンル関連：モードに応じた情報を返す
  function getGenreObjs():Genre[]{
    // selectedGenresのID配列からジャンルオブジェクト配列を返す（順番=主従）
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
    // 主ジャンルのキーワードを前に、従ジャンルを後ろに
    return objs.map(function(g){return g.sunoKw as string;}).filter(Boolean).join(", ");
  }
  // 後方互換：getGenre()は名前のみ参照する箇所用
  function getGenre(){return {name:getGenreName(),promptKw:getGenrePromptKw(),lyricStyle:getGenreLyricStyle(),checkKw:getGenreCheckKw()};}

  function toggleGenre(id:string){
    setSelectedGenres(function(prev){
      if(prev.includes(id))return prev.filter(function(x){return x!==id;});
      if(prev.length>=3)return prev; // 最大3
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
  function sf(k:string){return function(e:React.ChangeEvent<HTMLTextAreaElement|HTMLInputElement>){const v=e.target.value;setF(function(p){return Object.assign({},p,{[k]:v});});};}  
  function togE(v:string){setEndings(function(p){return p.includes(v)?p.filter(function(x){return x!==v;}):p.concat([v]);});}
  function togAge(i:number){setTargetAges(function(p){return p.includes(i)?p.filter(function(x){return x!==i;}):p.concat([i]);});}
  function togKw(k:string){setSelKw(function(p){return p.includes(k)?p.filter(function(x){return x!==k;}):p.concat([k]);});}
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
    setChordProg(null);setBpm(null);setTargetAges([]);setTargetGender(null);setMetaphor(0);setDual(0);
    setStructMode("basic");setParts(DEFAULT_PARTS.map(function(p){return Object.assign({},p) as Part;}));
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
    if(metaphor>0)s+="比喩レベル："+METAPHOR_OPTS[metaphor]+"\n";
    if(dual>0)s+="二重構造：ON\n";return s;
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
    if(selKw.length>0)kws.push(selKw.join(", "));
    if(extraKw.trim())kws.push(extraKw.trim());
    return kws.join(", ");
  }
  function buildLyricSys(){
    const ep=getEnabledParts();const firstTag=ep.length>0?ep[0]:"[Verse 1]";
    const mInstr=metaphor===0?"ジャンルに合わせてAIが最適な比喩を判断する":"比喩は1つの軸に絞る（"+METAPHOR_OPTS[metaphor]+"）";
    let genreInstr="";
    if(genreMode==="auto"){
      genreInstr="ジャンル：AIにおまかせ（素材の感情と内容から最適なジャンルを判断して作る）\n歌詞スタイル：素材に最も合うスタイルを選ぶ";
    }else{
      genreInstr="ジャンル："+getGenreName()+"\n歌詞スタイル："+getGenreLyricStyle();
      if(genreMode==="select"&&getGenreObjs().length>1)genreInstr+="\n複数ジャンルは主を中心に従を風味として自然に融合させる";
    }
    return"あなたはプロの作詞家です。\n"+genreInstr+"\n\n絶対ルール：\n・指定ジャンルらしい言葉選びをする\n・説明しすぎない・余白を残す\n・"+mInstr+"\n・同じパートは行数と音数を揃える（音数はひらがなで数える）\n・伏線と回収を設計する\n・構成："+ep.join(" → ")+"\n・"+firstTag+"から始める\n・言語："+getLangInstr()+"\n・前置き・説明・コメントは一切出力禁止\n・歌詞のみを出力する";
  }
  function buildChatSys(){
    const g=getGenre();const firstTag=getFirstTag();
    return"あなたはプロの作詞家・音楽プロデューサーです。\nジャンル："+g.name+"\nルール：ユーザーの指示に従って歌詞を修正する・修正後は必ず歌詞全体を"+firstTag+"から始まる形で出力する・前置き・説明文は一切禁止・歌詞のみを出力する・行数・音数・整合性を常に確認する・"+g.name+"らしさを維持する";
  }
  function buildDiagSys(mat:string,settings:string){
    const g=getGenre();const firstTag=getFirstTag();
    return"あなたは以下3つの専門家として歌詞の最終診断を行います。診断のみ行う。修正は絶対に行わない。\n\n【元の素材】\n"+mat+"\n【制作設定】\n"+settings+"\n\n① プロの作詞家として審査：\n・行数・音数の整合性（同じパートは揃ってるか）\n・伏線と回収の成立\n・比喩の一貫性（軸がブレてないか）\n・テーマ・核心との一致（素材と照合）\n・感情の流れ（始まり→変化→結末が自然か）\n\n② 音楽プロデューサーとして審査：\n・"+g.name+"らしさ（基準："+g.checkKw+"）\n・設定したボーカルイメージと語感の一致\n・言語割合の遵守（"+getLangInstr()+"）\n・構成の遵守（"+firstTag+"から始まってるか）\n\n③ 出力形式（必ず守る）：\n各項目を ✅ 問題なし / ⚠️ 問題あり（具体的に何が問題か）で記載\n最後に「修正が必要な項目：〇〇」を明記\n「全て修正して」または「〇〇だけ修正して」のように指示してください、と案内する";
  }
  function buildPromptDiagSys(settings:string){
    const g=getGenre();
    return"あなたは音楽生成AIプロンプトの専門エンジニアとして最終診断を行います。診断のみ行う。修正は絶対に行わない。\n\n【制作設定】\n"+settings+"\n\n審査項目：\n・1000文字以内か（文字数を報告する）\n・ジャンル（"+g.name+"）のキーワードが適切に含まれているか\n・ボーカル設定が含まれているか\n・感情・雰囲気・楽器・空気感のバランス\n・重複・矛盾するキーワードがないか\n・設定した内容との整合性\n\n出力形式（必ず守る）：\n各項目を ✅ 問題なし / ⚠️ 問題あり（具体的に）で記載\n最後に「修正が必要な項目：〇〇」を明記\n「プロンプトを修正して」または「〇〇だけ修正して」のように指示してください、と案内する";
  }
  function buildPromptSys(){
    const kw=getGenrePromptKw();
    let genreLine="";
    if(genreMode==="auto")genreLine="ジャンル：素材に最適なジャンルをAIが判断して選ぶ";
    else genreLine="ジャンル："+getGenreName()+(kw?"\n音楽生成AIキーワード："+kw:"");
    return"あなたは音楽生成AIプロンプトの専門家です。\n"+genreLine+"\n絶対ルール：出力は必ず1000文字以内・プロンプトのみ出力（説明文禁止）・カンマ区切りの英語キーワードのみ"+(kw?"・指定ジャンルキーワードを必ず含める":"");
  }
  function getPromptOnly(){const sep=promptOut.indexOf("---");return sep>0?promptOut.slice(0,sep).trim():promptOut;}
  function getGenreSuggestion(){const sep=promptOut.indexOf("---ジャンル提案---");return sep>0?promptOut.slice(sep):"";} 
  async function doConfirm(){
    const mat=buildMaterial();if(!mat.trim()){alert("CREATEタブで素材を入力してください");return;}
    setLoading("confirm");setConfirmed("");
    const sys="あなたはプロの作詞家です。ユーザーが送った曲の素材を読んで、以下を日本語で返してください。\n1.「この曲の核心」を一文で言語化する\n2.「感情の流れ」を3段階で整理する（始まり→変化→結末）\n3. 確認したい点があれば1〜2個質問する\n形式：\n【核心】〇〇\n【感情の流れ】〇〇→〇〇→〇〇\n【確認】〇〇";
    try{await callAI(sys,[{role:"user",content:"以下の素材を整理してください。\n\n"+mat}],function(r){setConfirmed(r);});}catch(e){setConfirmed("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doLyric(){
    const mat=buildMaterial();if(!mat.trim()){alert("CREATEタブで素材を入力してください");return;}
    if(lyric&&chatDisplay.length>0){if(!window.confirm("歌詞を再生成すると修正履歴が消えます。続けますか？"))return;}
    setLoading("lyric");setLyric("");setLyricHistory([]);setChatDisplay([]);setLyricDiagnosis("");setWorldCard("");
    const userMsg="以下の素材と設定から歌詞を作成してください。\n\n"+mat+"\n【制作設定】\n"+buildSettings();
    try{
      let result="";
      await callAI(buildLyricSys(),[{role:"user",content:userMsg}],function(r){result=r;setLyric(extractLyrics(r));},2000);
      const clean=extractLyrics(result);
      setLyricHistory([{role:"user",content:userMsg},{role:"assistant",content:clean}]);
    }catch(e){setLyric("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doLyricDiag(){
    if(!lyric)return;setLoading("lyricDiag");setLyricDiagnosis("");
    try{await callAI(buildDiagSys(buildMaterial(),buildSettings()),[{role:"user",content:"以下の歌詞を診断してください。\n\n"+lyric}],function(r){setLyricDiagnosis(r);},2000);}
    catch(e){setLyricDiagnosis("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function sendChat(){
    if(!chatInput.trim()||loading)return;if(!lyric){alert("先に歌詞を生成してください");return;}
    const userMsg=chatInput.trim();setChatInput("");
    const nd=chatDisplay.concat([{role:"user",content:userMsg}]);
    setChatDisplay(nd.concat([{role:"assistant",content:"生成中..."}]));
    const nh=lyricHistory.concat([{role:"user",content:userMsg}]);
    setLoading("chat");
    try{
      let r="";
      await callAI(buildChatSys(),nh,function(res){r=res;const c=extractLyrics(res);setChatDisplay(nd.concat([{role:"assistant",content:c}]));if(c.includes("[")&&c.length>50)setLyric(c);},2000);
      setLyricHistory(nh.concat([{role:"assistant",content:extractLyrics(r)}]));
    }catch(e){setChatDisplay(nd.concat([{role:"assistant",content:"エラー: "+(e instanceof Error?e.message:String(e))}]));}
    setLoading("");
  }
  function handleKey(e:React.KeyboardEvent<HTMLTextAreaElement>){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendChat();}}
  async function doTitle(){
    if(!lyric){alert("先に歌詞を生成してください");return;}
    setLoading("title");setTitleParsed([]);setSelectedTitle("");setTitleMode("generated");
    const sys="あなたはプロの作詞家です。歌詞のタイトル候補を3つ出してください。\n1. 日本語タイトル\n2. 英語タイトル\n3. 日英ミックスタイトル（例：夜の蝶 / A Love Story）\nそれぞれ1行ずつ、番号付きで出力してください。タイトルの値のみで説明不要。";
    try{let r="";await callAI(sys,[{role:"user",content:"以下の歌詞のタイトル候補を出してください。\n\n"+lyric}],function(res){r=res;});setTitleParsed(parseTitles(r));}
    catch(e){setTitleParsed([{label:"エラー",value:e instanceof Error?e.message:String(e)}]);}
    setLoading("");
  }
  async function doHira(){
    if(!lyric){alert("先に歌詞を生成してください");return;}
    setLoading("hira");setHira("");
    const sys="あなたはプロの作詞家です。歌詞の中で音楽生成AIが読み間違いしやすい漢字をひらがなに変換してください。\n絶対ルール：音数（モーラ数）が変わらないように変換する・変換後の歌詞全体を先に出力する・前置き・説明は禁止・歌詞出力後に「---変換箇所---」と書いて変換した箇所のリストを添える";
    try{await callAI(sys,[{role:"user",content:lyric}],function(r){setHira(r);},2000);}catch(e){setHira("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doPrompt(){
    setLoading("prompt");setPromptOut("");setPromptDiag("");
    const g=getGenre();const kws=buildPromptKw();
    const userMsg="以下の情報から"+g.name+"の最高の音楽生成AIプロンプトを英語で生成してください。\n\n【素材の要約】\n"+buildMaterial()+"【制作設定】\n"+buildSettings()+"\n【使用するキーワード（必ず含める）】\n"+kws+"\n\nまた、この素材に合う他のジャンルも2〜3個提案があれば、プロンプトの後に「---ジャンル提案---」として1行ずつ記載してください。";
    try{await callAI(buildPromptSys(),[{role:"user",content:userMsg}],function(r){setPromptOut(r);});}catch(e){setPromptOut("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doPromptDiag(){
    const prompt=getPromptOnly();if(!prompt||prompt.startsWith("エラー")){alert("先にプロンプトを生成してください");return;}
    setLoading("promptDiag");setPromptDiag("");
    try{await callAI(buildPromptDiagSys(buildSettings()),[{role:"user",content:prompt}],function(r){setPromptDiag(r);},1500);}
    catch(e){setPromptDiag("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doPromptFix(instruction:string){
    const prompt=getPromptOnly();if(!prompt)return;
    setLoading("promptFix");setPromptOut("");
    const sys=buildPromptSys()+"\n修正後はプロンプトのみを出力する。説明禁止。";
    try{await callAI(sys,[{role:"user",content:"以下の音楽生成AIプロンプトを修正してください。\n\n"+prompt+"\n\n指示："+instruction}],function(r){setPromptOut(r);});}
    catch(e){setPromptOut("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doClipPrompt(){
    if(!promptOut||promptOut.startsWith("エラー")){alert("先にプロンプトを生成してください");return;}
    setLoading("clip");setClipPrompt("");
    const secLabel=clipSec?clipSec+"秒クリップ":"クリップ（秒数AIにおまかせ）";
    const ep=getEnabledParts();
    const sectionLabel=clipSection===0?"AIにおまかせ（最もフックになる部分）":(ep[clipSection-1]||"AIにおまかせ");
    const sys=buildPromptSys()+"\nクリップ用の音楽生成AIプロンプトを生成する。1000文字以内。プロンプトのみ出力。";
    const userMsg="以下の音楽生成AIプロンプトをベースに、クリップ用プロンプトを生成してください。\n\n【ベースプロンプト】\n"+getPromptOnly()+"\n\n【クリップ設定】\n秒数："+secLabel+"\n使用する部分："+sectionLabel+"\n\nクリップ用のキーワード（short clip, highlight, hook section）を追加してください。";
    try{await callAI(sys,[{role:"user",content:userMsg}],function(r){setClipPrompt(r);});}catch(e){setClipPrompt("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  async function doWorldCard(){
    const mat=buildMaterial();if(!mat.trim()){alert("先にCREATEタブで素材を入力してください");return;}
    if(!lyric){alert("先に歌詞を生成してください");return;}
    setLoading("world");setWorldCard("");
    const titleLine=(titleMode==="custom"?customTitle:selectedTitle)||"（未設定）";
    const sys="あなたはプロのアートディレクター兼作詞家です。曲の世界観を、画像・映像制作にそのまま使える形で言語化します。\n出力形式（この形式のみ・前置きや説明は禁止）：\n\nタイトル：（曲のタイトル）\n\nテーマ：\n（曲の核心を2行以内で）\n\n感情・雰囲気：\n（・区切りで5個程度）\n\n色調イメージ：\n（・区切りで具体的な色や光の情景を5個程度）\n\nシーンイメージ：\n（・区切りで映像に使える場面を5個程度）\n\nキーワード（英語）：\n（画像・映像生成にそのまま使える英語キーワードをカンマ区切りで10〜15個）";
    const userMsg="以下の素材・歌詞・設定から曲の世界観カードを作成してください。\n\n【タイトル】\n"+titleLine+"\n\n【素材】\n"+mat+"\n【制作設定】\n"+buildSettings()+"\n【歌詞】\n"+lyric;
    try{await callAI(sys,[{role:"user",content:userMsg}],function(r){setWorldCard(r);},2000);}catch(e){setWorldCard("エラー: "+(e instanceof Error?e.message:String(e)));}
    setLoading("");
  }
  function insertPattern(text:string,num:string){setChatInput(text);setInsertOk(num);setTimeout(function(){setInsertOk(null);},2000);setTab("generate");}
  function saveProject(){
    if(!pkey.trim()){setPst("err:プロジェクト名を入力してください");return;}
    const data=JSON.stringify({F,endings,genreMode,selectedGenres,customGenreName,customGenreKw,customGenreStyle,vocalGender,langRatio,vocalTexture,vocalRange,vocalOrigin,chordProg,bpm,targetAges,targetGender,metaphor,dual,structMode,parts,selKw,extraKw});
    try{localStorage.setItem("mylyric:"+pkey.trim(),data);setPst("ok:「"+pkey.trim()+"」を保存しました");}
    catch(e){setPst("err:保存に失敗しました");}
  }
  function loadProject(){
    if(!pkey.trim()){setPst("err:プロジェクト名を入力してください");return;}
    try{
      const raw=localStorage.getItem("mylyric:"+pkey.trim());
      if(!raw){setPst("err:プロジェクトが見つかりません");return;}
      const d=JSON.parse(raw) as Partial<{F:typeof initF;endings:string[];genreMode:string;selectedGenres:string[];customGenreName:string;customGenreKw:string;customGenreStyle:string;vocalGender:number;langRatio:number;vocalTexture:number|null;vocalRange:number|null;vocalOrigin:number|null;chordProg:number|null;bpm:number|null;targetAges:number[];targetGender:number|null;metaphor:number;dual:number;structMode:string;parts:Part[];selKw:string[];extraKw:string;}>;
      if(d.F)setF(d.F);if(d.endings)setEndings(d.endings);if(d.genreMode)setGenreMode(d.genreMode);if(d.selectedGenres)setSelectedGenres(d.selectedGenres);
      if(d.customGenreName)setCustomGenreName(d.customGenreName);if(d.customGenreKw)setCustomGenreKw(d.customGenreKw);if(d.customGenreStyle)setCustomGenreStyle(d.customGenreStyle);
      if(d.vocalGender!==undefined)setVocalGender(d.vocalGender);if(d.langRatio!==undefined)setLangRatio(d.langRatio);
      if(d.vocalTexture!==undefined)setVocalTexture(d.vocalTexture);if(d.vocalRange!==undefined)setVocalRange(d.vocalRange);
      if(d.vocalOrigin!==undefined)setVocalOrigin(d.vocalOrigin);if(d.chordProg!==undefined)setChordProg(d.chordProg);
      if(d.bpm!==undefined)setBpm(d.bpm);if(d.targetAges)setTargetAges(d.targetAges);
      if(d.targetGender!==undefined)setTargetGender(d.targetGender);if(d.metaphor!==undefined)setMetaphor(d.metaphor);
      if(d.dual!==undefined)setDual(d.dual);if(d.structMode)setStructMode(d.structMode);
      if(d.parts)setParts(d.parts);if(d.selKw)setSelKw(d.selKw);if(d.extraKw)setExtraKw(d.extraKw);
      setPst("ok:「"+pkey.trim()+"」を読み込みました");
    }catch(e){setPst("err:読み込みに失敗しました");}
  }
  const psClass=pst.startsWith("ok:")?"ok":"err";
  function Seg(props:{opts:string[];val:number;onChange:(i:number)=>void}){return (<div className="t-seg">{props.opts.map(function(o,i){return <div key={i} className={"t-seg-o"+(props.val===i?" on":"")} onClick={function(){props.onChange(i);}}>{o}</div>;})}</div>);}
  function NullSeg(props:{opts:string[];val:number|null;onChange:(i:number|null)=>void}){return (<div className="t-seg">{props.opts.map(function(o,i){return <div key={i} className={"t-seg-o"+(props.val===i?" on":"")} onClick={function(){props.onChange(props.val===i?null:i);}}>{o}</div>;})}</div>);}
  function Badge(props:{type:"req"|"rec"|"opt"}){const map:{[k:string]:string}={req:"必須",rec:"★ 推奨",opt:"任意"};return <span className={"t-badge "+props.type}>{map[props.type]}</span>;}
  const LAYERS:Layer[]=[
    {n:"LAYER 01",t:"事実を出す",h:"何があったか",qs:[
      {l:"Q01",t:"この曲にしたい出来事を、一言で言うと？",n:"例：ずっと好きだった人に、結局気持ちを伝えられなかった話",k:"q01",r:2,badge:"req",bn:"テーマの軸。なければ歌詞の方向が定まらない。"},
      {l:"Q02",t:"登場人物は誰？自分との関係性は？",n:"例：幼なじみ、ずっと片思いしていた同級生",k:"q02",r:3,badge:"rec",bn:"関係性が明確だと感情の対比が生まれ、歌詞の深みが増す。"},
      {l:"Q03",t:"何があったか、時系列で箇条書きにすると？",n:"順番通りじゃなくてもいい",k:"q03",r:6,badge:"rec",bn:"ストーリーの骨格。Verse 1・2の流れに直接反映される。"},
    ]},
    {n:"LAYER 02",t:"場面の細部を出す",h:"具体的エピソード",qs:[
      {l:"Q04",t:"一番鮮明に覚えてる場面は？",n:"例：テーブルに置いてあった「食べてね」のメモ",k:"q04",r:3,badge:"rec",bn:"具体的な場面が歌詞のリアリティを大きく上げる。"},
      {l:"Q05",t:"そのとき届いた言葉・メッセージ・手紙は？",n:"例：「今から帰るね」というLINE",k:"q05",r:3,badge:"opt",bn:"あれば歌詞に直接使える素材になる。"},
      {l:"Q06",t:"2人だけが知ってる習慣・場所・もの・言葉は？",n:"例：パジャマ姿で甘えてくる / 夏の夜にバイクで走った",k:"q06",r:3,badge:"rec",bn:"他人には書けない細部がここから生まれる。歌詞の解像度を決める。"},
      {l:"Q07",t:"「あのとき言えなかった」言葉はある？",n:"",k:"q07",r:2,badge:"opt",bn:"あればBridgeやOutroの核心になる。"},
    ]},
    {n:"LAYER 03",t:"感情を出す",h:"矛盾してていい",qs:[
      {l:"Q08",t:"表向きに感じてたことは？",n:"例：当たり前になってた / 逃げたかった",k:"q08",r:2,badge:"opt",bn:"感情の表層。Verse 1〜2の入口になる。"},
      {l:"Q09",t:"本当は何を感じてた？",n:"例：怖かっただけ / 甘えてたのは自分の方だった",k:"q09",r:3,badge:"rec",bn:"本音の感情がサビとBridgeの核心になる。矛盾してて正解。"},
      {l:"Q10",t:"今でも続いてる感情は？",n:"後悔・未練・感謝・怒り・安堵…",k:"q10",r:2,badge:"opt",bn:"Outroの余韻に使える。"},
      {l:"Q11",t:"相手への気持ちを正直に一言で言うと？",n:"うまい言葉じゃなくていい",k:"q11",r:2,badge:"opt",bn:"あればLast Chorusの締めに反映できる。"},
    ]},
  ];

  return (
    <div>
      <style>{S}</style>
      <div className="t">
        <div className="t-bg"></div>
        <div className="t-w">

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

          {tab==="create"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Song Creation — MY LYRIC</div><h1 className="t-h1">感情を<em>曲に</em>する<br/>テンプレート</h1><p className="t-sub">素材を入力して設定を選ぶ。GENERATEタブで歌詞・プロンプトを生成。</p></div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">PROJECT</span><span className="t-st">保存・共有</span></div>
                <div className="t-sb">
                  <div className="t-info"><strong>プロジェクト名</strong>を決めてSAVEすると保存される。相手が同じ名前でLOADすれば入力内容を丸ごと共有できる。</div>
                  <div className="t-sr"><input type="text" placeholder="プロジェクト名（例：夜の蝶）" value={pkey} onChange={function(e){setPkey(e.target.value);}}/><button className="t-btn t-btn-g" onClick={saveProject}>SAVE</button><button className="t-btn t-btn-gh" onClick={loadProject}>LOAD</button></div>
                  {pst.replace(/^(ok:|err:)/,"")&&<div className={"t-stb "+psClass}>{pst.replace(/^(ok:|err:)/,"")}</div>}
                </div>
              </div>

              {LAYERS.map(function(sec){return (
                <div className="t-s" key={sec.n}>
                  <div className="t-sh"><span className="t-sn">{sec.n}</span><span className="t-st">{sec.t}</span><span className="t-sh2">{sec.h}</span></div>
                  <div className="t-sb">{sec.qs.map(function(q,i){return (
                    <div key={q.k}>{i>0&&<div className="t-div"></div>}
                      <div className="t-q">
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">{q.l}</div><Badge type={q.badge}/></div>
                        <div className="t-badge-note">{q.bn}</div>
                        <div className="t-qt">{q.t}{q.n&&<span className={"t-qn"+(q.badge==="req"?" star":"")}>{q.n}</span>}</div>
                        <textarea rows={q.r} placeholder="ここに書く" value={(F as Record<string,string>)[q.k]} onChange={sf(q.k)}/>
                      </div>
                    </div>
                  );})}</div>
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
                  <div className="t-badge-note">着地点が決まると歌詞全体の構成が定まる。最低1つ選ぶ。</div>
                  <div className="t-chips">{ENDINGS.map(function(e){return <div key={e} className={"t-chip"+(endings.includes(e)?" on":"")} onClick={function(){togE(e);}}><div className="t-dot"></div>{e}</div>;})}</div>
                  <textarea rows={2} placeholder={"もう少し詳しく（任意）\n例：追ってくる彼女を振り切った感じで終わりたい"} value={F.endingDetail} onChange={sf("endingDetail")}/>
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">SETTINGS</span><span className="t-st">制作設定</span><span className="t-sh2">全て歌詞・プロンプトに反映</span></div>
                <div className="t-sb">
                  <div className="t-q">
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ジャンル</div><Badge type="opt"/></div>
                    <div className="t-badge-note">わからなければ「AIにおまかせ」でOK。素材から最適なジャンルをAIが判断する。複数選ぶと主従で掛け合わせる。</div>
                    <div className="t-sm">
                      <div className={"t-sm-o"+(genreMode==="auto"?" on":"")} onClick={function(){setGenreMode("auto");}}>AIにおまかせ</div>
                      <div className={"t-sm-o"+(genreMode==="select"?" on":"")} onClick={function(){setGenreMode("select");}}>選んで決める</div>
                      <div className={"t-sm-o"+(genreMode==="custom"?" on":"")} onClick={function(){setGenreMode("custom");}}>カスタム入力</div>
                    </div>

                    {genreMode==="auto"&&(
                      <div className="t-info">素材の感情と内容から、AIが最適なジャンルを判断して歌詞・プロンプトを生成する。STEP 5で他のジャンル候補も提案される。</div>
                    )}

                    {genreMode==="select"&&(
                      <div>
                        {selectedGenres.length>0&&(
                          <div style={{marginBottom:"10px"}}>
                            <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>選択中（上が主・下が従・↑↓で入れ替え）</div>
                            {selectedGenres.map(function(id,i){
                              const g=GENRES.find(function(x){return x.id===id;}) as Genre|undefined;
                              return (
                                <div key={id} className="t-part-item">
                                  <span className="t-part-name">{i===0?"★主 ":"　従 "}{g?g.name:id}</span>
                                  <button className="t-part-arrow" onClick={function(){moveGenre(i,-1);}} disabled={i===0}>↑</button>
                                  <button className="t-part-arrow" onClick={function(){moveGenre(i,1);}} disabled={i===selectedGenres.length-1}>↓</button>
                                  <button className="t-part-toggle off" onClick={function(){toggleGenre(id);}}>外す</button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"6px",letterSpacing:".05em"}}>ジャンルを選ぶ（最大3つ・選んだ順に主従が決まる）</div>
                        <div className="t-genre-grid">
                          {GENRES.filter(function(g){return g.id!=="custom";}).map(function(g){
                            return <button key={g.id} className={"t-genre-btn"+(selectedGenres.includes(g.id)?" on":"")} onClick={function(){toggleGenre(g.id);}}>{g.name}</button>;
                          })}
                        </div>
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
                    <div className="t-badge-note">歌詞と音楽生成AIプロンプト両方に反映される。全英詞は海外系ボーカルと組み合わせると効果的。</div>
                    <Seg opts={LANG_RATIO_OPTS} val={langRatio} onChange={function(i:number){setLangRatio(i);}}/>
                  </div>
                  <div className="t-div"></div>
                  <button className="t-adv" onClick={function(){setShowAdv(!showAdv);}}>
                    <span className="t-adv-arr">{showAdv?"▲":"▼"}</span>
                    <span>{showAdv?"詳細設定を閉じる":"詳細設定を開く（任意・こだわりたい人向け）"}</span>
                  </button>
                  {showAdv&&(
                    <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
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
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">声の雰囲気</div><Badge type="opt"/></div><div className="t-badge-note">タップで選択・もう一度タップで解除。選ばなければAIが判断。</div><NullSeg opts={VOCAL_TEXTURE_OPTS} val={vocalTexture} onChange={nullTog(vocalTexture,setVocalTexture)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">声域</div><Badge type="opt"/></div><div className="t-badge-note">選ばなければAIが判断。</div><NullSeg opts={VOCAL_RANGE_OPTS} val={vocalRange} onChange={nullTog(vocalRange,setVocalRange)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ボーカリスト系統</div><Badge type="opt"/></div><div className="t-badge-note">全英詞の場合は「海外系」を選ぶと自然になりやすい。</div><NullSeg opts={VOCAL_ORIGIN_OPTS} val={vocalOrigin} onChange={nullTog(vocalOrigin,setVocalOrigin)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">コード進行</div><Badge type="opt"/></div><div className="t-badge-note">曲の感情的な雰囲気を決める。音楽生成AIプロンプトに反映される。</div><NullSeg opts={CHORD_OPTS} val={chordProg} onChange={nullTog(chordProg,setChordProg)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">BPM・テンポ</div><Badge type="opt"/></div><div className="t-badge-note">音楽生成AIプロンプトに反映される。選ばなければAIが判断。</div><NullSeg opts={BPM_OPTS} val={bpm} onChange={nullTog(bpm,setBpm)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ターゲット年齢層</div><Badge type="opt"/></div><div className="t-badge-note">複数選択可。言葉の温度感・語感に影響する。</div><div className="t-chips">{AGE_OPTS.map(function(a,i){return <div key={i} className={"t-chip"+(targetAges.includes(i)?" on":"")} onClick={function(){togAge(i);}}><div className="t-dot"></div>{a}</div>;})}</div></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">ターゲット性別</div><Badge type="opt"/></div><div className="t-badge-note">歌詞の語感・視点に影響する。</div><NullSeg opts={TARGET_GENDER_OPTS} val={targetGender} onChange={nullTog(targetGender,setTargetGender)}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">比喩・匂わせのレベル</div><Badge type="opt"/></div><div className="t-badge-note">AIにおまかせならジャンルに合わせて判断する。二重構造を使う場合は特に重要。</div><Seg opts={METAPHOR_OPTS} val={metaphor} onChange={function(i:number){setMetaphor(i);}}/></div>
                      <div className="t-div"></div>
                      <div className="t-q"><div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"2px"}}><div className="t-ql">二重構造</div><Badge type="opt"/></div><div className="t-badge-note">特定の相手に届けたい場合にONにする。一般リスナーには別の意味に聴こえる歌詞を設計する。</div><Seg opts={DUAL_OPTS} val={dual} onChange={function(i:number){setDual(i);}}/></div>
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

          {tab==="generate"&&(
            <div>
              <div className="t-hero"><div className="t-eye">AI Generation — MY LYRIC</div><h1 className="t-h1">生成から完成まで<br/><em>アプリ内で完結</em></h1><p className="t-sub">STEP 0〜7をすべてこのタブで行う。外に出る必要なし。</p></div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 0</span><span className="t-st">テーマをAIと確認する</span><span className="t-sh2">精度を上げる最重要ステップ</span></div>
                <div className="t-sb">
                  <div className="t-info">AIが素材を整理して「核心」と「感情の流れ」を確認してくれる。ズレがあれば<strong>CREATEタブで修正</strong>してから歌詞生成に入る。</div>
                  <button className="t-btn t-btn-g" onClick={doConfirm} disabled={!!loading}>{loading==="confirm"?"確認中...":"テーマを確認する"}</button>
                  {(confirmed||loading==="confirm")&&<div className={"t-out"+(confirmed?" lit":"")} style={{minHeight:"60px"}}>{confirmed||"確認中..."}</div>}
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 1</span><span className="t-st">歌詞を生成する</span><span className="t-sh2">全設定が反映される</span></div>
                <div className="t-sb">
                  <button className="t-btn t-btn-g" onClick={doLyric} disabled={!!loading}>{loading==="lyric"?"生成中...":"GENERATE LYRIC"}</button>
                  {(lyric||loading==="lyric")&&(
                    <div>
                      <textarea readOnly value={lyric||(loading==="lyric"?"生成中...":"")} style={{minHeight:"280px",maxHeight:"400px",background:"rgba(200,80,192,0.04)",borderColor:"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",marginBottom:"8px"}}/>
                      {lyric&&<button className={"t-btn "+(copyOk==="lyric"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(lyric,"lyric");}}>{copyLabel("lyric","通常の歌詞をコピーする（漢字あり）")}</button>}
                    </div>
                  )}
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 2</span><span className="t-st">歌詞の修正・最終チェック</span><span className="t-sh2">2段階チェック<br/>歌詞のみ変更</span></div>
                <div className="t-sb">
                  {!lyric?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成すると修正チャットが使えます。</div>
                  ):(
                    <div>
                      <div className="t-info" style={{marginBottom:"10px"}}><strong>STAGE 1</strong>：診断ボタンを押すと問題点のみをリストアップする（修正しない）<br/><strong>STAGE 2</strong>：診断結果を見てチャットで「全て修正して」「〇〇だけ修正して」と指示する</div>
                      <button className="t-btn t-btn-g" onClick={doLyricDiag} disabled={!!loading} style={{width:"100%",padding:"12px",marginBottom:"10px"}}>{loading==="lyricDiag"?"診断中...":"STAGE 1：歌詞を診断する（修正なし）"}</button>
                      {lyricDiagnosis&&<div className="t-out diag" style={{maxHeight:"280px",marginBottom:"10px"}}>{lyricDiagnosis}</div>}
                      <div className="t-div" style={{marginBottom:"10px"}}></div>
                      <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"8px",letterSpacing:".05em"}}>STAGE 2：修正の指示を入力する</div>
                      <div className="t-chat">
                        <div className="t-chat-msgs">
                          {chatDisplay.length===0&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>診断後「全て修正して」または「〇〇だけ修正して」と入力してください。<br/>REVISEタブのINSERTでテンプレートを挿入できます。</div>}
                          {chatDisplay.map(function(m,i){return <div key={i} className={"t-msg "+(m.role==="user"?"u":"a")}><div className="t-msg-who">{m.role==="user"?"YOU":"MY LYRIC AI"}</div><div className="t-msg-body">{m.content}</div></div>;})}
                          <div ref={chatEndRef}></div>
                        </div>
                        <div className="t-chat-in">
                          <textarea rows={2} placeholder="修正の指示を入力（Enterで送信）" value={chatInput} onChange={function(e){setChatInput(e.target.value);}} onKeyDown={handleKey}/>
                          <button className="t-chat-send" onClick={sendChat} disabled={loading==="chat"||!chatInput.trim()}>SEND</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 3</span><span className="t-st">タイトルを決める</span><span className="t-sh2">選択・再提案・自作</span></div>
                <div className="t-sb">
                  {!lyric?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成するとタイトル生成が使えます。</div>
                  ):(
                    <div>
                      <div className="t-br" style={{marginBottom:"12px"}}>
                        <button className="t-btn t-btn-g" onClick={doTitle} disabled={!!loading}>{loading==="title"?"生成中...":"GENERATE TITLE"}</button>
                        {titleParsed.length>0&&<button className="t-btn t-btn-gh" onClick={doTitle} disabled={!!loading}>新しい提案をお願いする</button>}
                      </div>
                      {titleMode==="generated"&&titleParsed.length>0&&(
                        <div>
                          <div style={{fontSize:"10px",color:"var(--txd)",marginBottom:"8px",letterSpacing:".05em"}}>タイトルを選んでコピーする（気に入らない場合は再提案または自作）</div>
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

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 4</span><span className="t-st">ひらがな変換</span><span className="t-sh2">読み間違い防止<br/>音数は変えない</span></div>
                <div className="t-sb">
                  {!lyric?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成するとひらがな変換が使えます。</div>
                  ):(
                    <div>
                      <div className="t-info" style={{marginBottom:"8px"}}>音楽生成AIが読み間違いやすい漢字をひらがなに変換する。海外製のAIは特に読み間違いが多いのでどのツールでも有効。<strong>音数は変わらない</strong>ように処理される。</div>
                      <button className="t-btn t-btn-g" onClick={doHira} disabled={!!loading} style={{marginBottom:"8px"}}>{loading==="hira"?"変換中...":"ひらがな変換"}</button>
                      {hira&&(
                        <div>
                          <textarea readOnly value={extractHira(hira)} style={{minHeight:"200px",maxHeight:"280px",background:"rgba(200,80,192,0.04)",borderColor:"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",marginBottom:"8px"}}/>
                          <button className={"t-btn "+(copyOk==="hira"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(extractHira(hira),"hira");}}>{copyLabel("hira","ひらがな変換済み歌詞をコピーする")}</button>
                        </div>
                      )}
                      {loading==="hira"&&<div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>変換中...</div>}
                    </div>
                  )}
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 5</span><span className="t-st">音楽生成AIプロンプトを生成する</span><span className="t-sh2">ジャンル提案も同時出力<br/>最大1000文字</span></div>
                <div className="t-sb">
                  <div className="t-info">設定したジャンル・ボーカル・言語・全設定が自動反映される。素材に合う他のジャンル提案も同時に出力される。</div>
                  <div className="t-br" style={{marginBottom:"8px"}}>
                    <button className="t-btn t-btn-g" onClick={doPrompt} disabled={!!loading}>{loading==="prompt"?"生成中...":"GENERATE PROMPT"}</button>
                    {promptOut&&!promptOut.startsWith("エラー")&&<span style={{fontSize:"10px",fontFamily:"'Space Grotesk',sans-serif",color:getPromptOnly().length>1000?"var(--rd)":"var(--gr)"}}>{getPromptOnly().length}/1000文字</span>}
                  </div>
                  {(promptOut||loading==="prompt")&&(
                    <div>
                      <textarea readOnly value={getPromptOnly()||(loading==="prompt"?"生成中...":"")} style={{minHeight:"140px",maxHeight:"220px",background:"rgba(200,80,192,0.04)",borderColor:getPromptOnly().length>1000?"rgba(224,85,85,0.4)":"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",fontFamily:"'Space Grotesk',sans-serif",fontSize:"11px",marginBottom:"8px"}}/>
                      {promptOut&&!promptOut.startsWith("エラー")&&<button className={"t-btn "+(copyOk==="prompt"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(getPromptOnly(),"prompt");}}>{copyLabel("prompt","音楽生成AIプロンプトをコピーする")}</button>}
                      {getGenreSuggestion()&&<div className="t-out" style={{marginTop:"8px",fontSize:"11px",borderColor:"rgba(200,80,192,.15)"}}>{getGenreSuggestion()}</div>}
                    </div>
                  )}
                </div>
              </div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">STEP 6</span><span className="t-st">プロンプト最終チェック・クリップ設定</span><span className="t-sh2">任意</span></div>
                <div className="t-sb">
                  <div className="t-step-label">PROMPT FINAL CHECK</div>
                  <div className="t-info"><strong>STAGE 1</strong>：診断ボタンを押すと問題点のみをリストアップする（修正しない）<br/><strong>STAGE 2</strong>：診断結果を見てボタンで修正を指示する</div>
                  <button className="t-btn t-btn-g" onClick={doPromptDiag} disabled={!!loading||!promptOut||promptOut.startsWith("エラー")} style={{width:"100%",padding:"12px"}}>{loading==="promptDiag"?"診断中...":"STAGE 1：プロンプトを診断する（修正なし）"}</button>
                  {promptDiag&&(
                    <div>
                      <div className="t-out diag" style={{maxHeight:"240px",marginBottom:"8px"}}>{promptDiag}</div>
                      <div className="t-br">
                        <button className="t-btn t-btn-g" onClick={function(){doPromptFix("診断レポートで指摘された問題を全て修正してください");}} disabled={!!loading} style={{flex:1,padding:"11px"}}>{loading==="promptFix"?"修正中...":"全て修正する"}</button>
                        <button className="t-btn t-btn-gh" onClick={function(){var inst=window.prompt("修正する項目を入力してください（例：1000文字以内に収めて）");if(inst)doPromptFix(inst);}} disabled={!!loading}>指定して修正</button>
                      </div>
                      {promptOut&&!promptOut.startsWith("エラー")&&<button className={"t-btn "+(copyOk==="prompt2"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px",marginTop:"8px"}} onClick={function(){doCopy(getPromptOnly(),"prompt2");}}>{copyLabel("prompt2","修正済みプロンプトをコピーする")}</button>}
                    </div>
                  )}
                  <div className="t-div"></div>
                  <div className="t-step-label">CLIP SETTINGS（任意）</div>
                  <div className="t-info">SNS・ショート動画向けのクリップ用プロンプトを別途生成できる。通常のプロンプトとは独立して出力される。</div>
                  <div className="t-q">
                    <div className="t-ql" style={{marginBottom:"6px"}}>秒数</div>
                    <div className="t-chips">
                      <div className={"t-chip"+(clipSec===null?" on":"")} onClick={function(){setClipSec(null);}}><div className="t-dot"></div>AIにおまかせ</div>
                      {CLIP_SECS.map(function(s){return <div key={s} className={"t-chip"+(clipSec===s?" on":"")} onClick={function(){setClipSec(s);}}><div className="t-dot"></div>{s}秒</div>;})}
                    </div>
                  </div>
                  <div className="t-q">
                    <div className="t-ql" style={{marginBottom:"6px"}}>使用する部分</div>
                    <div className="t-chips">
                      <div className={"t-chip"+(clipSection===0?" on":"")} onClick={function(){setClipSection(0);}}><div className="t-dot"></div>AIにおまかせ</div>
                      {getEnabledParts().map(function(tag,i){return <div key={i} className={"t-chip"+(clipSection===i+1?" on":"")} onClick={function(){setClipSection(i+1);}}><div className="t-dot"></div>{tag}</div>;})}
                    </div>
                  </div>
                  <button className="t-btn t-btn-g" onClick={doClipPrompt} disabled={!!loading||!promptOut||promptOut.startsWith("エラー")} style={{width:"100%",padding:"11px"}}>{loading==="clip"?"生成中...":"クリップ用プロンプトを生成する"}</button>
                  {clipPrompt&&(
                    <div>
                      <textarea readOnly value={clipPrompt} style={{minHeight:"120px",maxHeight:"200px",background:"rgba(200,80,192,0.04)",borderColor:"rgba(200,80,192,0.2)",color:"var(--tx)",cursor:"text",fontFamily:"'Space Grotesk',sans-serif",fontSize:"11px",marginBottom:"8px"}}/>
                      <button className={"t-btn "+(copyOk==="clip"?"t-btn-ok":"t-btn-g")} style={{width:"100%",padding:"12px"}} onClick={function(){doCopy(clipPrompt,"clip");}}>{copyLabel("clip","クリップ用プロンプトをコピーする")}</button>
                    </div>
                  )}
                </div>
              </div>

              {/* STEP 7 世界観カード */}
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
                  {!lyric?(
                    <div style={{fontSize:"11px",color:"var(--txd)",fontStyle:"italic"}}>STEP 1で歌詞を生成すると世界観カードが作れます。</div>
                  ):(
                    <div>
                      <button className="t-btn t-btn-g" onClick={doWorldCard} disabled={!!loading} style={{marginBottom:"8px"}}>{loading==="world"?"生成中...":"世界観カードを生成する"}</button>
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

              {["STEP 0でテーマ確認→STEP 1で歌詞生成→STEP 2で2段階チェック・修正→STEP 3タイトル→STEP 4ひらがな変換→STEP 5プロンプト生成→STEP 6最終チェック・クリップ設定→STEP 7世界観カード。","歌詞とプロンプトのチェックは完全に独立。互いに影響しない。","世界観カードはChatGPT・Claude・Geminiに貼り付けて画像・映像プロンプトの作成に使える。"].map(function(t,i){
                return <div key={i} className="t-tip"><span className="t-tip-m">—</span><span>{t}</span></div>;
              })}
            </div>
          )}

          {tab==="keywords"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Extra Keywords — MY LYRIC</div><h1 className="t-h1">追加キーワードで<br/><em>絞り込む</em></h1><p className="t-sub">CREATEのSETTINGSとジャンルの内容はすでにプロンプトに反映されている。ここで追加したいキーワードを選ぶ。どの音楽生成AIでも使える汎用キーワード。</p></div>
              <div className="t-s">
                <div className="t-sh"><span className="t-sn">EXTRA KEYWORDS</span><span className="t-st">追加キーワード</span><span className="t-sh2">{selKw.length}語選択中</span></div>
                <div className="t-sb">
                  {Object.entries(EXTRA_KW).map(function(entry){return (
                    <div className="t-kw-s" key={entry[0]}>
                      <div className="t-kw-t">{entry[0]}</div>
                      <div className="t-kw-g">{entry[1].map(function(k){return <div key={k} className={"t-kw"+(selKw.includes(k)?" on":"")} onClick={function(){togKw(k);}}>{k}</div>;})}</div>
                    </div>
                  );})}
                  <div className="t-div"></div>
                  <div className="t-q"><div className="t-ql">自由入力</div><textarea rows={2} placeholder="自由に追加したいキーワードを入力（英語・カンマ区切り）" value={extraKw} onChange={function(e){setExtraKw(e.target.value);}}/></div>
                  <button className="t-btn t-btn-g" onClick={function(){setTab("generate");}}>→ GENERATEで使う</button>
                </div>
              </div>
            </div>
          )}

          {tab==="revise"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Revision Guide — MY LYRIC</div><h1 className="t-h1">修正の<em>伝え方</em></h1><p className="t-sub">INSERTを押すとGENERATEタブのチャットにテンプレートが入力される。</p></div>
              {REVISE_PATTERNS.map(function(p){return (
                <div className="t-pat" key={p.num}>
                  <div className="t-pat-h"><span className="t-pat-n">PATTERN {p.num}</span><span className="t-pat-t">{p.title}</span></div>
                  <div className="t-pat-b">{p.desc}<div className="t-pat-ex">{p.ex}</div><button className="t-pat-ins" onClick={function(){insertPattern(p.qi,p.num);}}>INSERT →</button>{insertOk===p.num&&<span className="t-ins-ok">✓ チャットに挿入しました</span>}</div>
                </div>
              );})}
            </div>
          )}

          {tab==="check"&&(
            <div>
              <div className="t-hero"><div className="t-eye">Checklist & Guide — MY LYRIC</div><h1 className="t-h1">完成度チェック<br/><em>＆ ガイド</em></h1><p className="t-sub">制作前後のチェックリストとアプリの使い方ガイド。</p></div>

              <div className="t-s">
                <div className="t-sh"><span className="t-sn">GUIDE</span><span className="t-st">使い方ガイド</span></div>
                <div className="t-sb" style={{gap:"0",padding:"8px 16px"}}>
                  {[
                    {h:"必須とは",t:"最低限必要な情報。これがないとAIが方向性を決められない。必ず入力してから生成に進む。\n対象：Q01（テーマ）・Q12（核心の一文）・ENDING（終わり方）・ボーカル性別"},
                    {h:"推奨とは",t:"あるとクオリティが大きく上がる項目。できるだけ入力することを強くすすめる。入れるほど歌詞の精度が上がる。\n対象：Q02・Q03・Q04・Q06・Q09・言語の割合"},
                    {h:"任意とは",t:"個性や方向性をさらに絞り込む項目。こだわりたい人が使う。選ばなければAIが補完する。\n対象：Q05・Q07・Q08・Q10・Q11・詳細設定の全項目"},
                    {h:"制作フロー",t:"STEP 0: テーマをAIと確認（ズレがないか）\nSTEP 1: 歌詞を生成\nSTEP 2: 2段階チェック（STAGE 1診断→STAGE 2修正）\nSTEP 3: タイトルを決める（再提案・自作も可）\nSTEP 4: ひらがな変換\nSTEP 5: 音楽生成AIプロンプトを生成（ジャンル提案も同時出力）\nSTEP 6: プロンプト最終チェック・クリップ設定\nSTEP 7: 曲の世界観カード（画像・映像制作用）"},
                    {h:"2段階チェックについて",t:"STAGE 1では問題点のリストアップのみ行う（修正しない）。診断レポートを見て、全部直すか特定の項目だけ直すかをSTAGE 2で指示する。これにより意図しない変更を防ぐ。"},
                    {h:"ジャンルの決め方",t:"3つのモードがある。\n①AIにおまかせ：素材から最適なジャンルをAIが判断（ジャンルがわからない人はこれ）\n②選んで決める：複数選択可。選んだ順に主従が決まり、掛け合わせて生成する（例：シティポップ主×R&B従）\n③カスタム入力：ジャンル名とキーワードを自由に指定\n選ばなくてもAIにおまかせで生成できる。"},
                    {h:"詳細設定について",t:"CREATEのSETTINGS内「詳細設定を開く」の中にある項目は全て任意。選ばなくてもAIが補完するが、選ぶほど意図に近い出力になる。選んだ内容は歌詞・音楽生成AIプロンプト・最終チェックの全てに反映される。"},
                    {h:"コピーについて",t:"歌詞・音楽生成AIプロンプト・ひらがな変換済み歌詞はそれぞれ専用のコピーボタンがある。コピーしたテキストには余計な説明文は含まれず、そのまま各AIに貼り付けて使える。"},
                    {h:"プロジェクトの共有について",t:"プロジェクト名を相手に教えてLOADしてもらうと入力内容を丸ごと共有できる。共同制作や、作業の続きを別デバイスで行う際に使う。共有には同じプロジェクト名を使う。"},
                  ].map(function(item,i){return (
                    <div key={i} className="t-guide-item"><div className="t-guide-h">{item.h}</div><div className="t-guide-txt">{item.t}</div></div>
                  );})}
                </div>
              </div>

              {([
                {label:"BEFORE",title:"歌詞制作前に確認すること",items:CHECKS_BEFORE,state:cb,set:setCb},
                {label:"AFTER",title:"歌詞制作後に確認すること",items:CHECKS_AFTER,state:ca,set:setCa}
              ] as {label:string;title:string;items:string[];state:boolean[];set:React.Dispatch<React.SetStateAction<boolean[]>>}[]).map(function(section){return (
                <div className="t-s" key={section.label}>
                  <div className="t-sh"><span className="t-sn">{section.label}</span><span className="t-st">{section.title}</span><span className="t-sh2">{section.state.filter(Boolean).length}/{section.items.length}</span></div>
                  <div className="t-sb" style={{gap:"0",padding:"6px 16px"}}>
                    {section.items.map(function(c,i){return (
                      <div key={i} className={"t-ci"+(section.state[i]?" done":"")} onClick={function(){section.set(function(p){return p.map(function(v,j){return j===i?!v:v;});});}}>
                        <div className="t-cb">{section.state[i]&&<span style={{color:"var(--g)",fontSize:"8px"}}>✓</span>}</div>
                        <div className="t-ct">{c}</div>
                      </div>
                    );})}
                  </div>
                </div>
              );})}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
