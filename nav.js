// Highlight active bottom-nav icon based on current page
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.footer-icons a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes(path)) {
      a.classList.add('active');
    }
  });
});
