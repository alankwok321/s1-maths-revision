import pathlib
d = pathlib.Path(__file__).parent / 'src'
shell = (d / 'shell.html').read_text()
css = (d / 'style.css').read_text()
js = '\n'.join((d / f).read_text() for f in ['kx.js', 'core.js', 'charts.js', 'ch1.js', 'ch2.js', 'ch3.js', 'ch4.js', 'ch6.js', 'ch7.js', 'ch8.js', 'final.js'])
shell = shell.replace('/*KATEXCSS*/', (d / 'katex-inline.css').read_text()).replace('/*KATEXJS*/', (d / 'katex.min.js').read_text())
out = shell.replace('/*CSS*/', css).replace('/*JS*/', js)
(d.parent / 'index.html').write_text(out)
print(len(out))
