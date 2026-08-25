import { Package, ShieldAlert, RotateCcw, LayoutDashboard, Flame } from 'lucide-react';
import type { WarehouseBin } from './MockData';

interface NavbarProps {
  bins: WarehouseBin[];
  onResetLayout: () => void;
  heatmapEnabled: boolean;
  onToggleHeatmap: () => void;
}

export default function Navbar({ bins, onResetLayout, heatmapEnabled, onToggleHeatmap }: NavbarProps) {
  const totalBins = bins.length;
  const filledBins = bins.filter((b) => b.assignedItem !== null);
  const filledCount = filledBins.length;

  let optimalCount = 0;
  filledBins.forEach((b) => {
    const { assignedItem, shelfLevel, zone } = b;
    const { weight, pickFrequency } = assignedItem!;
    const isHazard = weight === 'Heavy' && shelfLevel === 4;
    const isInefficient = pickFrequency === 'High' && zone === 'Aisle 3 (Bulk/Heavy)';
    if (!isHazard && !isInefficient) {
      optimalCount++;
    }
  });

  const efficiencyScore = filledCount > 0 ? Math.round((optimalCount / filledCount) * 100) : 100;

  return (
    <header className="bg-white border-b-2 border-slate-300 px-8 py-3.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* App Branding */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white border border-indigo-700 shadow-sm">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-tight">Apex Logistics</h1>
            <p className="text-xs text-slate-500 font-medium">Warehouse Slotting & Inventory Heatmap Engine</p>
          </div>
        </div>

        {/* Metrics Center */}
        <div className="hidden md:flex items-center gap-6 bg-slate-50 px-5 py-2 rounded-xl border-2 border-slate-300 shadow-xs">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-600 font-medium">Placed:</span>
            <span className="text-xs font-bold text-slate-900">{filledCount} / {totalBins}</span>
          </div>
          <div className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-indigo-600" />
            <span className="text-xs text-slate-600 font-medium">Slotting Efficiency:</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${efficiencyScore >= 80 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : efficiencyScore >= 50 ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-red-50 text-red-800 border-red-300'}`}>
              {efficiencyScore}%
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Thermal Heatmap Toggle Switch */}
          <button
            onClick={onToggleHeatmap}
            type="button"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer group"
            title="Toggle Warehouse Heatmap"
          >
            <div className="flex items-center gap-1.5">
              <Flame className={`w-3.5 h-3.5 transition-colors ${heatmapEnabled ? 'text-rose-500' : 'text-slate-400'}`} />
              <span className="text-xs font-semibold text-slate-700">Heatmap</span>
            </div>
            
            {/* The Switch Track */}
            <div 
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-all duration-300 shadow-inner ${
                heatmapEnabled 
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 shadow-rose-200' 
                  : 'bg-slate-300'
              }`}
            >
              {/* The White Knob */}
              <div 
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  heatmapEnabled ? 'translate-x-4' : 'translate-x-0'
                }`} 
              />
            </div>
          </button>

          {/* Reset Layout Button */}
          <button
            onClick={onResetLayout}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border-2 border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-xs"
            title="Clear all assigned items from layout"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Reset Layout
          </button>
        </div>
      </div>
    </header>
  );
}