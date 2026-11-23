/* ================= Chapter 4 Linear Equations in One Unknown (I) ================= */
(function () {
  /* balance scale animation. left: k boxes (x) + a weights; right: c weights */
  function Balance(title, k, a, c) {
    const W = 560, H = 270; const xval = (c - a) / k;
    return {
      title, minH: 290,
      setup(stage) {
        const s = svgRoot(stage, W, H); const st = { s, L: [], R: [], X: [] };
        S('polygon', { points: `${W / 2 - 30},${H - 10} ${W / 2 + 30},${H - 10} ${W / 2},${H - 70}`, fill: '#64748b' }, s);
        S('rect', { x: 40, y: H - 78, width: W - 80, height: 8, rx: 4, fill: '#334155' }, s);
        S('rect', { x: 50, y: H - 90, width: 200, height: 12, rx: 4, fill: '#94a3b8' }, s);
        S('rect', { x: W - 250, y: H - 90, width: 200, height: 12, rx: 4, fill: '#94a3b8' }, s);
        st.eq = S('text', { x: W / 2, y: 26, 'text-anchor': 'middle', 'font-size': 22, 'font-weight': 900, text: '' }, s);
        /* left items: boxes first then weights */
        let idx = 0; const pos = (side, i) => { const col = i % 6, row = Math.floor(i / 6); return [side === 'L' ? 60 + col * 31 : W - 240 + col * 31, H - 118 - row * 31]; };
        for (let i = 0; i < k; i++) { const [x, y] = pos('L', idx++); const g = S('g', { class: 'tr' }, s); S('rect', { x, y, width: 28, height: 28, rx: 4, fill: '#8b5cf6' }, g); S('text', { x: x + 14, y: y + 20, 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 900, fill: '#fff', 'font-style': 'italic', 'font-family': 'Times New Roman', text: 'x' }, g); st.X.push(g); }
        for (let i = 0; i < a; i++) { const [x, y] = pos('L', idx++); const g = S('g', { class: 'tr' }, s); S('circle', { cx: x + 14, cy: y + 14, r: 13, fill: '#f59e0b' }, g); S('text', { x: x + 14, y: y + 19, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 900, fill: '#fff', text: '1' }, g); st.L.push(g); }
        for (let i = 0; i < c; i++) { const [x, y] = pos('R', i); const g = S('g', { class: 'tr' }, s); S('circle', { cx: x + 14, cy: y + 14, r: 13, fill: '#f59e0b' }, g); S('text', { x: x + 14, y: y + 19, 'text-anchor': 'middle', 'font-size': 13, 'font-weight': 900, fill: '#fff', text: '1' }, g); st.R.push(g); }
        st.setEq = h => { st.eq.innerHTML = h; };
        st.setEq(`${k === 1 ? '' : k}x + ${a} = ${c}`);
        return st;
      },
      frames: [
        { c: [`The scale is balanced: left = right. ${k === 1 ? '' : k}x + ${a} = ${c}`, `天秤平衡：左邊 = 右邊。${k === 1 ? '' : k}x + ${a} = ${c}`], f() { } },
        { c: [`Take away ${a} from BOTH sides. It is still balanced.`, `兩邊同時拿走 ${a}，天秤仍然平衡。`], d: 3500, f(st) { st.L.forEach(g => { g.style.opacity = 0; g.style.transform = 'translateY(-60px)'; }); st.R.slice(c - a).forEach(g => { g.style.opacity = 0; g.style.transform = 'translateY(-60px)'; }); st.setEq(`${k === 1 ? '' : k}x = ${c} − ${a} = ${c - a}`); } },
        ...(k > 1 ? [{ c: [`${k} boxes = ${c - a}. Share into ${k} equal groups (÷ ${k} on both sides).`, `${k} 個盒 = ${c - a}。平均分成 ${k} 份（兩邊同時 ÷ ${k}）。`], d: 3500, f(st) { st.X.slice(1).forEach(g => { g.style.opacity = .15; }); st.R.slice(xval, c - a).forEach(g => { g.style.opacity = .15; }); st.setEq(`x = ${c - a} ÷ ${k}`); } }] : []),
        { c: [`So x = ${xval}. Check: ${k === 1 ? '' : k + ' × '}${xval} + ${a} = ${c} ✔`, `所以 x = ${xval}。驗算：${k === 1 ? '' : k + ' × '}${xval} + ${a} = ${c} ✔`], f(st) { st.setEq(`<tspan fill="#16a34a">x = ${xval}</tspan>`); } }
      ]
    };
  }

  const lessons = [
    {
      t: ['Equations and solutions', '方程及解'],
      body: ul([B(`An ${T('equation', '方程')} has an “=” sign. e.g. 2x + 1 = 7`, '方程有「=」號，例如 2x + 1 = 7。'),
      B(`The ${T('solution', '解')} (or ${T('root', '根')}) is the value of x that makes both sides equal.`, '能令兩邊相等的 x 值叫做方程的解（或根）。'),
      B('Check: substitute into L.H.S. and R.H.S. Equal?', '驗算：代入左方和右方，是否相等？')]),
      anim: W(L('Is x = 3 a solution of 2x + 1 = 7?', 'x = 3 是不是 2x + 1 = 7 的解？'), [
        { h: 'L.H.S. = 2' + v('x') + ' + 1', c: ['Work out the left side first.', '先計算左方。'] },
        { h: '2(<span class="hl">3</span>) + 1', eq: 1, c: ['Put x = 3', '代入 x = 3'] },
        { h: '7', eq: 1, c: ['= 6 + 1 = 7', '= 6 + 1 = 7'] },
        { h: 'R.H.S. = 7', c: ['The right side is 7.', '右方是 7。'] },
        { h: '<b class="green">L.H.S. = R.H.S. ✔ x = 3 is a solution.</b>', c: ['They are equal, so x = 3 is a solution!', '兩邊相等，所以 x = 3 是解！'] }
      ])
    },
    {
      t: ['Solving equations: the balance idea', '解方程：天秤的概念'],
      body: box('rule', L('Golden rule', '黃金法則'), B('Whatever you do to one side, do the <b>same</b> to the other side.', '對一邊做甚麼，另一邊也要做<b>同樣</b>的事。') + `<div class="ex" style="margin-top:6px">+ ⇄ − &nbsp;&nbsp; × ⇄ ÷</div>` + B('Use the opposite operation to “undo”.', '用相反的運算把它「抵消」。')),
      anim: [Balance('x + 3 = 7', 1, 3, 7), Balance('3x + 2 = 14', 3, 2, 14)]
    },
    {
      t: ['Solving step by step', '一步一步解方程'],
      body: ul([B('Goal: get <b>x alone</b> on one side.', '目標：令 <b>x 單獨</b>在一邊。'), B('First undo + or −, then undo × or ÷.', '先抵消 + 或 −，再抵消 × 或 ÷。')]),
      anim: [W(L('Example 1', '例題 1'), [
        { h: `5${v('x')} − 7 = 18`, c: ['x is with “− 7” and “× 5”. Undo − 7 first.', 'x 有「− 7」和「× 5」。先抵消 − 7。'] },
        { h: `5${v('x')} − 7 <span class="hl">+ 7</span> = 18 <span class="hl">+ 7</span>`, c: ['Add 7 to both sides.', '兩邊同時 + 7。'] },
        { h: `5${v('x')} = 25`, c: ['Now 5x = 25.', '現在 5x = 25。'] },
        { h: `${fr('5' + v('x'), '<span class="hl">5</span>')} = ${fr(25, '<span class="hl">5</span>')}`, c: ['Divide both sides by 5.', '兩邊同時 ÷ 5。'] },
        { h: `<b class="green">${v('x')} = 5</b>`, c: ['x = 5. Check: 5(5) − 7 = 18 ✔', 'x = 5。驗算：5(5) − 7 = 18 ✔'] }
      ]), W(L('Example 2', '例題 2'), [
        { h: `${fr(v('x'), 3)} + 2 = 6`, c: ['Undo + 2 first.', '先抵消 + 2。'] },
        { h: `${fr(v('x'), 3)} = 6 − 2 = 4`, c: ['Subtract 2 from both sides.', '兩邊同時 − 2。'] },
        { h: `${v('x')} = 4 <span class="hl">× 3</span>`, c: ['x ÷ 3 = 4, so multiply both sides by 3.', 'x ÷ 3 = 4，所以兩邊同時 × 3。'] },
        { h: `<b class="green">${v('x')} = 12</b>`, c: ['x = 12', 'x = 12'] }
      ])]
    },
    {
      t: ['Finding values in formulas', '求公式中變數的值'],
      body: B('Substitute the known values, then solve.', '代入已知數值，然後解方程。'),
      anim: W(L('C = 4n + 650. Find n when C = 2250.', 'C = 4n + 650。當 C = 2250 時，求 n。'), [
        { h: 'C = 4n + 650', c: ['Write the formula.', '寫出公式。'] },
        { h: '<span class="hl">2250</span> = 4n + 650', c: ['Put C = 2250.', '代入 C = 2250。'] },
        { h: '2250 − 650 = 4n', c: ['Subtract 650 from both sides.', '兩邊同時 − 650。'] },
        { h: '1600 = 4n', c: ['1600 = 4n', '1600 = 4n'] },
        { h: '<b class="green">n = 400</b>', c: ['Divide by 4: n = 1600 ÷ 4 = 400', '÷ 4：n = 1600 ÷ 4 = 400'] }
      ])
    },
    {
      t: ['Word problems', '應用題'],
      body: box('rule', L('4 steps', '4 個步驟'), `<ol style="margin:4px 0"><li>${L('<b>Let</b> x be the unknown.', '<b>設</b> x 為未知數。')}</li><li>${L('Write an <b>equation</b>.', '列出<b>方程</b>。')}</li><li>${L('<b>Solve</b> it.', '<b>解</b>方程。')}</li><li>${L('Write the <b>answer</b> in words.', '用文字<b>作答</b>。')}</li></ol>`),
      anim: W(L('A number is multiplied by 3, then 5 is added. The result is 26. Find the number.', '某數乘以 3 再加 5，結果是 26。求該數。'), [
        { h: L('Let x be the number.', '設該數為 x。'), c: ['Step 1: Let x be the number.', '第 1 步：設該數為 x。'] },
        { h: `3${v('x')} + 5 = 26`, c: ['Step 2: “× 3” → 3x, “add 5” → + 5, “is 26” → = 26', '第 2 步：「乘以 3」→ 3x，「加 5」→ + 5，「結果是 26」→ = 26'] },
        { h: `3${v('x')} = 21`, c: ['Step 3: subtract 5 from both sides…', '第 3 步：兩邊 − 5……'] },
        { h: `${v('x')} = 7`, c: ['…then divide by 3.', '……然後 ÷ 3。'] },
        { h: `<b class="green">${L('The number is 7.', '該數是 7。')}</b>`, c: ['Step 4: write the answer.', '第 4 步：作答。'] }
      ])
    }
  ];

  const xs = (k) => k === 1 ? v('x') : k === -1 ? MI + v('x') : n(k) + v('x');
  const gens = [
    {
      id: 'check', name: ['Is it a solution?', '是不是方程的解？'], gen() {
        const a = nz(-6, 7), r = ri(-6, 8), b = ri(-15, 15); const c = a * r + b; const k = Math.random() < .5 ? r : r + pick([-2, -1, 1, 2]); const lhs = a * k + b; const yes = lhs === c;
        const eq = `${lin(a, b)} = ${n(c)}`;
        return { kind: 'mc', keep: 1, q: L(`Is x = ${n(k)} a solution of the equation?`, `x = ${n(k)} 是不是下面方程的解？`) + `<span class="big">${eq}</span>`, choices: yes ? [L('Yes ✔', '是 ✔'), L('No ✘', '不是 ✘')] : [L('No ✘', '不是 ✘'), L('Yes ✔', '是 ✔')],
          steps: [`L.H.S. = ${n(a)}${pb(k)} ${b < 0 ? MI : '+'} ${Math.abs(b)} = ${n(lhs)}`, `R.H.S. = ${n(c)}`, yes ? `<b>L.H.S. = R.H.S.</b> ${L('→ it IS a solution.', '→ 是方程的解。')}` : `<b>L.H.S. ≠ R.H.S.</b> ${L('→ it is NOT a solution.', '→ 不是方程的解。')}`], hint: L('Put the value into the left side.', '把數值代入左方。') };
      }
    },
    {
      id: 'one', name: ['One-step equations', '一步方程'], gen() {
        const t = ri(0, 3); const x = nz(-12, 15); let eq, s;
        if (t === 0) { const a = nz(-15, 15); eq = `${v('x')} ${a < 0 ? MI : '+'} ${Math.abs(a)} = ${n(x + a)}`; s = [L(`${a < 0 ? 'Add' : 'Subtract'} ${Math.abs(a)} on both sides`, `兩邊同時${a < 0 ? '加' : '減'} ${Math.abs(a)}`) + `: ${v('x')} = ${n(x + a)} ${a < 0 ? '+' : MI} ${Math.abs(a)}`]; }
        if (t === 1) { const a = nz(-9, 9); if (a === 1) return null; eq = `${xs(a)} = ${n(a * x)}`; s = [L(`Divide both sides by ${n(a)}`, `兩邊同時除以 ${n(a)}`) + `: ${v('x')} = ${fr(n(a * x), n(a))}`]; }
        if (t === 2) { const a = ri(2, 9); eq = `${fr(v('x'), a)} = ${n(x)}`; s = [L(`Multiply both sides by ${a}`, `兩邊同時乘以 ${a}`) + `: ${v('x')} = ${n(x)} × ${a}`]; return { kind: 'num', pre: v('x') + ' =', q: L('Solve', '解方程') + `<span class="big">${eq}</span>`, ans: x * a, steps: [...s, `${v('x')} = <b>${n(x * a)}</b>`], hint: L('Undo ÷ with ×.', '用 × 抵消 ÷。') }; }
        if (t === 3) { const a = ri(5, 20); eq = `${a} − ${v('x')} = ${n(a - x)}`; s = [L(`Move x to the right and ${n(a - x)} to the left`, `把 x 移到右方，${n(a - x)} 移到左方`) + `: ${a} − ${nb(a - x)} = ${v('x')}`]; }
        return { kind: 'num', pre: v('x') + ' =', q: L('Solve', '解方程') + `<span class="big">${eq}</span>`, ans: x, steps: [...s, `${v('x')} = <b>${n(x)}</b>`], hint: L('Use the opposite operation.', '用相反的運算。') };
      }
    },
    {
      id: 'two', name: ['Two-step equations', '兩步方程'], gen() {
        const x = nz(-10, 12), a = pick([2, 3, 4, 5, 6, 7, 8, -2, -3, -4, -5]), b = nz(-20, 20); const t = ri(0, 2);
        if (t < 2) { const c = a * x + b; const eq = `${lin(a, b)} = ${n(c)}`;
          return { kind: 'num', pre: v('x') + ' =', q: L('Solve', '解方程') + `<span class="big">${eq}</span>`, ans: x, steps: [L(`${b > 0 ? 'Subtract' : 'Add'} ${Math.abs(b)} on both sides`, `兩邊同時${b > 0 ? '減' : '加'} ${Math.abs(b)}`) + `: ${xs(a)} = ${n(c)} ${b > 0 ? MI : '+'} ${Math.abs(b)} = ${n(c - b)}`, L(`Divide both sides by ${n(a)}`, `兩邊同時除以 ${n(a)}`) + `: ${v('x')} = ${fr(n(c - b), n(a))}`, `${v('x')} = <b>${n(x)}</b>`], hint: L('First undo + or −, then undo × or ÷.', '先抵消 + 或 −，再抵消 × 或 ÷。') }; }
        const d = ri(2, 6), X2 = d * nz(-5, 6); const c = X2 / d + b;
        return { kind: 'num', pre: v('x') + ' =', q: L('Solve', '解方程') + `<span class="big">${fr(v('x'), d)} ${b < 0 ? MI : '+'} ${Math.abs(b)} = ${n(c)}</span>`, ans: X2, steps: [L(`${b > 0 ? 'Subtract' : 'Add'} ${Math.abs(b)} on both sides`, `兩邊同時${b > 0 ? '減' : '加'} ${Math.abs(b)}`) + `: ${fr(v('x'), d)} = ${n(c - b)}`, L(`Multiply both sides by ${d}`, `兩邊同時乘以 ${d}`) + `: ${v('x')} = ${n(c - b)} × ${d}`, `${v('x')} = <b>${n(X2)}</b>`], hint: L('Undo + or − first, then × to undo ÷.', '先抵消 + 或 −，再用 × 抵消 ÷。') };
      }
    },
    {
      id: 'formula', name: ['Formulas', '公式'], gen() {
        const t = ri(0, 3);
        if (t === 0) { const c = ri(2, 9), f = ri(2, 9) * 100, nn = ri(5, 60) * 10; const C = c * nn + f;
          return { kind: 'num', pre: 'n =', q: B(`The cost of printing n leaflets is $C, where C = ${c}n + ${f}. If C = ${C}, find n.`, `印製 n 張傳單的費用為 $C，其中 C = ${c}n + ${f}。若 C = ${C}，求 n。`), ans: nn, steps: [`${C} = ${c}n + ${f}`, `${C} − ${f} = ${c}n → ${C - f} = ${c}n`, `n = ${C - f} ÷ ${c} = <b>${nn}</b>`] }; }
        if (t === 1) { const u = ri(0, 20), a = ri(2, 6), tt = ri(2, 12); const vv = u + a * tt;
          return { kind: 'num', pre: 't =', q: B(`Given v = u + at. If v = ${vv}, u = ${u} and a = ${a}, find t.`, `已知 v = u + at。若 v = ${vv}，u = ${u}，a = ${a}，求 t。`), ans: tt, steps: [`${vv} = ${u} + ${a}t`, `${vv} − ${u} = ${a}t → ${vv - u} = ${a}t`, `t = ${vv - u} ÷ ${a} = <b>${tt}</b>`] }; }
        if (t === 2) { const l = ri(5, 25), w = ri(2, 20); const P = 2 * (l + w);
          return { kind: 'num', pre: 'w =', q: B(`The perimeter of a rectangle is P = 2(l + w). If P = ${P} and l = ${l}, find w.`, `長方形周界 P = 2(l + w)。若 P = ${P}，l = ${l}，求 w。`), ans: w, steps: [`${P} = 2(${l} + w)`, L('Divide both sides by 2', '兩邊 ÷ 2') + `: ${P / 2} = ${l} + w`, `w = ${P / 2} − ${l} = <b>${w}</b>`] }; }
        const b = ri(2, 12) * 2, h = ri(2, 15); const A = b * h / 2;
        return { kind: 'num', pre: 'h =', q: B(`The area of a triangle is A = ${fr(1, 2)}bh. If A = ${A} and b = ${b}, find h.`, `三角形面積 A = ${fr(1, 2)}bh。若 A = ${A}，b = ${b}，求 h。`), ans: h, steps: [`${A} = ${fr(1, 2)}(${b})h`, `${A} = ${b / 2}h`, `h = ${A} ÷ ${b / 2} = <b>${h}</b>`] };
      }
    },
    {
      id: 'word', name: ['Word problems', '應用題'], gen() {
        const t = ri(0, 3);
        if (t === 0) { const x = ri(2, 20), a = ri(2, 6), b = ri(1, 15); const sub = Math.random() < .5; const r = sub ? a * x - b : a * x + b;
          return { kind: 'num', q: B(`A number is multiplied by ${a}, then ${b} is ${sub ? 'subtracted' : 'added'}. The result is ${r}. Find the number.`, `某數乘以 ${a}，然後${sub ? '減' : '加'} ${b}，結果是 ${r}。求該數。`), ans: x, steps: [L('Let x be the number.', '設該數為 x。'), `${a}${v('x')} ${sub ? MI : '+'} ${b} = ${r}`, `${a}${v('x')} = ${sub ? r + b : r - b}`, `${v('x')} = <b>${x}</b>`], hint: L('Let x be the number, then write the equation.', '設該數為 x，然後列方程。') }; }
        if (t === 1) { const k = ri(2, 5), x = ri(8, 40), ch = ri(1, 30); const pay = Math.ceil((k * x + ch) / 50) * 50; const change = pay - k * x;
          return { kind: 'num', pre: '$', q: B(`Ann buys ${k} books. Each costs the same. She pays $${pay} and gets $${change} change. Find the price of one book.`, `Ann 買了 ${k} 本價錢相同的書，她付了 $${pay}，找回 $${change}。求每本書的價錢。`), ans: x, steps: [L('Let $x be the price of one book.', '設每本書 $x。'), `${pay} − ${k}${v('x')} = ${change}`, `${k}${v('x')} = ${pay} − ${change} = ${k * x}`, `${v('x')} = <b>${x}</b>`] }; }
        if (t === 2) { const s = ri(3, 25); return { kind: 'num', post: 'cm', q: B(`The perimeter of a square is ${4 * s} cm. Find the length of one side.`, `正方形的周界是 ${4 * s} cm。求邊長。`), ans: s, steps: [L('Let x cm be the side.', '設邊長為 x cm。'), `4${v('x')} = ${4 * s}`, `${v('x')} = <b>${s}</b>`] }; }
        const x = ri(5, 30), k = ri(3, 8), more = ri(2, 30); const tot = k * x + more;
        return { kind: 'num', q: B(`There are ${tot} students. They sit in ${k} buses with the same number of students each, and ${more} students go by car. How many students are in each bus?`, `共有 ${tot} 名學生，其中 ${more} 名乘私家車，其餘平均坐 ${k} 架旅遊巴。每架旅遊巴有多少名學生？`), ans: x, steps: [L('Let x be the number in each bus.', '設每架旅遊巴有 x 名學生。'), `${k}${v('x')} + ${more} = ${tot}`, `${k}${v('x')} = ${tot - more}`, `${v('x')} = <b>${x}</b>`] };
      }
    }
  ];

  CH.push({
    id: 'ch4', no: 4, color: COLORS[4], title: ['Linear Equations in One Unknown (I)', '一元一次方程（一）'], short: ['Equations I', '方程（一）'],
    intro: ['An equation is like a balance. We solve it to find the value of the unknown x.', '方程就像一個天秤。解方程就是求出未知數 x 的值。'],
    lessons, gens,
    keys: [B('Do the same thing to both sides.', '兩邊做同樣的運算。'),
    B('Undo + with −, − with +, × with ÷, ÷ with ×.', '用 − 抵消 +，用 + 抵消 −，用 ÷ 抵消 ×，用 × 抵消 ÷。'),
    B('Undo + / − first, then × / ÷.', '先抵消 + / −，再抵消 × / ÷。'),
    B('Check: put your answer back into the equation.', '驗算：把答案代回方程。'),
    B('Word problems: Let → Equation → Solve → Answer.', '應用題：設 → 列方程 → 解 → 作答。')],
    traps: [B('✘ 3x = 12 → x = 12 − 3 &nbsp; ✔ x = 12 ÷ 3 = 4', '✘ 3x = 12 → x = 12 − 3 &nbsp; ✔ x = 12 ÷ 3 = 4'),
    B('✘ x − 5 = 8 → x = 3 &nbsp; ✔ x = 8 + 5 = 13', '✘ x − 5 = 8 → x = 3 &nbsp; ✔ x = 8 + 5 = 13'),
    B('✘ −2x = 10 → x = 5 &nbsp; ✔ x = 10 ÷ (−2) = −5', '✘ −2x = 10 → x = 5 &nbsp; ✔ x = 10 ÷ (−2) = −5'),
    B('Write “Let x be …” and an answer sentence.', '要寫「設 x 為……」和答句。')],
    cheat: [`${L('Same to both sides', '兩邊做同樣的事')}`, `+ ⇄ −, × ⇄ ÷`, `5x − 7 = 18 → 5x = 25 → x = 5`, `${L('Let → Equation → Solve → Answer', '設 → 列式 → 解 → 作答')}`]
  });
})();
