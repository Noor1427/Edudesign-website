"""
edudesign_uk by Noor — local dev server.

The site itself is a static page (index.html + /static assets) so it can be
hosted anywhere, including Vercel as a static deployment. This tiny Flask app
just serves those same files locally for development/preview.
"""
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder="static", static_url_path="/static")


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


if __name__ == "__main__":
    app.run(debug=True)
