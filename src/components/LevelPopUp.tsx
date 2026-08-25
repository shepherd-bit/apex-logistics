import type { WarehouseBin, InventoryItem } from './MockData';

interface LevelPopUpProps {
  bin: WarehouseBin;
  onClose: () => void;
  onRemoveItem: (itemId: string) => void;
}

export default function LevelPopUp({ bin, onClose, onRemoveItem }: LevelPopUpProps) {
  const items: InventoryItem[] = bin.assignedItems || (bin.assignedItem ? [bin.assignedItem] : []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-slate-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-lg">{bin.zone} — Level {bin.shelfLevel}</h3>
            <p className="text-xs text-slate-400">Assigned Inventory Items ({items.length})</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl font-bold px-2 py-1 rounded"
          >
            ✕
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-slate-500 py-8">No items assigned to this level yet.</p>
          ) : (
            items.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">
                      {item.sku}
                    </span>
                    <h4 className="font-medium text-slate-800 text-sm">{item.name}</h4>
                  </div>
                  <div className="text-xs text-slate-500 mt-1 flex gap-3">
                    <span>Weight: <strong className="text-slate-700">{item.weight}</strong></span>
                    <span>Pick Freq: <strong className="text-slate-700">{item.pickFrequency}</strong></span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 font-medium text-xs rounded-md transition-colors border border-red-200"
                >
                  Cancel
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}