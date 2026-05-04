import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { apiFetch } from '../lib/api';
import type { StudentFee, FeeRecord } from '../types';
import { Search, Filter, Banknote, CheckCircle, AlertCircle, XCircle, Loader2 } from 'lucide-react';

const FeesPage: React.FC = () => {
  const [studentFees, setStudentFees] = useState<StudentFee[]>([]);
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    Promise.all([
      apiFetch<{ data: { studentFees: StudentFee[] } }>('/fees'),
      apiFetch<{ data: { feeRecords: FeeRecord[] } }>('/fees/monthly'),
    ])
      .then(([feesRes, monthlyRes]) => {
        setStudentFees(feesRes.data.studentFees);
        setFeeRecords(monthlyRes.data.feeRecords);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const totalCollected = feeRecords.reduce((s, r) => s + r.collected, 0);
  const totalPending = feeRecords.reduce((s, r) => s + r.pending, 0);
  const paidCount = studentFees.filter(f => f.status === 'Paid').length;
  const unpaidCount = studentFees.filter(f => f.status === 'Unpaid').length;
  const partialCount = studentFees.filter(f => f.status === 'Partial').length;

  const filtered = useMemo(() =>
    studentFees
      .filter(f =>
        f.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.class.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(f => statusFilter === 'All' || f.status === statusFilter),
    [studentFees, searchTerm, statusFilter]
  );

  const StatusBadge: React.FC<{ status: 'Paid' | 'Partial' | 'Unpaid' }> = ({ status }) => {
    const styles = {
      Paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      Partial: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      Unpaid: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Fee Management</h1>
        <Button>
          <Banknote className="h-4 w-4 mr-2" />
          Record Payment
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-500 mr-4">
            <Banknote className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Total Collected</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">₹{totalCollected.toLocaleString()}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-red-500 mr-4">
            <AlertCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Total Pending</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">₹{totalPending.toLocaleString()}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-500 mr-4">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Paid / Partial</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{paidCount} / {partialCount}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-red-400 mr-4">
            <XCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Unpaid</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">{unpaidCount}</p>
          </div>
        </Card>
      </div>

      {/* Fee Records Table */}
      <Card>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Search by name, ID or class..."
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
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-gray-500 dark:text-dark-text-secondary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading fee records…
          </div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load fee records: {error}
          </div>
        )}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Student</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Class</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden sm:table-cell">Month</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Amount</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Paid</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Due</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Status</th>
                    <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Due Date</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(fee => (
                    <tr key={fee.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="p-4">
                        <p className="font-semibold text-gray-800 dark:text-white">{fee.studentName}</p>
                        <p className="text-xs text-gray-500 dark:text-dark-text-secondary">{fee.studentId}</p>
                      </td>
                      <td className="p-4 hidden md:table-cell text-gray-700 dark:text-dark-text">{fee.class}</td>
                      <td className="p-4 hidden sm:table-cell text-gray-700 dark:text-dark-text">{fee.month}</td>
                      <td className="p-4 hidden lg:table-cell text-gray-700 dark:text-dark-text">₹{fee.amount.toLocaleString()}</td>
                      <td className="p-4 hidden lg:table-cell text-green-600 dark:text-green-400 font-medium">₹{fee.paid.toLocaleString()}</td>
                      <td className="p-4 text-red-600 dark:text-red-400 font-medium">₹{fee.due.toLocaleString()}</td>
                      <td className="p-4"><StatusBadge status={fee.status} /></td>
                      <td className="p-4 hidden md:table-cell text-gray-500 dark:text-dark-text-secondary text-sm">{fee.dueDate}</td>
                      <td className="p-4 text-right">
                        <Button variant="secondary" className="text-xs">Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">
                No fee records found.
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default FeesPage;
