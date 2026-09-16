/**
 * ╔══════════════════════════════════════════════╗
 * ║              LOVE5 — STANDALONE              ║
 * ║        Developer: হৃদয় হাসান শান্ত           ║
 * ║              Version: 3.0.0                  ║
 * ╚══════════════════════════════════════════════╝
 *
 * No Rahat API
 * No api.json
 * No external custom API
 */

const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "love5",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "💠 হৃদয় হাসান শান্ত",
  description: "Generate Love5 image",
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
   ESCAPE XML
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
   CREATE LOVE5 SVG
═══════════════════════════════════════════════ */
function createLoveSVG(senderName, targetName) {

  const sender = escapeXML(senderName);
  const target = escapeXML(targetName);

  return `<?xml version="1.0" encoding="UTF-8"?>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="1200"
  height="800"
  viewBox="0 0 1200 800">

  <defs>

    <linearGradient
      id="background"
      x1="0"
      y1="0"
      x2="1"
      y2="1">

      <stop
        offset="0%"
        stop-color="#ff416c"/>

      <stop
        offset="50%"
        stop-color="#ff4b2b"/>

      <stop
        offset="100%"
        stop-color="#ff758c"/>

    </linearGradient>

    <filter id="shadow">

      <feDropShadow
        dx="0"
        dy="10"
        stdDeviation="14"
        flood-opacity="0.25"/>

    </filter>

  </defs>


  <!-- Background -->

  <rect
    width="1200"
    height="800"
    rx="45"
    fill="url(#background)"/>


  <!-- Decorative hearts -->

  <text
    x="80"
    y="150"
    font-size="90"
    fill="white"
    opacity="0.65">
    ♥
  </text>

  <text
    x="1060"
    y="150"
    font-size="75"
    fill="white"
    opacity="0.65">
    ♥
  </text>

  <text
    x="85"
    y="690"
    font-size="65"
    fill="white"
    opacity="0.60">
    ♥
  </text>

  <text
    x="1060"
    y="700"
    font-size="90"
    fill="white"
    opacity="0.65">
    ♥
  </text>


  <!-- Main Card -->

  <rect
    x="100"
    y="100"
    width="1000"
    height="600"
    rx="50"
    fill="white"
    filter="url(#shadow)"/>


  <!-- Header -->

  <text
    x="600"
    y="195"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="58"
    font-weight="bold"
    fill="#ff416c">
    LOVE 5
  </text>


  <!-- Subtitle -->

  <text
    x="600"
    y="245"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="25"
    fill="#777">
    Two hearts • One feeling
  </text>


  <!-- Big Heart -->

  <text
    x="600"
    y="440"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="190"
    fill="#ff416c">
    ♥
  </text>


  <!-- Sender -->

  <text
    x="600"
    y="510"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="38"
    font-weight="bold"
    fill="#333">
    ${sender}
  </text>


  <!-- Connection -->

  <text
    x="600"
    y="555"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="25"
    fill="#ff416c">
    ♥  LOVE  ♥
  </text>


  <!-- Target -->

  <text
    x="600"
    y="615"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="38"
    font-weight="bold"
    fill="#333">
    ${target}
  </text>


  <!-- Developer -->

  <text
    x="600"
    y="755"
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

  let waiting = null;
  let outputFile = null;

  try {

    let mention = null;


    /* ─────────────────────────
       REPLY
    ───────────────────────── */

    if (
      event.type === "message_reply" &&
      event.messageReply?.senderID
    ) {

      mention = event.messageReply.senderID;
    }


    /* ─────────────────────────
       DIRECT MENTION
    ───────────────────────── */

    else if (
      event.mentions &&
      Object.keys(event.mentions).length > 0
    ) {

      mention =
        Object.keys(event.mentions)[0];
    }


    /* ─────────────────────────
       ARGUMENT
    ───────────────────────── */

    else if (args?.length) {

      const input =
        args.join(" ").trim();


      /* Facebook profile link */

      if (
        input.includes("facebook.com/") ||
        input.includes("m.me/")
      ) {

        if (
          typeof api.getUID === "function"
        ) {

          mention =
            await api.getUID(input);
        }

      }


      /* @Name */

      else if (input.includes("@")) {

        mention =
          await getUIDByName(
            api,
            event.threadID,
            input
          );
      }


      /* UID */

      else {

        mention = input;
      }
    }


    /* ─────────────────────────
       CHECK USER
    ───────────────────────── */

    if (!mention) {

      return api.sendMessage(
        "❌ একজন user-কে mention/reply করুন।\n\n" +
        "Example:\n" +
        "/love5 @User",
        event.threadID,
        event.messageID
      );
    }


    /* ─────────────────────────
       GET NAMES
    ───────────────────────── */

    let senderName = "Someone";
    let targetName = "Unknown";


    try {

      const senderInfo =
        await api.getUserInfo(
          event.senderID
        );

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

    waiting =
      await api.sendMessage(
        "⏳ Love5 image তৈরি হচ্ছে...\n" +
        "❤️ Please wait...",
        event.threadID
      );


    /* ─────────────────────────
       CREATE IMAGE
    ───────────────────────── */

    const svg =
      createLoveSVG(
        senderName,
        targetName
      );


    outputFile = path.join(
      __dirname,
      `love5_${Date.now()}.svg`
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
       SEND RESULT
    ───────────────────────── */

    const sent =
      await api.sendMessage(
        {
          body:
            `❤️ LOVE 5 ❤️\n\n` +
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
            fs.createReadStream(
              outputFile
            )
        },

        event.threadID,
        event.messageID
      );


    /* ─────────────────────────
       AUTO CLEANUP
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
          await fs.pathExists(
            outputFile
          )
        ) {

          await fs.remove(
            outputFile
          );
        }

      } catch (e) {}

    }, 120000);


  } catch (error) {

    console.error(
      "[LOVE5 ERROR]",
      error
    );


    /* Remove waiting */

    if (waiting?.messageID) {

      try {

        await api.unsendMessage(
          waiting.messageID
        );

      } catch (e) {}

    }


    /* Remove file */

    if (outputFile) {

      try {

        if (
          await fs.pathExists(
            outputFile
          )
        ) {

          await fs.remove(
            outputFile
          );
        }

      } catch (e) {}

    }


    return api.sendMessage(
      "⚠️ LOVE5 ERROR\n\n" +
      `❌ ${error?.message || "Unknown error"}`,
      event.threadID,
      event.messageID
    );
  }
};
