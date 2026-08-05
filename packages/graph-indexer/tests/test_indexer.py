import unittest
import sys
import os

# Add package root to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.ast_parser import ASTParser
from src.graph_builder import CodeGraphBuilder
from src.hybrid_search import HybridSearchEngine

class TestGraphIndexer(unittest.TestCase):

    def test_ast_parser_extracts_symbols(self):
        sample_code = """
def calculate_metrics(data):
    return sum(data)

class MetricEvaluator:
    def evaluate(self, dataset):
        return calculate_metrics(dataset)
"""
        parser = ASTParser()
        symbols = parser.parse_code("sample.py", sample_code)
        
        self.assertGreaterEqual(len(symbols), 2)
        symbol_names = [s["name"] for s in symbols]
        self.assertIn("calculate_metrics", symbol_names)
        self.assertIn("MetricEvaluator", symbol_names)

    def test_graph_builder_builds_dependency_nodes(self):
        sample_symbols = [
            {"name": "calculate_metrics", "type": "function", "file": "sample.py", "calls": []},
            {"name": "MetricEvaluator.evaluate", "type": "method", "file": "sample.py", "calls": ["calculate_metrics"]}
        ]
        builder = CodeGraphBuilder()
        graph = builder.build_graph(sample_symbols)
        
        self.assertTrue(graph.has_node("calculate_metrics"))
        self.assertTrue(graph.has_node("MetricEvaluator.evaluate"))
        self.assertTrue(graph.has_edge("MetricEvaluator.evaluate", "calculate_metrics"))

    def test_hybrid_search_ranks_context(self):
        sample_symbols = [
            {"name": "auth_middleware", "type": "function", "file": "auth.py", "doc": "JWT authentication parser"},
            {"name": "db_connect", "type": "function", "file": "db.py", "doc": "Postgres database pool"}
        ]
        builder = CodeGraphBuilder()
        graph = builder.build_graph(sample_symbols)
        search_engine = HybridSearchEngine(graph, sample_symbols)
        
        results = search_engine.search("JWT token verification")
        self.assertGreater(len(results), 0)
        self.assertEqual(results[0]["name"], "auth_middleware")

if __name__ == '__main__':
    unittest.main()
