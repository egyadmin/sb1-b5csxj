import React from 'react';
import { 
  Leaf, 
  Droplets, 
  Wind, 
  Gauge, 
  Battery, 
  Truck,
  AlertTriangle,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const emissionsData = [
  { month: 'يناير', actual: 85, target: 80 },
  { month: 'فبراير', actual: 82, target: 80 },
  { month: 'مارس', actual: 78, target: 80 },
  { month: 'أبريل', actual: 75, target: 80 },
  { month: 'مايو', actual: 72, target: 80 },
];

const resourceUsage = [
  { name: 'الوقود', value: 35, status: 'warning' },
  { name: 'الكهرباء', value: 25, status: 'good' },
  { name: 'المياه', value: 20, status: 'good' },
  { name: 'النفايات', value: 15, status: 'critical' },
  { name: 'المواد الخام', value: 5, status: 'good' },
];

const equipmentEfficiency = [
  { name: 'حفارات', efficiency: 85, emissions: 75 },
  { name: 'شاحنات', efficiency: 78, emissions: 82 },
  { name: 'رافعات', efficiency: 92, emissions: 68 },
  { name: 'خلاطات', efficiency: 88, emissions: 72 },
  { name: 'كسارات', efficiency: 82, emissions: 78 },
];

export default function EnvironmentalDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">مؤشر الأداء البيئي</h1>
        <div className="flex items-center gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>آخر 30 يوم</option>
            <option>آخر 90 يوم</option>
            <option>آخر سنة</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'مؤشر الأداء البيئي',
            value: '85%',
            change: '+5%',
            icon: Leaf,
            color: 'green',
          },
          {
            title: 'استهلاك الموارد',
            value: '72%',
            change: '-3%',
            icon: Battery,
            color: 'yellow',
          },
          {
            title: 'كفاءة المعدات',
            value: '88%',
            change: '+2%',
            icon: Gauge,
            color: 'blue',
          },
          {
            title: 'انبعاثات الكربون',
            value: '28%',
            change: '-8%',
            icon: Wind,
            color: 'red',
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div className={`p-2 bg-${stat.color}-100 rounded-lg`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mt-4">{stat.value}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">انبعاثات الكربون</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="actual" name="الفعلي" stroke="#EF4444" />
              <Line type="monotone" dataKey="target" name="المستهدف" stroke="#10B981" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">استخدام الموارد</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={resourceUsage}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {resourceUsage.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.status === 'good' ? '#10B981' :
                      entry.status === 'warning' ? '#F59E0B' :
                      '#EF4444'
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">كفاءة المعدات والانبعاثات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={equipmentEfficiency}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="efficiency" name="الكفاءة" fill="#3B82F6" />
              <Bar dataKey="emissions" name="الانبعاثات" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">التنبيهات البيئية</h2>
          <div className="space-y-4">
            {[
              { 
                title: 'ارتفاع في استهلاك الوقود',
                asset: 'شاحنة رقم 125',
                severity: 'عالي',
                time: '10:30',
                action: 'جدولة صيانة'
              },
              {
                title: 'تجاوز حد الانبعاثات',
                asset: 'مولد كهربائي A15',
                severity: 'متوسط',
                time: '09:45',
                action: 'فحص وضبط'
              },
              {
                title: 'تسرب مياه',
                asset: 'خط الإنتاج 3',
                severity: 'منخفض',
                time: '09:00',
                action: 'إصلاح فوري'
              },
            ].map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.severity === 'عالي' ? 'text-red-500' :
                      alert.severity === 'متوسط' ? 'text-yellow-500' :
                      'text-green-500'
                    }`} />
                    <p className="font-medium text-gray-900">{alert.title}</p>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{alert.asset}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-600">{alert.action}</p>
                  <p className="text-sm text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}