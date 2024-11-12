import React from 'react';
import { Calendar, User, AlertTriangle } from 'lucide-react';
import { WorkOrder } from '../../types';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

const statusLabels = {
  pending: 'قيد الانتظار',
  'in-progress': 'قيد التنفيذ',
  completed: 'مكتمل',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800',
};

const priorityLabels = {
  low: 'منخفضة',
  medium: 'متوسطة',
  high: 'عالية',
};

interface WorkOrderCardProps {
  workOrder: WorkOrder;
  onViewDetails: () => void;
}

export default function WorkOrderCard({ workOrder, onViewDetails }: WorkOrderCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="rtl">
          <span className={`px-3 py-1 rounded-full text-sm ${statusColors[workOrder.status]}`}>
            {statusLabels[workOrder.status]}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm mr-2 ${priorityColors[workOrder.priority]}`}>
            {priorityLabels[workOrder.priority]}
          </span>
        </div>
      </div>

      <div className="space-y-3 rtl">
        <p className="text-gray-900 font-medium">{workOrder.description}</p>

        <div className="flex items-center gap-2 text-gray-600">
          <User className="h-5 w-5" />
          <span>{workOrder.assignedTo}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>تاريخ البدء: {new Date(workOrder.startDate).toLocaleDateString('ar-SA')}</span>
        </div>

        {workOrder.endDate && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-5 w-5" />
            <span>تاريخ الانتهاء: {new Date(workOrder.endDate).toLocaleDateString('ar-SA')}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          onClick={onViewDetails}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          تعديل / عرض التفاصيل
        </button>
      </div>
    </div>
  );
}