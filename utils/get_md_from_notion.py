import os
import re
import shutil

INPUT_DIR = r"C:\Users\Abhay Ojha\Downloads\Code Base"
OUTPUT_DIR = "output"


def slugify(text):
    if not text:
        return ""
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"\s+", "-", text.strip())
    return text


def extract_metadata(lines):
    title = None
    topic = None
    difficulty = None
    sub_topic = None

    for line in lines:
        stripped = line.strip()
        lower = stripped.lower()

        if stripped.startswith("# ") and not title:
            title = stripped[2:].strip()

        elif lower.startswith("coding topic:"):
            topic = stripped.split(":", 1)[1].strip()

        elif lower.startswith("difficulty:"):
            difficulty = stripped.split(":", 1)[1].strip()

        elif lower.startswith("coding sub-topic:"):
            sub_topic = stripped.split(":", 1)[1].strip()

    return title, topic, difficulty, sub_topic


def build_frontmatter(title, topic, difficulty, sub_topic):
    tags = set()

    if topic:
        tags.add(slugify(topic))
    if difficulty:
        tags.add(slugify(difficulty))

    if sub_topic:
        for part in re.split(r"[\/, ]+", sub_topic):
            if part:
                tags.add(slugify(part))

    tags_yaml = "\n".join(f"  - {tag}" for tag in sorted(tags))

    return f"""---
title: {title}
description: ""
tags:
{tags_yaml}
---

"""


def remove_unwanted_lines(lines):
    cleaned = []
    skip_prefixes = (
        "coding topic:",
        "difficulty:",
        "coding sub-topic:",
        "date solved:",
        "status:",
        "type:",
        "source:",
    )

    title_removed = False

    for line in lines:
        stripped = line.strip()
        lower = stripped.lower()

        # Skip known metadata lines if present
        if lower.startswith(skip_prefixes):
            continue

        # Remove first H1 only if present
        if not title_removed and stripped.startswith("# "):
            title_removed = True
            continue

        cleaned.append(line)

    return cleaned


def organize_files():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    for filename in os.listdir(INPUT_DIR):
        if not filename.lower().endswith(".md"):
            continue

        input_path = os.path.join(INPUT_DIR, filename)

        with open(input_path, "r", encoding="utf-8") as f:
            lines = f.readlines()

        title, topic, difficulty, sub_topic = extract_metadata(lines)

        # If minimal info missing, keep file as-is (safe fallback)
        if not title or not topic or not difficulty:
            print(f"⚠️ Skipped (insufficient metadata): {filename}")
            continue

        topic_dir = slugify(topic)
        difficulty_dir = slugify(difficulty)
        new_filename = f"{slugify(title)}.md"

        dest_dir = os.path.join(OUTPUT_DIR, topic_dir, difficulty_dir)
        os.makedirs(dest_dir, exist_ok=True)

        body_lines = remove_unwanted_lines(lines)
        body_content = "".join(body_lines).lstrip()

        frontmatter = build_frontmatter(title, topic, difficulty, sub_topic)
        final_content = frontmatter + body_content

        output_path = os.path.join(dest_dir, new_filename)

        with open(output_path, "w", encoding="utf-8") as f:
            f.write(final_content)

        os.remove(input_path)

        print(f"✅ Processed: {output_path}")


if __name__ == "__main__":
    organize_files()
