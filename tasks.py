from pathlib import Path
from mako.template import Template
from mako.lookup import TemplateLookup
from plim import preprocessor
from flask import Flask, send_from_directory
from invoke import task


app = Flask(__name__)
lookup = TemplateLookup(
    directories=['site'],
    preprocessor=preprocessor)
site = Path(__file__).parent / 'site'


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    filepath = site / path

    if filepath.is_dir():
        index_path = filepath / 'index.plim'
        if index_path.exists():
            return render(index_path.relative_to(site))

    if filepath.exists():
        return send_from_directory(str(site), path)

    return 'oops'


def render(tmpl_file, **kwargs):
    if not isinstance(tmpl_file, str):
        tmpl_file = str(tmpl_file)
    tmpl = lookup.get_template(tmpl_file)
    return tmpl.render(**kwargs)


@task
def serve(ctx):
    app.run(debug=True, port=8000)


@task
def build(ctx):
    clean(ctx)
    for src in Path('site').rglob('*?.*'):
        dest = Path('build') / src.relative_to('site')
        dest2 = copy_or_generate(src, dest)
        if dest2:
            print(dest2)


@task
def clean(ctx):
    if Path('build').is_dir():
        ctx.run('rm -rf build/*')


@task
def serve_build(ctx):
    ctx.run('cd build; python -m http.server', pty=True)


@task
def publish(ctx):
    build(ctx)
    ctx.run('ghp-import -n -p -b master build')


def copy_or_generate(src, dest):
    import shutil
    if not dest.exists():
        dest.parent.mkdir(parents=True, exist_ok=True)

    if src.suffix == '.plim':
        if src.name.startswith('_'):
            return None
        dest_html = dest.with_suffix('.html')
        with dest_html.open('w') as fp:
            html = render(str(src.relative_to('site')))
            fp.write(html)
        return dest_html
    else:
        shutil.copy(str(src), str(dest))
        return dest
