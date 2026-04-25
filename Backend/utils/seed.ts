import mongoose from 'mongoose';
import { MONGO_URI } from '../config/config';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import FeeRecord from '../models/FeeRecord';
import AttendanceRecord from '../models/AttendanceRecord';
import StudentFee from '../models/StudentFee';
import Subject from '../models/Subject';
import Exam from '../models/Exam';
import Book from '../models/Book';
import BorrowRecord from '../models/BorrowRecord';
import Announcement from '../models/Announcement';
import User from '../models/User';

const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
if (!SEED_ADMIN_PASSWORD) {
  console.error('ERROR: SEED_ADMIN_PASSWORD environment variable is required to run the seed script.');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    // Clear existing data
    await Promise.all([
      Student.deleteMany(),
      Teacher.deleteMany(),
      FeeRecord.deleteMany(),
      AttendanceRecord.deleteMany(),
      StudentFee.deleteMany(),
      Subject.deleteMany(),
      Exam.deleteMany(),
      Book.deleteMany(),
      BorrowRecord.deleteMany(),
      Announcement.deleteMany(),
      User.deleteMany()
    ]);

    // Seed students
    const students = [
      { id: 'S001', name: 'Alice Johnson', class: '10A', rollNo: 1, feesDue: 0, attendance: 95, avatar: '', status: 'Active' },
      { id: 'S002', name: 'Bob Williams', class: '10B', rollNo: 2, feesDue: 50, attendance: 88, avatar: '', status: 'Active' },
      { id: 'S003', name: 'Charlie Brown', class: '9A', rollNo: 3, feesDue: 0, attendance: 92, avatar: '', status: 'Active' },
      { id: 'S004', name: 'Diana Miller', class: '11A', rollNo: 4, feesDue: 150, attendance: 75, avatar: '', status: 'Inactive' },
      { id: 'S005', name: 'Ethan Davis', class: '12B', rollNo: 5, feesDue: 0, attendance: 98, avatar: '', status: 'Active' },
    ];
    await Student.insertMany(students);

    // Seed teachers
    const teachers = [
      { id: 'T01', name: 'Mr. Smith', subject: 'Mathematics', experience: 10, avatar: '', status: 'Active' },
      { id: 'T02', name: 'Ms. Jones', subject: 'Science', experience: 8, avatar: '', status: 'Active' },
      { id: 'T03', name: 'Dr. Taylor', subject: 'History', experience: 15, avatar: '', status: 'On Leave' },
      { id: 'T04', name: 'Mrs. Adams', subject: 'English', experience: 6, avatar: '', status: 'Active' },
    ];
    await Teacher.insertMany(teachers);

    // Seed monthly fee summary records
    const feeRecords = [
      { month: 'Jan', collected: 45000, pending: 5000 },
      { month: 'Feb', collected: 48000, pending: 2000 },
      { month: 'Mar', collected: 47000, pending: 3000 },
      { month: 'Apr', collected: 49000, pending: 1000 },
      { month: 'May', collected: 46000, pending: 4000 },
      { month: 'Jun', collected: 50000, pending: 0 },
    ];
    await FeeRecord.insertMany(feeRecords);

    // Seed attendance records
    const attendanceRecords = [
      { month: 'Jan', present: 95, absent: 5 },
      { month: 'Feb', present: 92, absent: 8 },
      { month: 'Mar', present: 88, absent: 12 },
      { month: 'Apr', present: 96, absent: 4 },
      { month: 'May', present: 91, absent: 9 },
      { month: 'Jun', present: 98, absent: 2 },
    ];
    await AttendanceRecord.insertMany(attendanceRecords);

    // Seed per-student fee records
    const studentFees = [
      { studentId: 'S001', studentName: 'Alice Johnson', class: '10A', month: 'Apr 2026', amount: 5000, paid: 5000, due: 0, status: 'Paid', dueDate: '2026-04-05' },
      { studentId: 'S002', studentName: 'Bob Williams', class: '10B', month: 'Apr 2026', amount: 5000, paid: 4950, due: 50, status: 'Partial', dueDate: '2026-04-05' },
      { studentId: 'S003', studentName: 'Charlie Brown', class: '9A', month: 'Apr 2026', amount: 4500, paid: 4500, due: 0, status: 'Paid', dueDate: '2026-04-05' },
      { studentId: 'S004', studentName: 'Diana Miller', class: '11A', month: 'Apr 2026', amount: 5500, paid: 0, due: 5500, status: 'Unpaid', dueDate: '2026-04-05' },
      { studentId: 'S005', studentName: 'Ethan Davis', class: '12B', month: 'Apr 2026', amount: 6000, paid: 6000, due: 0, status: 'Paid', dueDate: '2026-04-05' },
    ];
    await StudentFee.insertMany(studentFees);

    // Seed subjects
    const subjects = [
      { name: 'Mathematics', class: '10A', teacherName: 'Mr. Smith', hoursPerWeek: 6 },
      { name: 'Science', class: '10A', teacherName: 'Ms. Jones', hoursPerWeek: 5 },
      { name: 'English', class: '10A', teacherName: 'Mrs. Adams', hoursPerWeek: 5 },
      { name: 'History', class: '10B', teacherName: 'Dr. Taylor', hoursPerWeek: 4 },
      { name: 'Mathematics', class: '9A', teacherName: 'Mr. Smith', hoursPerWeek: 6 },
    ];
    await Subject.insertMany(subjects);

    // Seed exams
    const exams = [
      { subject: 'Mathematics', class: '10A', date: '2026-05-10', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
      { subject: 'Science', class: '10A', date: '2026-05-12', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
      { subject: 'English', class: '10B', date: '2026-05-14', duration: '2.5 hrs', maxMarks: 80, status: 'Upcoming' },
      { subject: 'History', class: '9A', date: '2026-04-20', duration: '2 hrs', maxMarks: 80, status: 'Completed' },
    ];
    await Exam.insertMany(exams);

    // Seed books
    const books = [
      { title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', copies: 5, available: 3 },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', copies: 8, available: 6 },
      { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', copies: 4, available: 4 },
      { title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', copies: 10, available: 7 },
      { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', copies: 6, available: 5 },
    ];
    await Book.insertMany(books);

    // Seed borrow records
    const borrowRecords = [
      { bookTitle: 'Introduction to Algorithms', studentName: 'Alice Johnson', issueDate: '2026-04-01', dueDate: '2026-04-15', status: 'Overdue' },
      { bookTitle: 'The Great Gatsby', studentName: 'Charlie Brown', issueDate: '2026-04-05', dueDate: '2026-04-19', returnDate: '2026-04-18', status: 'Returned' },
      { bookTitle: 'Sapiens', studentName: 'Ethan Davis', issueDate: '2026-04-12', dueDate: '2026-04-26', status: 'Borrowed' },
    ];
    await BorrowRecord.insertMany(borrowRecords);

    // Seed announcements
    const announcements = [
      { title: 'Welcome to Victory School', message: 'Welcome to the new academic year! All students and staff are requested to review updated school policies.', audience: 'All', date: new Date().toISOString().split('T')[0], author: 'Principal' },
      { title: 'Exam Schedule Released', message: 'The final exam schedule for classes 9–12 has been released. Students can view it in the Academics section.', audience: 'Students', date: new Date().toISOString().split('T')[0], author: 'Admin' },
    ];
    await Announcement.insertMany(announcements);

    // Seed admin user (password comes from env, never hardcoded)
    await User.create({
      name: 'Admin User',
      email: process.env.SEED_ADMIN_EMAIL || 'admin@victory.school',
      password: SEED_ADMIN_PASSWORD,
      role: 'admin'
    });

    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();