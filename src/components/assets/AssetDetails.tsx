import React from 'react';
import { Asset } from '../../types';
import { WrenchIcon, MapPin, Calendar, Clock, AlertCircle, FileText } from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset;
  onEdit: () => void;
  onClose: () => void;
}

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

export default function AssetDetails({ asset, onEdit, onClose }: AssetDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto" dir="rtl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{asset.name}</h2>
          <p className="text-gray-500">#{asset.serialNumber}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[asset.status]}`}>
          {statusLabels[asset.status]}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">الموقع</p>
              <p className="text-gray-900">{asset.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">تاريخ الشراء</p>
              <p className="text-gray-900">
                {new Date(asset.purchaseDate).toLocaleDateString('ar-SA')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <WrenchIcon className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">آخر صيانة</p>
              <p className="text-gray-900">
                {new Date(asset.lastMaintenance).toLocaleDateString('ar-SA')}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">الحالة</p>
              <p className="text-gray-900">{statusLabels[asset.status]}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">عمر الأصل</p>
              <p className="text-gray-900">
                {Math.floor((new Date().getTime() - new Date(asset.purchaseDate).getTime()) / (1000 * 60 * 60 * 24 * 365))} سنة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">عدد أوامر العمل</p>
              <p className="text-gray-900">5 أوامر</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          إغلاق
        </button>
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          تعديل
        </button>
      </div>
    </div>
  );
}