import asyncHandler from "express-async-handler";
import Product from "../models/Product.js"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

/**
 * 🛠️ SDT CORE: PRODUCT CONTROLLER (Nivel S+)
 * Gestión de Soluciones Técnicas y Autenticación de Nodos
 */

// --- 1. CATÁLOGO DE PRODUCTOS (SOLUCIONES TÉCNICAS) ---
// Expone todas las soluciones activas para el frontend (Services.jsx)
export const getAllProducts = asyncHandler(async (req, res) => {
    // Forzamos que no haya caché para mostrar cambios de inventario en tiempo real
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
    
    const products = await Product.find({ isActive: true })
        .select("-refreshToken") 
        .sort({ name: 1 })
        .lean();

    res.status(200).json({ success: true, products });
});

// --- 2. OBTENER ESPECIFICACIONES DE PRODUCTO ÚNICO ---
export const getSingleProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).select("-refreshToken").lean();

    if (!product) {
        return res.status(404).json({ 
            success: false, 
            message: "Solución técnica no encontrada en el Datacenter." 
        });
    }

    res.status(200).json({ success: true, product });
});

// --- 3. REGISTRO DE NODOS DE PRODUCTO (NIVEL 1001) ---
// Utilizado para dar de alta nuevas soluciones o servicios en el clúster
export const registerProduct = asyncHandler(async (req, res) => {
    const { name, email, password, category, price, description } = req.body;
    
    if (!name || !email || !password || !category) {
        return res.status(400).json({ success: false, message: "Protocolo de registro incompleto." });
    }

    const duplicate = await Product.findOne({ email }).lean();
    if (duplicate) {
        return res.status(409).json({ success: false, message: "Identidad de producto ya registrada en el clúster." });
    }

    // El rol 'product' se estandariza en 1001 (Nivel Staff/Admin)
    const result = await Product.create({
        name,
        email,
        password, // El middleware pre-save en el modelo maneja el hashing
        category,
        price: price || 0,
        description,
        roles: { product: 1001 },
    });

    if (result) {
        console.log(`✅ [SDT_CORE]: Registro exitoso -> Nodo: ${name}`);
        res.status(201).json({ success: true, message: "Nodo de producto creado exitosamente." });
    } else {
        res.status(500).json({ success: false, message: "Fallo de infraestructura en creación." });
    }
});

// --- 4. LOGIN DE PRODUCTO (SDT AUTH PROTOCOL) ---
// Permite que un producto/solución se autentique como entidad en el sistema
export const loginProduct = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Credenciales requeridas." });
    }

    // Buscamos el producto incluyendo campos ocultos por seguridad
    const findProduct = await Product.findOne({ email }).select("+password +refreshToken");
    
    if (!findProduct) {
        return res.status(401).json({ success: false, message: "Acceso denegado: Identidad inexistente." });
    }

    // Verificación de Hash S+
    const isMatch = await findProduct.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: "Acceso denegado: Credenciales inválidas." });
    }

    // Mapeo de Roles para verifyAccess.js
    const rolesArray = Object.values(findProduct.roles).filter(Boolean);
    
    const accessToken = jwt.sign(
        { UserInfo: { id: findProduct._id, email: findProduct.email, roles: rolesArray } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
        { id: findProduct._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    // Rotación de Cookies y Tokens (Seguridad de Grado Militar)
    const cookies = req.cookies;
    let newRefreshTokenArray = !cookies?.jwt
        ? (findProduct.refreshToken || [])
        : (findProduct.refreshToken || []).filter(rt => rt !== cookies.jwt);

    if (cookies?.jwt) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    }

    findProduct.refreshToken = [...newRefreshTokenArray, refreshToken];
    await findProduct.save();

    // Limpieza de objeto de respuesta
    const productData = findProduct.toObject();
    delete productData.password;
    delete productData.refreshToken;

    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true, 
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
    });

    console.log(`🔑 [SDT_AUTH]: Nodo autenticado -> ${findProduct.name}`);
    res.json({ 
        success: true, 
        accessToken, 
        roles: rolesArray, 
        productData 
    });
});

// --- 5. ACTUALIZACIÓN TÉCNICA (DATA SYNC) ---
// Sincroniza cambios desde el Dashboard de Admin
export const updateProduct = asyncHandler(async (req, res) => {
    const id = req.body.id || req.params.id;
    const { ...updateData } = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: "ID de producto requerido." });
    }
    
    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-refreshToken").lean();

    if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "No se encontró el nodo para actualizar." });
    }

    res.status(200).json({ 
        success: true, 
        message: "Nodo actualizado en el Datacenter.",
        product: updatedProduct 
    });
});