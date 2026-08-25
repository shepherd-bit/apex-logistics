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
  shelfLevel: 1 | 2 | 3 | 4;
  assignedItem: InventoryItem | null; // Kept for backward compatibility
  assignedItems?: InventoryItem[]; // Added for multi-item slots
}

export const INITIAL_ITEMS: InventoryItem[] = [
  { id: 'item-1', name: 'Cast Iron Skillet', sku: 'SKU-205', weight: 'Heavy', pickFrequency: 'High', category: 'Cookware' },
  { id: 'item-2', name: 'Wireless Mouse', sku: 'SKU-101', weight: 'Light', pickFrequency: 'High', category: 'Electronics' },
  { id: 'item-3', name: 'Yoga Mat', sku: 'SKU-309', weight: 'Medium', pickFrequency: 'Medium', category: 'Fitness' },
  { id: 'item-4', name: 'Industrial Drill', sku: 'SKU-412', weight: 'Heavy', pickFrequency: 'Low', category: 'Tools' },
  { id: 'item-5', name: 'USB-C Cable', sku: 'SKU-104', weight: 'Light', pickFrequency: 'High', category: 'Electronics' },
  { id: 'item-6', name: 'Bulk Bottled Water (Case)', sku: 'SKU-501', weight: 'Heavy', pickFrequency: 'High', category: 'Grocery' },
  { id: 'item-7', name: 'Ceramic Coffee Mug', sku: 'SKU-210', weight: 'Medium', pickFrequency: 'Low', category: 'Kitchen' },
  { id: 'item-8', name: 'Mechanical Keyboard', sku: 'SKU-102', weight: 'Medium', pickFrequency: 'High', category: 'Electronics' },
  { id: 'item-9', name: 'Bluetooth Speaker', sku: 'SKU-103', weight: 'Light', pickFrequency: 'Medium', category: 'Electronics' },
  { id: 'item-10', name: 'LED Desk Lamp', sku: 'SKU-105', weight: 'Medium', pickFrequency: 'Low', category: 'Electronics' },
  { id: 'item-11', name: 'Portable Power Bank', sku: 'SKU-106', weight: 'Light', pickFrequency: 'High', category: 'Electronics' },
  { id: 'item-12', name: 'Stainless Steel Water Bottle', sku: 'SKU-211', weight: 'Medium', pickFrequency: 'High', category: 'Kitchen' },
  { id: 'item-13', name: 'Non-Stick Saucepan', sku: 'SKU-212', weight: 'Heavy', pickFrequency: 'Medium', category: 'Cookware' },
  { id: 'item-14', name: 'Chef Knife Set', sku: 'SKU-213', weight: 'Medium', pickFrequency: 'Low', category: 'Kitchen' },
  { id: 'item-15', name: 'Glass Storage Containers', sku: 'SKU-214', weight: 'Heavy', pickFrequency: 'Low', category: 'Kitchen' },
  { id: 'item-16', name: 'Resistance Bands Set', sku: 'SKU-310', weight: 'Light', pickFrequency: 'Medium', category: 'Fitness' },
  { id: 'item-17', name: 'Adjustable Dumbbell', sku: 'SKU-311', weight: 'Heavy', pickFrequency: 'High', category: 'Fitness' },
  { id: 'item-18', name: 'Foam Roller', sku: 'SKU-312', weight: 'Light', pickFrequency: 'Low', category: 'Fitness' },
  { id: 'item-19', name: 'Exercise Ball', sku: 'SKU-313', weight: 'Medium', pickFrequency: 'Low', category: 'Fitness' },
  { id: 'item-20', name: 'Cordless Leaf Blower', sku: 'SKU-413', weight: 'Heavy', pickFrequency: 'Low', category: 'Tools' },
  { id: 'item-21', name: 'Digital Multimeter', sku: 'SKU-414', weight: 'Light', pickFrequency: 'Medium', category: 'Tools' },
  { id: 'item-22', name: 'Heavy Duty Tool Chest', sku: 'SKU-415', weight: 'Heavy', pickFrequency: 'Low', category: 'Tools' },
  { id: 'item-23', name: 'Screwdriver Assortment', sku: 'SKU-416', weight: 'Medium', pickFrequency: 'High', category: 'Tools' },
  { id: 'item-24', name: 'Organic Honey (Case)', sku: 'SKU-502', weight: 'Medium', pickFrequency: 'Medium', category: 'Grocery' },
  { id: 'item-25', name: 'Artisan Coffee Beans', sku: 'SKU-503', weight: 'Light', pickFrequency: 'High', category: 'Grocery' },
  { id: 'item-26', name: 'Canned Olive Oil Pack', sku: 'SKU-504', weight: 'Heavy', pickFrequency: 'Medium', category: 'Grocery' },
  { id: 'item-27', name: 'Herbal Tea Selection', sku: 'SKU-505', weight: 'Light', pickFrequency: 'Low', category: 'Grocery' },
  { id: 'item-28', name: 'Ergonomic Office Chair', sku: 'SKU-601', weight: 'Heavy', pickFrequency: 'Low', category: 'Furniture' },
  { id: 'item-29', name: 'Standing Desk Converter', sku: 'SKU-602', weight: 'Heavy', pickFrequency: 'Medium', category: 'Furniture' },
  { id: 'item-30', name: 'Monitor Arm Mount', sku: 'SKU-603', weight: 'Medium', pickFrequency: 'Medium', category: 'Furniture' },
];

export const INITIAL_BINS: WarehouseBin[] = [
  { id: 'bin-101', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 1, assignedItem: null, assignedItems: [] },
  { id: 'bin-102', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 2, assignedItem: null, assignedItems: [] },
  { id: 'bin-103', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 3, assignedItem: null, assignedItems: [] },
  { id: 'bin-104', zone: 'Aisle 1 (Fast Pick)', shelfLevel: 4, assignedItem: null, assignedItems: [] },
  { id: 'bin-201', zone: 'Aisle 2 (Standard)', shelfLevel: 1, assignedItem: null, assignedItems: [] },
  { id: 'bin-202', zone: 'Aisle 2 (Standard)', shelfLevel: 2, assignedItem: null, assignedItems: [] },
  { id: 'bin-203', zone: 'Aisle 2 (Standard)', shelfLevel: 3, assignedItem: null, assignedItems: [] },
  { id: 'bin-204', zone: 'Aisle 2 (Standard)', shelfLevel: 4, assignedItem: null, assignedItems: [] },
  { id: 'bin-301', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 1, assignedItem: null, assignedItems: [] },
  { id: 'bin-302', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 2, assignedItem: null, assignedItems: [] },
  { id: 'bin-303', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 3, assignedItem: null, assignedItems: [] },
  { id: 'bin-304', zone: 'Aisle 3 (Bulk/Heavy)', shelfLevel: 4, assignedItem: null, assignedItems: [] },
];

export function getBinHeatmapStatus(bin: WarehouseBin): { status: 'optimal' | 'warning' | 'danger' | 'empty'; message: string; color: string } {
  const currentItems = bin.assignedItems || (bin.assignedItem ? [bin.assignedItem] : []);

  if (currentItems.length === 0) {
    return { status: 'empty', message: 'Empty slot', color: 'bg-slate-50 border-dashed border-slate-300' };
  }

  // Check if any item in this bin has a danger condition (Heavy item on top shelf 4)
  const hasDanger = currentItems.some((item) => item.weight === 'Heavy' && bin.shelfLevel === 4);
  if (hasDanger) {
    return { 
      status: 'danger', 
      message: 'Ergonomic Hazard: Heavy item stored on top shelf!', 
      color: 'bg-red-50 border-red-300 text-red-900 shadow-sm' 
    };
  }

  // Check if any item has a warning condition
  const hasWarning = currentItems.some((item) => item.pickFrequency === 'High' && bin.zone === 'Aisle 3 (Bulk/Heavy)');
  if (hasWarning) {
    return { 
      status: 'warning', 
      message: 'Inefficient Travel: High-pick item placed in distant zone.', 
      color: 'bg-amber-50 border-amber-300 text-amber-900 shadow-sm' 
    };
  }

  return { 
    status: 'optimal', 
    message: 'Optimal Placement', 
    color: 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm' 
  };
}