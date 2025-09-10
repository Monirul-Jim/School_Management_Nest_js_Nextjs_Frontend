"use client";

import { useDebounce } from "@/hooks/useDebounce";
import {
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useRegisterStudentMutation,
  useUpdateStudentMutation,
} from "@/redux/api/studentApi";
import { useGetStudentAllClassesQuery } from "@/redux/api/studentClassApi";
import Pagination from "@/Shared/Pagination/Pagination";
import { Student } from "@/types/create-student.schema";
import { StudentClass } from "@/types/student.schema";
import { Eye, EyeOff, Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type StudentFormInputs = {
  firstName?: string;
  lastName?: string;
  fatherName: string;
  motherName: string;
  presentAddress: string;
  permanentAddress: string;
  guardianNumber: string;
  localGuardianNumber?: string;
  localGuardianName?: string;
  bloodGroup?: string;
  classId: string;
  gender: "Male" | "Female";
  classRole?: number;
  email: string;
  password: string;
  dateOfBirth: string; // new field
};


export default function StudentForm() {
  const { register, handleSubmit, reset } = useForm<StudentFormInputs>();
  const { data: classes = [] } = useGetStudentAllClassesQuery();
  const [registerStudent, { isLoading }] = useRegisterStudentMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [updateStudent] = useUpdateStudentMutation();
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isLoading: sLoading,
    isError,
  } = useGetAllStudentsQuery({
    page: currentPage,
    search: debouncedSearch || undefined,
    classId: selectedClass || undefined,
    bloodGroup: selectedBloodGroup || undefined,
  });
  const { data: studentDetails, isLoading: isStudentLoading } =
    useGetStudentByIdQuery(selectedStudentId ?? "", {
      skip: !selectedStudentId,
    });
  if (sLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center">Failed to load students.</div>
    );

  const students = data?.data || [];
 const onSubmit = async (formData: StudentFormInputs) => {
  try {
    if (editingStudent) {
      // 🔄 Update existing student
      await updateStudent({
        id: editingStudent._id,
        body: formData,
      }).unwrap();
      alert("Student updated successfully!");
    } else {
      // ➕ Register new student
      await registerStudent(formData).unwrap();
      alert("Student registered successfully!");
    }
    reset();
    setEditingStudent(null); // clear edit mode
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "data" in err) {
      const errorData = err as { data: { message?: string } };
      alert(errorData?.data?.message || "Failed to save student");
    } else {
      alert("Failed to save student");
    }
  }
};

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8">
      <div className=" w-full bg-white p-6 sm:p-8 lg:p-10 shadow-xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          {editingStudent ? "Edit Student" : "Register New Student"}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Fill in the details below to add a new student to the system.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <input
                type="text"
                placeholder="Father's Name"
                {...register("fatherName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
              <input
                type="text"
                placeholder="Mother's Name"
                {...register("motherName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
              <input
                type="text"
                placeholder="Guardian Number"
                {...register("guardianNumber")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                {...register("dateOfBirth")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
          </div>

          {/* Contact and Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Contact and Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Local Guardian Name"
                {...register("localGuardianName")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <input
                type="text"
                placeholder="Local Guardian Number"
                {...register("localGuardianNumber")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Present Address"
                {...register("presentAddress")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
              <input
                type="text"
                placeholder="Permanent Address"
                {...register("permanentAddress")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Additional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                {...register("bloodGroup")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <select
                {...register("gender")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          {/* Class and Role */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Class Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                {...register("classId")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-500"
                required
              >
                <option value="">Select Class</option>
                {classes?.map((cls) => (
                  <option key={cls._id} value={cls._id}>
                    {cls.name}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Class Role (number)"
                {...register("classRole")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
            </div>
          </div>
          {/* Email and Password */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                required
              />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                {editingStudent ? "Updating..." : "Registering..."}
              </>
            ) : editingStudent ? (
              "Update Student"
            ) : (
              "Register Student"
            )}
          </button>
        </form>
        {/* Students Table */}
        <div className="  mt-10">
          {/* Search */}
          <div className="flex gap-4 mb-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or guardian"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-2 py-1 text-sm flex-1"
            />

            {/* Class Filter */}
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">All Classes</option>
              {classes.map((cls: StudentClass) => (
                <option key={cls._id} value={cls._id}>
                  {cls.name}
                </option>
              ))}
            </select>

            {/* Blood Group Filter */}
            <select
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value="">All Blood Groups</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Guardian</th>
                  <th className="px-4 py-2 text-left">Class</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Blood Group</th>
                  <th className="px-4 py-2 text-left">DOB</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {students.map((student: Student, index: number) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      {((data?.page || 1) - 1) *
                        (data?.limit || students.length) +
                        index +
                        1}
                    </td>
                    <td className="px-4 py-2">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="px-4 py-2">{student.fatherName}</td>
                    <td className="px-4 py-2">
                      {typeof student.class === "string"
                        ? student.class
                        : student.class?.name}
                    </td>
                    <td className="px-4 py-2">{student.classRole || "-"}</td>
                    <td className="px-4 py-2">{student.bloodGroup || "-"}</td>
                    <td className="px-4 py-2">
                      {student.dateOfBirth
                        ? new Date(student.dateOfBirth).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingStudent(student);
                          reset({
                            firstName: student.firstName,
                            lastName: student.lastName,
                            fatherName: student.fatherName,
                            motherName: student.motherName,
                            presentAddress: student.presentAddress,
                            permanentAddress: student.permanentAddress,
                            guardianNumber: student.guardianNumber,
                            localGuardianNumber: student.localGuardianNumber,
                            localGuardianName: student.localGuardianName,
                            bloodGroup: student.bloodGroup,
                            classId:
                              typeof student.class === "string"
                                ? student.class
                                : student.class?._id || "",
                            gender: student.gender,
                            classRole: student.classRole,
                            email: student.email,
                            password: student.password, // keep empty so user must re-enter if needed
                            dateOfBirth: student.dateOfBirth
                              ? new Date(student.dateOfBirth)
                                  .toISOString()
                                  .split("T")[0]
                              : "",
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStudentId(student._id);
                          setIsModalOpen(true);
                        }}
                        className="text-green-600 hover:text-green-800"
                        aria-label={`View details of ${student.firstName} ${student.lastName}`}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {students?.map((student: Student, index: number) => (
              <div
                key={student._id}
                className="bg-white shadow rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between">
                  <div className="font-semibold">
                    {student.firstName} {student.lastName}
                  </div>
                  <div className="text-gray-500 text-sm">
                    #
                    {((data?.page || 1) - 1) *
                      (data?.limit || students.length) +
                      index +
                      1}
                  </div>
                </div>
                <div className="text-sm">Guardian: {student.fatherName}</div>
                <div className="text-sm">
                  Class:
                  {typeof student.class === "string"
                    ? student.class
                    : student.class?.name}
                </div>
                <div className="text-sm">Role: {student.classRole || "-"}</div>
                <div className="text-sm">
                  Blood Group: {student.bloodGroup || "-"}
                </div>
                <div className="text-sm">
                  DOB:
                  {student.dateOfBirth
                    ? new Date(student.dateOfBirth).toLocaleDateString()
                    : "-"}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {data && (
            <Pagination
              currentPage={data.page}
              totalPages={data.totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              pageSiblings={2}
            />
          )}

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div>
              Page {data?.page} of {data?.totalPages}
            </div>
            <div>Total Students: {data?.total}</div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg relative shadow-2xl transform transition-all duration-300 scale-95 animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center space-x-4 mb-6 border-b pb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Eye size={24} className="text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {studentDetails?.firstName} {studentDetails?.lastName}
              </h2>
            </div>

            {/* Loading State */}
            {isStudentLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="animate-spin mr-2 text-blue-600" />
                Loading...
              </div>
            ) : studentDetails ? (
              <div className="space-y-3 text-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <p className="font-medium">Father:</p>
                  <p>{studentDetails.fatherName}</p>

                  <p className="font-medium">Mother:</p>
                  <p>{studentDetails.motherName}</p>

                  <p className="font-medium">Gender:</p>
                  <p>{studentDetails.gender}</p>

                  <p className="font-medium">Class:</p>
                  <p>
                    {typeof studentDetails.class === "string"
                      ? studentDetails.class
                      : studentDetails.class?.name ?? "-"}
                  </p>

                  <p className="font-medium">Role:</p>
                  <p>{studentDetails.classRole ?? "-"}</p>

                  <p className="font-medium">Blood Group:</p>
                  <p>{studentDetails.bloodGroup ?? "-"}</p>

                  <p className="font-medium">DOB:</p>
                  <p>
                    {studentDetails.dateOfBirth
                      ? new Date(
                          studentDetails.dateOfBirth
                        ).toLocaleDateString()
                      : "-"}
                  </p>

                  <p className="font-medium">Guardian Number:</p>
                  <p>{studentDetails.guardianNumber}</p>

                  <p className="font-medium">Local Guardian:</p>
                  <p>
                    {studentDetails.localGuardianName ?? "-"} (
                    {studentDetails.localGuardianNumber ?? "-"})
                  </p>

                  <p className="font-medium">Address:</p>
                  <p>
                    {studentDetails.presentAddress},
                    {studentDetails.permanentAddress}
                  </p>

                  <p className="font-medium">Email:</p>
                  <p>{studentDetails.email}</p>

                  <p className="font-medium">Password:</p>
                  <p>{studentDetails.password}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No student data found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
