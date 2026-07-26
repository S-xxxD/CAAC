from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw


PROJECT_DIR = Path(__file__).resolve().parents[1]
ASSET_DIR = PROJECT_DIR / "assets"
ICON_DIR = ASSET_DIR / "icons"

INK = (23, 33, 31, 255)
TEAL = (15, 118, 110, 255)
MINT = (223, 244, 239, 255)
AMBER = (217, 141, 31, 255)
WHITE = (255, 255, 255, 255)
LINE = (205, 222, 217, 255)


def draw_drone(draw: ImageDraw.ImageDraw, center: tuple[float, float], scale: float) -> None:
    cx, cy = center
    arm = 74 * scale
    rotor = 39 * scale
    body_w = 42 * scale
    body_h = 54 * scale
    stroke = max(3, round(8 * scale))

    for angle in (45, 135, 225, 315):
        radians = math.radians(angle)
        ex = cx + math.cos(radians) * arm
        ey = cy + math.sin(radians) * arm
        draw.line((cx, cy, ex, ey), fill=INK, width=stroke)
        draw.ellipse(
            (ex - rotor, ey - rotor, ex + rotor, ey + rotor),
            outline=TEAL,
            width=max(2, round(7 * scale)),
        )
        hub = 8 * scale
        draw.ellipse((ex - hub, ey - hub, ex + hub, ey + hub), fill=AMBER)

    draw.rounded_rectangle(
        (cx - body_w, cy - body_h, cx + body_w, cy + body_h),
        radius=round(13 * scale),
        fill=INK,
    )
    nose = 12 * scale
    draw.polygon(
        ((cx, cy - body_h - nose), (cx - 12 * scale, cy - body_h + 5 * scale), (cx + 12 * scale, cy - body_h + 5 * scale)),
        fill=AMBER,
    )
    draw.ellipse((cx - 12 * scale, cy - 12 * scale, cx + 12 * scale, cy + 12 * scale), fill=MINT)


def make_icon(size: int) -> None:
    canvas = Image.new("RGBA", (size, size), MINT)
    draw = ImageDraw.Draw(canvas)
    margin = size * 0.075
    draw.rounded_rectangle(
        (margin, margin, size - margin, size - margin),
        radius=round(size * 0.18),
        fill=WHITE,
        outline=LINE,
        width=max(2, size // 80),
    )
    draw_drone(draw, (size / 2, size / 2 + size * 0.015), size / 380)
    canvas.save(ICON_DIR / f"icon-{size}.png", optimize=True)


def make_panel() -> None:
    width, height = 1600, 480
    canvas = Image.new("RGBA", (width, height), (236, 246, 243, 255))
    draw = ImageDraw.Draw(canvas)

    for x in range(0, width, 80):
        draw.line((x, 0, x, height), fill=(213, 231, 226, 255), width=1)
    for y in range(0, height, 80):
        draw.line((0, y, width, y), fill=(213, 231, 226, 255), width=1)

    draw.arc((60, -210, 760, 490), start=12, end=245, fill=(132, 180, 170, 255), width=3)
    draw.arc((850, 80, 1500, 730), start=188, end=350, fill=(132, 180, 170, 255), width=3)
    draw.line((0, 350, 1600, 118), fill=(193, 217, 211, 255), width=2)
    draw.line((0, 378, 1600, 146), fill=(193, 217, 211, 255), width=2)

    for x, y in ((130, 112), (380, 350), (1220, 92), (1460, 332)):
        draw.ellipse((x - 7, y - 7, x + 7, y + 7), fill=AMBER)
        draw.ellipse((x - 22, y - 22, x + 22, y + 22), outline=(217, 141, 31, 110), width=2)

    draw_drone(draw, (1160, 250), 1.38)
    canvas.save(ASSET_DIR / "drone-panel.png", optimize=True)


def main() -> None:
    ICON_DIR.mkdir(parents=True, exist_ok=True)
    for size in (192, 512):
        make_icon(size)
    make_panel()
    print(f"Wrote assets to {ASSET_DIR}")


if __name__ == "__main__":
    main()
