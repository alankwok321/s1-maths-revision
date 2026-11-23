/* ================= Chapter 6 Manipulations of Polynomials ================= */
(function () {
  const tx = (c, p, y = 'x') => termH(c, p ? { [y]: p } : {}, false).trim();

  const orderAnim = Chips(L('Arrange in descending powers of x', '按 x 的降冪排列'), 170,
    [{ id: 'a', h: `+3${v('x')}`, bg: '#e0f2fe' }, { id: 'b', h: '+8', bg: '#fef3c7' }, { id: 'c', h: `${MI}5${v('x')}<sup>2</sup>`, bg: '#ede9fe' }, { id: 'd', h: `+${v('x')}<sup>3</sup>`, bg: '#dcfce7' }],
    [{ id: 'p', x: 0, y: 4, w: 540, h: `<div class="sub" style="display:flex;justify-content:space-around;font-weight:800"><span>${L('power', '次')} 1</span><span>${L('power', '次')} 0</span><span>${L('power', '次')} 2</span><span>${L('power', '次')} 3</span></div>` },
    { id: 'p2', x: 0, y: 4, w: 540, h: `<div class="sub" style="display:flex;justify-content:space-around;font-weight:800"><span>${L('power', '次')} 3</span><span>${L('power', '次')} 2</span><span>${L('power', '次')} 1</span><span>${L('power', '次')} 0</span></div>` },
    { id: 'r', x: 20, y: 120, w: 520, h: `<div style="font-size:24px;font-weight:800;color:#16a34a">= ${v('x')}<sup>3</sup> − 5${v('x')}<sup>2</sup> + 3${v('x')} + 8</div>` }],
    [{ c: ['3x + 8 − 5x² + x³. Each term keeps its sign.', '3x + 8 − 5x² + x³。每項帶着自己的符號。'], pos: { a: [30, 50], b: [170, 50], c: [290, 50], d: [430, 50] } },
    { c: ['Find the power of x in each term. (8 has power 0.)', '找出每一項 x 的次數。（8 的次數是 0。）'], pos: {}, show: { p: 1 } },
    { c: ['Descending = biggest power first. Move the terms!', '降冪 = 次數最大的放最前。移動各項！'], d: 3500, pos: { d: [30, 50], c: [160, 50], a: [300, 50], b: [430, 50] }, show: { p: 0, p2: 1 } },
    { c: ['Done! (A + at the very front is not written.)', '完成！（最前面的 + 號不用寫。）'], pos: {}, show: { r: 1 } }]);

  const likeAnim = Chips(L('Collecting like terms', '合併同類項'), 255,
    [{ id: 'a', h: `3${v('x')}`, bg: '#e0f2fe', bd: '#38bdf8' }, { id: 'b', h: `+5${v('y')}`, bg: '#fef3c7', bd: '#f59e0b' }, { id: 'c', h: `${MI}${v('x')}`, bg: '#e0f2fe', bd: '#38bdf8' }, { id: 'd', h: `+2${v('y')}`, bg: '#fef3c7', bd: '#f59e0b' }, { id: 'e', h: `+4${v('x')}<sup>2</sup>`, bg: '#ede9fe', bd: '#8b5cf6' }],
    [{ id: 'b1', x: 10, y: 80, w: 170, hh: 125, h: `<div style="border:2px dashed #38bdf8;border-radius:12px;height:100%;padding:4px;font-weight:800;color:#0284c7">${v('x')} ${L('terms', '項')}</div>` },
    { id: 'b2', x: 195, y: 80, w: 170, hh: 125, h: `<div style="border:2px dashed #f59e0b;border-radius:12px;height:100%;padding:4px;font-weight:800;color:#b45309">${v('y')} ${L('terms', '項')}</div>` },
    { id: 'b3', x: 380, y: 80, w: 170, hh: 125, h: `<div style="border:2px dashed #8b5cf6;border-radius:12px;height:100%;padding:4px;font-weight:800;color:#6d28d9">${v('x')}<sup>2</sup> ${L('terms', '項')}</div>` },
    { id: 'r1', x: 40, y: 165, h: `<b style="font-size:22px;color:#0284c7">= 2${v('x')}</b>` }, { id: 'r2', x: 225, y: 165, h: `<b style="font-size:22px;color:#b45309">= 7${v('y')}</b>` }, { id: 'r3', x: 410, y: 165, h: `<b style="font-size:22px;color:#6d28d9">= 4${v('x')}<sup>2</sup></b>` },
    { id: 'ans', x: 10, y: 220, w: 540, h: `<b style="font-size:20px;color:#16a34a">${L('Answer', '答案')}: 4${v('x')}<sup>2</sup> + 2${v('x')} + 7${v('y')}</b>` }],
    [{ c: ['3x + 5y − x + 2y + 4x². Which terms are alike?', '3x + 5y − x + 2y + 4x²。哪些是同類項？'], pos: { a: [10, 10], b: [110, 10], c: [220, 10], d: [310, 10], e: [410, 10] } },
    { c: ['Sort into like terms: same letters, same powers.', '分類同類項：字母及次數相同。'], d: 3500, show: { b1: 1, b2: 1, b3: 1 }, pos: { a: [20, 110], c: [100, 110], b: [205, 110], d: [285, 110], e: [395, 110] } },
    { c: ['Add the numbers in front (coefficients): 3 − 1 = 2, 5 + 2 = 7', '把前面的數（係數）相加：3 − 1 = 2，5 + 2 = 7'], show: { r1: 1, r2: 1, r3: 1 }, pos: { a: [20, 110, .35], c: [100, 110, .35], b: [205, 110, .35], d: [285, 110, .35], e: [395, 110, .35] } },
    { c: ['x² and x are NOT like terms.', 'x² 和 x 不是同類項。'], show: { ans: 1 } }]);

  const areaAnim = {
    title: L('Expanding (x + 3)(x + 2) with an area model', '用面積模型展開 (x + 3)(x + 2)'), minH: 300,
    setup(stage) {
      const s = svgRoot(stage, 560, 290); const st = { s, r: [] }; const ox = 90, oy = 40, X = 150, A = 90, Bh = 60;
      S('text', { x: ox + X / 2, y: oy - 12, 'text-anchor': 'middle', 'font-size': 20, 'font-style': 'italic', 'font-family': 'Times New Roman', 'font-weight': 700, text: 'x' }, s);
      S('text', { x: ox + X + Bh / 2, y: oy - 12, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: '#c2410c', text: '2' }, s);
      S('text', { x: ox - 16, y: oy + X / 2 + 6, 'text-anchor': 'middle', 'font-size': 20, 'font-style': 'italic', 'font-family': 'Times New Roman', 'font-weight': 700, text: 'x' }, s);
      S('text', { x: ox - 16, y: oy + X + A / 2 + 6, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 700, fill: '#2563eb', text: '3' }, s);
      const cells = [[ox, oy, X, X, '#ede9fe', 'x²'], [ox + X, oy, Bh, X, '#ffedd5', '2x'], [ox, oy + X, X, A, '#dbeafe', '3x'], [ox + X, oy + X, Bh, A, '#dcfce7', '6']];
      S('rect', { x: ox, y: oy, width: X + Bh, height: X + A, fill: '#fff', stroke: '#334155', 'stroke-width': 2 }, s);
      cells.forEach(([x, y, w, h, c, lab]) => { const g = S('g', { opacity: 0, class: 'tr' }, s); S('rect', { x, y, width: w, height: h, fill: c, stroke: '#334155', 'stroke-width': 2 }, g); S('text', { x: x + w / 2, y: y + h / 2 + 8, 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 800, text: lab }, g); st.r.push(g); });
      st.t = S('text', { x: 330, y: 290 - 14, 'text-anchor': 'middle', 'font-size': 20, 'font-weight': 800, fill: '#16a34a', text: '' }, s);
      st.side = S('text', { x: ox + X + Bh + 20, y: 120, 'font-size': 18, 'font-weight': 700, text: '' }, s);
      return st;
    },
    frames: [
      { c: ['Area = (x + 3)(x + 2)', '面積 = (x + 3)(x + 2)'], f() { } },
      { c: ['x × x = x²', 'x × x = x²'], f(st) { st.r[0].setAttribute('opacity', 1); } },
      { c: ['x × 2 = 2x', 'x × 2 = 2x'], f(st) { st.r[1].setAttribute('opacity', 1); } },
      { c: ['3 × x = 3x', '3 × x = 3x'], f(st) { st.r[2].setAttribute('opacity', 1); } },
      { c: ['3 × 2 = 6', '3 × 2 = 6'], f(st) { st.r[3].setAttribute('opacity', 1); } },
      { c: ['Add the 4 parts: x² + 2x + 3x + 6 = x² + 5x + 6', '把 4 部分相加：x² + 2x + 3x + 6 = x² + 5x + 6'], f(st) { st.t.textContent = '(x + 3)(x + 2) = x² + 2x + 3x + 6 = x² + 5x + 6'; } }
    ]
  };

  const lessons = [
    {
      t: ['Monomials: coefficient and degree', '單項式：係數及次數'],
      body: ul([B(`A ${T('monomial', '單項式')} is a number, a letter, or a product of them. e.g. 5, x, −7a<sup>4</sup>b<sup>2</sup>`, '單項式是一個數、一個字母或它們的積，例如 5、x、−7a<sup>4</sup>b<sup>2</sup>。'),
      B(`${T('Coefficient', '係數')} = the number part (keep the sign!).`, '係數 = 數字部分（包括符號！）。'),
      B(`${T('Degree', '次數')} = add up all the indices of the letters.`, '次數 = 把所有字母的指數加起來。')]),
      anim: W(L('Look at −7a⁴b²', '看看 −7a⁴b²'), [
        { h: `${MI}7${v('a')}<sup>4</sup>${v('b')}<sup>2</sup>`, c: ['A monomial.', '一個單項式。'] },
        { h: `<span class="hl">${MI}7</span>${v('a')}<sup>4</sup>${v('b')}<sup>2</sup>`, r: 1, c: ['Coefficient = −7 (the number, with its sign)', '係數 = −7（數字連符號）'] },
        { h: `${MI}7${v('a')}<sup class="hl2">4</sup>${v('b')}<sup class="hl2">2</sup>`, r: 1, c: ['Indices of letters: 4 and 2', '字母的指數：4 和 2'] },
        { h: `${L('Degree', '次數')} = 4 + 2 = <b class="green">6</b>`, c: ['Degree = 4 + 2 = 6', '次數 = 4 + 2 = 6'] },
        { h: `${v('x')} → ${L('coefficient 1, degree 1', '係數 1，次數 1')} ; &nbsp; 8 → ${L('degree 0', '次數 0')}`, c: ['Note: x means 1x¹. A number alone has degree 0.', '注意：x 即 1x¹。單獨一個數的次數是 0。'] }
      ])
    },
    {
      t: ['Polynomials', '多項式'],
      body: ul([B(`A ${T('polynomial', '多項式')} is a monomial or a sum of monomials. Each monomial is a ${T('term', '項')}.`, '多項式是一個單項式或多個單項式的和，每個單項式叫做一項。'),
      B(`${T('Constant term', '常數項')}: the term with no letters.`, '常數項：沒有字母的項。'),
      B(`${T('Degree of a polynomial', '多項式的次數')} = the highest degree of its terms.`, '多項式的次數 = 各項中最高的次數。'),
      B(`${T('Descending powers', '降冪')}: big power → small. ${T('Ascending powers', '升冪')}: small → big.`, '降冪：次數由大至小；升冪：次數由小至大。')]),
      anim: [W(L('2x² − 6x − xy² + 12', '2x² − 6x − xy² + 12'), [
        { h: `2${v('x')}<sup>2</sup> − 6${v('x')} − ${v('x')}${v('y')}<sup>2</sup> + 12`, c: ['How many terms? Split at each + or −.', '有多少項？在每個 + 或 − 處分開。'] },
        { h: `<span class="hl">2${v('x')}<sup>2</sup></span> <span class="hl2">− 6${v('x')}</span> <span class="hl3">− ${v('x')}${v('y')}<sup>2</sup></span> <span class="hl">+ 12</span>`, r: 1, c: ['4 terms: 2x², −6x, −xy², 12', '4 項：2x²、−6x、−xy²、12'] },
        { h: `${L('Degrees', '次數')}: 2, &nbsp;1, &nbsp;1+2 = 3, &nbsp;0`, c: ['Degree of each term. −xy² has degree 1 + 2 = 3.', '每項的次數。−xy² 的次數是 1 + 2 = 3。'] },
        { h: `${L('Degree of polynomial', '多項式的次數')} = <b class="green">3</b> ; ${L('constant term', '常數項')} = <b class="green">12</b>`, c: ['Degree = 3 (highest). Constant term = 12.', '次數 = 3（最高）。常數項 = 12。'] },
        { h: `${L('coefficient of x', 'x 的係數')} = <b class="green">${MI}6</b> ${L('(keep the sign!)', '（包括符號！）')}`, c: ['Coefficient of x is −6, not 6.', 'x 的係數是 −6，不是 6。'] }
      ]), orderAnim]
    },
    {
      t: ['Like terms; adding and subtracting', '同類項；加法和減法'],
      body: ul([B(`${T('Like terms', '同類項')}: same letters AND same powers. 3x²y and −5x²y are like terms. 3x²y and 3xy² are ${T('unlike terms', '異類項')}.`, '同類項：字母相同，而且次數也相同。3x²y 和 −5x²y 是同類項；3x²y 和 3xy² 是異類項。'),
      B('Only like terms can be added or subtracted: add the coefficients, keep the letters.', '只有同類項可以相加減：係數相加，字母不變。'),
      B('<b>A minus sign in front of a bracket changes EVERY sign inside.</b>', '<b>括號前是減號，括號內每一項都要變號。</b>')]),
      anim: [likeAnim, W(L('Subtracting polynomials', '多項式的減法'), [
        { h: `(3${v('x')}<sup>2</sup> − 2${v('x')} + 1) <span class="hl">−</span> (${v('x')}<sup>2</sup> + 4${v('x')} − 5)`, c: ['There is a − in front of the second bracket.', '第二個括號前有 −。'] },
        { h: `3${v('x')}<sup>2</sup> − 2${v('x')} + 1 <span class="hl">− ${v('x')}<sup>2</sup> − 4${v('x')} + 5</span>`, eq: 1, c: ['Remove the bracket: change EVERY sign: +x² → −x², +4x → −4x, −5 → +5', '去括號，每一項都變號：+x² → −x²，+4x → −4x，−5 → +5'] },
        { h: `(3 − 1)${v('x')}<sup>2</sup> + (−2 − 4)${v('x')} + (1 + 5)`, eq: 1, c: ['Collect like terms.', '合併同類項。'] },
        { h: `<b class="green">2${v('x')}<sup>2</sup> − 6${v('x')} + 6</b>`, eq: 1, c: ['Answer: 2x² − 6x + 6', '答案：2x² − 6x + 6'] }
      ])]
    },
    {
      t: ['Multiplying: aᵐ × aⁿ', '乘法：aᵐ × aⁿ'],
      body: box('rule', L('Law of indices', '指數定律'), `<div class="ex">${v('a')}<sup>m</sup> × ${v('a')}<sup>n</sup> = ${v('a')}<sup>m + n</sup></div>` + B('Same base → <b>add</b> the indices.', '底相同 → 指數<b>相加</b>。')),
      anim: W(L('Why do we add?', '為甚麼要相加？'), [
        { h: `${v('x')}<sup>3</sup> × ${v('x')}<sup>2</sup>`, c: ['x³ means x·x·x, x² means x·x', 'x³ 即 x·x·x，x² 即 x·x'] },
        { h: `(<span class="hl">${v('x')}·${v('x')}·${v('x')}</span>) × (<span class="hl2">${v('x')}·${v('x')}</span>)`, eq: 1, c: ['Write them out.', '把它們寫出來。'] },
        { h: `${v('x')}<sup>5</sup>`, eq: 1, c: ['Count: 3 + 2 = 5 x’s', '數一數：3 + 2 = 5 個 x'] },
        { h: `(2${v('x')}<sup>3</sup>)(${MI}3${v('x')}<sup>4</sup>)`, c: ['With numbers: multiply the numbers, add the indices.', '有數字時：數字相乘，指數相加。'] },
        { h: `(2 × ${MI}3)${v('x')}<sup>3 + 4</sup>`, eq: 1, c: ['2 × (−3) = −6 ; 3 + 4 = 7', '2 × (−3) = −6；3 + 4 = 7'] },
        { h: `<b class="green">${MI}6${v('x')}<sup>7</sup></b>`, eq: 1, c: ['= −6x⁷', '= −6x⁷'] }
      ])
    },
    {
      t: ['Expanding brackets', '展開括號'],
      body: ul([B(`${T('Distributive law', '乘法分配律')}: a(b + c) = ab + ac. Multiply the outside term by EVERY term inside.`, '乘法分配律：a(b + c) = ab + ac。外面的項要乘括號內每一項。'),
      B('(a + b)(c + d) = ac + ad + bc + bd. Every term × every term, then collect like terms.', '(a + b)(c + d) = ac + ad + bc + bd。每一項乘每一項，然後合併同類項。')]),
      anim: [areaAnim, W(L('Example: (2x − 1)(x + 4)', '例題：(2x − 1)(x + 4)'), [
        { h: `(<span class="hl">2${v('x')}</span> − 1)(${v('x')} + 4)`, c: ['2x × each term in the second bracket.', '2x 乘第二個括號的每一項。'] },
        { h: `<span class="hl">2${v('x')}</span>(${v('x')}) + <span class="hl">2${v('x')}</span>(4) <span class="hl2">− 1</span>(${v('x')}) <span class="hl2">− 1</span>(4)`, eq: 1, c: ['Then take −1 (with its sign!) and do the same.', '然後用 −1（連符號！）做同樣的事。'] },
        { h: `2${v('x')}<sup>2</sup> + 8${v('x')} − ${v('x')} − 4`, eq: 1, c: ['Work out each part.', '計算每一部分。'] },
        { h: `<b class="green">2${v('x')}<sup>2</sup> + 7${v('x')} − 4</b>`, eq: 1, c: ['Collect like terms: 8x − x = 7x', '合併同類項：8x − x = 7x'] }
      ])]
    },
    {
      t: ['Finding an unknown constant', '求未知常數'],
      body: B('Expand, collect terms, then form an equation.', '展開、合併，然後列方程。'),
      anim: W(L('(2x + 3)(ax − 1): coefficient of x is 10. Find a.', '(2x + 3)(ax − 1) 中 x 的係數是 10，求 a。'), [
        { h: `(2${v('x')} + 3)(${v('a')}${v('x')} − 1)`, c: ['Expand first.', '先展開。'] },
        { h: `2${v('a')}${v('x')}<sup>2</sup> − 2${v('x')} + 3${v('a')}${v('x')} − 3`, eq: 1, c: ['2x·ax = 2ax², 2x·(−1) = −2x, 3·ax = 3ax, 3·(−1) = −3', '2x·ax = 2ax²，2x·(−1) = −2x，3·ax = 3ax，3·(−1) = −3'] },
        { h: `2${v('a')}${v('x')}<sup>2</sup> + <span class="hl">(3${v('a')} − 2)</span>${v('x')} − 3`, eq: 1, c: ['Collect the x terms: coefficient of x is (3a − 2).', '合併 x 項：x 的係數是 (3a − 2)。'] },
        { h: `3${v('a')} − 2 = 10`, c: ['It is 10, so make an equation.', '它等於 10，所以列方程。'] },
        { h: `3${v('a')} = 12 → <b class="green">${v('a')} = 4</b>`, c: ['Solve: a = 4', '解得 a = 4'] }
      ])
    }
  ];

  /* ------- generators ------- */
  const vars2 = () => pick([['x', 'y'], ['a', 'b'], ['m', 'n']]);
  function randPoly(k = 4) { const degs = shuffle([0, 1, 2, 3, 4]).slice(0, k); const c = {}; degs.forEach(d => c[d] = nz(-9, 9)); return c; }
  function polyMixed(coefs) { const ks = shuffle(Object.keys(coefs).map(Number)); return polyH(ks.map(d => [coefs[d], d ? { x: d } : {}])); }

  const gens = [
    {
      id: 'mono', name: ['Coefficient & degree of a monomial', '單項式的係數及次數'], gen() {
        const [a, b] = vars2(); const c = pick([nz(-12, 12), nz(-9, 9), 1, -1]); const p = ri(1, 5), q = ri(0, 4); const m = termH(c, { [a]: p, [b]: q }, true);
        if (Math.random() < .5) return { kind: 'num', q: L('Find the <b>coefficient</b> of the monomial.', '求單項式的<b>係數</b>。') + `<span class="big">${m}</span>`, ans: c, steps: [L('Coefficient = the number part, with its sign.', '係數 = 數字部分（連符號）。'), Math.abs(c) === 1 ? L(`No number written means ${c < 0 ? '−1' : '1'}.`, `沒有寫數字即是 ${c < 0 ? '−1' : '1'}。`) : '', `${L('Coefficient', '係數')} = <b>${n(c)}</b>`].filter(Boolean), hint: L('Do not forget the sign.', '不要忘記符號。') };
        return { kind: 'num', q: L('Find the <b>degree</b> of the monomial.', '求單項式的<b>次數</b>。') + `<span class="big">${m}</span>`, ans: p + q, steps: [L('Add the indices of all the letters.', '把所有字母的指數相加。'), `${p}${q ? ' + ' + q : ''} = <b>${p + q}</b>`], hint: L('A letter with no index has index 1.', '沒有寫指數的字母，指數是 1。') };
      }
    },
    {
      id: 'poly', name: ['Terms, degree, constant term', '項數、次數、常數項'], gen() {
        const cf = randPoly(ri(3, 4)); const P = polyMixed(cf); const degs = Object.keys(cf).map(Number); const t = ri(0, 3);
        if (t === 0) return { kind: 'num', q: L('How many terms does the polynomial have?', '多項式有多少項？') + `<span class="big">${P}</span>`, ans: degs.length, steps: [L('Count the parts separated by + and −.', '數一數被 + 和 − 分開的部分。'), `<b>${degs.length}</b>`] };
        if (t === 1) return { kind: 'num', q: L('Find the degree of the polynomial.', '求多項式的次數。') + `<span class="big">${P}</span>`, ans: Math.max(...degs), steps: [L('Degree of each term', '每項的次數') + ': ' + degs.join(', '), L('Highest', '最高') + ` = <b>${Math.max(...degs)}</b>`] };
        if (t === 2) { const c0 = cf[0] || 0; return { kind: 'num', q: L('Find the constant term of the polynomial. (Type 0 if there is none.)', '求多項式的常數項。（如沒有，輸入 0。）') + `<span class="big">${P}</span>`, ans: c0, steps: [L('Constant term = the term without letters, with its sign.', '常數項 = 沒有字母的項（連符號）。'), `<b>${n(c0)}</b>`] }; }
        const d = pick(degs.filter(x => x > 0)); return { kind: 'num', q: L(`Find the coefficient of ${pw(v('x'), d)}.`, `求 ${pw(v('x'), d)} 的係數。`) + `<span class="big">${P}</span>`, ans: cf[d], steps: [L('Find that term and take its number, with the sign.', '找出該項，取它的數字（連符號）。'), `<b>${n(cf[d])}</b>`] };
      }
    },
    {
      id: 'order', name: ['Ascending / descending powers', '升冪 / 降冪'], gen() {
        const cf = randPoly(4); const P = polyMixed(cf); const asc = Math.random() < .5;
        const right = px(cf, 'x', asc), rev = px(cf, 'x', !asc);
        const ks = Object.keys(cf).map(Number).sort((a, b) => a - b); const bad = {}; ks.forEach(k => bad[k] = -cf[k]);
        const w2 = px(bad, 'x', asc); const absC = {}; ks.forEach(k => absC[k] = Math.abs(cf[k]));
        return { kind: 'mc', q: L(`Arrange in <b>${asc ? 'ascending' : 'descending'}</b> powers of x:`, `按 x 的<b>${asc ? '升冪' : '降冪'}</b>排列：`) + `<span class="big">${P}</span>`, choices: [right, rev, w2, px(absC, 'x', asc)], steps: [L(asc ? 'Ascending = smallest power first.' : 'Descending = biggest power first.', asc ? '升冪 = 次數小的先寫。' : '降冪 = 次數大的先寫。'), L('Each term keeps its sign.', '每項的符號跟着該項移動。'), `<b>${right}</b>`], hint: L('Move each term together with its sign.', '每項連同它的符號一起移動。') };
      }
    },
    {
      id: 'like', name: ['Like terms', '同類項'], gen() {
        const [a, b] = vars2(); const p = ri(1, 3), q = ri(1, 3); if (p === q) return null;
        const base = termH(nz(-6, 8), { [a]: p, [b]: q }, true); const k = nz(-9, 9);
        return { kind: 'mc', q: L('Which one is a <b>like term</b> of', '哪一項是下面這項的<b>同類項</b>？') + `<span class="big">${base}</span>`, choices: [termH(k, { [a]: p, [b]: q }, true), termH(k, { [a]: q, [b]: p }, true), termH(k, { [a]: p }, true), termH(k, { [a]: p + q }, true), termH(k, { [a]: p, [b]: q + 1 }, true)].slice(0, 4),
          steps: [L('Like terms: same letters, same powers.', '同類項：字母及次數相同。'), `<b>${termH(k, { [a]: p, [b]: q }, true)}</b>`] };
      }
    },
    {
      id: 'simp', name: ['Simplify (collect like terms)', '化簡（合併同類項）'], gen() {
        const [a, b] = vars2(); const A = nz(-8, 9), A2 = nz(-8, 9), Bc = nz(-8, 9), B2 = nz(-8, 9), C = ri(-9, 9);
        const terms = shuffle([[A, { [a]: 1 }], [A2, { [a]: 1 }], [Bc, { [b]: 1 }], [B2, { [b]: 1 }], ...(C ? [[C, {}]] : [])]);
        const q = polyH(terms); const right = polyH([[A + A2, { [a]: 1 }], [Bc + B2, { [b]: 1 }], [C, {}]]);
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${q}</span>`, choices: [right, polyH([[A - A2, { [a]: 1 }], [Bc + B2, { [b]: 1 }], [C, {}]]), polyH([[A + A2 + Bc + B2, { [a]: 1, [b]: 1 }], [C, {}]]), polyH([[A + A2, { [a]: 1 }], [Bc - B2, { [b]: 1 }], [-C, {}]])],
          steps: [L(`${a} terms`, `${a} 項`) + `: ${n(A)} ${A2 < 0 ? MI : '+'} ${Math.abs(A2)} = ${n(A + A2)}`, L(`${b} terms`, `${b} 項`) + `: ${n(Bc)} ${B2 < 0 ? MI : '+'} ${Math.abs(B2)} = ${n(Bc + B2)}`, `= <b>${right}</b>`], hint: L('Group the same letters. Each term keeps its sign.', '把相同字母的項放在一起，每項連符號。') };
      }
    },
    {
      id: 'addsub', name: ['Add / subtract polynomials', '多項式加減'], gen() {
        const P = { 2: nz(-6, 7), 1: nz(-9, 9), 0: nz(-9, 9) }, Q = { 2: nz(-6, 7), 1: nz(-9, 9), 0: nz(-9, 9) }; const sub = Math.random() < .6;
        const R = padd(P, Q, sub ? -1 : 1); if (!R[2]) return null;
        const half = { 2: P[2] - Q[2], 1: P[1] + Q[1], 0: P[0] + Q[0] };
        const q = `(${px(P)}) ${sub ? MI : '+'} (${px(Q)})`;
        const wr = sub ? [px(half), px(padd(P, Q, 1)), px({ 2: R[2], 1: R[1], 0: -R[0] })] : [px(padd(P, Q, -1)), px({ 2: R[2], 1: -R[1], 0: R[0] }), px({ 2: P[2] * Q[2], 1: R[1], 0: R[0] })];
        const negQ = { 2: -Q[2], 1: -Q[1], 0: -Q[0] };
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">${q}</span>`, choices: [px(R), ...wr],
          steps: [sub ? L('− in front of the bracket: change EVERY sign inside', '括號前有 −：括號內每項都變號') + `: ${px(P)}${termH(negQ[2], { x: 2 })}${termH(negQ[1], { x: 1 })}${termH(negQ[0], {})}` : L('Remove the brackets (signs stay the same)', '去括號（符號不變）') + `: ${px(P)} + ${px(Q)}`, L('Collect like terms', '合併同類項'), `= <b>${px(R)}</b>`], hint: sub ? L('Minus a bracket → change all the signs inside!', '減一個括號 → 括號內全部變號！') : '' };
      }
    },
    {
      id: 'laws', name: ['aᵐ × aⁿ', 'aᵐ × aⁿ'], gen() {
        const a = nz(-6, 6), b = nz(-6, 6), p = ri(1, 6), q = ri(2, 6); const vv = pick(['x', 'y', 'a']);
        const right = termH(a * b, { [vv]: p + q }, true);
        return { kind: 'mc', q: L('Simplify', '化簡') + `<span class="big">(${termH(a, { [vv]: p }, true)})(${termH(b, { [vv]: q }, true)})</span>`, choices: [right, termH(a * b, { [vv]: p * q }, true), termH(a + b, { [vv]: p + q }, true), termH(-a * b, { [vv]: p + q }, true)],
          steps: [L('Multiply the numbers', '數字相乘') + `: ${nb(a)} × ${nb(b)} = ${n(a * b)}`, L('Same base → add the indices', '底相同 → 指數相加') + `: ${p} + ${q} = ${p + q}`, `= <b>${right}</b>`], hint: L('aᵐ × aⁿ = aᵐ⁺ⁿ', 'aᵐ × aⁿ = aᵐ⁺ⁿ') };
      }
    },
    {
      id: 'exp1', name: ['Expand a(b + c)', '展開 a(b + c)'], gen() {
        const k = nz(-6, 6), a = nz(-6, 7), b = nz(-9, 9); const kx = Math.random() < .6; const K = kx ? { 1: k } : { 0: k };
        const R = pmul(K, { 1: a, 0: b }); const Ks = px(K);
        const q = Math.random() < .5 ? `${k < 0 ? '(' + Ks + ')' : Ks}(${lin(a, b)})` : `(${lin(a, b)})(${Ks})`;
        const wrong1 = px(kx ? { 2: k * a, 0: b } : { 1: k * a, 0: b }); const wrong2 = px(kx ? { 2: k * a, 1: -k * b } : { 1: k * a, 0: -k * b }); const wrong3 = px(kx ? { 1: k * a + k * b } : { 1: k * a, 0: k + b });
        return { kind: 'mc', q: L('Expand', '展開') + `<span class="big">${q}</span>`, choices: [px(R), wrong1, wrong2, wrong3],
          steps: [L('Multiply the outside term by EACH term inside.', '外面的項乘括號內的每一項。'), `${k < 0 ? '(' + Ks + ')' : Ks} × ${a < 0 ? '(' + termH(a, { x: 1 }, true) + ')' : termH(a, { x: 1 }, true)} = ${termH(k * a, { x: kx ? 2 : 1 }, true)} ; &nbsp; ${k < 0 ? '(' + Ks + ')' : Ks} × ${nb(b)} = ${termH(k * b, kx ? { x: 1 } : {}, true)}`, `= <b>${px(R)}</b>`], hint: L('Do not forget the second term!', '不要漏乘第二項！') };
      }
    },
    {
      id: 'exp2', name: ['Expand (a + b)(c + d)', '展開 (a + b)(c + d)'], gen() {
        const a = pick([1, 1, 2, 3, -1, 2]), b = nz(-8, 8), c = pick([1, 1, 2, 3, 4]), d = nz(-8, 8); const sq = Math.random() < .15;
        const P = { 1: a, 0: b }, Q = sq ? P : { 1: c, 0: d }; const R = pmul(P, Q); if (!R[1]) return null;
        const qh = sq ? `(${lin(a, b)})<sup>2</sup>` : `(${lin(a, b)})(${lin(Q[1], Q[0])})`;
        const ws = [px({ 2: R[2], 0: R[0] }), px({ 2: R[2], 1: -R[1], 0: R[0] }), px({ 2: R[2], 1: R[1], 0: -R[0] }), px({ 2: R[2], 1: a * Q[0] - b * Q[1], 0: R[0] })];
        return { kind: 'mc', q: L('Expand', '展開') + `<span class="big">${qh}</span>`, choices: [px(R), ...shuffle(ws).slice(0, 3)],
          steps: [sq ? `${qh} = (${lin(a, b)})(${lin(a, b)})` : L('Every term × every term:', '每一項乘每一項：'), `${termH(a * Q[1], { x: 2 }, true)} ${termH(a * Q[0], { x: 1 })} ${termH(b * Q[1], { x: 1 })} ${termH(b * Q[0], {}) || ''}`, L('Collect like terms', '合併同類項') + `: <b>${px(R)}</b>`], hint: L('4 multiplications, then collect the x terms.', '共 4 次乘法，然後合併 x 項。') };
      }
    },
    {
      id: 'const', name: ['Find the unknown constant', '求未知常數'], gen() {
        const p = pick([1, 2, 3]), q = nz(-6, 6), r = nz(-6, 6), A = nz(-5, 6); const Cx = p * r + q * A; if (!q) return null;
        const qh = `(${lin(p, q)})(${v('a')}${v('x')} ${r < 0 ? MI : '+'} ${Math.abs(r)})`;
        const coef = `${p * r ? n(p * r) + ' ' : ''}${q < 0 ? MI : (p * r ? '+' : '')} ${Math.abs(q) === 1 ? '' : Math.abs(q)}${v('a')}`;
        return { kind: 'num', pre: v('a') + ' =', q: L(`In the expansion of ${qh}, where a is a constant, the coefficient of x is ${n(Cx)}. Find a.`, `在 ${qh} 的展開式中（a 是常數），x 的係數是 ${n(Cx)}。求 a。`), ans: A,
          steps: [L('Expand', '展開') + `: ${termH(p, { a: 1, x: 2 }, true)} ${termH(p * r, { x: 1 })} ${termH(q, { a: 1, x: 1 })} ${termH(q * r, {})}`, L('Coefficient of x', 'x 的係數') + ` = ${coef}`, `${coef} = ${n(Cx)}`, `${v('a')} = <b>${n(A)}</b>`], hint: L('Expand, find the x terms, then make an equation.', '展開，找出 x 項，再列方程。') };
      }
    },
    {
      id: 'value', name: ['Value of a polynomial', '多項式的值'], gen() {
        const x = nz(-4, 4), a = nz(-4, 5), b = nz(-9, 9), c = nz(-9, 9); const val = a * x * x + b * x + c;
        return { kind: 'num', q: L(`Find the value of the polynomial when x = ${n(x)}.`, `當 x = ${n(x)} 時，求多項式的值。`) + `<span class="big">${px({ 2: a, 1: b, 0: c })}</span>`, ans: val,
          steps: [`${n(a)}${pb(x)}<sup>2</sup> ${b < 0 ? MI : '+'} ${Math.abs(b)}${pb(x)} ${c < 0 ? MI : '+'} ${Math.abs(c)}`, `= ${n(a)}(${x * x}) ${b * x < 0 ? MI : '+'} ${Math.abs(b * x)} ${c < 0 ? MI : '+'} ${Math.abs(c)}`, `= <b>${n(val)}</b>`], hint: L('Put the number in brackets: (−2)² = 4', '把數字放在括號內：(−2)² = 4') };
      }
    }
  ];

  CH.push({
    id: 'ch6', no: 6, color: COLORS[6], title: ['Manipulations of Polynomials', '多項式的運算'], short: ['Polynomials', '多項式'],
    intro: ['Polynomials are made of terms. In this chapter: coefficients, degrees, like terms, adding, subtracting and expanding.', '多項式由項組成。本章重點：係數、次數、同類項、加減及展開。'],
    lessons, gens,
    keys: [B('Coefficient = number part (with sign). Degree of a term = sum of the indices.', '係數 = 數字部分（連符號）。項的次數 = 指數之和。'),
    B('Degree of a polynomial = highest degree of its terms.', '多項式的次數 = 各項中最高的次數。'),
    B('Like terms: same letters, same powers. Add the coefficients only.', '同類項：字母和次數都相同，只把係數相加。'),
    B('−(a − b + c) = −a + b − c (change every sign).', '−(a − b + c) = −a + b − c（每項變號）。'),
    B('aᵐ × aⁿ = aᵐ⁺ⁿ. (a + b)(c + d) = ac + ad + bc + bd.', 'aᵐ × aⁿ = aᵐ⁺ⁿ；(a + b)(c + d) = ac + ad + bc + bd。')],
    traps: [B('✘ x³ × x² = x⁶ &nbsp; ✔ x⁵ (add, do not multiply!)', '✘ x³ × x² = x⁶ &nbsp; ✔ x⁵（相加，不是相乘！）'),
    B('✘ 3x + 2x² = 5x³ &nbsp; ✔ cannot combine (unlike terms)', '✘ 3x + 2x² = 5x³ &nbsp; ✔ 不能合併（異類項）'),
    B('✘ (x + 3)(x + 2) = x² + 6 &nbsp; ✔ x² + 5x + 6 (do not miss the middle terms)', '✘ (x + 3)(x + 2) = x² + 6 &nbsp; ✔ x² + 5x + 6（不要漏了中間項）'),
    B('✘ −(x − 5) = −x − 5 &nbsp; ✔ −x + 5', '✘ −(x − 5) = −x − 5 &nbsp; ✔ −x + 5'),
    B('✘ coefficient of x in 4 − 3x is 3 &nbsp; ✔ −3', '✘ 4 − 3x 中 x 的係數是 3 &nbsp; ✔ −3')],
    cheat: [`${L('Degree of', '')} −7a<sup>4</sup>b<sup>2</sup> ${L('', '的次數')} = 4 + 2 = 6`, `${L('Like terms: same letters & powers', '同類項：字母和次數相同')}`, `−( + − ) → ( − + ) ${L('change all signs', '全部變號')}`, `a<sup>m</sup> × a<sup>n</sup> = a<sup>m+n</sup>`, `(x + 3)(x + 2) = x<sup>2</sup> + 5x + 6`]
  });
})();
