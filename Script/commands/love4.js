/**
 * ╔══════════════════════════════════════════════╗
 * ║              LOVE4 — STANDALONE              ║
 * ║        Developer: হৃদয় হাসান শান্ত           ║
 * ║              Version: 3.0.0                  ║
 * ╚══════════════════════════════════════════════╝
 *
 * No Rahat API
 * No api.json
 * No external custom API
 */

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "love4",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "💠 হৃদয় হাসান শান্ত",
  description: "Generate Love4 image",
  commandCategory: "Image",
  usages: "[@mention / reply / uid / profile link]",
  cooldowns: 5
};


/* ═══════════════════════════════════════════════
   GET UID FROM @NAME
═══════════════════════════════════════════════ */
async function getUIDByName(api, threadID, text) {
  try {
    if (!text || !text.includes("@")) return null;

    const match = text.match(/@(.+)/);
    if (!match) return null;

    const targetName = match[1]
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    const info = await api.getThreadInfo(threadID);
    const users = info?.userInfo || [];

    const user = users.find(u => {
      if (!u?.name || !u?.id) return false;

      const name = u.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      return name === targetName;
    });

    return user?.id || null;

  } catch (error) {
    return null;
  }
}


/* ═══════════════════════════════════════════════
   ESCAPE SVG TEXT
═══════════════════════════════════════════════ */
function escapeXML(text) {
  return String(text || "Unknown")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}


/* ═══════════════════════════════════════════════
   CREATE LOVE IMAGE
═══════════════════════════════════════════════ */
function createLoveSVG(senderName, targetName) {

  const safeSender = escapeXML(senderName);
  const safeTarget = escapeXML(targetName);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1200"
  height="800"
  viewBox="0 0 1200 800">

  <defs>

    <linearGradient
      id="bg"
      x1="0"
      y1="0"
      x2="1"
      y2="1">

      <stop offset="0%" stop-color="#ff4b6e"/>
      <stop offset="50%" stop-color="#ff758c"/>
      <stop offset="100%" stop-color="#ff9a9e"/>

    </linearGradient>

    <filter id="shadow">

      <feDropShadow
        dx="0"
        dy="10"
        stdDeviation="12"
        flood-opacity="0.25"/>

    </filter>

  </defs>


  <!-- Background -->

  <rect
    width="1200"
    height="800"
    rx="40"
    fill="url(#bg)"/>


  <!-- Decorative hearts -->

  <text
    x="90"
    y="130"
    font-size="75"
    fill="white"
    opacity="0.75">
    ♥
  </text>

  <text
    x="1060"
    y="170"
    font-size="65"
    fill="white"
    opacity="0.70">
    ♥
  </text>

  <text
    x="120"
    y="680"
    font-size="55"
    fill="white"
    opacity="0.65">
    ♥
  </text>

  <text
    x="1040"
    y="680"
    font-size="80"
    fill="white"
    opacity="0.70">
    ♥
  </text>


  <!-- Main Card -->

  <rect
    x="100"
    y="110"
    width="1000"
    height="580"
    rx="45"
    fill="white"
    opacity="0.96"
    filter="url(#shadow)"/>


  <!-- Title -->

  <text
    x="600"
    y="205"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="62"
    font-weight="bold"
    fill="#ff416c">
    LOVE 4
  </text>


  <!-- Heart -->

  <text
    x="600"
    y="395"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="180"
    fill="#ff416c">
    ♥
  </text>


  <!-- Names -->

  <text
    x="600"
    y="505"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="42"
    font-weight="bold"
    fill="#333">
    ${safeSender}
  </text>


  <text
    x="600"
    y="565"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="30"
    fill="#ff416c">
    ♥
  </text>


  <text
    x="600"
    y="625"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="42"
    font-weight="bold"
    fill="#333">
    ${safeTarget}
  </text>


  <!-- Credit -->

  <text
    x="600"
    y="745"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="20"
    fill="white">
    Developer: হৃদয় হাসান শান্ত
  </text>

</svg>`;
}


/* ═══════════════════════════════════════════════
   MAIN COMMAND
═══════════════════════════════════════════════ */
module.exports.run = async function ({
  api,
  event,
  args
}) {

  let outputFile = null;
  let waiting = null;

  try {

    let mention = null;


    /* ─────────────────────────
       REPLY USER
    ───────────────────────── */

    if (
      event.type === "message_reply" &&
      event.messageReply?.senderID
    ) {

      mention = event.messageReply.senderID;
    }


    /* ─────────────────────────
       @MENTION
    ───────────────────────── */

    else if (
      event.mentions &&
      Object.keys(event.mentions).length > 0
    ) {

      mention = Object.keys(event.mentions)[0];
    }


    /* ─────────────────────────
       ARGUMENT
    ───────────────────────── */

    else if (args && args.length > 0) {

      const input = args.join(" ").trim();

      if (
        input.includes("facebook.com/") ||
        input.includes("m.me/")
      ) {

        if (typeof api.getUID === "function") {
          mention = await api.getUID(input);
        }

      } else if (input.includes("@")) {

        mention = await getUIDByName(
          api,
          event.threadID,
          input
        );

      } else {

        mention = input;
      }
    }


    /* ─────────────────────────
       NO USER
    ───────────────────────── */

    if (!mention) {

      return api.sendMessage(
        "❌ একজন user-কে mention অথবা reply করুন।\n\n" +
        "Example: /love4 @User",
        event.threadID,
        event.messageID
      );
    }


    /* ─────────────────────────
       GET USER NAMES
    ───────────────────────── */

    let senderName = "Someone";
    let targetName = "Unknown";

    try {

      const senderInfo =
        await api.getUserInfo(event.senderID);

      senderName =
        senderInfo?.[event.senderID]?.name ||
        "Someone";

    } catch (e) {}


    try {

      const targetInfo =
        await api.getUserInfo(mention);

      targetName =
        targetInfo?.[mention]?.name ||
        "Unknown";

    } catch (e) {}


    /* ─────────────────────────
       WAITING
    ───────────────────────── */

    waiting = await api.sendMessage(
      "💗 Love4 image তৈরি হচ্ছে...\n⏳ Please wait...",
      event.threadID
    );


    /* ─────────────────────────
       CREATE SVG
    ───────────────────────── */

    const svg = createLoveSVG(
      senderName,
      targetName
    );


    outputFile = path.join(
      __dirname,
      `love4_${Date.now()}.svg`
    );


    await fs.writeFile(
      outputFile,
      svg,
      "utf8"
    );


    /* ─────────────────────────
       REMOVE WAITING
    ───────────────────────── */

    if (waiting?.messageID) {

      try {
        await api.unsendMessage(
          waiting.messageID
        );
      } catch (e) {}

    }


    /* ─────────────────────────
       SEND IMAGE
    ───────────────────────── */

    const sent = await api.sendMessage(
      {
        body:
          `💗 LOVE 4 💗\n\n` +
          `👤 ${senderName}\n` +
          `♥️ ${targetName}\n\n` +
          `💠 হৃদয় হাসান শান্ত`,

        mentions: [
          {
            tag: targetName,
            id: mention
          }
        ],

        attachment:
          fs.createReadStream(outputFile)
      },

      event.threadID,
      event.messageID
    );


    /* ─────────────────────────
       CLEANUP
    ───────────────────────── */

    setTimeout(async () => {

      try {

        if (sent?.messageID) {
          await api.unsendMessage(
            sent.messageID
          );
        }

      } catch (e) {}


      try {

        if (
          outputFile &&
          await fs.pathExists(outputFile)
        ) {

          await fs.remove(outputFile);
        }

      } catch (e) {}

    }, 120000);


  } catch (error) {

    console.error(
      "[LOVE4 ERROR]",
      error
    );


    if (waiting?.messageID) {

      try {
        await api.unsendMessage(
          waiting.messageID
        );
      } catch (e) {}

    }


    if (outputFile) {

      try {

        if (
          await fs.pathExists(outputFile)
        ) {

          await fs.remove(outputFile);
        }

      } catch (e) {}

    }


    return api.sendMessage(
      `⚠️ LOVE4 ERROR\n\n${error.message}`,
      event.threadID,
      event.messageID
    );
  }
};
