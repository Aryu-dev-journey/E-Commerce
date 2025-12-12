import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on refresh
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/profile", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Login function
  async function login(email, password) {
    const res = await axios.post(
      "http://localhost:3000/api/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  }

  // Register function
  async function register(name, email, password) {
    const res = await axios.post(
      "http://localhost:3000/api/register",
      { name, email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  }

  // Logout (clear cookie)
  async function logout() {
    await axios.post(
      "http://localhost:3000/api/logout",
      {},
      { withCredentials: true }
    );
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
