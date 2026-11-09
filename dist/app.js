// Four languages (the browser's by default, remembered once chosen) and three board scenes, each its own layout.
// A scene changes only when the visitor picks one (motion follows the visitor): the old one fades out, the new one's
// cards rise in turn and its arrow draws. The page's entrance plays once per visit.
(() => {
  const T = {
    zh: {
      lang: 'zh-CN', title: 'Nook — 一处安静的地方', langLabel: '语言',
      headline: '一处安静的地方，<br>留给少数重要的项目。', lede: 'Mac 上的白板，文件归你。', download: '下载 macOS 版',
      v1t: '收集', v1: '粘贴链接、拖入图片，就是一张卡片。', v2t: '整理', v2: '区域、栏和箭头，让关系一目了然。', v3t: '归你', v3: '白板是你文件夹里的普通文件。没有账号，不收集数据。',
      trip: '旅行', project: '项目', reading: '阅读', scenes: '示例白板', home: '主页',
      boards: { trip: '京都之旅', project: '新 app', reading: '读书' },
      labels: {
        trip: '一块旅行白板：「第二天」区域里有一张便签和一张清单，箭头连到一段 YouTube 视频',
        project: '一块项目白板：「要做」和「完成」两栏卡片，箭头从要做指向完成',
        reading: '一块读书白板：一句摘录，箭头连到一本书的封面；下面是一个歌单'
      },
      s: {
        'trip.region': '第二天', 'trip.note': '7:00 伏见稻荷，赶在人多之前。', 'trip.todo1': '订民宿', 'trip.todo2': 'JR Pass', 'trip.todo3': '岚山竹林', 'trip.link': '秋天的京都',
        'project.todo': '要做', 'project.a': '首页文案', 'project.b': '打包 DMG', 'project.done': '完成', 'project.c': '截图',
        'reading.quote': '少一些，深一些。', 'reading.book': '瓦尔登湖', 'reading.music': '清晨专注'
      }
    },
    en: {
      lang: 'en', title: 'Nook — a calm place', langLabel: 'Language',
      headline: 'A calm place for the few<br>projects that matter.', lede: 'Boards for your Mac. Your files, your folder.', download: 'Download for Mac',
      v1t: 'Collect', v1: 'Paste a link or drop an image. It becomes a card.', v2t: 'Arrange', v2: 'Regions, columns and arrows show how things relate.', v3t: 'Yours', v3: 'Boards are plain files in your folder. No account, no tracking.',
      trip: 'Trip', project: 'Project', reading: 'Reading', scenes: 'Example boards', home: 'Home',
      boards: { trip: 'Kyoto trip', project: 'New app', reading: 'Reading' },
      labels: {
        trip: 'A trip board: a “Day 2” region with a note and a checklist, an arrow to a YouTube video',
        project: 'A project board: “To do” and “Done” columns of cards, an arrow from one to the other',
        reading: 'A reading board: a quote with an arrow to a book cover, and a playlist below'
      },
      s: {
        'trip.region': 'Day 2', 'trip.note': '7:00 Fushimi Inari, before the crowds.', 'trip.todo1': 'Book the ryokan', 'trip.todo2': 'JR Pass', 'trip.todo3': 'Bamboo grove', 'trip.link': 'Kyoto in autumn',
        'project.todo': 'To do', 'project.a': 'Homepage copy', 'project.b': 'Build the DMG', 'project.done': 'Done', 'project.c': 'Screenshots',
        'reading.quote': 'Fewer things, deeper.', 'reading.book': 'Walden', 'reading.music': 'Morning focus'
      }
    },
    es: {
      lang: 'es', title: 'Nook — un lugar tranquilo', langLabel: 'Idioma',
      headline: 'Un lugar tranquilo<br>para lo que importa.', lede: 'Tableros para tu Mac. Tus archivos, tu carpeta.', download: 'Descargar para Mac',
      v1t: 'Reúne', v1: 'Pega un enlace o suelta una imagen. Se convierte en una tarjeta.', v2t: 'Ordena', v2: 'Regiones, columnas y flechas muestran cómo se relacionan las cosas.', v3t: 'Tuyo', v3: 'Los tableros son archivos normales en tu carpeta. Sin cuenta, sin rastreo.',
      trip: 'Viaje', project: 'Proyecto', reading: 'Lectura', scenes: 'Tableros de ejemplo', home: 'Inicio',
      boards: { trip: 'Viaje a Kioto', project: 'App nueva', reading: 'Lectura' },
      labels: {
        trip: 'Un tablero de viaje: una región «Día 2» con una nota y una lista, y una flecha hacia un vídeo de YouTube',
        project: 'Un tablero de proyecto: columnas «Por hacer» y «Hecho», con una flecha de una a otra',
        reading: 'Un tablero de lectura: una cita con una flecha hacia la portada de un libro, y una lista de música debajo'
      },
      s: {
        'trip.region': 'Día 2', 'trip.note': '7:00 Fushimi Inari, antes que la gente.', 'trip.todo1': 'Reservar el ryokan', 'trip.todo2': 'JR Pass', 'trip.todo3': 'Bosque de bambú', 'trip.link': 'Kioto en otoño',
        'project.todo': 'Por hacer', 'project.a': 'Textos de la portada', 'project.b': 'Crear el DMG', 'project.done': 'Hecho', 'project.c': 'Capturas',
        'reading.quote': 'Menos cosas, más a fondo.', 'reading.book': 'Walden', 'reading.music': 'Enfoque matinal'
      }
    },
    ja: {
      lang: 'ja', title: 'Nook — 静かな場所', langLabel: '言語',
      headline: '大切なことのための、<br>静かな場所。', lede: 'Mac のためのボード。ファイルは、あなたのフォルダに。', download: 'Mac 版をダウンロード',
      v1t: '集める', v1: 'リンクを貼る、画像を置く。それがカードになる。', v2t: '整える', v2: 'リージョン、カラム、矢印で、つながりが見える。', v3t: '手元に', v3: 'ボードはフォルダの中の普通のファイル。アカウント不要、追跡なし。',
      trip: '旅', project: 'プロジェクト', reading: '読書', scenes: 'ボードの例', home: 'ホーム',
      boards: { trip: '京都旅行', project: '新しいアプリ', reading: '読書' },
      labels: {
        trip: '旅のボード：「2日目」のリージョンにメモとチェックリスト、矢印の先に YouTube 動画',
        project: 'プロジェクトのボード：「やること」と「完了」のカラム、矢印でつながっている',
        reading: '読書のボード：引用から本の表紙へ矢印、その下にプレイリスト'
      },
      s: {
        'trip.region': '2日目', 'trip.note': '7:00 伏見稲荷、混む前に。', 'trip.todo1': '旅館を予約', 'trip.todo2': 'JR パス', 'trip.todo3': '竹林の小径', 'trip.link': '秋の京都',
        'project.todo': 'やること', 'project.a': 'トップの文章', 'project.b': 'DMG を作る', 'project.done': '完了', 'project.c': 'スクリーンショット',
        'reading.quote': '少なく、深く。', 'reading.book': '森の生活', 'reading.music': '朝の集中'
      }
    }
  };

  const select = document.getElementById('language');
  const board = document.getElementById('board');
  const title = document.getElementById('board-title');
  const panes = Object.fromEntries([...board.querySelectorAll('[data-pane]')].map(p => [p.dataset.pane, p]));
  const tabs = [...document.querySelectorAll('.tabs [data-scene]')];
  const tablist = document.querySelector('.tabs');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const EXIT_MS = 120;
  let lang = 'zh', scene = 'trip', swapTimer = 0;

  function pickLanguage() {
    try { const saved = localStorage.getItem('nook-lang'); if (T[saved]) return saved; } catch (_) {}
    const wanted = (navigator.languages || [navigator.language || 'en']).map(l => l.toLowerCase().slice(0, 2));
    return wanted.find(l => T[l]) || 'en';
  }

  function labelBoard() {
    title.textContent = T[lang].boards[scene];
    board.setAttribute('aria-label', T[lang].labels[scene]);
  }

  function render() {
    const t = T[lang];
    document.querySelectorAll('[data-t]').forEach(n => { if (t[n.dataset.t] != null) n.innerHTML = t[n.dataset.t]; });
    board.querySelectorAll('[data-s]').forEach(n => { n.textContent = t.s[n.dataset.s]; });
    document.documentElement.lang = t.lang;
    document.title = t.title;
    tablist.setAttribute('aria-label', t.scenes);
    select.value = lang;
    labelBoard();
  }

  // The visitor picked a scene: the old one fades out (120ms), then the new one's cards rise in turn and its arrow
  // draws (CSS, on `.on`). Under reduced motion the swap is instant.
  function show(next) {
    if (next === scene) return;
    const from = panes[scene], to = panes[next];
    from.classList.remove('first');
    scene = next;
    tabs.forEach(b => {
      const on = b.dataset.scene === scene;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    clearTimeout(swapTimer);
    Object.values(panes).forEach(p => { if (p !== from) p.classList.remove('on', 'leaving'); });
    const enter = () => {
      from.classList.remove('on', 'leaving');
      to.classList.add('on');
      labelBoard();
    };
    if (reduce.matches) { enter(); return; }
    from.classList.add('leaving');
    swapTimer = setTimeout(enter, EXIT_MS);
  }

  tabs.forEach(b => {
    b.tabIndex = b.dataset.scene === scene ? 0 : -1;
    b.addEventListener('click', () => show(b.dataset.scene));
  });
  tablist.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = tabs.findIndex(b => b.dataset.scene === scene);
    const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
    show(next.dataset.scene);
    next.focus();
  });
  select.addEventListener('change', () => {
    lang = select.value;
    try { localStorage.setItem('nook-lang', lang); } catch (_) {}
    render();
  });

  lang = pickLanguage();
  render();

  try {
    if (sessionStorage.getItem('nook-intro')) document.documentElement.classList.add('played');
    else sessionStorage.setItem('nook-intro', '1');
  } catch (_) {}
})();
