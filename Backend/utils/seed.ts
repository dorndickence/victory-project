import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;
if (!SEED_ADMIN_PASSWORD) {
  console.error('ERROR: SEED_ADMIN_PASSWORD environment variable is required to run the seed script.');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    await prisma.$transaction([
      prisma.student.deleteMany(),
      prisma.teacher.deleteMany(),
      prisma.feeRecord.deleteMany(),
      prisma.attendanceRecord.deleteMany(),
      prisma.studentFee.deleteMany(),
      prisma.subject.deleteMany(),
      prisma.exam.deleteMany(),
      prisma.book.deleteMany(),
      prisma.borrowRecord.deleteMany(),
      prisma.announcement.deleteMany(),
      prisma.user.deleteMany()
    ]);

    // Seed students
    const studentSeeds = [
      { name: 'Alice Johnson', className: '10A', rollNo: 1, feesDue: 0, attendance: 95, avatar: '', status: 'Active' },
      { name: 'Bob Williams', className: '10B', rollNo: 2, feesDue: 50, attendance: 88, avatar: '', status: 'Active' },
      { name: 'Charlie Brown', className: '9A', rollNo: 3, feesDue: 0, attendance: 92, avatar: '', status: 'Active' },
      { name: 'Diana Miller', className: '11A', rollNo: 4, feesDue: 150, attendance: 75, avatar: '', status: 'Inactive' },
      { name: 'Ethan Davis', className: '12B', rollNo: 5, feesDue: 0, attendance: 98, avatar: '', status: 'Active' }
    ];
    const students = await Promise.all(
      studentSeeds.map((data) => prisma.student.create({ data }))
    );

    // Seed teachers
    await prisma.teacher.createMany({
      data: [
        { name: 'Mr. Smith', subject: 'Mathematics', experience: 10, avatar: '', status: 'Active' },
        { name: 'Ms. Jones', subject: 'Science', experience: 8, avatar: '', status: 'Active' },
        { name: 'Dr. Taylor', subject: 'History', experience: 15, avatar: '', status: 'On Leave' },
        { name: 'Mrs. Adams', subject: 'English', experience: 6, avatar: '', status: 'Active' }
      ]
    });

    // Seed monthly fee summary records
    await prisma.feeRecord.createMany({
      data: [
        { month: 'Jan', collected: 45000, pending: 5000 },
        { month: 'Feb', collected: 48000, pending: 2000 },
        { month: 'Mar', collected: 47000, pending: 3000 },
        { month: 'Apr', collected: 49000, pending: 1000 },
        { month: 'May', collected: 46000, pending: 4000 },
        { month: 'Jun', collected: 50000, pending: 0 }
      ]
    });

    // Seed attendance records
    await prisma.attendanceRecord.createMany({
      data: [
        { month: 'Jan', present: 95, absent: 5 },
        { month: 'Feb', present: 92, absent: 8 },
        { month: 'Mar', present: 88, absent: 12 },
        { month: 'Apr', present: 96, absent: 4 },
        { month: 'May', present: 91, absent: 9 },
        { month: 'Jun', present: 98, absent: 2 }
      ]
    });

    // Seed per-student fee records
    await prisma.studentFee.createMany({
      data: [
        { studentId: students[0].id, studentName: students[0].name, className: '10A', month: 'Apr 2026', amount: 5000, paid: 5000, due: 0, status: 'Paid', dueDate: '2026-04-05' },
        { studentId: students[1].id, studentName: students[1].name, className: '10B', month: 'Apr 2026', amount: 5000, paid: 4950, due: 50, status: 'Partial', dueDate: '2026-04-05' },
        { studentId: students[2].id, studentName: students[2].name, className: '9A', month: 'Apr 2026', amount: 4500, paid: 4500, due: 0, status: 'Paid', dueDate: '2026-04-05' },
        { studentId: students[3].id, studentName: students[3].name, className: '11A', month: 'Apr 2026', amount: 5500, paid: 0, due: 5500, status: 'Unpaid', dueDate: '2026-04-05' },
        { studentId: students[4].id, studentName: students[4].name, className: '12B', month: 'Apr 2026', amount: 6000, paid: 6000, due: 0, status: 'Paid', dueDate: '2026-04-05' }
      ]
    });

    // Seed subjects
    await prisma.subject.createMany({
      data: [
        { name: 'Mathematics', className: '10A', teacherName: 'Mr. Smith', hoursPerWeek: 6 },
        { name: 'Science', className: '10A', teacherName: 'Ms. Jones', hoursPerWeek: 5 },
        { name: 'English', className: '10A', teacherName: 'Mrs. Adams', hoursPerWeek: 5 },
        { name: 'History', className: '10B', teacherName: 'Dr. Taylor', hoursPerWeek: 4 },
        { name: 'Mathematics', className: '9A', teacherName: 'Mr. Smith', hoursPerWeek: 6 }
      ]
    });

    // Seed exams
    await prisma.exam.createMany({
      data: [
        { subject: 'Mathematics', className: '10A', date: '2026-05-10', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
        { subject: 'Science', className: '10A', date: '2026-05-12', duration: '3 hrs', maxMarks: 100, status: 'Upcoming' },
        { subject: 'English', className: '10B', date: '2026-05-14', duration: '2.5 hrs', maxMarks: 80, status: 'Upcoming' },
        { subject: 'History', className: '9A', date: '2026-04-20', duration: '2 hrs', maxMarks: 80, status: 'Completed' }
      ]
    });

    // Seed books
    await prisma.book.createMany({
      data: [
        { title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', copies: 5, available: 3 },
        { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature', copies: 8, available: 6 },
        { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', copies: 4, available: 4 },
        { title: 'Calculus: Early Transcendentals', author: 'James Stewart', category: 'Mathematics', copies: 10, available: 7 },
        { title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', copies: 6, available: 5 }
      ]
    });

    // Seed borrow records
    await prisma.borrowRecord.createMany({
      data: [
        { bookTitle: 'Introduction to Algorithms', studentName: 'Alice Johnson', issueDate: '2026-04-01', dueDate: '2026-04-15', status: 'Overdue' },
        { bookTitle: 'The Great Gatsby', studentName: 'Charlie Brown', issueDate: '2026-04-05', dueDate: '2026-04-19', returnDate: '2026-04-18', status: 'Returned' },
        { bookTitle: 'Sapiens', studentName: 'Ethan Davis', issueDate: '2026-04-12', dueDate: '2026-04-26', status: 'Borrowed' }
      ]
    });

    // Seed announcements
    await prisma.announcement.createMany({
      data: [
        { title: 'Welcome to Victory School', message: 'Welcome to the new academic year! All students and staff are requested to review updated school policies.', audience: 'All', date: new Date().toISOString().split('T')[0], author: 'Principal' },
        { title: 'Exam Schedule Released', message: 'The final exam schedule for classes 9–12 has been released. Students can view it in the Academics section.', audience: 'Students', date: new Date().toISOString().split('T')[0], author: 'Admin' }
      ]
    });

    // Seed admin user (password comes from env, never hardcoded)
    const adminPasswordHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
    await prisma.user.create({
      data: {
        name: 'Admin User',
        email: process.env.SEED_ADMIN_EMAIL || 'admin@victory.school',
        password: adminPasswordHash,
        role: 'admin'
      }
    });

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

seedDatabase();
