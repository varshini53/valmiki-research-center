document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     CORE VALUES ACCORDION
  ================================ */

  const headers = document.querySelectorAll(".policy-header");

  // Open first accordion by default
  if (headers.length > 0) {
    const firstBox = headers[0].parentElement;
    const firstIcon = headers[0].querySelector("i");

    firstBox.classList.add("active");
    firstIcon.classList.remove("fa-plus");
    firstIcon.classList.add("fa-minus");
  }

  headers.forEach(header => {
    header.addEventListener("click", () => {
      const box = header.parentElement;
      const icon = header.querySelector("i");
      const isOpen = box.classList.contains("active");

      // Close all accordions
      headers.forEach(h => {
        h.parentElement.classList.remove("active");
        const ic = h.querySelector("i");
        ic.classList.remove("fa-minus");
        ic.classList.add("fa-plus");
      });

      // Open clicked accordion if it was closed
      if (!isOpen) {
        box.classList.add("active");
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
      }
    });
  });


  /* ===============================
     FOUNDER SECTION IMAGE SWITCH
  ================================ */

  const fThumbs = document.querySelectorAll(".f-thumb");
  const fMainImage = document.getElementById("founderMainImage");
  const fTitle = document.getElementById("founderTitle");
  const fDesc = document.getElementById("founderDesc");

  fThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {

      fThumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");

      fMainImage.src = thumb.dataset.image;
      fTitle.textContent = thumb.dataset.title;
      fDesc.textContent = thumb.dataset.desc;
    });
  });

});
