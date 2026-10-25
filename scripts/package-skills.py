#!/usr/bin/env python3
"""Build deterministic, individually uploadable ZIPs for the promoted skills."""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZipInfo, ZIP_DEFLATED


def skill_files(repo: Path, source: str) -> tuple[Path, list[Path]]:
    relative = Path(source)
    if relative.is_absolute() or '..' in relative.parts:
        raise ValueError(f'Unsafe skill path: {source}')
    unresolved = repo / relative
    if any(part.is_symlink() for part in [unresolved, *unresolved.parents] if part != repo.parent):
        raise ValueError(f'Symlink in skill path: {source}')
    folder = unresolved.resolve()
    if not folder.is_relative_to((repo / 'skills').resolve()):
        raise ValueError(f'Skill is outside skills/: {source}')
    if not (folder / 'SKILL.md').is_file():
        raise ValueError(f'Missing SKILL.md: {source}')
    files = []
    for path in sorted(folder.rglob('*')):
        if path.is_symlink():
            raise ValueError(f'Symlink in skill: {path}')
        if any(part.startswith('.') or part == '__pycache__' for part in path.relative_to(folder).parts):
            continue
        if path.is_file():
            files.append(path)
    return folder, files


def package(repo: Path, output: Path) -> list[dict]:
    manifest = json.loads((repo / '.claude-plugin/plugin.json').read_text())
    sources = manifest['skills']
    if len(sources) != len(set(sources)):
        raise ValueError('Duplicate manifest paths')
    planned = [skill_files(repo, source) for source in sources]
    names = [folder.name for folder, _ in planned]
    if len(names) != len(set(names)):
        raise ValueError('Duplicate skill names')
    output.mkdir(parents=True, exist_ok=True)
    catalog = []
    for folder, files in planned:
        archive = output / f'{folder.name}.zip'
        with ZipFile(archive, 'w', compression=ZIP_DEFLATED) as zipped:
            for path in files:
                info = ZipInfo((Path(folder.name) / path.relative_to(folder)).as_posix(), (2020, 1, 1, 0, 0, 0))
                info.compress_type = ZIP_DEFLATED
                info.external_attr = (0o100755 if path.stat().st_mode & 0o111 else 0o100644) << 16
                zipped.writestr(info, path.read_bytes())
        with ZipFile(archive) as zipped:
            if zipped.testzip() is not None:
                raise ValueError(f'Invalid ZIP: {archive}')
        catalog.append({
            'name': folder.name,
            'category': folder.parent.name,
            'source': folder.relative_to(repo).as_posix(),
            'archive': archive.name,
            'sha256': hashlib.sha256(archive.read_bytes()).hexdigest(),
        })
    catalog.sort(key=lambda entry: (entry['category'], entry['name']))
    (output / 'catalog.json').write_text(json.dumps(catalog, indent=2) + '\n')
    lines = ['# Claude skill downloads', '',
             'Upload one ZIP per skill through Claude Customize > Skills. These are individual skill packages, not a combined installer.', '',
             '| Category | Skill | ZIP |', '|---|---|---|']
    for entry in catalog:
        lines.append(f"| {entry['category']} | [{entry['name']}](../{entry['source']}/SKILL.md) | [Download]({entry['archive']}) |")
    (output / 'README.md').write_text('\n'.join(lines) + '\n')
    return catalog


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, help='Output folder (default: downloads/ in this repository)')
    args = parser.parse_args()
    repo = Path(__file__).resolve().parents[1]
    catalog = package(repo, args.output.resolve() if args.output else repo / 'downloads')
    print(f'Packaged {len(catalog)} skills.')


if __name__ == '__main__':
    main()
