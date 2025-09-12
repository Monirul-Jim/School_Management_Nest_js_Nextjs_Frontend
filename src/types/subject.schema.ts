// Update the SubjectType
export type SubjectType = 'MCQ' | 'CQ' | 'PRACTICAL' | 'WR';

// Define the shape of the studentClass object
export interface StudentClass {
  _id: string;
  name: string;
}
export interface MergedSubject {
  _id: string;
  name: string;
}

// Update the CreateSubjectInput interface
export interface CreateSubjectInput {
  _id: string;
  name: string;
  studentClass: string | StudentClass; // Allow both string (ID) and object
  totalMark: number;
  types: SubjectType[];
  mcqMark?: number;
  cqMark?: number;
  practicalMark?: number;
  WR?: number;
  mergedWith?: MergedSubject[]; 
}