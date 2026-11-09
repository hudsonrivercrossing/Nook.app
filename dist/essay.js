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

  // Once on screen: a new card lands loose on the home board, waits, then is sorted into Soon.
  document.querySelectorAll('.triage').forEach(figure => {
    const card = figure.querySelector('.newcomer'), spot = figure.querySelector('.loose-spot'), button = figure.querySelector('.replay');
    const place = () => {   // how far the loose spot is from the card's place in Soon
      const c = card.getBoundingClientRect(), s = spot.getBoundingClientRect();
      card.style.setProperty('--dx', `${s.left + s.width / 2 - (c.left + c.width / 2)}px`);
      card.style.setProperty('--dy', `${s.top + s.height / 2 - (c.top + c.height / 2)}px`);
    };
    const play = () => { figure.classList.remove('on', 'instant'); place(); void figure.offsetWidth; figure.classList.add('on'); };
    if (reduce) { figure.classList.add('instant', 'on'); button.hidden = true; return; }
    button.addEventListener('click', play);
    const watch = new IntersectionObserver(([e]) => { if (e.isIntersecting) { watch.disconnect(); play(); } }, { threshold: 0.6 });
    watch.observe(figure);
  });

  // Once on screen: the home board opens into a board, and that board into another, each from its board card.
  document.querySelectorAll('.nest').forEach(figure => {
    const layers = [...figure.querySelectorAll('.layer')], crumb = figure.querySelector('.crumb-text'), button = figure.querySelector('.replay');
    const ease = 'cubic-bezier(0.65, 0, 0.35, 1)';
    let timers = [];
    const show = n => {
      figure.classList.remove('shown-0', 'shown-1', 'shown-2');
      figure.classList.add(`shown-${n}`);
      crumb.textContent = layers[n].dataset.crumb;
    };
    const open = n => {   // layer n zooms out of its target card; layer n + 1 grows from it
      const from = layers[n], to = layers[n + 1], target = from.querySelector('.target');
      const L = from.getBoundingClientRect(), T = target.getBoundingClientRect();
      const x = T.left - L.left, y = T.top - L.top, sx = L.width / T.width, sy = L.height / T.height;
      to.style.visibility = 'visible';
      from.animate([{ transform: 'none', opacity: 1 }, { transform: `translate(${-x * sx}px, ${-y * sy}px) scale(${sx}, ${sy})`, opacity: 0 }], { duration: 700, easing: ease, fill: 'forwards' });
      to.animate([{ transform: `translate(${x}px, ${y}px) scale(${1 / sx}, ${1 / sy})`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 700, easing: ease });
      timers.push(setTimeout(() => { from.getAnimations().forEach(a => a.cancel()); to.style.visibility = ''; show(n + 1); }, 720));
      crumb.textContent = to.dataset.crumb;
    };
    const reset = () => {
      timers.forEach(clearTimeout); timers = [];
      layers.forEach(l => { l.getAnimations().forEach(a => a.cancel()); l.style.visibility = ''; l.querySelectorAll('.pick').forEach(t => t.classList.remove('pick')); });
      show(0);
    };
    const play = () => {
      reset();
      [[700, () => layers[0].querySelector('.target').classList.add('pick')], [1300, () => open(0)],
       [2900, () => layers[1].querySelector('.target').classList.add('pick')], [3500, () => open(1)]]
        .forEach(([t, f]) => timers.push(setTimeout(f, t)));
    };
    if (reduce) { show(2); button.hidden = true; return; }
    show(0);
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
