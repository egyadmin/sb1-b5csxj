import React from 'react';
import { 
  FileText, Download, Calendar, 
  TrendingUp, Settings, BarChart2, 
  AlertTriangle, Shield
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'performance' | 'maintenance' | 'financial' | 'environmental' | 'security';
  description: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'failed';
}

const typeIcons = {
  performance: TrendingUp,
  maintenance: Settings,
  financial: BarChart2,
  environmental: AlertTriangle,
  security: Shield,
};

const statusColors = {
  ready: 'bg-green-100 text-green-800',
  generating: 'bg-blue-100 text-blue-800',
  failed: 'bg-red-100 text-red-800',
};

const statusLabels = {
  ready: 'جاهز',
  generating: 'قيد الإنشاء',
  failed: 'فشل',
};

interface ReportCardProps {
  report: Report;
}

export default function ReportCard({ report }: ReportCardProps) {
  const Icon = typeIcons[report.type];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
            <p className="text-sm text-gray-500">{report.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span>{new Date(report.lastGenerated).toLocaleDateString('ar-SA')}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[report.status]}`}>
          {statusLabels[report.status]}
        </span>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button 
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
          disabled={report.status !== 'ready'}
        >
          <Download className="h-5 w-5" />
          <span>تحميل</span>
        </button>
      </div>
    </div>
  );
}