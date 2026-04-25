import mongoose from 'mongoose';
import { MONGO_URI } from '../config/config';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import FeeRecord from '../models/FeeRecord';
import AttendanceRecord from '../models/AttendanceRecord';
import User from '../models/User';

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
      { id: 'S001', name: 'Alice Johnson', class: '10A', rollNo: 1, feesDue: 0, attendance: 95, avatar: 'https://picsum.photos/seed/alice/40/40', status: 'Active' },
      // Add all other students from the frontend data
    ];
    await Student.insertMany(students);

    // Seed teachers
    const teachers = [
      { id: 'T01', name: 'Mr. Smith', subject: 'Mathematics', experience: 10, avatar: 'https://picsum.photos/seed/smith/40/40', status: 'Active' },
      // Add all other teachers from the frontend data
    ];
    await Teacher.insertMany(teachers);

    // Seed fee records
    const feeRecords = [
      { month: 'Jan', collected: 45000, pending: 5000 },
      // Add all other fee records from the frontend data
    ];
    await FeeRecord.insertMany(feeRecords);

    // Seed attendance records
    const attendanceRecords = [
      { month: 'Jan', present: 95, absent: 5 },
      // Add all other attendance records from the frontend data
    ];
    await AttendanceRecord.insertMany(attendanceRecords);

    // Seed admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@victory.com',
      password: 'password123',
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