import os
import re
import sys

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

TOC_DIR = os.path.join(os.path.dirname(__file__), '..', 'coredose', 'toc')
COREDOSE_DIR = os.path.join(os.path.dirname(__file__), '..', 'coredose')

# 1. Collect all valid routes across coredose
valid_routes = set()
for root, dirs, files in os.walk(COREDOSE_DIR):
    for f in files:
        if f.endswith('.mdx'):
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, os.path.join(COREDOSE_DIR, '..'))
            # normalize to /coredose/...
            route = '/' + rel_path.replace('\\', '/').replace('.mdx', '')
            if route.endswith('/index'):
                route = route[:-6]
            valid_routes.add(route)

print(f"Total indexed routes across CoreDose: {len(valid_routes)}")

# 2. Check all links in TOC
broken = []
for root, dirs, files in os.walk(TOC_DIR):
    for f in files:
        if f.endswith('.mdx'):
            full = os.path.join(root, f)
            with open(full, 'r', encoding='utf-8') as fh:
                text = fh.read()
            urls = re.findall(r'(?:url|href)\s*[:=]\s*[\'"](/coredose/[^\'"]+)[\'"]', text)
            for u in urls:
                u_clean = u.rstrip('/')
                # Skip hub root
                if u_clean in ['/coredose', '/coredose/toc']:
                    continue
                if u_clean not in valid_routes:
                    broken.append((os.path.relpath(full, TOC_DIR), u_clean))

if broken:
    print(f"\n❌ Found {len(broken)} BROKEN LINKS in TOC:")
    for src, target in broken:
        print(f"   • {src} -> {target}")
else:
    print("\n✅ All links in TOC are 100% valid and verified against real disk routes!")
