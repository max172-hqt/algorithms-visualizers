import Board from "./graph-visualizer/Board";
import GraphVisualizerProvider from "./graph-visualizer/GraphVisualizerProvider";
import Layout from "./Layout";

function App() {
  return (
    <GraphVisualizerProvider>
      <Layout>
        <div className="w-full flex gap-4 max-w-screen-xl">
          <div className="bg-white">Control</div>
          <Board />
        </div>
      </Layout>
    </GraphVisualizerProvider>
  );
}

export default App;
