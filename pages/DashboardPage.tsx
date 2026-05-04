import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Users, UserCog, Wallet, IndianRupee, Loader2 } from 'lucide-react';
import Card from '../components/ui/Card';
import { apiFetch } from '../lib/api';
import type { FeeRecord, AttendanceRecord } from '../types';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalRevenue: number;
  feeRecords: FeeRecord[];
  attendanceRecords: AttendanceRecord[];
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; color: string }> = ({ icon, title, value, color }) => (
  <Card className="flex items-center">
    <div className={`p-3 rounded-full ${color}`}>
      {icon}
    </div>
    <div className="ml-4">
      <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{title}</p>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  </Card>
);

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const colors = { primary: '#3b82f6', secondary: '#ef4444' };

  useEffect(() => {
    apiFetch<{ data: DashboardStats }>('/dashboard/stats')
      .then(res => setStats(res.data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 dark:text-dark-text-secondary">
        <Loader2 className="h-8 w-8 animate-spin mr-3" />
        Loading dashboard…
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="text-center py-12 text-red-500">
          Failed to load dashboard data: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-white h-6 w-6" />} title="Total Students" value={stats.totalStudents.toLocaleString()} color="bg-blue-500" />
        <StatCard icon={<UserCog className="text-white h-6 w-6" />} title="Total Teachers" value={stats.totalTeachers.toLocaleString()} color="bg-green-500" />
        <StatCard icon={<Wallet className="text-white h-6 w-6" />} title="Fee Records" value={stats.feeRecords.length.toLocaleString()} color="bg-yellow-500" />
        <StatCard icon={<IndianRupee className="text-white h-6 w-6" />} title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Fee Collection</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.feeRecords}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700"/>
                <XAxis dataKey="month" tick={{ fill: 'rgb(107 114 128)'}} className="text-xs dark:fill-dark-text-secondary"/>
                <YAxis tick={{ fill: 'rgb(107 114 128)'}} className="text-xs dark:fill-dark-text-secondary" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                  }}
                  wrapperClassName="dark:!bg-dark-card dark:!border-dark-border"
                />
                <Legend />
                <Bar dataKey="collected" fill={colors.primary} name="Collected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill={colors.secondary} name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Attendance Overview (%)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.attendanceRecords}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200 dark:stroke-gray-700"/>
                <XAxis dataKey="month" tick={{ fill: 'rgb(107 114 128)'}} className="text-xs dark:fill-dark-text-secondary" />
                <YAxis tick={{ fill: 'rgb(107 114 128)'}} className="text-xs dark:fill-dark-text-secondary"/>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem'
                  }}
                  wrapperClassName="dark:!bg-dark-card dark:!border-dark-border"
                />
                <Legend />
                <Area type="monotone" dataKey="present" stackId="1" stroke={colors.primary} fill={colors.primary} fillOpacity={0.3} name="Present" />
                <Area type="monotone" dataKey="absent" stackId="1" stroke={colors.secondary} fill={colors.secondary} fillOpacity={0.3} name="Absent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;

