const axios = require("axios");
const fetchHackerNews = require("./utils/hackernews");
const fetchProductHunt = require("./utils/producthunt");
const LARK_HOOK_URL = process.env.LARK_HOOK_URL;

async function postProductHuntMsg() {
  const products = await fetchProductHunt();
  const card = {
    config: {
      wide_screen_mode: false,
    },
    header: {
      template: "green",
      title: {
        content: " 📰 Daily Product Hunt Feeds",
        tag: "plain_text",
      },
    },
    elements: [
      {
        tag: "div",
        text: {
          content: "  🟠 **Product Hunt**",
          tag: "lark_md",
        },
      },
      ...products.map((item, index) => ({
        tag: "div",
        text: {
          content: `[${index + 1}. ${item.name}](${item.url}) - ▲${
            item.votesCount
          }\n${item.tagline}`,
          tag: "lark_md",
        },
      })),
    ],
  };

  axios.post(LARK_HOOK_URL, {
    msg_type: "interactive",
    card,
  });
}

async function postHackerNewsMsg() {
  const news = await fetchHackerNews();

  const card = {
    config: {
      wide_screen_mode: false,
    },
    header: {
      template: "green",
      title: {
        content: " 📰 Daily Hacker News Feeds",
        tag: "plain_text",
      },
    },
    elements: [
      {
        tag: "div",
        text: {
          content: "  ⚫️ **Hacker News**",
          tag: "lark_md",
        },
      },
      ...news.map((item, index) => ({
        tag: "div",
        text: {
          content: `[${index + 1}. ${item.title}](${item.url})`,
          tag: "lark_md",
        },
      })),
    ],
  };

  axios.post(LARK_HOOK_URL, {
    msg_type: "interactive",
    card,
  });
}

postHackerNewsMsg();
postProductHuntMsg();
