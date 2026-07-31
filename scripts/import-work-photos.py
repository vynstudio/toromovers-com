#!/usr/bin/env python3
"""
Import real Toro job photos with correct EXIF orientation.

Phone JPEGs often store pixels rotated + Orientation tag. Resizing without
applying the tag makes images appear sideways on web (esp. mobile Safari).

Usage:
  python3 scripts/import-work-photos.py "/Users/vynstudio/Desktop/Toro-Work Images"
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageOps


def fix_and_save(src: Path, dest: Path, max_side: int = 1200, quality: int = 72) -> None:
    im = Image.open(src)
    im = ImageOps.exif_transpose(im)  # bake correct orientation into pixels
    im = im.convert("RGB")
    w, h = im.size
    m = max(w, h)
    if m > max_side:
        r = max_side / m
        im = im.resize((int(w * r), int(h * r)), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)


def main() -> None:
    src_dir = Path(sys.argv[1] if len(sys.argv) > 1 else Path.home() / "Desktop" / "Toro-Work Images")
    out_dir = Path(__file__).resolve().parents[1] / "public" / "images" / "moves"
    files = (
        sorted(src_dir.glob("IMG_*.jpeg"))
        + sorted(src_dir.glob("IMG_*.jpg"))
        + sorted(src_dir.glob("*_1_105_c.jpeg"))
    )
    if not files:
        print(f"No images in {src_dir}")
        sys.exit(1)
    for i, f in enumerate(files, 1):
        dest = out_dir / f"real-{i:02d}.jpg"
        fix_and_save(f, dest)
        print(f"OK {dest.name} <- {f.name}")
    print(f"Wrote {len(files)} photos to {out_dir}")


if __name__ == "__main__":
    main()
