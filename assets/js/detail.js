/**
 * detail.js
 * Reads ?id= from the URL, looks it up in window.PROJECT_DATA, and renders
 * a concise detail view into #detail-root on project.html.
 */
(function () {
  "use strict";

  function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function render() {
    const root = document.getElementById("detail-root");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const data = id && window.PROJECT_DATA ? window.PROJECT_DATA[id] : null;

    if (!data) {
      root.innerHTML =
        '<div class="text-center py-5">' +
        "<h2>Project not found</h2>" +
        "<p>This item does not have a dedicated detail page yet.</p>" +
        '<a href="index.html#portfolio" class="btn-glow" style="display:inline-block;margin-top:14px;">Back to Portfolio</a>' +
        "</div>";
      return;
    }

    document.title = data.title + " - Kwabena D. Ntim's Portfolio";
    const isCert = data.type === "certification";

    let html = '<div class="glass-card detail-card ' + (isCert ? "detail-card-cert" : "") + '">';

    html += '<div class="detail-hero">';
    if (data.videoSrc) {
      html +=
        '<video controls poster="' + esc(data.hero) + '" class="detail-hero-media">' +
        '<source src="' + esc(data.videoSrc) + '" type="video/mp4"></video>';
    } else {
      html += '<img src="' + esc(data.hero) + '" alt="' + esc(data.title) + '" class="detail-hero-media">';
    }
    html += "</div>";

    html += '<div class="detail-body">';
    html += '<span class="detail-tag">' + esc(data.tag || "") + "</span>";
    html += "<h1>" + esc(data.title) + "</h1>";

    (data.summary || []).forEach((p) => { html += "<p>" + esc(p) + "</p>"; });

    if (data.tools && data.tools.length) {
      html += '<div class="detail-tools">';
      data.tools.forEach((t) => { html += '<span class="project-tag">' + esc(t) + "</span>"; });
      html += "</div>";
    }

    if (data.liveUrl) {
      html +=
        '<a href="' + esc(data.liveUrl) + '" target="_blank" rel="noopener" class="btn-glow" style="display:inline-block;margin-top:10px;">' +
        'View Live <i class="bi bi-box-arrow-up-right"></i></a>';
    }
    if (data.codeUrl) {
      html +=
        '<a href="' + esc(data.codeUrl) + '" target="_blank" rel="noopener" class="btn-outline-glow" style="display:inline-block;margin-top:10px;margin-left:10px;">' +
        'View Code <i class="bi bi-github"></i></a>';
    }

    if (data.gallery && data.gallery.length) {
      html += '<h3 class="detail-gallery-title">More from this project</h3>';
      html += '<div class="detail-gallery">';
      data.gallery.forEach((g) => {
        html +=
          '<figure><img src="' + esc(g.src) + '" alt="' + esc(g.caption || "") + '">' +
          (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") +
          "</figure>";
      });
      html += "</div>";
    }

    html += "</div></div>";
    root.innerHTML = html;
  }

  document.addEventListener("DOMContentLoaded", render);
})();
