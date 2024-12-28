import Board from "./graph-visualizer/Board";
import Control from "./graph-visualizer/Control";
import GraphVisualizerProvider from "./graph-visualizer/GraphVisualizerProvider";
import Layout from "./Layout";

function App() {
  return (
    <GraphVisualizerProvider>
      <Layout>
        <div className="flex flex-col md:flex-row gap-4 h-full flex-1 p-4 pt-0">
          <Control />
          <Board />
        </div>
      </Layout>
    </GraphVisualizerProvider>
  );
}

export default App;
