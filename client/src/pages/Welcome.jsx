import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/");
      return;
    }
    const timer = setTimeout(() => {
      navigate("/chat");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-4">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzJkZWQ5MWQwMzM5MWI0ZDI0ZGRhZDQwZDEwZDUwZWE5MWQwMGU0ZiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/bcKmIWkUMCjVm/giphy.gif"
            alt="Robot"
            className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-full shadow-2xl"
          />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 animate-pulse">
          Welcome, {user.name || "User"}!
        </h1>
        
        <p className="text-white text-lg sm:text-xl mb-8 opacity-90">
          Get ready to connect with your friends
        </p>

        <div className="flex items-center justify-center gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-3 h-3 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;