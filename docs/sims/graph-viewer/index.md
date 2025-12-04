---
title: Learning Graph Viewer
description: Interactive visualization tool for exploring concept dependencies in learning graphs with search, filtering, and statistics features.
quality_score: 85
---

# Learning Graph Viewer

<iframe src="main.html" height="700px" width="100%" scrolling="no"></iframe>

[Run the Learning Graph Viewer](main.html){ .md-button .md-button--primary }

## Sample iframe

```html
<iframe src="https://dmccreary.github.io/personal-finance/sims/graph-viewer/main.html" height="700px" width="100%" scrolling="no"></iframe>
```

This viewer reads a learning graph data from [../../learning-graph/learning-graph.json](../../learning-graph/learning-graph.json):

1. **Search Functionality** - Quick node lookup with autocomplete
2. **Taxonomy Legend Controls** - Filter nodes by category/taxonomy

## Features

### Search
- Type-ahead search for node names
- Displays matching results in a dropdown
- Shows node group/category in results
- Clicking a result focuses and highlights the node on the graph
- Only searches visible nodes (respects taxonomy filters)

### Taxonomy Legend with Checkboxes
- Sidebar legend with all node categories
- Toggle visibility of entire node groups
- Color-coded categories matching the graph
- "Check All" and "Uncheck All" buttons for bulk operations
- Collapsible sidebar to maximize graph viewing area

### Graph Statistics
Real-time statistics that update as you filter:
- **Nodes**: Count of visible nodes
- **Edges**: Count of visible edges (both endpoints must be visible)
- **Orphans**: Nodes with no connections (this is an indication that the learning graph needs editing)

## Sample Graph Demo

The demo includes a Graph Theory learning graph with 10 taxonomy categories:

- **Foundation** (Red) - Core concepts in red boxes that should be pinned to the left
- **Types** (Orange) - Graph types
- **Representations** (Gold) - Data structures
- **Algorithms** (Green) - Basic algorithms
- **Paths** (Blue) - Shortest path algorithms
- **Flow** (Indigo) - Network flow algorithms
- **Advanced** (Violet) - Advanced topics
- **Metrics** (Gray) - Centrality measures
- **Spectral** (Brown) - Spectral theory
- **ML & Networks** (Teal) - Machine learning

## Usage Tips

1. **Hide a category** - Uncheck a category in the sidebar to hide all nodes in that group
2. **Search within visible nodes** - Use search to quickly find specific concepts among visible nodes
3. **Focus on a topic** - Uncheck all categories, then check only the ones you want to study
4. **Collapse sidebar** - Click the menu button (☰) to hide the sidebar and expand the graph view
5. **Find orphans** - Check the statistics to see if any nodes lack connections

## Implementation Notes

This viewer follows the standard vis.js architectural patterns:

- Uses `vis.DataSet` for nodes and edges
- Implements node `hidden` property for filtering
- Combines separate search and legend features
- Updates statistics dynamically based on visibility
- Maintains consistent styling across features

## Use Cases

- **Course planning** - Filter by topic area to design lesson sequences
- **Concept exploration** - Search for specific concepts and see their dependencies
- **Gap analysis** - Use orphan count to identify disconnected concepts
- **Progressive learning** - Start with foundation concepts, gradually enable advanced topics

## Lesson Plan

### Learning Objectives

After completing this activity, students will be able to:

1. **Navigate** complex concept dependencies using interactive visualizations
2. **Identify** prerequisite knowledge for advanced topics
3. **Analyze** learning paths through interconnected concepts
4. **Evaluate** which concepts are foundational vs advanced

### Target Audience

Students, educators, and curriculum designers exploring personal finance concepts.

### Prerequisites

- Basic familiarity with graph/network visualizations
- Understanding of concept dependencies

### Activities

1. **Exploration**: Find all concepts that depend on "compound interest"
2. **Path Tracing**: Identify the learning path from basic concepts to investing
3. **Gap Analysis**: Locate orphan concepts that may need better connections

### Assessment

- Describe three paths through the learning graph
- Identify which taxonomy category has the most concepts
- Explain why prerequisite mapping improves learning outcomes

## References

1. [vis.js Documentation](https://visjs.org/) - Visualization library used
2. [Learning Graph Research](https://scholar.google.com/scholar?q=learning+graph+prerequisite+learning) - Academic research on prerequisite learning
