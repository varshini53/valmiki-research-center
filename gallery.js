/* ================================
   SINGLE PAGE GALLERY (NO VIDEOS)
================================ */

const galleryData = {
  shankharavam: [
    "images/shankharavam1.jpg",
    "images/shankharavam2.jpg",
    "images/shankharavam3.jpg",
    "images/shankharavam4.jpg"
  ],
  scholars: [
    "images/scholars1.jpg",
    "images/scholars2.jpg",
    "images/scholars3.jpg"
  ],
  cultural: [
    "images/cultural1.jpg",
    "images/cultural2.jpg",
    "images/cultural3.jpg"
  ]
};

const buttons = document.querySelectorAll(".event-btn");
const photoGrid = document.getElementById("photoGrid");

/* Load gallery images */
function loadGallery(eventKey) {
  photoGrid.innerHTML = "";

  galleryData[eventKey].forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Gallery Image";
    photoGrid.appendChild(img);
  });
}

/* Handle event button click */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadGallery(btn.dataset.event);
  });
});

/* Load default event */
loadGallery("shankharavam");