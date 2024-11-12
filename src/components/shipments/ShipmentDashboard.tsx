import React, { useState } from 'react';
import { 
  TruckIcon, 
  PackageSearch, 
  ArrowDownCircle, 
  ArrowUpCircle,
  Calendar,
  MapPin,
  Clock,
  AlertTriangle,
  Plus,
  Filter
} from 'lucide-react';
import ShipmentModal from './ShipmentModal';
import ShipmentTable from './ShipmentTable';
import ShipmentMap from './ShipmentMap';
import { useLanguageStore } from '../../store/languageStore';

const mockShipments = [
  {
    id: 'SHP001',
    type: 'incoming',
    status: 'in-transit',
    origin: 'جدة',
    destination: 'الرياض',
    expectedDate: '2024-03-25',
    actualDate: null,
    carrier: 'شركة النقل السريع',
    items: [
      { name: 'قطع غيار معدات', quantity: 5, weight: 250 }
    ],
    trackingNumber: 'TRK123456',
    priority: 'high',
    lastUpdate: '2024-03-20 10:30',
    progress: 65,
  },
  {
    id: 'SHP002',
    type: 'outgoing',
    status: 'delivered',
    origin: 'الرياض',
    destination: 'الدمام',
    expectedDate: '2024-03-18',
    actualDate: '2024-03-18',
    carrier: 'الشركة الوطنية للنقل',
    items: [
      { name: 'معدات حفر', quantity: 2, weight: 1500 }
    ],
    trackingNumber: 'TRK789012',
    priority: 'medium',
    lastUpdate: '2024-03-18 15:45',
    progress: 100,
  },
];

export default function ShipmentDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | 'incoming' | 'outgoing'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in-transit' | 'delivered' | 'delayed'>('all');
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesType = selectedType === 'all' || shipment.type === selectedType;
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    const matchesSearch = 
      shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const stats = {
    total: mockShipments.length,
    incoming: mockShipments.filter(s => s.type === 'incoming').length,
    outgoing: mockShipments.filter(s => s.type === 'outgoing').length,
    delayed: mockShipments.filter(s => 
      new Date(s.expectedDate) < new Date() && s.status !== 'delivered'
    ).length
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">تتبع الشحنات</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>إضافة شحنة جديدة</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TruckIcon className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-blue-600">الكل</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{stats.total}</h3>
          <p className="text-gray-600">إجمالي الشحنات</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-green-100 rounded-lg">
              <ArrowDownCircle className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600">واردة</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{stats.incoming}</h3>
          <p className="text-gray-600">الشحنات الواردة</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ArrowUpCircle className="h-6 w-6 text-purple-600" />
            </div>
            <span className="text-sm text-purple-600">صادرة</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{stats.outgoing}</h3>
          <p className="text-gray-600">الشحنات الصادرة</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <span className="text-sm text-red-600">متأخرة</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mt-4">{stats.delayed}</h3>
          <p className="text-gray-600">الشحنات المتأخرة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedType('all')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedType === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  جميع الشحنات
                </button>
                <button
                  onClick={() => setSelectedType('incoming')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedType === 'incoming'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  الشحنات الواردة
                </button>
                <button
                  onClick={() => setSelectedType('outgoing')}
                  className={`px-4 py-2 rounded-lg ${
                    selectedType === 'outgoing'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  الشحنات الصادرة
                </button>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <PackageSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="بحث عن شحنة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-4 py-2"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="in-transit">قيد النقل</option>
                  <option value="delivered">تم التسليم</option>
                  <option value="delayed">متأخرة</option>
                </select>
              </div>
            </div>
            <ShipmentTable shipments={filteredShipments} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">خريطة التتبع المباشر</h2>
          <ShipmentMap shipments={filteredShipments} />
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-gray-900">الشحنات النشطة</h3>
            {filteredShipments
              .filter(s => s.status === 'in-transit')
              .map(shipment => (
                <div key={shipment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">#{shipment.trackingNumber}</p>
                      <p className="text-sm text-gray-500">{shipment.carrier}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      shipment.priority === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shipment.priority === 'high' ? 'عالية' : 'متوسطة'}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{shipment.origin} → {shipment.destination}</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>آخر تحديث: {shipment.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${shipment.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <ShipmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}