"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import ProtectedRoute from "../../components/shared/ProtectedRoute";
import { getUserDataFromToken } from "../../lib/token";

export default function ProfilePage() {
  const userData = getUserDataFromToken();

  const [profileData, setProfileData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    password: "",
    rePassword: "",
  });

  async function handleEditProfile(e: React.FormEvent) {
    e.preventDefault();

    try {
      toast.success("Profile form is ready");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    try {
      await axiosInstance.put("/users/changeMyPassword", passwordData);
      toast.success("Password changed successfully");

      setPasswordData({
        currentPassword: "",
        password: "",
        rePassword: "",
      });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold text-gray-800">My Profile</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Profile Info
            </h2>

            <div className="mb-6 grid gap-4">
              <div className="rounded-xl border bg-gray-50 p-4">
                <p className="text-sm text-gray-500">User ID</p>
                <p className="break-all font-semibold text-gray-800">
                  {userData?.id || "No user id"}
                </p>
              </div>
            </div>

            <form onSubmit={handleEditProfile} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Save Profile
              </button>
            </form>
          </div>

          <div className="rounded-2xl border bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Change Password
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordData.rePassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      rePassword: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}