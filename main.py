"""
EduDesign UK — local dev server.

The site is a static multi-page site (index.html + /policies + /static
assets + robots.txt + sitemap.xml) so it can be hosted anywhere,
including Vercel as a static deployment. This small Flask app serves
those same files locally for development/preview.
"""
import os
from flask import Flask, send_from_directory

ROOT = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder="static", static_url_path="/static")


@app.route("/")
def home():
    return send_from_directory(ROOT, "index.html")


@app.route("/<path:path>")
def any_file(path):
    full = os.path.join(ROOT, path)
    if os.path.isfile(full):
        return send_from_directory(ROOT, path)
    return send_from_directory(ROOT, "index.html")  # fallback


if __name__ == "__main__":
    app.run(debug=True)
