import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { studentsData } from '../constants/data';
import type { Student } from '../types';
import { Search, Filter, Plus } from 'lucide-react';

const StudentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredStudents = useMemo(() => {
    return studentsData
      .filter(student => 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(student => 
        statusFilter === 'All' || student.status === statusFilter
      );
  }, [searchTerm, statusFilter]);

  const StatusBadge: React.FC<{ status: 'Active' | 'Inactive' }> = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
              <tr>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Student</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Class</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Fees Due</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden sm:table-cell">Attendance</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary"></th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="p-4">
                    <div className="flex items-center">
                      <img src={student.avatar} alt={student.name} className="h-10 w-10 rounded-full" />
                      <div className="ml-3">
                        <p className="font-semibold text-gray-800 dark:text-white">{student.name}</p>
                        <p className="text-sm text-gray-500 dark:text-dark-text-secondary">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">{student.class}</td>
                  <td className="p-4 hidden lg:table-cell">₹{student.feesDue.toFixed(2)}</td>
                  <td className="p-4 hidden sm:table-cell">{student.attendance}%</td>
                  <td className="p-4"><StatusBadge status={student.status} /></td>
                  <td className="p-4 text-right">
                    <Button variant="secondary" className="text-xs">Details</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
            No students found.
          </div>
        )}
      </Card>
    </div>
  );
};

export default StudentsPage;
