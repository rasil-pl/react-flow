import { TOOLBAR_ITEMS } from '../../constants/toolbar';
import { cn } from '../../utils/tw';
import type { ToolbarViewProps } from './toolbar.types';

export const ToolbarView: React.FC<ToolbarViewProps> = ({
  selectedTool,
  setSelectedTool,
}) => {
  return (
    <div className='bg-white border border-gray-200 p-2 rounded-xs'>
      <div className='flex gap-2 justify-center items-center flex-wrap'>
        {TOOLBAR_ITEMS.map((tool) => (
          <button
            key={tool.id}
            className={cn('p-2 rounded-md cursor-pointer hover:bg-gray-100', {
              'bg-gray-200': selectedTool === tool.type,
            })}
            onClick={() => setSelectedTool(tool.type)}
          >
            <tool.icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
};
