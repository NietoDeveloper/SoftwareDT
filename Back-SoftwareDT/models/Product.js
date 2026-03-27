import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; 
import { userDB } from '../config/dbConn.js';

const { Schema } = mongoose;

/**
 * 🛠️ SDT CORE: ESQUEMA TÉCNICO DE PRODUCTO (Nivel S+)
 * Ubicación: Datacenter DT1 | Colección: products
 */
const productSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true, 
    index: true 
  },
  name: { 
    type: String, 
    required: true 
  }, 
  password: { 
    type: String, 
    required: true, 
    select: false, 
    minlength: 8 
  },
  photo: { 
    type: String,
    default: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }, 
  phone: { type: String },
  roles: {
    product: { type: Number, default: 1001 },
    admin: Number 
  },
  price: { type: Number, default: 0 },
  category: { 
    type: String, 
    required: true 
  }, 
  description: { 
    type: String, 
    maxlength: 500 
  },
  
  rating: { type: Number, default: 0 }, 
  totalRating: { type: Number, default: 0 }, 

  isApproved: { 
    type: Boolean, 
    default: true 
  },

  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  
  refreshToken: {
    type: [String],
    select: false, 
    index: true 
  },
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true, 
  collection: 'products',
  // ✅ Permite que los virtuals se incluyan al convertir a JSON para el frontend
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// --- SEGURIDAD: Protocolo de Cifrado Pre-save ---
productSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('❌ SDT Error: Fallo en encriptación en Nodo Producto.', error);
    next(error);
  }
});

productSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

/**
 * 🛠️ SOFTWARE DT: GESTIÓN DE COLISIONES
 */
try {
  if (userDB.models['Product']) {
    delete userDB.models['Product'];
  }
} catch (e) {
  console.log("🛠️ SDT: Sincronización de esquema inicializada.");
}

const Product = userDB.model('Product', productSchema); 

export default Product;