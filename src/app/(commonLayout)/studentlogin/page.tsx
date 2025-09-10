"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/redux/feature/hook";
import { setUser } from "@/redux/feature/auth/authSlice";
import { useLoginStudentMutation } from "@/redux/api/studentApi";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  student: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  message?: string;
}

const LoginPage: React.FC = () => {

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const [loginStudent, { isLoading: loggingIn }] = useLoginStudentMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onLogin: SubmitHandler<LoginFormData> = async (data) => {
    setLoginError(null);
    try {
      const res: LoginResponse = await loginStudent(data).unwrap();
      if (res.message) {
        setLoginError(res.message);
        return;
      }
      dispatch(setUser({ user: res.student, token: res.accessToken }));
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data: { message?: string } };
        setLoginError(errorData?.data?.message || "Login failed");
      } else {
        setLoginError("Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Student Login
        </h2>

        <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500 text-sm mt-1">Email required</span>}
            {loginError && <span className="text-red-500 text-sm mt-1">{loginError}</span>}
          </div>

          <div className="relative flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">Password must be at least 6 characters</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loggingIn}
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loggingIn && <Loader2 className="animate-spin mr-2" size={18} />}
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
