import re
from typing import List, Dict, Any

class ASTParser:
    """Tree-sitter & Regex AST fallback symbol extractor for multi-language AST indexing."""
    
    def parse_code(self, filepath: str, code_content: str) -> List[Dict[str, Any]]:
        symbols = []
        lines = code_content.split('\n')
        
        # Function pattern (python, ts/js)
        fn_pattern = re.compile(r'^\s*(?:def|function|async function|const|export function)\s+([a-zA-Z0-9_]+)')
        cls_pattern = re.compile(r'^\s*(?:class|interface|type)\s+([a-zA-Z0-9_]+)')
        
        for idx, line in enumerate(lines):
            fn_match = fn_pattern.search(line)
            if fn_match:
                name = fn_match.group(1)
                symbols.append({
                    "name": name,
                    "type": "function",
                    "file": filepath,
                    "line": idx + 1,
                    "doc": line.strip(),
                    "calls": []
                })
                continue
                
            cls_match = cls_pattern.search(line)
            if cls_match:
                name = cls_match.group(1)
                symbols.append({
                    "name": name,
                    "type": "class",
                    "file": filepath,
                    "line": idx + 1,
                    "doc": line.strip(),
                    "calls": []
                })
                
        # Resolve calls within symbols
        for sym in symbols:
            calls = []
            for other_sym in symbols:
                if sym["name"] != other_sym["name"] and other_sym["name"] in code_content:
                    calls.append(other_sym["name"])
            sym["calls"] = list(set(calls))
            
        return symbols
