import os
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
img = Image.new("RGBA", (W, H), (7, 12, 24, 255))
draw = ImageDraw.Draw(img)

# 1. Elegant Deep Gradient Background
for y in range(H):
    factor = y / H
    r = int(6 + (11 - 6) * factor)
    g = int(12 + (20 - 12) * factor)
    b = int(24 + (40 - 24) * factor)
    draw.line([(0, y), (W, y)], fill=(r, g, b, 255))

# 2. Subtle Mesh Glow Effects
glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow_layer)

# Vibrant Royal Blue Glow Top-Right
for radius in range(360, 0, -6):
    alpha = int((1 - radius / 360) ** 2 * 75)
    glow_draw.ellipse(
        [W - 180 - radius, -80 - radius, W - 180 + radius, -80 + radius],
        fill=(37, 99, 235, alpha)
    )

# Soft Cyan Glow Bottom-Left
for radius in range(300, 0, -6):
    alpha = int((1 - radius / 300) ** 2 * 50)
    glow_draw.ellipse(
        [120 - radius, H - 40 - radius, 120 + radius, H - 40 + radius],
        fill=(56, 189, 248, alpha)
    )

# Deep Indigo Accent Center-Right
for radius in range(250, 0, -6):
    alpha = int((1 - radius / 250) ** 2 * 35)
    glow_draw.ellipse(
        [750 - radius, 280 - radius, 750 + radius, 280 + radius],
        fill=(79, 70, 229, alpha)
    )

img = Image.alpha_composite(img, glow_layer)
draw = ImageDraw.Draw(img)

# 3. Clean Modern Card Frame with Soft Glassmorphism
card_x1, card_y1, card_x2, card_y2 = 36, 36, W - 36, H - 36
card_bg = Image.new("RGBA", (W, H), (0, 0, 0, 0))
card_draw = ImageDraw.Draw(card_bg)
card_draw.rounded_rectangle(
    [card_x1, card_y1, card_x2, card_y2],
    radius=28,
    fill=(255, 255, 255, 4),
    outline=(255, 255, 255, 22),
    width=1
)
img = Image.alpha_composite(img, card_bg)
draw = ImageDraw.Draw(img)

# 4. Logo Placement (Left Card)
logo_path = "static/img/logo.png"
if os.path.exists(logo_path):
    logo = Image.open(logo_path).convert("RGBA")
    logo_size = 300
    logo = logo.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Rounded Mask
    mask = Image.new("L", (logo_size, logo_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, logo_size, logo_size], radius=36, fill=255)
    
    logo_x = 90
    logo_y = int((H - logo_size) / 2)
    
    # Soft Blue Backdrop Glow behind logo
    logo_glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    logo_glow_draw = ImageDraw.Draw(logo_glow)
    for r_g in range(70, 0, -4):
        a = int((1 - r_g / 70) * 40)
        logo_glow_draw.rounded_rectangle(
            [logo_x - r_g, logo_y - r_g, logo_x + logo_size + r_g, logo_y + logo_size + r_g],
            radius=36 + r_g,
            fill=(37, 99, 235, a)
        )
    img = Image.alpha_composite(img, logo_glow)
    draw = ImageDraw.Draw(img)
    
    # Paste Logo
    img.paste(logo, (logo_x, logo_y), mask)
    
    # Crisp Border around logo
    draw.rounded_rectangle(
        [logo_x, logo_y, logo_x + logo_size, logo_y + logo_size],
        radius=36,
        outline=(59, 130, 246, 140),
        width=2
    )

# 5. Right Side Content
bold_font_path = "C:/Windows/Fonts/segoeuib.ttf"
regular_font_path = "C:/Windows/Fonts/segoeui.ttf"

font_chip = ImageFont.truetype(bold_font_path, 14)
font_title = ImageFont.truetype(bold_font_path, 60)
font_subtitle = ImageFont.truetype(regular_font_path, 24)
font_tag = ImageFont.truetype(bold_font_path, 15)
font_author = ImageFont.truetype(regular_font_path, 17)
font_author_bold = ImageFont.truetype(bold_font_path, 18)

text_x = 440

# A. Pill Chip: "A DOSE OF BINARY • TECH INTERVIEW & ENGINEERING"
chip_y = 100
chip_text = "A DOSE OF BINARY  •  TECH INTERVIEW & ENGINEERING"
chip_bbox = font_chip.getbbox(chip_text)
text_w = chip_bbox[2] - chip_bbox[0]
text_h = chip_bbox[3] - chip_bbox[1]
chip_w = text_w + 32
chip_h = text_h + 16

chip_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
chip_draw = ImageDraw.Draw(chip_layer)
chip_draw.rounded_rectangle(
    [text_x, chip_y, text_x + chip_w, chip_y + chip_h],
    radius=int(chip_h / 2),
    fill=(37, 99, 235, 50),
    outline=(59, 130, 246, 130),
    width=1
)
img = Image.alpha_composite(img, chip_layer)
draw = ImageDraw.Draw(img)
draw.text((text_x + 16, chip_y + 8), chip_text, fill=(147, 197, 253, 255), font=font_chip)

# B. Main Title: "Binary Dose"
title_y = chip_y + chip_h + 18
draw.text((text_x, title_y), "Binary Dose", fill=(255, 255, 255, 255), font=font_title)

# Glowing Accent Underline
accent_y = title_y + 82
draw.line([(text_x, accent_y), (text_x + 90, accent_y)], fill=(56, 189, 248, 255), width=4)
draw.line([(text_x + 98, accent_y), (text_x + 115, accent_y)], fill=(37, 99, 235, 255), width=4)

# C. High-Impact Evergreen Subtitle
sub_y = accent_y + 20
draw.text(
    (text_x, sub_y),
    "Master Data Structures, Operating Systems & System Design\nwith high-yield visual notes, code solutions and video deep dives.",
    fill=(203, 213, 225, 255),
    font=font_subtitle,
    spacing=8
)

# D. Evergreen Categorical Badges (No hardcoded counts or volatile names)
badge_y = sub_y + 86
badges = [
    "Data Structures & Algorithms",
    "100 Days of Interview",
    "System Design & Core CS",
]

bx = text_x
badge_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
b_draw = ImageDraw.Draw(badge_layer)

for b_text in badges:
    bbox = font_tag.getbbox(b_text)
    bw = (bbox[2] - bbox[0]) + 24
    bh = (bbox[3] - bbox[1]) + 16
    b_draw.rounded_rectangle(
        [bx, badge_y, bx + bw, badge_y + bh],
        radius=9,
        fill=(255, 255, 255, 12),
        outline=(255, 255, 255, 28),
        width=1
    )
    b_draw.text((bx + 12, badge_y + 8), b_text, fill=(241, 245, 249, 255), font=font_tag)
    bx += bw + 12

img = Image.alpha_composite(img, badge_layer)
draw = ImageDraw.Draw(img)

# E. Bottom Divider and Option B Tagline
footer_y = H - 90
draw.line([(text_x, footer_y - 14), (W - 85, footer_y - 14)], fill=(255, 255, 255, 24), width=1)

footer_label = "Your Daily Dose of Software Engineering & Interview Prep"
draw.text((text_x, footer_y), footer_label, fill=(148, 163, 184, 255), font=font_author)

domain_text = "binarydose.in"
domain_bbox = font_author_bold.getbbox(domain_text)
domain_w = domain_bbox[2] - domain_bbox[0]
draw.text((W - 85 - domain_w, footer_y), domain_text, fill=(56, 189, 248, 255), font=font_author_bold)

# Save final image
final_img = img.convert("RGB")
out_path = "static/img/binarydose-og.png"
final_img.save(out_path, "PNG", quality=95)
print("Successfully generated clean evergreen 1200x630 OG image:", out_path)
