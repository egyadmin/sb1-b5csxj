import React, { useState } from 'react';
import { Calculator, DollarSign, Users, Building2, Briefcase } from 'lucide-react';

interface LocalContentComponent {
  category: string;
  weight: number;
  localValue: number;
  totalValue: number;
}

export default function LocalContentCalculator() {
  const [components, setComponents] = useState<LocalContentComponent[]>([
    {
      category: 'القوى العاملة المحلية',
      weight: 30,
      localValue: 0,
      totalValue: 0
    },
    {
      category: 'المنتجات المحلية',
      weight: 25,
      localValue: 0,
      totalValue: 0
    },
    {
      category: 'الخدمات المحلية',
      weight: 20,
      localValue: 0,
      totalValue: 0
    },
    {
      category: 'التدريب والتطوير',
      weight: 15,
      localValue: 0,
      totalValue: 0
    },
    {
      category: 'البحث والتطوير المحلي',
      weight: 10,
      localValue: 0,
      totalValue: 0
    }
  ]);

  const calculateLocalContent = () => {
    let totalWeightedPercentage = 0;
    
    components.forEach(component => {
      const componentPercentage = component.totalValue > 0 
        ? (component.localValue / component.totalValue) * 100 
        : 0;
      totalWeightedPercentage += (componentPercentage * (component.weight / 100));
    });

    return totalWeightedPercentage.toFixed(2);
  };

  const handleValueChange = (index: number, field: 'localValue' | 'totalValue', value: number) => {
    const newComponents = [...components];
    newComponents[index][field] = value;
    setComponents(newComponents);
  };

  const getComponentStatus = (component: LocalContentComponent) => {
    const percentage = component.totalValue > 0 
      ? (component.localValue / component.totalValue) * 100 
      : 0;
    
    if (percentage >= 70) return 'ممتاز';
    if (percentage >= 50) return 'جيد';
    if (percentage >= 30) return 'متوسط';
    return 'منخفض';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ممتاز': return 'text-green-600';
      case 'جيد': return 'text-blue-600';
      case 'متوسط': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">حاسبة المحتوى المحلي</h2>
          <div className="flex items-center gap-2">
            <Calculator className="h-6 w-6 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">{calculateLocalContent()}%</span>
          </div>
        </div>

        <div className="space-y-6">
          {components.map((component, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{component.category}</span>
                  <span className="text-sm text-gray-500">({component.weight}%)</span>
                </div>
                <span className={`font-medium ${getStatusColor(getComponentStatus(component))}`}>
                  {getComponentStatus(component)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    القيمة المحلية (ريال)
                  </label>
                  <input
                    type="number"
                    value={component.localValue}
                    onChange={(e) => handleValueChange(index, 'localValue', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    القيمة الإجمالية (ريال)
                  </label>
                  <input
                    type="number"
                    value={component.totalValue}
                    onChange={(e) => handleValueChange(index, 'totalValue', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>
              </div>

              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ 
                      width: `${component.totalValue > 0 
                        ? (component.localValue / component.totalValue) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">إرشادات احتساب المحتوى المحلي</h3>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>القوى العاملة المحلية: تشمل الرواتب والمزايا للموظفين السعوديين</li>
            <li>المنتجات المحلية: قيمة المشتريات من المصنعين والموردين المحليين</li>
            <li>الخدمات المحلية: تكاليف الخدمات المقدمة من شركات سعودية</li>
            <li>التدريب والتطوير: الاستثمار في تدريب وتأهيل الكوادر السعودية</li>
            <li>البحث والتطوير: الاستثمار في مراكز البحث والتطوير المحلية</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">توصيات لتحسين المحتوى المحلي</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <h3 className="font-medium text-gray-900">تطوير القوى العاملة</h3>
                <p className="text-sm text-gray-600">زيادة نسبة التوظيف المحلي وبرامج التدريب</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-green-600" />
              <div>
                <h3 className="font-medium text-gray-900">تطوير الموردين المحليين</h3>
                <p className="text-sm text-gray-600">دعم وتأهيل الموردين المحليين</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-purple-600" />
              <div>
                <h3 className="font-medium text-gray-900">نقل المعرفة</h3>
                <p className="text-sm text-gray-600">برامج نقل التقنية والمعرفة للشركات المحلية</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <DollarSign className="h-5 w-5 text-yellow-600" />
              <div>
                <h3 className="font-medium text-gray-900">الاستثمار المحلي</h3>
                <p className="text-sm text-gray-600">زيادة الاستثمار في البنية التحتية المحلية</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}