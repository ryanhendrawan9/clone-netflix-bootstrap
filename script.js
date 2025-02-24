document.addEventListener("DOMContentLoaded", () => {
  // Navbar Scroll Effect
  const navbar = document.getElementById("mainNavbar");

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  updateNavbar(); // Cek saat halaman dimuat
  window.addEventListener("scroll", updateNavbar);

  // Video Overlay
  const videoLinks = document.querySelectorAll(".video-link");
  const videoOverlay = document.querySelector(".video-overlay");
  const videoContainer = document.querySelector(".video-container"); // Pastikan elemen ini ada
  const videoIframe = videoOverlay.querySelector("iframe");

  // Pastikan tombol "Close" ada dan di dalam .video-container
  let closeButton = document.querySelector(".close-button");
  if (!closeButton) {
    closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("close-button");
    videoContainer.appendChild(closeButton);
  }

  // Event listener untuk menampilkan video overlay
  videoLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const trailerUrl = link.getAttribute("data-trailer-url");
      videoIframe.src = trailerUrl;
      videoOverlay.classList.add("active");
    });
  });

  // Fungsi untuk menutup video overlay
  function closeVideoOverlay() {
    videoOverlay.classList.remove("active");
    setTimeout(() => {
      videoIframe.src = ""; // Hentikan video setelah overlay hilang
    }, 300);
  }

  // Event listener tombol "Close"
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Mencegah event klik dari bubbling ke videoOverlay
    closeVideoOverlay();
  });

  // Tutup overlay saat klik di luar video-container
  videoOverlay.addEventListener("click", (event) => {
    if (event.target === videoOverlay) {
      closeVideoOverlay();
    }
  });

  // Tutup video dengan tombol Escape (Esc)
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && videoOverlay.classList.contains("active")) {
      closeVideoOverlay();
    }
  });
});
