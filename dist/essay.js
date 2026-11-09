// Essays: two drawings that move. The corner one plays once, the first time it is mostly on screen, and Replay plays it
// again. The river runs while it is on screen and the page is visible, and can be paused. Under reduced motion both
// show their finished state and the river stands still.
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('still');

  document.querySelectorAll('.corner').forEach(figure => {
    const button = figure.querySelector('.replay');
    const play = () => {
      figure.classList.add('instant');
      figure.classList.remove('on');
      void figure.offsetWidth;
      figure.classList.remove('instant');
      requestAnimationFrame(() => figure.classList.add('on'));
    };
    if (reduce) { figure.classList.add('instant', 'on'); button.hidden = true; return; }
    button.addEventListener('click', play);
    const watch = new IntersectionObserver(([e]) => { if (e.isIntersecting) { watch.disconnect(); play(); } }, { threshold: 0.6 });
    watch.observe(figure);
  });

  document.querySelectorAll('.river').forEach(figure => {
    const svg = figure.querySelector('svg'), button = figure.querySelector('.replay');
    let visible = false, paused = false;
    const sync = () => {
      const run = visible && !paused && !document.hidden;
      run ? svg.unpauseAnimations() : svg.pauseAnimations();
      button.textContent = paused ? 'Play' : 'Pause';
    };
    if (reduce) { svg.pauseAnimations(); svg.setCurrentTime(1.7); figure.classList.add('on'); button.hidden = true; return; }
    svg.pauseAnimations();
    button.addEventListener('click', () => { paused = !paused; sync(); });
    document.addEventListener('visibilitychange', sync);
    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) figure.classList.add('on');
      sync();
    }, { threshold: 0.4 }).observe(figure);
  });
})();
