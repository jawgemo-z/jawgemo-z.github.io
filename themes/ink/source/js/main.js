(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-btn');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function current() {
    return saved() || (media.matches ? 'dark' : 'light');
  }

  function sync() {
    if (btn) btn.textContent = current() === 'dark' ? '浅色' : '深色';
  }

  if (btn) {
    sync();
    btn.addEventListener('click', function () {
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  media.addEventListener('change', function () {
    if (!saved()) {
      root.removeAttribute('data-theme');
      sync();
    }
  });
})();
