import React, { useState } from "react";
import Login from "./Login";
import Form from "./Form";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Simple check
    if (username === "team" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <Form />}
    </div>
  );
}

export default App;
