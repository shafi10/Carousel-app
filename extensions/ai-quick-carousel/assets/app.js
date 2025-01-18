function loadLeafletScript(callback) {
  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
}

function initializeSwiper() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

loadLeafletScript(initializeSwiper);
