import { Package, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import type { WarehouseBin } from './MockData';
import { getBinHeatmapStatus } from './MockData';

interface BinCardProps {
  bin: WarehouseBin;
  heatmapEnabled: boolean;
  onDropItem: (binId: string) => void;
  onRemoveItem: (binId: string) => void;
}

export default function BinCard({ bin, heatmapEnabled, onDropItem, onRemoveItem }: BinCardProps) {
  const heatmap = getBinHeatmapStatus(bin);

  // Determine card styling based on heatmap toggle and bin status
  const cardStyle = heatmapEnabled
    ? heatmap.color
    : bin.assignedItem 
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
        <span className="text-slate-600 uppercase tracking-wide">{bin.zone} — Level {bin.shelfLevel}</span>
        {heatmapEnabled && bin.assignedItem && (
          <span>
            {heatmap.status === 'danger' && <AlertTriangle className="w-4 h-4 text-red-600" />}
            {heatmap.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
            {heatmap.status === 'optimal' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          </span>
        )}
      </div>

      {/* Bin Content */}
      <div className="my-2">
        {bin.assignedItem ? (
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/80 border border-slate-300 uppercase">
                  {bin.assignedItem.sku}
                </span>
                <span className="text-xs font-bold truncate max-w-[120px]">{bin.assignedItem.name}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5 text-[10px] font-medium opacity-80">
                <span>{bin.assignedItem.weight}</span>
                <span>•</span>
                <span>Pick: {bin.assignedItem.pickFrequency}</span>
              </div>
            </div>
            <button
              onClick={() => onRemoveItem(bin.id)}
              className="text-slate-400 hover:text-red-600 transition-colors p-1"
              title="Remove item"
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
      {heatmapEnabled && bin.assignedItem && (
        <div className="text-[10px] font-semibold pt-1.5 border-t border-current/10 flex items-center gap-1">
          <span className="truncate">{heatmap.message}</span>
        </div>
      )}
    </div>
  );
}