// Chinese by default, English on request (remembered); the entrance plays once per visit.
(() => {
  const en = {
    headline: 'A calm place for the few<br>projects that matter.',
    lede: 'Boards for your Mac. Your files, your folder.',
    download: 'Download for Mac',
    requirements: '1.0 · macOS 15 or later',
    boardLabel: 'A Nook board: a region with a few notes and a checklist, a link card beside it, an arrow joining them',
    crumbHome: 'Home', crumbBoard: 'Kyoto trip', region: 'Day 2',
    card1: '7:00 at Fushimi Inari, before the crowds.', card2: 'Lunch at Nishiki, then Kiyomizu-dera.',
    todo1: 'Book the ryokan', todo2: 'JR Pass', todo3: 'Evening: bamboo grove',
    linkTitle: 'Kyoto in autumn: a maple map',
    features: 'Features',
    f1: 'Paste a link. It becomes a card.',
    f2: 'Regions, columns and arrows sort it out.',
    f3: 'No account, no data collected. Keep it in Dropbox for every Mac.',
    installTitle: 'Install',
    step1: 'Open Nook.dmg and drag Nook into Applications.',
    step2: 'The first open is blocked: go to System Settings › Privacy &amp; Security and click Open Anyway.',
    step3: 'To update, download the new version and replace it. Your boards stay put.',
    title: 'Nook — a calm place', lang: 'en', toggle: '中文', toggleLabel: '切换到中文'
  };

  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const attrNodes = [...document.querySelectorAll('[data-i18n-attr]')];
  const zh = { title: document.title, lang: 'zh-CN', toggle: 'EN', toggleLabel: 'Switch to English' };
  nodes.forEach(n => { zh[n.dataset.i18n] = n.innerHTML; });
  attrNodes.forEach(n => { const [attr, key] = n.dataset.i18nAttr.split(':'); zh[key] = n.getAttribute(attr); });
  const button = document.getElementById('language');

  function apply(lang) {
    const t = lang === 'en' ? en : zh;
    nodes.forEach(n => { if (t[n.dataset.i18n] != null) n.innerHTML = t[n.dataset.i18n]; });
    attrNodes.forEach(n => { const [attr, key] = n.dataset.i18nAttr.split(':'); if (t[key] != null) n.setAttribute(attr, t[key]); });
    document.documentElement.lang = t.lang;
    document.title = t.title;
    button.textContent = t.toggle;
    button.setAttribute('aria-label', t.toggleLabel);
  }

  let lang = 'zh';
  try { lang = localStorage.getItem('nook-lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en'); } catch (_) {}
  if (lang === 'en') apply('en');
  button.addEventListener('click', () => {
    lang = lang === 'en' ? 'zh' : 'en';
    apply(lang);
    try { localStorage.setItem('nook-lang', lang); } catch (_) {}
  });

  try {
    if (sessionStorage.getItem('nook-intro')) document.documentElement.classList.add('played');
    else sessionStorage.setItem('nook-intro', '1');
  } catch (_) {}
})();
