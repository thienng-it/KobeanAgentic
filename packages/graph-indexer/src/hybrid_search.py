from typing import List, Dict, Any
from src.graph_builder import DiGraph

class HybridSearchEngine:
    """Hybrid context search engine combining Graph Degree Centrality with lexical matching."""
    
    def __init__(self, graph: DiGraph, symbols: List[Dict[str, Any]]):
        self.graph = graph
        self.symbols = symbols
        self.centrality = self._compute_degree_centrality(graph)
        
    def _compute_degree_centrality(self, graph: DiGraph) -> Dict[str, float]:
        centrality: Dict[str, float] = {}
        total_nodes = len(graph.nodes)
        if total_nodes <= 1:
            return {n: 1.0 for n in graph.nodes}
            
        for node in graph.nodes:
            in_edges = sum(1 for src, targets in graph.edges.items() if node in targets)
            out_edges = len(graph.edges.get(node, set()))
            centrality[node] = (in_edges + out_edges) / float(total_nodes - 1)
            
        return centrality

    def search(self, query: str, top_k: int = 5) -> List[Dict[str, Any]]:
        query_terms = [t.lower() for t in query.split() if len(t) > 2]
        scored_symbols = []
        
        for sym in self.symbols:
            name = sym["name"].lower()
            doc = sym.get("doc", "").lower()
            file = sym.get("file", "").lower()
            
            lexical_score = 0
            for term in query_terms:
                if term in name:
                    lexical_score += 10
                if term in doc:
                    lexical_score += 5
                if term in file:
                    lexical_score += 2
                    
            graph_importance = self.centrality.get(sym["name"], 0.0) * 100
            final_score = lexical_score + graph_importance
            
            if final_score > 0:
                scored_symbols.append((final_score, sym))
                
        scored_symbols.sort(key=lambda x: x[0], reverse=True)
        return [sym for _, sym in scored_symbols[:top_k]]
