export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student' | 'User' | 'Guardian';
  status: 'active' | 'blocked' | 'deleted';
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}
export interface UsersResponse {
  total: number;
  totalPages: number;
  page: number;
  limit: number;
  data: User[];
}
