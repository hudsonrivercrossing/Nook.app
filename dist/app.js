// Four languages (the browser's by default, remembered once chosen) and three board scenes the visitor switches
// between (never on their own: motion follows the visitor). The entrance plays once per visit.
(() => {
  const T = {
    zh: {
      lang: 'zh-CN', title: 'Nook — 一处安静的地方', langLabel: '语言',
      headline: '一处安静的地方，<br>留给少数重要的项目。', lede: 'Mac 上的白板，文件归你。', download: '下载 macOS 版',
      f1: '粘贴链接，就是一张卡片。', f2: '区域、栏和箭头，把东西理清楚。', f3: '没有账号，不收集数据。放进 Dropbox，多台 Mac 一起用。',
      trip: '旅行', project: '项目', reading: '阅读', scenes: '示例白板',
      boardLabel: s => `一块 Nook 白板「${s.board}」：一个区域里有几张卡片和一张清单，旁边是一张链接卡片，箭头把它们连起来`,
      scene: {
        trip: { home: '主页', board: '京都之旅', region: '第二天', card1: '7:00 去伏见稻荷，人还少。', card2: '午饭锦市场，下午清水寺。', todo1: '订好民宿', todo2: 'JR Pass', todo3: '晚上：岚山竹林', link: '秋天的京都：枫叶地图', kind: 'VIDEO · YouTube' },
        project: { home: '主页', board: '新 app', region: '本周', card1: '首页只留一个下载按钮。', card2: '周五前写好发布说明。', todo1: '截图', todo2: '打包 DMG', todo3: '发布 1.0', link: '排版的十个细节', kind: 'WEB · 文章' },
        reading: { home: '主页', board: '读书', region: '专注', card1: '少一些，深一些。', card2: '早上先读书，再看手机。', todo1: '《深度工作》', todo2: '《瓦尔登湖》', todo3: '整理读书笔记', link: '清晨专注歌单', kind: 'MUSIC · Spotify' }
      }
    },
    en: {
      lang: 'en', title: 'Nook — a calm place', langLabel: 'Language',
      headline: 'A calm place for the few<br>projects that matter.', lede: 'Boards for your Mac. Your files, your folder.', download: 'Download for Mac',
      f1: 'Paste a link. It becomes a card.', f2: 'Regions, columns and arrows sort it out.', f3: 'No account, no data collected. Keep it in Dropbox for every Mac.',
      trip: 'Trip', project: 'Project', reading: 'Reading', scenes: 'Example boards',
      boardLabel: s => `A Nook board, “${s.board}”: a region with a few cards and a checklist, a link card beside it, an arrow joining them`,
      scene: {
        trip: { home: 'Home', board: 'Kyoto trip', region: 'Day 2', card1: '7:00 at Fushimi Inari, before the crowds.', card2: 'Lunch at Nishiki, then Kiyomizu-dera.', todo1: 'Book the ryokan', todo2: 'JR Pass', todo3: 'Evening: bamboo grove', link: 'Kyoto in autumn: a maple map', kind: 'VIDEO · YouTube' },
        project: { home: 'Home', board: 'New app', region: 'This week', card1: 'One download button on the homepage.', card2: 'Release notes by Friday.', todo1: 'Screenshots', todo2: 'Build the DMG', todo3: 'Ship 1.0', link: 'Ten details of good typography', kind: 'WEB · Article' },
        reading: { home: 'Home', board: 'Reading', region: 'Focus', card1: 'Fewer things, deeper.', card2: 'Read before the phone in the morning.', todo1: 'Deep Work', todo2: 'Walden', todo3: 'Sort the notes', link: 'Morning focus playlist', kind: 'MUSIC · Spotify' }
      }
    },
    es: {
      lang: 'es', title: 'Nook — un lugar tranquilo', langLabel: 'Idioma',
      headline: 'Un lugar tranquilo<br>para lo que importa.', lede: 'Tableros para tu Mac. Tus archivos, tu carpeta.', download: 'Descargar para Mac',
      f1: 'Pega un enlace. Se convierte en una tarjeta.', f2: 'Regiones, columnas y flechas lo ordenan.', f3: 'Sin cuenta y sin recopilar datos. En Dropbox, para todos tus Mac.',
      trip: 'Viaje', project: 'Proyecto', reading: 'Lectura', scenes: 'Tableros de ejemplo',
      boardLabel: s => `Un tablero de Nook, «${s.board}»: una región con algunas tarjetas y una lista, una tarjeta de enlace al lado y una flecha que las une`,
      scene: {
        trip: { home: 'Inicio', board: 'Viaje a Kioto', region: 'Día 2', card1: 'A las 7:00 en Fushimi Inari, sin gente.', card2: 'Comida en Nishiki y luego Kiyomizu-dera.', todo1: 'Reservar el ryokan', todo2: 'JR Pass', todo3: 'Noche: bosque de bambú', link: 'Kioto en otoño: mapa de arces', kind: 'VIDEO · YouTube' },
        project: { home: 'Inicio', board: 'App nueva', region: 'Esta semana', card1: 'Un solo botón de descarga en la portada.', card2: 'Notas de la versión antes del viernes.', todo1: 'Capturas', todo2: 'Crear el DMG', todo3: 'Publicar la 1.0', link: 'Diez detalles de buena tipografía', kind: 'WEB · Artículo' },
        reading: { home: 'Inicio', board: 'Lectura', region: 'Enfoque', card1: 'Menos cosas, más a fondo.', card2: 'Por la mañana, leer antes que el móvil.', todo1: 'Deep Work', todo2: 'Walden', todo3: 'Ordenar las notas', link: 'Lista para concentrarse', kind: 'MUSIC · Spotify' }
      }
    },
    ja: {
      lang: 'ja', title: 'Nook — 静かな場所', langLabel: '言語',
      headline: '大切なことのための、<br>静かな場所。', lede: 'Mac のためのボード。ファイルは、あなたのフォルダに。', download: 'Mac 版をダウンロード',
      f1: 'リンクを貼ると、カードになる。', f2: 'リージョン、カラム、矢印で整理する。', f3: 'アカウント不要、データ収集なし。Dropbox に置けば、どの Mac でも。',
      trip: '旅', project: 'プロジェクト', reading: '読書', scenes: 'ボードの例',
      boardLabel: s => `Nook のボード「${s.board}」：リージョンにカードとチェックリスト、その横にリンクカード、矢印でつながっている`,
      scene: {
        trip: { home: 'ホーム', board: '京都旅行', region: '2日目', card1: '7:00 伏見稲荷へ。まだ人が少ない。', card2: '昼は錦市場、午後は清水寺。', todo1: '旅館を予約', todo2: 'JR パス', todo3: '夜：嵐山の竹林', link: '秋の京都：紅葉マップ', kind: 'VIDEO · YouTube' },
        project: { home: 'ホーム', board: '新しいアプリ', region: '今週', card1: 'トップはダウンロードボタンだけ。', card2: 'リリースノートは金曜までに。', todo1: 'スクリーンショット', todo2: 'DMG を作る', todo3: '1.0 をリリース', link: '良いタイポグラフィの十の細部', kind: 'WEB · 記事' },
        reading: { home: 'ホーム', board: '読書', region: '集中', card1: '少なく、深く。', card2: '朝はスマホより先に本を。', todo1: '大事なことに集中する', todo2: 'ウォールデン 森の生活', todo3: 'メモを整理する', link: '朝の集中プレイリスト', kind: 'MUSIC · Spotify' }
      }
    }
  };

  const select = document.getElementById('language');
  const board = document.getElementById('board');
  const tabs = [...document.querySelectorAll('.tabs [data-scene]')];
  const tablist = document.querySelector('.tabs');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let lang = 'zh', scene = 'trip', swapTimer = 0;

  function pickLanguage() {
    try { const saved = localStorage.getItem('nook-lang'); if (T[saved]) return saved; } catch (_) {}
    const wanted = (navigator.languages || [navigator.language || 'en']).map(l => l.toLowerCase().slice(0, 2));
    return wanted.find(l => T[l]) || 'en';
  }

  function fillScene() {
    const s = T[lang].scene[scene];
    board.querySelectorAll('[data-s]').forEach(n => { n.textContent = s[n.dataset.s]; });
    board.dataset.scene = scene;
    board.setAttribute('aria-label', T[lang].boardLabel(s));
  }

  function render() {
    const t = T[lang];
    document.querySelectorAll('[data-t]').forEach(n => { if (t[n.dataset.t] != null) n.innerHTML = t[n.dataset.t]; });
    document.documentElement.lang = t.lang;
    document.title = t.title;
    tablist.setAttribute('aria-label', t.scenes);
    select.value = lang;
    fillScene();
  }

  // A scene the visitor picked: a quick crossfade (none under reduced motion).
  function show(next) {
    if (next === scene) return;
    scene = next;
    tabs.forEach(b => {
      const on = b.dataset.scene === scene;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    clearTimeout(swapTimer);
    if (reduce.matches) { fillScene(); return; }
    board.classList.add('swap');
    swapTimer = setTimeout(() => { fillScene(); board.classList.remove('swap'); }, 120);
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
