import { useState } from 'react';
import Navbar from './components/Navbar';
import InventorySidebar from './components/InventorySidebar';
import WarehouseGrid from './components/WarehouseGrid';
import OptimizationPanel from './components/OptimizationPanel';
import { INITIAL_BINS, INITIAL_ITEMS } from './components/MockData';
import type { WarehouseBin, InventoryItem } from './components/MockData';

export default function App() {
  const [bins, setBins] = useState<WarehouseBin[]>(INITIAL_BINS);
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [heatmapEnabled, setHeatmapEnabled] = useState<boolean>(true);

  const handleResetLayout = () => {
    setBins(INITIAL_BINS);
    setItems(INITIAL_ITEMS);
  };

  const handleDropItem = (binId: string, itemId: string) => {
    const itemToAssign = items.find((i) => i.id === itemId);
    if (!itemToAssign) return;

    setBins((prevBins) =>
      prevBins.map((bin) => {
        if (bin.id === binId) {
          return { ...bin, assignedItem: itemToAssign };
        }
        return bin;
      })
    );

    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  const handleRemoveItem = (binId: string) => {
    let removedItem: InventoryItem | null = null;

    setBins((prevBins) =>
      prevBins.map((bin) => {
        if (bin.id === binId) {
          removedItem = bin.assignedItem;
          return { ...bin, assignedItem: null };
        }
        return bin;
      })
    );

    if (removedItem) {
      setItems((prevItems) => [...prevItems, removedItem!]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <Navbar 
        bins={bins} 
        onResetLayout={handleResetLayout} 
        heatmapEnabled={heatmapEnabled} 
        onToggleHeatmap={() => setHeatmapEnabled(!heatmapEnabled)} 
      />
      <div className="flex-1 flex overflow-hidden">
        <InventorySidebar items={items} />
        <WarehouseGrid 
          bins={bins} 
          heatmapEnabled={heatmapEnabled} 
          onDropItem={handleDropItem} 
          onRemoveItem={handleRemoveItem} 
        />
        <OptimizationPanel />
      </div>
    </div>
  );
}