// sidepanel.js – jednoduché přepínání bočního panelu, přesměrování na kontakty a přidání ikonky
function togglePanel() {
  const panel = document.getElementById('sidePanel');
  if (panel) {
    panel.classList.toggle('open');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Tlačítko pro otevření/zavření bočního panelu
  const panelToggleBtn = document.getElementById('panelToggleBtn');
  if (panelToggleBtn) {
    panelToggleBtn.addEventListener('click', togglePanel);
  }

  // Odkaz na kontakty v bočním panelu
  const contactLink = document.getElementById('contactLink');
  if (contactLink) {
    // Přidání ikonky obálky před text odkazu (vyžaduje Font Awesome)
    contactLink.innerHTML = '<i class="fa fa-envelope" aria-hidden="true"></i> ' + contactLink.textContent.trim();

    contactLink.addEventListener('click', (e) => {
      e.preventDefault();      
      togglePanel();
      // Přesměrování na stránku s kontakty a formulářem
      window.location.href = 'kontakt.html#kontakt-form';
    });
  }
});
