
import { memo } from 'react';
import { BaseEdge, EdgeProps, getBezierPath } from '@xyflow/react';

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
  selected,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <BaseEdge
      path={edgePath}
      markerEnd={markerEnd}
      style={{
        ...style,
        strokeWidth: selected ? 2 : 1,
        stroke: selected ? '#3b82f6' : '#aaa',
      }}
    />
  );
}

export default memo(CustomEdge);
