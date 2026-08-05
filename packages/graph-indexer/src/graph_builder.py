from typing import List, Dict, Any, Set

class DiGraph:
    """Lightweight pure Python directed graph implementation."""
    def __init__(self):
        self.nodes: Dict[str, Dict[str, Any]] = {}
        self.edges: Dict[str, Set[str]] = {}

    def add_node(self, node_id: str, **attrs):
        if node_id not in self.nodes:
            self.nodes[node_id] = attrs
            self.edges[node_id] = set()

    def add_edge(self, source: str, target: str):
        if source in self.nodes and target in self.nodes:
            self.edges[source].add(target)

    def has_node(self, node_id: str) -> bool:
        return node_id in self.nodes

    def has_edge(self, source: str, target: str) -> bool:
        return source in self.edges and target in self.edges[source]

class CodeGraphBuilder:
    """Dependency call graph builder connecting AST symbols."""
    
    def build_graph(self, symbols: List[Dict[str, Any]]) -> DiGraph:
        graph = DiGraph()
        
        # Add nodes
        for sym in symbols:
            graph.add_node(
                sym["name"],
                type=sym.get("type", "symbol"),
                file=sym.get("file", ""),
                doc=sym.get("doc", "")
            )
            
        # Add directed edges for calls/dependencies
        for sym in symbols:
            for target_call in sym.get("calls", []):
                if graph.has_node(target_call):
                    graph.add_edge(sym["name"], target_call)
                    
        return graph
