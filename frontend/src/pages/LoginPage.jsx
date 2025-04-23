import React from "react";
import LoginForm from "../components/LoginForm";
import shoppyLogo from "../assets/loginshoppy.png";

const LoginPage = () => {
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
          className="w-40 h-40 mb-6 border rounded-full bg-blue-500"
        />
        <h2 className="text-5xl font-extrabold text-white text-center drop-shadow-lg tracking-wide mb-4 font-[Poppins]">
          Welcome Back to <span className="text-blue-500">Shoppy</span>
        </h2>
        <p className="text-lg text-black text-center max-w-xl mx-auto font-medium">
          Discover your favorite products with lightning-fast checkout and
          real-time tracking.{" "}
          <span className="italic">Log in to continue shopping!</span>
        </p>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10 pl-0">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;

//   <div className="min-h-screen flex">
//       {/* Left Side - Image and Description */}
//       <div className="w-3/5 bg-blue-100 flex flex-col justify-center items-center p-10 relative">
//         <div className="absolute inset-0 bg-[url('../assets/shoppylogo.png')] bg-no-repeat bg-contain bg-center opacity-10 z-0" />
//         <div className="relative z-10 text-center">
//           <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
//             Welcome to <span className="text-blue-600">Shoppy</span>
//           </h1>
//           <p className="text-lg text-gray-700 max-w-lg mx-auto">
//             Discover your favorite products with lightning-fast checkout and
//             real-time tracking. Log in to continue shopping!
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Login Form */}
//       <div className="w-2/5 flex justify-center items-center bg-white">
//         <LoginForm />
//       </div>
//     </div>
