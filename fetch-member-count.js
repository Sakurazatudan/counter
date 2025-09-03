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

      // JSONに書き出し
      const output = {
        count,
        updated: new Date().toISOString()
      };

      fs.writeFileSync("member_count.json", JSON.stringify(output, null, 2));
      console.log(`✅ メンバー数更新: ${count}`);
    } else {
      console.error("❌ メンバー数取得失敗:", data);
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ エラー:", err);
    process.exit(1);
  }
}

main();
