

const doctorSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        select: false 
    },
    photo: { type: String },  // Opcional, podría agregar default: '' si es necesario
    phone: { type: String },
    roles: {
        doctor: {
            type: Number,
            default: 1001
        },
        admin: Number  
    },
    ticketPrice: { type: Number, default: 30 },
    specialization: { type: String, required: true },
    qualifications: [qualificationSchema],
    experience: [experienceSchema],
    bio: { type: String, maxlength: 250 },
    timeSlots: [timeSlotSchema],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, default: 0 },  // Posiblemente el promedio de ratings
    totalRating: { type: Number, default: 0 },  // Posiblemente la suma o conteo de ratings
    isApproved: { type: String, enum: ["pending", "approved", "cancelled"], default: "approved" },
    appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
    refreshToken: {
        type: [String],
        select: false, 
        index: true  // Bueno para queries rápidas en logout
    },
    isAvailable: { type: Boolean, default: true }
}, { 
    timestamps: true 
});

module.exports = userDB.model('Doctor', doctorSchema);