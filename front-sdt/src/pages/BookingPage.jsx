/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { axiosPrivate } from "../API/api.js"; 
import Footer from "../components/Footer/Footer";
import { UserContext } from "../context/UserContext";
import { ChevronLeft, Briefcase, ArrowRight } from "lucide-react";

const BookingPage = () => {
  const { doctorId: paramId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, token, loading: userLoading } = useContext(UserContext);

  // --- LÓGICA DE RECUPERACIÓN DE FLUJO SDT ---
  const flowData = useMemo(() => {
    const saved = localStorage.getItem('sdt_pending_appointment');
    return location.state || (saved ? JSON.parse(saved) : null);
  }, [location.state]);

  const doctorFromFlow = flowData?.doctorData;
  const serviceFromFlow = flowData?.serviceData; 
  const activeDoctorId = paramId || doctorFromFlow?._id;

  // ESTADO LOCAL DEL FORMULARIO
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "", 
    appointmentDate: new Date().toISOString().split("T")[0],
    appointmentTime: "",
    reason: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- 1. BLINDAJE DE SESIÓN (EL AJUSTE CLAVE) ---
  useEffect(() => {
    // Si React aún está cargando el contexto, no hacemos nada
    if (userLoading) return;

    // Verificamos si hay algo en localStorage por si el contexto está "vacío" momentáneamente
    const hasToken = token || localStorage.getItem('token');
    const hasUser = user || localStorage.getItem('user');

    if (!hasToken || !hasUser) {
      localStorage.setItem('sdt_return_path', location.pathname);
      toast.error("Identificación requerida para agendar.");
      navigate("/login", { state: { from: location.pathname }, replace: true });
    }
    
    if (!activeDoctorId && !doctorLoading) {
      toast.info("Seleccione un especialista primero.");
      navigate("/doctors");
    }
  }, [user, token, userLoading, activeDoctorId, navigate, location.pathname]);




export default BookingPage;