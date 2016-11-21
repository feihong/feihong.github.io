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
