import { useState } from 'react';
import Navbar from './components/Navbar';
import InventorySidebar from './components/InventorySidebar';
import WarehouseGrid from './components/WarehouseGrid';
import OptimizationPanel from './components/OptimizationPanel';
import LevelPopUp from './components/LevelPopUp';
import { INITIAL_BINS, INITIAL_ITEMS } from './components/MockData';
import type { WarehouseBin, InventoryItem } from './components/MockData';

export default function App() {
  const [bins, setBins] = useState<WarehouseBin[]>(INITIAL_BINS);
  const [items, setItems] = useState<InventoryItem[]>(INITIAL_ITEMS);
  const [heatmapEnabled, setHeatmapEnabled] = useState<boolean>(true);
  
  // State to manage the active popup modal for a specific bin level
  const [activePopupBin, setActivePopupBin] = useState<WarehouseBin | null>(null);

  const handleResetLayout = () => {
    setBins(INITIAL_BINS);
    setItems(INITIAL_ITEMS);
    setActivePopupBin(null);
  };

  const handleDropItem = (binId: string, itemId: string) => {
    const itemToAssign = items.find((i) => i.id === itemId);
    if (!itemToAssign) return;

    setBins((prevBins) =>
      prevBins.map((bin) => {
        if (bin.id === binId) {
          // Support multiple items per level by appending to the existing array
          const currentItems = bin.assignedItems || (bin.assignedItem ? [bin.assignedItem] : []);
          const updatedItems = [...currentItems, itemToAssign];
          
          const updatedBin = { 
            ...bin, 
            assignedItems: updatedItems,
            assignedItem: updatedItems[0] // Fallback for backward compatibility if needed
          };

          // If the popup is currently open for this bin, update it live
          if (activePopupBin && activePopupBin.id === binId) {
            setActivePopupBin(updatedBin);
          }

          return updatedBin;
        }
        return bin;
      })
    );

    // Remove item from unassigned inventory sidebar list
    setItems((prevItems) => prevItems.filter((i) => i.id !== itemId));
  };

  // Remove or cancel an individual item from a bin and send it straight to the top of unassigned inventory
  const handleRemoveSingleItem = (binId: string, itemId: string) => {
    let itemToReturn: InventoryItem | null = null;

    setBins((prevBins) =>
      prevBins.map((bin) => {
        if (bin.id === binId) {
          const currentItems = bin.assignedItems || (bin.assignedItem ? [bin.assignedItem] : []);
          itemToReturn = currentItems.find((i) => i.id === itemId) || null;
          
          const updatedItems = currentItems.filter((i) => i.id !== itemId);
          const updatedBin = { 
            ...bin, 
            assignedItems: updatedItems,
            assignedItem: updatedItems.length > 0 ? updatedItems[0] : null 
          };

          // Update active popup live if open
          if (activePopupBin && activePopupBin.id === binId) {
            setActivePopupBin(updatedBin);
          }

          return updatedBin;
        }
        return bin;
      })
    );

    if (itemToReturn) {
      // Return straight back to the top of the unassigned inventory list
      setItems((prevItems) => [itemToReturn!, ...prevItems]);
    }
  };

  // Legacy fallback if removing the whole bin contents at once
  const handleRemoveItem = (binId: string) => {
    const targetBin = bins.find((b) => b.id === binId);
    if (!targetBin) return;
    
    const itemsToReturn = targetBin.assignedItems || (targetBin.assignedItem ? [targetBin.assignedItem] : []);
    
    setBins((prevBins) =>
      prevBins.map((bin) => {
        if (bin.id === binId) {
          const clearedBin = { ...bin, assignedItems: [], assignedItem: null };
          if (activePopupBin && activePopupBin.id === binId) {
            setActivePopupBin(null);
          }
          return clearedBin;
        }
        return bin;
      })
    );

    if (itemsToReturn.length > 0) {
      setItems((prevItems) => [...itemsToReturn, ...prevItems]);
    }
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col text-slate-800 bg-slate-100">
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
          onOpenPopup={(bin) => setActivePopupBin(bin)}
        />
        <OptimizationPanel bins={bins} />
      </div>

      {/* Pop-up modal when clicking bin badge counts */}
      {activePopupBin && (
        <LevelPopUp 
          bin={activePopupBin} 
          onClose={() => setActivePopupBin(null)} 
          onRemoveItem={(itemId) => handleRemoveSingleItem(activePopupBin.id, itemId)}
        />
      )}
    </div>
  );
}