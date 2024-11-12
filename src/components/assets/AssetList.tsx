import React, { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Asset } from '../../types';
import AssetCard from './AssetCard';
import Modal from './AssetModal';
import AssetForm from './AssetForm';
import AssetDetails from './AssetDetails';

const mockAssets: Asset[] = [
  {
    id: '1',
    serialNumber: 'AST001',
    name: 'مولد كهربائي صناعي',
    location: 'المستودع الرئيسي',
    status: 'active',
    purchaseDate: '2023-01-15',
    lastMaintenance: '2024-02-20',
  },
  {
    id: '2',
    serialNumber: 'AST002',
    name: 'رافعة شوكية',
    location: 'مستودع الشحن',
    status: 'maintenance',
    purchaseDate: '2022-11-30',
    lastMaintenance: '2024-03-01',
  },
];

export default function AssetList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Asset['status'] | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.includes(searchTerm) || 
                         asset.serialNumber.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateAsset = (data: Partial<Asset>) => {
    // TODO: Implement asset creation
    console.log('Creating asset:', data);
    setIsCreateModalOpen(false);
  };

  const handleUpdateAsset = (data: Partial<Asset>) => {
    // TODO: Implement asset update
    console.log('Updating asset:', data);
    setIsEditModalOpen(false);
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة الأصول</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>إضافة أصل جديد</span>
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="البحث عن الأصول..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            dir="rtl"
          />
        </div>
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Asset['status'] | 'all')}
          dir="rtl"
        >
          <option value="all">جميع الحالات</option>
          <option value="active">نشط</option>
          <option value="maintenance">قيد الصيانة</option>
          <option value="retired">متقاعد</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map(asset => (
          <AssetCard 
            key={asset.id} 
            asset={asset} 
            onViewDetails={() => handleViewDetails(asset)}
          />
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="إضافة أصل جديد"
      >
        <AssetForm
          onSubmit={handleCreateAsset}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {selectedAsset && (
        <>
          <Modal
            isOpen={isDetailsModalOpen}
            onClose={() => setIsDetailsModalOpen(false)}
            title="تفاصيل الأصل"
          >
            <AssetDetails
              asset={selectedAsset}
              onEdit={() => {
                setIsDetailsModalOpen(false);
                setIsEditModalOpen(true);
              }}
              onClose={() => setIsDetailsModalOpen(false)}
            />
          </Modal>

          <Modal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            title="تعديل الأصل"
          >
            <AssetForm
              initialData={selectedAsset}
              onSubmit={handleUpdateAsset}
              onCancel={() => setIsEditModalOpen(false)}
              isEdit
            />
          </Modal>
        </>
      )}
    </div>
  );
}