"""Build the Durza logo set: SVG sources + every raster size the apps need.

    pip install cairosvg pillow fonttools
    POPPINS_DIR=/path/to/poppins python3 scripts/brand/build.py
    POPPINS_DIR=/path/to/poppins python3 scripts/brand/splash.py

Output goes to scripts/brand/out (gitignored); copy into public/, android/ and
ios/ (see README.md in this folder). If you change the mark geometry, mirror
the new path into lib/brand.ts.
"""
import json, os, io
import cairosvg
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.environ.get("BRAND_OUT", os.path.join(HERE, "out"))
os.makedirs(OUT, exist_ok=True)

ORANGE = "#EE5A0B"      # brand orange (white on it = 3.4:1)
ORANGE_DEEP = "#C2410C"  # small text on light backgrounds (5.2:1)
WHITE = "#FFFFFF"
INK = "#141414"

# ---------------------------------------------------------------- the D mark
# Drawn on a 512 grid. A geometric D (flat stem + semicircular bowl) with a
# semicircular bite out of the stem, like the stub of a torn coupon.
X0, Y0, H, W, T, NOTCH = 124, 120, 272, 262, 66, 32
R = H / 2
cy = Y0 + H / 2


def d_path(x0=X0, y0=Y0, h=H, w=W, t=T, notch=NOTCH):
    r = h / 2
    mid = y0 + r
    outer = (
        f"M{x0} {y0}H{x0 + w - r}A{r} {r} 0 0 1 {x0 + w - r} {y0 + h}H{x0}"
        f"V{mid + notch}A{notch} {notch} 0 0 0 {x0} {mid - notch}Z"
    )
    ih = h - 2 * t
    ir = ih / 2
    ix, iy = x0 + t, y0 + t
    iw = w - 2 * t
    inner = f"M{ix} {iy}H{ix + iw - ir}A{ir} {ir} 0 0 1 {ix + iw - ir} {iy + ih}H{ix}Z"
    return outer + inner


MARK_PATH = d_path()


def mark_svg(bg=ORANGE, fg=WHITE, rx=112, scale=1.0, bleed=False, with_bg=True):
    """Square mark. scale shrinks the D around the centre (adaptive/maskable safe zones)."""
    cxm = X0 + W / 2
    tr = f"translate(256 256) scale({scale}) translate({-cxm} {-(Y0 + H / 2)})"
    rect = ""
    if with_bg:
        rect = f'<rect width="512" height="512" rx="{0 if bleed else rx}" fill="{bg}"/>'
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{rect}'
        f'<path transform="{tr}" d="{MARK_PATH}" fill="{fg}" fill-rule="evenodd"/></svg>'
    )


# ------------------------------------------------------------- outlined text
# Poppins (OFL) Bold + Medium .ttf files, used only to outline the wordmark.
FONTS = os.environ.get("POPPINS_DIR", "/usr/share/fonts/truetype/google-fonts/").rstrip("/") + "/"


def text_path(text, font_file, size, x, baseline, tracking=0.0):
    f = TTFont(FONTS + font_file)
    gs, cmap, hmtx = f.getGlyphSet(), f.getBestCmap(), f["hmtx"]
    upm = f["head"].unitsPerEm
    s = size / upm
    kern_pairs = {}
    pen_d, cursor = [], x
    for ch in text:
        gname = cmap[ord(ch)]
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, (s, 0, 0, -s, cursor, baseline))
        gs[gname].draw(tp)
        pen_d.append(pen.getCommands())
        cursor += hmtx[gname][0] * s + tracking
    return "".join(pen_d), cursor - tracking


def lockup_svg(reversed_=False):
    tile_bg, tile_fg = (WHITE, ORANGE) if reversed_ else (ORANGE, WHITE)
    word = WHITE if reversed_ else INK
    sub = WHITE if reversed_ else ORANGE_DEEP
    # tile 96 high, placed at 0,0
    tile_scale = 96 / 512
    tile = (
        f'<g transform="scale({tile_scale})">'
        f'<rect width="512" height="512" rx="112" fill="{tile_bg}"/>'
        f'<path d="{MARK_PATH}" fill="{tile_fg}" fill-rule="evenodd"/></g>'
    )
    w1, end1 = text_path("Durza", "Poppins-Bold.ttf", 60, 116, 58, tracking=-1.2)
    w2, end2 = text_path("Coupon & Deals", "Poppins-Medium.ttf", 21, 118, 86, tracking=0.2)
    width = round(max(end1, end2) + 4)
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 96" width="{width}" height="96" '
        f'role="img" aria-label="Durza: Coupon &amp; Deals">'
        f"{tile}"
        f'<path d="{w1}" fill="{word}"/>'
        f'<path d="{w2}" fill="{sub}"/></svg>'
    )
    return svg, width


def write(name, data, mode="w"):
    with open(os.path.join(OUT, name), mode) as fh:
        fh.write(data)


def png(svg, name, size, bg=None):
    data = cairosvg.svg2png(bytestring=svg.encode(), output_width=size, output_height=size, background_color=bg)
    with open(os.path.join(OUT, name), "wb") as fh:
        fh.write(data)
    return data


def png_w(svg, name, width):
    data = cairosvg.svg2png(bytestring=svg.encode(), output_width=width)
    with open(os.path.join(OUT, name), "wb") as fh:
        fh.write(data)


if __name__ == "__main__":
    # ---------- SVG sources
    write("logo-mark.svg", mark_svg())
    light, lw = lockup_svg(False)
    rev, _ = lockup_svg(True)
    write("logo.svg", light)
    write("logo-reversed.svg", rev)

    # ---------- web / PWA rasters
    png(mark_svg(), "icon-512.png", 512)
    png(mark_svg(), "icon-192.png", 192)
    png(mark_svg(bleed=True, scale=0.92), "icon-maskable-512.png", 512)  # full-bleed, safe-zone friendly
    png(mark_svg(bleed=True), "apple-touch-icon.png", 180)               # iOS rounds it itself
    png(mark_svg(), "favicon-32.png", 32)
    png(mark_svg(), "favicon-48.png", 48)
    png(mark_svg(), "favicon-16.png", 16)
    png_w(light, "logo.png", 1200)
    png_w(rev, "logo-reversed.png", 1200)

    # favicon.ico (16/32/48)
    imgs = [Image.open(os.path.join(OUT, f"favicon-{s}.png")).convert("RGBA") for s in (16, 32, 48)]
    imgs[2].save(os.path.join(OUT, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)], append_images=imgs[:2])

    # ---------- Android (legacy launcher + adaptive foreground)
    legacy = {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}
    fg = {"mdpi": 108, "hdpi": 162, "xhdpi": 216, "xxhdpi": 324, "xxxhdpi": 432}
    for d, px in legacy.items():
        os.makedirs(f"{OUT}/android/mipmap-{d}", exist_ok=True)
        png(mark_svg(rx=112), f"android/mipmap-{d}/ic_launcher.png", px)
        # round launcher: circle of orange with the D inside
        round_svg = (
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">'
            f'<circle cx="256" cy="256" r="256" fill="{ORANGE}"/>'
            f'<path transform="translate(256 256) scale(0.84) translate({-(X0 + W / 2)} {-(Y0 + H / 2)})" '
            f'd="{MARK_PATH}" fill="{WHITE}" fill-rule="evenodd"/></svg>'
        )
        png(round_svg, f"android/mipmap-{d}/ic_launcher_round.png", px)
    for d, px in fg.items():
        # adaptive foreground: transparent, D within the central 61% safe zone
        png(mark_svg(with_bg=False, scale=0.72), f"android/mipmap-{d}/ic_launcher_foreground.png", px)

    # ---------- iOS app icon (1024, opaque, square)
    png(mark_svg(bleed=True), "ios-AppIcon-512@2x.png", 1024)

    print("built", len(os.listdir(OUT)), "entries; lockup width", lw)
    print("MARK_PATH =", MARK_PATH)
