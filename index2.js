const axios = require("axios");
const fs = require("fs");

const loginUrl = "https://cloud.ufxtv.com/api/user/login/?user_email=BE0268&user_password=1111&kauth=";
const channels = [
  {
    id: "uflix-epl1",
    name: "EPL-1",
    logo: "https://static.uflixtv.com/images/tv/channels_icons/epl-1.png",
    group: "กีฬา"
  },
  {
    id: "uflix-epl2",
    name: "EPL-2",
    logo: "https://static.uflixtv.com/images/tv/channels_icons/epl-2.png",
    group: "กีฬา"
  }
  // เพิ่มช่องอื่นๆได้เลย
];
const CORS_PROXY = "http://localhost:8080/";
const REFRESH_INTERVAL = 60 * 60 * 1000; // 1 ชั่วโมง

function playBaseUrl(channelId) {
  return `https://cloud.ufxtv.com/api/tv/channels/play/?c=${channelId}&kauth=`;
}

async function login() {
  try {
    const { data } = await axios.get(loginUrl);
    const match = data.match(/<user_loggedsession>(.*?)<\/user_loggedsession>/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

async function getPlaylist(channelId, session) {
  const url = `${playBaseUrl(channelId)}&user_loggedsession=${session}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    return null;
  }
}

function extractClearUrl(xml) {
  const match = xml.match(/<clear_url>(.*?)<\/clear_url>/);
  return match ? match[1] : null;
}

function renderChannelEntry(channel, url) {
  return `#EXTINF:-1 group-title="${channel.group}" tvg-logo="${channel.logo}",${channel.name}\n${url}`;
}

async function main() {
  const session = await login();
  if (!session) return console.error("❌ Login failed");

  let playlist = "#EXTM3U\n";
  for (const channel of channels) {
    const xml = await getPlaylist(channel.id, session);
    if (!xml) continue;
    const clearUrl = extractClearUrl(xml);
    if (!clearUrl) continue;
    const chunksUrl = clearUrl.replace("playlist.m3u8", "chunks.m3u8");
    const proxiedUrl = CORS_PROXY + chunksUrl;
    playlist += renderChannelEntry(channel, proxiedUrl) + "\n";
  }

  fs.writeFileSync("playlist.m3u", playlist);
  console.log("✔️ Playlist เขียนไฟล์ใหม่แล้ว");
}

main();
setInterval(main, REFRESH_INTERVAL);