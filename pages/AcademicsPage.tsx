import React, { useState, useMemo, useEffect } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { apiFetch } from '../lib/api';
import type { Subject, Exam } from '../types';
import { Search, Plus, BookOpen, ClipboardList, Loader2 } from 'lucide-react';

type Tab = 'subjects' | 'exams';

const AcademicsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('subjects');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [examFilter, setExamFilter] = useState<'All' | 'Upcoming' | 'Completed'>('All');

  useEffect(() => {
    Promise.all([
      apiFetch<{ data: { subjects: Subject[] } }>('/academics/subjects'),
      apiFetch<{ data: { exams: Exam[] } }>('/academics/exams'),
    ])
      .then(([subjectsRes, examsRes]) => {
        setSubjects(subjectsRes.data.subjects);
        setExams(examsRes.data.exams);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredSubjects = useMemo(() =>
    subjects.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
    ), [subjects, searchTerm]);

  const filteredExams = useMemo(() =>
    exams
      .filter(e => examFilter === 'All' || e.status === examFilter)
      .filter(e =>
        e.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.class.toLowerCase().includes(searchTerm.toLowerCase())
      ), [exams, searchTerm, examFilter]);

  const upcomingCount = exams.filter(e => e.status === 'Upcoming').length;
  const completedCount = exams.filter(e => e.status === 'Completed').length;

  const ExamBadge: React.FC<{ status: 'Upcoming' | 'Completed' }> = ({ status }) => (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
      status === 'Upcoming'
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    }`}>
      {status}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Academic Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === 'subjects' ? 'Add Subject' : 'Schedule Exam'}
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-blue-500 mr-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Total Subjects</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{subjects.length}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-500 mr-4">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Upcoming Exams</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{upcomingCount}</p>
          </div>
        </Card>
        <Card className="flex items-center">
          <div className="p-3 rounded-full bg-green-500 mr-4">
            <ClipboardList className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-dark-text-secondary">Completed Exams</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{completedCount}</p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Card>
        <div className="flex border-b border-gray-200 dark:border-dark-border mb-4">
          <button
            onClick={() => { setActiveTab('subjects'); setSearchTerm(''); }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'subjects'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary'
            }`}
          >
            Subjects
          </button>
          <button
            onClick={() => { setActiveTab('exams'); setSearchTerm(''); }}
            className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ml-4 ${
              activeTab === 'exams'
                ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-dark-text-secondary'
            }`}
          >
            Exams
          </button>
        </div>

        {/* Search + filter row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </span>
            <input
              type="text"
              placeholder={activeTab === 'subjects' ? 'Search subject, class or teacher...' : 'Search subject or class...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          {activeTab === 'exams' && (
            <select
              value={examFilter}
              onChange={e => setExamFilter(e.target.value as 'All' | 'Upcoming' | 'Completed')}
              className="py-2 px-3 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12 text-gray-500 dark:text-dark-text-secondary">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading academics data…
          </div>
        )}
        {error && (
          <div className="text-center py-8 text-red-500">
            Failed to load academics data: {error}
          </div>
        )}

        {/* Subjects table */}
        {!loading && !error && activeTab === 'subjects' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Subject</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Class</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Teacher</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Hrs / Week</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map(subject => (
                  <tr key={subject.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-semibold text-gray-800 dark:text-white">{subject.name}</td>
                    <td className="p-4 text-gray-700 dark:text-dark-text">{subject.class}</td>
                    <td className="p-4 hidden md:table-cell text-gray-700 dark:text-dark-text">{subject.teacherName}</td>
                    <td className="p-4 hidden lg:table-cell text-gray-700 dark:text-dark-text">{subject.hoursPerWeek}</td>
                    <td className="p-4 text-right">
                      <Button variant="secondary" className="text-xs">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredSubjects.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">No subjects found.</p>
            )}
          </div>
        )}

        {/* Exams table */}
        {!loading && !error && activeTab === 'exams' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-dark-border">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Subject</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Class</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden sm:table-cell">Date</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden md:table-cell">Duration</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary hidden lg:table-cell">Max Marks</th>
                  <th className="p-4 text-sm font-semibold text-gray-600 dark:text-dark-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map(exam => (
                  <tr key={exam.id} className="border-b border-gray-200 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-4 font-semibold text-gray-800 dark:text-white">{exam.subject}</td>
                    <td className="p-4 text-gray-700 dark:text-dark-text">{exam.class}</td>
                    <td className="p-4 hidden sm:table-cell text-gray-700 dark:text-dark-text">{exam.date}</td>
                    <td className="p-4 hidden md:table-cell text-gray-700 dark:text-dark-text">{exam.duration}</td>
                    <td className="p-4 hidden lg:table-cell text-gray-700 dark:text-dark-text">{exam.maxMarks}</td>
                    <td className="p-4"><ExamBadge status={exam.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredExams.length === 0 && (
              <p className="text-center py-8 text-gray-500 dark:text-dark-text-secondary">No exams found.</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AcademicsPage;

