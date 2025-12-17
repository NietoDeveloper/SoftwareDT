const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// --- FUNCIONES EXISTENTES (Mantenidas) ---

const doctorRegister = asyncHandler(async (req, res) => {
  const { name, email, password, specialization } = req.body;
  if (!name || !email || !password || !specialization) {
    return res.status(400).json({ message: "Name, email, password y specialization son requeridos!" });
  }
  const duplicate = await Doctor.findOne({ email }).lean();
  if (duplicate) return res.status(409).json({ message: "Email ya existe" });

  const hashedpassword = await bcrypt.hash(password, 10);
  const result = await Doctor.create({
    name,
    email,
    password: hashedpassword,
    specialization,
    roles: { doctor: 1001 },
  });

  if (result) {
    res.status(201).json({ message: "Perfil de doctor creado exitosamente" });
  } else {
    res.status(500).json({ message: "Error interno: No se pudo crear el perfil." });
  }
});

const handleDoctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Credenciales de login requeridas" });

  const findDoctor = await Doctor.findOne({ email }).select("+password");
  if (!findDoctor) return res.status(401).json({ message: "No autorizado: Credenciales inválidas" });

  const isMatch = await bcrypt.compare(password, findDoctor.password);
  if (!isMatch) return res.status(401).json({ message: "No autorizado: Credenciales inválidas" });

  const roles = findDoctor.roles ? Object.values(findDoctor.roles).filter(Boolean) : [];
  const accessToken = jwt.sign({ id: findDoctor._id, roles }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: findDoctor._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

  let newRefreshTokenArray = findDoctor.refreshToken?.length
    ? findDoctor.refreshToken.filter((token) => token !== req.cookies?.jwt)
    : [];
    
  newRefreshTokenArray.push(refreshToken);
  findDoctor.refreshToken = newRefreshTokenArray;
  await findDoctor.save();

  const { password: _, refreshToken: __, ...doctorData } = findDoctor.toObject();
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, roles, doctorData });
});

// --- NUEVA FUNCIÓN: getSingleDoctor (VITAL PARA TU BOOKING PAGE) ---

const getSingleDoctor = asyncHandler(async (req, res) => {
  const { id } = req.params; // Asegúrate que en la ruta sea /:id

  // Desactivar cache para obtener datos frescos
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');

  const doctor = await Doctor.findById(id).select("-password -refreshToken").lean();

  if (!doctor) {
    return res.status(404).json({ message: "Doctor no encontrado" });
  }

  // IMPORTANTE: Devolvemos el objeto dentro de la propiedad 'doctor'
  // para que el front lo reciba como res.data.doctor
  res.status(200).json({
    success: true,
    doctor: doctor 
  });
});

const updateDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;
  if (!doctorId) return res.status(400).json({ message: "ID de doctor requerido en params." });

  const foundDoctor = await Doctor.findById(doctorId);
  if (!foundDoctor) return res.status(404).json({ message: "Doctor no encontrado" });

  const { email, phone, specialization, bio, timeSlots, name, ticketPrice, photo } = req.body;

  if (email && email !== foundDoctor.email) {
    const duplicateEmail = await Doctor.findOne({ email }).lean();
    if (duplicateEmail) return res.status(409).json({ message: "Email ya en uso." });
    foundDoctor.email = email;
  }

  if (name) foundDoctor.name = name;
  if (ticketPrice) foundDoctor.ticketPrice = ticketPrice;
  if (photo) foundDoctor.photo = photo;
  if (phone) foundDoctor.phone = phone;
  if (specialization) foundDoctor.specialization = specialization;
  if (bio) foundDoctor.bio = bio;
  if (timeSlots) foundDoctor.timeSlots = timeSlots;

  const result = await foundDoctor.save();
  const { password: _, refreshToken: __, ...updatedData } = result.toObject();
  res.status(200).json({ message: "Actualizado!", doctorData: updatedData });
});

const getAllDoctors = asyncHandler(async (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  const doctors = await Doctor.find({}).select("-password -refreshToken").sort({ name: 1 }).lean();

  res.status(200).json({
    message: "Doctores recuperados exitosamente",
    doctors,
  });
});

const handleDoctorLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundDoctor = await Doctor.findOne({ refreshToken }).select("+refreshToken");

  res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "None" });
  if (!foundDoctor) return res.sendStatus(204);

  foundDoctor.refreshToken = foundDoctor.refreshToken.filter((token) => token !== refreshToken);
  await foundDoctor.save();
  res.sendStatus(204);
});

module.exports = {
  doctorRegister,
  handleDoctorLogin,
  getAllDoctors,
  getSingleDoctor, // EXPORTAR ESTA
  updateDoctor,
  handleDoctorLogout,
};