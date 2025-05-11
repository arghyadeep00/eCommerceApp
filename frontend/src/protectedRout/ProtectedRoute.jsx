// src/components/ProtectedRoute.jsx
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";

const ProtectedRoute = ({ children }) => {
  const { backendUrl } = useContext(StoreContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${backendUrl}/api/auth-check`, {
          withCredentials: true,
        });
       
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
