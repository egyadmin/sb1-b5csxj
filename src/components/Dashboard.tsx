import React from 'react';
import { 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts';
import { 
  Truck, 
  Wrench, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Calendar,
  Building2
} from 'lucide-react';

const projectTypes = {
  road: 'أعمال الطرق',
  bridge: 'الجسور',
  drilling: 'الحفر',
  maintenance: 'الصيانة',
  asphalt: 'الأسفلت',
  crusher: 'الكسارات',
};

export default function Dashboard() {
  const costData = [
    { name: 'الوقود', value: 35 },
    { name: 'الصيانة', value: 25 },
    { name: 'قطع الغيار', value: 20 },
    { name: 'العمالة', value: 15 },
    { name: 'أخرى', value: 5 },
  ];

  const stats = [
    {
      title: 'المشاريع النشطة',
      value: '24',
      change: '+12%',
      icon: Building2,
      color: 'blue'
    },
    {
      title: 'المعدات العاملة',
      value: '156',
      change: '+5%',
      icon: Truck,
      color: 'green'
    },
    {
      title: 'أوامر العمل',
      value: '38',
      change: '-2%',
      icon: Wrench,
      color: 'yellow'
    },
    {
      title: 'الحوادث',
      value: '2',
      change: '-15%',
      icon: AlertTriangle,
      color: 'red'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
        <div className="flex items-center gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2">
            <option>آخر 7 أيام</option>
            <option>آخر 30 يوم</option>
            <option>آخر 90 يوم</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
          <h2 className="text-lg font-semibold mb-4">حالة المشاريع</h2>
          <div className="space-y-4">
            {Object.entries(projectTypes).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-600">{value}</span>
                <div className="flex items-center gap-2">
                  <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    {Math.floor(Math.random() * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">توزيع التكاليف</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={costData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {costData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={[
                      '#3B82F6',
                      '#10B981',
                      '#F59E0B',
                      '#EF4444',
                      '#8B5CF6',
                    ][index % 5]} 
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
          <h2 className="text-lg font-semibold mb-4">أداء المعدات</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: 'حفارات', planned: 85, actual: 78 },
              { name: 'شاحنات', planned: 90, actual: 85 },
              { name: 'رافعات', planned: 75, actual: 70 },
              { name: 'خلاطات', planned: 95, actual: 92 },
              { name: 'كسارات', planned: 88, actual: 85 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" name="المخطط" fill="#3B82F6" />
              <Bar dataKey="actual" name="الفعلي" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">المهام القادمة</h2>
          <div className="space-y-4">
            {[
              { title: 'صيانة الحفار الرئيسي', date: '2024-03-20', type: 'صيانة', priority: 'عالي' },
              { title: 'فحص خلاطة الأسفلت', date: '2024-03-21', type: 'فحص', priority: 'متوسط' },
              { title: 'معايرة الكسارة', date: '2024-03-22', type: 'معايرة', priority: 'منخفض' },
              { title: 'تغيير زيت الشاحنات', date: '2024-03-23', type: 'صيانة', priority: 'متوسط' },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">
                    {new Date(task.date).toLocaleDateString('ar-SA')}
                  </p>
                  <span className={`text-sm ${
                    task.priority === 'عالي' ? 'text-red-600' :
                    task.priority === 'متوسط' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}