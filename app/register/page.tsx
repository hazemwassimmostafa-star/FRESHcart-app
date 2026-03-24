"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaGoogle,
  FaFacebookF,
  FaUserPlus,
} from "react-icons/fa";
import { axiosInstance } from "../../lib/axios";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  acceptTerms: boolean;
};

const schema: yup.ObjectSchema<RegisterFormData> = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^[A-Z][a-z0-9]{5,10}$/,
      "Password must start with a capital letter and be 6 to 11 characters"
    ),
  rePassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  acceptTerms: yup
    .boolean()
    .required("You must agree to the terms")
    .oneOf([true], "You must agree to the terms"),
});

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const passwordValue = watch("password") || "";

  async function onSubmit(values: RegisterFormData) {
    setIsLoading(true);

    try {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        rePassword: values.rePassword,
        phone: values.phone,
      };

      const response = await axiosInstance.post("/auth/signup", payload);

      if (response.data.message === "success") {
        toast.success("Account created successfully");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const passwordStrength =
    passwordValue.length >= 8 ? "Good" : passwordValue.length >= 6 ? "Weak" : "";

  return (
    <div className="min-h-screen bg-[#f8faf8]">
      <div className="mx-auto grid max-w-[1450px] grid-cols-1 lg:grid-cols-2">
        <div className="hidden border-r border-gray-200 bg-[#f8faf8] px-12 py-16 lg:block xl:px-20">
          <div className="mx-auto max-w-[560px]">
            <h1 className="mb-5 text-5xl font-bold leading-tight text-slate-800 xl:text-6xl">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>

            <p className="mb-12 max-w-[700px] text-2xl leading-relaxed text-slate-600">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            <div className="space-y-8">
              <Feature
                icon={<FaStar />}
                title="Premium Quality"
                text="Premium quality products sourced from trusted suppliers."
              />
              <Feature
                icon={<FaTruck />}
                title="Fast Delivery"
                text="Same-day delivery available in most areas."
              />
              <Feature
                icon={<FaShieldAlt />}
                title="Secure Shopping"
                text="Your data and payments are completely secure."
              />
            </div>

            <div className="mt-14 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                  👩
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-slate-800">
                    Sarah Johnson
                  </h4>
                  <div className="mt-1 flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </div>

              <p className="text-lg italic leading-relaxed text-slate-600">
                “FreshCart has transformed my shopping experience. The quality
                of the products is outstanding, and the delivery is always on
                time. Highly recommend!”
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-16 sm:px-10 lg:px-12">
          <div className="w-full max-w-[560px] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="mb-2 text-4xl font-bold text-slate-800">
              Create Your Account
            </h2>
            <p className="mb-8 text-lg text-slate-500">
              Start your journey with us today
            </p>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-gray-50"
              >
                <FaGoogle className="text-red-500" />
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-3 rounded-xl border border-gray-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-gray-50"
              >
                <FaFacebookF className="text-blue-600" />
                Facebook
              </button>
            </div>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-sm font-medium text-slate-400">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <InputWrapper label="Name" error={errors.name?.message}>
                <input
                  type="text"
                  placeholder="Ali"
                  {...register("name")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-slate-700 outline-none transition focus:border-green-500"
                />
              </InputWrapper>

              <InputWrapper label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  placeholder="ali@example.com"
                  {...register("email")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-slate-700 outline-none transition focus:border-green-500"
                />
              </InputWrapper>

              <InputWrapper label="Password" error={errors.password?.message}>
                <input
                  type="password"
                  placeholder="create a strong password"
                  {...register("password")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-slate-700 outline-none transition focus:border-green-500"
                />

                <div className="mt-3 flex items-center justify-between gap-4">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${
                        passwordValue.length >= 8
                          ? "w-[75%] bg-green-500"
                          : passwordValue.length >= 6
                          ? "w-[40%] bg-yellow-500"
                          : "w-[15%] bg-red-400"
                      }`}
                    />
                  </div>
                  <span className="text-sm font-medium text-slate-500">
                    {passwordStrength}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-400">
                  Must be at least 8 characters with numbers and symbols
                </p>
              </InputWrapper>

              <InputWrapper
                label="Confirm Password"
                error={errors.rePassword?.message}
              >
                <input
                  type="password"
                  placeholder="confirm your password"
                  {...register("rePassword")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-slate-700 outline-none transition focus:border-green-500"
                />
              </InputWrapper>

              <InputWrapper label="Phone Number" error={errors.phone?.message}>
                <input
                  type="tel"
                  placeholder="+1 234 567 8900"
                  {...register("phone")}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3.5 text-slate-700 outline-none transition focus:border-green-500"
                />
              </InputWrapper>

              <div>
                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    {...register("acceptTerms")}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="font-medium text-green-600">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="font-medium text-green-600">
                      Privacy Policy
                    </span>
                    <span className="text-red-500"> *</span>
                  </span>
                </label>

                {errors.acceptTerms && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.acceptTerms.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                <FaUserPlus />
                {isLoading ? "Creating..." : "Create My Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-green-600">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
        {icon}
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-slate-800">{title}</h3>
        <p className="mt-1 text-xl text-slate-600">{text}</p>
      </div>
    </div>
  );
}

function InputWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2.5 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      {children}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}