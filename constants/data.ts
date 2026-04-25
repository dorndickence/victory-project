import type { Student, Teacher, FeeRecord, AttendanceRecord, Subject, Exam, StudentFee, Book, BorrowRecord, Announcement } from '../types';

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
    { id: 'T04', name: 'Mrs. Adams', subject: 'English', experience: 6, avatar: 'https://picsum.photos/seed/adams/40/40', status: 'Active' },
    { id: 'T05', name: 'Mr. Brown', subject: 'Computer Science', experience: 9, avatar: 'https://picsum.photos/seed/brown/40/40', status: 'Active' },
    { id: 'T06', name: 'Ms. Clark', subject: 'Physical Education', experience: 4, avatar: 'https://picsum.photos/seed/clark/40/40', status: 'Active' },
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

// ── Academics ───────────────────────────────────────────────

export const subjectsData: Subject[] = [
  { id: 'SUB01', name: 'Mathematics', class: '10A', teacherName: 'Mr. Smith', hoursPerWeek: 6 },
  { id: 'SUB02', name: 'Science', class: '10A', teacherName: 'Ms. Jones', hoursPerWeek: 5 },
  { id: 'SUB03', name: 'English', class: '10A', teacherName: 'Mrs. Adams', hoursPerWeek: 5 },
  { id: 'SUB04', name: 'History', class: '10B', teacherName: 'Dr. Taylor', hoursPerWeek: 4 },
  { id: 'SUB05', name: 'Computer Science', class: '10B', teacherName: 'Mr. Brown', hoursPerWeek: 4 },
  { id: 'SUB06', name: 'Mathematics', class: '9A', teacherName: 'Mr. Smith', hoursPerWeek: 6 },
  { id: 'SUB07', name: 'Physical Education', class: '9A', teacherName: 'Ms. Clark', hoursPerWeek: 3 },
  { id: 'SUB08', name: 'Science', class: '11A', teacherName: 'Ms. Jones', hoursPerWeek: 5 },
  { id: 'SUB09', name: 'Mathematics', class: '12B', teacherName: 'Mr. Smith', hoursPerWeek: 6 },
  { id: 'SUB10', name: 'English', class: '11C', teacherName: 'Mrs. Adams', hoursPerWeek: 5 },
];

export const examsData: Exam[] = [
  { id: 'E001', subject: 'Mathematics', class: '10A', date: '2026-05-10', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
  { id: 'E002', subject: 'Science', class: '10A', date: '2026-05-12', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
  { id: 'E003', subject: 'English', class: '10B', date: '2026-05-14', duration: '2.5 hrs', maxMarks: 80, status: 'Upcoming' },
  { id: 'E004', subject: 'History', class: '9A', date: '2026-04-20', duration: '2 hrs', maxMarks: 80, status: 'Completed' },
  { id: 'E005', subject: 'Computer Science', class: '11A', date: '2026-04-18', duration: '2 hrs', maxMarks: 100, status: 'Completed' },
  { id: 'E006', subject: 'Mathematics', class: '12B', date: '2026-04-15', duration: '3 hrs', maxMarks: 100, status: 'Completed' },
];

// ── Fees ────────────────────────────────────────────────────

export const studentFeesData: StudentFee[] = [
  { id: 'F001', studentId: 'S001', studentName: 'Alice Johnson', class: '10A', month: 'Apr 2026', amount: 5000, paid: 5000, due: 0, status: 'Paid', dueDate: '2026-04-05' },
  { id: 'F002', studentId: 'S002', studentName: 'Bob Williams', class: '10B', month: 'Apr 2026', amount: 5000, paid: 4950, due: 50, status: 'Partial', dueDate: '2026-04-05' },
  { id: 'F003', studentId: 'S003', studentName: 'Charlie Brown', class: '9A', month: 'Apr 2026', amount: 4500, paid: 4500, due: 0, status: 'Paid', dueDate: '2026-04-05' },
  { id: 'F004', studentId: 'S004', studentName: 'Diana Miller', class: '11A', month: 'Apr 2026', amount: 5500, paid: 5350, due: 150, status: 'Partial', dueDate: '2026-04-05' },
  { id: 'F005', studentId: 'S005', studentName: 'Ethan Davis', class: '12B', month: 'Apr 2026', amount: 6000, paid: 6000, due: 0, status: 'Paid', dueDate: '2026-04-05' },
  { id: 'F006', studentId: 'S006', studentName: 'Fiona Garcia', class: '10A', month: 'Apr 2026', amount: 5000, paid: 4980, due: 20, status: 'Partial', dueDate: '2026-04-05' },
  { id: 'F007', studentId: 'S007', studentName: 'George Rodriguez', class: '11C', month: 'Apr 2026', amount: 5500, paid: 5500, due: 0, status: 'Paid', dueDate: '2026-04-05' },
  { id: 'F008', studentId: 'S008', studentName: 'Hannah Wilson', class: '9C', month: 'Apr 2026', amount: 4500, paid: 4200, due: 300, status: 'Partial', dueDate: '2026-04-05' },
  { id: 'F009', studentId: 'S001', studentName: 'Alice Johnson', class: '10A', month: 'Mar 2026', amount: 5000, paid: 5000, due: 0, status: 'Paid', dueDate: '2026-03-05' },
  { id: 'F010', studentId: 'S004', studentName: 'Diana Miller', class: '11A', month: 'Mar 2026', amount: 5500, paid: 0, due: 5500, status: 'Unpaid', dueDate: '2026-03-05' },
];

// ── Library ─────────────────────────────────────────────────

export const booksData: Book[] = [
  { id: 'B001', title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', copies: 5, available: 3 },
  { id: 'B002', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', copies: 8, available: 6 },
  { id: 'B003', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', copies: 4, available: 4 },
  { id: 'B004', title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', copies: 10, available: 7 },
  { id: 'B005', title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', copies: 6, available: 5 },
  { id: 'B006', title: 'Clean Code', author: 'Robert C. Martin', category: 'Computer Science', copies: 3, available: 1 },
  { id: 'B007', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Literature', copies: 7, available: 7 },
  { id: 'B008', title: 'Physics for Scientists and Engineers', author: 'Serway & Jewett', category: 'Science', copies: 8, available: 5 },
];

export const borrowRecordsData: BorrowRecord[] = [
  { id: 'BR001', bookTitle: 'Introduction to Algorithms', studentName: 'Alice Johnson', issueDate: '2026-04-01', dueDate: '2026-04-15', status: 'Overdue' },
  { id: 'BR002', bookTitle: 'Clean Code', studentName: 'Bob Williams', issueDate: '2026-04-10', dueDate: '2026-04-24', status: 'Borrowed' },
  { id: 'BR003', bookTitle: 'The Great Gatsby', studentName: 'Charlie Brown', issueDate: '2026-04-05', dueDate: '2026-04-19', returnDate: '2026-04-18', status: 'Returned' },
  { id: 'BR004', bookTitle: 'Physics for Scientists and Engineers', studentName: 'Ethan Davis', issueDate: '2026-04-12', dueDate: '2026-04-26', status: 'Borrowed' },
  { id: 'BR005', bookTitle: 'Sapiens', studentName: 'Fiona Garcia', issueDate: '2026-04-08', dueDate: '2026-04-22', returnDate: '2026-04-20', status: 'Returned' },
  { id: 'BR006', bookTitle: 'Calculus: Early Transcendentals', studentName: 'Hannah Wilson', issueDate: '2026-03-25', dueDate: '2026-04-08', status: 'Overdue' },
];

// ── Communication ────────────────────────────────────────────

export const announcementsData: Announcement[] = [
  { id: 'A001', title: 'Annual Sports Day', message: 'Annual Sports Day will be held on May 20th. All students are requested to participate. Parents are welcome to attend.', audience: 'All', date: '2026-04-22', author: 'Principal' },
  { id: 'A002', title: 'Exam Schedule Released', message: 'The final exam schedule for classes 9–12 has been released. Students can download the schedule from the Academics section.', audience: 'Students', date: '2026-04-20', author: 'Admin' },
  { id: 'A003', title: 'Staff Meeting – May 2', message: 'All teaching staff are required to attend the monthly review meeting on May 2nd at 3:00 PM in the conference room.', audience: 'Teachers', date: '2026-04-18', author: 'Principal' },
  { id: 'A004', title: 'Fee Reminder – April Dues', message: 'Kindly clear any pending fee dues for April before May 5th to avoid late fees.', audience: 'Parents', date: '2026-04-15', author: 'Accounts' },
  { id: 'A005', title: 'Library Timings Update', message: 'The library will now remain open until 6:00 PM on weekdays starting May 1st.', audience: 'All', date: '2026-04-10', author: 'Librarian' },
];
