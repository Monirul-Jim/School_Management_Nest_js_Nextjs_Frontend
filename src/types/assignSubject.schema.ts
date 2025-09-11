// src/types/assignSubject.schema.ts
export interface AssignSubjectDto {
  studentId: string;
  classId: string;
  subjectIds: string[];      // subjects to assign
  mainSubjectId?: string;    // optional
  fourthSubjectId?: string;  // optional
}
