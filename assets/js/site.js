/**
 * site.js
 * Original JavaScript for Kwabena Danso Ntim's portfolio.
 * Uses a few separately-licensed vendor libraries (AOS, Typed.js, PureCounter,
 * GLightbox, Swiper) alongside hand-written logic below.
 */
(function () {
  "use strict";

  /* ---------------- Mobile nav toggle ---------------- */
  function initNavToggle() {
    const toggle = document.querySelector(".header-toggle");
    const header = document.getElementById("header");
    if (!toggle || !header) return;
    toggle.addEventListener("click", () => {
      header.classList.toggle("header-show");
      toggle.classList.toggle("bi-list");
      toggle.classList.toggle("bi-x");
    });
    document.querySelectorAll(".navmenu a").forEach((a) => {
      a.addEventListener("click", () => {
        if (window.innerWidth < 1200) {
          header.classList.remove("header-show");
          toggle.classList.add("bi-list");
          toggle.classList.remove("bi-x");
        }
      });
    });
  }

  /* ---------------- Scrollspy: highlight active nav link ---------------- */
  function initScrollspy() {
    const links = document.querySelectorAll(".navmenu a[href^='#']");
    if (!links.length) return;
    const sections = Array.from(links)
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || !sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.remove("active"));
            const match = document.querySelector(`.navmenu a[href="#${entry.target.id}"]`);
            if (match) match.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }

  /* ---------------- Scroll-to-top button ---------------- */
  function initScrollTop() {
    const btn = document.getElementById("scroll-top");
    if (!btn) return;
    window.addEventListener("scroll", () => {
      btn.classList.toggle("show-scroll", window.scrollY > 300);
    });
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Hero particle network ---------------- */
  function initHeroParticles() {
    const hero = document.querySelector("#hero");
    if (!hero) return;
    const canvas = document.createElement("canvas");
    canvas.id = "hero-particles";
    hero.insertBefore(canvas, hero.firstChild.nextSibling);
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
      const count = Math.min(90, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6
      }));
    }
    function step() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 242, 224, 0.55)"; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(139, 107, 255, " + (0.18 * (1 - dist / 130)) + ")";
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      if (!reduceMotion) requestAnimationFrame(step);
    }
    resize();
    window.addEventListener("resize", resize);
    step();
    if (reduceMotion) step();
  }

  /* ---------------- Cursor glow ---------------- */
  function initCursorGlow() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.appendChild(glow);
    let raf = null;
    document.addEventListener("mousemove", (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        raf = null;
      });
    });
  }

  /* ---------------- Tilt on hover ---------------- */
  function initTilt() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll(".service-item, .stats-item, .testimonial-item, .portfolio-card").forEach((el) => {
      el.style.willChange = "transform";
      el.addEventListener("mousemove", (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-2px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------------- Skill chip reveal ---------------- */
  function initChipReveal() {
    const rows = document.querySelectorAll(".chip-row");
    if (!rows.length) return;
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".chip").forEach((c) => c.classList.add("chip-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".chip").forEach((chip, i) => {
            setTimeout(() => chip.classList.add("chip-visible"), i * 45);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    rows.forEach((r) => observer.observe(r));
  }

  /* ---------------- Hero scroll cue ---------------- */
  function initScrollCue() {
    const hero = document.querySelector("#hero");
    if (!hero) return;
    const cue = document.createElement("div");
    cue.className = "hero-scroll-cue";
    hero.appendChild(cue);
  }

  /* ---------------- Portfolio filter (vanilla, no Isotope dependency) ---------------- */
  function initPortfolioFilter() {
    const filters = document.querySelectorAll(".portfolio-filters li");
    const items = document.querySelectorAll(".portfolio-item");
    if (!filters.length || !items.length) return;

    function applyFilter(filter) {
      items.forEach((item) => {
        const show = filter === "*" || item.classList.contains(filter.replace(".", ""));
        item.classList.toggle("is-visible", show);
      });
    }
    applyFilter("*");

    filters.forEach((li) => {
      li.addEventListener("click", () => {
        filters.forEach((f) => f.classList.remove("filter-active"));
        li.classList.add("filter-active");
        applyFilter(li.getAttribute("data-filter"));
      });
    });
  }

  /* ---------------- Vendor library inits ---------------- */
  function initVendors() {
    if (window.AOS) AOS.init({ duration: 600, easing: "ease-in-out", once: true, mirror: false });

    if (window.Typed) {
      const el = document.querySelector(".typed");
      if (el) {
        new Typed(el, {
          strings: el.getAttribute("data-typed-items").split(","),
          typeSpeed: 50, backSpeed: 30, backDelay: 1800, loop: true
        });
      }
    }

    if (window.PureCounter) new PureCounter();

    if (window.GLightbox) GLightbox({ selector: ".glightbox" });

    if (window.Swiper) {
      document.querySelectorAll(".swiper").forEach((el) => {
        const configEl = el.querySelector(".swiper-config");
        const config = configEl ? JSON.parse(configEl.textContent.trim()) : {};
        new Swiper(el, config);
      });
    }
  }

  /* ---------------- Contact form (Formspree AJAX) ---------------- */
  function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "Sending...";
      status.className = "form-status";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (res.ok) {
          status.textContent = "Thanks! Your message has been sent.";
          status.className = "form-status success";
          form.reset();
        } else {
          const data = await res.json().catch(() => null);
          status.textContent = data && data.errors
            ? data.errors.map((e) => e.message).join(", ")
            : "Something went wrong. Please try again.";
          status.className = "form-status error";
        }
      } catch (err) {
        status.textContent = "Submission failed. Please try again.";
        status.className = "form-status error";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initScrollspy();
    initScrollTop();
    initPortfolioFilter();
    initVendors();
    initContactForm();
  });

  window.addEventListener("load", () => {
    initHeroParticles();
    initCursorGlow();
    initTilt();
    initChipReveal();
    initScrollCue();
  });
})();
