export interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: number;
  feesDue: number;
  attendance: number;
  avatar: string;
  status: 'Active' | 'Inactive';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  experience: number;
  avatar: string;
  status: 'Active' | 'On Leave';
}

export interface FeeRecord {
    month: string;
    collected: number;
    pending: number;
}

export interface AttendanceRecord {
    month: string;
    present: number;
    absent: number;
}

export interface Subject {
  id: string;
  name: string;
  class: string;
  teacherName: string;
  hoursPerWeek: number;
}

export interface Exam {
  id: string;
  subject: string;
  class: string;
  date: string;
  duration: string;
  maxMarks: number;
  status: 'Upcoming' | 'Completed';
}

export interface StudentFee {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  month: string;
  amount: number;
  paid: number;
  due: number;
  status: 'Paid' | 'Partial' | 'Unpaid';
  dueDate: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  copies: number;
  available: number;
}

export interface BorrowRecord {
  id: string;
  bookTitle: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'Borrowed' | 'Returned' | 'Overdue';
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  audience: 'All' | 'Students' | 'Teachers' | 'Parents';
  date: string;
  author: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
