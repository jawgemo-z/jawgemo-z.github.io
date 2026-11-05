(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-btn');

  function saved() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  function current() {
    return saved() || 'dark';
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
})();
