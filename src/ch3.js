/* ================= Chapter 3 Algebraic Expressions ================= */
(function () {
  const seqAnim = {
    title: L('Square numbers and triangular numbers', '平方數和三角形數'), minH: 300,
    setup(stage) {
      const s = svgRoot(stage, 560, 300); const st = { sq: [], tr: [] };
      S('text', { x: 6, y: 20, 'font-size': 14, 'font-weight': 800, fill: '#7c3aed', text: 'Square numbers 平方數' }, s);
      S('text', { x: 6, y: 170, 'font-size': 14, 'font-weight': 800, fill: '#0d9488', text: 'Triangular numbers 三角形數' }, s);
      let x0 = 20;
      for (let k = 1; k <= 4; k++) {
        const g = S('g', { opacity: 0, class: 'tr' }, s);
        for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) S('circle', { cx: x0 + j * 16, cy: 40 + i * 16, r: 6, fill: '#8b5cf6' }, g);
        S('text', { x: x0 + (k - 1) * 8, y: 40 + k * 16 + 14, 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 900, text: k * k }, g);
        st.sq.push(g);
        const g2 = S('g', { opacity: 0, class: 'tr' }, s);
        for (let i = 0; i < k; i++) for (let j = 0; j <= i; j++) S('circle', { cx: x0 + (k - 1 - i) * 8 + j * 16, cy: 190 + i * 16, r: 6, fill: '#14b8a6' }, g2);
        S('text', { x: x0 + (k - 1) * 8, y: 190 + k * 16 + 14, 'text-anchor': 'middle', 'font-size': 16, 'font-weight': 900, text: k * (k + 1) / 2 }, g2);
        st.tr.push(g2);
        x0 += k * 16 + 50;
      }
      return st;
    },
    frames: [
      { c: ['Dot patterns.', '點圖形。'], f() { } },
      ...[1, 2, 3, 4].map(k => ({ c: [`Square: ${k} × ${k} = ${k * k} dots`, `正方形：${k} × ${k} = ${k * k} 點`], d: 2000, f(st) { st.sq[k - 1].setAttribute('opacity', 1); } })),
      { c: ['Square numbers: 1, 4, 9, 16, … The n-th term is n².', '平方數：1, 4, 9, 16, …，第 n 項是 n²。'], f() { } },
      ...[1, 2, 3, 4].map(k => ({ c: [`Triangle: add a new row of ${k} → ${k * (k + 1) / 2} dots`, `三角形：加一行 ${k} 點 → ${k * (k + 1) / 2} 點`], d: 2000, f(st) { st.tr[k - 1].setAttribute('opacity', 1); } })),
      { c: ['Triangular numbers: 1, 3, 6, 10, … (add 2, add 3, add 4, …)', '三角形數：1, 3, 6, 10, …（加 2、加 3、加 4、…）'], f() { } }
    ]
  };

  const lessons = [
    {
      t: ['From words to algebra', '由文字到代數式'],
      body: `<table class="t"><tr><th>${L('Words', '文字')}</th><th>${L('Symbol', '符號')}</th></tr>
      <tr><td>${L('add, sum, more than, increase by', '加、和、多於、增加')}</td><td><b>+</b></td></tr>
      <tr><td>${L('subtract, difference, less than, decrease by', '減、差、少於、減少')}</td><td><b>−</b></td></tr>
      <tr><td>${L('times, product, multiply, twice (×2)', '乘、積、倍')}</td><td><b>×</b></td></tr>
      <tr><td>${L('divide, quotient, half (÷2)', '除、商、一半')}</td><td><b>÷</b></td></tr></table>` +
        box('rule', L('How to write algebra', '代數的寫法'), ul([`3 × ${v('x')} = 3${v('x')} &nbsp; ${L('(number in front, no × sign)', '（數字放前面，不寫 ×）')}`, `1${v('x')} = ${v('x')} &nbsp; ${v('a')} × ${v('b')} = ${v('ab')}`, `${v('x')} ÷ 7${v('y')} = ${fr(v('x'), '7' + v('y'))}`])),
      anim: W(L('Example: “Subtract 5 from 3 times x”', '例題：「x 的 3 倍減去 5」'), [
        { h: 'Subtract 5 from <span class="hl">3 times x</span>', c: ['Find the small parts first. “3 times x” = 3x', '先找小部分：「x 的 3 倍」= 3x'] },
        { h: '<span class="hl2">Subtract 5 from</span> 3' + v('x'), r: 1, c: ['“Subtract 5 FROM something” means: something − 5', '「從某數減去 5」即是：某數 − 5'] },
        { h: '<b class="green">3' + v('x') + ' − 5</b>', c: ['Answer: 3x − 5 (NOT 5 − 3x)', '答案：3x − 5（不是 5 − 3x）'] },
        { h: '“5 less than ' + v('y') + '” = <b class="green">' + v('y') + ' − 5</b>', c: ['Same idea: “5 less than y” = y − 5', '同樣：「比 y 少 5」= y − 5'] }
      ])
    },
    {
      t: ['Index notation', '指數記數法'],
      body: ul([B(`a × a × a = a<sup>3</sup>. ${T('base', '底')} = a, ${T('index', '指數')} = 3`, `a × a × a = a<sup>3</sup>，底 = a，指數 = 3`), B('The index tells you how many times to multiply.', '指數表示乘多少次。'), B('a<sup>2</sup> is read “a squared”, a<sup>3</sup> is “a cubed”.', 'a<sup>2</sup> 讀作「a 的平方」，a<sup>3</sup> 讀作「a 的立方」。')]),
      anim: W(L('Writing in index notation', '用指數記數法表示'), [
        { h: '2 × 2 × 2 × 2', c: ['Count how many 2s: 4', '數一數有多少個 2：4 個'] },
        { h: '2<sup class="hl">4</sup> = 16', eq: 1, c: ['= 2⁴ = 16', '= 2⁴ = 16'] },
        { h: `${v('a')} × ${v('a')} × ${v('b')} × ${v('b')} × ${v('b')}`, c: ['Group the same letters together.', '把相同的字母放在一起。'] },
        { h: `${v('a')}<sup class="hl">2</sup>${v('b')}<sup class="hl2">3</sup>`, eq: 1, c: ['two a’s → a², three b’s → b³', '兩個 a → a²，三個 b → b³'] },
        { h: `3<sup>2</sup> = 3 × 3 = <b class="green">9</b> &nbsp; <span class="red">✘ not 3 × 2 = 6</span>`, c: ['Careful! 3² means 3 × 3, not 3 × 2.', '小心！3² 是 3 × 3，不是 3 × 2。'] }
      ])
    },
    {
      t: ['Method of substitution', '代入法'],
      body: ul([B('Replace each letter with its number.', '把每個字母換成它的數值。'), B('<b>Put negative numbers in brackets!</b>', '<b>負數要加括號！</b>'), B('Then follow the order of operations.', '然後按運算次序計算。')]),
      anim: W(L(`Find 2x² − 3y when x = −2, y = 4`, `當 x = −2，y = 4 時，求 2x² − 3y`), [
        { h: `2${v('x')}<sup>2</sup> − 3${v('y')}`, c: ['Write down the expression.', '先寫出代數式。'] },
        { h: `2<span class="hl">( &nbsp; )</span><sup>2</sup> − 3<span class="hl2">( &nbsp; )</span>`, eq: 1, c: ['Change each letter into an empty bracket.', '把每個字母變成一個空括號。'] },
        { h: `2<span class="hl">(−2)</span><sup>2</sup> − 3<span class="hl2">(4)</span>`, r: 1, eq: 1, c: ['Put the numbers in the brackets.', '把數字放入括號。'] },
        { h: '2(4) − 12', eq: 1, c: ['(−2)² = (−2) × (−2) = 4 ; 3 × 4 = 12', '(−2)² = (−2) × (−2) = 4；3 × 4 = 12'] },
        { h: '8 − 12', eq: 1, c: ['2 × 4 = 8', '2 × 4 = 8'] },
        { h: '<b class="red">−4</b>', eq: 1, c: ['Answer −4', '答案 −4'] }
      ])
    },
    {
      t: ['Sequences', '數列'],
      body: ul([B(`A ${T('sequence', '數列')} is a list of numbers in a pattern. Each number is a ${T('term', '項')}.`, '數列是一列有規律的數，每個數叫做一項。'),
      B(`The ${T('general term', '通項')} a<sub>n</sub> is a rule to find the n-th term.`, '通項 a<sub>n</sub> 是求第 n 項的規則。'),
      B('If a<sub>n</sub> = 3n + 2, then a<sub>5</sub> = 3(5) + 2 = 17. Just put n = 5!', '若 a<sub>n</sub> = 3n + 2，則 a<sub>5</sub> = 3(5) + 2 = 17。把 n = 5 代入就可以！')]),
      anim: [seqAnim, W(L('Finding the general term (same difference)', '求通項（相同的差）'), [
        { h: '2, &nbsp;5, &nbsp;8, &nbsp;11, …', c: ['Look at the difference between terms.', '看看相鄰兩項的差。'] },
        { h: '2 <span class="org">→+3→</span> 5 <span class="org">→+3→</span> 8 <span class="org">→+3→</span> 11', c: ['Always +3. So the rule starts with 3n.', '每次都 +3，所以規則以 3n 開始。'] },
        { h: '3n: &nbsp; 3, &nbsp;6, &nbsp;9, &nbsp;12', c: ['3n gives 3, 6, 9, 12. Each is 1 too big.', '3n 得 3, 6, 9, 12，每個都多了 1。'] },
        { h: `a<sub>n</sub> = <b class="green">3n − 1</b>`, c: ['So aₙ = 3n − 1. Check: n = 1 → 3 − 1 = 2 ✔', '所以 aₙ = 3n − 1。驗算：n = 1 → 3 − 1 = 2 ✔'] }
      ])]
    }
  ];

  /* ---------- generators ---------- */
  const X = v('x'), Y = v('y');
  const gens = [
    {
      id: 'words', name: ['Words → expression', '文字 → 代數式'], gen() {
        const a = ri(2, 9), b = ri(2, 12); const t = ri(0, 6);
        const T6 = [
          [`Add ${b} to ${a} times x`, `x 的 ${a} 倍加 ${b}`, `${a}${X} + ${b}`, [`${a}(${X} + ${b})`, `${b}${X} + ${a}`, `${a}${X} − ${b}`]],
          [`Subtract ${b} from ${a} times x`, `x 的 ${a} 倍減去 ${b}`, `${a}${X} − ${b}`, [`${b} − ${a}${X}`, `${a}(${X} − ${b})`, `${a}${X} + ${b}`]],
          [`Divide x by ${a}y`, `x 除以 ${a}y`, fr(X, a + Y), [fr(a + Y, X), `${a}${X}${Y}`, `${X} − ${a}${Y}`]],
          [`The sum of x and y, multiplied by ${a}`, `x 與 y 的和乘以 ${a}`, `${a}(${X} + ${Y})`, [`${a}${X} + ${Y}`, `${X} + ${a}${Y}`, `${a}${X}${Y}`]],
          [`Add ${b} to the square of x`, `x 的平方加 ${b}`, `${X}<sup>2</sup> + ${b}`, [`2${X} + ${b}`, `(${X} + ${b})<sup>2</sup>`, `${b}${X}<sup>2</sup>`]],
          [`${b} less than half of x`, `比 x 的一半少 ${b}`, `${fr(X, 2)} − ${b}`, [`${b} − ${fr(X, 2)}`, fr(`${X} − ${b}`, 2), `2${X} − ${b}`]],
          [`The product of ${a} and x, divided by y`, `${a} 與 x 的積除以 y`, fr(a + X, Y), [fr(Y, a + X), `${a}${X} − ${Y}`, `${a}${X}${Y}`]]
        ][t];
        return { kind: 'mc', q: L('Express in an algebraic expression:', '以代數式表示：') + `<span class="big">${L('“' + T6[0] + '”', '「' + T6[1] + '」')}</span>`, choices: [T6[2], ...T6[3]], steps: [L('Find the small part first, then the big part.', '先找出小部分，再處理大部分。'), `${L('Answer', '答案')}: <b>${T6[2]}</b>`], hint: L('“Subtract A from B” = B − A. “A less than B” = B − A.', '「從 B 減去 A」= B − A；「比 B 少 A」= B − A。') };
      }
    },
    {
      id: 'story', name: ['Algebra in real life', '生活中的代數'], gen() {
        const a = ri(2, 6), b = ri(2, 6), k = ri(3, 9); const t = ri(0, 4); const m = v('m'), w = v('w'), l = v('l'), p = v('p'), nn = v('n');
        const Q = [
          [`A pen costs $x and a book costs $y. Find the total cost of ${a} pens and ${b} books.`, `每枝筆 $x，每本書 $y。求 ${a} 枝筆和 ${b} 本書的總價。`, `$(${a}${X} + ${b}${Y})`, [`$${a + b}${X}${Y}`, `$(${a}${Y} + ${b}${X})`, `$${a * b}${X}${Y}`], [`${a} pens: ${a}x ; ${b} books: ${b}y`, `${a} 枝筆：${a}x；${b} 本書：${b}y`]],
          [`Mandy has $m in her piggy bank. She puts in $${k} every week. How much does she have after w weeks?`, `Mandy 的錢箱有 $m，她每星期放入 $${k}。w 星期後她有多少錢？`, `$(${m} + ${k}${w})`, [`$${k}(${m} + ${w})`, `$(${m}${w} + ${k})`, `$(${m} − ${k}${w})`], [`Each week +${k}, for w weeks: ${k}w`, `每星期 +${k}，共 w 星期：${k}w`]],
          ['A rectangle has length l cm and width w cm. Find its perimeter.', '長方形的長是 l cm，闊是 w cm。求它的周界。', `(2${l} + 2${w}) cm`, [`${l}${w} cm`, `(${l} + ${w}) cm`, `2${l}${w} cm`], ['Perimeter = l + w + l + w', '周界 = l + w + l + w']],
          [`Tom is x years old. His father is ${b} years older than ${a} times Tom’s age. How old is his father?`, `Tom 現年 x 歲。他父親的年齡比 Tom 年齡的 ${a} 倍多 ${b} 歲。父親現年多少歲？`, `(${a}${X} + ${b})`, [`${a}(${X} + ${b})`, `(${b}${X} + ${a})`, `(${a}${X} − ${b})`], [`${a} times Tom’s age: ${a}x; ${b} years older: + ${b}`, `Tom 年齡的 ${a} 倍：${a}x；多 ${b} 歲：+ ${b}`]],
          [`$p is shared equally among n children. Then each child spends $${k}. How much does each child have left?`, `$p 平均分給 n 個小孩，然後每人用了 $${k}。每人剩下多少錢？`, `$(${fr(p, nn)} − ${k})`, [`$${fr(`${p} − ${k}`, nn)}`, `$(${p}${nn} − ${k})`, `$(${fr(nn, p)} − ${k})`], ['Each gets p ÷ n, then − ' + k, `每人得 p ÷ n，然後 − ${k}`]]
        ][t];
        return { kind: 'mc', q: B(Q[0], Q[1]), choices: [Q[2], ...Q[3]], steps: [L(Q[4][0], Q[4][1]), `${L('Answer', '答案')}: <b>${Q[2]}</b>`] };
      }
    },
    {
      id: 'index', name: ['Index notation', '指數記數法'], gen() {
        const t = ri(0, 2);
        if (t === 0) { const p = ri(2, 4), q = ri(1, 4); const ls = shuffle([...Array(p).fill('a'), ...Array(q).fill('b')]).map(v).join(' × ');
          const right = `${v('a')}${p > 1 ? `<sup>${p}</sup>` : ''}${v('b')}${q > 1 ? `<sup>${q}</sup>` : ''}`;
          return { kind: 'mc', q: L('Express in index notation:', '用指數記數法表示：') + `<span class="big">${ls}</span>`, choices: [right, `${p}${v('a')}${q}${v('b')}`, `${v('a')}<sup>${p + q}</sup>`, `(${v('ab')})<sup>${p + q}</sup>`, `${v('a')}<sup>${q}</sup>${v('b')}<sup>${p}</sup>`], steps: [L(`Count: ${p} a’s and ${q} b’s`, `數一數：${p} 個 a，${q} 個 b`), `= <b>${right}</b>`], hint: L('Count how many of each letter.', '數一數每個字母有多少個。') }; }
        if (t === 1) { const c = ri(2, 5), d = ri(2, 4), p = ri(2, 3); const ls = [c, ...Array(p).fill(v('x')), d, v('y')]; const prod = c * d; const right = `${prod}${v('x')}<sup>${p}</sup>${v('y')}`;
          return { kind: 'mc', q: L('Simplify and express in index notation:', '化簡並用指數記數法表示：') + `<span class="big">${ls.join(' × ')}</span>`, choices: [right, `${c + d}${v('x')}<sup>${p}</sup>${v('y')}`, `${prod}${v('x')}${p}${v('y')}`, `${prod}${v('x')}<sup>${p + 1}</sup>`], steps: [L(`Numbers: ${c} × ${d} = ${prod}`, `數字：${c} × ${d} = ${prod}`), L(`Letters: ${p} x’s → x<sup>${p}</sup>, one y`, `字母：${p} 個 x → x<sup>${p}</sup>，一個 y`), `= <b>${right}</b>`], hint: L('Multiply the numbers, then count the letters.', '先把數字相乘，再數字母。') }; }
        const b = pick([2, 3, 4, 5, -2, -3]), e = b > 3 ? 2 : ri(2, b < 0 ? 3 : 4); const ans = b ** e;
        return { kind: 'num', q: L('Evaluate', '計算') + `<span class="big">${nb(b)}<sup>${e}</sup></span>`, ans, steps: [`${nb(b)}<sup>${e}</sup> = ${Array(e).fill(nb(b)).join(' × ')}`, `= <b>${n(ans)}</b>`], hint: L(`Multiply ${n(b)} by itself ${e} times.`, `把 ${n(b)} 自乘 ${e} 次。`) };
      }
    },
    {
      id: 'subst', name: ['Substitution', '代入法'], gen() {
        const x = nz(-5, 6), y = nz(-5, 6), a = ri(2, 6), b = ri(2, 6); const t = ri(0, 5); let e, ans, s;
        const E = [
          [`${a}${X} + ${b}${Y}`, a * x + b * y, `${a}${pb(x)} + ${b}${pb(y)} = ${n(a * x)} + ${nb(b * y)}`],
          [`${a}${X}<sup>2</sup> − ${b}`, a * x * x - b, `${a}${pb(x)}<sup>2</sup> − ${b} = ${a}(${x * x}) − ${b}`],
          [`${a}(${X} − ${Y})`, a * (x - y), `${a}[${nb(x)} − ${nb(y)}] = ${a}(${n(x - y)})`],
          [`${X}<sup>2</sup> + ${Y}<sup>2</sup>`, x * x + y * y, `${nb(x)}<sup>2</sup> + ${nb(y)}<sup>2</sup> = ${x * x} + ${y * y}`],
          [`${X}${Y} − ${a}`, x * y - a, `${nb(x)}${pb(y)} − ${a} = ${n(x * y)} − ${a}`],
          [`${a}${X} − ${Y}<sup>2</sup>`, a * x - y * y, `${a}${pb(x)} − ${nb(y)}<sup>2</sup> = ${n(a * x)} − ${y * y}`]
        ][t];
        return { kind: 'num', q: L(`Find the value of the expression when x = ${n(x)} and y = ${n(y)}.`, `當 x = ${n(x)}，y = ${n(y)} 時，求代數式的值。`) + `<span class="big">${E[0]}</span>`, ans: E[1], steps: [L('Replace the letters with the numbers (use brackets!)', '把字母換成數字（記得加括號！）'), E[2], `= <b>${n(E[1])}</b>`], hint: L('Negative numbers go in brackets: (−3)² = 9', '負數要加括號：(−3)² = 9') };
      }
    },
    {
      id: 'formula', name: ['Formulas', '公式'], gen() {
        const t = ri(0, 4);
        if (t === 0) { const a = ri(2, 10), b = ri(a + 1, 16), h = ri(2, 10) * 2 / (((a + b) % 2) ? 2 : 1) ; const hh = (a + b) % 2 ? ri(1, 5) * 2 : ri(2, 10); const A = (a + b) * hh / 2;
          return { kind: 'num', q: B(`The area of a trapezium is A = ${fr(1, 2)}(a + b)h. Find A when a = ${a}, b = ${b} and h = ${hh}.`, `梯形面積 A = ${fr(1, 2)}(a + b)h。當 a = ${a}，b = ${b}，h = ${hh} 時，求 A。`), pre: 'A =', ans: A, steps: [`A = ${fr(1, 2)}(${a} + ${b})(${hh})`, `= ${fr(1, 2)}(${a + b})(${hh})`, `= <b>${A}</b>`] }; }
        if (t === 1) { const u = ri(0, 20), a = nz(-4, 6), tt = ri(2, 10); const V = u + a * tt;
          return { kind: 'num', q: B(`Given v = u + at. Find v when u = ${u}, a = ${n(a)} and t = ${tt}.`, `已知 v = u + at。當 u = ${u}，a = ${n(a)}，t = ${tt} 時，求 v。`), pre: 'v =', ans: V, steps: [`v = ${u} + ${nb(a)}(${tt})`, `= ${u} + ${nb(a * tt)}`, `= <b>${n(V)}</b>`] }; }
        if (t === 2) { const C = pick([-10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 100]); const Fv = 9 * C / 5 + 32;
          return { kind: 'num', q: B(`The formula F = ${fr(9, 5)}C + 32 changes °C into °F. Find F when C = ${n(C)}.`, `公式 F = ${fr(9, 5)}C + 32 把 °C 轉為 °F。當 C = ${n(C)} 時，求 F。`), pre: 'F =', ans: Fv, steps: [`F = ${fr(9, 5)}${pb(C)} + 32`, `= ${n(9 * C / 5)} + 32`, `= <b>${n(Fv)}</b>`] }; }
        if (t === 3) { const l = ri(3, 20), w = ri(2, 15); return { kind: 'num', q: B(`The perimeter of a rectangle is P = 2(l + w). Find P when l = ${l} and w = ${w}.`, `長方形周界 P = 2(l + w)。當 l = ${l}，w = ${w} 時，求 P。`), pre: 'P =', ans: 2 * (l + w), steps: [`P = 2(${l} + ${w})`, `= 2(${l + w})`, `= <b>${2 * (l + w)}</b>`] }; }
        const nn = ri(100, 900), c = ri(2, 8), f = ri(200, 800); return { kind: 'num', pre: 'C = $', q: B(`The cost of printing n leaflets is $C, where C = ${c}n + ${f}. Find C when n = ${nn}.`, `印製 n 張傳單的費用是 $C，其中 C = ${c}n + ${f}。當 n = ${nn} 時，求 C。`), ans: c * nn + f, steps: [`C = ${c}(${nn}) + ${f}`, `= ${c * nn} + ${f}`, `= <b>${c * nn + f}</b>`] };
      }
    },
    {
      id: 'gterm', name: ['General term → a term', '由通項求某項'], gen() {
        const p = nz(-5, 6), q = ri(-10, 10), k = ri(2, 15); const t = ri(0, 2); let e, val, s;
        if (t === 0) { e = lin(p, q, 'n'); val = p * k + q; s = `${p === 1 ? '' : p === -1 ? MI : n(p)}(${k}) ${q < 0 ? MI : '+'} ${Math.abs(q)}`; if (q === 0) s = `${n(p)}(${k})`; }
        else if (t === 1) { e = `n<sup>2</sup> ${q < 0 ? MI : '+'} ${Math.abs(q)}`; val = k * k + q; s = `(${k})<sup>2</sup> ${q < 0 ? MI : '+'} ${Math.abs(q)}`; }
        else { const m = ri(2, 4); e = `${m}n<sup>2</sup>`; val = m * k * k; s = `${m}(${k})<sup>2</sup> = ${m}(${k * k})`; }
        e = e.replace(/<i class="v">n<\/i>/g, 'n');
        return { kind: 'num', q: L(`The general term of a sequence is a<sub>n</sub> = ${e}. Find a<sub>${k}</sub>.`, `數列的通項是 a<sub>n</sub> = ${e}。求 a<sub>${k}</sub>。`), pre: `a<sub>${k}</sub> =`, ans: val, steps: [L(`Put n = ${k}`, `代入 n = ${k}`) + `: a<sub>${k}</sub> = ${s}`, `= <b>${n(val)}</b>`], hint: L(`Replace n with ${k}.`, `把 n 換成 ${k}。`) };
      }
    },
    {
      id: 'next', name: ['Next term of a sequence', '數列的下一項'], gen() {
        const t = ri(0, 5); let seq, ans, why;
        if (t === 0 || t === 1) { const a = ri(-10, 20), d = t === 0 ? ri(2, 9) : -ri(2, 7); seq = [0, 1, 2, 3, 4].map(i => a + i * d); ans = a + 5 * d; why = [`Each time ${d > 0 ? '+' : MI}${Math.abs(d)}`, `每次 ${d > 0 ? '+' : MI}${Math.abs(d)}`]; }
        if (t === 2) { const a = ri(1, 5), r = pick([2, 3]); seq = [0, 1, 2, 3].map(i => a * r ** i); ans = a * r ** 4; why = [`Each time × ${r}`, `每次 × ${r}`]; }
        if (t === 3) { const s0 = ri(1, 3); seq = [0, 1, 2, 3, 4].map(i => (s0 + i) ** 2); ans = (s0 + 5) ** 2; why = ['Square numbers: ' + seq.map((x, i) => `${s0 + i}²`).join(', '), '平方數：' + seq.map((x, i) => `${s0 + i}²`).join('、')]; }
        if (t === 4) { seq = [1, 3, 6, 10, 15]; ans = 21; why = ['Triangular numbers: +2, +3, +4, +5, then +6', '三角形數：+2、+3、+4、+5，然後 +6']; }
        if (t === 5) { const a = ri(1, 3) * 2 - 1; seq = [0, 1, 2, 3, 4].map(i => a + 2 * i); ans = a + 10; why = ['Odd numbers: each time +2', '單數：每次 +2']; }
        return { kind: 'num', q: L('Find the next term of the sequence.', '求數列的下一項。') + `<span class="big">${seq.map(n).join(', ')}, ___</span>`, ans, steps: [L(why[0], why[1]), `${L('Next term', '下一項')} = <b>${n(ans)}</b>`], hint: L('Look at how each term changes.', '看看每一項怎樣改變。') };
      }
    },
    {
      id: 'findgt', name: ['Find the general term', '求通項'], gen() {
        const d = nz(-4, 6), a = ri(-5, 12); const c = a - d; const seq = [0, 1, 2, 3].map(i => a + i * d);
        const ln = (p, q) => p === 0 ? n(q) : `${p === 1 ? '' : p === -1 ? MI : n(p)}n${q ? (q < 0 ? ' ' + MI + ' ' : ' + ') + Math.abs(q) : ''}`;
        const right = ln(d, c), w1 = ln(1, d), w2 = ln(d, a), w3 = ln(a, d);
        return { kind: 'mc', q: L('Find the general term a<sub>n</sub> of the sequence:', '求數列的通項 a<sub>n</sub>：') + `<span class="big">${seq.map(n).join(', ')}, …</span>`, choices: [right, w1, w2, w3].map(x => 'a<sub>n</sub> = ' + x),
          steps: [L(`Difference = ${n(d)}, so start with ${ln(d, 0)}`, `每項相差 ${n(d)}，所以由 ${ln(d, 0)} 開始`), c === 0 ? L(`When n = 1: ${ln(d, 0)} = ${n(d)}, which is already the first term.`, `當 n = 1：${ln(d, 0)} = ${n(d)}，已經是首項。`) : L(`When n = 1: ${n(d)} × 1 = ${n(d)}. We need ${n(a)}, so ${c > 0 ? 'add' : 'subtract'} ${Math.abs(c)}.`, `當 n = 1：${n(d)} × 1 = ${n(d)}。我們要得 ${n(a)}，所以${c > 0 ? '加' : '減'} ${Math.abs(c)}。`), `a<sub>n</sub> = <b>${right}</b>`], hint: L('The difference goes in front of n.', '相差的數放在 n 前面。') };
      }
    },
    {
      id: 'pattern', name: ['Patterns', '圖形規律'], gen() {
        const k = ri(6, 20);
        /* matchstick squares in a row: 4, 7, 10 ... = 3n + 1 */
        let fig = '<svg viewBox="0 0 470 90" width="470" style="max-width:100%;font-family:Nunito">'; let x = 10;
        for (let p = 1; p <= 3; p++) { for (let i = 0; i < p; i++) fig += `<rect x="${x + i * 30}" y="15" width="30" height="30" fill="none" stroke="#b45309" stroke-width="4"/>`; fig += `<text x="${x + p * 15}" y="75" text-anchor="middle" font-size="13">Pattern ${p} 圖形 ${p}</text>`; x += p * 30 + 60; }
        fig += '</svg>';
        return { kind: 'num', q: B(`Matchsticks are used to make the patterns below. Pattern 1 uses 4, Pattern 2 uses 7, Pattern 3 uses 10. How many matchsticks are needed for Pattern ${k}?`, `用火柴砌出下列圖形。圖形 1 用了 4 枝，圖形 2 用了 7 枝，圖形 3 用了 10 枝。圖形 ${k} 需要多少枝火柴？`), fig, ans: 3 * k + 1,
          steps: [L('4, 7, 10, … each time +3 → start with 3n', '4, 7, 10, …，每次 +3 → 由 3n 開始'), L('n = 1: 3(1) = 3, we need 4 → +1. So a<sub>n</sub> = 3n + 1', 'n = 1：3(1) = 3，要得 4 → +1。所以 a<sub>n</sub> = 3n + 1'), `a<sub>${k}</sub> = 3(${k}) + 1 = <b>${3 * k + 1}</b>`], hint: L('Find the general term first.', '先求通項。') };
      }
    }
  ];

  CH.push({
    id: 'ch3', no: 3, color: COLORS[3], title: ['Algebraic Expressions', '代數式'], short: ['Algebra', '代數式'],
    intro: ['Algebra uses letters to stand for numbers. In this chapter: writing expressions, index notation, substitution and sequences.', '代數用字母代表數。本章重點：寫代數式、指數記數法、代入法和數列。'],
    lessons, gens,
    keys: [B('“Subtract A from B” = B − A. “A less than B” = B − A.', '「從 B 減去 A」= B − A；「比 B 少 A」= B − A。'),
    B('Write 3 × x as 3x, and x ÷ y as x/y.', '3 × x 寫成 3x，x ÷ y 寫成 x/y。'),
    B('a<sup>3</sup> = a × a × a (index = how many times).', 'a<sup>3</sup> = a × a × a（指數 = 乘的次數）。'),
    B('Substitution: put negatives in brackets. (−2)² = 4', '代入：負數要加括號。(−2)² = 4'),
    B('Same difference d each time → a<sub>n</sub> = dn + (first term − d).', '每項相差 d → a<sub>n</sub> = dn +（首項 − d）。')],
    traps: [B('✘ 3² = 6 &nbsp; ✔ 3² = 3 × 3 = 9', '✘ 3² = 6 &nbsp; ✔ 3² = 3 × 3 = 9'),
    B('✘ when x = −3, x² = −9 &nbsp; ✔ (−3)² = 9', '✘ 當 x = −3，x² = −9 &nbsp; ✔ (−3)² = 9'),
    B('✘ “5 less than x” = 5 − x &nbsp; ✔ x − 5', '✘「比 x 少 5」= 5 − x &nbsp; ✔ x − 5'),
    B('✘ a + a + a = a³ &nbsp; ✔ a + a + a = 3a, a × a × a = a³', '✘ a + a + a = a³ &nbsp; ✔ a + a + a = 3a，a × a × a = a³')],
    cheat: [`B − A = ${L('subtract A from B / A less than B', '從 B 減去 A / 比 B 少 A')}`, `a × a × a = a<sup>3</sup>; &nbsp; a + a + a = 3a`, `${L('Substitute with brackets', '代入要加括號')}: (−2)<sup>2</sup> = 4`, `a<sub>n</sub> = 3n + 2 → a<sub>5</sub> = 3(5) + 2 = 17`, `${L('Square', '平方數')} 1,4,9,16 · ${L('Triangular', '三角形數')} 1,3,6,10`]
  });
})();
