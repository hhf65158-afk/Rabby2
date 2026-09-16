/**
 * ╔══════════════════════════════════════════════╗
 * ║        😎 MIRAI BOT — ATTITUDE VIDEO        ║
 * ║                                              ║
 * ║  Developer : হৃদয় হাসান শান্ত                ║
 * ║  Version   : 3.0.0                            ║
 * ╚══════════════════════════════════════════════╝
 */

const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "attitude",
  version: "3.0.0",
  hasPermssion: 0,
  credits: "💠 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎 💠",
  description: "😎 Random attitude video",
  commandCategory: "Video",
  usages: "attitude",
  cooldowns: 2,

  dependencies: {
    axios: "",
    "fs-extra": ""
  }
};

module.exports.run = async ({ api, event }) => {

  const cacheDir = path.join(__dirname, "cache");
  const videoPath = path.join(cacheDir, "attitude.mp4");

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 😎 RANDOM ATTITUDE CAPTIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const captions = [

    `╔═══━━━─── 😎 ───━━━═══╗
      🔥 𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄 𝐕𝐈𝐁𝐄 🔥
╚═══━━━─── 😎 ───━━━═══╝

🖤 চুপ আছি বলে দুর্বল ভাবিস না,
⚡ সময় এলে উত্তরটা বুঝিয়ে দেব!

👑 𝐌𝐲 𝐒𝐭𝐲𝐥𝐞 • 𝐌𝐲 𝐑𝐮𝐥𝐞𝐬 👑`,

    `╔═══━━━─── 👑 ───━━━═══╗
      😎 𝐑𝐎𝐘𝐀𝐋 𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄 😎
╚═══━━━─── 👑 ───━━━═══╝

🔥 ভিড়ের মধ্যে হারিয়ে যাই না,
🖤 নিজের পরিচয় নিজেই তৈরি করি!

⚡ 𝐁𝐞 𝐘𝐨𝐮 • 𝐍𝐨 𝐂𝐨𝐩𝐲 ⚡`,

    `╔═══━━━─── 🖤 ───━━━═══╗
     😎 𝐃𝐈𝐅𝐅𝐄𝐑𝐄𝐍𝐓 𝐌𝐈𝐍𝐃 😎
╚═══━━━─── 🖤 ───━━━═══╝

⚡ সবাই যেমন,
আমি তেমন না!

🔥 নিজের রাস্তায় নিজেই রাজা 👑`,

    `╔═══━━━─── 🔥 ───━━━═══╗
       😎 𝐒𝐖𝐀𝐆 𝐌𝐎𝐃𝐄 😎
╚═══━━━─── 🔥 ───━━━═══╝

🖤 আমাকে বুঝতে হলে,
আগে আমার গল্পটা জানতে হবে!

⚡ 𝐒𝐰𝐚𝐠 𝐈𝐬 𝐌𝐲 𝐒𝐭𝐲𝐥𝐞 ⚡`,

    `╔═══━━━─── ⚡ ───━━━═══╗
       👑 𝐎𝐖𝐍 𝐑𝐔𝐋𝐄𝐒 👑
╚═══━━━─── ⚡ ───━━━═══╝

😎 কারো মতো হতে আসিনি,
🔥 নিজের মতো থাকতেই ভালোবাসি!

🖤 𝐌𝐲 𝐋𝐢𝐟𝐞 • 𝐌𝐲 𝐑𝐮𝐥𝐞𝐬 🖤`,

    `╔═══━━━─── 😈 ───━━━═══╗
      🔥 𝐀𝐓𝐓𝐈𝐓𝐔𝐃𝐄 𝐎𝐍 🔥
╚═══━━━─── 😈 ───━━━═══╝

⚡ কথা কম,
😎 ব্যক্তিত্বটাই যথেষ্ট!

👑 𝐒𝐢𝐦𝐩𝐥𝐞 𝐁𝐮𝐭 𝐃𝐢𝐟𝐟𝐞𝐫𝐞𝐧𝐭 👑`,

    `╔═══━━━─── 🕶️ ───━━━═══╗
       🔥 𝐂𝐎𝐎𝐋 𝐕𝐈𝐁𝐄 🔥
╚═══━━━─── 🕶️ ───━━━═══╝

🖤 আমাকে নিয়ে ভাবার দরকার নেই,
আমি নিজের জীবন নিয়েই ব্যস্ত!

⚡ 𝐒𝐭𝐚𝐲 𝐂𝐨𝐨𝐥 • 𝐒𝐭𝐚𝐲 𝐘𝐨𝐮 ⚡`,

    `╔═══━━━─── 👑 ───━━━═══╗
       😎 𝐌𝐘 𝐖𝐎𝐑𝐋𝐃 😎
╚═══━━━─── 👑 ───━━━═══╝

🔥 সম্মান দিলে সম্মান পাবি,
🖤 অহংকার দেখালে দূরত্ব পাবি!

⚡ 𝐑𝐞𝐬𝐩𝐞𝐜𝐭 𝐈𝐬 𝐄𝐯𝐞𝐫𝐲𝐭𝐡𝐢𝐧𝐠 ⚡`,

    `╔═══━━━─── 🔥 ───━━━═══╗
      😎 𝐍𝐎 𝐂𝐎𝐏𝐘 😎
╚═══━━━─── 🔥 ───━━━═══╝

⚡ আমার স্টাইল আমারই,
কারো নকল করার দরকার নেই!

👑 𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥 𝐕𝐢𝐛𝐞 • 𝐎𝐫𝐢𝐠𝐢𝐧𝐚𝐥 𝐌𝐞 👑`,

    `╔═══━━━─── 🖤 ───━━━═══╗
       🔥 𝐋𝐄𝐆𝐄𝐍𝐃 𝐕𝐈𝐁𝐄 🔥
╚═══━━━─── 🖤 ───━━━═══╝

😎 সবাই চিনবে এমন হতে চাই না,
🔥 নিজের কাছে সেরা থাকাই যথেষ্ট!

👑 𝐁𝐞 𝐘𝐨𝐮𝐫𝐬𝐞𝐥𝐟 👑`

  ];

  const caption =
    captions[Math.floor(Math.random() * captions.length)];

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🎬 VIDEO LINKS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const links = [
    "https://drive.google.com/uc?id=11dUXILgge35GyV9ilD_JmzLiL7yq5WMc",
    "https://drive.google.com/uc?id=11Wr0yQ3QVG1BucbdlANkSo5vE-a___Sn",
    "https://drive.google.com/uc?id=10e1TdrCvj0w2GIBrczbQYUFvb5HddTaW",
    "https://drive.google.com/uc?id=114eZDQU1xbBa2BKrfaboA8tQlJi2fWcS",
    "https://drive.google.com/uc?id=11x0wO9uv9foBrq0B585QEVTk1h0Ci6L_",
    "https://drive.google.com/uc?id=11PXirNeOGwoJblFBxp5M9DFYaGVDlyzT",
    "https://drive.google.com/uc?id=10qGgG0YdBksgEp1k9fCAsv46PrWfUCSm",
    "https://drive.google.com/uc?id=11f2yNWaoLNVORhsuwiQto47oLSqEFmyB",
    "https://drive.google.com/uc?id=10hxxvZ3zwKqmwxvZFg1YkIsEcI2x0d_a",
    "https://drive.google.com/uc?id=158uOCkcLSgn0yAmb9A3GxNBuwhQ6whJl",
    "https://drive.google.com/uc?id=1-0nXpw6ch9JTDRcSrN5bdsXzh67lyEDe",
    "https://drive.google.com/uc?id=1-LC1zOtGFf2Toa0zfTUN9Y8xC-CQloHp",
    "https://drive.google.com/uc?id=13AMbqn7jai43XgbNADQ8nqW7tieDY4fa",
    "https://drive.google.com/uc?id=10C_AagqYOXSp67gkPpwXOdhIXhSosf_O",
    "https://drive.google.com/uc?id=13068I_ImTH0RQkWHgxGddKMzC0qMirS3",
    "https://drive.google.com/uc?id=10CvsLzpZGbTyGbf9ysMWQHe4rwmC1yw3",
    "https://drive.google.com/uc?id=14dqAKDGlPsee-85XvJTld_Jcx6P7mNaI",
    "https://drive.google.com/uc?id=15BmVYod3VW0zePhdNGD3-RpPoQyFI65U",
    "https://drive.google.com/uc?id=14-ymwZdWOKj89pWtA0MiLGN7Eh2xmHaG",
    "https://drive.google.com/uc?id=1-y_vYnJYSPe2gMsPfZQjmjOvhkyVw35R",
    "https://drive.google.com/uc?id=14oBehghDvtnmJL3wNvN0Kc6YGzJt2iQJ",
    "https://drive.google.com/uc?id=13pTcxmag7B893dWzfe7OavvayD7OYiRa",
    "https://drive.google.com/uc?id=1-6mtt_fnc9czRRGsRqCqcURBZQUzczBy",
    "https://drive.google.com/uc?id=13xMtvrgt__qUUQ-U9PKGyUlq88x1CIPZ",
    "https://drive.google.com/uc?id=14OMrLCa7ef1jH7I39fouKG4lxwbd4K0b",
    "https://drive.google.com/uc?id=14HaSbb4fSHfUhUgKfNWJc66gNmqYgmPW",
    "https://drive.google.com/uc?id=1-E1mcGTX6_RCc5vEXOsDV2ODC059o6bF",
    "https://drive.google.com/uc?id=14Szrzz4CL3BBN1oQrH04cQ1zM1sNhx7s",
    "https://drive.google.com/uc?id=13UmjKL6oKSbDYJbOKr6qGfqJQgUoC-qa",
    "https://drive.google.com/uc?id=10BIFhf82pTFOq0Z1v4b-FFsPr877zsLo"
  ];

  try {

    await fs.ensureDir(cacheDir);

    if (fs.existsSync(videoPath)) {
      await fs.remove(videoPath);
    }

    const videoUrl =
      links[Math.floor(Math.random() * links.length)];

    const response = await axios({
      method: "GET",
      url: videoUrl,
      responseType: "stream",
      maxRedirects: 5,
      timeout: 120000
    });

    const writer = fs.createWriteStream(videoPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
      response.data.on("error", reject);
    });

    await api.sendMessage(
      {
        body: caption,
        attachment: fs.createReadStream(videoPath)
      },
      event.threadID
    );

  } catch (error) {

    console.error("ATTITUDE ERROR:", error);

    api.sendMessage(
      "❌ ভিডিও পাঠাতে সমস্যা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।",
      event.threadID
    );

  } finally {

    setTimeout(async () => {
      try {
        if (fs.existsSync(videoPath)) {
          await fs.remove(videoPath);
        }
      } catch (err) {
        console.error("CACHE CLEAN ERROR:", err);
      }
    }, 5000);

  }
};
