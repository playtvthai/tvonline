const axios = require("axios");
const fs = require("fs");

const loginUrl =
  "https://cloud.ufxtv.com/api/user/login/?user_email=BE0268&user_password=1111&kauth=";
const playBaseUrl =
  "https://cloud.ufxtv.com/api/tv/channels/play/?c=uflix-epl1&kauth=";

// Function to get playlist URL
async function getPlaylist(user_loggedsession) {
  const playUrl = `${playBaseUrl}&user_loggedsession=${user_loggedsession}`;
  try {
    const response = await axios.get(playUrl);
    const text = response.data;
    return text.includes("<clear_url>") ? text : null;
  } catch (error) {
    console.error("❌ Error fetching playlist:", error);
    return null;
  }
}

// Login to get session
async function login() {
  try {
    const response = await axios.get(loginUrl);
    const text = response.data;
    const sessionMatch = text.match(
      /<user_loggedsession>(.*?)<\/user_loggedsession>/
    );
    return sessionMatch ? sessionMatch[1] : null;
  } catch (error) {
    console.error("❌ Error logging in:", error);
    return null;
  }
}

// Extract clear_url from XML response
function extractClearUrl(xml) {
  const match = xml.match(/<clear_url>(.*?)<\/clear_url>/);
  return match ? match[1] : null;
}

// Generate and render playlist
function renderPlaylist(clearUrl) {
  const fixedUrl = clearUrl.replace("playlist.m3u8", "chunks.m3u8");
  const output = `
#EXTM3U
########################################
### Uflix ### 
########################################
#EXTINF:-1 group-title="กีฬา" tvg-logo="https://static.uflixtv.com/images/tv/channels_icons/epl-1.png",EPL-1
${fixedUrl}
  `;
  return { output, fixedUrl };
}

// Main process
(async function () {
  const session = await login();
  if (!session) return console.error("❌ Login failed");

  const xmlData = await getPlaylist(session);
  const clearUrl = extractClearUrl(xmlData);
  if (!clearUrl) return console.error("❌ No clear_url found");

  // สร้าง playlist และ URL ใหม่
  const { output, fixedUrl } = renderPlaylist(clearUrl);

  // ตั้งค่า headers แบบ browser-like
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: fixedUrl,
    headers: {
      accept: "*/*",
      "accept-language": "th,en;q=0.9,th-TH;q=0.8",
      origin: "https://cloud.ufxtv.com",
      priority: "u=1, i",
      referer: "https://cloud.ufxtv.com/",
      "sec-ch-ua":
        '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    },
  };

    try {
      // 👇 เช็ค IP ก่อน
      const publicIp = await axios.get("https://api.ipify.org?format=json");
      console.log("🌐 Current Public IP:", publicIp.data.ip);

      const chunkResponse = await axios.request(config);
      console.log("✔️ Successfully fetched m3u8 with headers");
    } catch (error) {
      console.error(
        "❌ Error requesting .m3u8 with headers:",
        error.response?.status || error.message
      );
    }


  // บันทึก playlist ลงไฟล์
  fs.writeFileSync("index2.html", output);
})();
