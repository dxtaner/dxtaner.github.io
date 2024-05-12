// blog.js

document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dxtaner"
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        const items = data.items;
        const itemsPerPage = 5;
        let currentPage = 1;
        const totalItems = items.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        const blogContainer = document.getElementById("blog-container");

        const renderBlogPosts = (page) => {
          const start = (page - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          const blogHTML = items
            .slice(start, end)
            .map(
              (item) => `
              <div class="blog-post">
                <h3>${item.title}</h3>
                <p>${item.description.slice(0, 350)}...</p>
                <p>Published Date: ${new Date(item.pubDate).toDateString()}</p>
                <a href="${item.link}" target="_blank">Read more</a>
              </div>
            `
            )
            .join("");
          blogContainer.innerHTML = blogHTML;
        };

        const pageContainer = document.getElementById("page-container");

        const renderPagination = () => {
          let pageNumbers = "";
          for (let i = 1; i <= totalPages; i++) {
            pageNumbers += `
                  <a class="page-number" href="#" data-page="${i}">${i}</a>
                `;
          }
          pageContainer.innerHTML = pageNumbers;
          const pageLinks = document.querySelectorAll(".page-number");
          pageLinks.forEach((link) => {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              currentPage = parseInt(e.target.dataset.page);
              renderBlogPosts(currentPage);
            });
          });
        };

        renderBlogPosts(currentPage);
        renderPagination();
      } else {
        console.error("Hata: RSS verileri alınamadı.");
      }
    })
    .catch((error) => {
      console.error("Veri alınamadı:", error);
    });
});
