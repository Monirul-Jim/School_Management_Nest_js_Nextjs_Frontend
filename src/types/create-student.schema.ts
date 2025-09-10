// src/types/student.schema.ts

export type Gender = "Male" | "Female";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";

export interface StudentClass {
  _id: string;
  name: string;
  section?: string;
}

export interface Student {
  _id: string;
  firstName?: string;
  lastName?: string;
  fatherName: string;
  motherName: string;
  presentAddress: string;
  permanentAddress: string;
  guardianNumber: string;
  localGuardianName?: string;
  localGuardianNumber?: string;
  bloodGroup?: BloodGroup;
  gender: Gender;
  class: StudentClass | string; // populated or just ID
  classRole?: number;
  email: string;
  password?: string;
  dateOfBirth?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStudents {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  data: Student[];
}
