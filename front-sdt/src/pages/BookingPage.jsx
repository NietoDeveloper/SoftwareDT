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

  // --- 2. HIDRATACIÓN DE DATOS ---
  useEffect(() => {
    // Intentamos sacar los datos del contexto o del storage
    const activeUser = user || JSON.parse(localStorage.getItem('user'));
    
    if (activeUser) {
      setFormData(prev => ({
        ...prev,
        fullName: activeUser.name || activeUser.fullName || prev.fullName,
        email: activeUser.email || prev.email,
        phone: activeUser.phone || prev.phone,
        reason: serviceFromFlow && !prev.reason.includes("Requerimiento")
          ? `Requerimiento para: ${serviceFromFlow.name || serviceFromFlow.title}. `
          : prev.reason
      }));
    }
  }, [user, serviceFromFlow]);

  // 3. React Query para datos del doctor
  const { data: doctor, isLoading: doctorLoading } = useQuery({
    queryKey: ["doctor", activeDoctorId],
    queryFn: async () => {
      if (doctorFromFlow) return doctorFromFlow;
      const res = await axiosPrivate.get(`/doctors/${activeDoctorId}`);
      return res.data.data || res.data.doctor || res.data;
    },
    enabled: !!activeDoctorId && (!!token || !!localStorage.getItem('token')),
  });

  // 4. Generación de horarios
  const availableTimes = useMemo(() => {
    if (!formData.appointmentDate) return [];
    const times = [];
    const [year, month, day] = formData.appointmentDate.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);
    if (selectedDate.getDay() === 0) return [];
    
    const now = new Date();
    const minTimeAllowed = new Date(now.getTime() + 8 * 60 * 60 * 1000); 



export default BookingPage;