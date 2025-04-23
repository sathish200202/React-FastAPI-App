import React from "react";
import SignupForm from "../components/SignupForm";
import shoppyLogo from "../assets/shoppy.png";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image and Text with Slanted Edge */}
      <div
        className="w-1/2 relative bg-blue-300 flex flex-col items-center justify-center p-10 pr-24"
        style={{
          clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)", // Diagonal cut on the right side
        }}
      >
        <img
          src={shoppyLogo}
          alt="Shoppy"
          className="w-40 h-40 mb-6 border rounded-full"
        />
        <h2 className="text-5xl font-extrabold text-white text-center drop-shadow-lg tracking-wide mb-4 font-[Poppins]">
          Welcome to <span className="text-blue-500">Shoppy</span>
        </h2>
        <p className="text-lg text-black text-center max-w-xl mx-auto font-medium">
          Discover a seamless shopping experience with curated products and fast
          delivery. <span className="italic">Sign up to get started!</span>
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10 pl-0">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
