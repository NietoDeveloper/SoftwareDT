import { useState, useContext } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// CORRECCIÓN DE RUTA: Subimos dos niveles para llegar a src/context
import { UserContext } from "../../context/UserContext"; 

/