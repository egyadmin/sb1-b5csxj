import React from 'react';
import { Shield, AlertTriangle, Activity, Lock, Users, FileText } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const securityMetrics = [
  { timestamp: '08:00', threats: 5, attempts: 12 },
  { timestamp: '09:00', threats: 3, attempts: 8 },
  { timestamp: '10:00', threats: 7, attempts: 15 },
  { timestamp: '11:00', threats: 4, attempts: 10 },
  { timestamp: '12:00', threats: 6, attempts: 14 },
];

export default function SecurityDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">لوحة الأمن السيبراني</h1>
        <button className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-700">
          <AlertTriangle className="h-5 w-5" />
          <span>الإبلاغ عن حادث</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">آخر 24 ساعة</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">98%</h3>
          <p className="text-gray-600">معدل الحماية</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <span className="text-sm text-gray-500">اليوم</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">12</h3>
          <p className="text-gray-600">تهديدات محظورة</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-sm text-gray-500">حالي</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">نشط</h3>
          <p className="text-gray-600">وضع الحماية</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">نشاط التهديدات</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={securityMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="threats" stroke="#EF4444" name="تهديدات" />
              <Line type="monotone" dataKey="attempts" stroke="#3B82F6" name="محاولات وصول" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">آخر الأحداث الأمنية</h3>
          <div className="space-y-4">
            {[
              { type: 'تحديث النظام', status: 'مكتمل', time: '10:30' },
              { type: 'محاولة وصول مشبوهة', status: 'محظور', time: '09:45' },
              { type: 'نسخ احتياطي', status: 'جاري', time: '09:00' },
              { type: 'فحص أمني', status: 'مكتمل', time: '08:15' },
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    event.status === 'محظور' ? 'bg-red-100' : 
                    event.status === 'مكتمل' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {event.status === 'محظور' ? <Lock className="h-4 w-4 text-red-600" /> :
                     event.status === 'مكتمل' ? <Shield className="h-4 w-4 text-green-600" /> :
                     <Activity className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{event.type}</p>
                    <p className="text-sm text-gray-500">{event.status}</p>
                  </div>
                </div>
                <span className="text-gray-500">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">سياسات الأمان النشطة</h3>
          <div className="space-y-4">
            {[
              { name: 'المصادقة متعددة العوامل', status: 'مفعل' },
              { name: 'تشفير البيانات', status: 'مفعل' },
              { name: 'مراقبة الشبكة', status: 'مفعل' },
              { name: 'النسخ الاحتياطي التلقائي', status: 'مفعل' },
            ].map((policy, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{policy.name}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {policy.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">تقارير الأمان</h3>
          <div className="space-y-4">
            {[
              { name: 'تقرير التهديدات الشهري', date: '2024-03-01' },
              { name: 'تحليل المخاطر', date: '2024-02-28' },
              { name: 'تقرير الامتثال', date: '2024-02-25' },
              { name: 'تدقيق الأمان', date: '2024-02-20' },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-400" />
                  <span className="font-medium text-gray-900">{report.name}</span>
                </div>
                <span className="text-gray-500">
                  {new Date(report.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}