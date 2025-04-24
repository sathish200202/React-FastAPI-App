import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import {
  BadgeCheck,
  Mail,
  User,
  ShieldCheck,
  AtSign,
  Pencil,
} from "lucide-react";

const Profile = () => {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="p-10 text-center text-lg text-gray-500">
        Loading user profile...
      </div>
    );
  }

  const profileImage = user?.user?.profile_pic; // assume null if not present

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <div className="flex items-center space-x-6 relative">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-blue-500"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-semibold border-2 border-blue-500">
              {user?.user?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Edit Button */}
          <Link
            to={"/profile/edit"}
            className="absolute top-0 right-0 bg-white border border-gray-300 rounded-full p-1 hover:bg-gray-100"
            title="Edit Profile Picture"
          >
            <Pencil size={16} className="text-gray-600" />
          </Link>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user?.user?.username}
            </h2>
            <div className="text-sm text-gray-500 flex items-center space-x-2 mt-1">
              {user?.user?.is_activate ? (
                <span className="flex items-center text-green-600 font-medium">
                  <BadgeCheck className="w-4 h-4 mr-1 text-green-600" />
                  Active
                </span>
              ) : (
                <span className="flex items-center text-red-500 font-medium">
                  <BadgeCheck className="w-4 h-4 mr-1 text-red-500" />
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4 space-y-4 text-gray-700">
          <div className="flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-600" />
            <span className="font-medium mr-2">Username:</span>
            <span>{user?.user?.username}</span>
          </div>
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-purple-600" />
            <span className="font-medium mr-2">Email:</span>
            <span>{user?.user?.email}</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2 text-yellow-500" />
            <span className="font-medium mr-2">Role:</span>
            <span>{user?.user?.role}</span>
          </div>
          <div className="flex items-center">
            <AtSign className="w-5 h-5 mr-2 text-pink-500" />
            <span className="font-medium mr-2">User ID:</span>
            <span>{user?.user?.id}</span>
          </div>
        </div>
      </div>
      <div>Orders</div>
    </div>
  );
};

export default Profile;
