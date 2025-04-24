import React from "react";
import ProfileEdit from "../components/ProfileEdit";
import { useUserStore } from "../stores/useUserStore";

const ProfileEditPage = () => {
    const {user} = useUserStore()
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Edit Your Profile
      </h2>

      <ProfileEdit user={user}/>
    </div>
  );
};

export default ProfileEditPage;
