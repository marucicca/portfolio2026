const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("is-open");
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const hero = document.querySelector(".hero");

if (hero) {
  requestAnimationFrame(() => {
    hero.classList.add("is-visible");
  });

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const shiftX = ((event.clientX - rect.left) / rect.width - 0.5) * 26;
    const shiftY = ((event.clientY - rect.top) / rect.height - 0.5) * 20;

    hero.style.setProperty("--hero-shift-x", shiftX.toFixed(2));
    hero.style.setProperty("--hero-shift-y", shiftY.toFixed(2));
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-shift-x", "0");
    hero.style.setProperty("--hero-shift-y", "0");
  });
}

const rotatingLines = document.querySelectorAll(".hero-copy-rotating");
let activeLineIndex = 0;

if (rotatingLines.length > 1) {
  window.setInterval(() => {
    const currentLine = rotatingLines[activeLineIndex];
    const nextIndex = (activeLineIndex + 1) % rotatingLines.length;
    const nextLine = rotatingLines[nextIndex];

    currentLine.classList.add("is-exiting");
    currentLine.classList.remove("is-active");
    nextLine.classList.add("is-active");

    window.setTimeout(() => {
      currentLine.classList.remove("is-exiting");
    }, 720);

    activeLineIndex = nextIndex;
  }, 3600);
}
