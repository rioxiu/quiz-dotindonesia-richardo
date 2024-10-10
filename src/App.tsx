// src/App.tsx
import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <div className="flex justify-center flex-col items-center min-h-screen">
      <div className="">
        {!username ? <Login onLogin={setUsername} /> : <Quiz />}
      </div>
    </div>
  );
};

export default App;
