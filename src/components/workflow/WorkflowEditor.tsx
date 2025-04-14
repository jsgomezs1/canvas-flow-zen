
import { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  Panel,
  NodeChange,
} from '@xyflow/react';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import TriggerNode from './TriggerNode';
import ActionNode from './ActionNode';
import ConditionNode from './ConditionNode';
import CustomEdge from './CustomEdge';
import NodeConfigPanel from './NodeConfigPanel';

import '@xyflow/react/dist/style.css';

// Define the node types for the editor
const nodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

// Initial nodes for the workflow
const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 250, y: 50 },
    data: { label: 'When a form is submitted', description: 'Triggers when a user submits a form' }
  },
  {
    id: '2',
    type: 'action',
    position: { x: 250, y: 200 },
    data: { label: 'Send email notification', description: 'Sends an email with form data' }
  },
  {
    id: '3',
    type: 'condition',
    position: { x: 250, y: 350 },
    data: { label: 'Check form status', description: 'Evaluates if form is complete' }
  },
];

// Initial edges connecting the nodes
const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'custom' },
  { id: 'e2-3', source: '2', target: '3', type: 'custom' },
];

export default function WorkflowEditor() {
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Handle connections between nodes
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, type: 'custom' }, eds));
      toast({
        title: "Connection created",
        description: "Nodes connected successfully",
        duration: 2000,
      });
    },
    [setEdges, toast]
  );

  // Handle node selection for configuration panel
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Update node data from configuration panel
  const onUpdateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: newData };
        }
        return node;
      })
    );
    toast({
      title: "Node updated",
      description: "Node configuration saved",
      duration: 2000,
    });
  }, [setNodes, toast]);

  // Add a new node to the canvas
  const onAddNode = useCallback((type: 'trigger' | 'action' | 'condition') => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      type,
      position: { x: Math.random() * 300 + 100, y: Math.random() * 300 + 100 },
      data: { 
        label: type === 'trigger'
          ? 'New Trigger'
          : type === 'action'
          ? 'New Action'
          : 'New Condition' 
      }
    };
    
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  // Handle keyboard navigation
  const onKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && selectedNode) {
      setSelectedNode(null);
    }
    
    // Delete selected node with Delete or Backspace
    if ((event.key === 'Delete' || event.key === 'Backspace') && selectedNode) {
      setNodes((nodes) => nodes.filter((n) => n.id !== selectedNode.id));
      setEdges((edges) => edges.filter(
        (e) => e.source !== selectedNode.id && e.target !== selectedNode.id
      ));
      setSelectedNode(null);
      toast({
        title: "Node deleted",
        description: "Node and its connections removed",
        duration: 2000,
      });
    }
  }, [selectedNode, setNodes, setEdges, toast]);

  return (
    <div 
      className="w-full h-screen bg-gray-50" 
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        selectionMode="partial"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#e2e8f0"
        />
        <Controls />
        <MiniMap nodeBorderRadius={2} nodeStrokeWidth={3} zoomable pannable />
        
        <Panel position="top-left" className="bg-white p-2 rounded-md shadow-sm">
          <div className="flex flex-col gap-2">
            <Button size="sm" variant="outline" onClick={() => onAddNode('trigger')}>
              <Plus className="h-4 w-4 mr-1" /> Trigger
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAddNode('action')}>
              <Plus className="h-4 w-4 mr-1" /> Action
            </Button>
            <Button size="sm" variant="outline" onClick={() => onAddNode('condition')}>
              <Plus className="h-4 w-4 mr-1" /> Condition
            </Button>
          </div>
        </Panel>

        <Panel position="top-right" className="p-2">
          <div className="text-xs text-gray-500">
            <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded-sm">Delete</kbd> to remove node •{" "}
            <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded-sm">Esc</kbd> to close panel
          </div>
        </Panel>
      </ReactFlow>

      {selectedNode && (
        <NodeConfigPanel
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdateNodeData={onUpdateNodeData}
        />
      )}
    </div>
  );
}
