import type { Student, Teacher, FeeRecord, AttendanceRecord } from '../types';

export const studentsData: Student[] = [
  { id: 'S001', name: 'Alice Johnson', class: '10A', rollNo: 1, feesDue: 0, attendance: 95, avatar: 'https://picsum.photos/seed/alice/40/40', status: 'Active' },
  { id: 'S002', name: 'Bob Williams', class: '10B', rollNo: 2, feesDue: 50, attendance: 88, avatar: 'https://picsum.photos/seed/bob/40/40', status: 'Active' },
  { id: 'S003', name: 'Charlie Brown', class: '9A', rollNo: 3, feesDue: 0, attendance: 92, avatar: 'https://picsum.photos/seed/charlie/40/40', status: 'Active' },
  { id: 'S004', name: 'Diana Miller', class: '11A', rollNo: 4, feesDue: 150, attendance: 75, avatar: 'https://picsum.photos/seed/diana/40/40', status: 'Inactive' },
  { id: 'S005', name: 'Ethan Davis', class: '12B', rollNo: 5, feesDue: 0, attendance: 98, avatar: 'https://picsum.photos/seed/ethan/40/40', status: 'Active' },
  { id: 'S006', name: 'Fiona Garcia', class: '10A', rollNo: 6, feesDue: 20, attendance: 91, avatar: 'https://picsum.photos/seed/fiona/40/40', status: 'Active' },
  { id: 'S007', name: 'George Rodriguez', class: '11C', rollNo: 7, feesDue: 0, attendance: 85, avatar: 'https://picsum.photos/seed/george/40/40', status: 'Active' },
  { id: 'S008', name: 'Hannah Wilson', class: '9C', rollNo: 8, feesDue: 300, attendance: 65, avatar: 'https://picsum.photos/seed/hannah/40/40', status: 'Active' },
];

export const teachersData: Teacher[] = [
    { id: 'T01', name: 'Mr. Smith', subject: 'Mathematics', experience: 10, avatar: 'https://picsum.photos/seed/smith/40/40', status: 'Active' },
    { id: 'T02', name: 'Ms. Jones', subject: 'Science', experience: 8, avatar: 'https://picsum.photos/seed/jones/40/40', status: 'Active' },
    { id: 'T03', name: 'Dr. Taylor', subject: 'History', experience: 15, avatar: 'https://picsum.photos/seed/taylor/40/40', status: 'On Leave' },
];

export const feeData: FeeRecord[] = [
  { month: 'Jan', collected: 45000, pending: 5000 },
  { month: 'Feb', collected: 48000, pending: 2000 },
  { month: 'Mar', collected: 47000, pending: 3000 },
  { month: 'Apr', collected: 49000, pending: 1000 },
  { month: 'May', collected: 46000, pending: 4000 },
  { month: 'Jun', collected: 50000, pending: 0 },
];

export const attendanceData: AttendanceRecord[] = [
    { month: 'Jan', present: 95, absent: 5 },
    { month: 'Feb', present: 92, absent: 8 },
    { month: 'Mar', present: 88, absent: 12 },
    { month: 'Apr', present: 96, absent: 4 },
    { month: 'May', present: 91, absent: 9 },
    { month: 'Jun', present: 98, absent: 2 },
];

export const totalStudents = 1250;
export const totalTeachers = 75;
export const totalParents = 2300;
export const totalRevenue = 525000;
