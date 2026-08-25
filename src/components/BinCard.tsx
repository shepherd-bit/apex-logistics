import { Package, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { WarehouseBin } from './MockData';
import { getBinHeatmapStatus } from './MockData';

interface BinCardProps {
  bin: WarehouseBin;
  heatmapEnabled: boolean;
  onDropItem: (binId: string) => void;
  onRemoveItem: (binId: string) => void;
  onOpenPopup: (bin: WarehouseBin) => void;
}

export default function BinCard({ bin, heatmapEnabled, onDropItem, onRemoveItem, onOpenPopup }: BinCardProps) {
  const heatmap = getBinHeatmapStatus(bin);
  const items = bin.assignedItems || (bin.assignedItem ? [bin.assignedItem] : []);
  const hasItems = items.length > 0;

  // Determine card styling based on heatmap toggle and bin status
  const cardStyle = heatmapEnabled
    ? heatmap.color
    : hasItems 
    ? 'bg-white border-slate-300 text-slate-800 shadow-sm' 
    : 'bg-slate-50/50 border-dashed border-slate-300 text-slate-400';

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropItem(bin.id)}
      className={`border-2 rounded-xl p-3.5 transition-all flex flex-col justify-between min-h-[110px] ${cardStyle}`}
    >
      {/* Bin Header */}
      <div className="flex items-center justify-between text-[11px] font-bold">
        <span className="text-slate-600 uppercase tracking-wide">Level {bin.shelfLevel}</span>
        <div className="flex items-center gap-1.5">
          {hasItems && (
            <button
              onClick={() => onOpenPopup(bin)}
              className="px-2 py-0.5 bg-slate-900 text-white rounded-full text-[10px] font-bold shadow hover:bg-slate-700 transition-colors cursor-pointer"
              title="Click to view all items in this level"
            >
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </button>
          )}
          {heatmapEnabled && hasItems && (
            <span>
              {heatmap.status === 'danger' && <AlertTriangle className="w-4 h-4 text-red-600" />}
              {heatmap.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
              {heatmap.status === 'optimal' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </span>
          )}
        </div>
      </div>

      {/* Bin Content */}
      <div className="my-2">
        {hasItems ? (
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/80 border border-slate-300 uppercase">
                  {items[0].sku}
                </span>
                <span className="text-xs font-bold truncate max-w-[120px]">
                  {items.length === 1 ? items[0].name : `${items[0].name} (+${items.length - 1} more)`}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium opacity-80">
                <span>{items[0].weight}</span>
                <span>•</span>
                <span>Pick: {items[0].pickFrequency}</span>
              </div>
            </div>
            <button
              onClick={() => onRemoveItem(bin.id)}
              className="text-slate-400 hover:text-red-600 transition-colors p-1"
              title="Clear all items from bin"
            >
              <XCircle className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <Package className="w-5 h-5 text-slate-300 mb-1" />
            <span className="text-[11px] font-medium text-slate-400">Drop inventory item here</span>
          </div>
        )}
      </div>

      {/* Heatmap Status Footer */}
      {heatmapEnabled && hasItems && (
        <div className="text-[10px] font-semibold pt-1.5 border-t border-current/10 flex items-center gap-1">
          <span className="truncate">{heatmap.message}</span>
        </div>
      )}
    </div>
  );
}