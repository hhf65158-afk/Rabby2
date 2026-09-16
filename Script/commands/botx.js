/**
 * ╔══════════════════════════════════════════════════╗
 * ║              🤖 OTHER BOTS GUARD 🤖              ║
 * ║                                                  ║
 * ║  Developer : হৃদয় হাসান শান্ত                    ║
 * ║  Version   : 2.0.0                               ║
 * ║  Platform  : Mirai / GoatBot                     ║
 * ╚══════════════════════════════════════════════════╝
 */

const moment = require("moment-timezone");

module.exports.config = {
  name: "otherbots",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "💠 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎 💠",
  description: "Automatically detects and bans other bot messages.",
  commandCategory: "config",
  cooldowns: 0
};

// ==================================================
// 🤖 BOT MESSAGE KEYWORDS
// ==================================================

const botKeywords = [
  "your keyboard level has reached level",
  "Command not found",
  "The command you used",
  "Uy may lumipad",
  "Unsend this message",
  "You are unable to use bot",
  "»» NOTICE «« Update user nicknames",
  "just removed 1 Attachments",
  "message removedcontent",
  "The current preset is",
  "Here Is My Prefix",
  "just removed 1 attachment.",
  "Unable to re-add members",
  "removed 1 message content:",
  "Here's your music, enjoy!🥰",
  "Ye Raha Aapka Music, enjoy!🥰",
  "your keyboard Power level Up",
  "your keyboard hero level has reached level",
  "Error: Cannot read properties of undefined",
  "Error in onChat: Request failed with status code 500",
  "Error: Failed to fetch list",
  "⚠️ একটি ত্রুটি ঘটেছে, দয়া করে পরে আবার চেষ্টা করুন।",
  "😲🧸👀",
  "😲🧸😼",
  "😲🧸😚",
  "😲🧸🥴",
  "😲🧸🐸",
  "What's up?",
  "❌ Please provide a question or prompt.",
  "Hi there! How can I help you today?",
  "Hello! How can I help you today?",
  "Wait koro baby 😽",
  "Generation failed!",
  "Error: Request failed with status code 404",
  "Request failed with status code 500.",
  "An error",
  "❌ Error",
  "❌ Please provide an image URL",
  "😤😤😎",
  "😤😤🚶",
  "𝗬𝗼𝘂🥳🥳",
  "𝗝𝗮𝗻𝗶𝗻𝗮🐐",
  "𝗛𝗶𝗵𝗶😀",
  "😒😒 😘",
  "𝗼𝗸𝘆 𝗯𝗯𝘆😆",
  "𝗼𝗸𝘆 𝗯𝗯𝘆🐥",
  "𝐭𝐮𝐦𝐢 𝐩𝐨𝐜𝐚 🥰",
  "𝗽𝗿𝗲 𝗶𝘀 𝗮 𝗽𝗿𝗲𝗳𝗶𝘅",
  "𝗡𝗼 𝗻𝗼😦",
  "𝗩𝗮𝗹𝗼 𝘁𝘂𝗺𝗶😆",
  "রাতে বিছানায় হিসু করে",
  "𝗡𝗼𝗽𝗲𝗲🫡",
  "Yes 😀, I am here",
  "𝗔𝗺𝗶 𝗮𝗿 𝘁𝘂𝗺𝗶😟",
  "𝗔𝗹𝗹𝗮𝗵 𝗛𝗮𝗳𝗲𝗲𝘇😡",
  "𝗮𝗺𝗻𝗶😴😴",
  "এমনিই👋",
  "𝘆𝗼𝘂 𝘁𝗼𝗼😼",
  "𝗸𝗶 𝗯𝗼𝗹𝗯𝗲 𝗯𝗼𝗹𝗼🤒",
  "𝗸𝗮𝗿 𝗷𝗼𝗻𝗻𝗼 𝗮𝘁𝗼 𝗹𝗼𝘃𝗲🦆",
  "𝘁𝗼𝗿 𝗸𝗮𝘀𝗲𝗶 𝗿𝗮𝗸🐥",
  "তাহলে মায়াবতী কে আমাকে দাও",
  "𝗛𝗺𝗺 𝗰𝗵𝗼𝗹 𝗹𝗮𝗺 𝘁𝗼😘",
  "𝗰𝗵𝗶𝗽𝗮𝗶😗",
  "আমার কোনো পছন্দ নেই🌝",
  "আগে ভালোবাসি বলো",
  "𝗛𝘂𝗵🙂",
  "𝘀𝗲𝗻𝘁𝗶 𝗻𝗮 𝗸𝗵𝗮𝘆𝗲",
  "𝗢𝗸𝗮𝘆👋👋",
  "𝗧𝗵𝗶𝗸 𝗮𝗰𝗵𝗲🌝",
  "𝗔𝘆😾",
  "𝗲𝗳𝗴𝗵🤷",
  "𝗡𝗮😃",
  "𝗶 𝗹𝗮𝗽 𝘂 𝗯𝗯𝘆🐐",
  "𝗛𝗺𝗺🫰",
  "𝘁𝘂𝗶 𝘁𝗼 𝘃𝗹𝗼𝗶 𝘀𝘆𝘁𝗻 😡",
  "وَعَلَيْكُمُ السَّلَامُ",
  "🔍 Platform detected: TikTok",
  "বেশি Bot Bot করলে leave নিবো কিন্তু😒",
  "⚠️ Sorry Boss এই আবালকে অ্যাড করলাম না",
  "এত হাই-হ্যালো কর ক্যান প্রিও",
  "আলহামদুলিল্লাহ😏",
  "🤖 𝙷𝚞𝚑! 𝚃𝚑𝚊𝚝 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚍𝚘𝚎𝚜𝚗'𝚝 𝚎𝚡𝚒𝚜𝚝",
  "🤖 𝗖ᴏᴍᴍᴀɴᴅ ɴᴏᴛ ғᴏᴜɴᴅ",
  "⚠️ দুঃখিত, আমি ইউজারটাকে আবার অ্যাড করতে পারিনি",
  "Hey senpai!",
  "আলাবু বলো সোনা 🤧",
  "😁🫵",
  "হ্যাঁ গো জান বলো 🙂",
  "Error api Response ❌",
  "ℹ️ [!] ɪғ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ɴᴏᴛ",
  "𝗛𝗺𝗺🐥",
  "𝗘𝗺𝗻𝗶𝗲😛",
  "𝗛𝗼𝗼𝗼𝗼𝗼𝗼𝗼𝗼𝗼⛹️",
  "😑🦧👽",
  "হাঁসতে ছে নাকি আমার কষ্ট দেখে",
  "𝗩𝗹𝗼🩵🩵",
  "🤦🤷‍♀️😵‍💫",
  "কি দিবো🌚",
  "𝗢𝗸𝗸 𝗯𝗯𝘂🧑‍🍼",
  "𝗣𝗿𝗲𝗴𝗻𝗮𝗻𝘁👋",
  "𝗕𝗮𝗻𝗱𝗼𝗿 𝗵𝗼𝗶𝗹𝗻 𝗻𝗮𝗸𝗶😡",
  "𝗢𝗸😏",
  "𝗞𝗻😴😴",
  "𝗵𝗶𝗵𝗶😏",
  "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑",
  "হ্যা বলো😒, তোমার জন্য কি করতে পারি",
  "আরে Bolo আমার জান",
  "অসম্মান করছিস😰😿",
  "Hop beda😾 Boss বল boss😼",
  "বট বলে চলে যাস কেন😤🥺কী হলো উওর দে🥺",
  "বার বার Disturb করছিস কোনো😾",
  "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒",
  "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস",
  "আমাকে ডেকো না,আমি ব্যাস্ত আছি",
  "কি হলো , মিস্টেক করচ্ছিস নাকি🤣",
  "বলো কি বলবা, সবার সামনে বলবা নাকি",
  "হা বলো, শুনছি আমি 😏",
  "আর কত বার ডাকবি ,শুনছি তো",
  "হুম বলো কি বলবে😒",
  "বলো কি করতে পারি তোমার জন্য",
  "আমি তো অন্ধ কিছু দেখি না🐸 😎",
  "রাহাদ বস তোমাকে ভালোবাসে😌",
  "বলো জানু 🌚",
  "তোর কি চোখে পড়ে না আমি রাহাদ জানুর সাথে ব্যাস্ত আছি😒",
  "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি",
  "🌻🌺💚আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ",
  "আমি এখন বস রাহাদ এর সাথে বিজি আছি আমাকে ডাকবেন না",
  "আজকে আমার মন ভালো নেই তাই আমারে ডাকবেন না",
  "চুনা ও চুনা আমার বস রাহাদ এর হবু বউ রে কেও দেকছো",
  "ইসস এতো ডাকো কেনো লজ্জা লাগে তো",
  "আমার বস রাহাদ এর পক্ষ থেকে তোমারে এতো এতো ভালোবাসা",
  "হাজারো লুচ্চা লুচ্চির ভিরে",
  "রূপের অহংকার করো না",
  "এত অহংকার করে লাভ নেই",
  "দিন দিন কিছু মানুষের কাছে অপ্রিয় হয়ে যাইতেছি",
  "দুনিয়ার সবাই প্রেম করে.!🤧 -আর মানুষ আমার বস রাহাদ কে সন্দেহ করে",
  "আমার থেকে ভালো অনেক পাবা-🙂 -কিন্তু সব ভালো তে কি আর ভালোবাসা থাকে",
  "অবহেলা করিস না-😑😪 - যখন নিজেকে বদলে ফেলবো -😌",
  "বন্ধুর সাথে ছেকা খাওয়া গান শুনতে শুনতে-🤧 -এখন আমিও বন্ধুর 𝙴𝚇 কে অনেক 𝙼𝙸𝚂𝚂 করি",
  "৯৯টাকায় ৯৯জিবি ৯৯বছর-☺️🐸 -অফারটি পেতে এখনই আমাকে প্রোপস করুন",
  "যেই আইডির মায়ায় পড়ে ভুল্লি আমারে.!🥴- তুই কি যানিস সেই আইডিটাও আমি চালাইরে.!🙂"
];

// ==================================================
// 🔍 NORMALIZE TEXT
// ==================================================

function normalizeText(text) {
  if (!text || typeof text !== "string") return "";

  return text
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

// ==================================================
// 🔍 BOT DETECTION
// ==================================================

function detectBotMessage(body) {
  const message = normalizeText(body);

  if (!message) return null;

  for (const keyword of botKeywords) {
    const normalizedKeyword = normalizeText(keyword);

    if (
      normalizedKeyword &&
      message.includes(normalizedKeyword)
    ) {
      return keyword;
    }
  }

  return null;
}

// ==================================================
// 🤖 EVENT HANDLER
// ==================================================

module.exports.handleEvent = async function({
  event,
  api,
  Users
}) {
  try {
    const {
      threadID,
      messageID,
      body,
      senderID
    } = event;

    // নিজের মেসেজ ignore
    if (senderID == api.getCurrentUserID()) return;

    // Empty message ignore
    if (!body) return;

    // Already banned user ignore
    if (
      global.data.userBanned &&
      global.data.userBanned.has(senderID)
    ) {
      return;
    }

    // Bot message detect
    const detectedKeyword = detectBotMessage(body);

    if (!detectedKeyword) return;

    const time = moment
      .tz("Asia/Kuala_Lumpur")
      .format("HH:mm:ss DD/MM/YYYY");

    let userName = "Unknown User";

    try {
      userName = await Users.getNameUser(senderID);
    } catch (error) {
      console.error(
        "[ OTHERBOTS ] Failed to get username:",
        error
      );
    }

    console.log(
      `[ OTHERBOTS ] ${userName} (${senderID}) detected`
    );

    console.log(
      `[ OTHERBOTS ] Keyword: ${detectedKeyword}`
    );

    // ==================================================
    // 🛡️ ADMIN GUARD
    // ==================================================

    if (
      global.utils &&
      typeof global.utils.guardAdminBan === "function"
    ) {
      const protectedUser =
        global.utils.guardAdminBan(
          api,
          senderID,
          threadID,
          messageID
        );

      if (protectedUser) {
        console.log(
          `[ OTHERBOTS ] Protected user ignored: ${senderID}`
        );
        return;
      }
    }

    // ==================================================
    // 📦 LOAD USER DATA
    // ==================================================

    let userData;

    try {
      userData = await Users.getData(senderID);
    } catch (error) {
      console.error(
        "[ OTHERBOTS ] Failed to load user data:",
        error
      );
      return;
    }

    if (!userData) {
      userData = {};
    }

    // ==================================================
    // 🚫 BAN USER
    // ==================================================

    if (!global.data.userBanned) {
      global.data.userBanned = new Map();
    }

    const banInfo = {
      reason: "Auto-detected as other bot",
      keyword: detectedKeyword,
      dateAdded: time
    };

    global.data.userBanned.set(
      senderID,
      banInfo
    );

    // Update database
    userData.banned = 1;
    userData.reason =
      "Auto-detected as other bot";
    userData.dateAdded = time;

    try {
      await Users.setData(
        senderID,
        userData
      );
    } catch (error) {
      console.error(
        "[ OTHERBOTS ] Failed to save ban data:",
        error
      );
    }

    // ==================================================
    // 📩 USER NOTIFICATION
    // ==================================================

    const replyMessage = {
      body:
`${userName}

🤖 𝐎𝐭𝐡𝐞𝐫 𝐁𝐨𝐭 𝐃𝐞𝐭𝐞𝐜𝐭𝐞𝐝 🚫

👤 User: ${userName}
🆔 ID: ${senderID}

🚫 তোমাকে অন্য Bot হিসেবে শনাক্ত করা হয়েছে।
🔒 Auto Ban Applied.

• Type /ban list`
    };

    api.sendMessage(
      replyMessage,
      threadID,
      async () => {

        // ==================================================
        // 👑 ADMIN NOTIFICATION
        // ==================================================

        if (
          global.config &&
          Array.isArray(global.config.ADMINBOT)
        ) {
          const adminMessage =
`🤖 𝐎𝐓𝐇𝐄𝐑 𝐁𝐎𝐓 𝐀𝐋𝐄𝐑𝐓 🚨

👤 Name: ${userName}
🆔 User ID: ${senderID}
💬 Thread ID: ${threadID}

🔍 Detected Keyword:
${detectedKeyword}

🚫 Status: AUTO BANNED
🕐 Time: ${time}

Developer:
💠 হৃদয় হাসান শান্ত 💠`;

          for (
            const adminID of global.config.ADMINBOT
          ) {
            try {
              await api.sendMessage(
                adminMessage,
                adminID
              );
            } catch (error) {
              console.error(
                "[ OTHERBOTS ] Admin notification failed:",
                adminID,
                error
              );
            }
          }
        }
      },
      messageID
    );

  } catch (error) {
    console.error(
      "[ OTHERBOTS ] Event handler error:",
      error
    );
  }
};

// ==================================================
// ⚙️ COMMAND
// ==================================================

module.exports.run = async function({
  event,
  api
}) {
  const message =
`🤖 𝐎𝐓𝐇𝐄𝐑 𝐁𝐎𝐓 𝐆𝐔𝐀𝐑𝐃

🛡️ Status: Active

This module automatically detects
known bot messages and applies a ban.

💠 Developer: হৃদয় হাসান শান্ত`;

  return api.sendMessage(
    message,
    event.threadID
  );
};
