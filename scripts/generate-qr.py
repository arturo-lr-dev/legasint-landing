#!/usr/bin/env python3
"""Generate a QR code image pointing to https://legasint.com/qr"""

import os
import qrcode
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import RoundedModuleDrawer
from qrcode.image.styles.colormasks import SolidFillColorMask
from PIL import Image

OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "public", "qr-code.png")
URL = "https://legasint.com/qr"

def main():
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=20,
        border=4,
    )
    qr.add_data(URL)
    qr.make(fit=True)

    # Brand colors (blue-purple from the site)
    fill_color = (88, 28, 135)      # #581c87 purple
    back_color = (255, 255, 255)    # white background

    img = qr.make_image(
        image_factory=StyledPilImage,
        module_drawer=RoundedModuleDrawer(),
        color_mask=SolidFillColorMask(back_color=back_color, front_color=fill_color),
    )

    # Try to embed the logo in the center
    logo_path = os.path.join(os.path.dirname(__file__), "..", "public", "qr-avatar.png")
    if os.path.exists(logo_path):
        logo = Image.open(logo_path)
        qr_width, qr_height = img.size
        logo_size = int(qr_width * 0.25)
        logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)

        # Create a circular mask for the logo
        mask = Image.new("L", (logo_size, logo_size), 0)
        from PIL import ImageDraw
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, logo_size, logo_size), fill=255)

        # White circular background behind logo
        circle_bg = Image.new("RGBA", (logo_size, logo_size), (255, 255, 255, 255))
        circle_bg.putalpha(mask)

        # Paste logo onto circle background
        logo_rgba = logo.convert("RGBA")
        circle_bg.paste(logo_rgba, (0, 0), logo_rgba)

        # Add a subtle border
        border_size = logo_size + 20
        border = Image.new("RGBA", (border_size, border_size), (255, 255, 255, 255))
        border_mask = Image.new("L", (border_size, border_size), 0)
        border_draw = ImageDraw.Draw(border_mask)
        border_draw.ellipse((0, 0, border_size, border_size), fill=255)
        border.putalpha(border_mask)

        pos = ((qr_width - border_size) // 2, (qr_height - border_size) // 2)
        img.paste(border, pos, border)

        logo_pos = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)
        img.paste(circle_bg, logo_pos, circle_bg)

    img.save(OUTPUT_PATH)
    print(f"QR code saved to: {OUTPUT_PATH}")
    print(f"URL: {URL}")

if __name__ == "__main__":
    main()
