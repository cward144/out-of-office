#!/usr/bin/env python3
"""Turn a browser 'Save page as...' export into a clean src/ folder.

Usage: python3 tools/import_saved_page.py "Out of Office — a tiny layoff adventure.html"

Expects the sibling "<name>_files/" folder next to the .html file.
Writes: src/index.html, src/css/, src/js/, src/assets/
Removes: hosting-tool editor widget, bot-challenge snippet, hidden iframe, saved-from comment.

CAUTION: a saved page is a post-run DOM snapshot. If the game builds hotspots/props at
runtime, you may see duplicates. Prefer copying the original project source if you can.
"""
import re
import shutil
import sys
from pathlib import Path


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 1
    html_path = Path(sys.argv[1]).expanduser().resolve()
    files_dir = html_path.with_name(html_path.stem + "_files")
    if not html_path.is_file() or not files_dir.is_dir():
        print(f"Need {html_path} and folder {files_dir}")
        return 1

    root = Path(__file__).resolve().parent.parent
    src = root / "src"
    for sub in ("css", "js", "assets"):
        (src / sub).mkdir(parents=True, exist_ok=True)

    folder = files_dir.name
    mapping = {}
    for f in sorted(files_dir.iterdir()):
        if not f.is_file() or f.name == "saved_resource.html":
            continue
        ext = f.suffix.lower()
        sub = "css" if ext == ".css" else "js" if ext == ".js" else "assets"
        shutil.copy2(f, src / sub / f.name)
        mapping[f.name] = f"./{sub}/{f.name}"

    text = html_path.read_text(encoding="utf-8")
    text = re.sub(r"<!-- saved from url=.*?-->\s*", "", text)
    # asset path rewrite (names may contain spaces/em dashes)
    for name, new in mapping.items():
        text = text.replace(f"./{folder}/{name}", new)
    # strip hosting widget module, challenge snippet, hidden iframe, widget host div
    text = re.sub(r'<script type="module">import \{ mountSiteWidget.*?</script>', "", text, flags=re.S)
    text = re.sub(r"<script>\(function\(\)\{function c\(\).*?</script>", "", text, flags=re.S)
    text = re.sub(r"<iframe[^>]*saved_resource\.html[^>]*></iframe>", "", text, flags=re.S)
    text = re.sub(r'<div data-sites-widget="editor-composer".*?(?=</body>)', "", text, flags=re.S)
    text = re.sub(r"https://out-of-office\.[a-z0-9.\-]+/#", "#", text)

    (src / "index.html").write_text(text, encoding="utf-8")

    leftovers = [m for m in ("chatgpt", "cdn-cgi", "mountSiteWidget", folder) if m in text]
    print(f"Wrote {src/'index.html'} and {len(mapping)} files.")
    if leftovers:
        print("WARNING: still found:", ", ".join(leftovers))
    print("Next: python3 -m http.server 8000 -d src")
    return 0


if __name__ == "__main__":
    sys.exit(main())
