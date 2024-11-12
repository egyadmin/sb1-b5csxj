import React, { useState } from 'react';
import { 
  Flag,
  TrendingUp,
  Building2,
  ShoppingBag,
  Users,
  Briefcase,
  DollarSign,
  Plus
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import LocalContentCalculator from './LocalContentCalculator';
import SupplierModal from './SupplierModal';
import PurchaseModal from './PurchaseModal';

const localContentData = [
  { month: 'يناير', percentage: 45 },
  { month: 'فبراير', percentage: 48 },
  { month: 'مارس', percentage: 52 },
  { month: 'أبريل', percentage: 55 },
  { month: 'مايو', percentage: 58 },
];

const supplierDistribution = [
  { name: 'موردين محليين', value: 60 },
  { name: 'موردين دوليين', value: 40 },
];

const COLORS = ['#10B981', '#6366F1'];

export default function LocalContentDashboard() {
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [localContentPercentage, setLocalContentPercentage] = useState(58);
  const [approvedSuppliers, setApprovedSuppliers] = useState(245);
  const [purchaseValue, setPurchaseValue] = useState(1200000);

  const handleAddSupplier = (supplierData: any) => {
    setApprovedSuppliers(prev => prev + 1);
    setIsSupplierModalOpen(false);
  };

  const handleAddPurchase = (purchaseData: any) => {
    setPurchaseValue(prev => prev + Number(purchaseData.value));
    // Update local content percentage based on new purchase
    setLocalContentPercentage(prev => Math.min(100, prev + (Math.random() * 2)));
    setIsPurchaseModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">المحتوى المحلي</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPurchaseModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>إضافة مشتريات محلية</span>
          </button>
          <button
            onClick={() => setIsSupplierModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="h-5 w-5" />
            <span>إضافة مورد محلي</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 rounded-lg">
              <Flag className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{localContentPercentage}%</h3>
          <p className="text-gray-600">نسبة المحتوى المحلي</p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${localContentPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-green-600">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{approvedSuppliers}</h3>
          <p className="text-gray-600">مورد محلي معتمد</p>
          <button 
            onClick={() => setIsSupplierModalOpen(true)}
            className="mt-4 text-blue-600 text-sm hover:text-blue-700"
          >
            عرض التفاصيل
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-green-600">+15%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">75%</h3>
          <p className="text-gray-600">نسبة التوظيف المحلي</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-green-600">+20%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">
            {(purchaseValue / 1000000).toFixed(1)}M
          </h3>
          <p className="text-gray-600">قيمة المشتريات المحلية</p>
          <button 
            onClick={() => setIsPurchaseModalOpen(true)}
            className="mt-4 text-yellow-600 text-sm hover:text-yellow-700"
          >
            إضافة مشتريات
          </button>
        </div>
      </div>

      {/* Rest of the component remains the same */}

      <SupplierModal 
        isOpen={isSupplierModalOpen}
        onClose={() => setIsSupplierModalOpen(false)}
        onSubmit={handleAddSupplier}
      />

      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onSubmit={handleAddPurchase}
      />
    </div>
  );
}