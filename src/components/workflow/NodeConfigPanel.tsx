
import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Node } from '@xyflow/react';

interface NodeConfigPanelProps {
  node: Node | null;
  onClose: () => void;
  onUpdateNodeData: (nodeId: string, data: any) => void;
}

export default function NodeConfigPanel({ node, onClose, onUpdateNodeData }: NodeConfigPanelProps) {
  const [label, setLabel] = useState(node?.data.label || '');
  const [description, setDescription] = useState(node?.data.description || '');

  if (!node) return null;

  const handleSave = () => {
    if (node.id) {
      onUpdateNodeData(node.id, {
        ...node.data,
        label,
        description,
      });
    }
  };

  const getNodeTypeName = (type: string) => {
    switch (type) {
      case 'trigger': return 'Trigger';
      case 'action': return 'Action';
      case 'condition': return 'Condition';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-node-trigger';
      case 'action': return 'bg-node-action';
      case 'condition': return 'bg-node-condition';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-4 flex flex-col animate-slide-in-right z-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className={`w-3 h-3 rounded-full ${getNodeColor(node.type)} mr-2`}></div>
          <h3 className="font-medium">{getNodeTypeName(node.type)} Configuration</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          <Label htmlFor="node-label">Label</Label>
          <Input
            id="node-label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Enter node label"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="node-description">Description</Label>
          <Textarea
            id="node-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter node description"
            rows={3}
          />
        </div>

        {/* You can add more configuration options based on node type */}
        {node.type === 'action' && (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium mb-2">Action Settings</h4>
            <p className="text-xs text-gray-500">Configure specific settings for this action node.</p>
            {/* Add action-specific controls here */}
          </div>
        )}

        {node.type === 'condition' && (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium mb-2">Condition Settings</h4>
            <p className="text-xs text-gray-500">Configure the condition logic for this node.</p>
            {/* Add condition-specific controls here */}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200 mt-4">
        <Button className="w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
