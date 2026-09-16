const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "love7",
  version: "2.1",
  hasPermssion: 0,
  credits: "💠 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎 💠",
  description: "Love7 image generator",
  commandCategory: "Image",
  usages: "[@mention/reply/uid/link]",
  cooldowns: 5
};

/*
 * API CONFIG
 * --------------------------------------------------
 * এখানে তোমার নতুন API JSON URL বসাবে।
 * JSON structure:
 *
 * {
 *   "love7": {
 *     "api": "https://your-api.com",
 *     "backupApis": [
 *       "https://backup-api.com"
 *     ]
 *   }
 * }
 */
const API_JSON_URL = "https://raw.githubusercontent.com/your-new-api/api/main/api.json";

/**
 * Get UID from full mentioned name
 */
async function getUIDByFullName(api, threadID, body) {
  if (!body || !body.includes("@")) return null;

  const match = body.match(/@(.+)/);
  if (!match) return null;

  const targetName = match[1]
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const users = threadInfo.userInfo || [];

    const user = users.find((u) => {
      if (!u.name) return false;

      const fullName = u.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      return fullName === targetName;
    });

    return user ? user.id : null;
  } catch (error) {
    return null;
  }
}

/**
 * Get API list from API JSON
 */
async function getApiList(commandName) {
  try {
    const res = await axios.get(API_JSON_URL, {
      timeout: 15000
    });

    const data = res.data || {};
    const cmdData = data[commandName];

    if (!cmdData || !cmdData.api) {
      throw new Error(`❌ "${commandName}" API পাওয়া যায়নি`);
    }

    const apiList = [
      cmdData.api,
      ...(Array.isArray(cmdData.backupApis)
        ? cmdData.backupApis
        : [])
    ].filter(Boolean);

    if (!apiList.length) {
      throw new Error(`❌ "${commandName}" API পাওয়া যায়নি`);
    }

    return apiList;
  } catch (error) {
    if (error.message.includes("API পাওয়া যায়নি")) {
      throw error;
    }

    throw new Error(
      "❌ API configuration load করা যাচ্ছে না"
    );
  }
}

/**
 * Generate Love7 frame with API fallback
 */
async function generateFrameWithFallback({
  senderID,
  mention,
  credit,
  apiList
}) {
  let lastError = null;

  for (const baseApi of apiList) {
    try {
      if (!baseApi || typeof baseApi !== "string") {
        continue;
      }

      const cleanBase = baseApi.replace(/\/+$/, "");

      const apiUrl =
        `${cleanBase}/api/frame` +
        `?type=love7` +
        `&senderId=${encodeURIComponent(senderID)}` +
        `&mentionId=${encodeURIComponent(mention)}` +
        `&credit=${encodeURIComponent(credit)}`;

      const response = await axios.get(apiUrl, {
        timeout: 30000,
        responseType: "json"
      });

      const data = response.data;

      if (
        data &&
        data.image &&
        typeof data.image === "string" &&
        data.captionTemplate
      ) {
        let imageBuffer;

        try {
          imageBuffer = Buffer.from(data.image, "base64");
        } catch (decodeError) {
          throw new Error("❌ Image decode করা যায়নি");
        }

        if (!imageBuffer || !imageBuffer.length) {
          throw new Error("❌ Empty image received");
        }

        return {
          imageBuffer,
          captionTemplate: data.captionTemplate
        };
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      throw new Error("❌ API থেকে valid image পাওয়া যায়নি");
    } catch (error) {
      lastError = error;

      /*
       * Unauthorized/API-specific error হলে
       * সরাসরি দেখানো হবে।
       */
      if (
        error.response?.status === 401 &&
        error.response?.data?.error
      ) {
        throw new Error(error.response.data.error);
      }

      /*
       * অন্য API থাকলে পরের backup API চেষ্টা করবে।
       */
      continue;
    }
  }

  throw lastError || new Error("❌ কোনো API কাজ করছে না");
}

/**
 * Main command
 */
module.exports.run = async function ({
  api,
  event,
  args
}) {
  let waiting = null;
  let outPath = null;

  try {
    let mention = null;
    let mentionName = null;

    /*
     * 1. Reply
     */
    if (event.type === "message_reply") {
      mention = event.messageReply?.senderID;
    }

    /*
     * 2. Argument
     */
    else if (args && args.length > 0) {
      const input = args.join(" ").trim();

      /*
       * Facebook profile link
       */
      if (
        input.includes("facebook.com/") ||
        input.includes("fb.com/")
      ) {
        try {
          mention = await api.getUID(input);
        } catch (error) {
          mention = null;
        }
      }

      /*
       * Mention
       */
      else if (
        input.includes("@") ||
        Object.keys(event.mentions || {}).length > 0
      ) {
        mention =
          Object.keys(event.mentions || {})[0];

        if (!mention) {
          mention = await getUIDByFullName(
            api,
            event.threadID,
            input
          );
        }
      }

      /*
       * Direct UID
       */
      else {
        mention = input;
      }
    }

    /*
     * 3. No user provided
     */
    else {
      return api.sendMessage(
        "❌ 𝗣𝗹𝗲𝗮𝘀𝗲 𝗺𝗲𝗻𝘁𝗶𝗼𝗻 𝗮 𝘂𝘀𝗲𝗿",
        event.threadID,
        event.messageID
      );
    }

    /*
     * Validate UID
     */
    if (!mention) {
      return api.sendMessage(
        "❌ 𝗨𝘀𝗲𝗿 𝗻𝗼𝘁 𝗳𝗼𝘂𝗻𝗱 🐸\n" +
        "𝗣𝗹𝗲𝗮𝘀𝗲 𝗰𝗵𝗲𝗰𝗸 𝘁𝗵𝗲 𝗽𝗿𝗼𝗳𝗶𝗹𝗲",
        event.threadID,
        event.messageID
      );
    }

    /*
     * Get user info
     */
    let userInfo;

    try {
      userInfo = await api.getUserInfo(mention);
    } catch (error) {
      return api.sendMessage(
        "❌ 𝗨𝘀𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻 𝗳𝗲𝘁𝗰𝗵 𝗳𝗮𝗶𝗹𝗲𝗱",
        event.threadID,
        event.messageID
      );
    }

    mentionName =
      userInfo?.[mention]?.name || "Unknown";

    const senderID = event.senderID;

    /*
     * Developer credit
     */
    const credit =
      "💠 𝐇𝐑𝐈𝐃𝐎𝐘 𝐇𝐀𝐒𝐀𝐍 𝐒𝐇𝐀𝐍𝐓𝐎 💠";

    /*
     * Waiting message
     */
    waiting = await api.sendMessage(
      "⏳ 𝗣𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁....",
      event.threadID
    );

    /*
     * Load API list
     */
    const apiConfigList =
      await getApiList(
        module.exports.config.name
      );

    /*
     * Generate image
     */
    const {
      imageBuffer,
      captionTemplate
    } = await generateFrameWithFallback({
      senderID,
      mention,
      credit,
      apiList: apiConfigList
    });

    /*
     * Replace caption variables
     */
    const finalCaption =
      String(captionTemplate)
        .replace(
          /{{name}}/gi,
          mentionName
        )
        .replace(
          /{{credit}}/gi,
          credit
        );

    /*
     * Temporary image path
     */
    outPath = path.join(
      __dirname,
      `love7_${Date.now()}.png`
    );

    await fs.writeFile(
      outPath,
      imageBuffer
    );

    /*
     * Remove waiting message
     */
    if (waiting?.messageID) {
      try {
        await api.unsendMessage(
          waiting.messageID
        );
      } catch (error) {}
    }

    /*
     * Send final result
     */
    const messageInfo =
      await api.sendMessage(
        {
          body: finalCaption,
          mentions: [
            {
              tag: mentionName,
              id: mention
            }
          ],
          attachment:
            fs.createReadStream(outPath)
        },
        event.threadID,
        event.messageID
      );

    /*
     * Delete temporary image after 2 minutes
     */
    setTimeout(async () => {
      try {
        if (messageInfo?.messageID) {
          await api.unsendMessage(
            messageInfo.messageID
          );
        }
      } catch (error) {}

      try {
        if (
          outPath &&
          await fs.pathExists(outPath)
        ) {
          await fs.remove(outPath);
        }
      } catch (error) {}
    }, 120000);

  } catch (error) {
    /*
     * Remove waiting message if command fails
     */
    if (waiting?.messageID) {
      try {
        await api.unsendMessage(
          waiting.messageID
        );
      } catch (e) {}
    }

    /*
     * Remove temporary file if created
     */
    if (outPath) {
      try {
        if (await fs.pathExists(outPath)) {
          await fs.remove(outPath);
        }
      } catch (e) {}
    }

    console.error(
      "[LOVE7 ERROR]",
      error
    );

    return api.sendMessage(
      `⚠️ ${error.message || "Unknown error"}`,
      event.threadID,
      event.messageID
    );
  }
};
