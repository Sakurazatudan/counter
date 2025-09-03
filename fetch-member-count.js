// Discordのギルドメンバー数を取得してJSONに保存
const fetch = require("node-fetch");
const fs = require("fs");

const guildId = process.env.GUILD_ID;      // GitHub Secrets に登録
const botToken = process.env.BOT_TOKEN;    // GitHub Secrets に登録

async function main() {
  try {
    const response = await fetch(
      `https://discord.com/api/v10/guilds/${guildId}?with_counts=true`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.approximate_member_count !== undefined) {
      const count = data.approximate_member_count;

      // JSTに変換
      const now = new Date();
      const jstTime = new Date(now.getTime() + 9*60*60*1000); // UTC +9時間
      const formatted = jstTime.toISOString().replace('T', ' ').split('.')[0];

      // JSONに書き出し
      const output = {
        count,
        updated: formatted // "2025-09-03 18:00:00" みたいにJSTで表示
      };

      fs.writeFileSync('member_count.json', JSON.stringify(output, null, 2), 'utf-8');
    }

  } catch (err) {
    console.error("Error fetching member count:", err);
  }
}

main();
