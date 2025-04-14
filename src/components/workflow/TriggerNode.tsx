
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

interface TriggerNodeProps {
  data: {
    label: string;
    description?: string;
  };
  selected: boolean;
}

function TriggerNode({ data, selected }: TriggerNodeProps) {
  return (
    <div className={`p-3 rounded-md bg-white border ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'} shadow-sm min-w-[180px]`}>
      <div className="flex items-center mb-2">
        <div className="w-2 h-2 rounded-full bg-node-trigger mr-2"></div>
        <div className="font-medium text-sm truncate">{data.label}</div>
      </div>
      
      {data.description && (
        <div className="text-xs text-gray-500 mt-1">{data.description}</div>
      )}
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-node-trigger border-2 border-white rounded-full"
      />
    </div>
  );
}

export default memo(TriggerNode);
