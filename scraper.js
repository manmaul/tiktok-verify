import fetch from "node-fetch";

const TikTokScraper = {
  async scrapeTikTok() {
    // versión simple — devuelve videos fake debido a bloqueo TikTok
    return [
      {
        titulo: "Video TikTok - ejemplo",
        url: "https://www.tiktok.com/@test/video/123",
        views: 1000000
      }
    ];
  },

  async scrapeYouTube() {
    const response = await fetch(
      "https://yt.lemnoslife.com/noKey/playlistItems?playlistId=PL8fVUTBmJhHJzPIpFMIfkzhKwQn7hCQWw"
    );

    const data = await response.json();

    return data.items?.map(item => ({
      titulo: item.snippet.title,
      url: `https://youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
      views: 0
    })) || [];
  }
};

export default TikTokScraper;
