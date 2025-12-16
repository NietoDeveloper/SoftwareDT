const asyncHandler = require("express-async-handler");
const Doctor = require("../models/Doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const doctorRegister = asyncHandler(async (req, res) => {
  const { name, email, password, specialization } = req.body;  // Agregado: specialization required en modelo

  if (!name || !email || !password || !specialization) {
    return res
      .status(400)
      .json({ message: "Name, email, password y specialization son requeridos!" });
  }

  const duplicate = await Doctor.findOne({ email }).lean();
  if (duplicate) {
    return res.status(409).json({ message: "Email ya existe" });
  }

  const hashedpassword = await bcrypt.hash(password, 10);  // Bien, pero modelo ya tiene pre-save hook; redundante pero ok para override

  const result = await Doctor.create({
    name,
    email,
    password: hashedpassword,
    specialization,  // Agregado
    roles: { doctor: 1001 },
    // Agrega defaults si needed: isApproved: 'approved', isAvailable: true (ya en schema)
  });

  console.log('Doctor registrado:', result._id);  // Agregado: debug log

  if (result) {
    res
      .status(201)
      .json({ message: "Perfil de doctor creado exitosamente" });
  } else {
    res
      .status(500)
      .json({ message: "Error interno: No se pudo crear el perfil." });
  }
});

const handleDoctorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Credenciales de login requeridas" });
  }

  const findDoctor = await Doctor.findOne({ email }).select("+password");
  if (!findDoctor) {
    return res
      .status(401)
      .json({ message: "No autorizado: Credenciales inválidas" });
  }

  const isMatch = await bcrypt.compare(password, findDoctor.password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "No autorizado: Credenciales inválidas" });
  }

  const roles = findDoctor.roles
    ? Object.values(findDoctor.roles).filter(Boolean)
    : [];

  const accessToken = jwt.sign(
    { id: findDoctor._id, roles },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );

  const refreshToken = jwt.sign(
    { id: findDoctor._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  let newRefreshTokenArray = findDoctor.refreshToken?.length
    ? findDoctor.refreshToken.filter((token) => token !== req.cookies?.jwt)
    : [];
    
  newRefreshTokenArray.push(refreshToken);
  
  findDoctor.refreshToken = newRefreshTokenArray;
  await findDoctor.save();

  console.log('Doctor logged in:', findDoctor._id);  // Agregado: debug

  const { password: _, refreshToken: __, ...doctorData } =
    findDoctor.toObject();

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken, roles, doctorData });
});

const updateDoctor = asyncHandler(async (req, res) => {
  const doctorId = req.params.id;  // Asume ruta /update/:id; si no, cambia a req.body.id o req.user.id si auth

  if (!doctorId) {
    return res
      .status(400)
      .json({ message: "ID de doctor requerido en params." });
  }

  const foundDoctor = await Doctor.findById(doctorId);
  if (!foundDoctor) {
    return res.status(404).json({ message: "Doctor no encontrado" });
  }

  const {
    email,
    phone,
    specialization,
    bio,
    timeSlots,
    name,
    ticketPrice,
    photo,
    // qualifications, experience: No en schema pasteado; comentado para evitar error
  } = req.body;

  if (email && email !== foundDoctor.email) {
    const duplicateEmail = await Doctor.findOne({ email }).lean();
    if (duplicateEmail) {
      return res
        .status(409)
        .json({ message: "Email ya en uso por otra cuenta." });
    }
    foundDoctor.email = email;
  }

  if (name) foundDoctor.name = name;
  if (ticketPrice) foundDoctor.ticketPrice = ticketPrice;
  if (photo) foundDoctor.photo = photo;
  if (phone) foundDoctor.phone = phone;
  if (specialization) foundDoctor.specialization = specialization;
  if (bio) foundDoctor.bio = bio;
  if (timeSlots) foundDoctor.timeSlots = timeSlots;
  // Si agregas qualifications/experience al schema, descomenta:
  // if (qualifications) foundDoctor.qualifications = qualifications;
  // if (experience) foundDoctor.experience = experience;

  const result = await foundDoctor.save();

  console.log('Doctor actualizado:', result._id);  // Agregado: debug

  if (result) {
    const { password: _, refreshToken: __, ...updatedData } =
      result.toObject();

    return res.status(200).json({
      message: "Info de doctor actualizada exitosamente!",
      doctorData: updatedData,
    });
  }

  return res.status(500).json({
    message: "No se pudo actualizar debido a error interno!",
  });
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({ 
    // isApproved: 'approved', isAvailable: true  // Comentado temporalmente para debug: muestra TODOS. Descomenta en prod
  }) 
    .select("-password -refreshToken")
    .sort({ name: 1 })  // Agregado: sort alfabético por name
    // .populate('reviews')  // Opcional: populate si quieres reviews incluidos
    .lean();

  console.log('Doctores encontrados:', doctors.length);  // Agregado: debug – ve en consola si devuelve 0

  if (doctors.length === 0) {
    return res.status(200).json({
      message: "No se encontraron doctores disponibles en la DB!",
      doctors: [],
    });
  }

  res.status(200).json({
    message: "Doctores disponibles recuperados exitosamente",
    doctors,
  });
});

const handleDoctorLogout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }

  const refreshToken = cookies.jwt;

  const foundDoctor = await Doctor.findOne({ refreshToken }).select(
    "+refreshToken"
  );

  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  if (!foundDoctor) {
    return res.sendStatus(204);
  }

  foundDoctor.refreshToken = foundDoctor.refreshToken.filter(
    (token) => token !== refreshToken
  );

  await foundDoctor.save();
  console.log('Doctor logged out:', foundDoctor._id);  // Agregado: debug
  res.sendStatus(204);
});

module.exports = {
  doctorRegister,
  handleDoctorLogin,
  getAllDoctors,
  updateDoctor,
  handleDoctorLogout,
};