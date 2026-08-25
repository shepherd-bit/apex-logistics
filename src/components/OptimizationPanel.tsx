import { Sparkles, AlertTriangle, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import type { WarehouseBin } from './MockData';

interface OptimizationPanelProps {
  bins: WarehouseBin[];
}

export default function OptimizationPanel({ bins }: OptimizationPanelProps) {
  const filledBins = bins.filter((b) => b.assignedItem !== null);
  
  // Calculate specific insights
  const hazards = filledBins.filter((b) => b.assignedItem!.weight === 'Heavy' && b.shelfLevel === 4);
  const inefficientPicks = filledBins.filter((b) => b.assignedItem!.pickFrequency === 'High' && b.zone === 'Aisle 3 (Bulk/Heavy)');

  const hasIssues = hazards.length > 0 || inefficientPicks.length > 0;

  return (
    <aside className="w-80 bg-white border-l-2 border-slate-300 flex flex-col h-full shadow-sm">
      {/* Panel Header */}
      <div className="p-4 border-b-2 border-slate-300 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Slotting Analytics</h2>
            <p className="text-[11px] text-slate-500 font-medium">AI-powered layout intelligence</p>
          </div>
        </div>
      </div>

      {/* Analytics Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
        {/* Quick Stats Summary */}
        <div className="bg-white border-2 border-slate-300 rounded-xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Ergonomic Compliance</span>
            <span className={hazards.length === 0 ? 'text-emerald-600' : 'text-red-600'}>
              {hazards.length === 0 ? '100% Safe' : `${hazards.length} Hazard(s)`}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>Travel Efficiency</span>
            <span className={inefficientPicks.length === 0 ? 'text-emerald-600' : 'text-amber-600'}>
              {inefficientPicks.length === 0 ? 'Optimal' : 'Needs Review'}
            </span>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-indigo-600" />
            AI Recommendations
          </h3>

          {!hasIssues && filledBins.length > 0 ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Layout looks great!</h4>
                  <p className="text-[11px] text-emerald-700 mt-1 leading-relaxed">
                    No ergonomic hazards or high-pick travel inefficiencies detected in current placements.
                  </p>
                </div>
              </div>
            </div>
          ) : filledBins.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-xl p-4 text-center">
              <p className="text-xs font-medium text-slate-500">
                Place items into warehouse bins to generate real-time AI slotting recommendations.
              </p>
            </div>
          ) : null}

          {/* Hazard Alerts */}
          {hazards.map((bin) => (
            <div key={`hazard-${bin.id}`} className="bg-red-50 border-2 border-red-300 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-red-900">Ergonomic Hazard</h4>
                  <p className="text-[11px] text-red-700 mt-1 leading-relaxed">
                    <span className="font-bold">{bin.assignedItem?.name}</span> (Heavy) is stored on Level 4 ({bin.zone}). Move to floor level.
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Inefficient Placement Alerts */}
          {inefficientPicks.map((bin) => (
            <div key={`inefficient-${bin.id}`} className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3.5 shadow-xs">
              <div className="flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-900">High Pick Travel Delay</h4>
                  <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">
                    <span className="font-bold">{bin.assignedItem?.name}</span> has High pick frequency but is placed in Aisle 3. Move to Aisle 1.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}