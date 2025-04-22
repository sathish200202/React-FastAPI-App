import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { axiosInstance } from "./lib/axios";

const App = () => {
  
  return (
    <div>
      <NavBar />
      <HomePage />
    </div>
  );
};

export default App;
