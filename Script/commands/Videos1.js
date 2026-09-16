/**
 * ╔══════════════════════════════════════════════╗
 * ║          MIRAI / GOATBOT — VIDEO BOX        ║
 * ║          Developer: হৃদয় হাসান শান্ত        ║
 * ║          Version: 5.1.0                     ║
 * ╚══════════════════════════════════════════════╝
 */

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "b",
  version: "5.1.0",
  hasPermssion: 0,
  credits: "হৃদয় হাসান শান্ত",
  description: "🎬 Stylish B1-B8 Keyword Video Reply System",
  commandCategory: "media",
  usages: "videos1 B1/B2/B3/B4/B5/B6/B7/B8",
  cooldowns: 2
};

const videoMap = {

  "B1": {
    url: "https://files.catbox.moe/o2xhrd.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟏 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟏
┃ 🔥 মুড একদম সেট!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  "B2": {
    url: "https://files.catbox.moe/8jcrnr.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟐 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟐
┃ 🔥 মজা শুরু!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  "B3": {
    url: "https://files.catbox.moe/rrkp7u.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟑 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟑
┃ 🔥 স্ক্রিনে চোখ রাখো!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  "B4": {
    url: "https://files.catbox.moe/w91hyv.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟒 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟒
┃ 🔥 মুডটা জমিয়ে নাও!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  "B5": {
    url: "https://files.catbox.moe/a3hm9u.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟓 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟓
┃ 🔥 ভিডিওটা একদম জমজমাট!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  "B6": {
    url: "https://files.catbox.moe/ux8ejj.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟔 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟔
┃ 🔥 এবার আসল মজা!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  // B7 — বর্তমানে B6-এর ভিডিও ব্যবহার করছে
  "B7": {
    url: "https://files.catbox.moe/ux8ejj.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟕 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟕
┃ 🔥 স্পেশাল ভিডিও ভাইব!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  },

  // B8 — বর্তমানে B1-এর ভিডিও ব্যবহার করছে
  "B8": {
    url: "https://files.catbox.moe/o2xhrd.mp4",
    caption: `╭━━━〔 🎬 𝐁𝟖 𝐌𝐎𝐃𝐄 🔥 〕━━━╮
┃ 🎬 𝐕𝐈𝐃𝐄𝐎 𝐏𝐀𝐂𝐊 𝟎𝟖
┃ 🔥 নতুন ভিডিও ভাইব!
┃ 😎 𝐄𝐍𝐉𝐎𝐘 𝐓𝐇𝐄 𝐕𝐈𝐃𝐄𝐎!
╰━━━━━━━━━━━━━━━━━━━━━━╯`
  }

};

function normalizeText(text) {
  return String(text || "")
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

module.exports.run = async function ({ api, event, args }) {

  const threadID = event?.threadID;
  const messageID = event?.messageID;

  if (!threadID) return;

  let filePath = null;

  try {

    // ━━━━━━━━━━━━━━━━━━━━━━━
    // VIDEO MENU
    // ━━━━━━━━━━━━━━━━━━━━━━━

    if (!args || args.length === 0) {

      const keywords = Object.keys(videoMap)
        .map((key, index) =>
          `┃ 🎬 ${String(index + 1).padStart(2, "0")} ┃ ${key}`
        )
        .join("\n");

      return api.sendMessage(
`╭━━━〔 🎬 𝐕𝐈𝐃𝐄𝐎 𝐁𝐎𝐗 🔥 〕━━━╮

┃ 🎬 𝐁𝟏–𝐁𝟖 𝐕𝐈𝐃𝐄𝐎 𝐌𝐄𝐍𝐔
┃ ───────────────────
${keywords}
┃
┃ 🔥 ব্যবহার:
┃ 😎 videos1 B1
┃ 😎 videos1 B2
┃ 😎 videos1 B3
┃ 😎 videos1 B4
┃ 😎 videos1 B5
┃ 😎 videos1 B6
┃ 😎 videos1 B7
┃ 😎 videos1 B8
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
        threadID,
        messageID
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━
    // FIND VIDEO
    // ━━━━━━━━━━━━━━━━━━━━━━━

    const input = normalizeText(args.join(" "));

    let selected = null;
    let selectedKey = null;

    for (const key of Object.keys(videoMap)) {

      if (normalizeText(key) === input) {

        selected = videoMap[key];
        selectedKey = key;

        break;
      }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━
    // NOT FOUND
    // ━━━━━━━━━━━━━━━━━━━━━━━

    if (!selected) {

      return api.sendMessage(
`╭━━━〔 🎬 𝐍𝐎𝐓 𝐅𝐎𝐔𝐍𝐃 🔥 〕━━━╮

┃ 🔥 এই নামে কোনো ভিডিও নেই!
┃
┃ 😎 সঠিক Keyword ব্যবহার করো।
┃ 🎬 ভিডিও লিস্ট:
┃ 👉 videos1
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
        threadID,
        messageID
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━
    // CACHE
    // ━━━━━━━━━━━━━━━━━━━━━━━

    const cacheDir = path.join(__dirname, "cache");

    await fs.ensureDir(cacheDir);

    const fileName =
      Buffer.from(selectedKey, "utf8").toString("hex") + ".mp4";

    filePath = path.join(cacheDir, fileName);

    // ━━━━━━━━━━━━━━━━━━━━━━━
    // DOWNLOAD VIDEO
    // ━━━━━━━━━━━━━━━━━━━━━━━

    if (!(await fs.pathExists(filePath))) {

      const response = await axios({
        method: "GET",
        url: selected.url,
        responseType: "arraybuffer",
        timeout: 60000,
        maxContentLength: 100 * 1024 * 1024,
        maxBodyLength: 100 * 1024 * 1024,
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      });

      if (!response.data || response.data.length === 0) {
        throw new Error("Downloaded video is empty.");
      }

      await fs.writeFile(
        filePath,
        Buffer.from(response.data)
      );
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━
    // SEND VIDEO
    // ━━━━━━━━━━━━━━━━━━━━━━━

    return api.sendMessage(
      {
        body: selected.caption,
        attachment: fs.createReadStream(filePath)
      },
      threadID,
      messageID
    );

  } catch (error) {

    console.error("❌ VIDEOS1 ERROR:", error);

    // Remove broken cache
    try {

      if (filePath && await fs.pathExists(filePath)) {
        await fs.remove(filePath);
      }

    } catch (cacheError) {

      console.error(
        "❌ CACHE REMOVE ERROR:",
        cacheError
      );
    }

    return api.sendMessage(
`╭━━━〔 🎬 𝐄𝐑𝐑𝐎𝐑 🔥 〕━━━╮

┃ 🔥 ভিডিও পাঠাতে সমস্যা হয়েছে!
┃
┃ 😎 কিছুক্ষণ পরে আবার চেষ্টা করো।
┃ 🎬 Keyword ঠিক আছে কিনা দেখো।
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯`,
      threadID,
      messageID
    );
  }
};
