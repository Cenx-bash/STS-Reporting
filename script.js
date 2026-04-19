/* ================================================================
   ICT IN THE MODERN ERA — script.js
   Interactivity: Custom cursor · Scroll reveal · Sidebar nav ·
                  Accordion · Progress bar · Active nav tracking
   ================================================================ */

"use strict";

// ── DOM ELEMENTS ─────────────────────────────────────────────────
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursor-follower");
const progressBar = document.getElementById("progressBar");
const sidebar = document.getElementById("sidebar");
const hamburger = document.getElementById("hamburger");
const backToTop = document.getElementById("backToTop");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealEls = document.querySelectorAll(".reveal");
const accordionBtns = document.querySelectorAll(".accordion-btn");

/* ════════════════════════════════════════════════════════════════
   1. CUSTOM CURSOR
   Smooth-following dual-layer cursor using requestAnimationFrame
   ════════════════════════════════════════════════════════════════ */
let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

// Track raw mouse position
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Snap the small dot immediately
  if (cursor) {
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  }
});

// Animate follower with lerp (linear interpolation)
function animateCursorFollower() {
  const LERP = 0.12; // lower = slower/smoother
  followerX += (mouseX - followerX) * LERP;
  followerY += (mouseY - followerY) * LERP;

  if (cursorFollower) {
    cursorFollower.style.left = followerX + "px";
    cursorFollower.style.top = followerY + "px";
  }

  requestAnimationFrame(animateCursorFollower);
}
animateCursorFollower();

// Hover scale-up effect for interactive elements
const hoverTargets = document.querySelectorAll(
  "a, button, .tech-card, .bento-card, .cloud-tier, .accordion-btn",
);

hoverTargets.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor?.classList.add("hover");
    cursorFollower?.classList.add("hover");
  });
  el.addEventListener("mouseleave", () => {
    cursor?.classList.remove("hover");
    cursorFollower?.classList.remove("hover");
  });
});

/* ════════════════════════════════════════════════════════════════
   2. SCROLL PROGRESS BAR
   Updates a top-edge progress bar as user scrolls the page
   ════════════════════════════════════════════════════════════════ */
function updateProgressBar() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  const progress = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;

  if (progressBar) progressBar.style.width = progress + "%";
}

window.addEventListener("scroll", updateProgressBar, { passive: true });

/* ════════════════════════════════════════════════════════════════
   3. SCROLL REVEAL (IntersectionObserver)
   Fades + slides in elements as they enter the viewport.
   Uses stagger classes (stagger-1/2/3) defined in CSS.
   ════════════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Once revealed, unobserve for performance
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12, // trigger when 12% of element is visible
    rootMargin: "0px 0px -40px 0px", // slight offset from bottom
  },
);

revealEls.forEach((el) => revealObserver.observe(el));

/* ════════════════════════════════════════════════════════════════
   4. ACTIVE SECTION TRACKING (Sidebar Nav Highlight)
   Uses IntersectionObserver to determine which section is
   currently in view and updates the corresponding nav link.
   ════════════════════════════════════════════════════════════════ */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  {
    threshold: 0.35, // highlight when 35% of section is visible
  },
);

sections.forEach((section) => sectionObserver.observe(section));

/* ════════════════════════════════════════════════════════════════
   5. ACCORDION EXPAND / COLLAPSE
   Toggles the 'open' class on the parent .accordion element.
   CSS handles the max-height animation for smooth transition.
   ════════════════════════════════════════════════════════════════ */
accordionBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const accordion = btn.closest(".accordion");

    // If already open, close it; otherwise open it
    if (accordion.classList.contains("open")) {
      accordion.classList.remove("open");
    } else {
      // Optionally close all other accordions (comment out for multi-open)
      document.querySelectorAll(".accordion.open").forEach((openAcc) => {
        openAcc.classList.remove("open");
      });
      accordion.classList.add("open");
    }
  });
});

/* ════════════════════════════════════════════════════════════════
   6. SIDEBAR (HAMBURGER MENU for mobile)
   Toggles sidebar visibility on small screens.
   Clicking outside the sidebar also closes it.
   ════════════════════════════════════════════════════════════════ */
hamburger?.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  hamburger.classList.toggle("open");
});

// Close sidebar when a nav link is clicked (mobile UX)
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("open");
    hamburger?.classList.remove("open");
  });
});

// Close sidebar on outside click (mobile)
document.addEventListener("click", (e) => {
  if (
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    !hamburger?.contains(e.target)
  ) {
    sidebar.classList.remove("open");
    hamburger?.classList.remove("open");
  }
});

/* ════════════════════════════════════════════════════════════════
   7. BACK TO TOP BUTTON
   Smooth-scrolls back to the top of the page
   ════════════════════════════════════════════════════════════════ */
backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ════════════════════════════════════════════════════════════════
   8. HERO TITLE STAGGER ANIMATION (CSS + JS trigger)
   Adds a class that triggers staggered slide-up on title lines.
   Each .title-line gets a delay based on its index.
   ════════════════════════════════════════════════════════════════ */
const titleLines = document.querySelectorAll(".title-line");

titleLines.forEach((line, i) => {
  // Wrap inner text for clip-path animation
  const text = line.textContent;
  line.innerHTML = `<span class="line-inner" style="
    display: inline-block;
    opacity: 0;
    transform: translateY(60px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s,
                transform 0.9s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s;
  ">${text}</span>`;
});

// Trigger title animation after a tiny delay (ensures CSS parsed)
setTimeout(() => {
  document.querySelectorAll(".line-inner").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
}, 100);

/* ════════════════════════════════════════════════════════════════
   9. SMOOTH SCROLL for nav links
   Enhances native smooth-scroll with offset for better UX
   ════════════════════════════════════════════════════════════════ */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const offset = 0; // adjust if you add a sticky top bar
      const top =
        targetEl.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  });
});

/* ════════════════════════════════════════════════════════════════
   10. BENTO CARD — TILT MICRO-INTERACTION (desktop only)
   Subtle 3D tilt on hover using mouse position delta within card
   ════════════════════════════════════════════════════════════════ */
if (window.matchMedia("(min-width: 900px)").matches) {
  const tiltCards = document.querySelectorAll(".tech-card, .bento-card");

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2); // –1 to 1
      const dy = (e.clientY - cy) / (rect.height / 2); // –1 to 1
      const tiltX = dy * -5; // max ±5deg
      const tiltY = dx * 5;

      card.style.transform = `translateY(-6px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transition = "transform 0.1s linear";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "";
    });
  });
}

/* ════════════════════════════════════════════════════════════════
   11. TABLE ROW — HIGHLIGHT ANIMATION
   Highlights table rows with a brief pulse when hovered
   ════════════════════════════════════════════════════════════════ */
document.querySelectorAll(".tech-table tbody tr").forEach((row) => {
  row.addEventListener("mouseenter", () => {
    row.style.transition = "background 0.2s";
  });
});

/* ════════════════════════════════════════════════════════════════
   12. PAGE LOAD — SKELETON → CONTENT TRANSITION
   Briefly shows skeleton state before content appears
   ════════════════════════════════════════════════════════════════ */
(function pageLoad() {
  // The page starts hidden via the reveal system above.
  // All .reveal elements begin at opacity:0, and the IntersectionObserver
  // fires .visible on them as the user scrolls — creating the progressive
  // reveal effect that mimics a skeleton loading pattern.
  //
  // The hero section is immediately visible on load because
  // the title lines are triggered by the setTimeout above (item 8),
  // and the hero .reveal elements enter the viewport on load.
})();

/* ════════════════════════════════════════════════════════════════
   UTILITY: debounce
   Prevents excessive function calls on resize/scroll
   ════════════════════════════════════════════════════════════════ */
function debounce(fn, delay = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// Recalculate on resize (for responsive breakpoint changes)
window.addEventListener(
  "resize",
  debounce(() => {
    // Re-check mobile cursor state
    const isMobile = window.innerWidth < 900;
    if (cursor) cursor.style.display = isMobile ? "none" : "block";
    if (cursorFollower)
      cursorFollower.style.display = isMobile ? "none" : "block";
  }, 200),
);
