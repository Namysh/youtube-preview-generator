export const getYouTubeVideoData = async (videoId) => {
  const response = await fetch(
    `https://corsproxy.io/?https://www.youtube.com/watch?v=${videoId}`,
  );
  const html = await response.text();
  const ytInitialPlayerResponse = JSON.parse(
    html
      .split("ytInitialPlayerResponse = ")[1]
      .split(`;var meta = document.createElement('meta')`)[0],
  );
  return ytInitialPlayerResponse;
};
