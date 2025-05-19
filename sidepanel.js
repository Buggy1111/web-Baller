// sidepanel.js – jednoduché přepínání bočního panelu
function togglePanel() {
  const panel = document.getElementById('sidePanel');
  if (panel) {
    panel.classList.toggle('open');
  }
}
