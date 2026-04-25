import mongoose from 'mongoose';
import { MONGO_URI } from '../config/config';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import FeeRecord from '../models/FeeRecord';
import AttendanceRecord from '../models/AttendanceRecord';
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
      User.deleteMany()
    ]);

    // Seed students
    const students = [
      { id: 'S001', name: 'Alice Johnson', class: '10A', rollNo: 1, feesDue: 0, attendance: 95, avatar: '', status: 'Active' },
      { id: 'S002', name: 'Bob Williams', class: '10B', rollNo: 2, feesDue: 50, attendance: 88, avatar: '', status: 'Active' },
      { id: 'S003', name: 'Charlie Brown', class: '9A', rollNo: 3, feesDue: 0, attendance: 92, avatar: '', status: 'Active' },
    ];
    await Student.insertMany(students);

    // Seed teachers
    const teachers = [
      { id: 'T01', name: 'Mr. Smith', subject: 'Mathematics', experience: 10, avatar: '', status: 'Active' },
      { id: 'T02', name: 'Ms. Jones', subject: 'Science', experience: 8, avatar: '', status: 'Active' },
    ];
    await Teacher.insertMany(teachers);

    // Seed fee records
    const feeRecords = [
      { month: 'Jan', collected: 45000, pending: 5000 },
      { month: 'Feb', collected: 48000, pending: 2000 },
      { month: 'Mar', collected: 47000, pending: 3000 },
    ];
    await FeeRecord.insertMany(feeRecords);

    // Seed attendance records
    const attendanceRecords = [
      { month: 'Jan', present: 95, absent: 5 },
      { month: 'Feb', present: 92, absent: 8 },
      { month: 'Mar', present: 88, absent: 12 },
    ];
    await AttendanceRecord.insertMany(attendanceRecords);

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