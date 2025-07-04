import { TOOLS } from '../../constants/tools';
import type { ToolsViewProps } from './tools.types';
import { cn } from '../../utils/tw.ts';

export const ToolsView: React.FC<ToolsViewProps> = ({
  selectedTool,
  setSelectedTool,
}) => {
  return (
    <div className='bg-white border border-gray-200 p-2 rounded-xs'>
      <div className='flex flex-col gap-2 justify-center items-center flex-wrap'>
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            className={cn('p-2 rounded-md cursor-pointer hover:bg-gray-100', {
              'bg-gray-200': selectedTool === tool.type,
            })}
            onClick={() => setSelectedTool(tool.type)}
            // draggable
            // onDragStart={(e) => handleDragStart(e, tool.type)}
          >
            <tool.icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};
