import { useState } from 'react';
import { PackageOpen, Search, GripVertical } from 'lucide-react';
import type { InventoryItem } from './MockData';

interface InventorySidebarProps {
  items: InventoryItem[];
}

export default function InventorySidebar({ items }: InventorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWeight, setSelectedWeight] = useState<string>('All');

  // Filter unassigned items based on search and weight
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWeight = selectedWeight === 'All' || item.weight === selectedWeight;
    return matchesSearch && matchesWeight;
  });

  return (
    <aside className="w-80 bg-white border-r-2 border-slate-300 flex flex-col h-full shadow-sm">
      {/* Sidebar Header */}
      <div className="p-4 border-b-2 border-slate-300 bg-slate-50/50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PackageOpen className="w-4 h-4 text-indigo-600" />
            <h2 className="font-bold text-slate-900 text-sm">Unassigned Inventory</h2>
          </div>
          <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200">
            {filteredItems.length} items
          </span>
        </div>

        {/* Search Input */}
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search SKU or item name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border-2 border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 font-medium text-slate-800 placeholder-slate-400 shadow-xs"
          />
        </div>

        {/* Weight Filters */}
        <div className="flex gap-1.5">
          {['All', 'Light', 'Medium', 'Heavy'].map((weight) => (
            <button
              key={weight}
              onClick={() => setSelectedWeight(weight)}
              className={`flex-1 py-1 text-[11px] font-semibold rounded-lg border-2 transition-colors ${
                selectedWeight === weight
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
              }`}
            >
              {weight}
            </button>
          ))}
        </div>
      </div>

      {/* Items Scrollable List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 px-4 border-2 border-dashed border-slate-300 rounded-xl bg-white">
            <p className="text-xs font-medium text-slate-500">No unassigned items found.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', item.id);
              }}
              className="bg-white border-2 border-slate-300 rounded-xl p-3 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-grab active:cursor-grabbing group"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                    {item.sku}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900 mt-1">{item.name}</h3>
                </div>
                <GripVertical className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors shrink-0" />
              </div>

              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                  item.weight === 'Heavy' 
                    ? 'bg-red-50 text-red-700 border-red-200' 
                    : item.weight === 'Medium' 
                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {item.weight} Weight
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Pick: {item.pickFrequency}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}