
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface ConditionNodeProps {
  data: {
    label: string;
    description?: string;
  };
  selected: boolean;
}

function ConditionNode({ data, selected }: ConditionNodeProps) {
  return (
    <div className={`p-3 rounded-md bg-white border ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} shadow-sm min-w-[180px]`}>
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 rounded-full bg-node-condition mr-2"></div>
        <div className="font-medium text-sm truncate">{data.label}</div>
      </div>
      
      {data.description && (
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
      )}
      
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-node-condition border-2 border-white rounded-full"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-node-condition border-2 border-white rounded-full"
        id="true"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-node-condition border-2 border-white rounded-full"
        id="false"
      />
    </div>
  );
}

export default memo(ConditionNode);
