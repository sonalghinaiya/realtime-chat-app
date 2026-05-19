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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4">
      <div className="text-center">
        <div className="mb-8">
          <img
            src="/vibely-bot.svg"
            alt="Vibely Bot"
            className="w-48 h-48 sm:w-64 sm:h-64 mx-auto"
          />
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 animate-pulse">
          Welcome, {user.name || "User"}!
        </h1>

        <p className="text-indigo-200 text-lg sm:text-xl mb-8 opacity-90">
          Get ready to connect with your friends on{" "}
          <span className="font-extrabold text-pink-400 drop-shadow-md">
            Vibely
          </span>
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
