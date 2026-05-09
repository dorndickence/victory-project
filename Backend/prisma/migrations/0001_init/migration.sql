-- Victory School Management System – initial PostgreSQL schema
-- Generated for Prisma migration 0001_init

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE "users" (
    "id"       UUID NOT NULL DEFAULT gen_random_uuid(),
    "name"     TEXT NOT NULL,
    "email"    TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role"     TEXT NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

CREATE TABLE "students" (
    "id"         UUID NOT NULL DEFAULT gen_random_uuid(),
    "name"       TEXT NOT NULL,
    "class"      TEXT NOT NULL,
    "rollNo"     INTEGER NOT NULL,
    "feesDue"    DOUBLE PRECISION NOT NULL DEFAULT 0,
    "attendance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avatar"     TEXT NOT NULL DEFAULT '',
    "status"     TEXT NOT NULL DEFAULT 'Active',
    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "teachers" (
    "id"         UUID NOT NULL DEFAULT gen_random_uuid(),
    "name"       TEXT NOT NULL,
    "subject"    TEXT NOT NULL,
    "experience" INTEGER NOT NULL DEFAULT 0,
    "avatar"     TEXT NOT NULL DEFAULT '',
    "status"     TEXT NOT NULL DEFAULT 'Active',
    CONSTRAINT "teachers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "fee_records" (
    "id"        UUID NOT NULL DEFAULT gen_random_uuid(),
    "month"     TEXT NOT NULL,
    "collected" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "pending"   DOUBLE PRECISION NOT NULL DEFAULT 0,
    CONSTRAINT "fee_records_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "attendance_records" (
    "id"      UUID NOT NULL DEFAULT gen_random_uuid(),
    "month"   TEXT NOT NULL,
    "present" INTEGER NOT NULL DEFAULT 0,
    "absent"  INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "student_fees" (
    "id"          UUID NOT NULL DEFAULT gen_random_uuid(),
    "studentId"   TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "class"       TEXT NOT NULL,
    "month"       TEXT NOT NULL,
    "amount"      DOUBLE PRECISION NOT NULL,
    "paid"        DOUBLE PRECISION NOT NULL,
    "due"         DOUBLE PRECISION NOT NULL,
    "status"      TEXT NOT NULL,
    "dueDate"     TEXT NOT NULL,
    CONSTRAINT "student_fees_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "subjects" (
    "id"           UUID NOT NULL DEFAULT gen_random_uuid(),
    "name"         TEXT NOT NULL,
    "class"        TEXT NOT NULL,
    "teacherName"  TEXT NOT NULL,
    "hoursPerWeek" INTEGER NOT NULL,
    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exams" (
    "id"       UUID NOT NULL DEFAULT gen_random_uuid(),
    "subject"  TEXT NOT NULL,
    "class"    TEXT NOT NULL,
    "date"     TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "maxMarks" INTEGER NOT NULL,
    "status"   TEXT NOT NULL DEFAULT 'Upcoming',
    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "books" (
    "id"        UUID NOT NULL DEFAULT gen_random_uuid(),
    "title"     TEXT NOT NULL,
    "author"    TEXT NOT NULL,
    "category"  TEXT NOT NULL,
    "copies"    INTEGER NOT NULL,
    "available" INTEGER NOT NULL,
    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "borrow_records" (
    "id"          UUID NOT NULL DEFAULT gen_random_uuid(),
    "bookTitle"   TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "issueDate"   TEXT NOT NULL,
    "dueDate"     TEXT NOT NULL,
    "returnDate"  TEXT,
    "status"      TEXT NOT NULL DEFAULT 'Borrowed',
    CONSTRAINT "borrow_records_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "announcements" (
    "id"       UUID NOT NULL DEFAULT gen_random_uuid(),
    "title"    TEXT NOT NULL,
    "message"  TEXT NOT NULL,
    "audience" TEXT NOT NULL DEFAULT 'All',
    "date"     TEXT NOT NULL,
    "author"   TEXT NOT NULL,
    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);
