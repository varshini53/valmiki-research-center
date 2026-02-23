const thumbs = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("mainImage");
const mainTitle = document.getElementById("mainTitle");
const mainDesc = document.getElementById("mainDesc");

thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {

    // Active state
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");

    // Update image
    mainImage.src = thumb.dataset.image;

    // Update content
    mainTitle.textContent = thumb.dataset.title;
    mainDesc.innerHTML = thumb.dataset.desc;
  });
});
document.querySelectorAll(".policy-header").forEach(header => {
  header.addEventListener("click", () => {
    const box = header.parentElement;
    const icon = header.querySelector("i");

    box.classList.toggle("active");

    icon.classList.toggle("fa-plus");
    icon.classList.toggle("fa-minus");
  });
});

