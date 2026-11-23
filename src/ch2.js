/* ================= Chapter 2 Directed Numbers ================= */
(function () {
  /* animated number line: start at a, then move by steps */
  function NL(title, min, max, moves, intro) {
    /* moves: [{to, c:[en,zh], col}] ; intro caption first */
    const W = 600, pad = 30, X = t => pad + (t - min) / (max - min) * (W - 2 * pad);
    return {
      title, minH: 170,
      setup(stage) {
        const s = svgRoot(stage, W, 150); const st = { s, X };
        S('line', { x1: 8, y1: 100, x2: W - 8, y2: 100, stroke: '#334155', 'stroke-width': 2.5 }, s);
        S('path', { d: `M${W - 6},100 l-10,-6 v12z M6,100 l10,-6 v12z`, fill: '#334155' }, s);
        for (let t = min; t <= max; t++) { S('line', { x1: X(t), y1: 93, x2: X(t), y2: 107, stroke: '#334155', 'stroke-width': 1.6 }, s); S('text', { x: X(t), y: 128, 'text-anchor': 'middle', 'font-size': 14, 'font-weight': t === 0 ? 900 : 500, fill: t < 0 ? '#dc2626' : t > 0 ? '#2563eb' : '#111', text: n(t) }, s); }
        st.arcs = moves.map((m, i) => { const p = S('path', { fill: 'none', stroke: m.col || '#f59e0b', 'stroke-width': 3, opacity: 0, class: 'tr', 'marker-end': '' }, s); return p; });
        st.labels = moves.map(m => S('text', { 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 900, fill: m.col || '#c2410c', opacity: 0, class: 'tr', text: m.lab || '' }, s));
        st.dot = S('g', { class: 'tr' }, s);
        S('circle', { cx: 0, cy: 100, r: 9, fill: '#16a34a', stroke: '#fff', 'stroke-width': 2 }, st.dot);
        S('text', { x: 0, y: 84, 'text-anchor': 'middle', 'font-size': 18, text: '🐸' }, st.dot);
        st.dot.setAttribute('opacity', 0);
        return st;
      },
      frames: [{ c: intro, f() { } }].concat(moves.map((m, i) => ({
        c: m.c, d: 3400, f(st) {
          if (m.start) { st.dot.setAttribute('opacity', 1); mv(st.dot, X(m.to), 0); return; }
          const from = moves[i - 1].to; const x0 = X(from), x1 = X(m.to); const h = Math.min(60, Math.abs(x1 - x0) * .35 + 15);
          st.arcs[i].setAttribute('d', `M${x0},92 Q${(x0 + x1) / 2},${92 - h * 1.6} ${x1},92`); st.arcs[i].setAttribute('opacity', 1);
          st.labels[i].setAttribute('x', (x0 + x1) / 2); st.labels[i].setAttribute('y', 92 - h * .8 - 4); st.labels[i].setAttribute('opacity', 1);
          mv(st.dot, x1, 0);
        }
      })))
    };
  }
  const seaAnim = {
    title: L('Above and below sea level', '海平面以上和以下'), minH: 260,
    setup(stage) {
      const s = svgRoot(stage, 520, 250); const st = {};
      S('rect', { x: 0, y: 125, width: 520, height: 125, fill: '#bfdbfe' }, s);
      S('line', { x1: 0, y1: 125, x2: 520, y2: 125, stroke: '#1d4ed8', 'stroke-width': 3 }, s);
      S('text', { x: 400, y: 118, 'font-size': 14, 'font-weight': 800, fill: '#1d4ed8', text: '0 m (sea level 海平面)' }, s);
      for (let k = -20; k <= 20; k += 5) { const y = 125 - k * 5; S('line', { x1: 60, y1: y, x2: 70, y2: y, stroke: '#334155' }, s); S('text', { x: 54, y: y + 4, 'text-anchor': 'end', 'font-size': 12, text: (k > 0 ? '+' : '') + n(k) }, s); }
      S('line', { x1: 65, y1: 20, x2: 65, y2: 230, stroke: '#334155', 'stroke-width': 2 }, s);
      st.bird = S('text', { x: 0, y: 0, 'font-size': 34, text: '🐦', class: 'tr', opacity: 0 }, s); mv(st.bird, 160, 125);
      st.bl = S('text', { x: 205, y: 30, 'font-size': 16, 'font-weight': 900, fill: '#2563eb', opacity: 0, class: 'tr', text: '+20 m' }, s);
      st.fish = S('text', { x: 0, y: 0, 'font-size': 34, text: '🐟', class: 'tr', opacity: 0 }, s); mv(st.fish, 280, 135);
      st.fl = S('text', { x: 325, y: 205, 'font-size': 16, 'font-weight': 900, fill: '#dc2626', opacity: 0, class: 'tr', text: '−15 m' }, s);
      return st;
    },
    frames: [
      { c: ['Sea level = 0 m. Above +, below −.', '海平面 = 0 m。以上 +，以下 −。'], f() { } },
      { c: ['The bird flies 20 m ABOVE sea level → +20 m', '小鳥在海平面以上 20 m → +20 m'], f(st) { st.bird.setAttribute('opacity', 1); mv(st.bird, 160, 35); st.bl.setAttribute('opacity', 1); } },
      { c: ['The fish swims 15 m BELOW sea level → −15 m', '魚在海平面以下 15 m → −15 m'], f(st) { st.fish.setAttribute('opacity', 1); mv(st.fish, 280, 210); st.fl.setAttribute('opacity', 1); } },
      { c: ['+ and − show opposite directions: directed numbers.', '+ 和 − 表示相反方向：有向數。'], f() { } }
    ]
  };

  const lessons = [
    {
      t: ['Negative numbers and directed numbers', '負數及有向數'],
      body: ul([B(`Numbers with + or − signs are called ${T('directed numbers', '有向數')}.`, '帶有 + 或 − 號的數叫做有向數。'),
      B('+ and − show <b>opposite</b> meanings: above / below, profit / loss, deposit / withdraw, up / down.', '+ 和 − 表示<b>相反</b>的意思：以上 / 以下、賺 / 蝕、存款 / 提款、上 / 下。'),
      B('0 is neither positive nor negative.', '0 既不是正數，也不是負數。')]),
      anim: seaAnim
    },
    {
      t: ['Number line, comparing and opposite numbers', '數線、比較大小及相反數'],
      body: ul([B(`On a ${T('number line', '數線')}, numbers get <b>bigger</b> as you go to the <b>right</b>.`, '在數線上，越向<b>右</b>，數就越<b>大</b>。'),
      B('Any positive number > 0 > any negative number.', '正數 > 0 > 負數。'),
      B('For negatives: the one closer to 0 is bigger. −2 > −5', '負數之中，越接近 0 越大。−2 > −5'),
      B(`${T('Opposite numbers', '相反數')}: same distance from 0, different signs. e.g. 3 and −3`, '相反數：與 0 的距離相同，但符號不同。例如 3 和 −3')]),
      anim: NL(L('Which is bigger: −5 or −2?', '哪個較大：−5 還是 −2？'), -7, 7, [
        { to: -5, start: 1, c: ['Put −5 on the number line.', '在數線上找出 −5。'] },
        { to: -2, lab: '→ bigger 較大', col: '#16a34a', c: ['−2 is to the RIGHT, so −2 > −5.', '−2 在右邊，所以 −2 > −5。'] },
        { to: 2, lab: '→ bigger 較大', col: '#16a34a', c: ['2 is further right again. So 2 > −2 > −5', '2 再向右，所以 2 > −2 > −5'] }
      ], ['Remember: right = bigger, left = smaller.', '記住：右邊較大，左邊較小。'])
    },
    {
      t: ['Addition and subtraction', '加法及減法'],
      body: box('rule', L('Sign rules for brackets', '去括號的符號規則'), `<table class="t"><tr><td>+ (+3)</td><td>➜</td><td><b>+ 3</b></td><td style="border:0"></td><td>+ (−3)</td><td>➜</td><td><b class="red">− 3</b></td></tr><tr><td>− (+3)</td><td>➜</td><td><b class="red">− 3</b></td><td style="border:0"></td><td>− (−3)</td><td>➜</td><td><b class="green">+ 3</b></td></tr></table>` + B('Same signs → +, different signs → −.', '相同符號 → +，不同符號 → −。')) +
        B('On a number line: <b>+</b> means move <b>right</b>, <b>−</b> means move <b>left</b>.', '在數線上：<b>+</b> 是向<b>右</b>移，<b>−</b> 是向<b>左</b>移。'),
      anim: [
        NL(`(−3) + (+5)`, -8, 8, [{ to: -3, start: 1, c: ['Start at −3.', '由 −3 開始。'] }, { to: 2, lab: '+5', c: ['+5 → move 5 steps to the RIGHT. We land on 2.', '+5 → 向右移 5 步，去到 2。'] }], ['Find (−3) + (+5) using the number line.', '用數線計算 (−3) + (+5)。']),
        NL(`(+2) − (+6)`, -8, 8, [{ to: 2, start: 1, c: ['Start at +2.', '由 +2 開始。'] }, { to: -4, lab: '−6', col: '#dc2626', c: ['− 6 → move 6 steps to the LEFT. We land on −4.', '− 6 → 向左移 6 步，去到 −4。'] }], ['Find (+2) − (+6).', '計算 (+2) − (+6)。']),
        W(L('Subtracting a negative number', '減去負數'), [
          { h: '3 − (−4)', c: ['There is “− (−” here.', '這裏有「− (−」。'] },
          { h: '3 <span class="hl">− (−</span>4)', r: 1, c: ['Two minus signs together → becomes +', '兩個減號在一起 → 變成 +'] },
          { h: '3 <span class="hl3">+</span> 4', eq: 1, c: ['So 3 − (−4) = 3 + 4', '所以 3 − (−4) = 3 + 4'] },
          { h: '<b class="green">7</b>', eq: 1, c: ['= 7', '= 7'] }
        ])
      ]
    },
    {
      t: ['Multiplication and division', '乘法及除法'],
      body: box('rule', L('Sign rules for × and ÷', '乘除的符號規則'), `<table class="t"><tr><th>×  ÷</th><th>+</th><th>−</th></tr><tr><th>+</th><td class="green">+</td><td class="red">−</td></tr><tr><th>−</th><td class="red">−</td><td class="green">+</td></tr></table>` + B('<b>Same</b> signs → answer is <b class="green">positive (+)</b>. <b>Different</b> signs → answer is <b class="red">negative (−)</b>.', '<b>相同</b>符號 → 答案是<b class="green">正數</b>；<b>不同</b>符號 → 答案是<b class="red">負數</b>。')),
      anim: W(L('Two steps: sign, then number', '兩步：先定符號，再計數值'), [
        { h: '(−6) × (−9)', c: ['Step 1: look at the signs: − and − are the SAME.', '第 1 步：看符號：− 和 − 相同。'] },
        { h: '<span class="hl3">+</span>(6 × 9)', eq: 1, c: ['Same signs → +', '相同符號 → +'] },
        { h: '<b class="green">54</b>', eq: 1, c: ['Step 2: 6 × 9 = 54', '第 2 步：6 × 9 = 54'] },
        { h: '(−48) ÷ (+6)', c: ['Next one. − and + are DIFFERENT.', '下一題。− 和 + 不同。'] },
        { h: '<span class="hl">−</span>(48 ÷ 6)', eq: 1, c: ['Different signs → −', '不同符號 → −'] },
        { h: '<b class="red">−8</b>', eq: 1, c: ['48 ÷ 6 = 8, so the answer is −8.', '48 ÷ 6 = 8，所以答案是 −8。'] }
      ])
    },
    {
      t: ['Mixed operations of directed numbers', '有向數的混合運算'],
      body: B('Order: brackets → × ÷ → + −. Watch the signs.', '次序：括號 → × ÷ → + −。小心符號。'),
      anim: W(L('Example', '例題'), [
        { h: '−15 + (−60) ÷ (−12)', c: ['Do ÷ before +.', '先計 ÷ 再計 +。'] },
        { h: '−15 + <span class="hl">(−60) ÷ (−12)</span>', r: 1, c: ['(−60) ÷ (−12): same signs → +5', '(−60) ÷ (−12)：相同符號 → +5'] },
        { h: '−15 + 5', eq: 1, c: ['Now add. Start at −15 and move 5 to the right.', '現在相加。由 −15 開始，向右移 5。'] },
        { h: '<b class="red">−10</b>', eq: 1, c: ['Answer −10', '答案 −10'] }
      ])
    }
  ];

  /* ---------- generators ---------- */
  const SCN = [
    ['m', 'above sea level', 'below sea level', '海平面以上', '海平面以下'],
    ['$', 'deposit (put money into the bank)', 'withdrawal (take money out)', '存款', '提款'],
    ['$', 'profit', 'loss', '賺錢', '蝕錢'],
    ['°C', 'above zero', 'below zero', '零上', '零下'],
    ['floors', 'going up', 'going down', '向上', '向下'],
    ['km', 'to the east', 'to the west', '向東', '向西'],
    ['kg', 'increase in weight', 'decrease in weight', '體重增加', '體重減少']
  ];
  const fmtU = (u, x) => u === '$' ? '$' + x : x + ' ' + u;
  const randDir = () => { const t = Math.random(); if (t < .15) return ri(-9, 9) + pick([.5, .2]) * (Math.random() < .5 ? 1 : -1); return nz(-15, 15); };

  const gens = [
    {
      id: 'meaning', name: ['Meaning of + and −', '+ 和 − 的意思'], gen() {
        const [u, p, q, pz, qz] = pick(SCN); const a = ri(5, 50), b = ri(3, 40); const neg = Math.random() < .6;
        const val = neg ? -b : b; const ok = neg ? [q, qz] : [p, pz]; const bad = neg ? [p, pz] : [q, qz];
        return {
          kind: 'mc', q: B(`If +${fmtU(u, a)} means ${fmtU(u, a)} ${p}, what does ${val > 0 ? '+' + val : n(val)} ${u === '$' ? '' : u}${u === '$' ? '(dollars)' : ''} mean?`, `如果 +${fmtU(u, a)} 表示${pz} ${fmtU(u, a)}，那麼 ${val > 0 ? '+' + val : n(val)} ${u === '$' ? '元' : u} 表示甚麼？`),
          choices: [L(`${fmtU(u, b)} ${ok[0]}`, `${ok[1]} ${fmtU(u, b)}`), L(`${fmtU(u, b)} ${bad[0]}`, `${bad[1]} ${fmtU(u, b)}`), L(`${fmtU(u, a + b)} ${ok[0]}`, `${ok[1]} ${fmtU(u, a + b)}`), L(`${fmtU(u, Math.abs(a - b) || 1)} ${bad[0]}`, `${bad[1]} ${fmtU(u, Math.abs(a - b) || 1)}`)],
          steps: [L(`+ means “${p}”, so − means the opposite: “${q}”.`, `+ 表示「${pz}」，所以 − 表示相反：「${qz}」。`), L(`${n(val)} means ${fmtU(u, b)} ${ok[0]}.`, `${n(val)} 表示${ok[1]} ${fmtU(u, b)}。`)], hint: L('+ and − are opposites.', '+ 和 − 意思相反。')
        };
      }
    },
    {
      id: 'compare', name: ['Compare (< or >)', '比較大小（< 或 >）'], gen() {
        let a = randDir(), b = randDir(); if (a === b) return null; if (Math.random() < .5) { a = -Math.abs(a); b = -Math.abs(b); if (a === b) return null; }
        const ans = a > b ? '>' : '<';
        return { kind: 'mc', keep: 1, q: L('Fill in &lt; or &gt;', '填上 &lt; 或 &gt;') + `<span class="big">${n(a)} &nbsp;☐&nbsp; ${n(b)}</span>`, fig: numberLineSVG(Math.floor(Math.min(a, b, 0)) - 1, Math.ceil(Math.max(a, b, 0)) + 1, {}),
          choices: ans === '>' ? ['&gt; ' + L('(bigger)', '（大於）'), '&lt; ' + L('(smaller)', '（小於）')] : ['&lt; ' + L('(smaller)', '（小於）'), '&gt; ' + L('(bigger)', '（大於）')],
          steps: [L('On the number line, the number on the right is bigger.', '在數線上，右邊的數較大。'), `${n(Math.max(a, b))} ${L('is on the right of', '在右邊；')} ${n(Math.min(a, b))}${L('.', '在左邊。')}`, `<b>${n(a)} ${ans === '>' ? '&gt;' : '&lt;'} ${n(b)}</b>`], hint: L('Right is bigger. For negatives, closer to 0 is bigger.', '右邊較大。負數越接近 0 越大。') };
      }
    },
    {
      id: 'order', name: ['Ascending / descending order', '遞增 / 遞減次序'], gen() {
        const set = new Set(); while (set.size < 4) set.add(nz(-12, 12)); if (Math.random() < .5) set.add(0);
        const arr = shuffle([...set]).slice(0, 4); const asc = Math.random() < .5;
        const right = arr.slice().sort((x, y) => asc ? x - y : y - x);
        const wrong1 = arr.slice().sort((x, y) => asc ? Math.abs(x) - Math.abs(y) : Math.abs(y) - Math.abs(x));
        const wrong2 = right.slice().reverse(); const wrong3 = arr.slice().sort((x, y) => asc ? (x < 0 ? -x : x) - (y < 0 ? -y : y) + (x < 0) - (y < 0) : 0);
        const f = a => a.map(n).join(', ');
        return { kind: 'mc', q: B(`Arrange in <b>${asc ? 'ascending' : 'descending'} order</b> (${asc ? 'smallest first' : 'largest first'}):`, `以<b>${asc ? '遞增' : '遞減'}次序</b>排列（${asc ? '由小至大' : '由大至小'}）：`) + `<span class="big">${f(arr)}</span>`,
          choices: [f(right), f(wrong1), f(wrong2), f(shuffle(arr))], steps: [L('Number line: left = small, right = big.', '數線：左小右大。'), L(`The most negative number is the smallest: ${n(Math.min(...arr))}`, `最負的數最小：${n(Math.min(...arr))}`), `<b>${f(right)}</b>`], hint: asc ? L('Ascending = small → big', '遞增 = 由小至大') : L('Descending = big → small', '遞減 = 由大至小') };
      }
    },
    {
      id: 'nline', name: ['Read the number line', '讀數線'], gen() {
        const a = nz(-6, 6); let b; do b = nz(-6, 6); while (b === a);
        const t = ri(0, 2);
        if (t < 2) { const which = t === 0 ? 'A' : 'B'; const val = t === 0 ? a : b;
          return { kind: 'num', q: L(`What number does point ${which} represent?`, `點 ${which} 代表哪一個數？`), fig: numberLineSVG(-7, 7, { [a]: 'A', [b]: 'B' }, { hideNums: false }), ans: val, steps: [L(`Count the steps from 0. ${which} is ${Math.abs(val)} step(s) to the ${val < 0 ? 'left' : 'right'} of 0.`, `由 0 開始數。${which} 在 0 的${val < 0 ? '左' : '右'}邊 ${Math.abs(val)} 格。`), `${which} = <b>${n(val)}</b>`] }; }
        return { kind: 'num', q: L('What is the opposite number of A?', 'A 的相反數是甚麼？'), fig: numberLineSVG(-7, 7, { [a]: 'A' }), ans: -a, steps: [`A = ${n(a)}`, L('Opposite number: same distance from 0, other sign.', '相反數：與 0 的距離一樣，符號相反。'), `<b>${n(-a)}</b>`] };
      }
    },
    {
      id: 'addsub', name: ['Addition & subtraction', '加法及減法'], gen() {
        const a = nz(-20, 20), b = nz(-20, 20); const op = pick(['+', '−']);
        const bsign = b < 0 ? '−' : '+'; const newop = (op === bsign) ? '+' : '−';
        const ans = op === '+' ? a + b : a - b;
        const qh = `${sg(a)} ${op} ${sg(b)}`;
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${qh}</span>`, ans,
          steps: [L(`Remove brackets: “${op} (${bsign}” → ${newop === '+' ? '+' : MI}`, `去括號：「${op} (${bsign}」→ ${newop === '+' ? '+' : MI}`) + ` : ${n(a)} ${newop === '+' ? '+' : MI} ${Math.abs(b)}`,
          L(`Start at ${n(a)} and move ${Math.abs(b)} to the ${newop === '+' ? 'right' : 'left'}.`, `由 ${n(a)} 開始，向${newop === '+' ? '右' : '左'}移 ${Math.abs(b)}。`), `= <b>${n(ans)}</b>`],
          hint: L('Same signs → +, different signs → −', '相同符號 → +，不同符號 → −') };
      }
    },
    {
      id: 'muldiv', name: ['Multiplication & division', '乘法及除法'], gen() {
        const a = nz(-12, 12), b = nz(-12, 12); const op = pick(['×', '÷']);
        let A = a, Bv = b, ans; if (op === '×') ans = a * b; else { A = a * b; Bv = b; ans = a; }
        const same = (A < 0) === (Bv < 0);
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${sg(A)} ${op} ${sg(Bv)}</span>`, ans,
          steps: [L(`Signs: ${A < 0 ? '−' : '+'} and ${Bv < 0 ? '−' : '+'} are ${same ? 'the SAME → +' : 'DIFFERENT → −'}`, `符號：${A < 0 ? '−' : '+'} 和 ${Bv < 0 ? '−' : '+'} ${same ? '相同 → +' : '不同 → −'}`), `${Math.abs(A)} ${op} ${Math.abs(Bv)} = ${Math.abs(ans)}`, `${L('Answer', '答案')} = <b>${n(ans)}</b>`],
          hint: L('Same signs → +, different signs → −', '相同符號 → +，不同符號 → −') };
      }
    },
    {
      id: 'mixed', name: ['Mixed operations', '混合運算'], gen() {
        const t = ri(0, 3); let q, ans, s;
        if (t === 0) { const c = pick([2, 3, 4, 5, 6, 7, 8, 9]) * pick([1, -1]), k = nz(-8, 8), b = c * k, a = nz(-20, 20); q = `${n(a)} + ${sg(b)} ÷ ${sg(c)}`; ans = a + k; s = [L('÷ first', '先計 ÷') + `: ${sg(b)} ÷ ${sg(c)} = ${n(k)}`, `${n(a)} + ${nb(k)} = <b>${n(ans)}</b>`]; }
        if (t === 1) { const a = nz(-9, 9), b = nz(-9, 9), c = nz(-20, 20); q = `${sg(a)} × ${sg(b)} − ${sg(c)}`; ans = a * b - c; s = [L('× first', '先計 ×') + `: ${sg(a)} × ${sg(b)} = ${n(a * b)}`, `${n(a * b)} − ${sg(c)} = ${n(a * b)} ${c < 0 ? '+' : MI} ${Math.abs(c)} = <b>${n(ans)}</b>`]; }
        if (t === 2) { const a = nz(-15, 15), b = nz(-15, 15), c = nz(-6, 6); q = `[${n(a)} − ${sg(b)}] × ${sg(c)}`; ans = (a - b) * c; s = [L('Brackets first', '先計括號') + `: ${n(a)} − ${sg(b)} = ${n(a)} ${b < 0 ? '+' : MI} ${Math.abs(b)} = ${n(a - b)}`, `${nb(a - b)} × ${sg(c)} = <b>${n(ans)}</b>`]; }
        if (t === 3) { const a = nz(-6, 6), b = nz(-6, 6), c = nz(-5, 5), d = nz(-5, 5); q = `${sg(a)} × ${sg(b)} + ${sg(c)} × ${sg(d)}`; ans = a * b + c * d; s = [L('Do both × first', '先計兩個 ×') + `: ${n(a * b)} ${L('and', '和')} ${n(c * d)}`, `${n(a * b)} + ${nb(c * d)} = <b>${n(ans)}</b>`]; }
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${q}</span>`, ans, steps: s, hint: L('Brackets → × ÷ → + −. Watch the signs!', '括號 → × ÷ → + −。小心符號！') };
      }
    },
    {
      id: 'word', name: ['Word problems', '應用題'], gen() {
        const t = ri(0, 3);
        if (t === 0) { const a = ri(-8, 5), r = ri(3, 12); const ans = a + r; return { kind: 'num', post: '°C', q: B(`The temperature at 6 a.m. was ${n(a)}°C. It rose by ${r}°C by noon. What was the temperature at noon?`, `早上 6 時的氣溫是 ${n(a)}°C，到中午上升了 ${r}°C。中午的氣溫是多少？`), ans, steps: [L('Rise → +', '上升 → +') + `: ${n(a)} + ${r} = <b>${n(ans)}°C</b>`] }; }
        if (t === 1) { const a = ri(1, 8), d = ri(a + 1, a + 4); const ans = a - d; return { kind: 'num', q: B(`A lift is on floor ${a}. It goes down ${d} floors. Which floor is it on now? (Floor −1 means 1st basement.)`, `升降機在 ${a} 樓，向下移了 ${d} 層。現在在哪一層？（−1 樓表示地庫一樓。）`), ans, steps: [L('Down → −', '向下 → −') + `: ${a} − ${d} = <b>${n(ans)}</b>`] }; }
        if (t === 2) { const hi = ri(2, 15), lo = ri(-12, -1); return { kind: 'num', post: '°C', q: B(`The highest temperature of a city on a day was ${hi}°C and the lowest was ${n(lo)}°C. Find the difference between them.`, `某城市一天的最高氣溫是 ${hi}°C，最低氣溫是 ${n(lo)}°C。求兩者的相差。`), ans: hi - lo, steps: [L('Difference = highest − lowest', '相差 = 最高 − 最低'), `${hi} − ${sg(lo)} = ${hi} + ${-lo} = <b>${hi - lo}°C</b>`] }; }
        const s0 = ri(100, 500), w = ri(150, 700), dpos = ri(50, 300); const ans = s0 - w + dpos;
        return { kind: 'num', pre: '$', q: B(`Amy has $${s0} in the bank. She withdraws $${w} and then deposits $${dpos}. Using + for deposit and − for withdrawal, find the amount in the bank now (it may be negative).`, `Amy 的戶口有 $${s0}。她提款 $${w}，然後存款 $${dpos}。以 + 表示存款、− 表示提款，求戶口現在的金額（可以是負數）。`), ans, steps: [`${s0} + ${sg(-w)} + ${sg(dpos)}`, `= ${s0} − ${w} + ${dpos} = <b>${n(ans)}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch2', no: 2, color: COLORS[2], title: ['Directed Numbers', '有向數'], short: ['Directed Numbers', '有向數'],
    intro: ['Directed numbers are numbers with a + or − sign. They show opposite directions.', '有向數是帶有 + 或 − 號的數，用來表示相反的方向。'],
    lessons, gens,
    keys: [B('Right on the number line = bigger. −2 > −5.', '數線上越右越大。−2 > −5。'),
    B('Ascending = small → big. Descending = big → small.', '遞增 = 由小至大；遞減 = 由大至小。'),
    B('Opposite number of a is −a. Opposite of −4 is 4.', 'a 的相反數是 −a。−4 的相反數是 4。'),
    B('+(+) → +, −(−) → +, +(−) → −, −(+) → −', '+(+) → +，−(−) → +，+(−) → −，−(+) → −'),
    B('× ÷ : same signs → +, different signs → −.', '× ÷：同號得正，異號得負。')],
    traps: [B('✘ −5 > −2 (because 5 > 2) &nbsp; ✔ −5 < −2', '✘ −5 > −2（因為 5 > 2）&nbsp; ✔ −5 < −2'),
    B('✘ 3 − (−4) = −1 &nbsp; ✔ 3 + 4 = 7', '✘ 3 − (−4) = −1 &nbsp; ✔ 3 + 4 = 7'),
    B('✘ (−3) × (−4) = −12 &nbsp; ✔ +12', '✘ (−3) × (−4) = −12 &nbsp; ✔ +12'),
    B('✘ −3 + 5 = −8 &nbsp; ✔ start at −3, move 5 right → 2', '✘ −3 + 5 = −8 &nbsp; ✔ 由 −3 向右移 5 → 2')],
    cheat: [`${L('Right = bigger', '越右越大')}: −5 &lt; −2 &lt; 0 &lt; 3`, `−(−a) = +a &nbsp; +(−a) = −a`, `${L('× ÷ same signs', '同號')} → + , ${L('different', '異號')} → −`, `${L('Order still', '次序不變')}: ( ) → × ÷ → + −`]
  });
})();
