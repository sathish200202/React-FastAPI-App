import React from "react";
import { Pencil, UploadCloud, SaveIcon } from "lucide-react";
import ProfilePic from "../assets/bruce wyane.jpg";

const ProfileEdit = ({ user }) => {
  return (
    <div>
      <div className="flex justify-center items-center mb-8">
        <div className="relative">
          <img
            src={user?.user?.profile_pic || ProfilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-300 cursor-pointer">
            <UploadCloud className="w-5 h-5 text-blue-600" />
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            value={user?.user?.username}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            readOnly
            value={user?.user?.email}
          />
        </div>

        <div className="pt-4 text-center">
          <button
            type="button"
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            <SaveIcon size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
