
// gallery.js s šipkami v modal zoomu
document.addEventListener("DOMContentLoaded", function() {
  // Otevírání hlavní galerie
  document.querySelectorAll('.open-gallery').forEach(btn => {
    btn.addEventListener('click', function() {
      const gal = document.getElementById('gallery-' + this.dataset.gallery);
      if (gal) gal.style.display = 'flex';
    });
  });
  document.querySelectorAll('.close-gallery').forEach(cl => {
    cl.addEventListener('click', function() {
      this.closest('.lightbox-gallery').style.display = 'none';
    });
  });
  window.addEventListener('click', function(e) {
    if (e.target.classList && e.target.classList.contains('lightbox-gallery')) {
      e.target.style.display = 'none';
    }
  });

  // --------- ZOOM + ŠIPKY ---------
  const zoomModal = document.getElementById('img-zoom-modal');
  const zoomImg = document.getElementById('img-zoom-large');
  const zoomClose = document.getElementById('img-zoom-close');
  const zoomPrev = document.getElementById('img-zoom-prev');
  const zoomNext = document.getElementById('img-zoom-next');

  let galleryImages = [];
  let currentIdx = 0;

  function showZoom(idx) {
    if (galleryImages.length === 0) return;
    currentIdx = (idx + galleryImages.length) % galleryImages.length;
    zoomImg.src = galleryImages[currentIdx].src;
    zoomImg.alt = galleryImages[currentIdx].alt;
    zoomModal.style.display = 'flex';
  }

  // Klik na obrázek v galerii => otevři modal a načti všechny obrázky v aktuální galerii
  document.querySelectorAll('.gallery-content img').forEach((img, i, nodeList) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      galleryImages = Array.from(this.parentNode.querySelectorAll('img'));
      currentIdx = galleryImages.indexOf(this);
      showZoom(currentIdx);
    });
  });

  // Šipky vlevo/vpravo + zavření
  zoomPrev.addEventListener('click', function(e) {
    e.stopPropagation();
    showZoom(currentIdx - 1);
  });
  zoomNext.addEventListener('click', function(e) {
    e.stopPropagation();
    showZoom(currentIdx + 1);
  });
  zoomClose.addEventListener('click', function() {
    zoomModal.style.display = 'none';
    zoomImg.src = "";
    zoomImg.alt = "";
    galleryImages = [];
    currentIdx = 0;
  });
  zoomModal.addEventListener('click', function(e) {
    if (e.target === zoomModal) {
      zoomModal.style.display = 'none';
      zoomImg.src = "";
      zoomImg.alt = "";
      galleryImages = [];
      currentIdx = 0;
    }
  });

  // Podpora klávesnice (←/→/Esc)
  window.addEventListener('keydown', function(e) {
    if (!zoomModal || zoomModal.style.display !== 'flex') return;
    if (e.key === "ArrowLeft") {
      showZoom(currentIdx - 1);
    }
    if (e.key === "ArrowRight") {
      showZoom(currentIdx + 1);
    }
    if (e.key === "Escape") {
      zoomModal.style.display = 'none';
      zoomImg.src = "";
      zoomImg.alt = "";
      galleryImages = [];
      currentIdx = 0;
    }
  });
});
