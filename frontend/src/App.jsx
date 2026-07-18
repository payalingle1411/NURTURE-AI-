import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  const checkBackend = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      setMessage(response.data);
    } catch (error) {
      setMessage("Failed to connect to Backend");
    }
  };

  return (
    <div
  style={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f4f6f9",
  }}
>
      <h1>React + Spring Boot Connection Test</h1>

      <button
        onClick={checkBackend}
        style={{
          padding: "12px 25px",
          fontSize: "18px",
          cursor: "pointer",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Check Backend Connection
      </button>

      {message && (
        <h2
          style={{
            marginTop: "20px",
            color: message.includes("Successfully") ? "green" : "red",
          }}
        >
          {message}
        </h2>
      )}
    </div>
  );
}

export default App;