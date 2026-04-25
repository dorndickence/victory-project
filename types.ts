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

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
