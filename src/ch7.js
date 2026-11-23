/* ================= Chapter 7 Linear Equations in One Unknown (II) ================= */
(function () {
  const X = v('x');
  const moveAnim = Chips(L('Move terms across “=” : change the sign', '移項：過「=」號要變號'), 190,
    [{ id: 'a', h: `5${X}`, bg: '#ede9fe', bd: '#8b5cf6' }, { id: 'b', h: `${MI} 3`, bg: '#fef3c7', bd: '#f59e0b' }, { id: 'eq', h: '=', bg: 'transparent', bd: 'transparent' }, { id: 'c', h: `2${X}`, bg: '#ede9fe', bd: '#8b5cf6' }, { id: 'd', h: '+ 9', bg: '#fef3c7', bd: '#f59e0b' }],
    [{ id: 'l1', x: 20, y: 2, w: 520, h: `<div class="sub" style="display:flex;justify-content:space-between;font-weight:800"><span>⬅ ${L('x terms here', 'x 項放這邊')}</span><span>${L('numbers here', '數字放這邊')} ➡</span></div>` },
    { id: 'r1', x: 20, y: 110, w: 520, h: `<div style="font-size:22px;font-weight:800">3${X} = 12</div>` },
    { id: 'r2', x: 20, y: 150, w: 520, h: `<div style="font-size:22px;font-weight:800;color:#16a34a">${X} = 4</div>` }],
    [{ c: ['5x − 3 = 2x + 9. x terms left, numbers right.', '5x − 3 = 2x + 9。x 項放左，數字放右。'], pos: { a: [60, 45], b: [140, 45], eq: [240, 45], c: [320, 45], d: [400, 45] }, show: { l1: 1 } },
    { c: ['2x crosses “=”: + 2x → − 2x', '2x 過「=」：+ 2x → − 2x'], d: 3500, html: { c: `${MI} 2${X}` }, pos: { c: [120, 45], b: [210, 45], eq: [290, 45], d: [400, 45], a: [40, 45] } },
    { c: ['− 3 crosses “=”: − 3 → + 3', '− 3 過「=」：− 3 → + 3'], d: 3500, html: { b: '+ 3' }, pos: { a: [40, 45], c: [120, 45], eq: [230, 45], d: [300, 45], b: [380, 45] } },
    { c: ['Collect like terms: 5x − 2x = 3x and 9 + 3 = 12.', '合併同類項：5x − 2x = 3x，9 + 3 = 12。'], show: { r1: 1 } },
    { c: ['Divide both sides by 3: x = 4. Check: 5(4) − 3 = 17, 2(4) + 9 = 17 ✔', '兩邊 ÷ 3：x = 4。驗算：5(4) − 3 = 17，2(4) + 9 = 17 ✔'], show: { r2: 1 } }]);

  const lessons = [
    {
      t: ['Warm-up: like terms and brackets', '熱身：同類項及括號'],
      body: ul([B('Like terms: 7x − 3x = 4x, 5 + 2x − 1 = 2x + 4', '同類項：7x − 3x = 4x，5 + 2x − 1 = 2x + 4'), B(`${T('Distributive law', '乘法分配律')}: a(b + c) = ab + ac`, '乘法分配律：a(b + c) = ab + ac')]),
      anim: W(L('Removing brackets', '去括號'), [
        { h: `<span class="hl">3</span>(${X} − 2)`, c: ['The 3 outside multiplies BOTH terms inside.', '外面的 3 要乘括號內的兩項。'] },
        { h: `<span class="hl">3</span>(${X}) <span class="hl">− 3</span>(2)`, eq: 1, c: ['3 × x and 3 × (−2)', '3 × x 及 3 × (−2)'] },
        { h: `<b class="green">3${X} − 6</b>`, eq: 1, c: ['= 3x − 6', '= 3x − 6'] },
        { h: `<span class="hl">${MI}2</span>(${X} − 3)`, c: ['Careful with a negative number outside!', '外面是負數時要小心！'] },
        { h: `<span class="hl">${MI}2</span>(${X}) <span class="hl">${MI}2</span>(${MI}3)`, eq: 1, c: ['−2 × x and −2 × (−3)', '−2 × x 及 −2 × (−3)'] },
        { h: `<b class="green">${MI}2${X} + 6</b>`, eq: 1, c: ['(−2)(−3) = +6 (same signs → +)', '(−2)(−3) = +6（同號得正）'] }
      ])
    },
    {
      t: ['Equations with x on both sides', '兩邊都有 x 的方程'],
      body: box('rule', L('Transposing', '移項'), B('When a term moves to the other side of “=”, its sign changes: + ↔ −.', '一項移到「=」的另一邊時要變號：+ ↔ −。') + B('Put x terms on one side, numbers on the other side.', 'x 項放一邊，數字放另一邊。')),
      anim: moveAnim
    },
    {
      t: ['Equations with brackets', '涉及括號的方程'],
      body: B('Step 1: remove the brackets. Step 2: move terms. Step 3: solve.', '第 1 步：去括號。第 2 步：移項。第 3 步：求解。'),
      anim: [W(L('Example 1', '例題 1'), [
        { h: `3(${X} − 2) = 2${X} + 5`, c: ['Remove the bracket first.', '先去括號。'] },
        { h: `3${X} − 6 = 2${X} + 5`, c: ['3(x − 2) = 3x − 6', '3(x − 2) = 3x − 6'] },
        { h: `3${X} <span class="hl">− 2${X}</span> = 5 <span class="hl">+ 6</span>`, c: ['Move 2x to the left (−2x), move −6 to the right (+6).', '2x 移到左邊（−2x），−6 移到右邊（+6）。'] },
        { h: `<b class="green">${X} = 11</b>`, c: ['x = 11', 'x = 11'] }
      ]), W(L('Example 2', '例題 2'), [
        { h: `4(${X} + 1) − 2(${X} − 3) = 20`, c: ['Two brackets. Watch the − 2!', '有兩個括號。小心 − 2！'] },
        { h: `4${X} + 4 <span class="hl">− 2${X} + 6</span> = 20`, c: ['−2(x − 3) = −2x + 6', '−2(x − 3) = −2x + 6'] },
        { h: `2${X} + 10 = 20`, c: ['Collect like terms: 4x − 2x = 2x, 4 + 6 = 10', '合併同類項：4x − 2x = 2x，4 + 6 = 10'] },
        { h: `2${X} = 10`, c: ['Move 10: 20 − 10 = 10', '移項：20 − 10 = 10'] },
        { h: `<b class="green">${X} = 5</b>`, c: ['x = 5', 'x = 5'] }
      ])]
    },
    {
      t: ['Equations with fractions', '涉及分數的方程'],
      body: box('rule', L('Remove the fractions', '消去分數'), B('Multiply <b>every term</b> on both sides by the L.C.M. of the denominators.', '兩邊的<b>每一項</b>都乘以分母的 L.C.M.。')),
      anim: [W(L('Example 1', '例題 1'), [
        { h: `${fr(X, 3)} + 2 = ${fr(X, 2)} − 1`, c: ['Denominators 3 and 2. L.C.M. = 6', '分母是 3 和 2，L.C.M. = 6'] },
        { h: `<span class="hl">6</span> × ${fr(X, 3)} + <span class="hl">6</span> × 2 = <span class="hl">6</span> × ${fr(X, 2)} − <span class="hl">6</span> × 1`, c: ['Multiply EVERY term by 6 (do not forget the numbers 2 and 1!).', '每一項都乘以 6（不要忘記數字 2 和 1！）'] },
        { h: `2${X} + 12 = 3${X} − 6`, c: ['6 ÷ 3 = 2, 6 ÷ 2 = 3. No more fractions!', '6 ÷ 3 = 2，6 ÷ 2 = 3。沒有分數了！'] },
        { h: `12 + 6 = 3${X} − 2${X}`, c: ['Move x terms to the right (keeps x positive).', 'x 項移到右邊（令 x 為正）。'] },
        { h: `<b class="green">${X} = 18</b>`, c: ['18 = x, so x = 18', '18 = x，所以 x = 18'] }
      ]), W(L('Example 2', '例題 2'), [
        { h: `${fr(X + ' + 1', 2)} = ${fr(X + ' − 2', 3)}`, c: ['L.C.M. of 2 and 3 is 6.', '2 和 3 的 L.C.M. 是 6。'] },
        { h: `3(${X} + 1) = 2(${X} − 2)`, c: ['× 6: the top gets 6 ÷ 2 = 3 and 6 ÷ 3 = 2. Keep the brackets!', '× 6：分子分別乘 6 ÷ 2 = 3 和 6 ÷ 3 = 2。記得保留括號！'] },
        { h: `3${X} + 3 = 2${X} − 4`, c: ['Remove the brackets.', '去括號。'] },
        { h: `3${X} − 2${X} = −4 − 3`, c: ['Move terms (change the signs).', '移項（變號）。'] },
        { h: `<b class="green">${X} = −7</b>`, c: ['x = −7', 'x = −7'] }
      ])]
    },
    {
      t: ['Solving word problems', '解應用題'],
      body: box('rule', L('4 steps', '4 個步驟'), `<ol style="margin:4px 0"><li>${L('<b>Let</b> x = the thing you want.', '<b>設</b> x = 要求的東西。')}</li><li>${L('Write other amounts using x.', '用 x 表示其他數量。')}</li><li>${L('Form an <b>equation</b> and solve.', '列<b>方程</b>並求解。')}</li><li>${L('Write the <b>answer</b>.', '<b>作答</b>。')}</li></ol>`) +
        box('tip', L('Useful ideas', '常用概念'), ul([B('Consecutive numbers: x, x + 1, x + 2', '連續數：x、x + 1、x + 2'), B('Consecutive odd / even numbers: x, x + 2, x + 4', '連續單數 / 雙數：x、x + 2、x + 4'), B('In n years, everyone is n years older.', 'n 年後，每個人都大了 n 歲。')])),
      anim: W(L('The sum of three consecutive numbers is 48. Find them.', '三個連續數之和是 48。求這三個數。'), [
        { h: L('Let the smallest number be x.', '設最小的數為 x。'), c: ['Step 1: Let x be the smallest number.', '第 1 步：設最小的數為 x。'] },
        { h: `${X}, &nbsp; ${X} + 1, &nbsp; ${X} + 2`, c: ['Step 2: the next two are x + 1 and x + 2.', '第 2 步：另外兩個是 x + 1 和 x + 2。'] },
        { h: `${X} + (${X} + 1) + (${X} + 2) = 48`, c: ['Step 3: their sum is 48.', '第 3 步：它們的和是 48。'] },
        { h: `3${X} + 3 = 48 → 3${X} = 45 → ${X} = 15`, c: ['Solve: x = 15', '解得 x = 15'] },
        { h: `<b class="green">${L('The numbers are 15, 16 and 17.', '這三個數是 15、16 和 17。')}</b>`, c: ['Step 4: answer. Check: 15 + 16 + 17 = 48 ✔', '第 4 步：作答。驗算：15 + 16 + 17 = 48 ✔'] }
      ])
    }
  ];

  const xs = k => k === 1 ? X : k === -1 ? MI + X : n(k) + X;
  const solveLines = (A, Bc) => { /* A x = Bc */ const s = []; if (A === 1) return [`${X} = <b>${n(Bc)}</b>`]; s.push(`${xs(A)} = ${n(Bc)}`); if (A !== 1) s.push(`${X} = ${fr(n(Bc), n(A))}`); s.push(`${X} = <b>${n(Bc / A)}</b>`); return s; };
  const gens = [
    {
      id: 'both', name: ['x on both sides', '兩邊都有 x'], gen() {
        const x = nz(-10, 12); let a = nz(-6, 9), c = nz(-6, 9); if (a === c) return null; const b = nz(-15, 15); const d = (a - c) * x + b;
        return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${lin(a, b)} = ${lin(c, d)}</span>`, ans: x,
          steps: [L('Move x terms to the left, numbers to the right (change signs)', 'x 項移到左邊，數字移到右邊（變號）') + `: ${xs(a)}${termH(-c, { x: 1 })} = ${n(d)}${termH(-b, {})}`, ...solveLines(a - c, d - b)], hint: L('Change the sign when a term crosses “=”.', '過「=」號要變號。') };
      }
    },
    {
      id: 'like', name: ['Collect like terms first', '先合併同類項'], gen() {
        const x = nz(-9, 12), a = nz(-5, 8), c = nz(-5, 8); if (a + c === 0) return null; const b = nz(-12, 12), e = ri(-10, 10); const d = (a + c) * x + b + e;
        const lhs = polyH(shuffle([[a, { x: 1 }], [b, {}], [c, { x: 1 }]])) ; const lhsAll = e ? lhs + termH(e, {}) : lhs;
        return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${lhsAll} = ${n(d)}</span>`, ans: x,
          steps: [L('Collect like terms', '合併同類項') + `: ${lin(a + c, b + e)} = ${n(d)}`, L('Move the number', '移項') + `: ${xs(a + c)} = ${n(d)} ${b + e < 0 ? '+' : MI} ${Math.abs(b + e)}`, ...solveLines(a + c, d - b - e)] };
      }
    },
    {
      id: 'brk', name: ['Equations with brackets', '有括號的方程'], gen() {
        const x = nz(-8, 10), a = nz(-5, 6), b = nz(-9, 9); const t = ri(0, 1);
        if (t === 0) { const c = a * (x + b); if (Math.abs(a) === 1) return null;
          return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${n(a)}(${lin(1, b)}) = ${n(c)}</span>`, ans: x, steps: [L('Remove brackets', '去括號') + `: ${lin(a, a * b)} = ${n(c)}`, `${xs(a)} = ${n(c)}${termH(-a * b, {})} = ${n(c - a * b)}`, ...solveLines(a, c - a * b).slice(1)] }; }
        const c = nz(-5, 8); if (c === a) return null; const d = a * (x + b) - c * x;
        return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${n(a)}(${lin(1, b)}) = ${lin(c, d)}</span>`, ans: x, steps: [L('Remove brackets', '去括號') + `: ${lin(a, a * b)} = ${lin(c, d)}`, L('Move terms', '移項') + `: ${xs(a)}${termH(-c, { x: 1 })} = ${n(d)}${termH(-a * b, {})}`, ...solveLines(a - c, d - a * b)] };
      }
    },
    {
      id: 'brk2', name: ['Two brackets', '兩個括號'], gen() {
        const x = nz(-8, 10), a = ri(2, 6), b = nz(-6, 6), c = nz(-5, 5), d = nz(-6, 6); const t = ri(0, 1);
        if (t === 0) { if (a - c === 0) return null; const e = a * (x + b) - c * (x + d);
          const sgnC = c < 0 ? '+' : MI;
          return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${a}(${lin(1, b)}) ${sgnC} ${Math.abs(c)}(${lin(1, d)}) = ${n(e)}</span>`, ans: x,
            steps: [L('Remove brackets (careful with the sign in front!)', '去括號（小心前面的符號！）') + `: ${lin(a, a * b)}${termH(-c, { x: 1 })}${termH(-c * d, {})} = ${n(e)}`, L('Collect like terms', '合併同類項') + `: ${lin(a - c, a * b - c * d)} = ${n(e)}`, ...solveLines(a - c, e - a * b + c * d)] }; }
        const p = ri(2, 6), q = ri(2, 6); if (p === q) return null; const r = nz(-6, 6); const s = (p * (x + r) - q * x) / q; if (!Number.isInteger(s)) return null;
        return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${p}(${lin(1, r)}) = ${q}(${lin(1, s)})</span>`, ans: x,
          steps: [L('Remove brackets', '去括號') + `: ${lin(p, p * r)} = ${lin(q, q * s)}`, L('Move terms', '移項') + `: ${p}${X}${termH(-q, { x: 1 })} = ${n(q * s)}${termH(-p * r, {})}`, ...solveLines(p - q, q * s - p * r)] };
      }
    },
    {
      id: 'frac', name: ['Equations with fractions', '有分數的方程'], gen() {
        const t = ri(0, 2);
        if (t === 0) { const a = pick([2, 3, 4, 5, 6]), b = pick([2, 3, 4, 6]); if (a === b) return null; const m = lcm(a, b); const x = m * nz(-4, 5); const c = x / a + x / b;
          return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${fr(X, a)} + ${fr(X, b)} = ${n(c)}</span>`, ans: x,
            steps: [L(`L.C.M. of ${a} and ${b} is ${m}. Multiply every term by ${m}`, `${a} 和 ${b} 的 L.C.M. 是 ${m}，每項乘以 ${m}`) + `: ${xs(m / a)} + ${xs(m / b)} = ${n(c * m)}`, ...solveLines(m / a + m / b, c * m)] }; }
        if (t === 1) { const a = pick([2, 3, 4]), b = pick([2, 3, 4, 5, 6]); if (a === b) return null; const m = lcm(a, b); const x = m * nz(-3, 4); const p = nz(-6, 6); const c = x / a + p - x / b; if (c === 0) return null;
          return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${fr(X, a)} ${p < 0 ? MI : '+'} ${Math.abs(p)} = ${fr(X, b)} ${c < 0 ? MI : '+'} ${Math.abs(c)}</span>`, ans: x, hide: c === 0,
            steps: [L(`Multiply every term by ${m}`, `每項乘以 ${m}`) + `: ${xs(m / a)} ${p * m < 0 ? MI : '+'} ${Math.abs(p * m)} = ${xs(m / b)} ${c * m < 0 ? MI : '+'} ${Math.abs(c * m)}`, L('Move terms', '移項') + `: ${xs(m / a)}${termH(-m / b, { x: 1 })} = ${n(c * m)}${termH(-p * m, {})}`, ...solveLines(m / a - m / b, c * m - p * m)] }; }
        const a = pick([2, 3, 4, 5]), b = pick([2, 3, 4, 5]); if (a === b) return null; const x = nz(-10, 12), p = nz(-8, 8); const q = (b * (x + p)) / a - x; if (!Number.isInteger(q) || q === 0) return null;
        return { kind: 'num', pre: X + ' =', q: L('Solve', '解方程') + `<span class="big">${fr(lin(1, p), a)} = ${fr(lin(1, q), b)}</span>`, ans: x,
          steps: [L(`Cross-multiply (or × ${a * b})`, `交叉相乘（或 × ${a * b}）`) + `: ${b}(${lin(1, p)}) = ${a}(${lin(1, q)})`, `${lin(b, b * p)} = ${lin(a, a * q)}`, `${b}${X}${termH(-a, { x: 1 })} = ${n(a * q)}${termH(-b * p, {})}`, ...solveLines(b - a, a * q - b * p)] };
      }
    },
    {
      id: 'word', name: ['Word problems', '應用題'], gen() {
        const t = ri(0, 5);
        if (t === 0) { const k = pick([2, 3]); const odd = Math.random() < .4; const step = odd ? 2 : 1; let x = ri(5, 40); if (odd && x % 2 === 0) x++; const terms = [...Array(k)].map((_, i) => x + i * step); const S = terms.reduce((a, b) => a + b);
          return { kind: 'num', q: B(`The sum of ${k} consecutive ${odd ? 'odd numbers' : 'numbers'} is ${S}. Find the <b>smallest</b> number.`, `${k} 個連續${odd ? '單數' : '數'}之和是 ${S}。求<b>最小</b>的數。`), ans: x,
            steps: [L(`Let the smallest be x. The numbers are ${[...Array(k)].map((_, i) => i ? 'x + ' + i * step : 'x').join(', ')}.`, `設最小的數為 x，各數為 ${[...Array(k)].map((_, i) => i ? 'x + ' + i * step : 'x').join('、')}。`), `${k}${X} + ${S - k * x} = ${S}`, `${k}${X} = ${k * x}`, `${X} = <b>${x}</b>`], hint: L(`Use x, x + ${step}${k > 2 ? ', x + ' + 2 * step : ''}`, `用 x、x + ${step}${k > 2 ? '、x + ' + 2 * step : ''}`) }; }
        if (t === 1) { const s = ri(5, 15), k = ri(3, 5); const S = s + k * s;
          return { kind: 'num', q: B(`A father is ${k} times as old as his son. The sum of their ages is ${S}. How old is the son?`, `父親的年齡是兒子的 ${k} 倍，兩人年齡之和是 ${S}。兒子現年多少歲？`), ans: s, steps: [L(`Let the son be x years old. Father: ${k}x`, `設兒子 x 歲，父親 ${k}x 歲`), `${X} + ${k}${X} = ${S}`, `${k + 1}${X} = ${S}`, `${X} = <b>${s}</b>`] }; }
        if (t === 2) { const s = ri(4, 12), k = ri(3, 4), y = ri(2, 10); const f = k * s + (k - 1) * y; /* in y years father = k... wrong */
          const F0 = ri(30, 45), S0 = ri(4, 14), Y = ri(2, 12); const kk = (F0 + Y) / (S0 + Y); if (!Number.isInteger(kk) || kk < 2) return null;
          return { kind: 'num', q: B(`Mr Chan is ${F0} years old and his son is x years old. In ${Y} years, Mr Chan will be ${kk} times as old as his son. Find x.`, `陳先生現年 ${F0} 歲，兒子現年 x 歲。${Y} 年後，陳先生的年齡會是兒子的 ${kk} 倍。求 x。`), pre: X + ' =', ans: S0,
            steps: [L(`In ${Y} years: Mr Chan ${F0 + Y}, son x + ${Y}`, `${Y} 年後：陳先生 ${F0 + Y} 歲，兒子 x + ${Y} 歲`), `${F0 + Y} = ${kk}(${X} + ${Y})`, `${F0 + Y} = ${kk}${X} + ${kk * Y}`, `${kk}${X} = ${F0 + Y - kk * Y}`, `${X} = <b>${S0}</b>`] }; }
        if (t === 3) { const a = pick([60, 80, 100, 120]), c = pick([30, 40, 50]); const N = ri(8, 20), xa = ri(2, N - 2); const M = a * xa + c * (N - xa);
          return { kind: 'num', q: B(`${N} people go to a show. An adult ticket costs $${a} and a child ticket costs $${c}. They pay $${M} in total. How many adults are there?`, `${N} 人去看表演，成人票每張 $${a}，小童票每張 $${c}，共付 $${M}。有多少名成人？`), ans: xa,
            steps: [L(`Let x be the number of adults. Children: ${N} − x`, `設成人有 x 人，小童有 ${N} − x 人`), `${a}${X} + ${c}(${N} − ${X}) = ${M}`, `${a}${X} + ${c * N} − ${c}${X} = ${M}`, `${a - c}${X} = ${M - c * N}`, `${X} = <b>${xa}</b>`], hint: L('Children = total − adults', '小童人數 = 總人數 − 成人人數') }; }
        if (t === 4) { const w = ri(3, 15), d = ri(2, 10); const P = 2 * (2 * w + d);
          return { kind: 'num', post: 'cm', q: B(`The length of a rectangle is ${d} cm longer than its width. Its perimeter is ${P} cm. Find the width.`, `長方形的長比闊多 ${d} cm，周界是 ${P} cm。求它的闊。`), ans: w,
            steps: [L(`Let the width be x cm. Length: (x + ${d}) cm`, `設闊為 x cm，長為 (x + ${d}) cm`), `2[${X} + (${X} + ${d})] = ${P}`, `4${X} + ${2 * d} = ${P}`, `4${X} = ${P - 2 * d}`, `${X} = <b>${w}</b>`] }; }
        const k = ri(2, 6), x = ri(2, 15); const add = (k - 1) * x;
        return { kind: 'num', q: B(`If a number is increased by ${add}, it becomes ${k} times the original number. Find the number.`, `某數加 ${add} 後，會變成原數的 ${k} 倍。求該數。`), ans: x,
          steps: [L('Let the number be x.', '設該數為 x。'), `${X} + ${add} = ${k}${X}`, `${add} = ${k}${X} − ${X} = ${k - 1}${X}`, `${X} = <b>${x}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch7', no: 7, color: COLORS[7], title: ['Linear Equations in One Unknown (II)', '一元一次方程（二）'], short: ['Equations II', '方程（二）'],
    intro: ['Harder equations: x on both sides, brackets and fractions, plus word problems.', '較難的方程：兩邊都有 x、有括號、有分數，以及應用題。'],
    lessons, gens,
    keys: [B('Move a term across “=” → change its sign.', '移項過「=」→ 變號。'),
    B('Brackets: multiply the outside number by EVERY term inside.', '去括號：外面的數乘括號內每一項。'),
    B('Fractions: multiply EVERY term by the L.C.M. of the denominators.', '分數：每一項都乘以分母的 L.C.M.。'),
    B('Order: remove fractions → remove brackets → move terms → collect → divide.', '次序：消分數 → 去括號 → 移項 → 合併 → 除。'),
    B('Consecutive numbers: x, x + 1, x + 2. Odd/even: x, x + 2, x + 4.', '連續數：x、x + 1、x + 2；連續單 / 雙數：x、x + 2、x + 4。')],
    traps: [B('✘ 5x − 3 = 2x + 9 → 5x + 2x = 9 − 3 &nbsp; ✔ 5x − 2x = 9 + 3', '✘ 5x − 3 = 2x + 9 → 5x + 2x = 9 − 3 &nbsp; ✔ 5x − 2x = 9 + 3'),
    B('✘ −2(x − 3) = −2x − 6 &nbsp; ✔ −2x + 6', '✘ −2(x − 3) = −2x − 6 &nbsp; ✔ −2x + 6'),
    B(`✘ ${fr('x', 3)} + 2 = 5 → x + 2 = 15 &nbsp; ✔ x + 6 = 15 (multiply EVERY term)`, `✘ ${fr('x', 3)} + 2 = 5 → x + 2 = 15 &nbsp; ✔ x + 6 = 15（每一項都要乘）`),
    B(`✘ ${fr('x + 1', 2)} × 6 = 3x + 1 &nbsp; ✔ 3(x + 1) = 3x + 3 (keep the bracket)`, `✘ ${fr('x + 1', 2)} × 6 = 3x + 1 &nbsp; ✔ 3(x + 1) = 3x + 3（保留括號）`)],
    cheat: [`${L('Move across “=” → change sign', '移項過「=」→ 變號')}`, `−2(x − 3) = −2x + 6`, `${L('Fractions: × L.C.M. to EVERY term', '分數：每項 × L.C.M.')}`, `${L('Consecutive', '連續數')}: x, x + 1, x + 2`]
  });
})();
