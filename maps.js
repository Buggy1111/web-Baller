// map.js

// 1) Funkce, která skutečně inicializuje / načte Google mapu
function initMap() {
  // pokud používáte google.maps.Load:
  if (window.google && google.maps && google.maps.Load) {
    google.maps.Load({
      // ...vaše parametry (callback: onApiLoad, apiKey, region atd.)...
      client: 'google-maps-embed',
      libraries: ['geometry','search'],
      language: 'cs',
      region: 'CZ',
      callbackName: 'onApiLoad'
    });
  }
  // případně pokud používáte new google.maps.Map(…):
  // const map = new google.maps.Map(document.getElementById('map'), { /* ... */ });
}

// 2) Fallback pro offline uživatele
function showOfflinePlaceholder() {
  const container = document.getElementById('map-container');
  if (!container) return;
  container.innerHTML = 
    '<div class="map-offline">Mapa není k dispozici offline.<br>'
    + '<a href="https://www.google.com/maps" target="_blank">'
    + 'Zobrazit online »</a></div>';
}

// 3) Rozhodnutí, kdy spustit mapu vs. fallback
if (navigator.onLine) {
  initMap();
} else {
  showOfflinePlaceholder();
  // a jakmile uživatel bude znovu online, mapu doinicializujeme
  window.addEventListener('online', () => {
    initMap();
  }, { once: true });
}
