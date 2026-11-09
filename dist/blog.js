// Field notes: each board in a post is built in front of the reader, the first time it is mostly on screen, with
// Nook's own tools (the toolbar button is pressed, then what it makes appears). Replay builds it again. Under reduced
// motion the finished board shows at once.
(() => {
  const STORY = {
    paste: [
      [300, 'tool', 'link'], [450, 'add', '.l1'], [1350, 'load', '.l1'],
      [1900, 'tool', 'link'], [2050, 'add', '.l2'], [2950, 'load', '.l2'],
      [3500, 'tool', 'link'], [3650, 'add', '.l3'], [4550, 'load', '.l3'],
      [5400, 'tool', 'region'], [5550, 'add', '.region']
    ],
    done: [
      [300, 'tool', 'column'], [450, 'add', '.c1'], [650, 'add', '.c1 .card'],
      [1500, 'tool', 'column'], [1650, 'add', '.c2'], [1850, 'add', '.done-card'],
      [2700, 'tool', 'link'], [2850, 'add', '.listing'], [3750, 'load', '.listing'],
      [4200, 'tool', 'text'], [4350, 'add', '.fridge'], [4400, 'type', '.fridge'],
      [6300, 'tool', 'connect'], [6450, 'wire', '.fridge', '.listing'],
      [7900, 'lift', '.mover'], [8050, 'move', '.mover', '.c2 .column-title'], [8950, 'tick', '.mover']
    ]
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  function layoutWire(pane, fromSel, toSel) {   // a soft curve from one card's facing edge to the other's, label at the middle
    const box = pane.getBoundingClientRect();
    const r = s => { const q = pane.querySelector(s).getBoundingClientRect(); return { l: q.left - box.left, t: q.top - box.top, r: q.right - box.left, b: q.bottom - box.top }; };
    const a = r(fromSel), b = r(toSel);
    const ac = [(a.l + a.r) / 2, (a.t + a.b) / 2], bc = [(b.l + b.r) / 2, (b.t + b.b) / 2];
    const across = b.l > a.r || b.r < a.l;
    const axis = across ? 0 : 1, sign = Math.sign(across ? bc[0] - ac[0] : bc[1] - ac[1]) || 1;
    let p0, p3;
    if (across) {
      p0 = [sign > 0 ? a.r + 4 : a.l - 4, Math.min(Math.max(bc[1], a.t + 12), a.b - 12)];
      p3 = [sign > 0 ? b.l - 6 : b.r + 6, Math.min(Math.max(ac[1], b.t + 12), b.b - 12)];
    } else {
      p0 = [Math.min(Math.max(bc[0], a.l + 16), a.r - 16), sign > 0 ? a.b + 4 : a.t - 4];
      p3 = [Math.min(Math.max(ac[0], b.l + 16), b.r - 16), sign > 0 ? b.t - 6 : b.b + 6];
    }
    const span = Math.max(14, Math.abs(p3[axis] - p0[axis]) / 2);
    const c1 = [...p0], c2 = [...p3];
    c1[axis] += sign * span; c2[axis] -= sign * span;
    const [wire, head] = pane.querySelectorAll('.wires path');
    wire.setAttribute('d', `M${p0} C${c1} ${c2} ${p3}`);
    const back = axis === 0 ? [-sign * 7, 0] : [0, -sign * 7], side = axis === 0 ? [0, 5] : [5, 0];
    head.setAttribute('d', `M${p3[0] + back[0] - side[0]},${p3[1] + back[1] - side[1]} L${p3} L${p3[0] + back[0] + side[0]},${p3[1] + back[1] + side[1]}`);
    const mid = [0, 1].map(i => 0.125 * p0[i] + 0.375 * c1[i] + 0.375 * c2[i] + 0.125 * p3[i]);
    const label = pane.querySelector('.wire-label');
    label.style.left = mid[0] + 'px';
    label.style.top = mid[1] + 'px';
    pane.dataset.wire = `${fromSel}|${toSel}`;
  }

  // A card moves into another column: every card that shifts slides from where it was (FLIP), the moved one on a
  // small arc (760ms); then it is simply part of that column.
  function move(pane, sel, afterSel, instant) {
    const card = pane.querySelector(sel), after = pane.querySelector(afterSel);
    const cards = [...pane.querySelectorAll('.column .card')];
    const first = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
    after.after(card);
    card.classList.remove('lifted');
    if (instant || !card.animate) return;
    cards.forEach(c => {
      const was = first.get(c), now = c.getBoundingClientRect();
      const dx = was.left - now.left, dy = was.top - now.top;
      if (!dx && !dy) return;
      const frames = c === card
        ? [{ transform: `translate(${dx}px, ${dy}px) scale(1.03)` }, { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 16}px) rotate(-2deg) scale(1.04)`, offset: 0.5 }, { transform: 'none' }]
        : [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }];
      c.animate(frames, { duration: c === card ? 760 : 420, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' });
    });
  }

  function type(el, instant, timers) {
    const full = el.dataset.type;
    if (instant) { el.textContent = full; return; }
    const chars = [...full], each = Math.min(1600, Math.max(700, chars.length * 45)) / chars.length;
    el.textContent = '';
    chars.forEach((_, i) => timers.push(setTimeout(() => { el.textContent = chars.slice(0, i + 1).join(''); }, each * (i + 1))));
  }

  document.querySelectorAll('.demo').forEach(figure => {
    const board = figure.querySelector('.board'), pill = board.querySelector('.pill');
    const story = STORY[figure.dataset.demo];
    const blank = board.querySelector('.pane').outerHTML;   // the empty board, to start again from
    let timers = [];

    function act([, action, a, b], instant) {
      const pane = board.querySelector('.pane'), all = s => pane.querySelectorAll(s);
      switch (action) {
        case 'tool': {
          if (instant) return;
          const button = pill.querySelector(`[data-tool="${a}"]`);
          button.classList.remove('press'); void button.offsetWidth; button.classList.add('press');
          timers.push(setTimeout(() => button.classList.remove('press'), 320));
          return;
        }
        case 'add': all(a).forEach(n => n.classList.add('in')); return;
        case 'load': all(a).forEach(n => n.classList.add('loaded')); return;
        case 'tick': all(a).forEach(n => n.classList.add('ticked')); return;
        case 'type': all(a).forEach(n => type(n, instant, timers)); return;
        case 'lift': if (!instant) pane.querySelector(a).classList.add('lifted'); return;
        case 'move': move(pane, a, b, instant); return;
        case 'wire':
          layoutWire(pane, a, b);
          pane.querySelector('.wires').classList.add('draw');
          pane.querySelector('.wire-label').classList.add('labelled');
          return;
      }
    }

    function reset() {
      timers.forEach(clearTimeout);
      timers = [];
      pill.querySelectorAll('.press').forEach(n => n.classList.remove('press'));
      board.querySelector('.pane').outerHTML = blank;
    }

    function finish() {
      reset();
      const pane = board.querySelector('.pane');
      pane.classList.add('instant');
      story.forEach(x => act(x, true));
      requestAnimationFrame(() => requestAnimationFrame(() => pane.classList.remove('instant')));
    }

    function play() {
      if (reduce.matches) { finish(); return; }
      reset();
      void board.offsetWidth;
      timers = story.map(x => setTimeout(() => act(x, false), x[0]));
    }

    function replay() {   // the board on screen fades out first, so starting over doesn't read as a glitch
      if (reduce.matches) { finish(); return; }
      timers.forEach(clearTimeout);
      timers = [];
      board.querySelector('.pane').classList.add('out');
      timers.push(setTimeout(play, 160));
    }

    figure.querySelector('.replay').addEventListener('click', replay);
    addEventListener('resize', () => {
      const pane = board.querySelector('.pane');
      if (pane.dataset.wire) layoutWire(pane, ...pane.dataset.wire.split('|'));
    });

    if (reduce.matches || !('IntersectionObserver' in window)) { finish(); return; }
    const watch = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      watch.disconnect();
      play();
    }, { threshold: 0.6 });
    watch.observe(board);
  });
})();
