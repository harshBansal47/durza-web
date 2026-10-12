import os
from build import *

def splash_svg(W, H):
    m = min(W, H) * 0.24           # tile size
    gap = m * 0.22
    fs = m * 0.46                  # wordmark font size
    wp, end = text_path("Durza", "Poppins-Bold.ttf", fs, 0, 0, tracking=-fs*0.02)
    tw = end
    total_h = m + gap + fs * 0.74
    top = (H - total_h) / 2
    tile = (f'<g transform="translate({(W-m)/2} {top}) scale({m/512})">'
            f'<rect width="512" height="512" rx="112" fill="{WHITE}"/>'
            f'<path d="{MARK_PATH}" fill="{ORANGE}" fill-rule="evenodd"/></g>')
    base = top + m + gap + fs * 0.72
    word = f'<g transform="translate({(W-tw)/2} {base})"><path d="{wp}" fill="{WHITE}"/></g>'
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="{ORANGE}"/>{tile}{word}</svg>'

def render(W, H, path):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    cairosvg.svg2png(bytestring=splash_svg(W, H).encode(), write_to=path, output_width=W, output_height=H)

if __name__ == "__main__":
    sizes = {
      "drawable": (480,320),
      "drawable-land-mdpi": (480,320), "drawable-land-hdpi": (800,480), "drawable-land-xhdpi": (1280,720),
      "drawable-land-xxhdpi": (1600,960), "drawable-land-xxxhdpi": (1920,1280),
      "drawable-port-mdpi": (320,480), "drawable-port-hdpi": (480,800), "drawable-port-xhdpi": (720,1280),
      "drawable-port-xxhdpi": (960,1600), "drawable-port-xxxhdpi": (1280,1920),
    }
    for d,(w,h) in sizes.items():
        render(w,h,f"{OUT}/android-splash/{d}/splash.png")
    render(2732,2732,f"{OUT}/ios-splash-2732x2732.png")
    print("splash done")
