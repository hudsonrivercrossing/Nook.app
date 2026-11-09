// Chinese by default, English on request (remembered); the entrance plays once per visit.
(() => {
  const en = {
    nav: 'Main navigation', navInstall: 'Install', navReleases: 'Releases',
    headline: 'A calm place for the few<br>projects that matter.',
    lede: 'Boards for your Mac. Put links, images and notes side by side, and make sense of them with regions and arrows. Your boards are plain files in a folder you choose. No account.',
    download: 'Download for Mac', howTo: 'How to install',
    requirements: 'Version 1.0.0 · macOS 15 or later · Apple silicon and Intel',
    boardLabel: 'A Nook board: a region with a few notes and a checklist, a link card beside it, an arrow joining them',
    crumbHome: 'Home', crumbBoard: 'Kyoto trip', region: 'Day 2',
    card1: '7:00 am at Fushimi Inari, before the crowds.', card2: 'Lunch at Nishiki Market, then Kiyomizu-dera.',
    todo1: 'Book the ryokan', todo2: 'JR Pass', todo3: 'Evening: Arashiyama bamboo grove',
    linkTitle: 'Kyoto in autumn: a maple map',
    features: 'Features',
    f1t: 'Anything goes', f1: 'Paste a link and it becomes a card: pages, videos, music, places, posts. Drop in images, write notes.',
    f2t: 'Make sense of it', f2: 'Regions, columns and arrows group and connect things, and boards hold boards. Press ⌘K to search them all.',
    f3t: 'Your files', f3: 'Every board is an ordinary file in your folder. Keep it in Dropbox to use it on more than one Mac. Nook collects no data.',
    installTitle: 'Install',
    step1: 'Download and open <b>Nook.dmg</b>, then drag Nook into Applications.',
    step2: 'The first time, macOS stops it: Nook isn’t notarized by Apple. Open System Settings › Privacy &amp; Security, click Open Anyway under Security, then confirm when asked.',
    step3: 'From then on it opens like any other app. For a new version, download the new DMG and drag Nook into Applications to replace the old one; your boards aren’t touched.',
    checksum: 'Want to check the download?', source: 'GitHub',
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
