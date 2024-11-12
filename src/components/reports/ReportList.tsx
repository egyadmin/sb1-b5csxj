import React, { useState } from 'react';
import { 
  BarChart2, Download, Filter, Calendar,
  FileText, TrendingUp, AlertTriangle, Settings
} from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import ReportCard from './ReportCard';
import ReportModal from './ReportModal';

interface Report {
  id: string;
  title: string;
  type: 'performance' | 'maintenance' | 'financial' | 'environmental' | 'security';
  description: string;
  lastGenerated: string;
  status: 'ready' | 'generating' | 'failed';
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'تقرير أداء الأصول',
    type: 'performance',
    description: 'تحليل شامل لأداء جميع الأصول مع مؤشرات الأداء الرئيسية',
    lastGenerated: '2024-03-15',
    status: 'ready',
  },
  {
    id: '2',
    title: 'تقرير الصيانة الشهري',
    type: 'maintenance',
    description: 'ملخص لجميع أنشطة الصيانة والإصلاحات',
    lastGenerated: '2024-03-14',
    status: 'generating',
  },
  // Add more mock reports
];

export default function ReportList() {
  const [selectedType, setSelectedType] = useState<Report['type'] | 'all'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguageStore();
  const isRTL = language === 'ar';

  const translations = {
    title: isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics',
    generateReport: isRTL ? 'إنشاء تقرير جديد' : 'Generate New Report',
    filterByType: isRTL ? 'تصفية حسب النوع' : 'Filter by Type',
    all: isRTL ? 'جميع التقارير' : 'All Reports',
    performance: isRTL ? 'تقارير الأداء' : 'Performance Reports',
    maintenance: isRTL ? 'تقارير الصيانة' : 'Maintenance Reports',
    financial: isRTL ? 'التقارير المالية' : 'Financial Reports',
    environmental: isRTL ? 'التقارير البيئية' : 'Environmental Reports',
    security: isRTL ? 'تقارير الأمان' : 'Security Reports',
  };

  const filteredReports = mockReports.filter(
    report => selectedType === 'all' || report.type === selectedType
  );

  const reportTypes = [
    { value: 'all', label: translations.all, icon: FileText },
    { value: 'performance', label: translations.performance, icon: TrendingUp },
    { value: 'maintenance', label: translations.maintenance, icon: Settings },
    { value: 'financial', label: translations.financial, icon: BarChart2 },
    { value: 'environmental', label: translations.environmental, icon: AlertTriangle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">{translations.title}</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <FileText className="h-5 w-5" />
          <span>{translations.generateReport}</span>
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {reportTypes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setSelectedType(value as Report['type'] | 'all')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedType === value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      <ReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}