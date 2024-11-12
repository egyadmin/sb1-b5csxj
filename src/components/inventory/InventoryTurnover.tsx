import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MonthlyInventory {
  month: string;
  value: number;
  sales: number;
}

export default function InventoryTurnover() {
  const [monthlyData, setMonthlyData] = useState<MonthlyInventory[]>([
    { month: 'محرم', value: 12000, sales: 15000 },
    { month: 'صفر', value: 8500, sales: 13000 },
    { month: 'ربيع الأول', value: 9000, sales: 14000 },
    { month: 'ربيع الثاني', value: 10000, sales: 16000 },
  ]);

  const [turnoverRate, setTurnoverRate] = useState(0);
  const [averageInventory, setAverageInventory] = useState(0);
  const [daysToSell, setDaysToSell] = useState(0);

  useEffect(() => {
    calculateMetrics();
  }, [monthlyData]);

  const calculateMetrics = () => {
    // Calculate average inventory
    const avg = monthlyData.reduce((sum, month) => sum + month.value, 0) / monthlyData.length;
    setAverageInventory(avg);

    // Calculate total cost of goods sold
    const totalSales = monthlyData.reduce((sum, month) => sum + month.sales, 0);
    
    // Calculate turnover rate
    const rate = (totalSales / avg) * (365 / 365); // Annualized
    setTurnoverRate(rate);

    // Calculate days to sell
    const days = 365 / rate;
    setDaysToSell(days);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{turnoverRate.toFixed(2)}</h3>
          <p className="text-gray-600">معدل دوران المخزون</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {averageInventory.toLocaleString('ar-SA')} ريال
          </h3>
          <p className="text-gray-600">متوسط المخزون</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{daysToSell.toFixed(0)} يوم</h3>
          <p className="text-gray-600">متوسط أيام البيع</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-6">تحليل المخزون والمبيعات</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              name="قيمة المخزون" 
              stroke="#3B82F6" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="sales" 
              name="المبيعات" 
              stroke="#10B981" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">حاسبة معدل دوران المخزون</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                تكلفة البضاعة المباعة (ريال)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل تكلفة البضاعة المباعة"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                متوسط المخزون (ريال)
              </label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="أدخل متوسط المخزون"
              />
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            حساب معدل الدوران
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">نصائح لتحسين معدل دوران المخزون</h2>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">تحسين التنبؤ بالطلب</h3>
            <p className="text-blue-800">استخدم البيانات التاريخية والتحليلات للتنبؤ بشكل أدق باحتياجات المخزون</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-900 mb-2">تحسين عملية الشراء</h3>
            <p className="text-green-800">قم بتحسين كميات الطلب وتوقيتها لتقليل تكاليف التخزين</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium text-yellow-900 mb-2">مراقبة المخزون الراكد</h3>
            <p className="text-yellow-800">حدد وتخلص من المخزون بطيء الحركة لتحسين معدل الدوران</p>
          </div>
        </div>
      </div>
    </div>
  );
}