import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { teachersData } from '../constants/data';
import { Search, Filter, Plus, Mail, Clock } from 'lucide-react';

const TeachersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredTeachers = useMemo(() => {
    return teachersData
      .filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(t => statusFilter === 'All' || t.status === statusFilter);
  }, [searchTerm, statusFilter]);

  const activeCount = teachersData.filter(t => t.status === 'Active').length;
  const onLeaveCount = teachersData.filter(t => t.status === 'On Leave').length;
  const avgExperience = Math.round(teachersData.reduce((sum, t) => sum + t.experience, 0) / teachersData.length);

  const StatusBadge: React.FC<{ status: 'Active' | 'On Leave' }> = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Teacher Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-500 mr-4">
            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Active Teachers</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeCount}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-500 mr-4">
            <Clock className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">On Leave</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{onLeaveCount}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-500 mr-4">
            <Mail className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Avg. Experience</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{avgExperience} yrs</p>
          </div>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by name, subject or ID..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Teacher</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Subject</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Experience</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map(teacher => (
                <tr key={teacher.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img src={teacher.avatar} alt={teacher.name} className="h-10 w-10 rounded-full" />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800 dark:text-white">{teacher.name}</p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{teacher.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell text-gray-700 dark:text-dark-text">{teacher.subject}</td>
                  <td className="p-4 hidden lg:table-cell text-gray-700 dark:text-dark-text">{teacher.experience} years</td>
                  <td className="p-4"><StatusBadge status={teacher.status} /></td>
                  <td className="p-4 text-right">
                    <Button variant="secondary" className="text-xs">Profile</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTeachers.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
            No teachers found.
          </div>
        )}
      </Card>
    </div>
  );
};

export default TeachersPage;
