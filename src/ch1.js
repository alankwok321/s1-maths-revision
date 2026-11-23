/* ================= Chapter 1 Basic Computation ================= */
(function () {
  /* svg fraction text */
  function sfrac(svg, x, y, a, b, color = '#1d2a3a', size = 18) {
    const g = S('g', {}, svg);
    S('text', { x, y: y - 4, 'text-anchor': 'middle', 'font-size': size, 'font-weight': 800, fill: color, text: a }, g);
    S('line', { x1: x - 12, y1: y, x2: x + 12, y2: y, stroke: color, 'stroke-width': 2 }, g);
    S('text', { x, y: y + size, 'text-anchor': 'middle', 'font-size': size, 'font-weight': 800, fill: color, text: b }, g);
    return g;
  }
  const fracBars = () => ({
    title: L('Adding fractions with a bar model', '用長條圖做分數加法'), minH: 250,
    setup(stage) {
      const s = svgRoot(stage, 540, 240); const X0 = 70, Wd = 360;
      const st = { s };
      function bar(y, parts, shade, col) {
        const g = S('g', {}, s);
        S('rect', { x: X0, y, width: Wd, height: 40, fill: '#fff', stroke: '#334155', 'stroke-width': 2, rx: 3 }, g);
        for (let i = 0; i < shade; i++) S('rect', { x: X0 + i * Wd / parts, y, width: Wd / parts, height: 40, fill: col, opacity: .85 }, g);
        for (let i = 1; i < parts; i++) S('line', { x1: X0 + i * Wd / parts, y1: y, x2: X0 + i * Wd / parts, y2: y + 40, stroke: '#334155', 'stroke-width': 2 }, g);
        return g;
      }
      bar(20, 2, 1, '#60a5fa'); bar(90, 3, 1, '#fbbf24');
      st.l1 = sfrac(s, 30, 42, 1, 2, '#2563eb'); st.l2 = sfrac(s, 30, 112, 1, 3, '#b45309');
      /* sixth lines (hidden) */
      st.six = S('g', { opacity: 0, class: 'tr' }, s);
      [20, 90].forEach(y => { for (let i = 1; i < 6; i++) S('line', { x1: X0 + i * 60, y1: y, x2: X0 + i * 60, y2: y + 40, stroke: '#dc2626', 'stroke-width': 1.5, 'stroke-dasharray': '4 3' }, st.six); });
      st.l1b = sfrac(s, 470, 42, 3, 6, '#2563eb'); st.l2b = sfrac(s, 470, 112, 2, 6, '#b45309');
      st.l1b.setAttribute('opacity', 0); st.l2b.setAttribute('opacity', 0); st.l1b.classList.add('tr'); st.l2b.classList.add('tr');
      /* result bar */
      st.res = S('g', { opacity: 0, class: 'tr' }, s);
      S('rect', { x: X0, y: 170, width: Wd, height: 40, fill: '#fff', stroke: '#334155', 'stroke-width': 2, rx: 3 }, st.res);
      for (let i = 1; i < 6; i++) S('line', { x1: X0 + i * 60, y1: 170, x2: X0 + i * 60, y2: 210, stroke: '#94a3b8', 'stroke-width': 1.5 }, st.res);
      st.pb = S('rect', { x: X0, y: 20, width: 180, height: 40, fill: '#60a5fa', opacity: 0, class: 'tr' }, s);
      st.po = S('rect', { x: X0, y: 90, width: 120, height: 40, fill: '#fbbf24', opacity: 0, class: 'tr' }, s);
      st.l3 = sfrac(s, 470, 192, 5, 6, '#16a34a', 20); st.l3.setAttribute('opacity', 0); st.l3.classList.add('tr');
      return st;
    },
    frames: [
      { c: [`We want ${fr(1, 2)} + ${fr(1, 3)}. The pieces are different sizes, so we cannot add them yet.`, `我們要計算 ${fr(1, 2)} + ${fr(1, 3)}。兩份的大小不同，所以還不能直接相加。`], f() { } },
      { c: [`Cut both bars into 6 equal pieces (6 is the L.C.M. of 2 and 3). Now ${fr(1, 2)} = ${fr(3, 6)} and ${fr(1, 3)} = ${fr(2, 6)}.`, `把兩條都切成 6 等份（6 是 2 和 3 的 L.C.M.）。現在 ${fr(1, 2)} = ${fr(3, 6)}，${fr(1, 3)} = ${fr(2, 6)}。`], f(st) { st.six.setAttribute('opacity', 1); st.l1b.setAttribute('opacity', 1); st.l2b.setAttribute('opacity', 1); } },
      { c: ['Same size pieces! Put them together.', '每份大小一樣了！把它們放在一起。'], f(st) { st.res.setAttribute('opacity', 1); st.pb.setAttribute('opacity', .9); st.po.setAttribute('opacity', .9); mv(st.pb, 0, 150); mv(st.po, 180, 80); } },
      { c: [`3 pieces + 2 pieces = 5 pieces. So ${fr(1, 2)} + ${fr(1, 3)} = ${fr(5, 6)}`, `3 份 + 2 份 = 5 份。所以 ${fr(1, 2)} + ${fr(1, 3)} = ${fr(5, 6)}`], f(st) { st.l3.setAttribute('opacity', 1); } }
    ]
  });

  const lessons = [
    {
      t: ['Order of operations', '四則混合運算的次序'],
      body: box('rule', L('The rule (do in this order)', '規則（按這個次序）'), `<div class="ex">① ${T('Brackets', '括號')} ( ) &nbsp;➜&nbsp; ② × ÷ &nbsp;➜&nbsp; ③ + −</div>` + B('In ② and ③, work from <b>left to right</b>.', '在 ② 和 ③，要<b>由左至右</b>計算。')),
      anim: [
        W(L('Example 1', '例題 1'), [
          { h: '20 − (3 + 5) × 2 ÷ 4', c: ['Look at the question first. Is there a bracket?', '先看題目。有沒有括號？'] },
          { h: '20 − <span class="hl">(3 + 5)</span> × 2 ÷ 4', r: 1, c: ['Yes! Do the bracket first: 3 + 5 = 8', '有！先計括號：3 + 5 = 8'] },
          { h: '20 − <span class="hl2">8 × 2</span> ÷ 4', eq: 1, c: ['Next × and ÷, from left to right. 8 × 2 = 16', '然後由左至右計 × 和 ÷。8 × 2 = 16'] },
          { h: '20 − <span class="hl2">16 ÷ 4</span>', eq: 1, c: ['16 ÷ 4 = 4', '16 ÷ 4 = 4'] },
          { h: '<span class="hl3">20 − 4</span>', eq: 1, c: ['Last, + and −.', '最後計 + 和 −。'] },
          { h: '<b class="green">16</b>', eq: 1, c: ['Answer: 16 ✔', '答案：16 ✔'] }
        ]),
        W(L('Watch out: left to right!', '小心：由左至右！'), [
          { h: '24 ÷ 4 × 2', c: ['÷ and × are equal level. Do NOT do × first!', '÷ 和 × 是同一級，不可以先計 ×！'] },
          { h: '<span class="hl">24 ÷ 4</span> × 2', r: 1, c: ['Go from left to right: 24 ÷ 4 = 6 first.', '由左至右：先計 24 ÷ 4 = 6。'] },
          { h: '6 × 2', eq: 1, c: ['Then 6 × 2', '然後 6 × 2'] },
          { h: '<b class="green">12</b> &nbsp; <span class="red" style="font-size:.7em">✘ not 24 ÷ 8 = 3</span>', eq: 1, c: ['Answer 12, not 3.', '答案是 12，不是 3。'] }
        ])
      ]
    },
    {
      t: ['Adding and subtracting fractions', '分數的加法和減法'],
      body: ul([B('Fractions can only be added when the <b>denominators</b> (bottom numbers) are the same.', '分母（下面的數）相同，分數才可以相加。'),
      B('Find the L.C.M. of the denominators, then change both fractions.', '找出分母的 L.C.M.（最小公倍數），再把兩個分數轉換。'),
      B('Add or subtract the <b>numerators</b> (top numbers) only. Simplify at the end.', '只把分子（上面的數）相加或相減，最後化簡。')]),
      anim: [fracBars, W(L('Working', '步驟'), [
        { h: `${fr(5, 6)} − ${fr(1, 4)}`, c: ['L.C.M. of 6 and 4 = 12', '6 和 4 的 L.C.M. = 12'] },
        { h: `${fr('5 × <span class="red">2</span>', '6 × <span class="red">2</span>')} − ${fr('1 × <span class="red">3</span>', '4 × <span class="red">3</span>')}`, eq: 1, c: ['Multiply top and bottom by the same number to make 12.', '分子和分母乘以同一個數，令分母變成 12。'] },
        { h: `${fr(10, 12)} − ${fr(3, 12)}`, eq: 1, c: ['Now the denominators are the same.', '現在分母相同了。'] },
        { h: `<b class="green">${fr(7, 12)}</b>`, eq: 1, c: ['Subtract the tops: 10 − 3 = 7. Keep the bottom 12.', '分子相減：10 − 3 = 7，分母保持 12。'] }
      ])]
    },
    {
      t: ['Multiplying and dividing fractions', '分數的乘法和除法'],
      body: ul([B(`Change ${T('mixed fractions', '帶分數')} into ${T('improper fractions', '假分數')} first: 2${fr(1, 3)} = ${fr('2×3+1', 3)} = ${fr(7, 3)}`, `先把帶分數化成假分數：2${fr(1, 3)} = ${fr('2×3+1', 3)} = ${fr(7, 3)}`),
      B('×: top × top, bottom × bottom. Cancel first.', '×：分子乘分子，分母乘分母。先約簡。'),
      B('÷: <b>Keep</b> the first, <b>change</b> ÷ to ×, <b>flip</b> the second.', '÷：第一個<b>不變</b>，÷ <b>變</b> ×，第二個<b>倒轉</b>。')]),
      anim: W(L('Example', '例題'), [
        { h: `2${fr(1, 3)} ÷ ${fr(7, 9)}`, c: ['There is a mixed fraction. Change it first.', '有帶分數，先把它轉換。'] },
        { h: `<span class="hl">${fr(7, 3)}</span> ÷ ${fr(7, 9)}`, eq: 1, c: [`2${fr(1, 3)} = ${fr('2 × 3 + 1', 3)} = ${fr(7, 3)}`, `2${fr(1, 3)} = ${fr('2 × 3 + 1', 3)} = ${fr(7, 3)}`] },
        { h: `${fr(7, 3)} <span class="hl">×</span> <span class="hl">${fr(9, 7)}</span>`, eq: 1, c: ['Keep, change ÷ to ×, flip the second fraction.', '不變、÷ 變 ×、倒轉第二個分數。'] },
        { h: `${fr('<s class="red">7</s> 1', '<s class="red">3</s> 1')} × ${fr('<s class="red">9</s> 3', '<s class="red">7</s> 1')}`, eq: 1, c: ['Cancel: 7 and 7 → 1 and 1; 3 and 9 → 1 and 3.', '約簡：7 和 7 → 1 和 1；3 和 9 → 1 和 3。'] },
        { h: '<b class="green">3</b>', eq: 1, c: ['1 × 3 = 3, 1 × 1 = 1. Answer = 3', '1 × 3 = 3，1 × 1 = 1。答案 = 3'] }
      ])
    },
    {
      t: ['Decimals: × and ÷', '小數的乘法和除法'],
      body: ul([B(`+ and −: line up the ${T('decimal points', '小數點')}.`, '+ 和 −：小數點要對齊。'),
      B('×: forget the points, multiply, then count the decimal places.', '×：先不理小數點，相乘，再數小數位。'),
      B('÷: move the point in <b>both</b> numbers until the number you divide by is a whole number.', '÷：兩個數的小數點一起移，直到除數變成整數。')]),
      anim: [W(L('Multiplication', '乘法'), [
        { h: '2.45 × 3.6', c: ['Step 1: ignore the decimal points.', '第 1 步：先不理小數點。'] },
        { h: '245 × 36 = 8820', c: ['Multiply as whole numbers: 245 × 36 = 8820', '當作整數相乘：245 × 36 = 8820'] },
        { h: '2.<span class="hl">45</span> (2 places) , 3.<span class="hl">6</span> (1 place)', c: ['Step 2: count decimal places: 2 + 1 = 3 places.', '第 2 步：數小數位：2 + 1 = 3 個小數位。'] },
        { h: '8.<span class="hl">820</span> = <b class="green">8.82</b>', c: ['Put 3 decimal places in the answer: 8.820 = 8.82', '答案要有 3 個小數位：8.820 = 8.82'] }
      ]), W(L('Division', '除法'), [
        { h: '6.72 ÷ 1.2', c: ['We do not like dividing by a decimal (1.2).', '除數 1.2 是小數，不好計。'] },
        { h: '6<span class="red">.</span>72 ÷ 1<span class="red">.</span>2 &nbsp;➜&nbsp; 67.2 ÷ 12', c: ['Move the point 1 place right in BOTH numbers (×10).', '兩個數的小數點都向右移 1 位（即 ×10）。'] },
        { h: '67.2 ÷ 12 = <b class="green">5.6</b>', c: ['Now divide by a whole number. Answer 5.6', '現在除以整數。答案 5.6'] }
      ])]
    },
    {
      t: ['Fractions ↔ decimals', '分數與小數的互換'],
      body: ul([B('Fraction → decimal: top ÷ bottom.', '分數 → 小數：分子 ÷ 分母。'), B('Decimal → fraction: put over 10, 100 or 1000, then simplify.', '小數 → 分數：寫成分母是 10、100 或 1000 的分數，再化簡。')]),
      anim: W(L('Examples', '例子'), [
        { h: `${fr(3, 8)} = 3 ÷ 8`, c: ['Fraction → decimal: divide the top by the bottom.', '分數化小數：分子除以分母。'] },
        { h: `${fr(3, 8)} = <b class="green">0.375</b>`, r: 1, c: ['3 ÷ 8 = 0.375', '3 ÷ 8 = 0.375'] },
        { h: `0.45 = ${fr(45, 100)}`, c: ['Decimal → fraction: 2 decimal places → put over 100.', '小數化分數：2 個小數位 → 分母是 100。'] },
        { h: `0.45 = ${fr(45, 100)} = <b class="green">${fr(9, 20)}</b>`, r: 1, c: ['Simplify: divide top and bottom by 5.', '化簡：分子和分母同時除以 5。'] }
      ])
    }
  ];

  /* ----- generators ----- */
  const isMixed = () => Math.random() < .35;
  function fracOpnd() { const b = pick([2, 3, 4, 5, 6, 8, 9, 10, 12]); let a; do a = ri(1, b - 1); while (gcd(a, b) !== 1); const w = isMixed() ? ri(1, 3) : 0; return { f: new F(w * b + a, b), w, a, b, h: w ? `${w}${fr(a, b)}` : fr(a, b) }; }
  function convStep(o) { return o.w ? `${L('Change mixed fraction', '帶分數化假分數')}: ${o.h} = ${fr(`${o.w} × ${o.b} + ${o.a}`, o.b)} = ${fr(o.w * o.b + o.a, o.b)}` : null; }

  const gens = [
    {
      id: 'int', name: ['Mixed operations (integers)', '整數四則混合運算'], gen() {
        const t = ri(0, 5); let q, s = [], ans;
        if (t === 0) { const a = ri(5, 40), b = ri(2, 9), c = ri(2, 9); q = `${a} + ${b} × ${c}`; ans = a + b * c; s = [L('No brackets. Do × first', '沒有括號，先計 ×') + `: ${b} × ${c} = ${b * c}`, `${a} + ${b * c} = <b>${ans}</b>`]; }
        if (t === 1) { const a = ri(2, 15), b = ri(2, 15), c = ri(2, 6); q = `(${a} + ${b}) × ${c}`; ans = (a + b) * c; s = [L('Brackets first', '先計括號') + `: ${a} + ${b} = ${a + b}`, `${a + b} × ${c} = <b>${ans}</b>`]; }
        if (t === 2) { const c = ri(2, 9), k = ri(2, 9), b = c * k, a = ri(k + 1, 50); q = `${a} − ${b} ÷ ${c}`; ans = a - k; s = [L('Do ÷ before −', '先計 ÷ 再計 −') + `: ${b} ÷ ${c} = ${k}`, `${a} − ${k} = <b>${ans}</b>`]; }
        if (t === 3) { const a = ri(3, 12), b = ri(3, 9), c = ri(2, 6), d = ri(2, 5); if (a * b <= c * d) return null; q = `${a} × ${b} − ${c} × ${d}`; ans = a * b - c * d; s = [L('Do both × first', '先計兩個 ×') + `: ${a} × ${b} = ${a * b}, ${c} × ${d} = ${c * d}`, `${a * b} − ${c * d} = <b>${ans}</b>`]; }
        if (t === 4) { const c = ri(2, 6), k = ri(2, 9), b = ri(1, 20), a = b + c * k, d = ri(1, 20); q = `(${a} − ${b}) ÷ ${c} + ${d}`; ans = k + d; s = [L('Brackets first', '先計括號') + `: ${a} − ${b} = ${a - b}`, L('Then ÷', '然後 ÷') + `: ${a - b} ÷ ${c} = ${k}`, `${k} + ${d} = <b>${ans}</b>`]; }
        if (t === 5) { const b = ri(2, 6), k = ri(2, 8), a = b * k, c = ri(2, 6); q = `${a} ÷ ${b} × ${c}`; ans = k * c; s = [L('÷ and × are the same level → left to right', '÷ 和 × 同級 → 由左至右') + `: ${a} ÷ ${b} = ${k}`, `${k} × ${c} = <b>${ans}</b>`]; }
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${q}</span>`, ans, steps: s, hint: L('Brackets → × ÷ → + −', '括號 → × ÷ → + −') };
      }
    },
    {
      id: 'fadd', name: ['Fractions + −', '分數加減'], gen() {
        const X = fracOpnd(), Y = fracOpnd(); if (X.b === Y.b && Math.random() < .7) return null;
        let op = pick(['+', '−']); let A = X, Bb = Y; if (op === '−' && X.f.val <= Y.f.val) { A = Y; Bb = X; }
        const res = op === '+' ? A.f.add(Bb.f) : A.f.sub(Bb.f); const m = lcm(A.f.d, Bb.f.d);
        const s = []; [A, Bb].forEach(o => { const c = convStep(o); if (c) s.push(c); });
        const an = A.f.n * m / A.f.d, bn = Bb.f.n * m / Bb.f.d;
        if (A.f.d !== Bb.f.d) s.push(L(`Common denominator = L.C.M. of ${A.f.d} and ${Bb.f.d} = ${m}`, `公分母 = ${A.f.d} 和 ${Bb.f.d} 的 L.C.M. = ${m}`));
        s.push(`${fr(an, m)} ${op} ${fr(bn, m)} = ${fr(op === '+' ? an + bn : an - bn, m)}`);
        if (res.d !== m || Math.abs(res.n) >= res.d) s.push(L('Simplify', '化簡') + `: = <b>${res.html(true)}</b>`);
        return { kind: 'num', q: L('Evaluate (simplest form).', '計算（最簡形式）。') + `<span class="big">${A.h} ${op} ${Bb.h}</span>`, ans: res, mixed: true, steps: s, hint: L('Make the denominators the same first.', '先令分母相同。') };
      }
    },
    {
      id: 'fmul', name: ['Fractions × ÷', '分數乘除'], gen() {
        const X = fracOpnd(), Y = fracOpnd(); const op = pick(['×', '÷']);
        const res = op === '×' ? X.f.mul(Y.f) : X.f.div(Y.f);
        const s = []; [X, Y].forEach(o => { const c = convStep(o); if (c) s.push(c); });
        if (op === '÷') s.push(L('÷ → × and flip the second fraction', '÷ 變 ×，第二個分數倒轉') + `: ${X.f.html()} × ${fr(Y.f.d, Y.f.n)}`);
        const p = op === '×' ? Y.f : new F(Y.f.d, Y.f.n);
        s.push(L('Top × top, bottom × bottom', '分子乘分子，分母乘分母') + `: ${fr(`${X.f.n} × ${p.n}`, `${X.f.d} × ${p.d}`)} = ${rawfr(X.f.n * p.n, X.f.d * p.d)}`);
        s.push(L('Simplify', '化簡') + `: = <b>${res.html(true)}</b>`);
        return { kind: 'num', q: L('Evaluate (simplest form).', '計算（最簡形式）。') + `<span class="big">${X.h} ${op} ${Y.h}</span>`, ans: res, mixed: true, steps: s, hint: op === '÷' ? L('Keep, change, flip!', '不變、變乘、倒轉！') : L('Change mixed fractions to improper fractions first.', '先把帶分數化成假分數。') };
      }
    },
    {
      id: 'fmix', name: ['Fractions: mixed operations', '分數四則混合運算'], gen() {
        const b = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 5]), f = pick([2, 3, 4, 5, 6]);
        const A = new F(ri(1, b - 1), b), Bf = new F(ri(1, d - 1), d), C = new F(ri(1, f + 2), f);
        const t = ri(0, 1); let q, res, s;
        if (t === 0) { const pr = Bf.mul(C); res = A.add(pr); q = `${A.html()} + ${Bf.html()} × ${C.html()}`; s = [L('Do × first', '先計 ×') + `: ${Bf.html()} × ${C.html()} = ${pr.html()}`, `${A.html()} + ${pr.html()} = <b>${res.html(true)}</b>`]; }
        else { if (A.val <= Bf.val) return null; const df = A.sub(Bf); res = df.div(C); q = `(${A.html()} − ${Bf.html()}) ÷ ${C.html()}`; s = [L('Brackets first', '先計括號') + `: ${A.html()} − ${Bf.html()} = ${df.html()}`, L('÷ → × flip', '÷ 變 × 並倒轉') + `: ${df.html()} × ${fr(C.d, C.n)} = <b>${res.html(true)}</b>`]; }
        return { kind: 'num', q: L('Evaluate (simplest form).', '計算（最簡形式）。') + `<span class="big">${q}</span>`, ans: res, mixed: true, steps: s, hint: L('Brackets → × ÷ → + −', '括號 → × ÷ → + −') };
      }
    },
    {
      id: 'dec', name: ['Decimals + −', '小數加減'], gen() {
        const a = ri(10, 199) / 10, b = ri(10, 999) / 100, c = ri(1, 50) / 10; const t = ri(0, 2); let q, ans, s;
        if (t === 0) { q = `${a} + ${b}`; ans = rnd(a + b); s = [L('Line up the decimal points', '小數點對齊') + `: ${a.toFixed(2)} + ${b.toFixed(2)}`, `= <b>${ans}</b>`]; }
        if (t === 1) { if (a <= b) return null; q = `${a} − ${b}`; ans = rnd(a - b); s = [L('Line up the decimal points; fill empty places with 0', '小數點對齊，空位補 0') + `: ${a.toFixed(2)} − ${b.toFixed(2)}`, `= <b>${ans}</b>`]; }
        if (t === 2) { if (a + c <= b) return null; q = `${a} − ${b} + ${c}`; ans = rnd(a - b + c); s = [L('Left to right', '由左至右') + `: ${a} − ${b} = ${rnd(a - b)}`, `${rnd(a - b)} + ${c} = <b>${ans}</b>`]; if (a < b) return null; }
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${q}</span>`, ans, steps: s, hint: L('Line up the decimal points.', '小數點要對齊。') };
      }
    },
    {
      id: 'decmul', name: ['Decimals × ÷', '小數乘除'], gen() {
        if (Math.random() < .5) {
          const a = ri(11, 99) / 10, b = pick([ri(2, 9) / 10, ri(11, 49) / 10, ri(2, 9)]); const ans = rnd(a * b);
          const da = (String(a).split('.')[1] || '').length, db = (String(b).split('.')[1] || '').length;
          const ia = Math.round(a * 10 ** da), ib = Math.round(b * 10 ** db);
          return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${a} × ${b}</span>`, ans, steps: [L('Ignore the points', '先不理小數點') + `: ${ia} × ${ib} = ${ia * ib}`, L(`Count decimal places: ${da} + ${db} = ${da + db}`, `數小數位：${da} + ${db} = ${da + db}`), `${L('Answer', '答案')} = <b>${ans}</b>`], hint: L('Count the decimal places at the end.', '最後數小數位。') };
        }
        const d = pick([ri(2, 9) / 10, ri(11, 25) / 10]), qv = ri(11, 99) / 10; const a = rnd(d * qv);
        const k = (String(d).split('.')[1] || '').length; const A = rnd(a * 10 ** k), D = rnd(d * 10 ** k);
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${a} ÷ ${d}</span>`, ans: qv, steps: [L(`Move the point ${k} place(s) to the right in both numbers`, `兩個數的小數點都向右移 ${k} 位`) + `: ${a} ÷ ${d} = ${A} ÷ ${D}`, `${A} ÷ ${D} = <b>${qv}</b>`], hint: L('Make the number you divide by a whole number.', '先令除數變成整數。') };
      }
    },
    {
      id: 'conv', name: ['Fraction ↔ decimal', '分數與小數互換'], gen() {
        if (Math.random() < .5) {
          const d = pick([2, 4, 5, 8, 10, 20, 25, 50]); const a = ri(1, d - 1); const f = new F(a, d); if (f.d === 1) return null;
          const ans = rnd(f.val);
          return { kind: 'num', q: L('Convert into a decimal', '化為小數') + `<span class="big">${f.html()}</span>`, ans, steps: [L('Top ÷ bottom', '分子 ÷ 分母') + `: ${f.n} ÷ ${f.d} = <b>${ans}</b>`], hint: L('Divide the top by the bottom.', '分子除以分母。') };
        }
        const dp = pick([1, 2, 2]); const p = 10 ** dp; let k; do k = ri(1, p - 1); while (k % 10 === 0 && dp === 2);
        const x = k / p; const f = new F(k, p); const g = gcd(k, p);
        return { kind: 'num', needFrac: 1, q: L('Convert into a fraction in simplest form', '化為最簡分數') + `<span class="big">${x}</span>`, ans: f, fmt: L('Type a fraction like 3/4.', '請輸入分數，例如 3/4。'), steps: [L(`${dp} decimal place(s) → put over ${p}`, `${dp} 個小數位 → 分母是 ${p}`) + `: ${x} = ${fr(k, p)}`, g > 1 ? L(`Divide top and bottom by ${g}`, `分子分母同除以 ${g}`) + `: = <b>${f.html()}</b>` : `= <b>${f.html()}</b>`], hint: L('1 decimal place → /10, 2 decimal places → /100', '1 個小數位 → /10，2 個小數位 → /100') };
      }
    },
    {
      id: 'word', name: ['Word problems', '應用題'], gen() {
        const t = ri(0, 3);
        if (t === 0) { const a = ri(2, 6), p = ri(5, 30), b = ri(2, 5), c = ri(4, 20), pay = Math.ceil((a * p + b * c + 1) / 100) * 100; const ans = pay - a * p - b * c;
          return { kind: 'num', pre: '$', q: B(`Ken buys ${a} pens at $${p} each and ${b} notebooks at $${c} each. He pays with $${pay}. How much change does he get?`, `小健買了 ${a} 枝筆，每枝 $${p}，又買了 ${b} 本筆記簿，每本 $${c}。他付了 $${pay}，應找回多少錢？`), ans, steps: [L('Cost of pens', '筆的價錢') + `: ${a} × ${p} = $${a * p}`, L('Cost of notebooks', '筆記簿的價錢') + `: ${b} × ${c} = $${b * c}`, L('Change', '找續') + `: ${pay} − ${a * p} − ${b * c} = <b>$${ans}</b>`], hint: L('Change = money paid − total cost', '找續 = 付出的錢 − 總價') }; }
        if (t === 1) { const piece = pick([new F(1, 2), new F(3, 4), new F(2, 3), new F(1, 4), new F(2, 5)]); const k = ri(4, 12); const len = piece.mul(k); if (!len.isInt) return null;
          return { kind: 'num', q: B(`A ribbon is ${len.html()} m long. It is cut into pieces of ${piece.html()} m each. How many pieces are there?`, `一條絲帶長 ${len.html()} m，把它剪成每段長 ${piece.html()} m。共有多少段？`), ans: k, steps: [L('Number of pieces = total length ÷ length of one piece', '段數 = 總長度 ÷ 每段長度'), `${len.html()} ÷ ${piece.html()} = ${len.html()} × ${fr(piece.d, piece.n)} = <b>${k}</b>`], hint: L('Use ÷', '用 ÷') }; }
        if (t === 2) { const kg = ri(2, 5), pr = ri(41, 199) / 10; const ans = rnd(kg * pr) ;
          return { kind: 'num', pre: '$', q: B(`Apples cost $${pr.toFixed(1)} per kg. Mary buys ${kg} kg. How much does she pay?`, `蘋果每千克 $${pr.toFixed(1)}。小美買了 ${kg} kg，她要付多少錢？`), ans, steps: [`${pr} × ${kg} = <b>$${ans}</b>`], hint: L('price per kg × number of kg', '每千克價錢 × 千克數') }; }
        const tot = pick([24, 30, 36, 40, 48, 60]); const f1 = pick([new F(1, 2), new F(1, 3), new F(1, 4), new F(1, 6), new F(2, 3), new F(3, 4), new F(5, 6)]); const used = f1.mul(tot); if (!used.isInt) return null;
        return { kind: 'num', q: B(`There are ${tot} students in a class. ${f1.html()} of them walk to school. How many students do NOT walk to school?`, `班上有 ${tot} 名學生，其中 ${f1.html()} 步行上學。有多少名學生<b>不是</b>步行上學？`), ans: tot - used.n, steps: [L('Walk', '步行') + `: ${f1.html()} × ${tot} = ${used.n}`, L('Not walk', '不步行') + `: ${tot} − ${used.n} = <b>${tot - used.n}</b>`], hint: L('“of” means ×', '「的」即是 ×') };
      }
    }
  ];

  CH.push({
    id: 'ch1', no: 1, color: COLORS[1], title: ['Basic Computation', '基礎運算'], short: ['Computation', '基礎運算'],
    intro: ['In this chapter: the order of operations, and how to work with fractions and decimals.', '本章重點：運算次序，以及分數和小數的計算。'],
    lessons, gens,
    keys: [B('Order: Brackets → × ÷ → + − (left to right).', '次序：括號 → × ÷ → + −（由左至右）。'),
    B('+ − fractions: make the denominators the same first (use L.C.M.).', '分數加減：先通分母（用 L.C.M.）。'),
    B('× fractions: top × top, bottom × bottom. ÷ fractions: keep, change, flip.', '分數乘法：分子乘分子，分母乘分母。分數除法：不變、變乘、倒轉。'),
    B('Change mixed fractions to improper fractions before × or ÷.', '做乘除前，先把帶分數化成假分數。'),
    B('Decimals ×: count decimal places. Decimals ÷: make the divisor a whole number.', '小數乘法：數小數位。小數除法：先令除數變成整數。')],
    traps: [B('✘ 24 ÷ 4 × 2 = 24 ÷ 8 = 3 &nbsp; ✔ = 6 × 2 = 12 (left to right!)', '✘ 24 ÷ 4 × 2 = 24 ÷ 8 = 3 &nbsp; ✔ = 6 × 2 = 12（由左至右！）'),
    B(`✘ ${fr(1, 2)} + ${fr(1, 3)} = ${fr(2, 5)} (never add the bottoms!)`, `✘ ${fr(1, 2)} + ${fr(1, 3)} = ${fr(2, 5)}（分母不可以相加！）`),
    B(`✘ 2${fr(1, 3)} × 3 = 6${fr(1, 3)} &nbsp; ✔ ${fr(7, 3)} × 3 = 7`, `✘ 2${fr(1, 3)} × 3 = 6${fr(1, 3)} &nbsp; ✔ ${fr(7, 3)} × 3 = 7`),
    B('Always simplify the final fraction.', '最後的分數一定要化簡。')],
    cheat: [`${L('Order', '次序')}: ( ) → × ÷ → + − , ${L('left to right', '由左至右')}`, `${fr('a', 'b')} + ${fr('c', 'd')}: ${L('same denominator first', '先通分母')}`, `÷ ${fr('a', 'b')} = × ${fr('b', 'a')} (${L('keep, change, flip', '不變、變乘、倒轉')})`, `${L('Mixed → improper', '帶分數 → 假分數')}: 2${fr(1, 3)} = ${fr(7, 3)}`, `${L('Decimal ×: count decimal places', '小數乘法：數小數位')}`]
  });
})();
