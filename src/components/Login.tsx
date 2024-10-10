// src/components/Login.tsx
import React, { useState } from "react";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");

  const handleLogin = () => {
    localStorage.setItem("username", username);
    onLogin(username);
  };

  return (
    <div className="flex flex-col space-y-4 mt-8">
      <h1 className="text-3xl">Login Quiz!</h1>
      <input
        type="text"
        className="input input-bordered max-w-sm"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="btn btn-active btn-neutral" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
