/* ================= Chapter 8 Statistics (I) ================= */
(function () {
  const lb = (en, zh) => LANG === 'en' ? en : LANG === 'zh' ? zh : `${en} ${zh}`;
  const tally = k => { let s = ''; for (let i = 0; i < Math.floor(k / 5); i++) s += '<s style="text-decoration-thickness:2px">||||</s> '; s += '|'.repeat(k % 5); return `<span style="font-family:monospace;font-weight:900;letter-spacing:1px">${s}</span>`; };

  const barAnim = {
    title: L('Reading a bar chart', '閱讀棒形圖'), minH: 320,
    setup(stage) {
      const s = svgRoot(stage, 480, 300); const st = { bars: [] }; const vals = [8, 14, 6, 10]; const labs = ['Bus 巴士', 'MTR 港鐵', 'Walk 步行', 'Car 私家車'];
      const m = { l: 50, b: 50, t: 30 }; const H = 300, maxV = 16;
      for (let y = 0; y <= maxV; y += 2) { const py = H - m.b - y / maxV * (H - m.t - m.b); S('line', { x1: m.l, y1: py, x2: 470, y2: py, stroke: '#e3e8f0' }, s); S('text', { x: m.l - 6, y: py + 4, 'text-anchor': 'end', 'font-size': 12, text: y }, s); }
      S('line', { x1: m.l, y1: m.t - 6, x2: m.l, y2: H - m.b, stroke: '#334155', 'stroke-width': 1.5 }, s); S('line', { x1: m.l, y1: H - m.b, x2: 470, y2: H - m.b, stroke: '#334155', 'stroke-width': 1.5 }, s);
      S('text', { x: 240, y: 16, 'text-anchor': 'middle', 'font-weight': 800, 'font-size': 14, text: 'How students go to school 學生上學的方法' }, s);
      vals.forEach((v0, i) => { const h = v0 / maxV * (H - m.t - m.b); const x = m.l + 15 + i * 105; const r = S('rect', { x, y: H - m.b - h, width: 60, height: h, fill: PAL[i], rx: 3, class: 'tr' }, s); r.style.transformBox = 'fill-box'; r.style.transformOrigin = 'bottom'; r.style.transform = 'scaleY(0)'; st.bars.push(r); S('text', { x: x + 30, y: H - m.b + 18, 'text-anchor': 'middle', 'font-size': 12, text: labs[i] }, s); });
      st.guide = S('line', { x1: m.l, x2: 470, y1: H - m.b - 14 / maxV * (H - m.t - m.b), y2: H - m.b - 14 / maxV * (H - m.t - m.b), stroke: '#dc2626', 'stroke-width': 2, 'stroke-dasharray': '6 4', opacity: 0, class: 'tr' }, s);
      st.guide2 = S('line', { x1: m.l, x2: 470, y1: H - m.b - 6 / maxV * (H - m.t - m.b), y2: H - m.b - 6 / maxV * (H - m.t - m.b), stroke: '#2563eb', 'stroke-width': 2, 'stroke-dasharray': '6 4', opacity: 0, class: 'tr' }, s);
      return st;
    },
    frames: [
      { c: ['A bar chart uses the HEIGHT of bars to show numbers.', '棒形圖用棒的高度表示數量。'], f(st) { } },
      { c: ['Read each height on the vertical axis.', '在直軸上讀出高度。'], d: 3000, f(st) { st.bars.forEach(b => b.style.transform = 'scaleY(1)'); } },
      { c: ['Tallest bar: MTR = 14 students (most popular).', '最高的棒：港鐵 = 14 人（最受歡迎）。'], f(st) { st.guide.setAttribute('opacity', 1); } },
      { c: ['Shortest: Walk = 6. Difference: 14 − 6 = 8.', '最矮：步行 = 6。相差：14 − 6 = 8。'], f(st) { st.guide2.setAttribute('opacity', 1); } },
      { c: ['Total = 8 + 14 + 6 + 10 = 38 students.', '總人數 = 8 + 14 + 6 + 10 = 38 人。'], f() { } }
    ]
  };
  const pieAnim = () => W(L('Reading a pie chart', '閱讀圓形圖'), [
    { h: `${L('Whole circle', '整個圓')} = 360° = ${L('all 60 students', '全部 60 名學生')}`, c: ['The whole circle (360°) is everybody.', '整個圓（360°）代表所有人。'] },
    { h: `${L('Football', '足球')}: ${fr('180°', '360°')} × 60`, c: ['Number = (angle ÷ 360°) × total', '人數 =（角度 ÷ 360°）× 總數'] },
    { h: `= ${fr(1, 2)} × 60 = <b class="green">30</b>`, c: ['180° is half the circle, so half of 60 = 30.', '180° 是半個圓，所以是 60 的一半 = 30。'] },
    { h: `${L('Basketball', '籃球')}: ${fr('120°', '360°')} × 60 = ${fr(1, 3)} × 60 = <b class="green">20</b>`, c: ['120° is one third of 360°.', '120° 是 360° 的三分之一。'] },
    { h: `${L('Swimming', '游泳')}: ${fr('60°', '360°')} × 60 = <b class="green">10</b> ; &nbsp; ${L('percentage', '百分比')} = ${fr('60°', '360°')} × 100% ≈ 16.7%`, c: ['Percentage = (angle ÷ 360°) × 100%', '百分比 =（角度 ÷ 360°）× 100%'] }
  ], { top: `<div>${pieChart({ title: 'Favourite sport 最喜愛的運動 (60 students)', labels: ['Football 足球', 'Basketball 籃球', 'Swim 游泳'], angles: [180, 120, 60] })}</div>` });

  const lineAnim = {
    title: L('Reading a broken-line graph', '閱讀折線圖'), minH: 320,
    setup(stage) {
      stage.innerHTML = `<div style="position:relative">${lineChart({ title: 'Temperature 氣溫 (°C)', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], values: [18, 21, 20, 26, 24], step: 5 })}</div>`;
      const svg = $('svg', stage); const pl = $('polyline', svg); const len = 600; pl.style.strokeDasharray = len; pl.style.strokeDashoffset = len; pl.style.transition = 'stroke-dashoffset 2.2s ease'; $$('circle', svg).forEach(c => { c.style.opacity = 0; c.style.transition = 'opacity .5s'; });
      return { pl, cs: $$('circle', svg) };
    },
    frames: [
      { c: ['A broken-line graph shows how something CHANGES over time.', '折線圖顯示某事物隨時間的變化。'], f() { } },
      { c: ['Join the points one by one.', '把各點逐一連起來。'], d: 3200, f(st) { st.pl.style.strokeDashoffset = 0; st.cs.forEach(c => c.style.opacity = 1); } },
      { c: ['Line goes UP → increase. Line goes DOWN → decrease.', '線向上 → 上升；線向下 → 下降。'], f() { } },
      { c: ['The steepest rise is Wed → Thu: 26 − 20 = 6°C.', '最陡的上升是星期三 → 星期四：26 − 20 = 6°C。'], f() { } }
    ]
  };

  const discAnim = Chips(L('Discrete or continuous?', '離散還是連續？'), 260,
    [{ id: 'a', h: lb('No. of siblings', '兄弟姊妹數目'), bg: '#fff' }, { id: 'b', h: lb('Height', '身高'), bg: '#fff' }, { id: 'c', h: lb('Goals scored', '入球數目'), bg: '#fff' }, { id: 'd', h: lb('Weight', '體重'), bg: '#fff' }, { id: 'e', h: lb('Time to run 100 m', '跑 100 m 的時間'), bg: '#fff' }, { id: 'f', h: lb('No. of books', '書本數目'), bg: '#fff' }],
    [{ id: 'b1', x: 0, y: 95, w: 270, hh: 160, h: `<div style="border:2px dashed #2563eb;border-radius:12px;height:100%;padding:6px;font-weight:800;color:#2563eb">${L('Discrete data (COUNT)', '離散數據（數出來）')}</div>` },
    { id: 'b2', x: 285, y: 95, w: 270, hh: 160, h: `<div style="border:2px dashed #16a34a;border-radius:12px;height:100%;padding:6px;font-weight:800;color:#16a34a">${L('Continuous data (MEASURE)', '連續數據（量度出來）')}</div>` }],
    [{ c: ['Is each one counted or measured?', '每一項是「數」出來，還是「量度」出來的？'], pos: { a: [0, 0], b: [200, 0], c: [300, 0], d: [0, 48], e: [110, 48], f: [330, 48] }, show: { b1: 1, b2: 1 }, d: 2500 },
    { c: ['COUNTED (1, 2, 3 … only whole numbers) → discrete data', '數出來的（只有 1、2、3……整數）→ 離散數據'], d: 3500, pos: { a: [10, 135], c: [10, 175], f: [10, 215] } },
    { c: ['MEASURED (can be 1.52 m, 45.3 kg, 12.8 s …) → continuous data', '量度出來的（可以是 1.52 m、45.3 kg、12.8 s……）→ 連續數據'], d: 3500, pos: { b: [295, 135], d: [295, 175], e: [295, 215] } }]);

  const freqData = [2, 3, 1, 3, 4, 2, 3, 0, 2, 3, 1, 3];
  const freqAnim = {
    title: L('Making a frequency distribution table', '製作頻數分佈表'), minH: 330,
    setup(stage) {
      const d = el('div'); d.style.cssText = 'width:100%;max-width:560px';
      d.innerHTML = `<div style="font-size:20px;letter-spacing:4px;text-align:center;margin-bottom:8px">${freqData.map((x, i) => `<span data-i="${i}" style="padding:2px 5px;border-radius:6px;transition:all .3s">${x}</span>`).join('')}</div>
      <div class="sub" style="text-align:center;margin-bottom:6px">${L('Number of books read by 12 students last month', '12 名學生上月看書的數目')}</div>
      <table class="t" style="min-width:320px"><tr><th>${L('No. of books', '書本數目')}</th><th>${L('Tally', '劃記')}</th><th>${L('Frequency', '頻數')}</th></tr>${[0, 1, 2, 3, 4].map(k => `<tr><td>${k}</td><td data-t="${k}" style="min-width:110px;text-align:left"></td><td data-f="${k}"></td></tr>`).join('')}<tr><th colspan="2">${L('Total', '總數')}</th><th data-tot></th></tr></table>`;
      stage.appendChild(d); return { d, cnt: [0, 0, 0, 0, 0] };
    },
    frames: [
      { c: ['One tally mark per data value.', '每個數據劃一劃。'], f() { } },
      ...[0, 1, 2, 3].map(g => ({
        c: [`Data ${g * 3 + 1} to ${g * 3 + 3}: add a tally mark | for each.`, `第 ${g * 3 + 1} 至 ${g * 3 + 3} 個數據：每個劃一劃 |。`], d: 2400, f(st) {
          for (let i = 0; i < g * 3 + 3; i++) $(`[data-i="${i}"]`, st.d).style.cssText += ';background:#e2e8f0;color:#94a3b8';
          [0, 1, 2].forEach(j => { const i = g * 3 + j; $(`[data-i="${i}"]`, st.d).style.cssText += ';background:#ffe08a;color:#111'; });
          const cnt = [0, 0, 0, 0, 0]; for (let i = 0; i < g * 3 + 3; i++) cnt[freqData[i]]++;
          [0, 1, 2, 3, 4].forEach(k => { $(`[data-t="${k}"]`, st.d).innerHTML = tally(cnt[k]); });
        }
      })),
      { c: ['Count tally marks → frequency.', '數劃記 → 頻數。'], f(st) { const cnt = [0, 0, 0, 0, 0]; freqData.forEach(x => cnt[x]++); [0, 1, 2, 3, 4].forEach(k => { $(`[data-f="${k}"]`, st.d).innerHTML = `<b class="blue">${cnt[k]}</b>`; }); } },
      { c: ['Total frequency = 12 ✔', '頻數總和 = 12 ✔'], f(st) { $('[data-tot]', st.d).innerHTML = '<b class="green">12</b>'; } }
    ]
  };

  const slData = [52, 67, 45, 71, 58, 63, 49, 75, 66, 54, 61, 47];
  const stemAnim = {
    title: L('Drawing a stem-and-leaf diagram', '繪畫幹葉圖'), minH: 320,
    setup(stage) {
      const d = el('div'); d.style.cssText = 'width:100%;max-width:560px;text-align:center';
      d.innerHTML = `<div style="font-size:19px;letter-spacing:3px;margin-bottom:6px">${slData.map((x, i) => `<span data-i="${i}" style="padding:2px 4px;border-radius:6px;transition:all .3s">${x}</span>`).join(' ')}</div><div class="sub">${L('Test marks of 12 students', '12 名學生的測驗分數')}</div>
      <table class="sl" style="margin-top:8px"><tr><th>${L('Stem (tens)', '幹（十位）')}</th><th style="text-align:left">${L('Leaf (units)', '葉（個位）')}</th></tr>${[4, 5, 6, 7].map(s => `<tr><td class="stem">${s}</td><td class="lv" data-s="${s}" style="min-width:160px"></td></tr>`).join('')}</table><div data-k class="sub" style="opacity:0;transition:opacity .5s">${L('Key: 5 | 2 means 52 marks', '代號：5 | 2 表示 52 分')}</div>`;
      stage.appendChild(d); return { d };
    },
    frames: [
      { c: ['Each number is split: tens digit = stem, units digit = leaf. 52 → stem 5, leaf 2', '每個數拆開：十位 = 幹，個位 = 葉。52 → 幹 5，葉 2'], f() { } },
      ...[0, 1, 2].map(g => ({
        c: [`Put the leaves next to their stems (numbers ${g * 4 + 1}–${g * 4 + 4}).`, `把葉放在對應的幹旁邊（第 ${g * 4 + 1} 至 ${g * 4 + 4} 個數）。`], d: 2600, f(st) {
          const upto = g * 4 + 4; slData.forEach((x, i) => { const sp = $(`[data-i="${i}"]`, st.d); sp.style.background = i < upto - 4 ? '#e2e8f0' : i < upto ? '#ffe08a' : ''; sp.style.color = i < upto - 4 ? '#94a3b8' : ''; });
          [4, 5, 6, 7].forEach(s => { $(`[data-s="${s}"]`, st.d).innerHTML = slData.slice(0, upto).filter(x => Math.floor(x / 10) === s).map(x => x % 10).join(' '); });
        }
      })),
      { c: ['Now SORT the leaves in each row from small to big.', '然後把每行的葉由小至大排列。'], f(st) { [4, 5, 6, 7].forEach(s => { const c = $(`[data-s="${s}"]`, st.d); c.innerHTML = `<span class="green">${slData.filter(x => Math.floor(x / 10) === s).map(x => x % 10).sort((a, b) => a - b).join(' ')}</span>`; c.classList.add('fadein'); }); } },
      { c: ['Add a key. Lowest 45, highest 75.', '加代號。最低 45，最高 75。'], f(st) { $('[data-k]', st.d).style.opacity = 1; } }
    ]
  };
  const b2bAnim = () => W(L('Back-to-back stem-and-leaf diagram', '背對背幹葉圖'), [
    { h: L('Left side: read from the stem outwards (right to left).', '左邊：由幹向外讀（由右至左）。'), c: ['Two sets of data share the same stems in the middle.', '兩組數據共用中間的幹。'] },
    { h: `${L('Class A', '甲班')}: 3 | <b>5</b> → <b class="green">53</b>`, c: ['Left leaf 3 with stem 5 → 53 (NOT 35!)', '左邊的葉 3 配幹 5 → 53（不是 35！）'] },
    { h: `${L('Class B', '乙班')}: <b>6</b> | 8 → <b class="green">68</b>`, c: ['Right leaf 8 with stem 6 → 68', '右邊的葉 8 配幹 6 → 68'] },
    { h: L('Compare: which side has more leaves on bigger stems?', '比較：哪一邊在較大的幹上有較多葉？'), c: ['Class B has more 70s → did better.', '乙班 70 多分較多 → 表現較好。'] }
  ], { top: `<div>${stemLeaf2([53, 58, 61, 64, 67, 72], [55, 68, 71, 73, 76, 79], L('Class A 甲班', 'Class A 甲班'), L('Class B 乙班', 'Class B 乙班'))}</div>` });

  const lessons = [
    {
      t: ['Bar charts, pie charts, broken-line graphs', '棒形圖、圓形圖、折線圖'],
      body: `<table class="t"><tr><th>${L('Diagram', '圖表')}</th><th>${L('Best for', '最適合')}</th></tr><tr><td>${T('Bar chart', '棒形圖')}</td><td>${L('comparing amounts', '比較數量')}</td></tr><tr><td>${T('Pie chart', '圓形圖')}</td><td>${L('parts of a whole', '整體中各部分')}</td></tr><tr><td>${T('Broken-line graph', '折線圖')}</td><td>${L('changes over time', '隨時間的變化')}</td></tr></table>` +
        box('rule', L('Pie chart formulas', '圓形圖公式'), `<div>${L('Number', '數量')} = ${fr(L('angle', '角度'), '360°')} × ${L('total', '總數')} &nbsp;&nbsp; ${L('Angle', '角度')} = ${fr(L('number', '數量'), L('total', '總數'))} × 360°</div>`),
      anim: [barAnim, pieAnim, lineAnim]
    },
    {
      t: ['Diagrams with two sets of data', '表示兩組數據的圖表'],
      body: B('Compound bar chart: two bars side by side. Check the key for colours.', '複合棒形圖：兩條棒並排。看圖例分辨顏色。') +
        `<div class="qfig">${compBar({ title: 'Students in S1 classes 中一各班人數', labels: ['1A', '1B', '1C', '1D'], series: [{ name: 'Boys 男', values: [16, 18, 14, 17], color: '#3b82f6' }, { name: 'Girls 女', values: [18, 15, 19, 17], color: '#f472b6' }], step: 4 })}</div>` +
        ul([B('1A: 16 boys + 18 girls = 34 students', '1A：16 男 + 18 女 = 34 人'), B('1C has the biggest difference: 19 − 14 = 5 more girls', '1C 相差最多：女生多 19 − 14 = 5 人'), B('1D: boys = girls (17)', '1D：男生 = 女生（17 人）')])
    },
    {
      t: ['Discrete data and continuous data', '離散數據和連續數據'],
      body: ul([B(`${T('Discrete data', '離散數據')}: COUNTED. Only certain values (usually whole numbers).`, '離散數據：數出來的，只可以是某些數值（通常是整數）。'), B(`${T('Continuous data', '連續數據')}: MEASURED. Can be any value in a range (with decimals).`, '連續數據：量度出來的，可以是某範圍內任何數值（可以有小數）。')]),
      anim: discAnim
    },
    {
      t: ['Frequency distribution tables', '頻數分佈表'],
      body: ul([B(`${T('Frequency', '頻數')} = how many times a value appears.`, '頻數 = 某數值出現的次數。'), B('Use tally marks to count. Total frequency = number of data.', '用劃記點算。頻數總和 = 數據的數目。'), B('Many values → use groups, e.g. 40–49, 50–59.', '數值多 → 分組，例如 40–49、50–59。')]),
      anim: freqAnim
    },
    {
      t: ['Stem-and-leaf diagrams', '幹葉圖'],
      body: ul([B(`${T('Stem', '幹')} = tens digit, ${T('leaf', '葉')} = units digit.`, '幹 = 十位數字，葉 = 個位數字。'), B('Leaves are in order from small to big. Always give a key.', '葉要由小至大排列，一定要寫代號。')]),
      anim: [stemAnim, b2bAnim]
    }
  ];

  /* ------- generators ------- */
  const CATS = [
    ['Favourite fruit', '最喜愛的水果', [['Apple', '蘋果'], ['Orange', '橙'], ['Banana', '香蕉'], ['Grape', '提子'], ['Mango', '芒果']]],
    ['Favourite sport', '最喜愛的運動', [['Football', '足球'], ['Basketball', '籃球'], ['Swim', '游泳'], ['Badminton', '羽毛球'], ['Running', '跑步']]],
    ['Transport to school', '上學的交通工具', [['Bus', '巴士'], ['MTR', '港鐵'], ['Walk', '步行'], ['Car', '私家車'], ['Minibus', '小巴']]],
    ['Favourite subject', '最喜愛的科目', [['Maths', '數學'], ['English', '英文'], ['Chinese', '中文'], ['Science', '科學'], ['PE', '體育']]]
  ];
  const catName = c => lb(c[0], c[1]);
  const gens = [
    {
      id: 'bar', name: ['Bar charts', '棒形圖'], gen() {
        const [te, tz, cs] = pick(CATS); const k = ri(4, 5); const cats = cs.slice(0, k); const step = pick([2, 5]); const vals = cats.map(() => ri(1, 8) * step);
        const fig = barChart({ title: lb(te, tz), labels: cats.map(catName), values: vals, step, ylabel: lb('No. of students', '學生人數') });
        const t = ri(0, 3); const i = ri(0, k - 1); let j; do j = ri(0, k - 1); while (j === i);
        if (t === 0) return { kind: 'num', fig, q: L(`How many students chose ${cats[i][0]}?`, `有多少名學生選擇${cats[i][1]}？`), ans: vals[i], steps: [L(`Find the bar for ${cats[i][0]} and read across to the vertical axis.`, `找出「${cats[i][1]}」的棒，橫向讀出直軸上的數值。`), `<b>${vals[i]}</b>`] };
        if (t === 1) { if (vals[i] === vals[j]) return null; const [a, b] = vals[i] > vals[j] ? [i, j] : [j, i];
          return { kind: 'num', fig, q: L(`How many more students chose ${cats[a][0]} than ${cats[b][0]}?`, `選擇${cats[a][1]}的學生比選擇${cats[b][1]}的多多少人？`), ans: vals[a] - vals[b], steps: [`${cats[a][0]} ${cats[a][1]}: ${vals[a]}, ${cats[b][0]} ${cats[b][1]}: ${vals[b]}`, `${vals[a]} − ${vals[b]} = <b>${vals[a] - vals[b]}</b>`] }; }
        if (t === 2) { const tot = vals.reduce((a, b) => a + b); return { kind: 'num', fig, q: L('How many students are there in total?', '學生總數是多少？'), ans: tot, steps: [L('Add all the bars', '把所有棒的數值相加') + `: ${vals.join(' + ')} = <b>${tot}</b>`] }; }
        const mx = Math.max(...vals); if (vals.filter(x => x === mx).length > 1) return null; const im = vals.indexOf(mx);
        return { kind: 'mc', fig, q: L('Which is the most popular?', '哪一項最受歡迎？'), choices: [catName(cats[im]), ...cats.filter((_, x) => x !== im).map(catName)], steps: [L('Most popular = the tallest bar.', '最受歡迎 = 最高的棒。'), `<b>${catName(cats[im])}</b> (${mx})`] };
      }
    },
    {
      id: 'pie', name: ['Pie charts', '圓形圖'], gen() {
        const [te, tz, cs] = pick(CATS); const sets = [[180, 90, 60, 30], [120, 90, 90, 60], [150, 90, 72, 48], [144, 108, 72, 36], [90, 90, 120, 60], [160, 80, 60, 60], [135, 90, 90, 45]];
        const angles = shuffle(pick(sets)); const cats = cs.slice(0, 4); const labs = cats.map(c => LANG === 'zh' ? c[1] : c[0]);
        const t = ri(0, 2); const i = ri(0, 3);
        if (t === 0) { const N = pick([36, 72, 120, 180, 360, 240, 60, 90]); const cnt = angles[i] * N / 360; if (!Number.isInteger(cnt)) return null;
          return { kind: 'num', fig: pieChart({ title: `${lb(te, tz)} (${N} ${lb('students', '名學生')})`, labels: labs, angles }), q: L(`${N} students were asked. How many chose ${cats[i][0]}?`, `共訪問了 ${N} 名學生。有多少人選擇${cats[i][1]}？`), ans: cnt, steps: [L('Number = angle ÷ 360° × total', '人數 = 角度 ÷ 360° × 總數'), `${fr(angles[i] + '°', '360°')} × ${N} = <b>${cnt}</b>`] }; }
        if (t === 1) { const others = angles.filter((_, k) => k !== i);
          return { kind: 'num', post: '°', fig: pieChartX({ title: lb(te, tz), labels: labs, angles, unknown: i }), q: L(`Find the angle of the sector “${cats[i][0]}”.`, `求「${cats[i][1]}」扇形的角度。`), ans: angles[i], steps: [L('All angles add up to 360°.', '所有角度加起來是 360°。'), `360° − ${others.join('° − ')}° = <b>${angles[i]}°</b>`] }; }
        const pc = angles[i] / 360 * 100; if (!Number.isInteger(pc * 10)) return null;
        return { kind: 'num', post: '%', tol: .05, fig: pieChart({ title: lb(te, tz), labels: labs, angles }), q: L(`What percentage of students chose ${cats[i][0]}?`, `選擇${cats[i][1]}的學生佔百分之幾？`), ans: pc, steps: [L('Percentage = angle ÷ 360° × 100%', '百分比 = 角度 ÷ 360° × 100%'), `${fr(angles[i] + '°', '360°')} × 100% = <b>${pc}%</b>`] };
      }
    },
    {
      id: 'line', name: ['Broken-line graphs', '折線圖'], gen() {
        const ms = LANG === 'zh' ? ['1月', '2月', '3月', '4月', '5月', '6月'] : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']; const step = pick([5, 10]); const vals = ms.map(() => ri(2, 9) * step);
        const fig = lineChart({ title: lb('Number of visitors (hundreds)', '訪客人數（百人）'), labels: ms, values: vals, step }); const t = ri(0, 2);
        if (t === 0) { const i = ri(0, 4); const d = vals[i + 1] - vals[i]; if (d === 0) return null;
          return { kind: 'num', fig, q: L(`By how much did the number ${d > 0 ? 'increase' : 'decrease'} from ${ms[i]} to ${ms[i + 1]}? (in hundreds)`, `由${ms[i]}至${ms[i + 1]}，人數${d > 0 ? '增加' : '減少'}了多少？（以百人計）`), ans: Math.abs(d), steps: [`${ms[i]}: ${vals[i]}, ${ms[i + 1]}: ${vals[i + 1]}`, `${Math.max(vals[i], vals[i + 1])} − ${Math.min(vals[i], vals[i + 1])} = <b>${Math.abs(d)}</b>`] }; }
        if (t === 1) { const mx = Math.max(...vals); if (vals.filter(x => x === mx).length > 1) return null; const im = vals.indexOf(mx);
          return { kind: 'mc', fig, q: L('In which month was the number of visitors the greatest?', '哪一個月的訪客最多？'), choices: [ms[im], ...shuffle(ms.filter((_, k) => k !== im)).slice(0, 3)], steps: [L('Greatest = the highest point.', '最多 = 最高的點。'), `<b>${ms[im]}</b> (${mx})`] }; }
        const inc = vals.slice(1).map((x, k) => x - vals[k]); const mx = Math.max(...inc); if (mx <= 0 || inc.filter(x => x === mx).length > 1) return null; const k = inc.indexOf(mx);
        return { kind: 'mc', fig, q: L('Between which two months was the INCREASE the greatest?', '哪兩個月之間的升幅最大？'), choices: inc.map((_, j) => `${ms[j]} → ${ms[j + 1]}`).filter((_, j) => j !== k).slice(0, 3).reduce((a, x) => a.concat(x), [`${ms[k]} → ${ms[k + 1]}`]), steps: [L('The steepest line going UP.', '向上最斜的線段。'), `${ms[k]} → ${ms[k + 1]}: ${vals[k + 1]} − ${vals[k]} = <b>${mx}</b>`] };
      }
    },
    {
      id: 'comp', name: ['Two sets of data', '兩組數據'], gen() {
        const cl = ['1A', '1B', '1C', '1D']; const bo = cl.map(() => ri(12, 20)), gi = cl.map(() => ri(12, 20));
        const fig = compBar({ title: lb('Students in S1 classes', '中一各班人數'), labels: cl, series: [{ name: lb('Boys', '男'), values: bo, color: '#3b82f6' }, { name: lb('Girls', '女'), values: gi, color: '#f472b6' }], step: 4 });
        const i = ri(0, 3); const t = ri(0, 2);
        if (t === 0) return { kind: 'num', fig, q: L(`How many students are there in ${cl[i]}?`, `${cl[i]} 班有多少名學生？`), ans: bo[i] + gi[i], steps: [`${L('Boys', '男生')} ${bo[i]} + ${L('girls', '女生')} ${gi[i]} = <b>${bo[i] + gi[i]}</b>`] };
        if (t === 1) { if (bo[i] === gi[i]) return null; return { kind: 'num', fig, q: L(`In ${cl[i]}, what is the difference between the number of boys and girls?`, `${cl[i]} 班男生和女生人數相差多少？`), ans: Math.abs(bo[i] - gi[i]), steps: [`${Math.max(bo[i], gi[i])} − ${Math.min(bo[i], gi[i])} = <b>${Math.abs(bo[i] - gi[i])}</b>`] }; }
        const tb = bo.reduce((a, b) => a + b); return { kind: 'num', fig, q: L('How many boys are there in S1 altogether?', '中一共有多少名男生？'), ans: tb, steps: [L('Add the blue bars', '把藍色的棒相加') + `: ${bo.join(' + ')} = <b>${tb}</b>`] };
      }
    },
    {
      id: 'disc', name: ['Discrete or continuous', '離散或連續'], gen() {
        const D = [['the number of students in a class', '一班的學生人數'], ['the number of goals in a match', '一場比賽的入球數目'], ['the number of pets at home', '家中寵物的數目'], ['the number of cars in a car park', '停車場內汽車的數目'], ['the number of red cards in a pack', '一副牌中紅色牌的數目'], ['the shoe size of students', '學生的鞋碼'], ['the number of questions answered correctly', '答對題目的數目']];
        const C = [['the height of a student', '學生的身高'], ['the weight of a bag of rice', '一包米的重量'], ['the time taken to finish a race', '完成比賽所需的時間'], ['the temperature of a room', '房間的溫度'], ['the length of a pencil', '鉛筆的長度'], ['the volume of water in a bottle', '樽內水的容量']];
        const isD = Math.random() < .5; const it = pick(isD ? D : C);
        return { kind: 'mc', keep: 1, q: L(`Is “${it[0]}” discrete data or continuous data?`, `「${it[1]}」是離散數據還是連續數據？`), choices: isD ? [T('Discrete data', '離散數據'), T('Continuous data', '連續數據')] : [T('Continuous data', '連續數據'), T('Discrete data', '離散數據')],
          steps: [isD ? L('It is COUNTED → discrete.', '它是數出來的 → 離散數據。') : L('It is MEASURED → continuous.', '它是量度出來的 → 連續數據。')], hint: L('Counted → discrete. Measured → continuous.', '數出來 → 離散；量度出來 → 連續。') };
      }
    },
    {
      id: 'freq', name: ['Frequency tables', '頻數分佈表'], gen() {
        const N = ri(16, 24); const data = [...Array(N)].map(() => pick([0, 1, 1, 2, 2, 2, 3, 3, 4, 5]));
        const cnt = [0, 1, 2, 3, 4, 5].map(k => data.filter(x => x === k).length);
        const table = `<table class="t"><tr><th>${L('No. of siblings', '兄弟姊妹數目')}</th>${[0, 1, 2, 3, 4, 5].map(k => `<td>${k}</td>`).join('')}</tr><tr><th>${L('Frequency', '頻數')}</th>${cnt.map(c => `<td>${c}</td>`).join('')}</tr></table>`;
        const raw = `<div style="font-family:monospace;font-size:1.05em;letter-spacing:2px;max-width:480px;text-align:center">${data.join('&nbsp; ')}</div>`;
        const t = ri(0, 2);
        if (t === 0) { const k = ri(0, 5); return { kind: 'num', fig: raw, q: L(`The data show the number of siblings of ${N} students. Make a frequency table. What is the frequency of “${k}”?`, `下列數據是 ${N} 名學生的兄弟姊妹數目。製作頻數分佈表。「${k}」的頻數是多少？`), ans: cnt[k], steps: [L('Tally each number:', '逐一劃記：'), table, L(`Frequency of ${k}`, `${k} 的頻數`) + ` = <b>${cnt[k]}</b>`], hint: L('Cross out each number as you count.', '數過就劃掉。') }; }
        const k = ri(2, 4); const ans = cnt.slice(k).reduce((a, b) => a + b);
        if (t === 1) return { kind: 'num', fig: table, q: L(`The table shows the number of siblings of some students. How many students have ${k} or more siblings?`, `下表顯示一些學生的兄弟姊妹數目。有多少名學生有 ${k} 個或以上兄弟姊妹？`), ans, steps: [L(`“${k} or more” means ${[...Array(6 - k)].map((_, i) => k + i).join(', ')}`, `「${k} 個或以上」即 ${[...Array(6 - k)].map((_, i) => k + i).join('、')}`), `${cnt.slice(k).join(' + ')} = <b>${ans}</b>`] };
        return { kind: 'num', fig: table, q: L('The table shows the number of siblings of some students. How many students are there in total?', '下表顯示一些學生的兄弟姊妹數目。共有多少名學生？'), ans: N, steps: [L('Total = add all frequencies', '總數 = 所有頻數之和') + `: ${cnt.join(' + ')} = <b>${N}</b>`] };
      }
    },
    {
      id: 'gfreq', name: ['Grouped frequency tables', '分組頻數分佈表'], gen() {
        const N = ri(15, 20); const data = [...Array(N)].map(() => ri(40, 99)); const groups = [40, 50, 60, 70, 80, 90];
        const cnt = groups.map(g => data.filter(x => x >= g && x <= g + 9).length);
        const raw = `<div style="font-family:monospace;font-size:1.05em;letter-spacing:1px;max-width:480px;text-align:center">${data.join(' &nbsp;')}</div>`;
        const table = `<table class="t"><tr><th>${L('Marks', '分數')}</th>${groups.map(g => `<td>${g}–${g + 9}</td>`).join('')}</tr><tr><th>${L('Frequency', '頻數')}</th>${cnt.map(c => `<td>${c}</td>`).join('')}</tr></table>`;
        if (Math.random() < .5) { const i = ri(0, 5); const g = groups[i];
          return { kind: 'num', fig: raw, q: L(`The test marks of ${N} students are shown. How many students scored ${g}–${g + 9}?`, `以下是 ${N} 名學生的測驗分數。有多少名學生的分數在 ${g}–${g + 9} 之間？`), ans: cnt[i], steps: [L(`Count the marks from ${g} to ${g + 9}: `, `點算 ${g} 至 ${g + 9} 的分數：`) + (data.filter(x => x >= g && x <= g + 9).join(', ') || L('none', '沒有')), table, `<b>${cnt[i]}</b>`] }; }
        const g = pick([60, 70, 80]); const ans = data.filter(x => x >= g).length;
        return { kind: 'num', fig: table, q: L(`The table shows the test marks of ${N} students. How many students scored ${g} marks or above?`, `下表顯示 ${N} 名學生的測驗分數。有多少名學生得 ${g} 分或以上？`), ans, steps: [L(`Add the groups from ${g}–${g + 9} upwards`, `把 ${g}–${g + 9} 及以上各組相加`) + `: ${cnt.slice(groups.indexOf(g)).join(' + ')} = <b>${ans}</b>`] };
      }
    },
    {
      id: 'stem', name: ['Stem-and-leaf diagrams', '幹葉圖'], gen() {
        const N = ri(12, 18); const lo = pick([3, 4, 5]); const data = [...Array(N)].map(() => ri(lo * 10, lo * 10 + 39)); const fig = stemLeaf(data) + `<div class="sub" style="text-align:center;font-size:.85em">${L(`Key: ${lo} | 2 means ${lo}2`, `代號：${lo} | 2 表示 ${lo}2`)}</div>`;
        const s = data.slice().sort((a, b) => a - b); const t = ri(0, 3); const wrap = `<div>${fig}</div>`;
        if (t === 0) return { kind: 'num', fig: wrap, q: L('The diagram shows the weights (kg) of some students. What is the heaviest weight?', '幹葉圖顯示一些學生的體重（kg）。最重的是多少？'), post: 'kg', ans: s[N - 1], steps: [L('Heaviest: the LAST leaf on the BOTTOM stem.', '最重：最下面一行的最後一片葉。'), `<b>${s[N - 1]} kg</b>`] };
        if (t === 1) return { kind: 'num', fig: wrap, q: L('The diagram shows the weights (kg) of some students. What is the lightest weight?', '幹葉圖顯示一些學生的體重（kg）。最輕的是多少？'), post: 'kg', ans: s[0], steps: [L('Lightest: the FIRST leaf on the TOP stem.', '最輕：最上面一行的第一片葉。'), `<b>${s[0]} kg</b>`] };
        if (t === 2) return { kind: 'num', fig: wrap, q: L('How many students are there?', '共有多少名學生？'), ans: N, steps: [L('Count ALL the leaves.', '數一數所有的葉。'), `<b>${N}</b>`] };
        const k = lo * 10 + ri(10, 30); const ans = data.filter(x => x > k).length;
        return { kind: 'num', fig: wrap, q: L(`The diagram shows the weights (kg) of some students. How many students are heavier than ${k} kg?`, `幹葉圖顯示一些學生的體重（kg）。有多少名學生重於 ${k} kg？`), ans, steps: [L(`Count the leaves for numbers MORE than ${k} (not equal).`, `點算大於 ${k} 的數（不包括等於）。`), `${s.filter(x => x > k).join(', ') || L('none', '沒有')}`, `<b>${ans}</b>`] };
      }
    },
    {
      id: 'stem2', name: ['Back-to-back stem-and-leaf', '背對背幹葉圖'], gen() {
        const A = [...Array(ri(8, 11))].map(() => ri(50, 89)), Bd = [...Array(ri(8, 11))].map(() => ri(55, 99));
        const fig = `<div>${stemLeaf2(A, Bd, lb('Class A', '甲班'), lb('Class B', '乙班'))}<div class="sub" style="text-align:center;font-size:.85em">${L('Key: 3 | 6 means 63 for Class A; 6 | 3 means 63 for Class B', '代號：甲班 3 | 6 表示 63；乙班 6 | 3 表示 63')}</div></div>`;
        const t = ri(0, 2);
        if (t === 0) { const mx = Math.max(...A); return { kind: 'num', fig, q: L('What is the highest mark in Class A (the LEFT side)?', '甲班（左邊）的最高分是多少？'), ans: mx, steps: [L('Left side: find the LOWEST row that has leaves on the left, then take the leaf FURTHEST from the stem.', '左邊：找出左邊有葉的最下一行，取離幹最遠的葉。'), L('Remember: stem first, then leaf.', '記住：先讀幹，再讀葉。') + ` → <b>${mx}</b>`] }; }
        if (t === 1) { const k = pick([60, 70, 80]); const ans = Bd.filter(x => x >= k).length; return { kind: 'num', fig, q: L(`How many students in Class B scored ${k} or more?`, `乙班有多少名學生得 ${k} 分或以上？`), ans, steps: [L(`Right side: count leaves on stems ${k / 10} and above.`, `右邊：點算幹 ${k / 10} 及以上的葉。`), `<b>${ans}</b>`] }; }
        const mn = Math.min(...A); return { kind: 'num', fig, q: L('What is the lowest mark in Class A (the LEFT side)?', '甲班（左邊）的最低分是多少？'), ans: mn, steps: [L('Left side: find the HIGHEST row that has leaves on the left, then take the leaf NEXT to the stem.', '左邊：找出左邊有葉的最上一行，取最貼近幹的葉。'), `<b>${mn}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch8', no: 8, color: COLORS[8], title: ['Statistics (I)', '統計（一）'], short: ['Statistics', '統計'],
    intro: ['Reading statistical diagrams, types of data, frequency tables and stem-and-leaf diagrams.', '閱讀統計圖表、數據的分類、頻數分佈表和幹葉圖。'],
    lessons, gens,
    keys: [B('Bar chart → compare; pie chart → parts of a whole; broken-line graph → change over time.', '棒形圖 → 比較；圓形圖 → 整體中的部分；折線圖 → 隨時間的變化。'),
    B('Pie chart: number = angle/360° × total. All angles add up to 360°.', '圓形圖：數量 = 角度/360° × 總數；所有角度加起來是 360°。'),
    B('Discrete = counted. Continuous = measured.', '離散 = 數出來；連續 = 量度出來。'),
    B('Total frequency = number of data.', '頻數總和 = 數據的數目。'),
    B('Stem-and-leaf: leaves in order, add a key. Back-to-back: left side read right to left (3 | 5 → 53).', '幹葉圖：葉要排序，要寫代號。背對背：左邊由右至左讀（3 | 5 → 53）。')],
    traps: [B('Read the scale on the axis carefully — each line may be 2, 5 or 10!', '小心看軸上的刻度——每格可能是 2、5 或 10！'),
    B('“More than 60” does NOT include 60. “60 or above” DOES include 60.', '「多於 60」不包括 60；「60 或以上」包括 60。'),
    B('✘ left side 3 | 5 = 35 &nbsp; ✔ = 53 in a back-to-back diagram', '✘ 背對背幹葉圖左邊 3 | 5 = 35 &nbsp; ✔ = 53'),
    B('✘ shoe size is continuous &nbsp; ✔ discrete (only certain sizes)', '✘ 鞋碼是連續數據 &nbsp; ✔ 離散數據（只有某些尺碼）')],
    cheat: [`${L('Pie', '圓形圖')}: ${fr(L('angle', '角度'), '360°')} × ${L('total', '總數')}`, `${L('Discrete = count; continuous = measure', '離散 = 數；連續 = 量')}`, `${L('Stem = tens, leaf = units; leaves in order; key!', '幹 = 十位，葉 = 個位；葉要排序；寫代號！')}`, `${L('Back-to-back left', '背對背左邊')}: 3 | 5 → 53`]
  });
})();
