// Four languages (the browser's by default, remembered once chosen) and four example boards, one person's life:
// a trip being planned, a move, a thesis that reaches back into the trip, a book. Each board is built in front of the
// visitor with Nook's own tools: the toolbar button is pressed, then what it makes appears. A board plays only when
// the visitor picks it (picking it again replays); the finished board shows at once under reduced motion or on a
// repeat visit. The page's entrance plays once per visit.
(() => {
  const T = {
    zh: {
      lang: 'zh-CN', title: 'Nook — 一处安静的地方', langLabel: '语言', blog: '博客',
      headline: '一处安静的地方，<br>留给少数重要的项目。', lede: '手头的每件事，各有一块白板。', download: '下载 macOS 版',
      v1t: '收集', v1: '粘贴链接、拖入图片，就是一张卡片。', v2t: '整理', v2: '区域、栏和箭头，让关系一目了然。', v3t: '归你', v3: '白板是你文件夹里的普通文件。没有账号，不收集数据。',
      sk1: '秋天的京都', sk2r: '第二天', sk2a: '去之前先看', sk2c: '要办', sk3t: '京都',
      trip: '旅行', moving: '规划', research: '研究', reading: '读书', collection: '收藏', scenes: '示例白板', home: '主页',
      labels: {
        trip: '旅行白板“京都”：“第二天 · 东山 → 锦市场”区域里有两张便签，旁边是一张行程清单；右边是清水寺的地点卡片和一段 YouTube 视频，箭头从视频指向清水寺，写着“去之前先看”',
        moving: '规划白板“搬家”：“要办”和“办完”两栏、户型图和一块“新公寓 · 布置”白板；然后“订搬家公司”被拖到办完并打勾',
        research: '研究白板“第三空间”：Oldenburg 的文献便签、维基百科“Third place”、研究问题和锦市场的田野计划，箭头写着“例子？”；⌘K 搜“锦市场”，打开旅行白板里午饭那张便签',
        reading: '读书白板“禅与摩托车维修艺术”：Goodreads 书页加载出封面；“划线”区域里有书中的两句话，箭头从“卡住不该被回避”指向自己的话“论文第三章卡了两周。也许理解就要来了。”，写着“说的是我”',
        collection: '收藏白板“烧脑电影”：依次粘贴《盗梦空间》《记忆碎片》《禁闭岛》《消失的爱人》，海报逐一加载；“诺兰”区域圈出前两部；便签“《盗梦空间》结尾：陀螺到底倒没倒？”，箭头指向《盗梦空间》，写着“再看一遍”'
      },
      s: {
        'col.board': '收藏 · 烧脑电影', 'col.f1': '盗梦空间', 'col.f2': '记忆碎片', 'col.f3': '禁闭岛', 'col.f4': '消失的爱人', 'col.region': '诺兰',
        'col.note': '《盗梦空间》结尾：陀螺到底倒没倒？', 'col.arrow': '再看一遍',
        'trip.board': '旅行 · 京都', 'trip.region': '第二天 · 东山 → 锦市场', 'trip.note1': '7:00 八坂神社 → 二年坂，趁人少。', 'trip.note2': '午饭锦市场：玉子烧、豆乳甜甜圈。',
        'trip.todo1': '订旅馆', 'trip.todo2': 'JR Pass', 'trip.todo3': '岚山竹林', 'trip.place': '清水寺', 'trip.placeKind': 'PLACE · 东山区',
        'trip.video': '秋天的京都：枫叶地图', 'trip.arrow': '去之前先看',
        'moving.board': '规划 · 搬家', 'moving.todo': '要办', 'moving.done': '办完', 'moving.m1': '订搬家公司', 'moving.m2': '改地址：银行、快递',
        'moving.m3': '买冰箱：位置宽 62\u00a0cm', 'moving.d1': '签租约', 'moving.plan': '户型图', 'moving.boardCard': '新公寓 · 布置', 'moving.boardMeta': '8 张卡片',
        'research.board': '研究 · 第三空间', 'research.lit': 'Oldenburg（1989）：家与工作场所之外的“第三空间”',
        'research.question': '研究问题：旅行者能进入当地的第三空间吗？', 'research.field': '锦市场：去的时候看店主怎么招呼熟客和游客。',
        'research.arrow': '例子？', 'research.query': '锦市场',
        'reading.board': '读书 · 禅与摩托车维修艺术', 'reading.region': '划线',
        'reading.hl1': '想要赶快做完一件事，就说明你已经不在乎它了，只想去做别的事。', 'reading.hl2': '卡住不该被回避。它是一切真正理解的前奏。',
        'reading.own': '论文第三章卡了两周。也许理解就要来了。', 'reading.arrow': '说的是我'
      }
    },
    en: {
      lang: 'en', title: 'Nook — a calm place', langLabel: 'Language', blog: 'Blog',
      headline: 'A calm place for the few<br>projects that matter.', lede: 'A board for each thing you’re in the middle of.', download: 'Download for Mac',
      v1t: 'Collect', v1: 'Paste a link or drop an image. It becomes a card.', v2t: 'Arrange', v2: 'Regions, columns and arrows show how things relate.', v3t: 'Yours', v3: 'Boards are plain files in your folder. No account, no tracking.',
      sk1: 'Kyoto in autumn', sk2r: 'Day 2', sk2a: 'Watch first', sk2c: 'To do', sk3t: 'Kyoto',
      trip: 'Trip', moving: 'Planning', research: 'Research', reading: 'Reading', collection: 'Collection', scenes: 'Example boards', home: 'Home',
      labels: {
        trip: 'A trip board, Kyoto: a “Day 2 · Higashiyama → Nishiki” region with two notes, and a trip checklist beside it; on the right a place card for Kiyomizu-dera and a YouTube video, with an arrow from the video to the temple reading “Watch before going”',
        moving: 'A planning board, The move: To do and Done columns, a floor plan and a “New flat · Layout” board; then “Book the movers” is dragged to Done and ticked',
        research: 'A research board, Third places: an Oldenburg note, the Wikipedia page “Third place”, the research question and a field plan for Nishiki, with an arrow reading “Example?”; ⌘K searches “Nishiki” and opens the lunch note on the trip board',
        reading: 'A reading board, Zen and the Art of Motorcycle Maintenance: the Goodreads page loads its cover; a Highlights region holds two passages, and an arrow from “Stuckness shouldn’t be avoided” to the reader’s note “Two weeks stuck on chapter 3 of the thesis” reads “That’s me”',
        collection: 'A collection board, Mind-benders: Inception, Memento, Shutter Island and Gone Girl pasted one by one, their posters loading; a “Nolan” region around the first two; a note “Inception’s ending: did the top fall?” with an arrow to Inception reading “Watch again”'
      },
      s: {
        'col.board': 'Collection · Mind-benders', 'col.f1': 'Inception', 'col.f2': 'Memento', 'col.f3': 'Shutter Island', 'col.f4': 'Gone Girl', 'col.region': 'Nolan',
        'col.note': 'Inception’s ending: did the top fall?', 'col.arrow': 'Watch again',
        'trip.board': 'Trip · Kyoto', 'trip.region': 'Day 2 · Higashiyama → Nishiki', 'trip.note1': '7:00 Yasaka Shrine → Ninenzaka, before the crowds.', 'trip.note2': 'Lunch at Nishiki: tamagoyaki, soy-milk donuts.',
        'trip.todo1': 'Book the ryokan', 'trip.todo2': 'JR Pass', 'trip.todo3': 'Bamboo grove', 'trip.place': 'Kiyomizu-dera', 'trip.placeKind': 'PLACE · Higashiyama',
        'trip.video': 'Kyoto in autumn: a maple map', 'trip.arrow': 'Watch before going',
        'moving.board': 'Planning · The move', 'moving.todo': 'To do', 'moving.done': 'Done', 'moving.m1': 'Book the movers', 'moving.m2': 'Change address: bank, deliveries',
        'moving.m3': 'Buy a fridge: the gap is 62\u00a0cm', 'moving.d1': 'Sign the lease', 'moving.plan': 'Floor plan', 'moving.boardCard': 'New flat · Layout', 'moving.boardMeta': '8 cards',
        'research.board': 'Research · Third places', 'research.lit': 'Oldenburg (1989): the “third place” beyond home and work',
        'research.question': 'Question: can travellers enter a local third place?', 'research.field': 'Nishiki: when I’m there, watch how stallholders greet regulars and tourists.',
        'research.arrow': 'Example?', 'research.query': 'Nishiki',
        'reading.board': 'Reading · Zen and the Art of Motorcycle Maintenance', 'reading.region': 'Highlights',
        'reading.hl1': 'When you want to hurry something, that means you no longer care about it and want to get on to other things.', 'reading.hl2': 'Stuckness shouldn’t be avoided. It’s the psychic predecessor of all real understanding.',
        'reading.own': 'Two weeks stuck on chapter 3 of the thesis. Maybe that’s the understanding coming.', 'reading.arrow': 'That’s me'
      }
    },
    es: {
      lang: 'es', title: 'Nook — un lugar tranquilo', langLabel: 'Idioma', blog: 'Blog',
      headline: 'Un lugar tranquilo<br>para lo que importa.', lede: 'Tableros visuales para tu Mac, guardados en una carpeta que elijas.', download: 'Descargar para Mac',
      v1t: 'Reúne', v1: 'Pega un enlace o suelta una imagen. Se convierte en una tarjeta.', v2t: 'Ordena', v2: 'Regiones, columnas y flechas muestran cómo se relacionan las cosas.', v3t: 'Tuyo', v3: 'Los tableros son archivos normales en tu carpeta. Sin cuenta, sin rastreo.',
      sk1: 'Kioto en otoño', sk2r: 'Día 2', sk2a: 'Verlo antes', sk2c: 'Por hacer', sk3t: 'Kioto',
      trip: 'Viaje', moving: 'Planes', research: 'Investigación', reading: 'Lectura', collection: 'Colección', scenes: 'Tableros de ejemplo', home: 'Inicio',
      labels: {
        trip: 'Un tablero de viaje, Kioto: una región «Día 2 · Higashiyama → Nishiki» con dos notas y, al lado, la lista del viaje; a la derecha, una tarjeta de lugar de Kiyomizu-dera y un vídeo de YouTube, con una flecha del vídeo al templo que dice «Verlo antes de ir»',
        moving: 'Un tablero de planes, La mudanza: columnas Por hacer y Hecho, un plano y un tablero «Piso nuevo · Distribución»; después, «Reservar la mudanza» pasa a Hecho y se marca',
        research: 'Un tablero de investigación, Terceros lugares: una nota sobre Oldenburg, la página de Wikipedia «Third place», la pregunta de investigación y un plan de campo para Nishiki, con una flecha que dice «¿Ejemplo?»; ⌘K busca «Nishiki» y abre la nota del almuerzo en el tablero del viaje',
        reading: 'Un tablero de lectura, Zen y el arte del mantenimiento de la motocicleta: la página de Goodreads carga su portada; una región de subrayados con dos pasajes y una flecha de «No hay que evitar quedarse atascado» a la nota «Dos semanas atascado en el capítulo 3 de la tesis» que dice «Ese soy yo»',
        collection: 'Un tablero de colección, Películas que te vuelan la cabeza: Origen, Memento, Shutter Island y Perdida pegadas una a una, cargando sus carteles; una región «Nolan» alrededor de las dos primeras; una nota «Final de Origen: ¿cayó la peonza?» con una flecha a Origen que dice «Volver a verla»'
      },
      s: {
        'col.board': 'Colección · Películas que te vuelan la cabeza', 'col.f1': 'Origen', 'col.f2': 'Memento', 'col.f3': 'Shutter Island', 'col.f4': 'Perdida', 'col.region': 'Nolan',
        'col.note': 'Final de Origen: ¿cayó la peonza?', 'col.arrow': 'Volver a verla',
        'trip.board': 'Viaje · Kioto', 'trip.region': 'Día 2 · Higashiyama → Nishiki', 'trip.note1': '7:00 Santuario Yasaka → Ninenzaka, antes de que llegue la gente.', 'trip.note2': 'Comida en Nishiki: tamagoyaki y dónuts de soja.',
        'trip.todo1': 'Reservar el ryokan', 'trip.todo2': 'JR Pass', 'trip.todo3': 'Bosque de bambú', 'trip.place': 'Kiyomizu-dera', 'trip.placeKind': 'PLACE · Higashiyama',
        'trip.video': 'Kioto en otoño: mapa de arces', 'trip.arrow': 'Verlo antes de ir',
        'moving.board': 'Planes · La mudanza', 'moving.todo': 'Por hacer', 'moving.done': 'Hecho', 'moving.m1': 'Reservar la mudanza', 'moving.m2': 'Cambiar la dirección: banco, envíos',
        'moving.m3': 'Comprar nevera: hueco de 62\u00a0cm', 'moving.d1': 'Firmar el contrato', 'moving.plan': 'Plano', 'moving.boardCard': 'Piso nuevo · Distribución', 'moving.boardMeta': '8 tarjetas',
        'research.board': 'Investigación · Terceros lugares', 'research.lit': 'Oldenburg (1989): el «tercer lugar», más allá de casa y del trabajo',
        'research.question': 'Pregunta: ¿puede un viajero entrar en un tercer lugar local?', 'research.field': 'Nishiki: cuando vaya, ver cómo saludan los tenderos a habituales y turistas.',
        'research.arrow': '¿Ejemplo?', 'research.query': 'Nishiki',
        'reading.board': 'Lectura · Zen y el arte del mantenimiento de la motocicleta', 'reading.region': 'Subrayados',
        'reading.hl1': 'Cuando quieres apresurar algo, significa que ya no te importa y quieres pasar a otra cosa.', 'reading.hl2': 'No hay que evitar quedarse atascado. Es el preludio psíquico de toda comprensión real.',
        'reading.own': 'Dos semanas atascado en el capítulo 3 de la tesis. Quizá así llega la comprensión.', 'reading.arrow': 'Ese soy yo'
      }
    },
    ja: {
      lang: 'ja', title: 'Nook — 静かな場所', langLabel: '言語', blog: 'ブログ',
      headline: '大切なことのための、<br>静かな場所。', lede: 'Mac のためのビジュアルボード。ファイルは、あなたの選んだフォルダに。', download: 'Mac 版をダウンロード',
      v1t: '集める', v1: 'リンクを貼る、画像を置く。それがカードになる。', v2t: '整える', v2: 'リージョン、カラム、矢印で、つながりが見える。', v3t: '手元に', v3: 'ボードはフォルダの中の普通のファイル。アカウント不要、追跡なし。',
      sk1: '秋の京都', sk2r: '2日目', sk2a: '行く前に見る', sk2c: 'やること', sk3t: '京都',
      trip: '旅', moving: '計画', research: '研究', reading: '読書', collection: 'コレクション', scenes: 'ボードの例', home: 'ホーム',
      labels: {
        trip: '旅のボード「京都」：「2日目・東山 → 錦市場」のリージョンにメモ2枚、その横に旅のチェックリスト。右に清水寺の場所カードと YouTube 動画、動画から清水寺へ「行く前に見る」の矢印',
        moving: '計画のボード「引っ越し」：やること・完了の2カラム、間取り図と「新居・レイアウト」ボード。そのあと「引っ越し業者を予約」が完了へ移ってチェック',
        research: '研究のボード「サードプレイス」：Oldenburg のメモ、Wikipedia「Third place」、問いと錦市場のフィールド計画、「例？」の矢印。⌘K で「錦市場」を探すと、旅のボードの昼食メモが開く',
        reading: '読書のボード「禅とオートバイ修理技術」：Goodreads のページが表紙を読み込む。ハイライトに2つの一節、「行き詰まりは避けるべきではない」から自分のメモ「論文の第3章で2週間止まっている」へ「これは私だ」の矢印',
        collection: 'コレクションのボード「考察したくなる映画」：『インセプション』『メメント』『シャッター アイランド』『ゴーン・ガール』を順に貼り、ポスターが読み込まれる。最初の2本を「ノーラン」のリージョンで囲む。メモ「『インセプション』のラスト：コマは倒れた？」から『インセプション』へ「もう一度観る」の矢印'
      },
      s: {
        'col.board': 'コレクション・考察したくなる映画', 'col.f1': 'インセプション', 'col.f2': 'メメント', 'col.f3': 'シャッター アイランド', 'col.f4': 'ゴーン・ガール', 'col.region': 'ノーラン',
        'col.note': '『インセプション』のラスト：コマは倒れた？', 'col.arrow': 'もう一度観る',
        'trip.board': '旅・京都', 'trip.region': '2日目・東山 → 錦市場', 'trip.note1': '7:00 八坂神社 → 二年坂、混む前に。', 'trip.note2': '昼は錦市場：だし巻き卵、豆乳ドーナツ。',
        'trip.todo1': '旅館を予約', 'trip.todo2': 'JR パス', 'trip.todo3': '嵐山の竹林', 'trip.place': '清水寺', 'trip.placeKind': 'PLACE · 東山区',
        'trip.video': '秋の京都：紅葉マップ', 'trip.arrow': '行く前に見る',
        'moving.board': '計画・引っ越し', 'moving.todo': 'やること', 'moving.done': '完了', 'moving.m1': '引っ越し業者を予約', 'moving.m2': '住所変更：銀行、通販',
        'moving.m3': '冷蔵庫を買う：幅 62\u00a0cm まで', 'moving.d1': '賃貸契約を結ぶ', 'moving.plan': '間取り図', 'moving.boardCard': '新居・レイアウト', 'moving.boardMeta': '8 枚のカード',
        'research.board': '研究・サードプレイス', 'research.lit': 'Oldenburg (1989)：家と職場の外にある「サードプレイス」',
        'research.question': '問い：旅行者は地元のサードプレイスに入れるか？', 'research.field': '錦市場：行ったら、店主が常連と観光客をどう迎えるか見る。',
        'research.arrow': '例？', 'research.query': '錦市場',
        'reading.board': '読書・禅とオートバイ修理技術', 'reading.region': 'ハイライト',
        'reading.hl1': '何かを急ぎたくなるのは、もうそれを大切に思っておらず、ほかのことに移りたいということだ。', 'reading.hl2': '行き詰まりは避けるべきではない。それはあらゆる本当の理解の前触れなのだ。',
        'reading.own': '論文の第3章で2週間止まっている。これが理解の前触れかもしれない。', 'reading.arrow': '私のことだ'
      }
    }
  };

  // Each board's build, in order: [ms, action, ...args]. A toolbar button is pressed 120ms before what it makes appears,
  // so the tool reads as the cause. Steps are 1.2–1.8s apart (an unhurried build); each board ends on its moment.
  const STORY = {
    trip: [
      [200, 'tool', 'region'], [350, 'add', '.region'],
      [1500, 'tool', 'text'], [1650, 'add', '.note1'], [1700, 'type', '.note1'],
      [3500, 'tool', 'text'], [3650, 'add', '.note2'], [3700, 'type', '.note2'],
      [5500, 'tool', 'text'], [5650, 'add', '.list'],
      [6700, 'tool', 'link'], [6850, 'add', '.place'], [7850, 'load', '.place'],
      [8100, 'tool', 'link'], [8250, 'add', '.video'], [9250, 'load', '.video'],
      [9700, 'tool', 'connect'], [9850, 'wire', '.video', '.place']
    ],
    moving: [
      [200, 'tool', 'column'], [350, 'add', '.c1'], [550, 'add', '.c1 .card'],
      [1900, 'tool', 'column'], [2050, 'add', '.c2'], [2250, 'add', '.done-card'],
      [3500, 'tool', 'image'], [3650, 'add', '.plan'],
      [4900, 'tool', 'board'], [5050, 'add', '.boardcard'],
      [6500, 'lift'], [6650, 'move'], [7550, 'tick', '.mover']
    ],
    research: [
      [200, 'tool', 'text'], [350, 'add', '.lit'], [400, 'type', '.lit'],
      [2300, 'tool', 'link'], [2450, 'add', '.web'], [3450, 'load', '.web'],
      [3900, 'tool', 'text'], [4050, 'add', '.question'], [4100, 'type', '.question'],
      [5900, 'tool', 'text'], [6050, 'add', '.field'], [6100, 'type', '.field'],
      [7900, 'tool', 'connect'], [8050, 'wire', '.field', '.lit'],
      [9300, 'palette', 'open'], [9500, 'type', '.query'], [10500, 'palette', 'found'],
      [11700, 'palette', 'chosen'], [11900, 'open', 'trip', '.note2']
    ],
    reading: [
      [200, 'tool', 'link'], [350, 'add', '.book'], [1550, 'load', '.book'],
      [2300, 'tool', 'region'], [2450, 'add', '.region'],
      [3400, 'add', '.hl1'], [4600, 'add', '.hl2'],
      [5900, 'tool', 'text'], [6050, 'add', '.own'], [6100, 'type', '.own'],
      [8200, 'tool', 'connect'], [8350, 'wire', '.hl2', '.own']
    ],
    collection: [
      [200, 'tool', 'link'], [350, 'add', '.f1'], [1300, 'load', '.f1'],
      [1700, 'tool', 'link'], [1850, 'add', '.f2'], [2800, 'load', '.f2'],
      [3200, 'tool', 'link'], [3350, 'add', '.f3'], [4300, 'load', '.f3'],
      [4700, 'tool', 'link'], [4850, 'add', '.f4'], [5800, 'load', '.f4'],
      [6300, 'tool', 'region'], [6450, 'add', '.nolan'],
      [7400, 'tool', 'text'], [7550, 'add', '.cnote'], [7600, 'type', '.cnote'],
      [9400, 'tool', 'connect'], [9550, 'wire', '.cnote', '.f1']
    ]
  };
  const STATE = ['in', 'loaded', 'ticked', 'draw', 'lifted', 'open', 'found', 'playing', 'moved', 'press', 'labelled', 'searching', 'chosen', 'leave'];

  const select = document.getElementById('language');
  const board = document.getElementById('board');
  const title = document.getElementById('board-title');
  const pill = board.querySelector('.pill');
  const panes = Object.fromEntries([...board.querySelectorAll('[data-pane]')].map(p => [p.dataset.pane, p]));
  const tabs = [...document.querySelectorAll('.tabs [data-scene]')];
  const tablist = document.querySelector('.tabs');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const still = new URLSearchParams(location.search).has('still');   // ?still: every board at its finished frame (for checking)
  const EXIT_MS = 120;
  let lang = 'zh', scene = 'trip', swapTimer = 0, timers = [];

  // Autoplay: each board builds, holds its finished frame for a moment, then the next one comes in. The active tab's
  // hairline shows the time left. It holds while the pointer rests on the board or the tabs, while the board is off
  // screen or the page is hidden; once the visitor picks a board themselves, it stops for good. None under reduced
  // motion.
  const ORDER = ['trip', 'moving', 'research', 'reading', 'collection'];
  const HOLD = 2600;
  const TAIL = { wire: 1300, palette: 700, tick: 600, type: 1900, load: 600, add: 700, open: 2200 };
  const figure = document.querySelector('.scene');
  let autoplay = false, autoTimer = 0, autoStart = 0, autoLeft = 0;
  const holds = new Set();

  function boardLength(name) {
    const last = STORY[name][STORY[name].length - 1];
    return last[0] + (TAIL[last[1]] || 800);
  }

  function progress(ms) {   // restart the active tab's hairline over `ms`; 0 clears it
    tabs.forEach(b => { b.classList.remove('timing'); b.style.removeProperty('--auto'); });
    if (!ms) return;
    const active = tabs.find(b => b.dataset.scene === scene);
    void active.offsetWidth;
    active.style.setProperty('--auto', ms + 'ms');
    active.classList.add('timing');
  }

  function runAuto() {
    clearTimeout(autoTimer);
    if (!autoplay || holds.size) return;
    autoStart = performance.now();
    autoTimer = setTimeout(() => show(ORDER[(ORDER.indexOf(scene) + 1) % ORDER.length], true), autoLeft);
  }

  function startAuto(ms) {
    if (!autoplay) return;
    autoLeft = ms;
    progress(ms);
    tablist.classList.toggle('held', holds.size > 0);
    runAuto();
  }

  function hold(reason) {
    if (holds.has(reason)) return;
    if (!holds.size && autoplay) { clearTimeout(autoTimer); autoLeft = Math.max(0, autoLeft - (performance.now() - autoStart)); }
    holds.add(reason);
    tablist.classList.add('held');
  }

  function release(reason) {
    if (!holds.delete(reason) || holds.size) return;
    tablist.classList.remove('held');
    runAuto();
  }

  function stopAuto() {
    autoplay = false;
    clearTimeout(autoTimer);
    progress(0);
  }

  function pickLanguage() {
    try { const saved = localStorage.getItem('nook-lang'); if (T[saved]) return saved; } catch (_) {}
    const wanted = (navigator.languages || [navigator.language || 'en']).map(l => l.toLowerCase().slice(0, 2));
    return wanted.find(l => T[l]) || 'en';
  }

  const text = key => T[lang].s[key] || '';

  // An arrow from one card to another, as Nook draws it: from the side facing the target to the target's facing side,
  // a soft curve, its label on a pill at the middle. Measured where the cards are now (any language, any width).
  function layoutWire(pane, fromSel, toSel) {
    const box = pane.getBoundingClientRect();
    const r = el => { const q = pane.querySelector(el).getBoundingClientRect(); return { l: q.left - box.left, t: q.top - box.top, r: q.right - box.left, b: q.bottom - box.top }; };
    const a = r(fromSel), b = r(toSel);
    const ac = [(a.l + a.r) / 2, (a.t + a.b) / 2], bc = [(b.l + b.r) / 2, (b.t + b.b) / 2];
    const dx = bc[0] - ac[0], dy = bc[1] - ac[1];
    let p0, p3, axis, sign;
    if (Math.abs(dx) > Math.abs(dy) * 0.6 && (b.l > a.r || b.r < a.l)) {   // across: side to side
      sign = dx > 0 ? 1 : -1; axis = 0;
      p0 = [sign > 0 ? a.r + 4 : a.l - 4, Math.min(Math.max(bc[1], a.t + 12), a.b - 12)];
      p3 = [sign > 0 ? b.l - 6 : b.r + 6, Math.min(Math.max(ac[1], b.t + 12), b.b - 12)];
    } else {   // above or below: edge to edge
      sign = dy > 0 ? 1 : -1; axis = 1;
      p0 = [Math.min(Math.max(bc[0], a.l + 16), a.r - 16), sign > 0 ? a.b + 4 : a.t - 4];
      p3 = [Math.min(Math.max(ac[0], b.l + 16), b.r - 16), sign > 0 ? b.t - 6 : b.b + 6];
    }
    const span = Math.max(24, Math.abs(p3[axis] - p0[axis]) / 2);
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

  // Typing into a card: a character every 110ms in Chinese or Japanese, 50ms otherwise, the whole card within 0.7–1.7s.
  function type(el, instant) {
    const full = text(el.dataset.type);
    if (instant) { el.textContent = full; return; }
    const chars = [...full];
    const each = Math.min(1700, Math.max(700, chars.length * (/^(zh|ja)/.test(lang) ? 110 : 50))) / chars.length;
    el.textContent = '';
    chars.forEach((_, i) => timers.push(setTimeout(() => { el.textContent = chars.slice(0, i + 1).join(''); }, each * (i + 1))));
  }

  // Moving: the card arcs from To do into the top of Done (760ms) while To do closes up (420ms), then belongs there.
  function moveCard(pane, instant) {
    const card = pane.querySelector('.mover'), slot = pane.querySelector('.slot');
    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      card.classList.add('moved');   // re-inserting an element would replay its entrance
      slot.style.transition = 'none';
      slot.style.height = '0px';
      slot.parentNode.insertBefore(card, slot);
      requestAnimationFrame(() => { slot.style.transition = ''; });
      card.classList.remove('lifted');
      card.style.transform = '';
      pane.querySelectorAll('.c1 .card').forEach(n => { n.style.transform = ''; n.style.transition = ''; });
    };
    if (instant || !card.animate) { settle(); return; }
    const from = card.getBoundingClientRect(), to = slot.getBoundingClientRect();
    const gap = from.height + 7;   // what To do closes up by
    pane.querySelectorAll('.c1 .card:not(.mover)').forEach(n => {
      n.style.transition = 'transform 420ms cubic-bezier(0.65, 0, 0.35, 1)';
      n.style.transform = `translateY(${-gap}px)`;
    });
    slot.style.height = from.height + 'px';   // Done opens a card-sized space as it arrives (CSS: 250ms)
    const dx = to.left - from.left, dy = to.top - from.top;
    const move = card.animate([
      { transform: 'translate(0, 0) rotate(0deg) scale(1.02)' },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 16}px) rotate(-2deg) scale(1.04)`, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) rotate(0deg) scale(1)` }
    ], { duration: 760, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', fill: 'forwards' });
    const done = () => { settle(); move.cancel(); };
    move.onfinish = done;
    timers.push(setTimeout(done, 820));   // lands even where frames are paused (a background tab)
  }

  function act(pane, [, action, a, b], instant) {
    const all = sel => pane.querySelectorAll(sel);
    switch (action) {
      case 'tool': {
        if (instant) return;
        const button = pill.querySelector(`[data-tool="${a}"]`);
        button.classList.remove('press'); void button.offsetWidth; button.classList.add('press');
        timers.push(setTimeout(() => button.classList.remove('press'), 320));
        return;
      }
      case 'add': all(a).forEach(n => n.classList.add('in')); return;
      case 'type': all(a).forEach(n => type(n.matches('[data-type]') ? n : n.querySelector('[data-type]'), instant)); return;
      case 'load': all(a).forEach(n => n.classList.add('loaded')); return;
      case 'tick': all(a).forEach(n => n.classList.add('ticked')); return;
      case 'wire':
        layoutWire(pane, a, b);
        pane.querySelector('.wires').classList.add('draw');
        pane.querySelector('.wire-label').classList.add('labelled');
        return;
      case 'lift': if (!instant) pane.querySelector('.mover').classList.add('lifted'); return;
      case 'move': moveCard(pane, instant); return;
      case 'palette': if (instant && a === 'chosen') return; pane.querySelector('.palette').classList.add(a); if (a === 'open') pane.classList.add('searching'); return;
      case 'open': if (!instant) openBoard(pane, a, b); return;
    }
  }

  // ⌘K's result is picked: the palette goes, the board it lives on opens finished, with the found card selected.
  // The finished frame (reduced motion, ?still) stays on the search's results.
  function openBoard(pane, name, card) {
    pane.querySelector('.palette').classList.add('leave');
    timers.push(setTimeout(() => {
      const there = panes[name];
      finish(there);
      there.querySelector(card).classList.add('picked');
      pane.classList.add('away');
      there.classList.add('on', 'arriving');
      timers.push(setTimeout(() => there.classList.remove('arriving'), 260));
      board.dataset.at = name;
      labelBoard();
      relayoutWires();
    }, 160));
  }

  function closeOpened() {   // a board ⌘K opened goes back to how it was
    const name = board.dataset.at;
    if (!name) return;
    delete board.dataset.at;
    panes[name].querySelectorAll('.picked').forEach(n => n.classList.remove('picked'));
    if (name !== scene) panes[name].classList.remove('on', 'leaving');
    Object.values(panes).forEach(p => p.classList.remove('away'));
  }

  // The board as it starts: nothing on it (the moved card back at the top of To do, typed text empty).
  function reset(pane) {
    timers.forEach(clearTimeout);
    timers = [];
    if (board.dataset.at && board.dataset.at !== pane.dataset.pane) closeOpened();
    pane.querySelectorAll('.' + STATE.join(',.')).forEach(n => n.classList.remove(...STATE));
    pane.classList.remove('searching');
    pill.querySelectorAll('.press').forEach(n => n.classList.remove('press'));
    pane.querySelectorAll('[data-type]').forEach(n => { n.textContent = ''; });
    delete pane.dataset.wire;
    const card = pane.querySelector('.mover');
    if (card) {
      card.getAnimations().forEach(x => x.cancel());
      card.style.transform = '';
      const home = pane.querySelector('.c1');
      home.insertBefore(card, home.querySelector('.column-title').nextSibling);
      pane.querySelectorAll('.c1 .card').forEach(n => { n.style.transform = ''; n.style.transition = ''; });
      const slot = pane.querySelector('.slot');
      slot.style.transition = 'none';
      slot.style.height = '0px';
      requestAnimationFrame(() => { slot.style.transition = ''; });
    }
  }

  // The finished board at once.
  function finish(pane) {
    reset(pane);
    pane.classList.add('instant');
    STORY[pane.dataset.pane].forEach(x => act(pane, x, true));
    requestAnimationFrame(() => requestAnimationFrame(() => pane.classList.remove('instant')));
  }

  function play(pane) {
    if (reduce.matches || still) { finish(pane); return; }
    reset(pane);
    timers = STORY[pane.dataset.pane].map(x => setTimeout(() => act(pane, x, false), x[0]));
  }

  function labelBoard() {
    const at = board.dataset.at || scene;
    title.textContent = text(`${at === 'collection' ? 'col' : at}.board`);
    board.setAttribute('aria-label', T[lang].labels[scene]);
  }

  function render() {
    const t = T[lang];
    document.querySelectorAll('[data-t]').forEach(n => { if (t[n.dataset.t] != null) n.innerHTML = t[n.dataset.t]; });
    board.querySelectorAll('[data-s]').forEach(n => { n.textContent = text(n.dataset.s); });
    board.querySelectorAll('[data-type]').forEach(n => { if (n.textContent) n.textContent = text(n.dataset.type); });
    document.querySelectorAll('[data-sb]').forEach(n => { n.textContent = text(n.dataset.sb).split(/\s*[·・]\s*/).pop(); });
    markMatches();
    document.documentElement.lang = t.lang;
    document.title = t.title;
    tablist.setAttribute('aria-label', t.scenes);
    select.value = lang;
    labelBoard();
    relayoutWires();
  }

  // ⌘K's results show where the query matched.
  function markMatches() {
    const q = text('research.query');
    board.querySelectorAll('.result .what').forEach(n => {
      const full = n.textContent, i = full.indexOf(q);
      if (i < 0) return;
      n.textContent = '';
      const mark = document.createElement('mark');
      mark.textContent = q;
      n.append(full.slice(0, i), mark, full.slice(i + q.length));
    });
  }

  // Arrows already drawn follow their cards when the text or the width changes.
  function relayoutWires() {
    Object.values(panes).forEach(p => { if (p.dataset.wire && p.classList.contains('on')) layoutWire(p, ...p.dataset.wire.split('|')); });
  }

  // The visitor picked a board (or the one on screen again: it replays). The old one fades out (120ms), then the new
  // one builds.
  function show(next, auto = false) {
    if (!auto) stopAuto();   // the visitor picked: autoplay stops for good
    const from = board.dataset.at ? panes[board.dataset.at] : panes[scene], to = panes[next];
    if (next === scene) { play(to); return; }
    scene = next;
    tabs.forEach(b => {
      const on = b.dataset.scene === scene;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    clearTimeout(swapTimer);
    timers.forEach(clearTimeout);
    Object.values(panes).forEach(p => { if (p !== from) p.classList.remove('on', 'leaving'); });
    const enter = () => {
      from.classList.remove('on', 'leaving');
      closeOpened();
      to.classList.add('on');
      labelBoard();
      play(to);
      startAuto(boardLength(next) + HOLD);
    };
    if (reduce.matches || still) { enter(); return; }
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
  let resizeFrame = 0;
  addEventListener('resize', () => { cancelAnimationFrame(resizeFrame); resizeFrame = requestAnimationFrame(relayoutWires); });

  lang = pickLanguage();
  render();

  let seen = false;
  try {
    seen = !!sessionStorage.getItem('nook-intro');
    if (seen) document.documentElement.classList.add('played');
    else sessionStorage.setItem('nook-intro', '1');
  } catch (_) {}
  if (seen) finish(panes[scene]); else play(panes[scene]);   // the first board builds once per visit
  autoplay = !reduce.matches && !still;
  startAuto(seen ? HOLD : boardLength(scene) + HOLD);

  // Holds: a pointer resting on the board or the tabs, the board off screen, the page hidden.
  figure.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hold('pointer'); });
  figure.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') release('pointer'); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { entry.isIntersecting ? release('offscreen') : hold('offscreen'); }, { threshold: 0.35 }).observe(figure);
  }
  document.addEventListener('visibilitychange', () => { document.hidden ? hold('hidden') : release('hidden'); });
})();
