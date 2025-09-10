"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/redux/feature/hook";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/redux/api/authApi";
import { setUser } from "@/redux/feature/auth/authSlice";
interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  message?: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const [registerUser, { isLoading: registering }] = useRegisterUserMutation();
  const [loginUser, { isLoading: loggingIn }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData & LoginFormData>();
  const onRegister: SubmitHandler<RegisterFormData> = async (data) => {
    setRegisterError(null);
    try {
      await registerUser(data).unwrap();
      reset();
      setIsLogin(true);
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data: { message?: string } };
        setRegisterError(errorData?.data?.message || "Registration failed");
      } else {
        setRegisterError("Registration failed");
      }
    }
  };
  const onLogin: SubmitHandler<LoginFormData> = async (data) => {
    setLoginError(null);
    try {
      const res: LoginResponse = await loginUser(data).unwrap();
      if (res.message) {
        setLoginError(res.message);
        return;
      }
      dispatch(setUser({ user: res.user, token: res.accessToken }));
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "data" in err) {
        const errorData = err as { data: { message?: string } };
        setLoginError(errorData?.data?.message || "Login failed");
      } else {
        setLoginError("Login failed");
      }
    }
  };

  const submitting = registering || loggingIn;

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setRegisterError(null);
    setLoginError(null);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form
          onSubmit={handleSubmit(isLogin ? onLogin : onRegister)}
          className="space-y-5"
        >
          {!isLogin && (
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm mt-1">
                    First name required
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm mt-1">
                    Last name required
                  </span>
                )}
              </div>
            </>
          )}

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">Email required</span>
            )}
            {!isLogin && registerError && (
              <span className="text-red-500 text-sm mt-1">{registerError}</span>
            )}
            {isLogin && loginError && (
              <span className="text-red-500 text-sm mt-1">{loginError}</span>
            )}
          </div>

          <div className="relative flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
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
              <span className="text-red-500 text-sm mt-1">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            {submitting && <Loader2 className="animate-spin mr-2" size={18} />}
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
