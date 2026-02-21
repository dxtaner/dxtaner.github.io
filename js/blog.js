document.addEventListener("DOMContentLoaded", fetchMediumPosts);

async function fetchMediumPosts() {
  const container = document.getElementById("blog-container");
  const status = document.getElementById("blog-status");

  container.innerHTML = `<div class="loading">>> CONNECTING_TO_MEDIUM_SERVER...</div>`;

  const RSS_URL = "https://medium.com/feed/@dxtaner";
  const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    if (data.status !== "ok") throw new Error("FEED_ERROR");

    status.innerText = ">> STATUS: LINK_ESTABLISHED [OK]";
    renderPosts(data.items);
  } catch (err) {
    status.innerText = ">> STATUS: CONNECTION_FAILED";
    container.innerHTML = `<div class="error">DATA_STREAM_INTERRUPTED</div>`;
    console.error(err);
  }
}

function renderPosts(posts) {
  const container = document.getElementById("blog-container");
  container.innerHTML = "";

  posts.slice(0, 10).forEach((post, i) => {
    const text = post.description.replace(/<[^>]+>/g, "");
    const excerpt = text.substring(0, 120) + "...";
    const date = new Date(post.pubDate).toLocaleDateString("tr-TR");

    const entry = `
      <div class="blog-entry" style="animation-delay:${i * 0.1}s">
        <div class="entry-header">
          <span>LOG_${i + 1}</span>
          <span>${date}</span>
        </div>
        <div class="entry-title">${post.title}</div>
        <div class="entry-desc">${excerpt}</div>
        <a href="${post.link}" target="_blank" class="read-btn">>> READ_ENTRY</a>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", entry);
  });
}
