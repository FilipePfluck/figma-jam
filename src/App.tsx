import { useCallback } from 'react'
import * as Toolbar from '@radix-ui/react-toolbar'
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { DefaultEdge } from './components/edge/DefaultEdge'
import { Square } from './components/node/Square'

const NODE_TYPES = {
  square: Square,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: 'square-1',
    type: 'square',
    position: {
      x: 200,
      y: 400,
    },
    data: {},
  },
  {
    id: 'square-2',
    type: 'square',
    position: {
      x: 1000,
      y: 400,
    },
    data: {},
  },
] satisfies Node[]

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback(
    (connection: Connection) => {
      return setEdges((edges) => addEdge(connection, edges))
    },
    [setEdges],
  )

  const addSquareNode = () => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 750,
          y: 200,
        },
        data: {},
      },
    ])
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        defaultEdgeOptions={{
          type: 'default',
        }}
      >
        <Background gap={12} size={2} color="#DDD" />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button
          onClick={addSquareNode}
          className="w-32 h-32 bg-violet-500 rounded mt-6 hover:-translate-y-2 transition-transform"
        ></Toolbar.Button>
      </Toolbar.Root>
    </div>
  )
}

export default App
