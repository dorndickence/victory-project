import React from 'react';
import Card from '../components/ui/Card';
import { BookOpen } from 'lucide-react';

const AcademicsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Academic Management</h1>
      <Card>
        <div className="flex flex-col items-center justify-center h-96 text-gray-500 dark:text-dark-text-secondary">
          <BookOpen className="h-24 w-24 mb-4" />
          <h2 className="text-2xl font-semibold">Academic Management Module</h2>
          <p className="mt-2">This section is under construction.</p>
          <p>Here you'll manage classes, subjects, timetables, and exams.</p>
        </div>
      </Card>
    </div>
  );
};

export default AcademicsPage;
