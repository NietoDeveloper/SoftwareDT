/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "./context/UserContext";
import { setupInterceptors } from "./API/api";

// Components & Layout
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx"; 
import PrivateRoutes from "./utils/PrivateRoutes.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
