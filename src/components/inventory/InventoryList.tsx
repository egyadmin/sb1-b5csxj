import React, { useState } from 'react';
import { Search, Plus, Filter, Package, ArrowUpDown, Download } from 'lucide-react';
import InventoryTable from './InventoryTable';
import InventoryModal from './InventoryModal';
import InventoryTurnover from './InventoryTurnover';
import { useLanguageStore } from '../../store/languageStore';

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  location: string;
  supplier: string;
  minimumQuantity: number;
  lastUpdated: string;
}

const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'زيت محرك',
    category: 'سوائل',
    quantity: 150,
    unit: 'لتر',
    status: 'in-stock',
    location: 'المستودع الرئيسي',
    supplier: 'شركة الزيوت العالمية',
    minimumQuantity: 50,
    lastUpdated: '2024-03-15',
  },
  {
    id: '2',
    name: 'فلتر هواء',
    category: 'قطع غيار',
    quantity: 25,
    unit: 'قطعة',
    status: 'low-stock',
    location: 'مستودع قطع الغيار',
    supplier: 'شركة الفلاتر المتحدة',
    minimumQuantity: 30,
    lastUpdated: '2024-03-14',
  },
  {
    id: '3',
    name: 'إطارات شاحنة',
    category: 'معدات',
    quantity: 0,
    unit: 'قطعة',
    status: 'out-of-stock',
    location: 'مستودع المعدات',
    supplier: 'شركة الإطارات الكبرى',
    minimumQuantity: 8,
    lastUpdated: '2024-03-13',
  },
];

export default function InventoryList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<InventoryItem['status'] | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة المخزون</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة عنصر جديد</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في المخزون..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir="rtl"
            />
          </div>
        </div>

        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          dir="rtl"
        >
          <option value="all">جميع الفئات</option>
          <option value="سوائل">سوائل</option>
          <option value="قطع غيار">قطع غيار</option>
          <option value="معدات">معدات</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as InventoryItem['status'] | 'all')}
          dir="rtl"
        >
          <option value="all">جميع الحالات</option>
          <option value="in-stock">متوفر</option>
          <option value="low-stock">مخزون منخفض</option>
          <option value="out-of-stock">نفذ المخزون</option>
        </select>
      </div>

      <InventoryTurnover />
      
      <InventoryTable items={filteredInventory} />

      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}