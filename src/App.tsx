import Navbar from './components/Navbar';
import InventorySidebar from './components/InventorySidebar';
import WarehouseGrid from './components/WarehouseGrid';
import OptimizationPanel from './components/OptimizationPanel';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-800">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <InventorySidebar />
        <WarehouseGrid />
        <OptimizationPanel />
      </div>
    </div>
  );
}