import React from "react";

const Loading = ({ name }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="relative flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700 animate-pulse">
          Loading {name}...
        </p>
      </div>
    </div>
  );
};

export default Loading;

// const FancyLoader = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <div className="flex space-x-2">
//         <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
//         <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
//         <div className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"></div>
//       </div>
//     </div>
//   );
// };
