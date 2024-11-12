import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Users, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Settings
} from 'lucide-react';

const integrationStatus = {
  erp: {
    name: 'Oracle ERP',
    status: 'connected',
    lastSync: '2024-03-15 10:30',
    modules: [
      { name: 'المخزون', status: 'active' },
      { name: 'المشتريات', status: 'active' },
      { name: 'المحاسبة', status: 'active' }
    ]
  },
  crm: {
    name: 'نظام إدارة العملاء',
    status: 'connected',
    lastSync: '2024-03-15 10:45',
    modules: [
      { name: 'العملاء', status: 'active' },
      { name: 'الطلبات', status: 'active' },
      { name: 'الخدمات', status: 'active' }
    ]
  }
};

const syncHistory = [
  {
    id: 1,
    system: 'Oracle ERP',
    type: 'مزامنة تلقائية',
    status: 'success',
    timestamp: '2024-03-15 10:30',
    details: 'تمت مزامنة 150 سجل'
  },
  {
    id: 2,
    system: 'CRM',
    type: 'مزامنة يدوية',
    status: 'warning',
    timestamp: '2024-03-15 09:15',
    details: 'تمت مزامنة 75 سجل مع وجود 5 تحذيرات'
  }
];

export default function IntegrationDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة التكامل</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Settings className="h-5 w-5" />
          <span>إعدادات التكامل</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(integrationStatus).map(([key, system]) => (
          <div key={key} className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{system.name}</h3>
                  <p className="text-sm text-gray-500">
                    آخر مزامنة: {system.lastSync}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                system.status === 'connected' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {system.status === 'connected' ? 'متصل' : 'غير متصل'}
              </span>
            </div>

            <div className="space-y-3">
              {system.modules.map((module, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">{module.name}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    module.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {module.status === 'active' ? 'نشط' : 'معلق'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
                <RefreshCw className="h-5 w-5" />
                <span>مزامنة الآن</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">سجل المزامنة</h2>
        <div className="space-y-4">
          {syncHistory.map((record) => (
            <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {record.status === 'success' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                )}
                <div>
                  <p className="font-medium text-gray-900">{record.system}</p>
                  <p className="text-sm text-gray-500">{record.details}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{record.type}</p>
                <p className="text-sm text-gray-500">{record.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">إحصائيات التكامل</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">عدد السجلات المتزامنة</span>
              <span className="font-medium">1,250</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">معدل نجاح المزامنة</span>
              <span className="font-medium">98.5%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">متوسط وقت المزامنة</span>
              <span className="font-medium">45 ثانية</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">الأنظمة المتكاملة</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-500" />
                <span>Oracle ERP</span>
              </div>
              <span className="text-green-600">متصل</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-blue-500" />
                <span>نظام إدارة العملاء</span>
              </div>
              <span className="text-green-600">متصل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}