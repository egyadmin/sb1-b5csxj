import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Calendar, 
  AlertTriangle, Clock, ArrowUpDown,
  FileText, Wrench, CheckCircle
} from 'lucide-react';
import { WorkOrder } from '../../types';
import WorkOrderCard from './WorkOrderCard';
import WorkOrderModal from './WorkOrderModal';
import WorkOrderForm from './WorkOrderForm';
import { useLanguageStore } from '../../store/languageStore';

const mockWorkOrders: WorkOrder[] = [
  {
    id: '1',
    type: 'maintenance',
    assetId: '1',
    status: 'pending',
    priority: 'high',
    description: 'صيانة دورية للمولد الكهربائي',
    assignedTo: ['أحمد محمد'],
    startDate: '2024-03-20',
    endDate: '2024-03-21',
    location: 'المستودع الرئيسي',
    requiredParts: [
      { partId: 'P1', quantity: 2, status: 'available' }
    ],
    laborHours: 4,
    cost: {
      parts: 500,
      labor: 200,
      additional: 50
    },
    safetyRequirements: ['معدات الحماية الشخصية', 'تأمين منطقة العمل'],
    comments: [
      {
        userId: 'U1',
        text: 'تم فحص المولد وتحديد القطع المطلوبة',
        timestamp: '2024-03-19T10:00:00'
      }
    ]
  },
  {
    id: '2',
    type: 'repair',
    assetId: '2',
    status: 'in-progress',
    priority: 'critical',
    description: 'إصلاح عطل في الرافعة الشوكية',
    assignedTo: ['محمد علي', 'خالد أحمد'],
    startDate: '2024-03-19',
    endDate: '2024-03-20',
    location: 'مستودع الشحن',
    requiredParts: [
      { partId: 'P2', quantity: 1, status: 'ordered' }
    ],
    laborHours: 8,
    cost: {
      parts: 1200,
      labor: 400,
      additional: 100
    },
    safetyRequirements: ['قفل الطاقة', 'وضع علامات التحذير'],
    comments: [
      {
        userId: 'U2',
        text: 'جاري انتظار وصول قطع الغيار',
        timestamp: '2024-03-19T14:30:00'
      }
    ]
  }
];

export default function WorkOrderList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<WorkOrder['status'] | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<WorkOrder['priority'] | 'all'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';

  const filteredWorkOrders = mockWorkOrders.filter(order => {
    const matchesSearch = order.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleCreateWorkOrder = (data: Partial<WorkOrder>) => {
    // TODO: Implement work order creation
    console.log('Creating work order:', data);
    setIsCreateModalOpen(false);
  };

  const handleViewDetails = (workOrder: WorkOrder) => {
    setSelectedWorkOrder(workOrder);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">إدارة أوامر العمل</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>إنشاء أمر عمل جديد</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="البحث في أوامر العمل..."
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              dir="rtl"
            />
          </div>
        </div>

        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as WorkOrder['status'] | 'all')}
          dir="rtl"
        >
          <option value="all">جميع الحالات</option>
          <option value="pending">قيد الانتظار</option>
          <option value="in-progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg px-4 py-2"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as WorkOrder['priority'] | 'all')}
          dir="rtl"
        >
          <option value="all">جميع الأولويات</option>
          <option value="low">منخفضة</option>
          <option value="medium">متوسطة</option>
          <option value="high">عالية</option>
          <option value="critical">حرجة</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkOrders.map(workOrder => (
          <WorkOrderCard
            key={workOrder.id}
            workOrder={workOrder}
            onViewDetails={() => handleViewDetails(workOrder)}
          />
        ))}
      </div>

      <WorkOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="إنشاء أمر عمل جديد"
      >
        <WorkOrderForm
          onSubmit={handleCreateWorkOrder}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </WorkOrderModal>

      {selectedWorkOrder && (
        <WorkOrderModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          title="تفاصيل أمر العمل"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">الحالة</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {selectedWorkOrder.status === 'pending' ? 'قيد الانتظار' :
                   selectedWorkOrder.status === 'in-progress' ? 'قيد التنفيذ' :
                   'مكتمل'}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">الأولوية</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {selectedWorkOrder.priority === 'low' ? 'منخفضة' :
                   selectedWorkOrder.priority === 'medium' ? 'متوسطة' :
                   selectedWorkOrder.priority === 'high' ? 'عالية' :
                   'حرجة'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">الوصف</h3>
              <p className="mt-1 text-lg text-gray-900">{selectedWorkOrder.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">المعينين للعمل</h3>
              <div className="mt-1 space-y-1">
                {selectedWorkOrder.assignedTo.map((person, index) => (
                  <p key={index} className="text-gray-900">{person}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">تاريخ البدء</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(selectedWorkOrder.startDate).toLocaleDateString('ar-SA')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">تاريخ الانتهاء</h3>
                <p className="mt-1 text-gray-900">
                  {selectedWorkOrder.endDate ? 
                    new Date(selectedWorkOrder.endDate).toLocaleDateString('ar-SA') :
                    'غير محدد'}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">متطلبات السلامة</h3>
              <ul className="mt-1 list-disc list-inside space-y-1">
                {selectedWorkOrder.safetyRequirements.map((req, index) => (
                  <li key={index} className="text-gray-900">{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">التعليقات</h3>
              <div className="mt-1 space-y-2">
                {selectedWorkOrder.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-gray-900">{comment.text}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(comment.timestamp).toLocaleString('ar-SA')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </WorkOrderModal>
      )}
    </div>
  );
}