# Project Instructions

## Scope
- Only edit files explicitly named in the user's request.
- Do not scan the entire project unless explicitly asked.
- Do not search for unrelated files.
- If a requested file does not exist, stop immediately and report it.

## Encoding
- Preserve all files as UTF-8.
- Preserve all Korean text exactly.
- Do not rewrite files using a different encoding.
- When using PowerShell, always read and write text files explicitly as UTF-8.

## Editing Rules
- Do not reformat, minify, or rewrite the entire document.
- Make only the smallest necessary changes.
- Preserve the existing HTML structure, line breaks, indentation, and unrelated content.
- Do not repeatedly run Test-Path, Get-Content, Get-ChildItem, rg, or similar search commands.
- Do not repeatedly re-read files after the target location has been identified.
- Stop after applying and verifying the requested changes.

## Safety
- Before editing, create a backup copy of each target file with a .bak extension.
- After editing, verify that Korean text is readable and the file remains UTF-8.
- If encoding corruption, mojibake, repeated context compression, or a tool-call loop occurs, stop immediately and report the issue without making further changes.
