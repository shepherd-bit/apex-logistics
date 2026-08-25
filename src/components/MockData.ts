export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  weight: 'Light' | 'Medium' | 'Heavy';
  pickFrequency: 'High' | 'Medium' | 'Low';
  category: string;
}

export interface WarehouseBin {
  id: string;
  zone: 'Aisle 1 (Fast Pick)' | 'Aisle 2 (Standard)' | 'Aisle 3 (Bulk/Heavy)';
  shelfLevel: 1 | 2 | 3 | 4; // Level 1 is floor level (best for heavy), Level 4 is top shelf
  assignedItem: InventoryItem | null;
}

export const INITIAL_ITEMS: InventoryItem[] = [
  { id: 'item-1', name: 'Cast Iron Skillet', sku: 'SKU-205', weight: 'Heavy', pickFrequency: 'High', category: 'Cookware' },
  { id: 'item-2', name: 'Wireless Mouse', sku: 'SKU-101', weight: 'Light', pickFrequency: 'High', category: 'Electronics' },
  { id: 'item-3', name: 'Yoga Mat', sku: 'SKU-309', weight: 'Medium', pickFrequency: 'Medium', category: 'Fitness' },
  { id: 'item-4', name: 'Industrial Drill', sku: 'SKU-412', weight: 'Heavy', pickFrequency: 'Low', category: 'Tools' },
  { id: 'item-5', name: 'USB-C Cable', sku: 'SKU-104', weight: 'Light', pickFrequency: 'High', category: 'Electronics' },
  { id: 'item-6', name: 'Bulk Bottled Water (Case)', sku: 'SKU-501', weight: 'Heavy', pickFrequency: 'High', category: 'Grocery' },
  { id: 'item-7', name: 'Ceramic Coffee Mug', sku: 'SKU-210', weight: 'Medium', pickFrequency: 'Low', category: 'Kitchen' },
];

export const INITIAL_BINS: WarehouseBin[] = [
  // Aisle 1 (Fast Pick - closest to packing station)
  { id: 'bin-101', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 1, assignedItem: null },
  { id: 'bin-102', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 2, assignedItem: null },
  { id: 'bin-103', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 3, assignedItem: null },
  { id: 'bin-104', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 4, assignedItem: null },

  // Aisle 2 (Standard zone)
  { id: 'bin-201', zone: 'Aisle 2 (Standard)', shelfLevel: 1, assignedItem: null },
  { id: 'bin-202', zone: 'Aisle 2 (Standard)', shelfLevel: 2, assignedItem: null },
  { id: 'bin-203', zone: 'Aisle 2 (Standard)', shelfLevel: 3, assignedItem: null },
  { id: 'bin-204', zone: 'Aisle 2 (Standard)', shelfLevel: 4, assignedItem: null },

  // Aisle 3 (Bulk / Heavy zone - further away)
  { id: 'bin-301', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 1, assignedItem: null },
  { id: 'bin-302', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 2, assignedItem: null },
  { id: 'bin-303', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 3, assignedItem: null },
  { id: 'bin-304', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 4, assignedItem: null },
];

/**
 * Calculates safety / efficiency score and returns heatmap color class
 * Rule: Heavy items on Level 4 = Ergonomic Hazard (Red)
 * Rule: High pick frequency in Aisle 1 (Levels 1-2) = Optimal (Green)
 */
export function getBinHeatmapStatus(bin: WarehouseBin): { status: 'optimal' | 'warning' | 'danger' | 'empty'; message: string; color: string } {
  if (!bin.assignedItem) {
    return { status: 'empty', message: 'Empty slot', color: 'bg-slate-50 border-dashed border-slate-300' };
  }

  const { weight, pickFrequency } = bin.assignedItem;

  // Danger: Heavy item on top shelf (Level 4) is an extreme ergonomic hazard
  if (weight === 'Heavy' && bin.shelfLevel === 4) {
    return { 
      status: 'danger', 
      message: 'Ergonomic Hazard: Heavy item stored on top shelf!', 
      color: 'bg-red-50 border-red-300 text-red-900 shadow-sm' 
    };
  }

  // Warning: High pick frequency item placed far away in Aisle 3
  if (pickFrequency === 'High' && bin.zone === 'Aisle 3 (Bulk/Heavy)') {
    return { 
      status: 'warning', 
      message: 'Inefficient Travel: High-pick item placed in distant zone.', 
      color: 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm' 
    };
  }

  // Optimal: High pick frequency in Aisle 1 (Low shelf levels) or Light item anywhere
  if ((pickFrequency === 'High' && bin.zone === 'Aisle 1 (Fast Pick)' && bin.shelfLevel <= 2) || (weight === 'Light')) {
    return { 
      status: 'optimal', 
      message: 'Optimal Placement', 
      color: 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm' 
    };
  }

  return { 
    status: 'optimal', 
    message: 'Acceptable Placement', 
    color: 'bg-white border-slate-200 text-slate-800 shadow-xs' 
  };
}