import type { WarehouseBin } from './MockData';
import BinCard from './BinCard';

interface WarehouseGridProps {
  bins: WarehouseBin[];
  heatmapEnabled: boolean;
  onDropItem: (binId: string, itemId: string) => void;
  onRemoveItem: (binId: string) => void;
}

export default function WarehouseGrid({ bins, heatmapEnabled, onDropItem, onRemoveItem }: WarehouseGridProps) {
  // Group bins by their respective zones
  const zones = Array.from(new Set(bins.map((b) => b.zone)));

  return (
    <main className="flex-1 bg-slate-100 p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border-2 border-slate-300 shadow-sm">
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Warehouse Layout & Storage Bins</h2>
            <p className="text-xs text-slate-500 font-medium">Drag and drop inventory items onto shelves to optimize slotting.</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-300">
            {bins.filter(b => b.assignedItem !== null).length} / {bins.length} Slots Occupied
          </span>
        </div>

        {zones.map((zone) => {
          const zoneBins = bins.filter((b) => b.zone === zone);
          return (
            <div key={zone} className="bg-white border-2 border-slate-300 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-slate-200">
                <h3 className="font-bold text-slate-800 text-xs tracking-wide uppercase">{zone}</h3>
                <span className="text-[11px] font-semibold text-slate-500">
                  {zoneBins.filter(b => b.assignedItem !== null).length} / {zoneBins.length} Filled
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {zoneBins.map((bin) => (
                  <div
                    key={bin.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      const itemId = e.dataTransfer.getData('text/plain');
                      if (itemId) onDropItem(bin.id, itemId);
                    }}
                  >
                    <BinCard
                      bin={bin}
                      heatmapEnabled={heatmapEnabled}
                      onDropItem={() => {}}
                      onRemoveItem={onRemoveItem}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}