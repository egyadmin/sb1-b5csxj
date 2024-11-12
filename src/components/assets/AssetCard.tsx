import React from 'react';
import { WrenchIcon, MapPin, Calendar } from 'lucide-react';
import { Asset } from '../../types';

const statusColors = {
  active: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  retired: 'bg-red-100 text-red-800',
};

const statusLabels = {
  active: 'نشط',
  maintenance: 'قيد الصيانة',
  retired: 'متقاعد',
};

interface AssetCardProps {
  asset: Asset;
  onViewDetails: () => void;
}

export default function AssetCard({ asset, onViewDetails }: AssetCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="rtl">
          <h3 className="text-lg font-semibold text-gray-900">{asset.name}</h3>
          <p className="text-sm text-gray-500">#{asset.serialNumber}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[asset.status]}`}>
          {statusLabels[asset.status]}
        </span>
      </div>

      <div className="space-y-3 rtl">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-5 w-5" />
          <span>{asset.location}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>تاريخ الشراء: {new Date(asset.purchaseDate).toLocaleDateString('ar-SA')}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <WrenchIcon className="h-5 w-5" />
          <span>آخر صيانة: {new Date(asset.lastMaintenance).toLocaleDateString('ar-SA')}</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button 
          onClick={onViewDetails}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}