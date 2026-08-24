const root = document.documentElement;
root.classList.add("js");

function initPortfolio() {
  const isProjectDocument = Boolean(document.querySelector(".project-hero"));

  if (isProjectDocument) {
    root.classList.add("project-document");
  }

  const progressBar = document.querySelector(".scroll-progress");

  function updateProgress() {
    if (!progressBar) return;
    const scrollable = document.body.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
  );

  document.querySelectorAll(".reveal, .detail, .media-placeholder, .visual-card, .flow li").forEach((el, index) => {
    el.style.setProperty("--reveal-delay", `${Math.min(index, 3) * 45}ms`);
    observer.observe(el);
  });

  document.querySelectorAll(".work-grid, .ai-grid, .glance-grid, .detail-grid, .media-grid, .visual-gallery, .flow").forEach((group) => {
    Array.from(group.children).forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 85}ms`);
    });
  });

  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
      card.style.setProperty("--shine-x", `${((x + 0.5) * 100).toFixed(1)}%`);
      card.style.setProperty("--shine-y", `${((y + 0.5) * 100).toFixed(1)}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });

  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));
  const workCards = Array.from(document.querySelectorAll(".work-card[data-filters]"));
  const workCount = document.querySelector("[data-work-count]");

  if (filterButtons.length && workCards.length) {
    let activeFilter = "all";

    const applyWorkState = () => {
      let visibleCount = 0;

      workCards.forEach((card) => {
        const filters = (card.dataset.filters || "").split(" ").filter(Boolean);
        const matchesFilter = activeFilter === "all" || filters.includes(activeFilter);
        card.classList.toggle("is-hidden", !matchesFilter);
        if (matchesFilter) visibleCount += 1;
      });

      filterButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.filter === activeFilter);
      });

      if (workCount) {
        workCount.textContent = String(visibleCount);
      }

    };

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";
        applyWorkState();
      });
    });

    applyWorkState();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolio, { once: true });
} else {
  initPortfolio();
}
