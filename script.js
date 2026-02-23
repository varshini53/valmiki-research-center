/* ======================================================
   GLOBAL ENTRY — SINGLE SOURCE OF TRUTH
====================================================== */
document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     LOAD HEADER (ALL PAGES)
  ============================= */
  fetch("header.html")
    .then(res => res.text())
    .then(html => {
      const header = document.getElementById("header-placeholder");
      if (header) header.innerHTML = html;

      // 🔑 INIT HEADER FEATURES ONLY AFTER HEADER LOADS
      initMobileDrawer();
      initDesktopDropdown();
    })
    .catch(err => console.error("Header load error:", err));

  /* =============================
     LOAD FOOTER (ALL PAGES) ✅ ADDED
  ============================= */
  fetch("footer.html")
    .then(res => res.text())
    .then(html => {
      const footer = document.getElementById("footer-placeholder");
      if (footer) footer.innerHTML = html;
    })
    .catch(err => console.error("Footer load error:", err));

  /* =============================
     INIT PAGE FEATURES
  ============================= */
  initGoverningCouncil(); // safe on pages without GC
});


/* ======================================================
   MOBILE DRAWER MENU (ALL PAGES)
====================================================== */
function initMobileDrawer() {

  const navToggle = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  const closeBtn = document.getElementById("drawerClose");
  const eventsToggle = document.getElementById("drawerEventsToggle");

  if (!navToggle || !drawer) return;

  // OPEN DRAWER
  navToggle.addEventListener("click", () => {
    drawer.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // CLOSE DRAWER
  function closeDrawer() {
    drawer.classList.remove("active");
    document.body.style.overflow = "";
  }

  closeBtn?.addEventListener("click", closeDrawer);

  // Click outside drawer
  drawer.addEventListener("click", e => {
    if (e.target === drawer) closeDrawer();
  });

  // Close when any link clicked
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeDrawer);
  });

  // EVENTS (mobile dropdown)
  eventsToggle?.addEventListener("click", () => {
    eventsToggle.parentElement.classList.toggle("open");
  });
}


/* ======================================================
   DESKTOP EVENTS DROPDOWN
====================================================== */
function initDesktopDropdown() {

  const dropdown = document.querySelector(".dropdown");
  const toggle = document.querySelector(".dropdown-toggle");

  if (!dropdown || !toggle) return;

  toggle.addEventListener("click", e => {
    e.preventDefault();
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", e => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
    }
  });
}


/* ======================================================
   GOVERNING COUNCIL — FULLY WORKING
====================================================== */
function initGoverningCouncil() {

  const slider = document.getElementById("gcSlider");
  const cards = document.querySelectorAll(".gc-member-card");
  const dotsContainer = document.getElementById("gcDots");
  const prevBtn = document.getElementById("gcPrev");
  const nextBtn = document.getElementById("gcNext");

  const profileImg = document.getElementById("profileImg");
  const profileName = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");
  const profileBio = document.getElementById("profileBio");
  const profileBox = document.getElementById("gcProfile");

  // GC not present on this page → exit safely
  if (!slider || !cards.length || !dotsContainer) return;

  let currentIndex = 0;
  const gap = 24; // MUST match CSS gap

  /* ---------- DOTS ---------- */
  dotsContainer.innerHTML = "";
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToIndex(i));
    dotsContainer.appendChild(dot);
  });

  function updateDots(index) {
    dotsContainer.querySelectorAll("span")
      .forEach(d => d.classList.remove("active"));
    dotsContainer.children[index]?.classList.add("active");
  }

  function updateActiveCard(index) {
    cards.forEach(c => c.classList.remove("active"));
    cards[index]?.classList.add("active");
  }

  /* ---------- NAVIGATION ---------- */
  function goToIndex(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));
    const cardWidth = cards[0].offsetWidth + gap;

    slider.scrollTo({
      left: cardWidth * currentIndex,
      behavior: "smooth"
    });

    updateDots(currentIndex);
    updateActiveCard(currentIndex);
  }

  /* ---------- SYNC ON SCROLL ---------- */
  slider.addEventListener("scroll", () => {
    const cardWidth = cards[0].offsetWidth + gap;
    currentIndex = Math.round(slider.scrollLeft / cardWidth);
    updateDots(currentIndex);
    updateActiveCard(currentIndex);
  });

  /* ---------- ARROWS ---------- */
  prevBtn?.addEventListener("click", () => {
    goToIndex(currentIndex - 1);
  });

  nextBtn?.addEventListener("click", () => {
    goToIndex(currentIndex + 1);
  });

  /* ---------- CARD CLICK ---------- */
  cards.forEach((card, index) => {
    card.addEventListener("click", () => {

      profileImg.src = card.dataset.img;
      profileName.textContent = card.dataset.name;
      profileRole.textContent = card.dataset.role;
      profileBio.textContent = card.dataset.bio;

      goToIndex(index);

      // Smooth scroll to profile (no header cut)
      const offset = 130;
      const y =
        profileBox.getBoundingClientRect().top +
        window.pageYOffset -
        offset;

      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}